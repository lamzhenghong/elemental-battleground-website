import {
  ArrowUpRight,
  Crosshair,
  Gauge,
  Pause,
  Play,
  RotateCcw,
  Shield,
  Sparkles,
  Swords,
  Wind
} from 'lucide-react';
import { useRef, type CSSProperties, type KeyboardEvent } from 'react';
import { SITE_LINKS } from '../../content/siteContent';
import type { CombatChallengePhase } from './combatChallengeMachine';
import { useCombatChallenge } from './useCombatChallenge';

type KeyboardAction = 'ATTACK' | 'DODGE' | 'PARRY' | 'SKILL' | 'ULTIMATE' | 'RESTART';

const KEY_ACTIONS: Record<string, KeyboardAction> = {
  j: 'ATTACK',
  ' ': 'DODGE',
  c: 'PARRY',
  e: 'SKILL',
  q: 'ULTIMATE',
  r: 'RESTART'
};

const ACTIONS = [
  { event: 'ATTACK', label: 'Attack', keyLabel: 'J', icon: Swords },
  { event: 'DODGE', label: 'Dodge', keyLabel: 'Space', icon: Wind },
  { event: 'PARRY', label: 'Parry', keyLabel: 'C', icon: Shield },
  { event: 'SKILL', label: 'Elemental skill', keyLabel: 'E', icon: Sparkles },
  { event: 'ULTIMATE', label: 'Ultimate', keyLabel: 'Q', icon: Gauge }
] as const;

const ACTIVE_PHASES = new Set<CombatChallengePhase>([
  'basic', 'dodge-telegraph', 'dodge-window', 'parry-telegraph', 'parry-window', 'skill-ready', 'finisher-ready'
]);

function actionEnabled(phase: CombatChallengePhase, event: typeof ACTIONS[number]['event']) {
  if (event === 'ATTACK') return phase === 'basic';
  if (event === 'DODGE') return phase === 'dodge-window';
  if (event === 'PARRY') return phase === 'parry-window';
  if (event === 'SKILL') return phase === 'skill-ready';
  return phase === 'finisher-ready';
}

