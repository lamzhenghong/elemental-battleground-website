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

    const draw = () => {
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

    resize();
    window.addEventListener('resize', resize, { passive: true });
    frame = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
    };
  }, [disabled]);

  return <canvas ref={canvasRef} className="portal-particles" aria-hidden="true" />;
}
