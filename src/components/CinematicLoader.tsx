import { useEffect, useState } from 'react';
import { useReducedExperience } from '../hooks/useReducedExperience';

interface CinematicLoaderProps {
  duration?: number;
}

const INTRO_KEY = 'eb-site-intro-seen';

export function CinematicLoader({ duration = 1200 }: CinematicLoaderProps) {
  const { reducedMotion } = useReducedExperience();
  const [phase, setPhase] = useState<'active' | 'leaving' | 'hidden'>(() => {
    try {
      return window.sessionStorage.getItem(INTRO_KEY) === 'true' ? 'hidden' : 'active';
    } catch {
      return 'active';
    }
  });

  useEffect(() => {
    if (phase !== 'active') return;
    const activeDuration = reducedMotion ? Math.min(duration, 80) : duration;
    const leaveTimer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(INTRO_KEY, 'true');
      } catch {
        // The introduction still completes when storage is unavailable.
      }
      setPhase('leaving');
    }, activeDuration);
    const hideTimer = window.setTimeout(() => setPhase('hidden'), activeDuration + (reducedMotion ? 20 : 180));

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, [duration, reducedMotion]);

  if (phase === 'hidden') return null;

  return (
    <div className="cinematic-loader" data-phase={phase} role="status" aria-label="Opening the Aether Gate">
      <div className="loader-sigil" aria-hidden="true"><i /><i /><span /></div>
      <p>Dawning Core</p>
      <strong>Synchronizing Aetheria</strong>
      <div className="loader-line" aria-hidden="true"><span /></div>
    </div>
  );
}
