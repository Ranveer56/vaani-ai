import { GoogleGenAI } from '@google/genai';
import { 
  RAGResponse, 
  ChunkingStrategy, 
  Citation, 
  PipelineStageLatencies,
  ConversationTurn,
  QueryAnalysisInfo
} from '../../src/types';
import { globalVectorDb } from '../vector/vectorDb';
import { MultiStrategyRetriever } from '../retrieval/retriever';
import { SemanticReranker } from '../reranking/reranker';
import { GuardrailsEngine } from '../guardrails/guardrails';
import { SarvamSTTService } from '../stt/sarvam';
import { SemanticEmbedder } from '../embeddings/embedder';
import { QueryUnderstandingEngine, QueryAnalysisResult } from './queryUnderstanding';

export interface RAGPipelineOptions {
  query?: string;
  audioBase64?: string;
  audioLanguage?: string;
  strategy?: ChunkingStrategy;
  topK?: number;
  useGemini?: boolean;
  history?: ConversationTurn[];
}

export class RAGPipeline {
  private static geminiClient: GoogleGenAI | null = null;
  private static quotaCooldownUntil = 0;
  private static conversationHistory: ConversationTurn[] = [];

  private static getGemini(): GoogleGenAI | null {
    if (!this.geminiClient && process.env.GEMINI_API_KEY) {
      try {
        this.geminiClient = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: { headers: { 'User-Agent': 'aistudio-build' } }
        });
      } catch (e) {
        console.warn("Failed to initialize GoogleGenAI:", e);
      }
    }
    return this.geminiClient;
  }

  /**
   * Executes the full Universal Query Understanding & Voice-Enabled RAG Pipeline
   */
  static async run(options: RAGPipelineOptions): Promise<RAGResponse> {
    const totalStart = performance.now();
    const latencies: PipelineStageLatencies = {
      stt_ms: 0,
      embedding_ms: 0,
      retrieval_ms: 0,
      reranking_ms: 0,
      generation_ms: 0,
      grounding_ms: 0,
      total_ms: 0,
    };

    let userQuery = (options.query || '').trim();
    let transcript: string | undefined = undefined;

    // Stage 1 & 2: Speech-to-Text (if audio is provided)
    if (options.audioBase64) {
      const sttStart = performance.now();
      const sttResult = await SarvamSTTService.transcribeAudio(
        options.audioBase64,
        options.audioLanguage || 'en-IN'
      );
      latencies.stt_ms = Number((performance.now() - sttStart).toFixed(2));
      transcript = sttResult.transcript;
      if (!userQuery) {
        userQuery = sttResult.transcript;
      }
    }

    // Fallback if no query provided
    if (!userQuery) {
      userQuery = "What is renewable energy and photovoltaic solar conversion?";
    }

    const guardrailNotes: string[] = [];
    const history = options.history || this.conversationHistory;

    // Stage 3: Universal Query Intent Understanding & Decomposition
    const analysis: QueryAnalysisResult = QueryUnderstandingEngine.analyze(userQuery, history);
    
    const queryAnalysisInfo: QueryAnalysisInfo = {
      detectedLanguage: analysis.detectedLanguage,
      primaryIntent: analysis.primaryIntent,
      resolvedContextualQuery: analysis.resolvedContextualQuery,
      isFollowUp: analysis.isFollowUp,
      isMultiIntent: analysis.isMultiIntent,
      isAmbiguous: analysis.isAmbiguous,
      requiresClarification: analysis.requiresClarification,
      clarificationPrompt: analysis.clarificationPrompt,
      isConversationalGreeting: analysis.isConversationalGreeting,
      subQueries: analysis.subQueries.map(sq => ({
        subQuery: sq.subQuery,
        intent: sq.intent,
        keywords: sq.keywords,
      })),
      extractedKeywords: analysis.extractedKeywords,
    };

    if (analysis.isFollowUp) {
      guardrailNotes.push(`Conversation context: Resolved follow-up to "${analysis.resolvedContextualQuery}"`);
    }
    if (analysis.isMultiIntent) {
      guardrailNotes.push(`Multi-intent decomposition: ${analysis.subQueries.length} sub-intents detected and retrieved.`);
    }

    // Stage 3b: Clarification Guardrail for ungrounded ambiguous queries
    if (analysis.requiresClarification && analysis.clarificationPrompt) {
      latencies.total_ms = Number((performance.now() - totalStart).toFixed(2));
      const clarificationResponse: RAGResponse = {
        query: userQuery,
        transcript,
        answer: analysis.clarificationPrompt,
        groundingStatus: 'INSUFFICIENT_CONTEXT',
        confidence: 0.85,
        citations: [],
        retrievedEvidence: [],
        latencies,
        guardrailNotes: [...guardrailNotes, 'Ambiguity Guardrail: Prompted user for specific concept clarification.'],
        strategyUsed: options.strategy || globalVectorDb.getActiveStrategy(),
        timestamp: new Date().toISOString(),
        isAbstained: true,
        queryAnalysis: queryAnalysisInfo,
        conversationHistory: this.conversationHistory,
      };
      this.recordTurn(userQuery, analysis.resolvedContextualQuery, clarificationResponse.answer, 'INSUFFICIENT_CONTEXT');
      return clarificationResponse;
    }

    // Stage 3c: Input Guardrails Check (Adversarial injections, etc.)
    const inputCheck = GuardrailsEngine.evaluateInput(userQuery);
    guardrailNotes.push(...inputCheck.notes);

    if (!inputCheck.passed) {
      latencies.total_ms = Number((performance.now() - totalStart).toFixed(2));
      const blockedResponse: RAGResponse = {
        query: userQuery,
        transcript,
        answer: inputCheck.reason || "I couldn't find enough reliable information in the knowledge base to answer that.",
        groundingStatus: inputCheck.status,
        confidence: 0.1,
        citations: [],
        retrievedEvidence: [],
        latencies,
        guardrailNotes,
        strategyUsed: options.strategy || globalVectorDb.getActiveStrategy(),
        timestamp: new Date().toISOString(),
        isAbstained: true,
        queryAnalysis: queryAnalysisInfo,
        conversationHistory: this.conversationHistory,
      };
      this.recordTurn(userQuery, analysis.resolvedContextualQuery, blockedResponse.answer, inputCheck.status);
      return blockedResponse;
    }

    // Stage 4: Embedding (embed the resolved contextual query)
    const embedStart = performance.now();
    await SemanticEmbedder.embedText(analysis.resolvedContextualQuery);
    latencies.embedding_ms = Number((performance.now() - embedStart).toFixed(2));

    // Stage 5: Multi-Strategy Hybrid Retrieval with semantic expansions
    const retrievalStart = performance.now();
    const retriever = new MultiStrategyRetriever(globalVectorDb);
    const retrievedChunks = await retriever.retrieve(analysis.resolvedContextualQuery, {
      topK: (options.topK || 4) * 2,
      expandedQueries: analysis.expandedSearchQueries,
      subQueries: analysis.subQueries.map(sq => sq.subQuery),
    });
    latencies.retrieval_ms = Number((performance.now() - retrievalStart).toFixed(2));

    // Stage 6: Semantic Cross-Reranking
    const rerankStart = performance.now();
    const rerankedEvidence = SemanticReranker.rerank(
      analysis.resolvedContextualQuery, 
      retrievedChunks, 
      options.topK || 4
    );
    latencies.reranking_ms = Number((performance.now() - rerankStart).toFixed(2));

    // Stage 7: Retrieval Sufficiency Guardrail
    const sufficiencyCheck = GuardrailsEngine.evaluateRetrievalSufficiency(
      rerankedEvidence, 
      analysis.resolvedContextualQuery
    );
    guardrailNotes.push(...sufficiencyCheck.notes);

    // If query is completely out of dataset and score is extremely low
    const topScore = rerankedEvidence[0]?.rerankScore ?? 0;
    const isOutOfDomain = topScore < 0.12 && !analysis.isConversationalGreeting;

    if (isOutOfDomain) {
      latencies.total_ms = Number((performance.now() - totalStart).toFixed(2));
      const abstainedAnswer = analysis.detectedLanguage === 'hi'
        ? "उपलब्ध ज्ञानकोष (Knowledge Base) में इस विषय के बारे में पर्याप्त सत्यापित जानकारी नहीं मिली।"
        : "I couldn't find enough reliable information in the available knowledge base to answer that accurately.";

      const abstainedResponse: RAGResponse = {
        query: userQuery,
        transcript,
        answer: abstainedAnswer,
        groundingStatus: 'INSUFFICIENT_CONTEXT',
        confidence: 0.1,
        citations: [],
        retrievedEvidence: rerankedEvidence,
        latencies,
        guardrailNotes: [...guardrailNotes, 'Sufficiency Guardrail: Abstained due to lack of evidence in dataset.'],
        strategyUsed: options.strategy || globalVectorDb.getActiveStrategy(),
        timestamp: new Date().toISOString(),
        isAbstained: true,
        queryAnalysis: queryAnalysisInfo,
        conversationHistory: this.conversationHistory,
      };
      this.recordTurn(userQuery, analysis.resolvedContextualQuery, abstainedAnswer, 'INSUFFICIENT_CONTEXT');
      return abstainedResponse;
    }

    // Stage 8: LLM Generation (Gemini 3.7 Flash or Structured Synthesizer)
    const genStart = performance.now();
    const allowGemini = options.useGemini !== false;
    const { answer } = await this.generateAnswer(
      userQuery,
      analysis,
      rerankedEvidence,
      history,
      allowGemini
    );
    latencies.generation_ms = Number((performance.now() - genStart).toFixed(2));

    // Stage 9: Grounding Verification
    const groundStart = performance.now();
    const groundingResult = GuardrailsEngine.verifyAnswerGrounding(answer, rerankedEvidence);
    latencies.grounding_ms = Number((performance.now() - groundStart).toFixed(2));
    guardrailNotes.push(...groundingResult.notes);

    // Citations mapping
    const citations: Citation[] = rerankedEvidence.slice(0, 3).map(e => ({
      docId: e.chunk.docId,
      chunkId: e.chunk.id,
      title: e.chunk.title,
      text: e.chunk.text,
      relevanceScore: e.rerankScore,
      source: e.chunk.source,
    }));

    latencies.total_ms = Number((performance.now() - totalStart).toFixed(2));

    const finalResponse: RAGResponse = {
      query: userQuery,
      transcript,
      answer,
      groundingStatus: groundingResult.status,
      confidence: groundingResult.confidence,
      citations,
      retrievedEvidence: rerankedEvidence,
      latencies,
      guardrailNotes,
      strategyUsed: options.strategy || globalVectorDb.getActiveStrategy(),
      timestamp: new Date().toISOString(),
      isAbstained: false,
      queryAnalysis: queryAnalysisInfo,
      conversationHistory: this.conversationHistory,
    };

    this.recordTurn(userQuery, analysis.resolvedContextualQuery, answer, groundingResult.status);
    return finalResponse;
  }

  private static recordTurn(
    query: string,
    resolvedQuery: string | undefined,
    answer: string,
    groundingStatus: string
  ) {
    this.conversationHistory.push({
      id: `turn_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      query,
      resolvedQuery,
      answer,
      groundingStatus,
      timestamp: new Date().toISOString(),
    });

    // Keep last 10 conversation turns
    if (this.conversationHistory.length > 10) {
      this.conversationHistory.shift();
    }
  }

  /**
   * Generates answer conditioned on retrieved context, language preference, and query intent
   */
  private static async generateAnswer(
    query: string,
    analysis: QueryAnalysisResult,
    evidence: any[],
    history: ConversationTurn[],
    allowGemini: boolean = true
  ): Promise<{ answer: string; rawCitations: string[] }> {
    const topChunk = evidence[0]?.chunk;
    const secondChunk = evidence[1]?.chunk;

    // Check if Gemini is allowed and not currently in rate-limit cooldown
    if (allowGemini && Date.now() > this.quotaCooldownUntil) {
      const ai = this.getGemini();
      if (ai) {
        const contextPassages = evidence.map((e, idx) => 
          `[Source ${idx + 1}: ${e.chunk.title} (${e.chunk.docId})]\n${e.chunk.text}`
        ).join('\n\n');

        const recentHistoryText = history.slice(-2).map(h => 
          `User: ${h.query}\nAssistant: ${h.answer.slice(0, 180)}...`
        ).join('\n\n');

        const prompt = `You are VAANI AI, a voice-first retrieval-augmented intelligence platform developed by SparkMind – VAA.
Your goal is to provide a grounded, high-precision, natural answer to the user's question.

QUERY UNDERSTANDING DETAILS:
- Raw Query: "${query}"
- Contextual Resolution: "${analysis.resolvedContextualQuery}"
- Primary Intent: ${analysis.primaryIntent}
- Detected Language: ${analysis.detectedLanguage} (English / Hindi / Hinglish)
- Is Multi-Intent: ${analysis.isMultiIntent ? 'Yes (Decompose and answer all parts clearly)' : 'No'}
- Is Follow-up: ${analysis.isFollowUp ? 'Yes (Relate directly to conversation context)' : 'No'}

RECENT CONVERSATION CONTEXT:
${recentHistoryText || 'None'}

RETRIEVED KNOWLEDGE BASE PASSAGES:
${contextPassages}

RULES:
1. Ground your response in the provided context passages. Cite sources inline where applicable (e.g. [Source 1], [Source 2]).
2. LANGUAGE: If the user asks in Hindi, answer in clean natural Hindi. If Hinglish, use natural Hinglish/Hindi. If English, answer in English.
3. CONVERSATIONAL TONE: If the question is simple, give a crisp, concise answer. If it's an explanation/comparison/how-why/multi-part question, structure the response clearly with:
   - Direct Answer
   - Key Points / Mechanism
   - Summary / Context
4. NO HALLUCINATIONS: If the provided knowledge base does NOT contain sufficient evidence, clearly state: "I couldn't find enough reliable information in the available knowledge base to answer that accurately."
5. Do NOT output robotic boilerplate or repetitive disclaimers.

GROUNDED ANSWER:`;

        try {
          const response = await ai.models.generateContent({
            model: 'gemini-3.7-flash',
            contents: prompt,
          });

          const text = response.text?.trim();
          if (text) {
            return { answer: text, rawCitations: [] };
          }
        } catch (err: any) {
          const errStr = String(err?.message || err);
          const isRateLimitOrUnavailable = 
            err?.status === 'RESOURCE_EXHAUSTED' || 
            err?.code === 429 || 
            err?.status === 'UNAVAILABLE' || 
            err?.code === 503 ||
            errStr.includes('429') || 
            errStr.includes('quota') ||
            errStr.includes('503');

          if (isRateLimitOrUnavailable) {
            this.quotaCooldownUntil = Date.now() + 35000;
            console.log("[VAANI AI] Gemini rate-limit detected; activating deterministic synthesizer fallback.");
          } else {
            console.warn("[VAANI AI] Gemini generation error, using deterministic fallback:", errStr);
          }
        }
      }
    }

    // High-fidelity fallback synthesizer respecting language & intent
    let answer = '';
    const isHindiOrHinglish = analysis.detectedLanguage === 'hi' || analysis.detectedLanguage === 'hinglish';

    if (analysis.isConversationalGreeting) {
      answer = isHindiOrHinglish
        ? `**नमस्ते!** मैं **VAANI AI** हूँ, SparkMind – VAA द्वारा विकसित वॉयस-फर्स्ट नॉलेज असिस्टेंट।\n\nआप विज्ञान, टेक्नोलॉजी, स्पेस मिशन्स, या अन्य किसी भी विषय पर प्रश्न पूछ सकते हैं।`
        : `**VAANI AI** is a voice-first Retrieval-Augmented Generation (RAG) platform developed by **SparkMind – VAA**, providing sub-200ms grounded answers.\n\nHow can I help you today?`;
    } else if (isHindiOrHinglish) {
      answer = `**प्रासंगिक साक्ष्य (${topChunk?.title || 'Knowledge Base'}):**\n\n${topChunk?.text || ''}\n\n${secondChunk ? `**अतिरिक्त संदर्भ (${secondChunk.title}):** ${secondChunk.text}` : ''}`;
    } else {
      answer = `Based on verified evidence from **${topChunk?.title || 'Knowledge Base'}**:\n\n${topChunk?.text || ''}\n\n${secondChunk ? `**Supporting Context (${secondChunk.title}):**\n${secondChunk.text}` : ''}`;
    }

    return { answer, rawCitations: [] };
  }
}
