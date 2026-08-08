import { Anvil, Layers3, ShieldPlus, Sparkles, UsersRound } from 'lucide-react';
import { useState } from 'react';
import { PROGRESSION_LAYERS } from '../../content/siteContent';

const ICONS = [ShieldPlus, Layers3, Anvil, UsersRound, Sparkles] as const;

export function ProgressionSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = PROGRESSION_LAYERS[activeIndex];

  return (
    <section id="progression" className="progression-section" aria-labelledby="progression-title">
      <div className="page-shell progression-shell">
        <header>
          <p className="chapter-index">07 / Build your answer</p>
          <h2 id="progression-title">Power is not found. It is composed.</h2>
          <p>Five connected choices shape how a party moves, reacts, survives, and finishes a fight.</p>
        </header>

        <div className="progression-orbit">
          <div className="progression-core" aria-live="polite">
            <span>{String(activeIndex + 1).padStart(2, '0')}</span>
            <h3>{active.label}</h3>
            <p>{active.detail}</p>
          </div>
          <div className="progression-path" aria-label="Progression layers">
            {PROGRESSION_LAYERS.map((layer, index) => {
              const Icon = ICONS[index];
              return (
                <button
                  type="button"
                  key={layer.id}
                  aria-pressed={index === activeIndex}
                  aria-label={layer.label}
                  onClick={() => setActiveIndex(index)}
                >
                  <Icon aria-hidden="true" />
                  <span>{layer.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
