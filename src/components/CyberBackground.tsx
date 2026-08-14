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

    // MATRIX RAIN SETUP - DENSE & FAST
    const chars = '0123456789ABCDEF01010101XYZ#$@%&*+=-<>~ｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜ';
    const fontSize = 12;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = new Array(columns).fill(1).map(() => Math.floor(Math.random() * -120));

    // GEOMETRIC PARTICLES SETUP
    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    const numParticles = Math.min(65, Math.floor(canvas.width / 20));

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.8 + 1,
        alpha: Math.random() * 0.6 + 0.2
      });
    }

    let rotationAngle = 0;

    const draw = () => {
      rotationAngle += 0.005;

      // Darker trail fade for high contrast Matrix rain
      ctx.fillStyle = 'rgba(2, 4, 10, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. HIGH-DENSITY MATRIX CODE RAIN
      ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
      
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Lead glowing character
        if (Math.random() > 0.88) {
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#00f0ff';
          ctx.shadowBlur = 10;
        } else if (i % 4 === 0) {
          ctx.fillStyle = '#a3e635'; // Neon Lime
          ctx.shadowColor = '#a3e635';
          ctx.shadowBlur = 5;
        } else if (i % 2 === 0) {
          ctx.fillStyle = '#00ff66'; // Matrix Green
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = '#00f0ff'; // Cyber Cyan
          ctx.shadowBlur = 0;
        }

        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      ctx.shadowBlur = 0;

      // 2. ANIMATED GEOMETRIC PATTERNS (HEXAGONS & RADAR RINGS)
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(rotationAngle);

      // Rotating Hexagon
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const hexRadius = Math.min(canvas.width, canvas.height) * 0.35;
      for (let side = 0; side < 6; side++) {
        const angle = (side * Math.PI) / 3;
        const hx = hexRadius * Math.cos(angle);
        const hy = hexRadius * Math.sin(angle);
        if (side === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.stroke();

      // Outer Radar Ring
      ctx.strokeStyle = 'rgba(163, 230, 53, 0.04)';
      ctx.beginPath();
      ctx.arc(0, 0, hexRadius * 1.15, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // 3. CYBER PERSPECTIVE GRID LINES
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
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

      // 4. CONSTELLATION PARTICLES & LASER LINKS
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

          if (dist < 130) {
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.15 * (1 - dist / 130)})`;
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
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
    />
  );
};

export default CyberBackground;
