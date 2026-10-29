import React, { useEffect, useRef } from 'react';

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  shape: 'circle' | 'square' | 'cross';
  angle: number;
  vAngle: number;
  alpha: number;
}

interface PulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

/**
 * ThemeForest-Compatible Cyber Green Constellation Animated Background
 * Features bold, highly visible apple green and emerald animation lines,
 * glowing cyber particles, expanding sonar radar waves, rotating wireframe rings,
 * and floating emerald aurora orbs on a clean ThemeForest white canvas.
 */
export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: -9999, y: -9999, active: false };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    const shapes: Array<'circle' | 'square' | 'cross'> = ['circle', 'circle', 'square', 'cross'];
    const particleCount = Math.min(56, Math.max(28, Math.floor((width * height) / 30000)));

    const nodes: ParticleNode[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.58,
      vy: (Math.random() - 0.5) * 0.58,
      radius: 2.2 + Math.random() * 3.2,
      shape: shapes[i % shapes.length],
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.018,
      alpha: 0.45 + Math.random() * 0.45
    }));

    const pulses: PulseWave[] = [];
    let frameTick = 0;

    const spawnPulse = (x?: number, y?: number) => {
      if (pulses.length > 5) return;
      pulses.push({
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        radius: 6,
        maxRadius: 160 + Math.random() * 120,
        alpha: 0.48
      });
    };

    // Initial ambient pulse in bold apple green
    spawnPulse(width * 0.35, height * 0.3);

    const render = () => {
      frameTick++;
      ctx.clearRect(0, 0, width, height);

      // Spawn periodic bold apple green sonar ripples
      if (frameTick % 160 === 0) {
        spawnPulse();
      }

      // Draw expanding bold green sonar pulse rings
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.radius += 1.05;
        p.alpha = Math.max(0, 0.48 * (1 - p.radius / p.maxRadius));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 197, 94, ${p.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.6;
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 6;
        ctx.stroke();

        if (p.radius > 20) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(16, 185, 129, ${(p.alpha * 0.75).toFixed(3)})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }
        ctx.restore();

        if (p.radius >= p.maxRadius) {
          pulses.splice(i, 1);
        }
      }

      // Update & draw bold cyber green geometric nodes and animation lines
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.angle += n.vAngle;

        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // Connect nearby nodes with BOLD apple green lines
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 175;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.38;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.35;
            ctx.stroke();
          }
        }

        // Interactive cursor bold green constellation tether
        if (mouse.active) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 220) {
            const mAlpha = (1 - mDist / 220) * 0.55;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.6;
            ctx.shadowColor = '#22c55e';
            ctx.shadowBlur = 8;
            ctx.stroke();
          }
        }

        // Draw node shape with vibrant cyber green glow
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.angle);
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 5;
        ctx.strokeStyle = `rgba(34, 197, 94, ${n.alpha.toFixed(3)})`;
        ctx.fillStyle = `rgba(16, 185, 129, ${(n.alpha * 0.95).toFixed(3)})`;
        ctx.lineWidth = 1.5;

        if (n.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, n.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (n.shape === 'square') {
          const s = n.radius * 2.2;
          ctx.strokeRect(-s / 2, -s / 2, s, s);
        } else {
          // Cyber green crosshair '+'
          const c = n.radius * 2.1;
          ctx.beginPath();
          ctx.moveTo(-c, 0);
          ctx.lineTo(c, 0);
          ctx.moveTo(0, -c);
          ctx.lineTo(0, c);
          ctx.stroke();
        }
        ctx.restore();
      }

      animationFrameId = window.requestAnimationFrame(render);
    };

    animationFrameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-white"
      aria-hidden="true"
    >
      {/* 1. BOLD APPLE GREEN & CYBER EMERALD FLOATING AURORA ORBS */}
      <div
        className="absolute -top-32 -left-24 w-[640px] h-[640px] rounded-full blur-3xl animate-orb-float-1"
        style={{
          background:
            'radial-gradient(circle, rgba(34, 197, 94, 0.22) 0%, rgba(16, 185, 129, 0.14) 45%, transparent 75%)'
        }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-3xl animate-orb-float-2"
        style={{
          background:
            'radial-gradient(circle, rgba(74, 222, 128, 0.20) 0%, rgba(34, 197, 94, 0.12) 50%, transparent 75%)'
        }}
      />
      <div
        className="absolute -bottom-36 left-1/4 w-[720px] h-[540px] rounded-full blur-3xl animate-orb-float-3"
        style={{
          background:
            'radial-gradient(circle, rgba(16, 185, 129, 0.24) 0%, rgba(34, 197, 94, 0.14) 50%, transparent 75%)'
        }}
      />

      {/* 2. BOLD GREEN ARCHITECTURAL GEOMETRIC GRID & DOT MATRIX */}
      <div
        className="absolute inset-0 opacity-[0.48] animate-bg-grid-drift"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(34, 197, 94, 0.18) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 197, 94, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px'
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.42]"
        style={{
          backgroundImage: 'radial-gradient(rgba(34, 197, 94, 0.35) 1.2px, transparent 1.2px)',
          backgroundSize: '22px 22px'
        }}
      />

      {/* 3. ROTATING BOLD GREEN WIREFRAME RINGS */}
      <div className="absolute -top-48 right-[8%] w-[480px] h-[480px] rounded-full border-2 border-dashed border-emerald-400/40 animate-spin-ultra-slow" />
      <div className="absolute -top-36 right-[10%] w-[380px] h-[380px] rounded-full border border-emerald-500/50 animate-reverse-spin-ultra-slow" />
      <div className="absolute bottom-[-180px] left-[4%] w-[460px] h-[460px] rounded-full border-2 border-dashed border-emerald-400/40 animate-reverse-spin-ultra-slow" />

      {/* 4. DIAGONAL EMERALD SHIMMER SWEEP BEAM */}
      <div
        className="absolute inset-0 animate-bg-beam pointer-events-none"
        style={{
          background:
            'linear-gradient(115deg, transparent 35%, rgba(34, 197, 94, 0.08) 48%, rgba(16, 185, 129, 0.12) 50%, rgba(34, 197, 94, 0.08) 52%, transparent 65%)',
          backgroundSize: '220% 220%'
        }}
      />

      {/* 5. 60FPS INTERACTIVE CONSTELLATION & SONAR PULSE CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

export default CyberBackground;
