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
  RAGResponse, 
  ChunkingStrategy, 
  BenchmarkResult, 
  Document 
} from './types';

export function App() {
  // Navigation & UI State
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [systemHealth, setSystemHealth] = useState<any>(null);

  // Query & Audio State
  const [query, setQuery] = useState<string>('');
  const [transcript, setTranscript] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recordingSeconds, setRecordingSeconds] = useState<number>(0);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [pipelineStage, setPipelineStage] = useState<string>('idle');
  const [activeStrategy, setActiveStrategy] = useState<ChunkingStrategy>('hybrid');

  // Results & Benchmark
  const [ragResult, setRagResult] = useState<RAGResponse | null>(null);
  const [benchmarkData, setBenchmarkData] = useState<BenchmarkResult | null>(null);
  const [isRunningBenchmark, setIsRunningBenchmark] = useState<boolean>(false);

  // Audio Recording Refs
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const timerRef = useRef<any>(null);

  // 1. Initial Load: Fetch System Health & Initial Benchmark Run
  useEffect(() => {
    fetchHealth();
    runInitialBenchmark();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setSystemHealth(data);
        if (data.activeStrategy) {
          setActiveStrategy(data.activeStrategy);
        }
      }
    } catch (e) {
      console.warn('Could not fetch health:', e);
    }
  };

  const runInitialBenchmark = async () => {
    try {
      const res = await fetch('/api/metrics');
      if (res.ok) {
        const data = await res.json();
        if (data.lastBenchmark) {
          setBenchmarkData(data.lastBenchmark);
        } else {
          // Trigger a quick initial benchmark run
          const bRes = await fetch('/api/benchmark', { method: 'POST' });
          if (bRes.ok) {
            const bData = await bRes.json();
            setBenchmarkData(bData);
          }
        }
      }
    } catch (e) {
      console.warn('Initial benchmark error:', e);
    }
  };

  // 2. Microphone & Web Audio API Recording Handler
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];

      // Audio Context for real-time visualizer frequencies
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 64;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;

      // Start Visualizer Loop
      const updateAudioLevel = () => {
        if (!analyserRef.current) return;
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
          sum += dataArray[i];
        }
        const avg = sum / dataArray.length;
        setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));

        animFrameRef.current = requestAnimationFrame(updateAudioLevel);
      };
      updateAudioLevel();

      // MediaRecorder for capturing base64 audio
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const reader = new FileReader();
        reader.readAsDataURL(audioBlob);
        reader.onloadend = async () => {
          const base64Audio = (reader.result as string).split(',')[1];
          await handleVoiceAudioSubmission(base64Audio);
        };
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsListening(true);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone access unavailable or denied:', err);
      // Fallback: simulate audio recording
      setIsListening(true);
      setTimeout(() => {
        stopRecording();
        handleVoiceAudioSubmission('SIMULATED_AUDIO_SAMPLE');
      }, 3000);
    }
  };

  const stopRecording = () => {
    setIsListening(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
    }
    setAudioLevel(0);
  };

  const toggleMic = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // 3. Audio / Query Execution Pipeline
  const handleVoiceAudioSubmission = async (audioBase64: string) => {
    setIsProcessing(true);
    setPipelineStage('speech_to_text');

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          audioBase64,
          strategy: activeStrategy,
        }),
      });

      if (res.ok) {
        const data: RAGResponse = await res.json();
        setRagResult(data);
        if (data.transcript) {
          setTranscript(data.transcript);
          setQuery(data.transcript);
        }
        setPipelineStage('complete');
      }
    } catch (err) {
      console.error('Audio Query Error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmitQuery = async (targetQuery?: string) => {
    const q = (targetQuery || transcript || query).trim();
    if (!q) return;

    setIsProcessing(true);
    setPipelineStage('query_understanding');

    try {
      setTimeout(() => setPipelineStage('multi_strategy_retrieval'), 150);
      setTimeout(() => setPipelineStage('vector_search'), 300);
      setTimeout(() => setPipelineStage('reranking'), 450);
      setTimeout(() => setPipelineStage('rag_generation'), 600);

      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          strategy: activeStrategy,
        }),
      });

      if (res.ok) {
        const data: RAGResponse = await res.json();
        setRagResult(data);
        setPipelineStage('complete');
      }
    } catch (err) {
      console.error('Query execution error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setQuery(prompt);
    setTranscript(prompt);
    scrollToSection('workspace');
    handleSubmitQuery(prompt);
  };

  const handleStrategyChange = async (strategy: ChunkingStrategy) => {
    setActiveStrategy(strategy);
    try {
      await fetch('/api/dataset/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strategy }),
      });
      fetchHealth();
    } catch (e) {
      console.warn('Strategy switch error:', e);
    }
  };

  const handleAddDocument = async (doc: Document) => {
    try {
      await fetch('/api/dataset/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documents: [doc],
          strategy: activeStrategy,
        }),
      });
      fetchHealth();
    } catch (e) {
      console.warn('Add doc error:', e);
    }
  };

  const handleRunBenchmark = async () => {
    setIsRunningBenchmark(true);
    try {
      const res = await fetch('/api/benchmark', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setBenchmarkData(data);
      }
    } catch (err) {
      console.error('Benchmark execution error:', err);
    } finally {
      setIsRunningBenchmark(false);
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      {/* Background Interactive Ambient Aurora Canvas */}
      <CinematicAuroraAtmosphere isListening={isListening} audioLevel={audioLevel} />

      {/* Floating Top Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={scrollToSection}
        systemHealth={systemHealth}
      />

      {/* 00 / Hero Section */}
      <HeroSection
        isListening={isListening}
        audioLevel={audioLevel}
        isProcessing={isProcessing}
        pipelineStage={pipelineStage}
        onToggleMic={toggleMic}
        onExploreSystem={() => scrollToSection('workspace')}
        onQuickQuery={handleQuickPrompt}
      />

      {/* 01 / Interactive Retrieval Workspace */}
      <QueryWorkspace
        query={query}
        transcript={transcript}
        setQuery={setQuery}
        setTranscript={setTranscript}
        isListening={isListening}
        recordingSeconds={recordingSeconds}
        audioLevel={audioLevel}
        isProcessing={isProcessing}
        activeStrategy={activeStrategy}
        onStrategyChange={handleStrategyChange}
        onToggleMic={toggleMic}
        onSubmitQuery={handleSubmitQuery}
        onClear={() => {
          setQuery('');
          setTranscript('');
          setRagResult(null);
        }}
        ragResult={ragResult}
      />

      {/* 02 / 9-Stage Execution Harness */}
      <PipelineFlow
        currentStage={pipelineStage}
        isProcessing={isProcessing}
        latencies={ragResult?.latencies}
      />

      {/* 03 / Real Latency Metrics Dashboard */}
      <MetricsDashboard
        benchmarkData={benchmarkData}
        isRunningBenchmark={isRunningBenchmark}
        onRunBenchmark={handleRunBenchmark}
        systemStats={systemHealth}
      />

      {/* 04 / MSMARCO-XI Corpus & Chunking Explorer */}
      <DatasetExplorer
        activeStrategy={activeStrategy}
        onReindex={handleStrategyChange}
        onAddDocument={handleAddDocument}
      />

      {/* 05 / Architecture & Technical Blueprint */}
      <ArchitectureSection />

      {/* 06 / System & Architecture Compliance Audit */}
      <HHGoaCompliance />

      {/* 07 / Footer & Credits */}
      <AboutFooter onScrollToTop={() => scrollToSection('hero')} />
    </div>
  );
}
export default App;
