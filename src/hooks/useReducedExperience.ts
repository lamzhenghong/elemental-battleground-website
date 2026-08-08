import { useEffect, useState } from 'react';

interface NavigatorWithConnection extends Navigator {
  connection?: { saveData?: boolean };
}

export interface ReducedExperience {
  reducedMotion: boolean;
  reducedData: boolean;
  coarsePointer: boolean;
}

const readPreference = (): ReducedExperience => ({
  reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  reducedData: Boolean((navigator as NavigatorWithConnection).connection?.saveData),
  coarsePointer: window.matchMedia('(pointer: coarse)').matches
});

export function useReducedExperience() {
  const [preference, setPreference] = useState<ReducedExperience>(() => readPreference());

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointer = window.matchMedia('(pointer: coarse)');
    const update = () => setPreference(readPreference());
    motion.addEventListener('change', update);
    pointer.addEventListener('change', update);
    return () => {
      motion.removeEventListener('change', update);
      pointer.removeEventListener('change', update);
    };
  }, []);

  return preference;
}