export function CombatChallenge() {
  const stageRef = useRef<HTMLElement>(null);
  const challenge = useCombatChallenge(stageRef);
  const { state, trialElement } = challenge;
  const running = ACTIVE_PHASES.has(state.phase);
  const style = {
    '--trial-primary': trialElement.primary,
    '--trial-secondary': trialElement.secondary,
    '--trial-glow': trialElement.glow
  } as CSSProperties;

  const handleKeyboard = (event: KeyboardEvent<HTMLElement>) => {
    if (event.target !== event.currentTarget) return;
    const action = KEY_ACTIONS[event.key] ?? KEY_ACTIONS[event.key.toLowerCase()];
    if (!action) return;
    event.preventDefault();
    if (action === 'RESTART') {
      if (state.phase === 'completed' || state.phase === 'failed') challenge.restart();
      return;
    }
    if (action === 'ULTIMATE') challenge.action({ type: 'ULTIMATE', now: Date.now() });
    else challenge.action({ type: action });
  };

  return (
    <section
      ref={stageRef}
      className="combat-challenge"
      data-phase={state.phase}
      data-action={state.lastAction}
      data-element={trialElement.id}
      style={style}
      tabIndex={0}
      onKeyDown={handleKeyboard}
      aria-labelledby="combat-trial-title"
    >
      <header className="trial-heading">
        <div>
          <p className="gameplay-showcase-kicker"><Crosshair aria-hidden="true" /> Interactive website trial</p>
          <h3 id="combat-trial-title">Combat Synchronization Trial</h3>
          <p>Inspired by the real game mechanics. This is a lightweight interactive website challenge, not gameplay footage.</p>
        </div>
        <div className="trial-resonance-badge">
          <small>Active affinity</small>
          <strong>{trialElement.name} resonance</strong>
          <span>{trialElement.combat.attackStyle}</span>
        </div>
      </header>

      {challenge.needsElementRestart ? (
        <div className="trial-resync-notice" role="status">
          Restart the trial to synchronize {challenge.pendingElement.name}.
          <button type="button" onClick={challenge.restart}><RotateCcw aria-hidden="true" /> Restart</button>
        </div>
      ) : null}

      <div className="trial-frame">
        <div className="trial-hud">
          <div className="trial-health-block">
            <span>Synchronizer</span>
            <div><i style={{ width: `${state.playerHealth}%` }} /></div>
            <b>{state.playerHealth}</b>
          </div>
          <div className="trial-score-block"><span>Score</span><b>{String(state.score).padStart(4, '0')}</b></div>
          <div className="trial-health-block trial-enemy-health">
            <span>Aether Sentinel</span>
            <div><i style={{ width: `${state.enemyHealth / 10}%` }} /></div>
            <b>{state.enemyHealth}</b>
          </div>
        </div>

        <div className="trial-arena" aria-label="Combat trial arena">
          <div className="trial-grid" aria-hidden="true" />
          <div className="trial-player" aria-label={`${trialElement.name} synchronizer`}>
            <i aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
          <div className="trial-enemy" aria-label={`Aether Sentinel health ${state.enemyHealth} of 1000`}>
            <i aria-hidden="true" />
            <span aria-hidden="true" />
          </div>

          {(state.phase === 'dodge-telegraph' || state.phase === 'dodge-window') ? (
            <div className="trial-telegraph trial-dodge-telegraph" role="status">
              <Wind aria-hidden="true" /> <b>{state.phase === 'dodge-window' ? 'DODGE NOW' : 'SWEEP INCOMING'}</b>
            </div>
          ) : null}
          {(state.phase === 'parry-telegraph' || state.phase === 'parry-window') ? (
            <div className="trial-telegraph trial-parry-telegraph" role="status">
              <Shield aria-hidden="true" /> <b>{state.phase === 'parry-window' ? 'PARRY NOW' : 'FOCUSED STRIKE'}</b>
            </div>
          ) : null}
          {state.lastDamage > 0 ? <strong className="trial-damage" key={state.sequence}>{state.lastDamage}</strong> : null}
          <div className="trial-impact" key={`impact-${state.sequence}`} aria-hidden="true" />

          {state.phase === 'idle' ? (
            <div className="trial-overlay trial-intro">
              <span>20–40 second combat protocol</span>
              <strong>Strike. Read. Counter. Finish.</strong>
              <p>Build a three-hit chain, answer the marked dodge and parry windows, then release your skill and Ultimate.</p>
              <button type="button" className="button button-primary" onClick={challenge.start}>
                <Play aria-hidden="true" /> Start trial
              </button>
            </div>
          ) : null}

          {state.phase === 'paused' ? (
            <div className="trial-overlay trial-paused">
              <Pause aria-hidden="true" />
              <strong>Trial paused</strong>
              <p>Timing is frozen. Resume when you are ready.</p>
              <button type="button" onClick={challenge.resume}><Play aria-hidden="true" /> Resume trial</button>
            </div>
          ) : null}

          {state.phase === 'completed' && state.rank ? (
            <div className="trial-overlay trial-result">
              <span>Resonance confirmed</span>
              <h4>Synchronization complete</h4>
              <div className="trial-rank">Rank {state.rank}</div>
              <div className="trial-result-stats">
                <span><small>Score</small><b>{state.score}</b></span>
                <span><small>Best combo</small><b>{state.bestCombo}</b></span>
                <span><small>Perfect dodge</small><b>{state.perfectDodges}</b></span>
                <span><small>Perfect parry</small><b>{state.perfectParries}</b></span>
                <span><small>Damage taken</small><b>{state.damageTaken}</b></span>
                <span><small>Resonance</small><b>{trialElement.name}</b></span>
              </div>
              <div className="trial-result-actions">
                <button type="button" onClick={challenge.restart}><RotateCcw aria-hidden="true" /> Retry</button>
                <a href={SITE_LINKS.play.href} target="_blank" rel="noopener noreferrer">
                  Play full game <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </div>
          ) : null}

          {state.phase === 'failed' ? (
            <div className="trial-overlay trial-result">
              <span>Signal interrupted</span>
              <h4>Synchronization failed</h4>
              <button type="button" onClick={challenge.restart}><RotateCcw aria-hidden="true" /> Retry trial</button>
            </div>
          ) : null}
        </div>

        <div className="trial-command-bar">
          <div className="trial-status" aria-live="polite">
            <small>Combat signal</small>
            <strong>{state.status}</strong>
          </div>
          <div className="trial-energy">
            <span>Ultimate energy <b>{state.energy}%</b></span>
            <div><i style={{ width: `${state.energy}%` }} /></div>
          </div>
          {running ? <button type="button" className="trial-pause-button" onClick={challenge.pause} aria-label="Pause combat trial"><Pause aria-hidden="true" /></button> : null}
        </div>

        <div className="trial-controls" aria-label="Combat trial controls">
          {ACTIONS.map(control => {
            const Icon = control.icon;
            const enabled = actionEnabled(state.phase, control.event);
            return (
              <button
                key={control.event}
                type="button"
                disabled={!enabled}
                aria-keyshortcuts={control.keyLabel}
                aria-label={`${control.label} (${control.keyLabel})`}
                onClick={() => {
                  if (control.event === 'ULTIMATE') challenge.action({ type: 'ULTIMATE', now: Date.now() });
                  else challenge.action({ type: control.event });
                }}
              >
                <Icon aria-hidden="true" />
                <span>{control.label}</span>
                <kbd>{control.keyLabel}</kbd>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CombatChallenge;
