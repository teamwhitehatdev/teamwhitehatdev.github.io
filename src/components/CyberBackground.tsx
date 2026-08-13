import React, { useEffect, useRef } from 'react';

export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // MATRIX RAIN SETUP
    const chars = '0123456789ABCDEF01010101XYZ#$@%&*+=-<>~ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -100));

    // PARTICLE MESH SETUP
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    const numParticles = Math.min(50, Math.floor(canvas.width / 30));

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let frameCount = 0;

    const draw = () => {
      frameCount++;

      // Semi-transparent background fade for Matrix trail effect
      ctx.fillStyle = 'rgba(5, 7, 15, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. DRAW MATRIX DIGITAL RAIN
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        // Random Matrix Character
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Lead character is bright white / lime, trailing characters are neon cyan / green
        if (Math.random() > 0.85) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 8;
        } else if (i % 3 === 0) {
          ctx.fillStyle = '#a3e635'; // Neon Lime
          ctx.shadowColor = '#a3e635';
          ctx.shadowBlur = 4;
        } else {
          ctx.fillStyle = '#00f0ff'; // Cyber Cyan
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        // Reset drop after reaching canvas height with random delay
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Reset shadow blur after Matrix Rain
      ctx.shadowBlur = 0;

      // 2. DRAW CYBER GRID LINES
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 60;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // 3. DRAW PARTICLES AND CONSTELLATION LINES
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = `rgba(163, 230, 53, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 120)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};

export default CyberBackground;
