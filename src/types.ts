export type ChunkingStrategy = 'fixed' | 'recursive' | 'semantic' | 'metadata_aware' | 'hybrid';

export interface Document {
  id: string;
  title: string;
  source: string;
  passage: string;
  content?: string;
  language?: string;
  parentDocId?: string;
  category?: string;
  metadata?: Record<string, any>;
}

export interface Chunk {
  id: string;
  docId: string;
  title: string;
  source: string;
  text: string;
  strategy: ChunkingStrategy;
  chunkIndex: number;
  totalChunks: number;
  tokenCount: number;
  charStart: number;
  charEnd: number;
  metadata: Record<string, any>;
  embedding?: number[];
}

export interface RetrievalResult {
  chunk: Chunk;
  denseScore: number;
  sparseScore: number;
  hybridScore: number;
  rerankScore: number;
  finalScore: number;
  rank: number;
}

export type GroundingStatus = 
  | 'GROUNDED'
  | 'PARTIALLY_GROUNDED'
  | 'INSUFFICIENT_CONTEXT'
  | 'UNSUPPORTED'
  | 'OFF_TOPIC'
  | 'SAFETY_VIOLATION';

export interface Citation {
  docId: string;
  chunkId: string;
  title: string;
  text: string;
  relevanceScore: number;
  source: string;
}

export interface PipelineStageLatencies {
  stt_ms: number;
  embedding_ms: number;
  retrieval_ms: number;
  reranking_ms: number;
  generation_ms: number;
  grounding_ms: number;
  total_ms: number;
}

export interface PipelineState {
  currentStage: 
    | 'idle'
    | 'voice_input'
    | 'speech_to_text'
    | 'query_understanding'
    | 'multi_strategy_retrieval'
    | 'vector_search'
    | 'reranking'
    | 'rag_generation'
    | 'grounding_guard'
    | 'complete'
    | 'error';
  progress: number;
}

export interface AnalyzedSubQuery {
  subQuery: string;
  intent: string;
  keywords: string[];
}

export interface QueryAnalysisInfo {
  detectedLanguage: 'en' | 'hi' | 'hinglish' | 'other';
  primaryIntent: string;
  resolvedContextualQuery?: string;
  isFollowUp: boolean;
  isMultiIntent: boolean;
  isAmbiguous: boolean;
  requiresClarification: boolean;
  clarificationPrompt?: string;
  isConversationalGreeting: boolean;
  subQueries?: AnalyzedSubQuery[];
  extractedKeywords: string[];
}

export interface ConversationTurn {
  id: string;
  query: string;
  resolvedQuery?: string;
  answer: string;
  groundingStatus: string;
  timestamp: string;
  topicSummary?: string;
}

export interface RAGResponse {
  query: string;
  transcript?: string;
  answer: string;
  groundingStatus: GroundingStatus;
  confidence: number;
  citations: Citation[];
  retrievedEvidence: RetrievalResult[];
  latencies: PipelineStageLatencies;
  guardrailNotes?: string[];
  strategyUsed: ChunkingStrategy;
  timestamp: string;
  isAbstained?: boolean;
  queryAnalysis?: QueryAnalysisInfo;
  conversationHistory?: ConversationTurn[];
}

export interface BenchmarkTestCase {
  id: string;
  query: string;
  category: 'in_domain' | 'difficult' | 'ambiguous' | 'unsupported' | 'off_topic' | 'prompt_injection' | 'empty_retrieval';
  expectedGrounding: GroundingStatus;
  description: string;
}

export interface BenchmarkQueryRun {
  id: string;
  query: string;
  category: string;
  latency_ms: number;
  grounded: boolean;
  confidence: number;
  stageLatencies: PipelineStageLatencies;
  pass: boolean;
  status: GroundingStatus;
  answerSnippet: string;
}

export interface BenchmarkResult {
  totalQueries: number;
  p50: number;
  p70: number;
  p100: number;
  avg: number;
  min: number;
  max: number;
  groundingAccuracy: number;
  retrievalRecall: number;
  runs: BenchmarkQueryRun[];
  stageAverages: PipelineStageLatencies;
  timestamp: string;
}

export interface SystemHealth {
  status: 'healthy' | 'degraded' | 'error';
  totalDocs: number;
  totalChunks: number;
  strategiesCount: Record<ChunkingStrategy, number>;
  vectorIndexSize: number;
  memoryUsageMb: number;
  uptimeSec: number;
  sarvamConfigured: boolean;
  geminiConfigured: boolean;
}
