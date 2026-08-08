import { AudioLines, RotateCcw, Zap } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { HEROES } from '../../content/heroes';
import { SPECIAL_ULTIMATES } from '../../content/siteContent';

export function SpecialUltimatesSection() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activation, setActivation] = useState(0);
  const special = SPECIAL_ULTIMATES[selectedIndex];
  const heroes = special.heroIds.map(id => HEROES.find(hero => hero.id === id)!);
  const isActivated = activation > 0;
  const sectionStyle = {
    '--resonance-a': special.colors[0],
    '--resonance-b': special.colors[1]
  } as CSSProperties;

  const changeSpecial = (index: number) => {
    setSelectedIndex(index);
    setActivation(0);
  };

  return (
    <section id="special-ultimates" className="special-section" aria-labelledby="special-title" style={sectionStyle}>
      <div className="special-grid" aria-hidden="true" />
      <div className="page-shell special-shell">
        <header>
          <p className="chapter-index">05 / Resonance beyond one hero</p>
          <p className="special-eyebrow"><AudioLines aria-hidden="true" /> Signature battle system</p>
          <h2 id="special-title">When two full gauges answer as one.</h2>
        </header>

        <div className={`resonance-stage ${isActivated ? 'is-activated' : ''}`} key={`${special.id}-${activation}`}>
          <div className="resonance-portrait resonance-portrait-a">
            <img src={heroes[0].image} alt={`${heroes[0].name} artwork`} loading="lazy" />
            <div>
              <strong>{heroes[0].name}</strong>
              <span>{heroes[0].element}</span>
            </div>
          </div>
          <div className="resonance-core" aria-live="polite">
            <span className="resonance-rule">Both gauges full</span>
            <h3>{special.name}</h3>
            <p>{special.statement}</p>
            <div className="resonance-dialogue" aria-label="Special Ultimate dialogue">
              <span>{special.dialogue[0]}</span>
              <span>{special.dialogue[1]}</span>
            </div>
            <strong className="resonance-impact">{special.impact}</strong>
          </div>
          <div className="resonance-portrait resonance-portrait-b">
            <img src={heroes[1].image} alt={`${heroes[1].name} artwork`} loading="lazy" />
            <div>
              <strong>{heroes[1].name}</strong>
              <span>{heroes[1].element}</span>
            </div>
          </div>
          <div className="resonance-gauges" aria-label={`${special.heroes[0]} and ${special.heroes[1]} energy gauges`}>
            {heroes.map(hero => (
              <div key={hero.id}>
                <span>{hero.shortName}</span>
                <div><i /></div>
                <b>{isActivated ? '0%' : '100%'}</b>
              </div>
            ))}
          </div>
        </div>

        <div className="special-controls">
          <div className="special-tabs" aria-label="Choose a Special Ultimate">
            {SPECIAL_ULTIMATES.map((candidate, index) => (
              <button
                type="button"
                key={candidate.id}
                aria-pressed={index === selectedIndex}
                aria-label={`Show ${candidate.name}`}
                onClick={() => changeSpecial(index)}
              >
                <span>{candidate.heroes.join(' + ')}</span>
                <strong>{candidate.name}</strong>
              </button>
            ))}
          </div>
          <button
            type="button"
            className="charge-resonance"
            aria-label={`Charge ${special.heroes[0]} and ${special.heroes[1]}`}
            onClick={() => setActivation(value => value + 1)}
          >
            {isActivated ? <RotateCcw aria-hidden="true" /> : <Zap aria-hidden="true" />}
            {isActivated ? 'Replay resonance' : 'Activate resonance'}
          </button>
        </div>
      </div>
    </section>
  );
}
