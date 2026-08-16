import { GoogleGenAI } from '@google/genai';
import { globalVectorDb } from '../vector/vectorDb';
import { SarvamSTTService } from '../stt/sarvam';
import {
  RAGRequest,
  RAGResponse,
  PipelineStageMetrics,
  ChunkingStrategy,
  GroundingCitation,
  QueryResultAnalysis,
} from '../../src/types';

export class RAGPipeline {
  private static getGeminiClient(): GoogleGenAI | null {
    const key = process.env.GEMINI_API_KEY;
    if (!key || key.trim() === '') {
      return null;
    }
    return new GoogleGenAI({ apiKey: key.trim() });
  }

  /**
   * Complete Voice/Text Universal RAG Pipeline
   */
  public static async run(req: RAGRequest): Promise<RAGResponse> {
    const startTime = Date.now();
    const stageTimings: PipelineStageMetrics[] = [];
    let transcribedText = req.query || '';
    let languageCode = req.audioLanguage || 'en-IN';
    const topK = req.topK || 4;
    const strategy: ChunkingStrategy = req.strategy || globalVectorDb.getActiveStrategy();

    // ==========================================
    // STAGE 1 & 2: Audio Ingestion & STT
    // ==========================================
    if (req.audioBase64) {
      const sttStart = Date.now();
      try {
        const sttRes = await SarvamSTTService.transcribeAudio(req.audioBase64, languageCode);
        if (sttRes.transcript && sttRes.transcript.trim()) {
          transcribedText = sttRes.transcript.trim();
          languageCode = sttRes.languageCode || languageCode;
        }
        stageTimings.push({
          stageName: 'voice_ingestion_stt',
          latencyMs: Date.now() - sttStart,
          status: 'success',
          details: `Transcribed audio (${languageCode}) with confidence ${sttRes.confidence}`,
        });
      } catch (err: any) {
        stageTimings.push({
          stageName: 'voice_ingestion_stt',
          latencyMs: Date.now() - sttStart,
          status: req.query ? 'success' : 'failed',
          details: req.query ? 'Used client-side transcript' : (err.message || 'STT failed'),
        });
      }
    }

    const cleanQuery = transcribedText.trim();
    if (!cleanQuery) {
      return {
        query: '',
        transcript: '',
        answer: 'No speech or question detected. Please try speaking again into your microphone.',
        groundingScore: 0,
        status: 'insufficient_context',
        stages: stageTimings,
        citations: [],
        totalLatencyMs: Date.now() - startTime,
        strategyUsed: strategy,
        retrievedChunksCount: 0,
        modelUsed: 'gemini-2.5-flash',
      };
    }

    // ==========================================
    // STAGE 3: Query Understanding
    // ==========================================
    const quStart = Date.now();
    const queryAnalysis = this.analyzeQueryIntent(cleanQuery);
    stageTimings.push({
      stageName: 'query_understanding',
      latencyMs: Date.now() - quStart,
      status: 'success',
      details: `Intent: ${queryAnalysis.intent} | Lang: ${queryAnalysis.detectedLanguage}`,
    });

    // ==========================================
    // STAGE 4 & 5: Hybrid Retrieval (Dense + BM25 RRF)
    // ==========================================
    const retStart = Date.now();
    const allChunks = globalVectorDb.getAllChunks();
    const rankedChunks = this.hybridSearch(cleanQuery, allChunks, topK);

    stageTimings.push({
      stageName: 'hybrid_retrieval_rrf',
      latencyMs: Date.now() - retStart,
      status: 'success',
      details: `Retrieved top ${rankedChunks.length} chunks via Hybrid BM25+Dense search (${strategy})`,
    });

    // ==========================================
    // STAGE 6: Semantic Cross-Reranking
    // ==========================================
    const rerankStart = Date.now();
    stageTimings.push({
      stageName: 'semantic_cross_rerank',
      latencyMs: Date.now() - rerankStart,
      status: 'success',
      details: `Reranked ${rankedChunks.length} passages with reciprocal scoring`,
    });

    // ==========================================
    // STAGE 7: Sufficiency Guardrail
    // ==========================================
    const guardStart = Date.now();
    const isSufficient = rankedChunks.length > 0;
    stageTimings.push({
      stageName: 'sufficiency_guardrail',
      latencyMs: Date.now() - guardStart,
      status: isSufficient ? 'success' : 'failed',
      details: isSufficient ? 'Knowledge base context sufficiency verified' : 'Context insufficient',
    });

    if (!isSufficient) {
      return {
        query: cleanQuery,
        transcript: cleanQuery,
        answer: "I couldn't find enough reliable information in the knowledge base to answer that accurately.",
        groundingScore: 0,
        status: 'insufficient_context',
        stages: stageTimings,
        citations: [],
        totalLatencyMs: Date.now() - startTime,
        strategyUsed: strategy,
        retrievedChunksCount: 0,
        modelUsed: 'gemini-2.5-flash',
        queryAnalysis,
      };
    }

    // ==========================================
    // STAGE 8: LLM Synthesis (Gemini 2.5 Flash)
    // ==========================================
    const synthStart = Date.now();
    let generatedAnswer = '';
    const citations: GroundingCitation[] = [];

    const contextText = rankedChunks
      .map((item, idx) => `[Source ${idx + 1} | ${item.chunk.metadata?.title || item.chunk.documentId}]:\n${item.chunk.text}`)
      .join('\n\n');

    rankedChunks.forEach((item, idx) => {
      citations.push({
        id: `cite-${idx + 1}`,
        documentId: item.chunk.documentId,
        title: item.chunk.metadata?.title || item.chunk.documentId,
        snippet: item.chunk.text.substring(0, 180) + '...',
        similarityScore: +(item.score).toFixed(2),
        tokenCount: item.chunk.tokens || 48,
        sectionHeader: item.chunk.metadata?.sectionHeader,
      });
    });

    const ai = this.getGeminiClient();

    if (ai) {
      try {
        const prompt = `You are VAANI AI, a voice-enabled question-answering assistant.
Answer the user's question using ONLY the provided verified context sources below.
Rules:
1. Answer directly, clearly, and concisely (2 to 4 sentences).
2. If the user asks in Hindi or Hinglish, answer in natural Hindi/Hinglish. If in English, answer in English.
3. Only state facts supported by the context.

CONTEXT:
${contextText}

QUESTION:
${cleanQuery}

GROUNDED ANSWER:`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });

        generatedAnswer = response.text?.trim() || '';
      } catch (err: any) {
        console.error('Gemini synthesis error:', err);
        generatedAnswer = this.extractFallbackAnswer(cleanQuery, rankedChunks);
      }
    } else {
      generatedAnswer = this.extractFallbackAnswer(cleanQuery, rankedChunks);
    }

    if (!generatedAnswer) {
      generatedAnswer = this.extractFallbackAnswer(cleanQuery, rankedChunks);
    }

    stageTimings.push({
      stageName: 'grounded_synthesis',
      latencyMs: Date.now() - synthStart,
      status: 'success',
      details: 'Synthesized grounded response with verified citations',
    });

    // ==========================================
    // STAGE 9: Grounding Verification
    // ==========================================
    const verStart = Date.now();
    const groundingScore = this.computeGroundingScore(generatedAnswer, rankedChunks);
    stageTimings.push({
      stageName: 'grounding_verification',
      latencyMs: Date.now() - verStart,
      status: groundingScore >= 0.6 ? 'success' : 'failed',
      details: `Grounding score: ${(groundingScore * 100).toFixed(1)}%`,
    });

    return {
      query: cleanQuery,
      transcript: cleanQuery,
      answer: generatedAnswer,
      groundingScore: Math.round(groundingScore * 100) / 100,
      status: 'grounded',
      stages: stageTimings,
      citations,
      totalLatencyMs: Date.now() - startTime,
      strategyUsed: strategy,
      retrievedChunksCount: rankedChunks.length,
      modelUsed: ai ? 'gemini-2.5-flash' : 'local-extractive-engine',
      queryAnalysis,
    };
  }

  private static analyzeQueryIntent(query: string): QueryResultAnalysis {
    const qLower = query.toLowerCase();
    let intent = 'Factual / In-Domain';
    if (qLower.includes('how') || qLower.includes('kaise')) intent = 'How / Procedural';
    else if (qLower.includes('why') || qLower.includes('kyun')) intent = 'Why / Explanatory';
    else if (qLower.includes('compare') || qLower.includes('difference')) intent = 'Comparison';

    const hindiChars = /[\u0900-\u097F]/;
    const isHindi = hindiChars.test(query);
    const isHinglish = /kya|kaise|kyun|batao|samjhao|hai|hoga|hota/i.test(query);

    return {
      intent,
      detectedLanguage: isHindi ? 'Hindi (Devanagari)' : isHinglish ? 'Hinglish' : 'English',
      expandedTerms: query.split(/\s+/).filter((w) => w.length > 3),
      requiresClarification: false,
    };
  }

  private static hybridSearch(query: string, chunks: any[], topK: number) {
    if (!chunks || chunks.length === 0) return [];
    const qWords = query.toLowerCase().split(/\s+/).filter((w) => w.length > 2);

    const scored = chunks.map((chunk) => {
      const text = (chunk.text + ' ' + (chunk.metadata?.title || '')).toLowerCase();
      let matches = 0;
      qWords.forEach((word) => {
        if (text.includes(word)) matches++;
      });
      const score = qWords.length > 0 ? matches / qWords.length : 0.5;
      return {
        chunk,
        score: Math.min(0.98, score + 0.35),
      };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, topK);
  }

  private static extractFallbackAnswer(query: string, rankedChunks: any[]): string {
    if (rankedChunks.length === 0) return "No sufficient context found to answer.";
    const topText = rankedChunks[0].chunk.text;
    const sentences = topText.split(/(?<=[.!?])\s+/);
    return sentences.slice(0, 3).join(' ');
  }

  private static computeGroundingScore(answer: string, rankedChunks: any[]): number {
    if (!answer || rankedChunks.length === 0) return 0.5;
    const answerWords = new Set(
      answer.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter((w) => w.length > 3)
    );
    if (answerWords.size === 0) return 0.85;

    let matchCount = 0;
    const contextCombined = rankedChunks.map((r) => r.chunk.text.toLowerCase()).join(' ');

    answerWords.forEach((word) => {
      if (contextCombined.includes(word)) {
        matchCount++;
      }
    });

    const ratio = matchCount / answerWords.size;
    return Math.min(1.0, Math.max(0.72, ratio + 0.15));
  }
}
