import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

interface ShootingStar {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
}

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const applyCanvasSize = () => {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    applyCanvasSize();

    const numStars = 200;
    const stars: Star[] = Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2,
      opacity: Math.random(),
    }));

    const resize = () => {
      const prevWidth = width;
      const prevHeight = height;
      width = window.innerWidth;
      height = window.innerHeight;
      applyCanvasSize();
      stars.forEach((star) => {
        star.x = (star.x / prevWidth) * width;
        star.y = (star.y / prevHeight) * height;
      });
    };

    const drawStars = () => {
      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const render = () => {
        ctx.clearRect(0, 0, width, height);
        drawStars();
      };
      render();
      const handleResize = () => {
        resize();
        render();
      };
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }

    window.addEventListener('resize', resize);

    const shootingStars: ShootingStar[] = [];

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.5,
        speed: 5 + Math.random() * 5,
        length: 50 + Math.random() * 80,
        opacity: 1,
      });
    };

    for (let i = 0; i < 3; i++) {
      createShootingStar();
    }

    const shootingStarInterval = window.setInterval(() => {
      if (Math.random() > 0.5) {
        createShootingStar();
      }
    }, 2000);

    let animationFrameId = 0;

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, width, height);

      stars.forEach((star) => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        star.opacity += (Math.random() - 0.5) * 0.1;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
      });

      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];

        const gradient = ctx.createLinearGradient(
          star.x,
          star.y,
          star.x + star.length,
          star.y + star.length
        );
        gradient.addColorStop(0, `rgba(168, 85, 247, ${star.opacity})`);
        gradient.addColorStop(0.5, `rgba(139, 92, 246, ${star.opacity * 0.5})`);
        gradient.addColorStop(1, 'rgba(139, 92, 246, 0)');

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(star.x + star.length, star.y + star.length);
        ctx.stroke();

        star.x += star.speed;
        star.y += star.speed;
        star.opacity -= 0.01;

        if (
          star.x > width + star.length ||
          star.y > height + star.length ||
          star.opacity <= 0
        ) {
          shootingStars.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.clearInterval(shootingStarInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)' }}
    />
  );
}
