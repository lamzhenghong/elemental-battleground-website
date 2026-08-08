import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  velocity: number;
  drift: number;
  alpha: number;
  hue: number;
}

interface PortalParticlesProps {
  disabled: boolean;
}

export function PortalParticles({ disabled }: PortalParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || disabled || import.meta.env.MODE === 'test') return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];
    let inView = true;
    let pageVisible = !document.hidden;
    let disposed = false;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const count = Math.min(48, Math.max(22, Math.round(width / 34)));
      particles = Array.from({ length: count }, (_, index) => ({
        x: (index * 83.17) % Math.max(width, 1),
        y: (index * 137.29) % Math.max(height, 1),
        radius: 0.8 + (index % 4) * 0.55,
        velocity: 0.16 + (index % 5) * 0.05,
        drift: ((index % 7) - 3) * 0.025,
        alpha: 0.18 + (index % 6) * 0.08,
        hue: index % 3 === 0 ? 44 : index % 3 === 1 ? 193 : 274
      }));
    };

    const stop = () => {
      if (!frame) return;
      window.cancelAnimationFrame(frame);
      frame = 0;
    };

    const draw = () => {
      frame = 0;
      if (disposed || !inView || !pageVisible) return;
      context.clearRect(0, 0, width, height);
      for (const particle of particles) {
        particle.y -= particle.velocity;
        particle.x += particle.drift;
        if (particle.y < -8) particle.y = height + 8;
        if (particle.x < -8) particle.x = width + 8;
        if (particle.x > width + 8) particle.x = -8;
        context.beginPath();
        context.fillStyle = `hsla(${particle.hue}, 95%, 70%, ${particle.alpha})`;
        context.shadowColor = `hsla(${particle.hue}, 95%, 65%, .65)`;
        context.shadowBlur = 12;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
      frame = window.requestAnimationFrame(draw);
    };

    const start = () => {
      if (!frame && !disposed && inView && pageVisible) frame = window.requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
      else stop();
    };

    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
          inView = entry?.isIntersecting ?? false;
          if (inView) start();
          else stop();
        }, { rootMargin: '120px 0px' });

    resize();
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    observer?.observe(canvas);
    start();
    return () => {
      disposed = true;
      stop();
      observer?.disconnect();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [disabled]);

  return <canvas ref={canvasRef} className="portal-particles" aria-hidden="true" />;
}
