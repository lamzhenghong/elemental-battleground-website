import { describe, expect, it } from 'vitest';
import {
  combatChallengeReducer,
  createCombatChallengeState,
  getCombatRank
} from '../sections/Media/combatChallengeMachine';

const attackThreeTimes = () => {
  let state = combatChallengeReducer(createCombatChallengeState('pyro'), { type: 'START', now: 0 });
  state = combatChallengeReducer(state, { type: 'ATTACK' });
  state = combatChallengeReducer(state, { type: 'ATTACK' });
  return combatChallengeReducer(state, { type: 'ATTACK' });
};

describe('combat synchronization trial reducer', () => {
  it('starts and builds attack combo, score, energy, and telegraph phase', () => {
    const state = attackThreeTimes();
    expect(state.phase).toBe('dodge-telegraph');
    expect(state.enemyHealth).toBe(745);
    expect(state.combo).toBe(3);
    expect(state.bestCombo).toBe(3);
    expect(state.energy).toBe(65);
    expect(state.score).toBe(330);
  });

  it('distinguishes perfect dodge and missed dodge outcomes', () => {
    const telegraph = attackThreeTimes();
    const windowState = combatChallengeReducer(telegraph, { type: 'ADVANCE' });
    const perfect = combatChallengeReducer(windowState, { type: 'DODGE' });
    expect(perfect.phase).toBe('parry-telegraph');
    expect(perfect.perfectDodges).toBe(1);
    expect(perfect.score).toBe(830);

    const missed = combatChallengeReducer(windowState, { type: 'DODGE_TIMEOUT' });
    expect(missed.phase).toBe('parry-telegraph');
    expect(missed.playerHealth).toBe(78);
    expect(missed.damageTaken).toBe(22);
    expect(missed.score).toBe(180);
  });

  it('distinguishes perfect parry and missed parry outcomes', () => {
    const dodgeWindow = combatChallengeReducer(attackThreeTimes(), { type: 'ADVANCE' });
    const afterDodge = combatChallengeReducer(dodgeWindow, { type: 'DODGE' });
    const parryWindow = combatChallengeReducer(afterDodge, { type: 'ADVANCE' });
    const perfect = combatChallengeReducer(parryWindow, { type: 'PARRY' });
    expect(perfect.phase).toBe('skill-ready');
    expect(perfect.perfectParries).toBe(1);
    expect(perfect.score).toBe(1580);

    const missed = combatChallengeReducer(parryWindow, { type: 'PARRY_TIMEOUT' });
    expect(missed.phase).toBe('skill-ready');
    expect(missed.playerHealth).toBe(72);
    expect(missed.damageTaken).toBe(28);
  });

  it('applies element identity without changing the core phase contract', () => {
    const hydro = combatChallengeReducer(
      { ...createCombatChallengeState('hydro'), phase: 'skill-ready', playerHealth: 60, energy: 70 },
      { type: 'SKILL' }
    );
    expect(hydro.phase).toBe('finisher-ready');
    expect(hydro.playerHealth).toBeGreaterThan(60);
    expect(hydro.status).toMatch(/Tidebound/i);

    const geo = combatChallengeReducer(
      { ...createCombatChallengeState('geo'), phase: 'dodge-window' },
      { type: 'DODGE_TIMEOUT' }
    );
    expect(geo.playerHealth).toBeGreaterThan(78);

    let electro = combatChallengeReducer(createCombatChallengeState('electro'), { type: 'START', now: 0 });
    electro = combatChallengeReducer(electro, { type: 'ATTACK' });
    electro = combatChallengeReducer(electro, { type: 'ATTACK' });
    electro = combatChallengeReducer(electro, { type: 'ATTACK' });
    expect(electro.energy).toBe(80);
  });

  it('finishes with timing, no-damage, and time bonuses and calculates ranks', () => {
    let state = attackThreeTimes();
    state = combatChallengeReducer(state, { type: 'ADVANCE' });
    state = combatChallengeReducer(state, { type: 'DODGE' });
    state = combatChallengeReducer(state, { type: 'ADVANCE' });
    state = combatChallengeReducer(state, { type: 'PARRY' });
    state = combatChallengeReducer(state, { type: 'SKILL' });
    state = combatChallengeReducer(state, { type: 'ULTIMATE', now: 12_000 });

    expect(state.phase).toBe('completed');
    expect(state.enemyHealth).toBe(0);
    expect(state.rank).toBe('S');
    expect(state.score).toBeGreaterThanOrEqual(3500);
    expect(getCombatRank(3499)).toBe('A');
    expect(getCombatRank(2799)).toBe('B');
    expect(getCombatRank(1999)).toBe('C');
  });

  it('pauses, resumes the exact phase, and fully restarts', () => {
    const active = attackThreeTimes();
    const paused = combatChallengeReducer(active, { type: 'PAUSE' });
    expect(paused.phase).toBe('paused');
    expect(paused.resumePhase).toBe('dodge-telegraph');
    expect(combatChallengeReducer(paused, { type: 'RESUME' }).phase).toBe('dodge-telegraph');
    expect(combatChallengeReducer(paused, { type: 'RESTART' })).toEqual(createCombatChallengeState('pyro'));
  });
});
