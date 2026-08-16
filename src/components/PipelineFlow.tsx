import React from 'react';
import { 
  Mic, 
  Volume2, 
  Brain, 
  Layers, 
  Database, 
  Filter, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2,
  Clock,
  ArrowRight,
  Zap
} from 'lucide-react';
import { PipelineStageLatencies } from '../types';

interface PipelineFlowProps {
  currentStage: string;
  isProcessing: boolean;
  latencies?: PipelineStageLatencies;
}

export const PipelineFlow: React.FC<PipelineFlowProps> = ({
  currentStage,
  isProcessing,
  latencies,
}) => {
  const steps = [
    {
      num: '01',
      id: 'voice_input',
      title: 'VOICE INPUT',
      desc: '16kHz PCM audio stream capture & amplitude normalization.',
      icon: Mic,
      latency: latencies?.stt_ms ? `${latencies.stt_ms}ms` : '< 15ms',
    },
    {
      num: '02',
      id: 'speech_to_text',
      title: 'SARVAM STT',
      desc: 'Multilingual acoustic & phonetic Indian dialect decoding.',
      icon: Volume2,
      latency: latencies?.stt_ms ? `${latencies.stt_ms}ms` : '35ms',
    },
    {
      num: '03',
      id: 'query_understanding',
      title: 'QUERY UNDERSTANDING',
      desc: 'Intent parsing, input guardrail safety & injection checks.',
      icon: Brain,
      latency: '< 2ms',
    },
    {
      num: '04',
      id: 'multi_strategy_retrieval',
      title: 'RETRIEVAL FUSION',
      desc: 'Hybrid fusion of 5 chunking algorithms + BM25 search.',
      icon: Layers,
      latency: latencies?.retrieval_ms ? `${latencies.retrieval_ms}ms` : '3.5ms',
    },
    {
      num: '05',
      id: 'vector_search',
      title: 'VECTOR DB',
      desc: '128-dim dense semantic cosine similarity matrix index.',
      icon: Database,
      latency: latencies?.embedding_ms ? `${latencies.embedding_ms}ms` : '1.8ms',
    },
    {
      num: '06',
      id: 'reranking',
      title: 'RERANKING',
      desc: 'Cross-encoder semantic alignment & entity proximity scoring.',
      icon: Filter,
      latency: latencies?.reranking_ms ? `${latencies.reranking_ms}ms` : '2.1ms',
    },
    {
      num: '07',
      id: 'rag_generation',
      title: 'RAG SYNTHESIS',
      desc: 'Gemini 3.7 Flash generation strictly conditioned on top context.',
      icon: Sparkles,
      latency: latencies?.generation_ms ? `${latencies.generation_ms}ms` : '85ms',
    },
    {
      num: '08',
      id: 'grounding_guard',
      title: 'GROUNDING GUARD',
      desc: 'Claim-to-evidence overlap verification & hallucination check.',
      icon: ShieldCheck,
      latency: latencies?.grounding_ms ? `${latencies.grounding_ms}ms` : '1.5ms',
    },
    {
      num: '09',
      id: 'complete',
      title: 'ANSWER READY',
      desc: 'Verified grounded response delivered with citations & audio TTS.',
      icon: CheckCircle2,
      latency: latencies?.total_ms ? `${latencies.total_ms}ms` : 'READY',
    },
  ];

  const getStageIndex = (stage: string) => {
    switch (stage) {
      case 'idle':
        return -1;
      case 'voice_input':
        return 0;
      case 'speech_to_text':
        return 1;
      case 'query_understanding':
        return 2;
      case 'multi_strategy_retrieval':
        return 3;
      case 'vector_search':
        return 4;
      case 'reranking':
        return 5;
      case 'rag_generation':
        return 6;
      case 'grounding_guard':
        return 7;
      case 'complete':
        return 8;
      default:
        return -1;
    }
  };

  const activeIdx = getStageIndex(currentStage);

  return (
    <section id="pipeline" className="py-20 px-4 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col gap-2.5 mb-14 text-center md:text-left">
        <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-cyan-400 uppercase justify-center md:justify-start font-bold">
          <span className="w-3 h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
          <span>02 / EXECUTION HARNESS</span>
        </div>
        <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-white tracking-tight">
          9-Stage Autonomous Pipeline
        </h2>
        <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
          Visualizing each discrete microservice in the voice-to-grounded-answer loop with real-time stage glow and telemetry.
        </p>
      </div>

      {/* Pipeline Grid Bento */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isCurrent = activeIdx === idx && isProcessing;
          const isDone = activeIdx > idx || (currentStage === 'complete' && idx <= 8);

          return (
            <div
              key={step.id}
              className={`relative rounded-3xl p-6 transition-all duration-300 border backdrop-blur-xl flex flex-col justify-between ${
                isCurrent
                  ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.35)] scale-[1.02]'
                  : isDone
                  ? 'bg-slate-950/70 border-emerald-500/30 shadow-lg shadow-emerald-950/20'
                  : 'bg-slate-950/50 border-slate-800/80 hover:border-cyan-500/30'
              }`}
            >
              {/* Active pulsing glow header tag */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs font-bold text-slate-400">
                  STAGE {step.num}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono font-bold text-cyan-300 px-2.5 py-0.5 rounded-full bg-slate-900 border border-cyan-500/30 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-cyan-400" />
                    <span>{step.latency}</span>
                  </span>

                  {isDone && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
                  )}
                  {isCurrent && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shadow-[0_0_8px_#22d3ee]" />
                  )}
                </div>
              </div>

              {/* Icon & Title */}
              <div className="flex items-center gap-3.5 mb-3">
                <div
                  className={`p-3 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]'
                      : isDone
                      ? 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-base text-white tracking-tight">
                    {step.title}
                  </h3>
                  <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                    {isCurrent ? 'PROCESSING NOW' : isDone ? 'COMPLETED' : 'STANDBY'}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans mt-2">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
