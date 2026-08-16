import express, { Express, Request, Response, NextFunction } from 'express';
import { globalVectorDb } from './vector/vectorDb';
import { RAGPipeline } from './rag/ragPipeline';
import { LatencyBenchmarker } from './benchmark/benchmarker';
import { SarvamSTTService } from './stt/sarvam';
import { ChunkingStrategy, Document } from '../src/types';

export function createExpressApp(): Express {
  const app = express();

  // Basic CORS headers to allow cross-origin
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });

  // Body parser with 50mb limit for audio payloads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Ensure Vector DB is initialized on demand
  let isDbReady = false;
  const ensureDbInitialized = async () => {
    if (!isDbReady || globalVectorDb.size() === 0) {
      await globalVectorDb.initializeDefaultIndex('hybrid');
      isDbReady = true;
    }
  };

  // --- API Routes ---

  /**
   * 1. Health and System Status
   */
  app.get('/api/health', async (req: Request, res: Response) => {
    try {
      await ensureDbInitialized();
      const stats = globalVectorDb.getStats();
      const mem = process.memoryUsage();

      res.json({
        status: 'healthy',
        product: 'VAANI AI',
        tagline: 'Speak. Search. Know.',
        developedBy: 'SparkMind – VAA',
        totalDocs: stats.totalDocuments,
        totalChunks: stats.totalChunks,
        activeStrategy: stats.activeStrategy,
        strategiesCount: stats.strategyCounts,
        vectorIndexSize: stats.totalChunks,
        memoryUsageMb: Math.round(mem.heapUsed / 1024 / 1024),
        uptimeSec: Math.round(process.uptime()),
        sarvamConfigured: Boolean(process.env.SARVAM_API_KEY && process.env.SARVAM_API_KEY.trim().length > 0),
        geminiConfigured: Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim().length > 0),
      });
    } catch (err: any) {
      res.status(500).json({ status: 'error', message: err.message });
    }
  });

  /**
   * 2. Speech-to-Text Transcription (Sarvam)
   */
  app.post('/api/transcribe', async (req: Request, res: Response) => {
    try {
      const { audioBase64, languageCode = 'en-IN' } = req.body;
      if (!audioBase64) {
        return res.status(400).json({ error: 'Missing audioBase64 in request body.' });
      }

      const result = await SarvamSTTService.transcribeAudio(audioBase64, languageCode);
      res.json(result);
    } catch (err: any) {
      console.error('STT API Error:', err);
      res.status(500).json({ error: err.message || 'STT transcription failed.' });
    }
  });

  /**
   * 3. Full Voice & Text RAG Query
   */
  app.post('/api/query', async (req: Request, res: Response) => {
    try {
      await ensureDbInitialized();
      const { query, audioBase64, audioLanguage, strategy, topK } = req.body;
      const response = await RAGPipeline.run({
        query,
        audioBase64,
        audioLanguage,
        strategy,
        topK: topK ? parseInt(topK, 10) : 4,
      });

      res.json(response);
    } catch (err: any) {
      console.error('RAG Query API Error:', err);
      res.status(500).json({ error: err.message || 'RAG Pipeline execution failed.' });
    }
  });

  /**
   * 4. Direct RAG Endpoint
   */
  app.post('/api/rag', async (req: Request, res: Response) => {
    try {
      await ensureDbInitialized();
      const { query, strategy, topK } = req.body;
      if (!query) {
        return res.status(400).json({ error: 'Query parameter is required.' });
      }

      const response = await RAGPipeline.run({
        query,
        strategy,
        topK: topK ? parseInt(topK, 10) : 4,
      });

      res.json(response);
    } catch (err: any) {
      console.error('RAG Generation Error:', err);
      res.status(500).json({ error: err.message || 'Generation failed.' });
    }
  });

  /**
   * 5. Metrics & Latency Statistics
   */
  app.get('/api/metrics', async (req: Request, res: Response) => {
    await ensureDbInitialized();
    const lastBenchmark = LatencyBenchmarker.getLastBenchmark();
    const stats = globalVectorDb.getStats();

    res.json({
      lastBenchmark,
      stats,
    });
  });

  /**
   * 6. Live Benchmark Execution
   */
  app.post('/api/benchmark', async (req: Request, res: Response) => {
    try {
      await ensureDbInitialized();
      console.log('[VAANI AI] Running full Latency Benchmark Suite...');
      const results = await LatencyBenchmarker.runBenchmark();
      res.json(results);
    } catch (err: any) {
      console.error('Benchmark Error:', err);
      res.status(500).json({ error: err.message || 'Benchmark run failed.' });
    }
  });

  /**
   * 7. Ingestion & Documents
   */
  app.get('/api/dataset/documents', async (req: Request, res: Response) => {
    await ensureDbInitialized();
    const docs = globalVectorDb.getAllDocuments();
    const chunks = globalVectorDb.getAllChunks();
    res.json({
      totalDocuments: docs.length,
      totalChunks: chunks.length,
      documents: docs,
      activeStrategy: globalVectorDb.getActiveStrategy(),
    });
  });

  app.post('/api/dataset/ingest', async (req: Request, res: Response) => {
    try {
      await ensureDbInitialized();
      const { documents, strategy } = req.body;

      if (strategy && (!documents || documents.length === 0)) {
        const result = await globalVectorDb.reindexAll(strategy as ChunkingStrategy);
        return res.json({
          success: true,
          message: `Re-indexed knowledge base using strategy: ${strategy}`,
          ...result,
        });
      }

      if (Array.isArray(documents) && documents.length > 0) {
        const addedChunks = await globalVectorDb.addDocuments(documents as Document[], strategy);
        return res.json({
          success: true,
          addedChunks,
          totalChunks: globalVectorDb.size(),
        });
      }

      res.status(400).json({ error: 'No documents or strategy provided.' });
    } catch (err: any) {
      console.error('Dataset Ingestion Error:', err);
      res.status(500).json({ error: err.message || 'Ingestion failed.' });
    }
  });

  return app;
}
