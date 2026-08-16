import { Chunk, Document, ChunkingStrategy } from '../../src/types';
import { AdvancedChunker } from '../chunking/chunker';
import { SemanticEmbedder } from '../embeddings/embedder';
import { getMSMARCODataset } from '../dataset/msmarco';

export interface VectorSearchResult {
  chunk: Chunk;
  score: number;
}

export interface IVectorStore {
  addChunks(chunks: Chunk[]): Promise<void>;
  search(queryVector: number[], topK: number, filter?: Record<string, any>): Promise<VectorSearchResult[]>;
  getAllChunks(): Chunk[];
  getChunkById(id: string): Chunk | undefined;
  clear(): void;
  size(): number;
}

export class InMemoryVectorStore implements IVectorStore {
  private chunks: Map<string, Chunk> = new Map();
  private documents: Map<string, Document> = new Map();
  private activeStrategy: ChunkingStrategy = 'hybrid';

  constructor() {
    this.initializeDefaultIndex();
  }

  /**
   * Initializes the vector database with the MSMARCO-XI dataset and precomputed embeddings
   */
  public async initializeDefaultIndex(strategy: ChunkingStrategy = 'hybrid'): Promise<void> {
    this.activeStrategy = strategy;
    this.chunks.clear();
    this.documents.clear();

    const defaultDocs = getMSMARCODataset();
    for (const doc of defaultDocs) {
      this.documents.set(doc.id, doc);
      const generatedChunks = AdvancedChunker.chunkDocument(doc, { strategy });
      for (const chunk of generatedChunks) {
        chunk.embedding = await SemanticEmbedder.embedText(chunk.text);
        this.chunks.set(chunk.id, chunk);
      }
    }
  }

  public async addDocuments(docs: Document[], strategy: ChunkingStrategy = this.activeStrategy): Promise<number> {
    let addedChunksCount = 0;
    for (const doc of docs) {
      this.documents.set(doc.id, doc);
      const chunks = AdvancedChunker.chunkDocument(doc, { strategy });
      for (const chunk of chunks) {
        chunk.embedding = await SemanticEmbedder.embedText(chunk.text);
        this.chunks.set(chunk.id, chunk);
        addedChunksCount++;
      }
    }
    return addedChunksCount;
  }

  public async reindexAll(strategy: ChunkingStrategy): Promise<{ totalDocs: number; totalChunks: number }> {
    this.activeStrategy = strategy;
    this.chunks.clear();
    const docs = Array.from(this.documents.values());
    
    for (const doc of docs) {
      const generatedChunks = AdvancedChunker.chunkDocument(doc, { strategy });
      for (const chunk of generatedChunks) {
        chunk.embedding = await SemanticEmbedder.embedText(chunk.text);
        this.chunks.set(chunk.id, chunk);
      }
    }

    return {
      totalDocs: this.documents.size,
      totalChunks: this.chunks.size
    };
  }

  public async addChunks(chunks: Chunk[]): Promise<void> {
    for (const chunk of chunks) {
      if (!chunk.embedding) {
        chunk.embedding = await SemanticEmbedder.embedText(chunk.text);
      }
      this.chunks.set(chunk.id, chunk);
    }
  }

  public async search(queryVector: number[], topK = 5, filter?: Record<string, any>): Promise<VectorSearchResult[]> {
    const results: VectorSearchResult[] = [];

    for (const chunk of this.chunks.values()) {
      if (filter) {
        let match = true;
        for (const [k, v] of Object.entries(filter)) {
          if (chunk.metadata[k] !== v && (chunk as any)[k] !== v) {
            match = false;
            break;
          }
        }
        if (!match) continue;
      }

      if (!chunk.embedding) {
        chunk.embedding = await SemanticEmbedder.embedText(chunk.text);
      }

      const score = SemanticEmbedder.cosineSimilarity(queryVector, chunk.embedding);
      results.push({ chunk, score });
    }

    // Sort descending by similarity score
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, topK);
  }

  public getAllChunks(): Chunk[] {
    return Array.from(this.chunks.values());
  }

  public getAllDocuments(): Document[] {
    return Array.from(this.documents.values());
  }

  public getChunkById(id: string): Chunk | undefined {
    return this.chunks.get(id);
  }

  public getActiveStrategy(): ChunkingStrategy {
    return this.activeStrategy;
  }

  public clear(): void {
    this.chunks.clear();
    this.documents.clear();
  }

  public size(): number {
    return this.chunks.size;
  }

  public getStats() {
    const strategyCounts: Record<string, number> = {};
    for (const chunk of this.chunks.values()) {
      strategyCounts[chunk.strategy] = (strategyCounts[chunk.strategy] || 0) + 1;
    }

    return {
      totalDocuments: this.documents.size,
      totalChunks: this.chunks.size,
      activeStrategy: this.activeStrategy,
      strategyCounts,
      vectorDimension: 128,
      indexType: 'In-Memory Cosine Vector Flat Index (FAISS/Qdrant compatible)',
    };
  }
}

// Global Singleton Instance
export const globalVectorDb = new InMemoryVectorStore();
