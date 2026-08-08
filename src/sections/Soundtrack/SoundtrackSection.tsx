import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import type { CSSProperties } from 'react';
import { SOUNDTRACK } from '../../content/soundtrack';
import { useExclusiveAudio } from './useExclusiveAudio';

interface SoundtrackSectionProps {
  soundEnabled: boolean;
  onSoundEnabledChange: (enabled: boolean) => void;
}

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return '0:00';
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
};

export function SoundtrackSection({ soundEnabled, onSoundEnabledChange }: SoundtrackSectionProps) {
  const player = useExclusiveAudio(soundEnabled, onSoundEnabledChange);

  return (
    <section id="soundtrack" className="soundtrack-section" aria-labelledby="soundtrack-title">
      <div className="page-shell soundtrack-shell">
        <header>
          <p className="chapter-index">09 / Echoes of Aetheria</p>
          <h2 id="soundtrack-title">Let the world answer back.</h2>
          <p>Optional excerpts from the game soundtrack. Playback begins only when you choose it.</p>
        </header>

        <div className="sound-console">
          <div className="sound-now-playing">
            <span>Now selected</span>
            <h3>{player.selected.name}</h3>
            <p>{player.selected.context}</p>
            <div className={`sound-wave ${player.playing && soundEnabled ? 'is-playing' : ''}`} aria-hidden="true">
              {Array.from({ length: 36 }, (_, index) => <i key={index} style={{ '--bar': (index % 7) + 2 } as CSSProperties} />)}
            </div>
          </div>

          <div className="sound-controls">
            <button
              type="button"
              className="sound-main-control"
              aria-label={`${player.playing && soundEnabled ? 'Pause' : 'Play'} selected track ${player.selected.name}`}
              onClick={() => player.toggleTrack(player.selectedIndex)}
            >
              {player.playing && soundEnabled ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}
            </button>
            <div className="sound-progress">
              <input
                type="range"
                min="0"
                max={player.duration || 1}
                step="0.1"
                value={Math.min(player.currentTime, player.duration || 1)}
                onChange={player.scrub}
                aria-label="Track progress"
              />
              <span>{formatTime(player.currentTime)} / {player.duration ? formatTime(player.duration) : player.selected.duration}</span>
            </div>
            <button
              type="button"
              className="sound-mute-control"
              aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
              onClick={() => onSoundEnabledChange(!soundEnabled)}
            >
              {soundEnabled ? <Volume2 aria-hidden="true" /> : <VolumeX aria-hidden="true" />}
            </button>
            <input
              className="sound-volume"
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={player.volume}
              onChange={event => player.setVolume(Number(event.target.value))}
              aria-label="Soundtrack volume"
            />
          </div>

          <div className="sound-track-list">
            {SOUNDTRACK.map((track, index) => (
              <button
                type="button"
                key={track.id}
                className={index === player.selectedIndex ? 'is-active' : ''}
                aria-label={`${player.playing && soundEnabled && index === player.selectedIndex ? 'Pause' : 'Play'} ${track.name}`}
                aria-pressed={index === player.selectedIndex}
                onClick={() => player.toggleTrack(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{track.name}</strong>
                <small>{track.duration}</small>
              </button>
            ))}
          </div>

          <audio
            ref={player.audioRef}
            src={player.hasInteracted ? player.selected.src : undefined}
            preload="none"
            onLoadedMetadata={event => player.setDuration(event.currentTarget.duration)}
            onTimeUpdate={event => player.setCurrentTime(event.currentTarget.currentTime)}
            onEnded={() => player.setPlaying(false)}
          />
        </div>
      </div>
    </section>
  );
}
