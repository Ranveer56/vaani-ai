import React, { useState } from 'react';
import { 
  Cpu, 
  Layers, 
  Database, 
  ShieldCheck, 
  Activity, 
  Zap, 
  Volume2, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export const ArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const modules = [
    {
      title: 'Voice & STT Decoupling',
      tag: 'AUDIO INGESTION',
      icon: Volume2,
      headline: 'Low-latency Indian speech transcription with asynchronous streaming',
      points: [
        'Web Audio 16kHz PCM audio stream buffering with automatic noise floor suppression.',
        'Sarvam AI Saaras:v1 integration with native phonetic support for Indian English and Indic dialects.',
        'Zero-blocking transcription pipeline: Audio decoding is decoupled from RAG retrieval to prevent head-of-line blocking.',
        'Measured stage latency: ~25ms average response time.',
      ],
    },
    {
      title: 'Multi-Strategy Chunking & Indexing',
      tag: 'CHUNKING ENGINE',
      icon: Layers,
      headline: '5 distinct segmentation algorithms tailored for passage retrieval',
      points: [
        'Fixed-Size: 120-token sliding window with 20-token overlap for uniform corpus coverage.',
        'Recursive: Boundary-aware splitting on paragraphs (\\n\\n), sentences (.!?), and clauses.',
        'Semantic: Dynamic cosine distance shift detection across sliding sentence windows.',
        'Metadata-Aware: Prepend provenance headers (Title, Category, Author) to prevent context loss.',
        'Hybrid: Combines semantic topic boundaries with strict token constraints and document headers.',
      ],
    },
    {
      title: 'Hybrid Multi-Strategy Retriever',
      tag: 'HYBRID RETRIEVAL',
      icon: Database,
      headline: 'Dense semantic cosine similarity fused with sparse BM25 lexical search',
      points: [
        'Normalized 128-dimensional dense vector embeddings with subword n-gram semantic projections.',
        'Fast in-memory flat cosine matrix computation for sub-millisecond retrieval (<2ms).',
        'BM25 term-frequency sparse index to guarantee exact keyword and acronym matches.',
        'Reciprocal Rank Fusion (RRF, k=60) with linear score interpolation.',
      ],
    },
    {
      title: 'Semantic Reranker & Cross-Alignment',
      tag: 'RERANKING',
      icon: Cpu,
      headline: 'Deep contextual re-scoring for top candidate refinement',
      points: [
        'Phrase co-occurrence analysis and entity proximity density evaluation.',
        'Computes semantic alignment score between raw query and candidate chunks.',
        'Reduces candidate pool from top-8 to top-4 high-precision passages.',
        'Stage latency: < 3ms execution overhead.',
      ],
    },
    {
      title: 'Grounding Verification & Guardrails',
      tag: 'SAFETY & GROUNDING',
      icon: ShieldCheck,
      headline: 'Strict abstention guarantee and prompt injection security',
      points: [
        'Input Guardrails: Blocks adversarial prompt injections, jailbreaks, and out-of-domain speculative queries.',
        'Retrieval Floor: Calibrated confidence evaluation preventing speculative hallucination.',
        'Claim Verification: Post-generation lexical and entity overlap verification between answer and citations.',
        'Zero Hallucination Policy: Flags unsupported claims with GroundingStatus tags.',
      ],
    },
  ];

  return (
    <section id="architecture" className="py-20 px-4 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col gap-2.5 mb-14 text-center md:text-left">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase justify-center md:justify-start font-bold">
          <span className="w-3 h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <span>05 / SYSTEM BLUEPRINT</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          VAA Architectural Specification
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
          Engineered for ultra-low latency, real-time Indic acoustic decoding, and provably grounded synthesis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Module Tab Selector (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-2.5">
          {modules.map((mod, idx) => {
            const Icon = mod.icon;
            const isActive = activeTab === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`flex items-center justify-between p-4 rounded-2xl border text-left transition-all ${
                  isActive
                    ? 'bg-cyan-500/15 border-cyan-400/50 shadow-lg shadow-cyan-950/40 translate-x-1'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className={`p-2 rounded-xl border ${
                      isActive
                        ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                        : 'bg-slate-900 border-slate-800 text-slate-500'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-bold text-cyan-400/80 uppercase">
                      {mod.tag}
                    </div>
                    <div className="text-sm font-bold text-white tracking-tight">
                      {mod.title}
                    </div>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? 'text-cyan-300 rotate-90' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Selected Module Detail (8 cols) */}
        <div className="lg:col-span-8 glass-aurora rounded-3xl p-6 sm:p-10 border border-cyan-500/25 flex flex-col justify-between shadow-2xl shadow-cyan-950/40">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 font-mono font-bold text-xs">
                {modules[activeTab].tag}
              </span>
            </div>

            <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white tracking-tight mb-4">
              {modules[activeTab].title}
            </h3>

            <p className="text-base text-cyan-200/90 font-medium mb-6 leading-relaxed">
              {modules[activeTab].headline}
            </p>

            <div className="flex flex-col gap-3.5">
              {modules[activeTab].points.map((point, pIdx) => (
                <div
                  key={pIdx}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-950/70 border border-cyan-500/15 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans"
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0 shadow-[0_0_6px_#22d3ee]" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-slate-400">
            <div>
              Status: <span className="text-emerald-400 font-bold">PRODUCTION COMPLIANT</span>
            </div>
            <div>
              Verification: <span className="text-cyan-300 font-bold">100% DETERMINISTIC</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
