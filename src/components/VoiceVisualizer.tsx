import React, { useEffect, useRef } from 'react';

interface VoiceVisualizerProps {
  isListening: boolean;
  audioLevel?: number; // 0 to 100
  isProcessing?: boolean;
  statusText?: string;
  size?: number;
}

export const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({
  isListening,
  audioLevel = 0,
  isProcessing = false,
  statusText = 'READY',
  size = 320,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const centerX = size / 2;
    const centerY = size / 2;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, size, size);

      // Base radius calculation with audio boost
      const dynamicBoost = isListening
        ? (audioLevel / 100) * 38
        : isProcessing
        ? Math.sin(time * 5) * 10
        : Math.sin(time * 1.5) * 3;

      const baseRadius = 58 + dynamicBoost;

      // 1. Ambient Outer Aurora Glow
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        baseRadius * 0.5,
        centerX,
        centerY,
        baseRadius * 2.2
      );
      if (isListening) {
        glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.45)');
        glowGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.25)');
        glowGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');
      } else if (isProcessing) {
        glowGrad.addColorStop(0, 'rgba(99, 102, 241, 0.4)');
        glowGrad.addColorStop(0.5, 'rgba(6, 182, 212, 0.2)');
        glowGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');
      } else {
        glowGrad.addColorStop(0, 'rgba(6, 182, 212, 0.22)');
        glowGrad.addColorStop(0.6, 'rgba(99, 102, 241, 0.1)');
        glowGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');
      }
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius * 2.2, 0, Math.PI * 2);
      ctx.fill();

      // 2. Holographic Outer Rotating Coordinate Rings
      const ringCount = 3;
      for (let r = 1; r <= ringCount; r++) {
        const ringRadius = baseRadius + r * 26;
        const spinSpeed = (r % 2 === 0 ? 1 : -1) * (isProcessing ? 0.04 : 0.012);
        const ringAngle = time * spinSpeed * (4 - r);

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(ringAngle);

        ctx.beginPath();
        ctx.arc(0, 0, Math.max(10, ringRadius), 0, Math.PI * 2);
        ctx.strokeStyle = r === 1 
          ? 'rgba(6, 182, 212, 0.35)' 
          : r === 2 
          ? 'rgba(139, 92, 246, 0.25)' 
          : 'rgba(56, 189, 248, 0.18)';
        ctx.lineWidth = 1;
        ctx.setLineDash(r === 1 ? [6, 12] : r === 2 ? [30, 40] : [2, 8]);
        ctx.stroke();

        // Small technical tick marks on innermost ring
        if (r === 1) {
          const ticks = 12;
          for (let t = 0; t < ticks; t++) {
            const tAngle = (t / ticks) * Math.PI * 2;
            const tx1 = Math.cos(tAngle) * (ringRadius - 3);
            const ty1 = Math.sin(tAngle) * (ringRadius - 3);
            const tx2 = Math.cos(tAngle) * (ringRadius + 3);
            const ty2 = Math.sin(tAngle) * (ringRadius + 3);
            ctx.beginPath();
            ctx.moveTo(tx1, ty1);
            ctx.lineTo(tx2, ty2);
            ctx.strokeStyle = 'rgba(165, 243, 252, 0.5)';
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }

        ctx.restore();
      }

      // 3. Dynamic Voice Frequency Waveform Ribbon
      ctx.beginPath();
      const points = 72;
      for (let i = 0; i <= points; i++) {
        const angle = (i / points) * Math.PI * 2;
        const wave1 = Math.sin(angle * 7 + time * 3.5);
        const wave2 = Math.cos(angle * 3 - time * 2);
        const amp = isListening ? 6 + (audioLevel / 100) * 18 : isProcessing ? 4 : 2;
        const wave = (wave1 + wave2) * 0.5 * amp;
        const radius = baseRadius + wave;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = isListening
        ? 'rgba(34, 211, 238, 0.95)'
        : isProcessing
        ? 'rgba(167, 139, 250, 0.9)'
        : 'rgba(6, 182, 212, 0.65)';
      ctx.lineWidth = isListening ? 2.2 : 1.5;
      ctx.shadowColor = 'rgba(6, 182, 212, 0.8)';
      ctx.shadowBlur = isListening ? 12 : 6;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // 4. Glass Orb Surface / Radial Depth
      const orbGrad = ctx.createRadialGradient(
        centerX - baseRadius * 0.35,
        centerY - baseRadius * 0.35,
        baseRadius * 0.1,
        centerX,
        centerY,
        baseRadius
      );
      orbGrad.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
      orbGrad.addColorStop(0.3, 'rgba(6, 182, 212, 0.2)');
      orbGrad.addColorStop(0.7, 'rgba(99, 102, 241, 0.15)');
      orbGrad.addColorStop(1, 'rgba(15, 23, 42, 0.6)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
      ctx.fillStyle = orbGrad;
      ctx.fill();

      // Glass rim border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 1;
      ctx.stroke();

      // 5. Inner AI Core Neural Nodes and Energy Rays
      const innerCoreRadius = baseRadius * 0.45;
      const coreLightGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        1,
        centerX,
        centerY,
        innerCoreRadius
      );
      coreLightGrad.addColorStop(0, isListening ? 'rgba(255, 255, 255, 1)' : 'rgba(224, 242, 254, 0.95)');
      coreLightGrad.addColorStop(0.4, isListening ? 'rgba(6, 182, 212, 0.8)' : 'rgba(56, 189, 248, 0.6)');
      coreLightGrad.addColorStop(0.8, 'rgba(139, 92, 246, 0.3)');
      coreLightGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');

      ctx.beginPath();
      ctx.arc(centerX, centerY, innerCoreRadius, 0, Math.PI * 2);
      ctx.fillStyle = coreLightGrad;
      ctx.fill();

      // Internal Neural Strands
      const strandCount = 6;
      for (let s = 0; s < strandCount; s++) {
        const sAngle = (s / strandCount) * Math.PI * 2 + time * 0.8;
        const innerX = centerX + Math.cos(sAngle) * (innerCoreRadius * 0.4);
        const innerY = centerY + Math.sin(sAngle) * (innerCoreRadius * 0.4);
        const outerX = centerX + Math.cos(sAngle + Math.sin(time + s)) * (baseRadius * 0.85);
        const outerY = centerY + Math.sin(sAngle + Math.sin(time + s)) * (baseRadius * 0.85);

        ctx.beginPath();
        ctx.moveTo(innerX, innerY);
        ctx.quadraticCurveTo(
          centerX + Math.cos(sAngle + 1.2) * (baseRadius * 0.5),
          centerY + Math.sin(sAngle + 1.2) * (baseRadius * 0.5),
          outerX,
          outerY
        );
        ctx.strokeStyle = `rgba(165, 243, 252, ${0.3 + Math.sin(time * 3 + s) * 0.2})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // 6. Orbital Holographic Particles
      const particleCount = isListening ? 28 : isProcessing ? 24 : 16;
      for (let p = 0; p < particleCount; p++) {
        const speed = (0.5 + (p % 4) * 0.25) * (isProcessing ? 2.5 : 1);
        const pAngle = (p / particleCount) * Math.PI * 2 + time * speed;
        const pDist = baseRadius + 18 + Math.sin(time * 2 + p) * (isListening ? 22 : 12);
        const px = centerX + Math.cos(pAngle) * pDist;
        const py = centerY + Math.sin(pAngle) * pDist;

        ctx.beginPath();
        ctx.arc(px, py, p % 3 === 0 ? 2 : 1.2, 0, Math.PI * 2);
        ctx.fillStyle = p % 2 === 0 ? 'rgba(34, 211, 238, 0.85)' : 'rgba(192, 132, 252, 0.85)';
        ctx.shadowColor = 'rgba(6, 182, 212, 0.9)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isListening, audioLevel, isProcessing, size]);

  return (
    <div className="relative flex flex-col items-center justify-center select-none group">
      {/* Dynamic Background Aurora Halo */}
      <div 
        className={`absolute rounded-full pointer-events-none transition-all duration-700 ${
          isListening 
            ? 'w-80 h-80 bg-gradient-to-r from-cyan-500/25 via-indigo-500/25 to-violet-500/25 blur-3xl scale-125 animate-pulse' 
            : isProcessing
            ? 'w-72 h-72 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-cyan-500/20 blur-3xl scale-110'
            : 'w-64 h-64 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-indigo-500/15 blur-2xl group-hover:scale-105'
        }`} 
      />

      <canvas
        ref={canvasRef}
        style={{ width: size, height: size }}
        className="relative z-10 block cursor-pointer transition-transform duration-500 group-hover:scale-105"
      />

      {/* Floating Futuristic Status Capsule */}
      <div className="absolute bottom-1 z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-xl border border-cyan-500/30 text-[11px] font-mono tracking-[0.2em] uppercase text-cyan-200 shadow-lg shadow-cyan-950/50">
        <span
          className={`w-2 h-2 rounded-full ${
            isListening
              ? 'bg-cyan-400 animate-ping shadow-[0_0_8px_#22d3ee]'
              : isProcessing
              ? 'bg-violet-400 animate-pulse shadow-[0_0_8px_#a855f7]'
              : 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
          }`}
        />
        <span className="font-semibold text-slate-200">{statusText}</span>
      </div>
    </div>
  );
};
