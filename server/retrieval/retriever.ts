import { Chunk, RetrievalResult } from '../../src/types';
import { InMemoryVectorStore, globalVectorDb } from '../vector/vectorDb';
import { SemanticEmbedder } from '../embeddings/embedder';

export interface RetrievalOptions {
  topK?: number;
  denseWeight?: number;
  sparseWeight?: number;
  minSimilarityThreshold?: number;
  filter?: Record<string, any>;
  expandedQueries?: string[];
  subQueries?: string[];
}

export class MultiStrategyRetriever {
  private vectorDb: InMemoryVectorStore;

  constructor(vectorDb: InMemoryVectorStore = globalVectorDb) {
    this.vectorDb = vectorDb;
  }

  /**
   * Executes Hybrid Multi-Strategy Retrieval (Dense + Sparse BM25 + Multi-Query/Expansion + RRF Merge)
   */
  async retrieve(query: string, options: RetrievalOptions = {}): Promise<RetrievalResult[]> {
    const topK = options.topK || 5;
    const denseWeight = options.denseWeight ?? 0.65;
    const sparseWeight = options.sparseWeight ?? 0.35;

    const normalizedQuery = this.normalizeQuery(query);
    const searchQueries = [
      normalizedQuery,
      ...(options.expandedQueries || []).map(q => this.normalizeQuery(q)),
      ...(options.subQueries || []).map(q => this.normalizeQuery(q)),
    ].filter((q, idx, self) => q.length > 2 && self.indexOf(q) === idx);

    const allChunks = this.vectorDb.getAllChunks();
    const candidateMap = new Map<string, {
      chunk: Chunk;
      denseScore: number;
      sparseScore: number;
      denseRank: number;
      sparseRank: number;
      matchCount: number;
    }>();

    // Perform dense + sparse search across primary query and semantic expansions
    for (let qIdx = 0; qIdx < searchQueries.length; qIdx++) {
      const q = searchQueries[qIdx];
      const weightMultiplier = qIdx === 0 ? 1.0 : 0.75;

      const queryVector = await SemanticEmbedder.embedText(q);
      const denseResults = await this.vectorDb.search(queryVector, topK * 2, options.filter);
      const sparseResults = this.computeSparseScores(q, allChunks);

      denseResults.forEach((res, rank) => {
        const existing = candidateMap.get(res.chunk.id);
        const weightedScore = res.score * weightMultiplier;
        if (existing) {
          existing.denseScore = Math.max(existing.denseScore, weightedScore);
          existing.denseRank = Math.min(existing.denseRank, rank + 1);
          existing.matchCount += 1;
        } else {
          candidateMap.set(res.chunk.id, {
            chunk: res.chunk,
            denseScore: weightedScore,
            sparseScore: 0,
            denseRank: rank + 1,
            sparseRank: 999,
            matchCount: 1,
          });
        }
      });

      sparseResults.slice(0, topK * 2).forEach((res, rank) => {
        const weightedSparse = res.score * weightMultiplier;
        if (candidateMap.has(res.chunk.id)) {
          const item = candidateMap.get(res.chunk.id)!;
          item.sparseScore = Math.max(item.sparseScore, weightedSparse);
          item.sparseRank = Math.min(item.sparseRank, rank + 1);
          item.matchCount += 1;
        } else {
          candidateMap.set(res.chunk.id, {
            chunk: res.chunk,
            denseScore: 0.1,
            sparseScore: weightedSparse,
            denseRank: 999,
            sparseRank: rank + 1,
            matchCount: 1,
          });
        }
      });
    }

    // 4. Compute Combined Hybrid Score & RRF
    const kRRF = 60;
    const mergedResults: RetrievalResult[] = [];

    candidateMap.forEach((val) => {
      const rrfScore = (1 / (kRRF + val.denseRank)) + (1 / (kRRF + val.sparseRank));
      const linearScore = (val.denseScore * denseWeight) + (val.sparseScore * sparseWeight);
      const multiMatchBoost = val.matchCount > 1 ? 0.08 * Math.min(3, val.matchCount - 1) : 0;
      const hybridScore = Math.min(1.0, (linearScore * 0.75) + (rrfScore * 10 * 0.25) + multiMatchBoost);

      mergedResults.push({
        chunk: val.chunk,
        denseScore: Number(val.denseScore.toFixed(4)),
        sparseScore: Number(val.sparseScore.toFixed(4)),
        hybridScore: Number(hybridScore.toFixed(4)),
        rerankScore: Number(hybridScore.toFixed(4)),
        finalScore: Number(hybridScore.toFixed(4)),
        rank: 0,
      });
    });

    // If candidateMap was empty (e.g. brand new query against empty index), pull top chunks directly
    if (mergedResults.length === 0 && allChunks.length > 0) {
      allChunks.slice(0, topK).forEach((chunk, idx) => {
        mergedResults.push({
          chunk,
          denseScore: 0.2,
          sparseScore: 0.2,
          hybridScore: 0.2,
          rerankScore: 0.2,
          finalScore: 0.2,
          rank: idx + 1,
        });
      });
    }

    // 5. Sort descending by hybrid score
    mergedResults.sort((a, b) => b.hybridScore - a.hybridScore);
    
    // Assign ranks
    mergedResults.forEach((r, idx) => {
      r.rank = idx + 1;
    });

    return mergedResults.slice(0, topK);
  }

  /**
   * Normalizes query string, removing filler words and normalizing whitespace
   */
  private normalizeQuery(query: string): string {
    return query
      .toLowerCase()
      .replace(/[^\w\s\d-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Computes BM25-style term frequency score across chunks
   */
  private computeSparseScores(query: string, chunks: Chunk[]): Array<{ chunk: Chunk; score: number }> {
    const queryTokens = query.split(/\s+/).filter(t => t.length > 2);
    if (queryTokens.length === 0) return [];

    const scores: Array<{ chunk: Chunk; score: number }> = [];

    for (const chunk of chunks) {
      const textLower = chunk.text.toLowerCase();
      let matchCount = 0;
      let exactPhraseBoost = 0;

      if (textLower.includes(query)) {
        exactPhraseBoost = 0.4;
      }

      for (const token of queryTokens) {
        const regex = new RegExp(`\\b${token}`, 'g');
        const matches = (textLower.match(regex) || []).length;
        if (matches > 0) {
          matchCount += Math.min(3, matches) * (1 + (token.length * 0.1));
        }
      }

      const totalTokens = chunk.tokenCount || chunk.text.split(/\s+/).length;
      const tfScore = Math.min(1.0, (matchCount / Math.max(10, Math.sqrt(totalTokens))) + exactPhraseBoost);

      if (tfScore > 0) {
        scores.push({ chunk, score: Math.min(1.0, tfScore) });
      }
    }

    scores.sort((a, b) => b.score - a.score);
    return scores;
  }
}
