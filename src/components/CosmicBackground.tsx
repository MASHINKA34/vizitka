import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speed: number;
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

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    const stars: Star[] = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 0.5,
        opacity: Math.random(),
      });
    }

    const shootingStars: ShootingStar[] = [];

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * 0.5,
        speed: 5 + Math.random() * 5,
        length: 50 + Math.random() * 80,
        opacity: 1,
      });
    };

    for (let i = 0; i < 3; i++) {
      createShootingStar();
    }

    const shootingStarInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        createShootingStar();
      }
    }, 2000);

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
          star.x > canvas.width + star.length ||
          star.y > canvas.height + star.length ||
          star.opacity <= 0
        ) {
          shootingStars.splice(i, 1);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      clearInterval(shootingStarInterval);
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
