import { describe, expect, it } from 'vitest';
import { applyCombatAction, createCombatState } from '../sections/Combat/combatSimulation';

describe('combat system visualization', () => {
  it('turns a strike into damage, combo, and energy', () => {
    const state = applyCombatAction(createCombatState(), 'attack');
    expect(state.enemyHp).toBe(880);
    expect(state.combo).toBe(1);
    expect(state.energy).toBe(80);
    expect(state.status).toBe('Strike connects');
  });

  it('cycles heroes without changing accumulated combat state', () => {
    const attacked = applyCombatAction(createCombatState(), 'attack');
    const switched = applyCombatAction(attacked, 'switch');
    expect(switched.activeHeroIndex).toBe(1);
    expect(switched.enemyHp).toBe(attacked.enemyHp);
    expect(switched.combo).toBe(attacked.combo);
  });

  it('requires a full gauge before Burst and spends it when ready', () => {
    const blocked = applyCombatAction(createCombatState(), 'burst');
    expect(blocked.status).toBe('Burst needs a full gauge');

    const ready = { ...createCombatState(), energy: 100 };
    const burst = applyCombatAction(ready, 'burst');
    expect(burst.enemyHp).toBe(380);
    expect(burst.energy).toBe(0);
    expect(burst.combo).toBe(1);
  });

  it('restores the visualization to its initial state', () => {
    const damaged = applyCombatAction(createCombatState(), 'skill');
    expect(applyCombatAction(damaged, 'reset')).toEqual(createCombatState());
  });
});
