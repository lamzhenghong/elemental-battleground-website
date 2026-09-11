import { Droplets, Flame, Gem, Leaf, RotateCcw, Snowflake, Wind, Zap, type LucideIcon } from 'lucide-react';
import { useRef, type CSSProperties } from 'react';
import { useInteractiveExperience } from '../../interactive/InteractiveExperienceContext';
import { ELEMENT_DEFINITIONS, type ElementIconKey } from '../../interactive/elementDefinitions';

const ICONS: Record<ElementIconKey, LucideIcon> = {
  flame: Flame,
  droplets: Droplets,
  snowflake: Snowflake,
  zap: Zap,
  wind: Wind,
  gem: Gem,
  leaf: Leaf
};

export function ElementSelector() {
  const { selectedElement, selectElement, resetElement } = useInteractiveExperience();
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const moveSelection = (currentIndex: number, offset: number) => {
    const nextIndex = (currentIndex + offset + ELEMENT_DEFINITIONS.length) % ELEMENT_DEFINITIONS.length;
    const next = ELEMENT_DEFINITIONS[nextIndex];
    selectElement(next.id);
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <section id="resonance" className="resonance-section" aria-labelledby="resonance-title">
      <div className="resonance-shell page-shell">
        <div className="resonance-heading">
          <p className="chapter-index">00 / Elemental attunement</p>
          <div>
            <h2 id="resonance-title">Choose your resonance.</h2>
            <p>Your affinity shapes the gate, the atmosphere, and your combat trial.</p>
          </div>
        </div>

        <div className="resonance-selector" role="radiogroup" aria-label="Choose elemental resonance">
          {ELEMENT_DEFINITIONS.map((element, index) => {
            const Icon = ICONS[element.icon];
            const selected = selectedElement.id === element.id;
            return (
              <button
                ref={node => { buttonRefs.current[index] = node; }}
                type="button"
                role="radio"
                aria-checked={selected}
                tabIndex={selected ? 0 : -1}
                key={element.id}
                className="resonance-option"
                data-element={element.id}
                style={{ '--element-color': element.primary, '--element-glow': element.glow } as CSSProperties}
                onClick={() => selectElement(element.id)}
                onKeyDown={event => {
                  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
                    event.preventDefault();
                    moveSelection(index, 1);
                  }
                  if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
                    event.preventDefault();
                    moveSelection(index, -1);
                  }
                  if (event.key === 'Home') {
                    event.preventDefault();
                    selectElement(ELEMENT_DEFINITIONS[0].id);
                    buttonRefs.current[0]?.focus();
                  }
                  if (event.key === 'End') {
                    event.preventDefault();
                    const last = ELEMENT_DEFINITIONS.length - 1;
                    selectElement(ELEMENT_DEFINITIONS[last].id);
                    buttonRefs.current[last]?.focus();
                  }
                }}
              >
                <span className="resonance-sigil" aria-hidden="true"><Icon /></span>
                <strong>{element.name}</strong>
                <small>{element.combat.status}</small>
              </button>
            );
          })}
        </div>

        <div className="resonance-readout" aria-live="polite">
          <span className="resonance-readout-sigil" aria-hidden="true">
            {(() => {
              const SelectedIcon = ICONS[selectedElement.icon];
              return <SelectedIcon />;
            })()}
          </span>
          <div>
            <small>{selectedElement.portalEffect} / {selectedElement.particleBehavior}</small>
            <strong>{selectedElement.name} resonance synchronized</strong>
            <p>{selectedElement.description}</p>
          </div>
          <button type="button" className="resonance-reset" onClick={resetElement} aria-label="Reset resonance to Pyro">
            <RotateCcw aria-hidden="true" /> Reset
          </button>
        </div>
      </div>
    </section>
  );
}
