import React, { useEffect, useRef } from 'react';

interface CinematicAuroraAtmosphereProps {
  isListening?: boolean;
  audioLevel?: number;
}

export const CinematicAuroraAtmosphere: React.FC<CinematicAuroraAtmosphereProps> = ({
  isListening = false,
  audioLevel = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes for ambient neural space
    const particleCount = 45;
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      alpha: number;
      phase: number;
    }> = [];

    const colors = [
      'rgba(6, 182, 212,',   // Cyan
      'rgba(99, 102, 241,',  // Indigo
      'rgba(139, 92, 246,',  // Violet
      'rgba(56, 189, 248,',  // Sky blue
      'rgba(167, 139, 250,', // Lavender
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.008;

      // Mouse smooth interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // 1. Aurora ambient wave meshes
      const auroraGradient = ctx.createRadialGradient(
        width * 0.5 + (mouseRef.current.x - 0.5) * 120,
        height * 0.25 + (mouseRef.current.y - 0.5) * 80,
        50,
        width * 0.5,
        height * 0.35,
        Math.max(width, height) * 0.6
      );

      const dynamicAudioMultiplier = isListening ? 1 + (audioLevel / 100) * 0.8 : 1;
      const glowAlpha = (0.16 + Math.sin(time * 2) * 0.04) * dynamicAudioMultiplier;

      auroraGradient.addColorStop(0, `rgba(6, 182, 212, ${Math.min(0.35, glowAlpha * 1.3)})`);
      auroraGradient.addColorStop(0.35, `rgba(99, 102, 241, ${Math.min(0.25, glowAlpha)})`);
      auroraGradient.addColorStop(0.65, `rgba(139, 92, 246, ${Math.min(0.18, glowAlpha * 0.7)})`);
      auroraGradient.addColorStop(1, 'rgba(3, 7, 18, 0)');

      ctx.fillStyle = auroraGradient;
      ctx.fillRect(0, 0, width, height);

      // 2. Subtle secondary bottom aurora glow
      const bottomGlow = ctx.createRadialGradient(
        width * 0.7 - (mouseRef.current.x - 0.5) * 100,
        height * 0.8,
        30,
        width * 0.7,
        height * 0.8,
        Math.max(width, height) * 0.45
      );
      bottomGlow.addColorStop(0, 'rgba(67, 56, 202, 0.12)');
      bottomGlow.addColorStop(0.5, 'rgba(14, 165, 233, 0.08)');
      bottomGlow.addColorStop(1, 'rgba(3, 7, 18, 0)');
      ctx.fillStyle = bottomGlow;
      ctx.fillRect(0, 0, width, height);

      // 3. Connective Neural Mesh Lines
      const maxDistance = 140;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx * dynamicAudioMultiplier;
        p1.y += p1.vy * dynamicAudioMultiplier;

        if (p1.x < 0) p1.x = width;
        if (p1.x > width) p1.x = 0;
        if (p1.y < 0) p1.y = height;
        if (p1.y > height) p1.y = 0;

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const lineAlpha = (1 - dist / maxDistance) * 0.12 * (isListening ? 1.6 : 1);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Draw particle node
        const pulse = Math.sin(time * 3 + p1.phase);
        const r = Math.max(0.8, p1.radius + pulse * 0.6);
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `${p1.color} ${p1.alpha + pulse * 0.15})`;
        ctx.shadowColor = 'rgba(6, 182, 212, 0.6)';
        ctx.shadowBlur = isListening ? 8 : 4;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isListening, audioLevel]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-90 transition-opacity duration-1000"
      />
      {/* Subtle Aurora light sweep ribbon overlay */}
      <div 
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-indigo-500/10 to-transparent rounded-full blur-[120px] pointer-events-none animate-aurora"
      />
    </div>
  );
};
