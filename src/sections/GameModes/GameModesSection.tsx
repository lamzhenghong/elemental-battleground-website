import { ArrowUpRight, Compass } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { GAME_MODES } from '../../content/gameModes';

export function GameModesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const mode = GAME_MODES[activeIndex];

  return (
    <section
      id="modes"
      className="modes-section"
      aria-labelledby="modes-title"
      style={{ '--mode-accent': mode.accent } as CSSProperties}
    >
      <img className="mode-backdrop" src={mode.image} alt="" loading="lazy" />
      <div className="mode-shade" aria-hidden="true" />
      <div className="page-shell modes-shell">
        <header>
          <p className="chapter-index">06 / Choose the trial</p>
          <h2 id="modes-title">A different answer for every kind of player.</h2>
        </header>

        <div className="mode-story" aria-live="polite">
          <p><Compass aria-hidden="true" /> {mode.kicker}</p>
          <h3>{mode.name}</h3>
          <strong>{mode.statement}</strong>
          <span>{mode.objective}</span>
        </div>

        <div className="mode-rail" aria-label="Explore game modes">
          {GAME_MODES.map((candidate, index) => (
            <button
              type="button"
              key={candidate.id}
              aria-pressed={index === activeIndex}
              aria-label={`Explore ${candidate.name}`}
              onClick={() => setActiveIndex(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{candidate.name}</strong>
              <ArrowUpRight aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
