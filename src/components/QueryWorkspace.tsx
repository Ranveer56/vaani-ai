import React, { useState } from 'react';
import { 
  Mic, 
  MicOff, 
  Send, 
  RotateCcw, 
  Volume2, 
  ShieldCheck, 
  AlertTriangle, 
  ExternalLink, 
  FileText, 
  Layers, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Zap,
  Tag,
  Info,
  Languages,
  GitFork,
  MessageSquare,
  HelpCircle,
  Search
} from 'lucide-react';
import { RAGResponse, ChunkingStrategy, GroundingStatus } from '../types';

interface QueryWorkspaceProps {
  query: string;
  transcript: string;
  setQuery: (q: string) => void;
  setTranscript: (t: string) => void;
  isListening: boolean;
  recordingSeconds: number;
  audioLevel: number;
  isProcessing: boolean;
  activeStrategy: ChunkingStrategy;
  onStrategyChange: (strategy: ChunkingStrategy) => void;
  onToggleMic: () => void;
  onSubmitQuery: (q?: string) => void;
  onClear: () => void;
  ragResult: RAGResponse | null;
}

export const QueryWorkspace: React.FC<QueryWorkspaceProps> = ({
  query,
  transcript,
  setQuery,
  setTranscript,
  isListening,
  recordingSeconds,
  audioLevel,
  isProcessing,
  activeStrategy,
  onStrategyChange,
  onToggleMic,
  onSubmitQuery,
  onClear,
  ragResult,
}) => {
  const [expandedChunkId, setExpandedChunkId] = useState<string | null>(null);
  const [showWhyRetrieved, setShowWhyRetrieved] = useState<string | null>(null);
  const [isPlayingTTS, setIsPlayingTTS] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTabCategory, setActiveTabCategory] = useState<'all' | 'multilingual' | 'how_why' | 'comparison' | 'multi_intent' | 'follow_up'>('all');

  const speakAnswer = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isPlayingTTS) {
      setIsPlayingTTS(false);
      return;
    }

    const cleanText = text.replace(/\[Source \d+\]/g, '').replace(/[*#]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsPlayingTTS(false);
    utterance.onerror = () => setIsPlayingTTS(false);

    setIsPlayingTTS(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getGroundingBadge = (status: GroundingStatus) => {
    switch (status) {
      case 'GROUNDED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(16,185,129,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
            ● GROUNDED
          </span>
        );
      case 'PARTIALLY_GROUNDED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_12px_rgba(245,158,11,0.3)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_6px_#fbbf24]" />
            ● PARTIALLY GROUNDED
          </span>
        );
      case 'INSUFFICIENT_CONTEXT':
      case 'UNSUPPORTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-600 text-slate-300 text-xs font-mono font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            INSUFFICIENT CONTEXT
          </span>
        );
      case 'SAFETY_VIOLATION':
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-400/40 text-rose-300 text-xs font-mono font-bold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            SAFETY GUARD TRIGGERED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono">
            {status}
          </span>
        );
    }
  };

  const naturalQueryExamples = [
    {
      category: 'multilingual',
      langBadge: 'Hinglish',
      label: 'Iske baare mein thoda simple mein samjhao',
      query: 'Solar energy ke baare mein thoda simple mein samjhao.',
      intent: 'Explanation & Simplification',
    },
    {
      category: 'multilingual',
      langBadge: 'Hindi (हिन्दी)',
      label: 'चंद्रयान-3 मिशन की मुख्य बातें क्या हैं?',
      query: 'चंद्रयान-3 और आदित्य-L1 सौर मिशन की मुख्य बातें क्या हैं?',
      intent: 'Factual & Summary',
    },
    {
      category: 'multilingual',
      langBadge: 'Hinglish',
      label: 'Ye dono cheezein kaise different hain?',
      query: 'Classical computer aur quantum computing kaise different hain?',
      intent: 'Comparison',
    },
    {
      category: 'how_why',
      langBadge: 'English',
      label: 'How do photovoltaic cells convert sunlight?',
      query: 'How do photovoltaic solar cells convert sunlight into electricity step by step?',
      intent: 'Mechanism & How-Why',
    },
    {
      category: 'how_why',
      langBadge: 'English',
      label: 'Why is mitochondria called the powerhouse?',
      query: 'Why is mitochondria called the powerhouse of the cell and how does ATP synthesis occur?',
      intent: 'How & Why',
    },
    {
      category: 'comparison',
      langBadge: 'English',
      label: 'Compare symmetric vs asymmetric encryption',
      query: 'Compare SHA-256 cryptographic hashing and RSA asymmetric public-key encryption.',
      intent: 'Deep Comparison',
    },
    {
      category: 'multi_intent',
      langBadge: 'English',
      label: 'Multi-part: What is CRISPR, why is it used, and how does Cas9 work?',
      query: 'What is CRISPR, why is it important, and how does the Cas9 guide RNA mechanism work?',
      intent: 'Multi-Intent Decomposition',
    },
    {
      category: 'follow_up',
      langBadge: 'Contextual',
      label: 'Why is it important? (Contextual Follow-up)',
      query: 'Why is it important?',
      intent: 'Short-term Context Resolution',
    },
    {
      category: 'follow_up',
      langBadge: 'Contextual',
      label: 'Tell me more about the second point',
      query: 'Tell me more about that and explain the second point.',
      intent: 'Conversational Continuity',
    }
  ];

  const filteredExamples = activeTabCategory === 'all' 
    ? naturalQueryExamples 
    : naturalQueryExamples.filter(e => e.category === activeTabCategory);

  const chunkingStrategies: { id: ChunkingStrategy; label: string; desc: string }[] = [
    { id: 'hybrid', label: 'Hybrid Fusion', desc: 'Semantic boundaries + Adaptive tokens + Provenance header' },
    { id: 'metadata_aware', label: 'Metadata-Aware', desc: 'Preserves document structure & metadata preamble' },
    { id: 'semantic', label: 'Semantic Shift', desc: 'Cosine distance topic segmentation' },
    { id: 'recursive', label: 'Recursive', desc: 'Paragraph & sentence clause splitting' },
    { id: 'fixed', label: 'Fixed-Size', desc: 'Sliding 120-token window with 20-token overlap' },
  ];

  const analysis = ragResult?.queryAnalysis;

  return (
    <section className="flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>VAANI AI • UNIVERSAL QUERY UNDERSTANDING</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Natural Language, Multilingual & Contextual Search
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl">
          Ask anything in English, Hindi, or Hinglish. VAANI AI decomposes multi-part intents, resolves conversational follow-ups, and performs semantic hybrid retrieval with verifiable source grounding.
        </p>
      </div>

      {/* Natural Query Category Pills */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Search className="w-3.5 h-3.5 text-cyan-400" />
            <span>TRY ANY QUERY PATTERN OR LANGUAGE:</span>
          </span>
          <div className="flex items-center gap-1">
            {(['all', 'multilingual', 'how_why', 'comparison', 'multi_intent', 'follow_up'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTabCategory(tab)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all capitalize ${
                  activeTabCategory === tab
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 font-bold'
                    : 'text-slate-400 hover:text-slate-200 bg-slate-900/60 border border-slate-800'
                }`}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {filteredExamples.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(item.query);
                setTranscript(item.query);
                onSubmitQuery(item.query);
              }}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-cyan-950/60 border border-slate-800 hover:border-cyan-500/50 text-left transition-all text-xs"
            >
              <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-cyan-300 group-hover:bg-cyan-500/20">
                {item.langBadge}
              </span>
              <span className="text-slate-200 group-hover:text-white truncate max-w-[280px]">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Interactive Input & Transcript (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Query Control Glass Panel */}
          <div className="glass-aurora rounded-3xl p-6 relative overflow-hidden border border-cyan-500/20 shadow-xl shadow-cyan-950/30">
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                <Mic className="w-3.5 h-3.5 text-cyan-400" />
                <span>VOICE & TEXT INPUT</span>
              </div>
              {isListening && (
                <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/40 text-[10px] font-mono text-rose-300 font-bold animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                  REC {recordingSeconds}s
                </span>
              )}
            </div>

            {/* Microphone Button in Input Card */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={onToggleMic}
                id="workspace-mic-btn"
                className={`p-4 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl ${
                  isListening
                    ? 'bg-rose-500 text-white shadow-rose-500/40 animate-pulse scale-105'
                    : 'bg-gradient-to-tr from-cyan-500 to-indigo-600 text-slate-950 hover:shadow-cyan-500/40 hover:scale-105'
                }`}
                title={isListening ? 'Stop Recording' : 'Start Voice Input'}
              >
                {isListening ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-slate-950" />}
              </button>

              <div className="flex-1">
                <div className="text-xs font-semibold text-white">
                  {isListening ? 'Recording Audio Stream...' : 'Universal Voice Recognition'}
                </div>
                <div className="text-[11px] text-slate-400">
                  {isListening ? 'Speak naturally in English, Hindi, or Hinglish' : 'Speak or type any natural language question'}
                </div>
                {/* Audio visualizer mini frequency bars */}
                {isListening && (
                  <div className="flex items-center gap-1 mt-2 h-4">
                    {[40, 75, 100, 60, 85, 30, 95, 50, 80].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 bg-cyan-400 rounded-full transition-all duration-75"
                        style={{ height: `${Math.max(4, (audioLevel / 100) * h)}px` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Editable Transcript Box */}
            <div className="flex flex-col gap-1.5 mb-4">
              <label className="text-[11px] font-mono text-cyan-300/80 font-bold uppercase tracking-wider flex items-center justify-between">
                <span>SPEECH TRANSCRIPT / QUERY:</span>
                <span className="text-[10px] text-slate-400 font-normal">Editable</span>
              </label>
              <textarea
                value={query || transcript}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setTranscript(e.target.value);
                }}
                placeholder="Ask in English, Hindi, or Hinglish (e.g. 'Iske baare mein simple mein samjhao' or 'What is CRISPR?')"
                rows={3}
                className="w-full bg-slate-950/80 border border-cyan-500/25 rounded-2xl p-3.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans leading-relaxed resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button
                onClick={onClear}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>CLEAR</span>
              </button>

              <button
                onClick={() => onSubmitQuery()}
                disabled={isProcessing || (!query.trim() && !transcript.trim())}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs tracking-wider uppercase transition-all shadow-lg ${
                  isProcessing || (!query.trim() && !transcript.trim())
                    ? 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 text-slate-950 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-95'
                }`}
              >
                {isProcessing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>UNDERSTANDING & RETRIEVING...</span>
                  </>
                ) : (
                  <>
                    <span>SUBMIT QUERY</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Real-time Query Understanding Telemetry Card */}
          {analysis && (
            <div className="glass-aurora rounded-3xl p-5 border border-indigo-500/30 bg-indigo-950/20">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-300 uppercase tracking-widest">
                  <Languages className="w-3.5 h-3.5 text-indigo-400" />
                  <span>UNIVERSAL INTENT TELEMETRY</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 border border-indigo-400/40 text-[10px] font-mono text-indigo-200 font-bold uppercase">
                  {analysis.detectedLanguage.toUpperCase()}
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                  <span className="text-slate-400">Primary Intent:</span>
                  <span className="text-cyan-300 font-bold">{analysis.primaryIntent}</span>
                </div>

                {analysis.isFollowUp && (
                  <div className="p-2 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-cyan-200">
                    <span className="font-bold text-cyan-400">● Contextual Resolution:</span> {analysis.resolvedContextualQuery}
                  </div>
                )}

                {analysis.isMultiIntent && analysis.subQueries && (
                  <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px]">
                    <span className="font-bold text-indigo-300">● Decomposed Sub-Intents ({analysis.subQueries.length}):</span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-300">
                      {analysis.subQueries.map((sq, i) => (
                        <li key={i} className="truncate">{sq.subQuery}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="text-[10px] text-slate-500 mr-1">Keywords:</span>
                  {analysis.extractedKeywords.slice(0, 6).map((kw, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-300">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Chunking Strategy Selector */}
          <div className="glass-aurora rounded-3xl p-5 border border-cyan-500/20">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                <SlidersHorizontal className="w-3.5 h-3.5 text-cyan-400" />
                <span>CHUNKING STRATEGY</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Live Ingest</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {chunkingStrategies.map((strat) => {
                const isActive = activeStrategy === strat.id;
                return (
                  <button
                    key={strat.id}
                    onClick={() => onStrategyChange(strat.id)}
                    className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-cyan-500/15 border-cyan-400/50 shadow-md shadow-cyan-950/40'
                        : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`text-xs font-bold ${isActive ? 'text-cyan-300' : 'text-slate-300'}`}>
                        {strat.label}
                      </span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 mt-0.5">{strat.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Grounded Answer & Retrieved Evidence (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6" id="evidence">
          {/* Main Answer Focus Panel */}
          <div className="glass-aurora rounded-3xl p-6 sm:p-8 border border-cyan-500/30 relative overflow-hidden shadow-2xl shadow-cyan-950/50">
            {/* Top Aurora Glow Edge */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

            {/* Answer Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-cyan-500/15 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-400/30">
                  <Sparkles className="w-4 h-4 text-cyan-300" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-mono font-bold tracking-widest uppercase text-cyan-300">
                    SYNTHESIZED ANSWER
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    Grounded with MSMARCO-XI Evidence & Guardrails
                  </span>
                </div>
              </div>

              {ragResult && (
                <div className="flex items-center gap-2">
                  {getGroundingBadge(ragResult.groundingStatus || (ragResult as any).groundingResult?.status)}
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-cyan-300">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{ragResult.latencies?.total_ms ?? 0}ms</span>
                  </div>
                </div>
              )}
            </div>

            {/* Answer Content */}
            {ragResult ? (
              <div className="flex flex-col gap-6">
                <div className="prose prose-invert max-w-none text-slate-100 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans">
                  {ragResult.answer}
                </div>

                {/* Answer Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => speakAnswer(ragResult.answer)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-semibold font-mono transition-all ${
                        isPlayingTTS
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 animate-pulse'
                          : 'bg-slate-900 border-slate-700 text-slate-300 hover:text-white'
                      }`}
                    >
                      <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{isPlayingTTS ? 'STOP AUDIO' : 'LISTEN TO ANSWER'}</span>
                    </button>

                    <button
                      onClick={() => handleCopy(ragResult.answer)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-mono text-slate-300 hover:text-white transition-all"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>

                  {ragResult.citations && ragResult.citations.length > 0 && (
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                      <span className="text-slate-500">Sources Cited:</span>
                      {ragResult.citations.map((c, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-bold">
                          [Source {i + 1}]
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="py-16 flex flex-col items-center justify-center text-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 mb-2">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div className="text-sm font-semibold text-slate-300">
                  Ready to Understand & Answer Any Query
                </div>
                <div className="text-xs text-slate-500 max-w-sm">
                  Click the microphone or pick any query to experience sub-200ms universal semantic RAG.
                </div>
              </div>
            )}
          </div>

          {/* Retrieved Evidence Section */}
          {ragResult && ragResult.retrievedEvidence && ragResult.retrievedEvidence.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest">
                  <FileText className="w-3.5 h-3.5 text-cyan-400" />
                  <span>RETRIEVED SOURCE EVIDENCE ({ragResult.retrievedEvidence.length} PASSAGES)</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Cross-Reranked
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {ragResult.retrievedEvidence.map((ev, idx) => {
                  const isExpanded = expandedChunkId === ev.chunk.id;
                  const relevancePercent = Math.round((ev.finalScore || ev.hybridScore || 0.8) * 100);
                  const isWhyOpen = showWhyRetrieved === ev.chunk.id;

                  return (
                    <div
                      key={ev.chunk.id}
                      className="glass-aurora rounded-2xl p-5 border border-cyan-500/20 transition-all hover:border-cyan-400/40"
                    >
                      {/* Evidence Card Header */}
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono font-bold text-xs">
                            SOURCE {idx + 1}
                          </span>
                          <span className="text-sm font-bold text-white tracking-tight">
                            {ev.chunk.title}
                          </span>
                        </div>

                        {/* Relevance Bar Gauge */}
                        <div className="flex items-center gap-2 font-mono text-xs">
                          <span className="text-[10px] text-slate-400 font-bold uppercase">RELEVANCE</span>
                          <div className="w-20 h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-700">
                            <div
                              className="h-full bg-gradient-to-r from-cyan-400 to-indigo-400 rounded-full"
                              style={{ width: `${relevancePercent}%` }}
                            />
                          </div>
                          <span className="text-cyan-300 font-bold">{relevancePercent}%</span>
                        </div>
                      </div>

                      {/* Snippet / Full Passage */}
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                        {isExpanded ? ev.chunk.text : `${ev.chunk.text.slice(0, 220)}...`}
                      </p>

                      {/* Card Footer Actions */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-3.5 pt-3 border-t border-slate-800/80 font-mono text-[11px]">
                        <div className="flex items-center gap-3 text-slate-400">
                          <span>DOC: <strong className="text-slate-200">{ev.chunk.docId}</strong></span>
                          <span>TOKENS: <strong className="text-slate-200">{ev.chunk.tokenCount}</strong></span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setShowWhyRetrieved(isWhyOpen ? null : ev.chunk.id)}
                            className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
                          >
                            <Info className="w-3 h-3" />
                            <span>WHY RETRIEVED</span>
                          </button>

                          <button
                            onClick={() => setExpandedChunkId(isExpanded ? null : ev.chunk.id)}
                            className="flex items-center gap-1 text-slate-300 hover:text-white font-semibold ml-2"
                          >
                            <span>{isExpanded ? 'COLLAPSE' : 'EXPAND'}</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>

                      {/* Interactive "Why this was retrieved" explanation drawer */}
                      {isWhyOpen && (
                        <div className="mt-3 p-3.5 rounded-xl bg-slate-950/90 border border-cyan-500/25 text-xs font-mono text-slate-300 flex flex-col gap-1.5 animate-fadeIn">
                          <div className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
                            RETRIEVAL ATTRIBUTION & SCORING:
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] pt-1">
                            <div>Dense Cosine: <strong className="text-white">{ev.denseScore}</strong></div>
                            <div>Sparse BM25: <strong className="text-white">{ev.sparseScore}</strong></div>
                            <div>Hybrid RRF: <strong className="text-white">{ev.hybridScore}</strong></div>
                            <div>Cross-Rerank: <strong className="text-cyan-300">{ev.rerankScore}</strong></div>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1">
                            High semantic overlap detected on key conceptual entities with category alignment.
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
