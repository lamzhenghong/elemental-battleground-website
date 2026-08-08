import { CombatSimulator } from './CombatSimulator';

export function CombatSection() {
  return (
    <section id="combat" className="combat-section" aria-labelledby="combat-title">
      <div className="chapter-heading page-shell">
        <p className="chapter-index">02 / Combat without hesitation</p>
        <h2 id="combat-title">Your defence is already an attack.</h2>
        <p>Move through telegraphs, turn perfect timing into energy, switch the rhythm, and commit when the opening appears.</p>
      </div>
      <div className="page-shell combat-stage">
        <CombatSimulator />
        <div className="combat-principles" aria-label="Combat principles">
          <article><span>01</span><h3>Read the field.</h3><p>Enemy roles, warning markers, weather, and boss phases communicate danger before impact.</p></article>
          <article><span>02</span><h3>Answer at the last moment.</h3><p>A perfect dodge restores Ultimate energy. A precise parry creates a counter window.</p></article>
          <article><span>03</span><h3>Change the equation.</h3><p>Swap between four heroes while cooldowns continue, then combine applied elements into reactions.</p></article>
        </div>
      </div>
    </section>
  );
}
