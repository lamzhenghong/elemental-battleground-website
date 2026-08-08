export type CombatAction = 'attack' | 'dash' | 'parry' | 'switch' | 'skill' | 'burst' | 'reset';

export interface CombatState {
  activeHeroIndex: number;
  combo: number;
  enemyHp: number;
  energy: number;
  status: string;
  lastAction: CombatAction | 'idle';
  lastDamage: number;
  sequence: number;
}

export const COMBAT_HEROES = ['Aurelia', 'Kaelen', 'Maelis', 'Veyra'] as const;

export const createCombatState = (): CombatState => ({
  activeHeroIndex: 0,
  combo: 0,
  enemyHp: 1000,
  energy: 72,
  status: 'Awaiting input',
  lastAction: 'idle',
  lastDamage: 0,
  sequence: 0
});

const damageEnemy = (state: CombatState, damage: number, action: CombatAction, energyGain: number, status: string) => ({
  ...state,
  enemyHp: Math.max(0, state.enemyHp - damage),
  energy: Math.min(100, state.energy + energyGain),
  combo: state.combo + 1,
  status,
  lastAction: action,
  lastDamage: damage,
  sequence: state.sequence + 1
});

export function applyCombatAction(state: CombatState, action: CombatAction): CombatState {
  switch (action) {
    case 'reset':
      return createCombatState();
    case 'attack':
      return damageEnemy(state, 120, action, 8, 'Strike connects');
    case 'skill':
      return damageEnemy(state, 260, action, 20, 'Element applied');
    case 'burst':
      if (state.energy < 100) {
        return { ...state, status: 'Burst needs a full gauge', lastAction: action, lastDamage: 0, sequence: state.sequence + 1 };
      }
      return { ...damageEnemy(state, 620, action, 0, 'Celestial Burst released'), energy: 0 };
    case 'dash':
      return { ...state, status: 'Perfect dodge window', lastAction: action, lastDamage: 0, sequence: state.sequence + 1 };
    case 'parry':
      return {
        ...state,
        energy: Math.min(100, state.energy + 12),
        status: 'Counter opening created',
        lastAction: action,
        lastDamage: 0,
        sequence: state.sequence + 1
      };
    case 'switch':
      return {
        ...state,
        activeHeroIndex: (state.activeHeroIndex + 1) % COMBAT_HEROES.length,
        status: 'Combat rhythm changed',
        lastAction: action,
        lastDamage: 0,
        sequence: state.sequence + 1
      };
  }
}
