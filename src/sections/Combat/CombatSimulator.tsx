import { Crosshair, Gauge, RefreshCw, RotateCcw, Shield, Sparkles, Swords, Wind } from 'lucide-react';
import { useReducer } from 'react';
import { applyCombatAction, COMBAT_HEROES, createCombatState, type CombatAction } from './combatSimulation';

const actions: readonly { id: CombatAction; label: string; keyLabel: string; icon: typeof Swords }[] = [
  { id: 'attack', label: 'Strike', keyLabel: 'J', icon: Swords },
  { id: 'dash', label: 'Perfect dodge', keyLabel: 'Space', icon: Wind },
  { id: 'parry', label: 'Parry', keyLabel: 'C', icon: Shield },
  { id: 'switch', label: 'Switch hero', keyLabel: 'Tab', icon: RefreshCw },
  { id: 'skill', label: 'Elemental skill', keyLabel: 'E', icon: Sparkles },
  { id: 'burst', label: 'Celestial Burst', keyLabel: 'Q', icon: Gauge }
];

const keyActions: Record<string, CombatAction> = {
  j: 'attack',
  ' ': 'dash',
  c: 'parry',
  e: 'skill',
  q: 'burst'
};

export function CombatSimulator() {
  const [state, dispatch] = useReducer(applyCombatAction, undefined, createCombatState);
  const activeHero = COMBAT_HEROES[state.activeHeroIndex];

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const action = keyActions[event.key] ?? keyActions[event.key.toLowerCase()];
    if (!action) return;
    event.preventDefault();
    dispatch(action);
  };

  return (
    <div className="combat-simulator" tabIndex={0} onKeyDown={onKeyDown} aria-label="Interactive combat system visualization">
      <div className="simulator-topline">
        <span><i aria-hidden="true" /> Interactive system visualization</span>
        <button type="button" onClick={() => dispatch('reset')}><RotateCcw aria-hidden="true" /> Reset</button>
      </div>

      <div className="simulator-field" data-action={state.lastAction}>
        <div className="simulator-grid" aria-hidden="true" />
        <div className="simulator-reticle" aria-hidden="true"><Crosshair /></div>
        <div className="simulator-hero" data-hero={activeHero.toLowerCase()} aria-hidden="true">
          <span />
          <i />
        </div>
        <div className="simulator-enemy" aria-label={`Enemy health ${state.enemyHp} of 1000`}>
          <div className="enemy-ring" aria-hidden="true" />
          <div className="enemy-core" aria-hidden="true" />
          <div className="enemy-health"><span style={{ width: `${state.enemyHp / 10}%` }} /></div>
        </div>
        {state.lastDamage > 0 ? (
          <strong className="simulator-damage" key={state.sequence} aria-label={`${state.lastDamage} damage`}>
            {state.lastDamage}
          </strong>
        ) : null}
        <div className="simulator-combo" aria-label={`${state.combo} hit combo`}>
          <b>{String(state.combo).padStart(2, '0')}</b>
          <span>Hit chain</span>
        </div>
      </div>

      <div className="simulator-readout">
        <div>
          <span>Active hero</span>
          <b>{activeHero}</b>
        </div>
        <div className="energy-readout">
          <span>Ultimate energy</span>
          <b>{state.energy}%</b>
          <i><em style={{ width: `${state.energy}%` }} /></i>
        </div>
        <p aria-live="polite">{state.status}</p>
      </div>

      <div className="simulator-actions" aria-label="Combat actions">
        {actions.map(action => {
          const Icon = action.icon;
          return (
            <button key={action.id} type="button" onClick={() => dispatch(action.id)}>
              <Icon aria-hidden="true" />
              <span>{action.label}</span>
              <kbd>{action.keyLabel}</kbd>
            </button>
          );
        })}
      </div>
    </div>
  );
}
