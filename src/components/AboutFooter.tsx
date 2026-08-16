import React from 'react';
import { ArrowUp, Sparkles, ShieldCheck, Heart, Radio } from 'lucide-react';

interface AboutFooterProps {
  onScrollToTop: () => void;
}

export const AboutFooter: React.FC<AboutFooterProps> = ({ onScrollToTop }) => {
  return (
    <footer id="about" className="pt-24 pb-14 px-4 border-t border-cyan-500/15 bg-slate-950/80 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col gap-14">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
          <div className="flex flex-col gap-4 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 p-[1px] shadow-[0_0_12px_rgba(6,182,212,0.5)]">
                <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold tracking-[0.25em] text-white uppercase">
                  VAANI AI
                </span>
                <span className="text-[10px] tracking-widest text-cyan-400/80 uppercase -mt-0.5">
                  CINEMATIC AURORA INTELLIGENCE
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Voice-powered Retrieval-Augmented Intelligence with sub-200ms latency, multi-strategy chunking, and strict grounding verification.
            </p>
            <div className="text-xs font-mono text-slate-400">
              Tagline: <span className="text-cyan-300 font-bold">Speak. Search. Know.</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 font-mono text-xs">
            <div className="flex flex-col gap-3">
              <span className="text-[10px] text-cyan-400/80 uppercase tracking-widest font-bold">
                EXPERIENCE
              </span>
              <a href="#hero" className="text-slate-400 hover:text-cyan-300 transition-colors">
                AI Core Hero
              </a>
              <a href="#workspace" className="text-slate-400 hover:text-cyan-300 transition-colors">
                Retrieval Studio
              </a>
              <a href="#evidence" className="text-slate-400 hover:text-cyan-300 transition-colors">
                Evidence Cards
              </a>
              <a href="#metrics" className="text-slate-400 hover:text-cyan-300 transition-colors">
                Latency Analytics
              </a>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[10px] text-cyan-400/80 uppercase tracking-widest font-bold">
                SYSTEM
              </span>
              <a href="#pipeline" className="text-slate-400 hover:text-cyan-300 transition-colors">
                9-Stage Harness
              </a>
              <a href="#dataset" className="text-slate-400 hover:text-cyan-300 transition-colors">
                MSMARCO Corpus
              </a>
              <a href="#architecture" className="text-slate-400 hover:text-cyan-300 transition-colors">
                Architecture Spec
              </a>
              <a href="#compliance" className="text-slate-400 hover:text-cyan-300 transition-colors">
                System Audit
              </a>
            </div>

            <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
              <span className="text-[10px] text-cyan-400/80 uppercase tracking-widest font-bold">
                ORGANIZATION
              </span>
              <div className="text-white font-bold">SparkMind – VAA</div>
              <div className="text-slate-400 text-[11px]">Voice-Enabled RAG System</div>
              <div className="text-emerald-400 text-[11px] font-bold">Production Intelligence</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-800 text-[11px] font-mono text-slate-500">
          <div>
            © 2026 VAANI AI • Developed by <strong className="text-slate-300">SparkMind – VAA</strong>.
          </div>

          <button
            onClick={onScrollToTop}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 border border-cyan-500/20 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
