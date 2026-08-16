import { RetrievalResult } from '../../src/types';

export class SemanticReranker {
  /**
   * Reranks retrieved candidates by computing deep semantic alignment and entity co-occurrence
   */
  static rerank(query: string, candidates: RetrievalResult[], topK = 3): RetrievalResult[] {
    if (candidates.length <= 1) return candidates;

    const queryTokens = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
    const queryPhrases = this.extractPhrases(query.toLowerCase());

    const scored = candidates.map(candidate => {
      const textLower = candidate.chunk.text.toLowerCase();
      const titleLower = candidate.chunk.title.toLowerCase();

      // 1. Exact phrase matching bonus
      let phraseScore = 0;
      for (const phrase of queryPhrases) {
        if (textLower.includes(phrase)) phraseScore += 0.25;
        if (titleLower.includes(phrase)) phraseScore += 0.35;
      }

      // 2. Token overlap ratio (Precision & Recall)
      let matchedTokens = 0;
      for (const token of queryTokens) {
        if (textLower.includes(token) || titleLower.includes(token)) {
          matchedTokens++;
        }
      }
      const tokenOverlap = queryTokens.length > 0 ? (matchedTokens / queryTokens.length) : 0;

      // 3. Proximity / Density boost (are query keywords close together?)
      let densityBoost = 0;
      if (matchedTokens >= 2) {
        const positions = queryTokens
          .map(t => textLower.indexOf(t))
          .filter(pos => pos !== -1)
          .sort((a, b) => a - b);
        
        if (positions.length >= 2) {
          const span = positions[positions.length - 1] - positions[0];
          if (span < 120) densityBoost = 0.15;
          else if (span < 250) densityBoost = 0.08;
        }
      }

      // 4. Compute unified cross-reranking score
      const rerankScore = Math.min(
        1.0,
        (candidate.hybridScore * 0.45) +
        (tokenOverlap * 0.30) +
        (Math.min(0.5, phraseScore) * 0.15) +
        (densityBoost * 0.10)
      );

      return {
        ...candidate,
        rerankScore: Number(rerankScore.toFixed(4)),
        finalScore: Number(rerankScore.toFixed(4)),
      };
    });

    // Sort descending by rerank score
    scored.sort((a, b) => b.rerankScore - a.rerankScore);

    // Update ranks
    scored.forEach((item, idx) => {
      item.rank = idx + 1;
    });

    return scored.slice(0, topK);
  }

  private static extractPhrases(text: string): string[] {
    const words = text.split(/\s+/).filter(w => w.length > 2);
    const phrases: string[] = [];
    for (let i = 0; i < words.length - 1; i++) {
      phrases.push(`${words[i]} ${words[i + 1]}`);
    }
    return phrases;
  }
}
