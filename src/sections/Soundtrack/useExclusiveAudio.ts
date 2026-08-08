import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { SOUNDTRACK } from '../../content/soundtrack';

export function useExclusiveAudio(soundEnabled: boolean, onSoundEnabledChange: (enabled: boolean) => void) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.65);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!soundEnabled) {
      audio.pause();
      setPlaying(false);
      return;
    }
    if (!playing) {
      audio.pause();
      return;
    }

    audio.currentTime = 0;
    void audio.play().catch(() => setPlaying(false));
  }, [playing, selectedIndex, soundEnabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const handleVisibility = () => {
      if (document.hidden) audio.pause();
      else if (playing && soundEnabled) void audio.play().catch(() => setPlaying(false));
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      audio.pause();
    };
  }, [playing, soundEnabled]);

  const toggleTrack = (index: number) => {
    setHasInteracted(true);
    if (!soundEnabled) onSoundEnabledChange(true);
    if (selectedIndex === index && playing) setPlaying(false);
    else {
      setSelectedIndex(index);
      setPlaying(true);
    }
  };

  const scrub = (event: ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    const nextTime = Number(event.target.value);
    if (audio) audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  return {
    audioRef,
    selected: SOUNDTRACK[selectedIndex],
    selectedIndex,
    playing,
    hasInteracted,
    currentTime,
    duration,
    volume,
    toggleTrack,
    scrub,
    setCurrentTime,
    setDuration,
    setPlaying,
    setVolume
  };
}
