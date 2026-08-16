import React from 'react';
import { Mic, ArrowDown, Sparkles, Volume2, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onStartVoice: () => void;
  isRecording: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onStartVoice, isRecording }) => {
  return (
    <div className="relative pt-6 sm:pt-12 pb-8 flex flex-col items-center text-center">
      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wide mb-6 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
      >
        <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>HACKATHON EDITION // SUB-200ms DUAL ENGINE</span>
      </motion.div>

      {/* Main Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl"
      >
        Speak. Search.{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-indigo-400">
          Know Instantly.
        </span>
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed"
      >
        Ultra-low latency voice retrieval pipeline with hybrid BM25 + dense vector indexing, neural reranking, and verified zero-hallucination citations.
      </motion.p>

      {/* Primary Voice CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-10 flex flex-col sm:flex-row items-center gap-4 z-20"
      >
        <button
          id="hero-voice-btn"
          type="button"
          onClick={() => {
            console.log('[VAANI] Hero Voice Button Clicked');
            onStartVoice();
          }}
          className={`cursor-pointer group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-200 shadow-2xl ${
            isRecording
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-[0_0_40px_rgba(239,68,68,0.6)] ring-4 ring-red-500/30 animate-pulse'
              : 'bg-gradient-to-r from-cyan-500 via-teal-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white shadow-[0_0_35px_rgba(6,182,212,0.4)]'
          }`}
        >
          <div className="p-2 rounded-xl bg-black/20">
            <Mic className={`w-5 h-5 ${isRecording ? 'animate-bounce text-white' : 'text-white'}`} />
          </div>
          <span className="font-medium tracking-wide">
            {isRecording ? 'Stop Recording (Listening...)' : 'Start Voice Query'}
          </span>
          <Sparkles className="w-4 h-4 text-cyan-200 opacity-80 group-hover:rotate-12 transition-transform" />
        </button>

        <a
          href="#query"
          className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white font-medium text-sm transition-all"
        >
          <span>Explore Workspace</span>
          <ArrowDown className="w-4 h-4 text-slate-400" />
        </a>
      </motion.div>

      {/* Feature Highlights Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl"
      >
        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm text-left">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-1">
            <Zap className="w-3.5 h-3.5" />
            <span>&lt; 200ms</span>
          </div>
          <p className="text-white text-sm font-semibold">End-to-End Latency</p>
          <p className="text-slate-400 text-xs mt-0.5">Real-time voice retrieval</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm text-left">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-mono mb-1">
            <Volume2 className="w-3.5 h-3.5" />
            <span>Multi-Lingual</span>
          </div>
          <p className="text-white text-sm font-semibold">Indian STT Voice Engine</p>
          <p className="text-slate-400 text-xs mt-0.5">Hindi, English & Hinglish</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm text-left">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono mb-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>94%+</span>
          </div>
          <p className="text-white text-sm font-semibold">Grounding Verification</p>
          <p className="text-slate-400 text-xs mt-0.5">Zero-hallucination guardrail</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800/80 backdrop-blur-sm text-left">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4 Strategies</span>
          </div>
          <p className="text-white text-sm font-semibold">Dynamic Chunking</p>
          <p className="text-slate-400 text-xs mt-0.5">Semantic & Hybrid Index</p>
        </div>
      </motion.div>
    </div>
  );
};
