import { Film, ImageOff } from 'lucide-react';
import { useState } from 'react';
import { GAMEPLAY_CATEGORIES } from '../../content/gameplayMedia';
import type { GameplayCategoryId } from '../../types/content';

export function GameplayShowcase() {
  const [activeId, setActiveId] = useState<GameplayCategoryId>('combat');
  const active = GAMEPLAY_CATEGORIES.find(item => item.id === activeId) ?? GAMEPLAY_CATEGORIES[0];

  return (
    <section className="gameplay-showcase" aria-labelledby="gameplay-showcase-title">
      <div className="gameplay-showcase-art" aria-hidden="true">
        <img src="/media/images/world/chapter-10-prime-orbit-core.webp" alt="" loading="lazy" width="1600" height="900" />
        <span><Film /></span>
      </div>

      <div className="gameplay-showcase-copy">
        <p className="gameplay-showcase-kicker"><ImageOff aria-hidden="true" /> Authentic capture pending</p>
        <h3 id="gameplay-showcase-title">Gameplay showcase coming soon</h3>
        <p>Authentic gameplay capture has not been supplied, so this stage uses owned world artwork and never presents it as footage.</p>

        <div className="gameplay-showcase-tabs" aria-label="Gameplay showcase categories">
          {GAMEPLAY_CATEGORIES.map(category => (
            <button
              type="button"
              key={category.id}
              aria-pressed={active.id === category.id}
              onClick={() => setActiveId(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        <p className="gameplay-showcase-description" aria-live="polite">{active.description}</p>
      </div>
    </section>
  );
}
