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
 * Minimalist White Architectural & Interactive Constellation Animated Background
 * Combines CSS floating pearl orbs, a drifting architectural grid, rotating geometric
 * rings, and a 60fps interactive HTML5 canvas with floating nodes & pulse waves.
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
    const particleCount = Math.min(46, Math.max(24, Math.floor((width * height) / 36000)));

    const nodes: ParticleNode[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.48,
      vy: (Math.random() - 0.5) * 0.48,
      radius: 2 + Math.random() * 2.6,
      shape: shapes[i % shapes.length],
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.012,
      alpha: 0.16 + Math.random() * 0.22
    }));

    const pulses: PulseWave[] = [];
    let frameTick = 0;

    const spawnPulse = (x?: number, y?: number) => {
      if (pulses.length > 4) return;
      pulses.push({
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        radius: 4,
        maxRadius: 130 + Math.random() * 110,
        alpha: 0.18
      });
    };

    // Initial ambient pulse
    spawnPulse(width * 0.3, height * 0.35);

    const render = () => {
      frameTick++;
      ctx.clearRect(0, 0, width, height);

      // Spawn periodic architectural sonar ripples
      if (frameTick % 210 === 0) {
        spawnPulse();
      }

      // Draw expanding sonar pulse rings
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.radius += 0.85;
        p.alpha = Math.max(0, 0.18 * (1 - p.radius / p.maxRadius));

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(15, 23, 42, ${p.alpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (p.radius > 24) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.65, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(71, 85, 105, ${(p.alpha * 0.55).toFixed(3)})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }
        ctx.restore();

        if (p.radius >= p.maxRadius) {
          pulses.splice(i, 1);
        }
      }

      // Update & draw geometric nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.angle += n.vAngle;

        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // Connect nearby nodes with clean architectural lines
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 155;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.095;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(15, 23, 42, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }

        // Interactive cursor constellation tether
        if (mouse.active) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 190) {
            const mAlpha = (1 - mDist / 190) * 0.16;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(15, 23, 42, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw node shape
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.angle);
        ctx.strokeStyle = `rgba(15, 23, 42, ${n.alpha.toFixed(3)})`;
        ctx.fillStyle = `rgba(51, 65, 85, ${(n.alpha * 0.85).toFixed(3)})`;
        ctx.lineWidth = 1.1;

        if (n.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, n.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (n.shape === 'square') {
          const s = n.radius * 2.1;
          ctx.strokeRect(-s / 2, -s / 2, s, s);
        } else {
          // Architectural crosshair '+'
          const c = n.radius * 1.8;
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
      {/* 1. ANIMATED SOFT PEARL & SILVER FLOATING AURORA ORBS */}
      <div
        className="absolute -top-32 -left-24 w-[620px] h-[620px] rounded-full blur-3xl animate-orb-float-1"
        style={{
          background:
            'radial-gradient(circle, rgba(148, 163, 184, 0.22) 0%, rgba(226, 232, 240, 0.12) 50%, transparent 75%)'
        }}
      />
      <div
        className="absolute top-1/3 -right-32 w-[560px] h-[560px] rounded-full blur-3xl animate-orb-float-2"
        style={{
          background:
            'radial-gradient(circle, rgba(100, 116, 139, 0.16) 0%, rgba(241, 245, 249, 0.12) 55%, transparent 75%)'
        }}
      />
      <div
        className="absolute -bottom-36 left-1/4 w-[680px] h-[500px] rounded-full blur-3xl animate-orb-float-3"
        style={{
          background:
            'radial-gradient(circle, rgba(148, 163, 184, 0.18) 0%, rgba(226, 232, 240, 0.10) 50%, transparent 75%)'
        }}
      />

      {/* 2. DRIFTING ARCHITECTURAL GEOMETRIC GRID & DOT MATRIX */}
      <div
        className="absolute inset-0 opacity-[0.42] animate-bg-grid-drift"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(203, 213, 225, 0.38) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(203, 213, 225, 0.38) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px'
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.38]"
        style={{
          backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
          backgroundSize: '22px 22px'
        }}
      />

      {/* 3. ROTATING MINIMALIST ARCHITECTURAL WIREFRAME RINGS */}
      <div className="absolute -top-48 right-[8%] w-[460px] h-[460px] rounded-full border border-dashed border-slate-300/60 animate-spin-ultra-slow" />
      <div className="absolute -top-36 right-[10%] w-[360px] h-[360px] rounded-full border border-slate-200/80 animate-reverse-spin-ultra-slow" />
      <div className="absolute bottom-[-180px] left-[4%] w-[440px] h-[440px] rounded-full border border-dashed border-slate-300/50 animate-reverse-spin-ultra-slow" />

      {/* 4. DIAGONAL PEARL SHIMMER SWEEP BEAM */}
      <div
        className="absolute inset-0 animate-bg-beam pointer-events-none"
        style={{
          background:
            'linear-gradient(115deg, transparent 35%, rgba(255, 255, 255, 0.75) 48%, rgba(226, 232, 240, 0.25) 50%, rgba(255, 255, 255, 0.75) 52%, transparent 65%)',
          backgroundSize: '220% 220%'
        }}
      />

      {/* 5. 60FPS INTERACTIVE CONSTELLATION & SONAR PULSE CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

export default CyberBackground;
