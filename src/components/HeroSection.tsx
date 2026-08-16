import React from 'react';
import { Mic, MicOff, ArrowDown, Sparkles, Volume2, ShieldCheck, Zap, Radio, Terminal } from 'lucide-react';
import { VoiceVisualizer } from './VoiceVisualizer';

interface HeroSectionProps {
  isListening: boolean;
  audioLevel: number;
  isProcessing: boolean;
  pipelineStage: string;
  onToggleMic: () => void;
  onExploreSystem: () => void;
  onQuickQuery: (q: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isListening,
  audioLevel,
  isProcessing,
  pipelineStage,
  onToggleMic,
  onExploreSystem,
  onQuickQuery,
}) => {
  const getMicButtonLabel = () => {
    if (isListening) return 'LISTENING...';
    if (isProcessing) {
      if (pipelineStage === 'speech_to_text') return 'TRANSCRIBING AUDIO...';
      if (pipelineStage === 'vector_search' || pipelineStage === 'multi_strategy_retrieval') return 'SEARCHING KNOWLEDGE...';
      if (pipelineStage === 'reranking') return 'RERANKING CANDIDATES...';
      if (pipelineStage === 'rag_generation') return 'FORMING ANSWER...';
      return 'UNDERSTANDING...';
    }
    return 'ASK VAANI';
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 overflow-hidden bg-grid-lines"
    >
      {/* Aurora Ambient Core Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] bg-gradient-to-br from-cyan-500/15 via-indigo-600/15 to-violet-600/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full mx-auto flex flex-col items-center text-center">
        {/* Eyebrow Pill with Live Pulse Beacon */}
        <div
          id="hero-eyebrow"
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 text-[11px] font-mono tracking-[0.25em] uppercase text-cyan-300 mb-8 shadow-lg shadow-cyan-950/40"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_#22d3ee]" />
          <span className="font-semibold">SPARKMIND • VOICE INTELLIGENCE</span>
        </div>

        {/* Oversized Cinematic Heading */}
        <h1
          id="hero-title"
          className="font-display font-extrabold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight leading-[1.02] mb-6 select-none"
        >
          Speak.{' '}
          <span className="text-gradient-aurora block sm:inline font-bold">
            And let knowledge answer.
          </span>
        </h1>

        {/* Supporting Editorial Copy */}
        <p
          id="hero-description"
          className="text-base sm:text-lg md:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed mb-8 tracking-wide"
        >
          <strong className="text-white font-semibold">VAANI AI</strong> transforms natural speech into grounded, verifiable answers through sub-200ms multi-strategy retrieval, Sarvam STT, and rigorous grounding guardrails.
        </p>

        {/* Centerpiece 3D/Canvas AI Intelligence Core */}
        <div className="my-3 relative">
          <VoiceVisualizer
            isListening={isListening}
            audioLevel={audioLevel}
            isProcessing={isProcessing}
            statusText={
              isListening
                ? 'LISTENING TO VOICE'
                : isProcessing
                ? pipelineStage.toUpperCase().replace(/_/g, ' ')
                : 'INTELLIGENCE CORE ACTIVE'
            }
            size={300}
          />
        </div>

        {/* Main Hero Microphone CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            id="hero-mic-cta"
            onClick={onToggleMic}
            className={`group relative flex items-center gap-3.5 px-9 py-4 rounded-full font-bold text-sm tracking-wider uppercase transition-all duration-300 active:scale-95 shadow-2xl ${
              isListening
                ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-red-500/50 scale-105 animate-pulse'
                : 'bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 text-slate-950 hover:shadow-cyan-400/40 hover:scale-[1.03]'
            }`}
          >
            <div className={`p-1.5 rounded-full ${isListening ? 'bg-white/25' : 'bg-slate-950/15'}`}>
              {isListening ? (
                <MicOff className="w-4 h-4 text-white" />
              ) : (
                <Mic className="w-4 h-4 text-slate-950" />
              )}
            </div>
            <span>{getMicButtonLabel()}</span>
          </button>

          <button
            id="hero-explore-cta"
            onClick={onExploreSystem}
            className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-slate-900/80 hover:bg-slate-800/90 border border-cyan-500/25 text-xs font-bold tracking-wider uppercase text-cyan-200 hover:text-white transition-all active:scale-95 shadow-lg shadow-cyan-950/30"
          >
            <span>EXPLORE THE SYSTEM</span>
            <ArrowDown className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>

        {/* Quick Voice Prompt Pills */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2.5 max-w-3xl">
          <div className="flex items-center gap-1.5 text-[11px] text-cyan-400/80 uppercase tracking-widest font-mono mr-1 font-semibold">
            <Terminal className="w-3 h-3 text-cyan-400" />
            <span>TRY ASKING:</span>
          </div>
          {[
            "How do photovoltaic solar cells work?",
            "Explain transformer self-attention mechanism",
            "What did ISRO achieve with Chandrayaan-3?",
            "What is the geography of Goa?",
          ].map((prompt, i) => (
            <button
              key={i}
              onClick={() => onQuickQuery(prompt)}
              className="text-xs px-3.5 py-1.5 rounded-full bg-slate-900/70 hover:bg-cyan-500/15 border border-slate-700/60 hover:border-cyan-400/40 text-slate-300 hover:text-cyan-200 transition-all text-left truncate max-w-[280px] shadow-sm hover:shadow-cyan-950/40"
            >
              "{prompt}"
            </button>
          ))}
        </div>

        {/* Feature Badges Bento Row */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-8 border-t border-cyan-500/15 text-left font-mono">
          <div className="glass-card-cyan rounded-2xl p-4 transition-transform hover:-translate-y-1">
            <div className="text-[10px] text-cyan-400/80 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>LATENCY TARGET</span>
            </div>
            <div className="text-base font-extrabold text-white tracking-tight">&lt; 200ms P50</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Microsecond stage telemetry</div>
          </div>

          <div className="glass-card-violet rounded-2xl p-4 transition-transform hover:-translate-y-1">
            <div className="text-[10px] text-violet-300 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
              <Volume2 className="w-3.5 h-3.5 text-violet-400" />
              <span>STT ENGINE</span>
            </div>
            <div className="text-base font-extrabold text-white tracking-tight">Sarvam Speech AI</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Indic multilingual acoustic model</div>
          </div>

          <div className="glass-card-emerald rounded-2xl p-4 transition-transform hover:-translate-y-1">
            <div className="text-[10px] text-emerald-300 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>GROUNDING</span>
            </div>
            <div className="text-base font-extrabold text-emerald-300 tracking-tight">Strict Verification</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Zero hallucination policy</div>
          </div>

          <div className="glass-card-cyan rounded-2xl p-4 transition-transform hover:-translate-y-1">
            <div className="text-[10px] text-cyan-400/80 uppercase tracking-wider mb-1 flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>CORPUS</span>
            </div>
            <div className="text-base font-extrabold text-white tracking-tight">MSMARCO-XI</div>
            <div className="text-[10px] text-slate-400 mt-0.5">5 chunking strategies live</div>
          </div>
        </div>
      </div>
    </section>
  );
};
