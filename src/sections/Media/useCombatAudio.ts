import { useCallback, useEffect, useRef } from 'react';

type CombatCue = 'attack' | 'perfect' | 'impact' | 'skill' | 'ultimate';

const CUES: Record<CombatCue, { frequency: number; duration: number; gain: number; endFrequency: number }> = {
  attack: { frequency: 240, endFrequency: 160, duration: 0.07, gain: 0.035 },
  perfect: { frequency: 740, endFrequency: 1040, duration: 0.11, gain: 0.045 },
  impact: { frequency: 130, endFrequency: 82, duration: 0.12, gain: 0.05 },
  skill: { frequency: 420, endFrequency: 720, duration: 0.16, gain: 0.045 },
  ultimate: { frequency: 180, endFrequency: 920, duration: 0.28, gain: 0.06 }
};

export function useCombatAudio(enabled: boolean) {
  const contextRef = useRef<AudioContext | null>(null);

  const playCue = useCallback((cue: CombatCue) => {
    if (!enabled || typeof window === 'undefined') return;
    const AudioContextConstructor = window.AudioContext
      ?? (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextConstructor) return;
    const context = contextRef.current ?? new AudioContextConstructor();
    contextRef.current = context;
    if (context.state === 'suspended') void context.resume().catch(() => undefined);

    const definition = CUES[cue];
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = cue === 'ultimate' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(definition.frequency, context.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(definition.endFrequency, context.currentTime + definition.duration);
    gain.gain.setValueAtTime(definition.gain, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + definition.duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + definition.duration);
  }, [enabled]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden && contextRef.current?.state === 'running') void contextRef.current.suspend();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (contextRef.current && contextRef.current.state !== 'closed') void contextRef.current.close();
      contextRef.current = null;
    };
  }, []);

  return playCue;
}
