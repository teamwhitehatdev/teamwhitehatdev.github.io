import React, { useEffect, useRef } from 'react';

interface ParticleNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  shape: 'circle' | 'square' | 'cross' | 'diamond';
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
 * Ultra-Clean Minimalist Ambient Animated Background
 * Decreased Apple Green saturation for an elegant, non-intrusive, high-end developer aesthetic.
 * Features soft ambient micro-particles, subtle constellation lines, and calm, low-contrast depth.
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

    const shapes: Array<'circle' | 'square' | 'cross' | 'diamond'> = [
      'circle',
      'circle',
      'square',
      'cross',
      'diamond'
    ];
    // Gentle particle density
    const particleCount = Math.min(42, Math.max(24, Math.floor((width * height) * 0.000022)));

    const nodes: ParticleNode[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: 1.8 + Math.random() * 2.0, // Subtle micro-nodes
      shape: shapes[i % shapes.length],
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.015,
      alpha: 0.25 + Math.random() * 0.25 // Soft, non-glaring alpha
    }));

    const pulses: PulseWave[] = [];
    let frameTick = 0;

    const spawnPulse = (x?: number, y?: number) => {
      if (pulses.length > 3) return;
      pulses.push({
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        radius: 6,
        maxRadius: 140 + Math.random() * 100,
        alpha: 0.18 // Very gentle, subtle pulse
      });
    };

    // Soft initial pulse
    spawnPulse(width * 0.3, height * 0.4);

    const render = () => {
      frameTick++;
      ctx.clearRect(0, 0, width, height);

      // Random gentle ambient pulse
      if (frameTick % 240 === 0 && Math.random() > 0.4) {
        spawnPulse();
      }

      // Render subtle pulses
      for (let pIdx = pulses.length - 1; pIdx >= 0; pIdx--) {
        const p = pulses[pIdx];
        p.radius += 0.75;
        p.alpha -= 0.0022;

        if (p.alpha <= 0 || p.radius >= p.maxRadius) {
          pulses.splice(pIdx, 1);
          continue;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 197, 94, ${p.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
        ctx.restore();
      }

      // Update & Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.angle += n.vAngle;

        // Wrap around viewport edges
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;

        // Connect nearby nodes with soft, gentle lines
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 160;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.16; // Reduced line alpha
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Interactive cursor gentle tether
        if (mouse.active) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 200) {
            const mAlpha = (1 - mDist / 200) * 0.28;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.0;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Draw node shape
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.angle);
        ctx.strokeStyle = `rgba(34, 197, 94, ${n.alpha.toFixed(3)})`;
        ctx.fillStyle = `rgba(34, 197, 94, ${(n.alpha * 0.7).toFixed(3)})`;
        ctx.lineWidth = 1.0;

        if (n.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, n.radius, 0, Math.PI * 2);
          ctx.fill();
        } else if (n.shape === 'square') {
          const s = n.radius * 1.8;
          ctx.strokeRect(-s / 2, -s / 2, s, s);
        } else if (n.shape === 'diamond') {
          const d = n.radius * 1.6;
          ctx.beginPath();
          ctx.moveTo(0, -d);
          ctx.lineTo(d, 0);
          ctx.lineTo(0, d);
          ctx.lineTo(-d, 0);
          ctx.closePath();
          ctx.stroke();
        } else {
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
      {/* 1. SOFT, LOW-SATURATION AMBIENT MIST ORBS (DECREASED GREEN FLOOD) */}
      <div
        className="absolute -top-32 -left-24 w-[640px] h-[640px] rounded-full blur-3xl animate-orb-float-1"
        style={{
          background:
            'radial-gradient(circle, rgba(74, 222, 128, 0.05) 0%, rgba(34, 197, 94, 0.02) 45%, transparent 70%)'
        }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[600px] h-[600px] rounded-full blur-3xl animate-orb-float-2"
        style={{
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.04) 0%, rgba(59, 130, 246, 0.02) 48%, transparent 70%)'
        }}
      />
      <div
        className="absolute -bottom-36 left-1/4 w-[700px] h-[540px] rounded-full blur-3xl animate-orb-float-3"
        style={{
          background:
            'radial-gradient(circle, rgba(34, 197, 94, 0.04) 0%, rgba(22, 163, 74, 0.015) 50%, transparent 70%)'
        }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-[480px] h-[480px] rounded-full blur-3xl animate-orb-float-1"
        style={{
          background:
            'radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, rgba(147, 51, 234, 0.015) 50%, transparent 70%)'
        }}
      />

      {/* 2. SUBTLE ARCHITECTURAL GEOMETRIC GRID & DOT MATRIX (LOW OPACITY) */}
      <div
        className="absolute inset-0 opacity-[0.16] animate-bg-grid-drift"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.20) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.20) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px'
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: 'radial-gradient(rgba(148, 163, 184, 0.35) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* 3. CALM WIREFRAME RINGS (MUTED OPACITY) */}
      <div className="absolute -top-48 right-[8%] w-[480px] h-[480px] rounded-full border border-dashed border-slate-300/40 animate-spin-ultra-slow" />
      <div className="absolute -top-36 right-[10%] w-[360px] h-[360px] rounded-full border border-emerald-500/15 animate-reverse-spin-ultra-slow" />
      <div className="absolute bottom-[-180px] left-[4%] w-[440px] h-[440px] rounded-full border border-dashed border-slate-300/40 animate-reverse-spin-ultra-slow" />

      {/* 4. SOFT AMBIENT LIGHT SHIMMER (MUTED) */}
      <div
        className="absolute inset-0 animate-bg-beam pointer-events-none opacity-[0.04]"
        style={{
          background:
            'linear-gradient(118deg, transparent 20%, rgba(99, 102, 241, 0.15) 45%, rgba(34, 197, 94, 0.20) 50%, rgba(99, 102, 241, 0.15) 55%, transparent 80%)',
          backgroundSize: '240% 240%'
        }}
      />

      {/* 5. 60FPS INTERACTIVE CONSTELLATION CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

export default CyberBackground;
