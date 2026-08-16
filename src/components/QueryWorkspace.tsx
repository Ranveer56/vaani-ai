import React from 'react';
import {
  Mic,
  Send,
  Radio,
  FileText,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  Search,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ChunkingStrategy, RAGResponse } from '../types';

interface QueryWorkspaceProps {
  activeStrategy: ChunkingStrategy;
  onStrategyChange: (s: ChunkingStrategy) => void;
  isRecording: boolean;
  isProcessing: boolean;
  recordingSeconds: number;
  onToggleRecording: () => void;
  query: string;
  setQuery: (q: string) => void;
  transcript: string;
  onSubmitQuery: (q: string) => void;
  ragResult: RAGResponse | null;
  analyserNode: AnalyserNode | null;
  onRunPresetQuery: (q: string) => void;
}

const PRESET_QUERIES = [
  'What is VAANI AI sub-200ms latency architecture?',
  'Explain hybrid dense and BM25 vector retrieval with RRF.',
  'How does the multilingual STT engine process Hindi and Hinglish queries?',
  'What mathematical guardrails prevent hallucinations in the pipeline?',
];

export const QueryWorkspace: React.FC<QueryWorkspaceProps> = ({
  activeStrategy,
  onStrategyChange,
  isRecording,
  isProcessing,
  recordingSeconds,
  onToggleRecording,
  query,
  setQuery,
  transcript,
  onSubmitQuery,
  ragResult,
  onRunPresetQuery,
}) => {
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Strategy Selector Pills */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
        <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
          <Radio className="w-4 h-4 text-cyan-400" />
          <span>Active Chunking Strategy:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(['hybrid', 'semantic', 'fixed', 'document'] as ChunkingStrategy[]).map((strat) => (
            <button
              key={strat}
              type="button"
              onClick={() => onStrategyChange(strat)}
              className={`cursor-pointer px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wide transition-all capitalize ${
                activeStrategy === strat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.25)] font-semibold'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 border border-slate-700/50'
              }`}
            >
              {strat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Dual-Mode Input Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Large Voice Mic Module */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800/80 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[340px]">
          {/* Active Recording Pulse Glow */}
          {isRecording && (
            <div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none rounded-3xl" />
          )}

          <div className="relative z-10 flex flex-col items-center">
            {/* The Big Mic Button */}
            <button
              id="main-mic-record-btn"
              type="button"
              onClick={() => {
                console.log('[VAANI] Workspace Mic Clicked, current recording state:', isRecording);
                onToggleRecording();
              }}
              className={`cursor-pointer relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none ${
                isRecording
                  ? 'bg-red-500 text-white shadow-[0_0_60px_rgba(239,68,68,0.7)] ring-8 ring-red-500/30 scale-105 animate-pulse'
                  : 'bg-gradient-to-br from-cyan-500 via-teal-500 to-indigo-600 text-white hover:scale-105 shadow-[0_0_40px_rgba(6,182,212,0.35)]'
              }`}
            >
              <Mic className={`w-12 h-12 ${isRecording ? 'animate-bounce' : ''}`} />
            </button>

            {/* Status Label & Timer */}
            <div className="mt-6">
              <p className="text-base font-semibold text-white">
                {isRecording ? 'Listening (Speak Now)...' : 'Tap Microphone to Speak'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {isRecording ? `Recording: ${formatTime(recordingSeconds)} (Tap to Stop)` : 'Supports English, Hindi & Hinglish'}
              </p>
            </div>
          </div>
        </div>

        {/* Right: Text Input & Live Transcription Box */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-slate-900/60 border border-slate-800/80 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Search className="w-4 h-4 text-cyan-400" />
                <span>Question or Live Voice Transcript</span>
              </label>
              {transcript && (
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/50">
                  Voice Transcribed
                </span>
              )}
            </div>

            <div className="relative">
              <textarea
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything about VAANI AI architecture, sub-200ms latency, dynamic chunking, or speaking in Hindi/English..."
                rows={4}
                className="w-full p-4 rounded-2xl bg-slate-950/80 border border-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-slate-100 text-sm placeholder:text-slate-500 resize-none outline-none transition-all"
              />
            </div>
          </div>

          {/* Preset Queries */}
          <div className="space-y-2">
            <p className="text-xs text-slate-400 font-medium">Quick Preset Questions:</p>
            <div className="flex flex-wrap gap-2">
              {PRESET_QUERIES.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onRunPresetQuery(preset)}
                  className="cursor-pointer text-left text-xs bg-slate-800/60 hover:bg-cyan-950/60 text-slate-300 hover:text-cyan-300 px-3 py-1.5 rounded-xl border border-slate-700/50 hover:border-cyan-500/40 transition-all truncate max-w-full"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              disabled={isProcessing || !query.trim()}
              onClick={() => onSubmitQuery(query)}
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)]"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Submit Question</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Answer Output Section */}
      <AnimatePresence>
        {ragResult && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6"
          >
            {/* Header: Status & Latency */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Grounded Answer</h3>
                  <p className="text-xs text-slate-400">Verified by Sub-200ms Retrieval Engine</p>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Latency: {ragResult.totalLatencyMs}ms</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Grounding: {Math.round(ragResult.groundingScore * 100)}%</span>
                </div>
              </div>
            </div>

            {/* The Synthesized Answer */}
            <div className="prose prose-invert max-w-none text-slate-200 leading-relaxed text-base">
              <p className="whitespace-pre-line">{ragResult.answer}</p>
            </div>

            {/* Citations & Sources Grid */}
            {ragResult.citations && ragResult.citations.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-slate-800/80">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Verified Knowledge Citations ({ragResult.citations.length})</span>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ragResult.citations.map((cite) => (
                    <div
                      key={cite.id}
                      className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-cyan-500/40 transition-all text-left space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-cyan-300 truncate max-w-[180px]">
                          {cite.title}
                        </span>
                        <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/50 px-1.5 py-0.5 rounded border border-emerald-800/50">
                          {Math.round(cite.similarityScore * 100)}% Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                        {cite.snippet}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
