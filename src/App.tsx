import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { QueryWorkspace } from './components/QueryWorkspace';
import { PipelineFlow } from './components/PipelineFlow';
import { MetricsDashboard } from './components/MetricsDashboard';
import { DatasetExplorer } from './components/DatasetExplorer';
import { ArchitectureSection } from './components/ArchitectureSection';
import { HHGoaCompliance } from './components/HHGoaCompliance';
import { AboutFooter } from './components/AboutFooter';
import { CinematicAuroraAtmosphere } from './components/CinematicAuroraAtmosphere';
import {
  ChunkingStrategy,
  PipelineStage,
  RAGResponse,
  SystemHealth,
  BenchmarkResult,
} from './types';

export const App: React.FC = () => {
  // --- Core State ---
  const [activeStrategy, setActiveStrategy] = useState<ChunkingStrategy>('hybrid');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');
  const [ragResult, setRagResult] = useState<RAGResponse | null>(null);
  const [pipelineStage, setPipelineStage] = useState<PipelineStage>('idle');
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [benchmarkResult, setBenchmarkResult] = useState<BenchmarkResult | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('query');
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);

  // Audio Processing Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timerRef = useRef<any>(null);
  const recognitionRef = useRef<any>(null);
  const recognizedTextRef = useRef<string>('');

  // 1. Initial Load: Fetch System Health & Initial Benchmark Run
  useEffect(() => {
    fetchHealth();
    fetchInitialMetrics();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data: SystemHealth = await res.json();
        setHealth(data);
      }
    } catch (err) {
      console.warn('Backend offline or initializing:', err);
    }
  };

  const fetchInitialMetrics = async () => {
    try {
      const res = await fetch('/api/metrics');
      if (res.ok) {
        const data = await res.json();
        if (data.lastBenchmark) {
          setBenchmarkResult(data.lastBenchmark);
        }
      }
    } catch (err) {
      console.warn('Metrics initialization fallback:', err);
    }
  };

  const handleRunBenchmark = async () => {
    setIsBenchmarking(true);
    try {
      const res = await fetch('/api/benchmark', { method: 'POST' });
      if (res.ok) {
        const data: BenchmarkResult = await res.json();
        setBenchmarkResult(data);
      }
    } catch (err) {
      console.error('Benchmark execution error:', err);
    } finally {
      setIsBenchmarking(false);
    }
  };

  // 2. Microphone & Web Audio API Recording Handler
  const startRecording = async () => {
    try {
      recognizedTextRef.current = '';
      audioChunksRef.current = [];

      // Start Browser Speech Recognition in parallel for real-time visual feedback
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.continuous = true;
          recognition.interimResults = true;
          recognition.lang = 'en-IN'; // Works for English, Hindi accents, and Hinglish

          recognition.onresult = (event: any) => {
            let currentText = '';
            for (let i = 0; i < event.results.length; i++) {
              currentText += event.results[i][0].transcript;
            }
            if (currentText.trim()) {
              recognizedTextRef.current = currentText.trim();
              setTranscript(currentText.trim());
              setQuery(currentText.trim());
            }
          };

          recognition.onerror = (e: any) => {
            console.warn('Speech recognition warning:', e.error);
          };

          recognition.start();
          recognitionRef.current = recognition;
        } catch (recErr) {
          console.warn('Browser SpeechRecognition start skipped:', recErr);
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Audio Context for real-time visualizer frequencies
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 128;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = async () => {
        const capturedSpeechText = recognizedTextRef.current;
        if (audioChunksRef.current.length > 0) {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = (reader.result as string).split(',')[1];
            await handleVoiceAudioSubmission(base64Audio, capturedSpeechText);
          };
        } else if (capturedSpeechText) {
          await handleSubmitQuery(capturedSpeechText);
        }
      };

      recorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      // Timer
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err: any) {
      console.error('Microphone permission error:', err);
      alert('Please allow microphone access to use voice queries.');
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      setQuery('');
      setTranscript('');
      setRagResult(null);
      startRecording();
    }
  };

  // 3. Audio / Query Execution Pipeline
  const handleVoiceAudioSubmission = async (audioBase64: string, capturedQuery?: string) => {
    setIsProcessing(true);
    setPipelineStage('speech_to_text');

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64,
          query: capturedQuery || recognizedTextRef.current || undefined,
          strategy: activeStrategy,
        }),
      });

      if (res.ok) {
        const data: RAGResponse = await res.json();
        setRagResult(data);
        if (data.transcript) {
          setTranscript(data.transcript);
          setQuery(data.transcript);
        } else if (capturedQuery) {
          setTranscript(capturedQuery);
          setQuery(capturedQuery);
        }
        setPipelineStage('complete');
      } else {
        const errData = await res.json().catch(() => ({ error: 'Server returned error status' }));
        console.error('Server error during voice query:', errData);
        // Fallback to text query if available
        if (capturedQuery || query) {
          await handleSubmitQuery(capturedQuery || query);
        }
      }
    } catch (err) {
      console.error('Audio Query Error:', err);
      if (capturedQuery || query) {
        await handleSubmitQuery(capturedQuery || query);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    setQuery(queryText);
    setIsProcessing(true);
    setPipelineStage('query_understanding');

    try {
      const res = await fetch('/api/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: queryText,
          strategy: activeStrategy,
        }),
      });

      if (res.ok) {
        const data: RAGResponse = await res.json();
        setRagResult(data);
        setPipelineStage('complete');
      } else {
        const errJson = await res.json().catch(() => ({ error: 'Request failed' }));
        console.error('Query execution HTTP error:', errJson);
      }
    } catch (err) {
      console.error('Query execution error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStrategyChange = async (strategy: ChunkingStrategy) => {
    setActiveStrategy(strategy);
    try {
      const res = await fetch('/api/dataset/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strategy }),
      });
      if (res.ok) {
        await fetchHealth();
      }
    } catch (err) {
      console.error('Re-indexing error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 font-sans relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Aurora / Glow */}
      <CinematicAuroraAtmosphere />

      {/* Persistent Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        health={health}
      />

      {/* Main Container */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 space-y-24">
        {/* 01 / Hero Section */}
        <section id="hero">
          <HeroSection
            onStartVoice={toggleRecording}
            isRecording={isRecording}
          />
        </section>

        {/* 02 / Query Workspace (Voice & Text RAG) */}
        <section id="query">
          <QueryWorkspace
            activeStrategy={activeStrategy}
            onStrategyChange={handleStrategyChange}
            isRecording={isRecording}
            isProcessing={isProcessing}
            recordingSeconds={recordingSeconds}
            onToggleRecording={toggleRecording}
            query={query}
            setQuery={setQuery}
            transcript={transcript}
            onSubmitQuery={handleSubmitQuery}
            ragResult={ragResult}
            analyserNode={analyserRef.current}
            onRunPresetQuery={(preset) => {
              setQuery(preset);
              handleSubmitQuery(preset);
            }}
          />
        </section>

        {/* 03 / Live Pipeline Execution Stepper */}
        {ragResult && (
          <section id="pipeline" className="scroll-mt-24">
            <PipelineFlow
              pipelineStage={pipelineStage}
              stages={ragResult.stages}
              totalLatencyMs={ragResult.totalLatencyMs}
              groundingScore={ragResult.groundingScore}
              status={ragResult.status}
              queryAnalysis={ragResult.queryAnalysis}
            />
          </section>
        )}

        {/* 04 / Metrics & Latency Dashboard */}
        <section id="metrics" className="scroll-mt-24">
          <MetricsDashboard
            benchmark={benchmarkResult}
            onRunBenchmark={handleRunBenchmark}
            isBenchmarking={isBenchmarking}
          />
        </section>

        {/* 05 / Dataset & Chunk Strategy Inspector */}
        <section id="dataset" className="scroll-mt-24">
          <DatasetExplorer
            activeStrategy={activeStrategy}
            onStrategyChange={handleStrategyChange}
          />
        </section>

        {/* 06 / Architecture & Technical Blueprint */}
        <section id="architecture" className="scroll-mt-24">
          <ArchitectureSection />
        </section>

        {/* 07 / System & Architecture Compliance Audit */}
        <section id="compliance" className="scroll-mt-24">
          <HHGoaCompliance />
        </section>
      </main>

      {/* 08 / Footer */}
      <AboutFooter />
    </div>
  );
};
