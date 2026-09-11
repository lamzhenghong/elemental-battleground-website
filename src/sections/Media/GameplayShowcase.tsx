import { RotateCcw } from 'lucide-react';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';

function CombatChallengeFallback() {
  return (
    <div className="combat-challenge-loading combat-challenge-fallback" role="status">
      <strong>Combat trial signal interrupted</strong>
      <span>The field archive is still available below.</span>
      <button type="button" onClick={() => window.location.reload()}>
        <RotateCcw aria-hidden="true" /> Retry trial
      </button>
    </div>
  );
}

const CombatChallenge = lazy(async () => {
  try {
    return await import('./CombatChallenge');
  } catch (error) {
    if (import.meta.env.DEV) console.warn('Combat challenge failed to load', error);
    return { default: CombatChallengeFallback };
  }
});

export function GameplayShowcase() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(() => import.meta.env.MODE === 'test');

  useEffect(() => {
    if (shouldLoad) return;
    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
          if (!entry?.isIntersecting) return;
          setShouldLoad(true);
          observer?.disconnect();
        }, { rootMargin: '700px 0px' });
    if (rootRef.current) observer?.observe(rootRef.current);
    else setShouldLoad(true);
    return () => observer?.disconnect();
  }, [shouldLoad]);

  return (
    <div ref={rootRef} className="gameplay-showcase">
      {shouldLoad ? (
        <Suspense fallback={<div className="combat-challenge-loading" role="status">Preparing combat synchronization trial…</div>}>
          <CombatChallenge />
        </Suspense>
      ) : <div className="combat-challenge-loading" role="status">Combat synchronization trial available below</div>}
    </div>
  );
}
