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
 * ThemeForest-Compatible Cyber Apple Green Constellation Animated Background
 * Features bold, clearly visible Apple Green animation lines, glowing cyber nodes,
 * expanding neon sonar waves, rotating wireframe rings, sliding/swiping Apple Green
 * shadow and laser beam animations on a clean ThemeForest white canvas.
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
    // Bold, clearly visible particle density
    const particleCount = Math.min(64, Math.max(34, Math.floor((width * height) * 0.000038)));

    const nodes: ParticleNode[] = Array.from({ length: particleCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.65,
      vy: (Math.random() - 0.5) * 0.65,
      radius: 3.5 + Math.random() * 4.2, // Clearly visible nodes
      shape: shapes[i % shapes.length],
      angle: Math.random() * Math.PI * 2,
      vAngle: (Math.random() - 0.5) * 0.02,
      alpha: 0.65 + Math.random() * 0.35 // Crisp, bold visibility
    }));

    const pulses: PulseWave[] = [];
    let frameTick = 0;

    const spawnPulse = (x?: number, y?: number) => {
      if (pulses.length > 6) return;
      pulses.push({
        x: x ?? Math.random() * width,
        y: y ?? Math.random() * height,
        radius: 8,
        maxRadius: 180 + Math.random() * 140,
        alpha: 0.75 // Vibrant, clearly visible sonar pulse
      });
    };

    // Initial ambient pulses in bold apple green
    spawnPulse(width * 0.35, height * 0.3);
    spawnPulse(width * 0.72, height * 0.65);

    const render = () => {
      frameTick++;
      ctx.clearRect(0, 0, width, height);

      // Spawn periodic bold apple green sonar ripples
      if (frameTick % 130 === 0) {
        spawnPulse();
      }

      // Draw expanding bold apple green sonar pulse rings
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.radius += 1.25;
        p.alpha = Math.max(0, 0.75 * (1 - p.radius / p.maxRadius));

        ctx.save();
        // Primary outer pulse ring
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(74, 222, 128, ${p.alpha.toFixed(3)})`;
        ctx.lineWidth = 2.4;
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Secondary concentric pulse ring
        if (p.radius > 24) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 0.68, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(34, 197, 94, ${(p.alpha * 0.85).toFixed(3)})`;
          ctx.lineWidth = 1.6;
          ctx.stroke();
        }
        ctx.restore();

        if (p.radius >= p.maxRadius) {
          pulses.splice(i, 1);
        }
      }

      // Update & draw bold apple green constellation lines and geometric nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;
        n.angle += n.vAngle;

        // Wrap around viewport edges
        if (n.x < -24) n.x = width + 24;
        if (n.x > width + 24) n.x = -24;
        if (n.y < -24) n.y = height + 24;
        if (n.y > height + 24) n.y = -24;

        // Connect nearby nodes with BOLD apple green lines
        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 185;

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.58;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(34, 197, 94, ${lineAlpha.toFixed(3)})`;
            ctx.lineWidth = 1.85; // Clearly visible bold connector
            ctx.shadowColor = '#22c55e';
            ctx.shadowBlur = 4;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Interactive cursor bold green constellation tether
        if (mouse.active) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 240) {
            const mAlpha = (1 - mDist / 240) * 0.75;
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(74, 222, 128, ${mAlpha.toFixed(3)})`;
            ctx.lineWidth = 2.0;
            ctx.shadowColor = '#22c55e';
            ctx.shadowBlur = 10;
            ctx.stroke();
            ctx.restore();
          }
        }

        // Draw node shape with vibrant Apple Green glow
        ctx.save();
        ctx.translate(n.x, n.y);
        ctx.rotate(n.angle);
        ctx.shadowColor = '#22c55e';
        ctx.shadowBlur = 8;
        ctx.strokeStyle = `rgba(34, 197, 94, ${n.alpha.toFixed(3)})`;
        ctx.fillStyle = `rgba(74, 222, 128, ${(n.alpha * 0.95).toFixed(3)})`;
        ctx.lineWidth = 2.0;

        if (n.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, n.radius, 0, Math.PI * 2);
          ctx.fill();
          // Inner glowing core
          ctx.beginPath();
          ctx.arc(0, 0, n.radius * 0.45, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        } else if (n.shape === 'square') {
          const s = n.radius * 2.2;
          ctx.strokeRect(-s / 2, -s / 2, s, s);
          ctx.fillStyle = 'rgba(74, 222, 128, 0.35)';
          ctx.fillRect(-s / 2, -s / 2, s, s);
        } else if (n.shape === 'diamond') {
          const d = n.radius * 1.8;
          ctx.beginPath();
          ctx.moveTo(0, -d);
          ctx.lineTo(d, 0);
          ctx.lineTo(0, d);
          ctx.lineTo(-d, 0);
          ctx.closePath();
          ctx.stroke();
          ctx.fillStyle = 'rgba(34, 197, 94, 0.45)';
          ctx.fill();
        } else {
          // Cyber green crosshair '+'
          const c = n.radius * 2.3;
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
      {/* 1. BOLD APPLE GREEN & EMERALD FLOATING AURORA SHADOW ORBS */}
      <div
        className="absolute -top-32 -left-24 w-[740px] h-[740px] rounded-full blur-3xl animate-orb-float-1"
        style={{
          background:
            'radial-gradient(circle, rgba(74, 222, 128, 0.34) 0%, rgba(34, 197, 94, 0.22) 45%, transparent 75%)'
        }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[700px] h-[700px] rounded-full blur-3xl animate-orb-float-2"
        style={{
          background:
            'radial-gradient(circle, rgba(34, 197, 94, 0.32) 0%, rgba(74, 222, 128, 0.20) 48%, transparent 75%)'
        }}
      />
      <div
        className="absolute -bottom-36 left-1/4 w-[820px] h-[640px] rounded-full blur-3xl animate-orb-float-3"
        style={{
          background:
            'radial-gradient(circle, rgba(74, 222, 128, 0.32) 0%, rgba(22, 163, 74, 0.18) 50%, transparent 75%)'
        }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-[560px] h-[560px] rounded-full blur-3xl animate-orb-float-1"
        style={{
          background:
            'radial-gradient(circle, rgba(34, 197, 94, 0.22) 0%, rgba(74, 222, 128, 0.12) 50%, transparent 75%)'
        }}
      />

      {/* 2. BOLD ARCHITECTURAL GEOMETRIC GRID & DOT MATRIX (CLEARLY VISIBLE) */}
      <div
        className="absolute inset-0 opacity-[0.68] animate-bg-grid-drift"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(34, 197, 94, 0.26) 1.2px, transparent 1.2px),
            linear-gradient(to bottom, rgba(34, 197, 94, 0.26) 1.2px, transparent 1.2px)
          `,
          backgroundSize: '44px 44px'
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.62]"
        style={{
          backgroundImage: 'radial-gradient(rgba(34, 197, 94, 0.45) 1.5px, transparent 1.5px)',
          backgroundSize: '22px 22px'
        }}
      />

      {/* 3. ROTATING BOLD GREEN WIREFRAME RINGS & RETICLES (CLEARLY VISIBLE) */}
      <div className="absolute -top-48 right-[8%] w-[520px] h-[520px] rounded-full border-2 border-dashed border-emerald-500/70 animate-spin-ultra-slow shadow-[0_0_35px_rgba(34,197,94,0.30)]" />
      <div className="absolute -top-36 right-[10%] w-[400px] h-[400px] rounded-full border-2 border-emerald-500/80 animate-reverse-spin-ultra-slow" />
      <div className="absolute bottom-[-180px] left-[4%] w-[500px] h-[500px] rounded-full border-2 border-dashed border-emerald-500/70 animate-reverse-spin-ultra-slow shadow-[0_0_35px_rgba(34,197,94,0.30)]" />
      <div className="absolute bottom-[-120px] left-[7%] w-[340px] h-[340px] rounded-full border border-emerald-400/80 animate-spin-ultra-slow" />

      {/* Cyber Corner Reticle Accents */}
      <div className="absolute top-6 left-6 w-10 h-10 border-t-2 border-l-2 border-emerald-500/60 pointer-events-none" />
      <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-emerald-500/60 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-emerald-500/60 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-10 h-10 border-b-2 border-r-2 border-emerald-500/60 pointer-events-none" />

      {/* 4. SLIDING / SWIPING APPLE GREEN SHADOW & LASER BEAM ANIMATIONS */}
      {/* Broad diagonal Apple Green beam sweep */}
      <div
        className="absolute inset-0 animate-bg-beam pointer-events-none"
        style={{
          background:
            'linear-gradient(118deg, transparent 20%, rgba(74, 222, 128, 0.18) 42%, rgba(34, 197, 94, 0.40) 50%, rgba(74, 222, 128, 0.18) 58%, transparent 80%)',
          backgroundSize: '240% 240%'
        }}
      />

      {/* Dedicated sliding / swiping Apple Green laser shadow wave */}
      <div
        className="absolute top-0 bottom-0 w-[280px] sm:w-[440px] -left-[15%] animate-apple-green-sweep pointer-events-none"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(74, 222, 128, 0.10) 25%, rgba(34, 197, 94, 0.36) 50%, rgba(74, 222, 128, 0.20) 75%, transparent 100%)',
          filter: 'blur(10px)',
          boxShadow: '0 0 50px rgba(34, 197, 94, 0.45)'
        }}
      />

      {/* High-definition crisp Apple Green sliding tracer line */}
      <div
        className="absolute top-0 bottom-0 w-[3px] -left-[15%] animate-apple-green-sweep pointer-events-none"
        style={{
          background: '#4ade80',
          filter: 'blur(0.5px)',
          boxShadow: '0 0 16px #22c55e, 0 0 32px #4ade80'
        }}
      />

      {/* Floating Apple Green shadow slide field */}
      <div
        className="absolute -top-[25%] -left-[25%] w-[150%] h-[150%] animate-apple-green-shadow-slide pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(34, 197, 94, 0.24) 0%, rgba(74, 222, 128, 0.14) 38%, transparent 72%)',
          filter: 'blur(35px)'
        }}
      />

      {/* 5. 60FPS INTERACTIVE CONSTELLATION & NEON SONAR PULSE CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
};

export default CyberBackground;
