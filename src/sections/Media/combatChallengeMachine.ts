import type { CombatRank } from '../../interactive/experiencePersistence';
import { getElementDefinition, type ElementId } from '../../interactive/elementDefinitions';

export type CombatChallengePhase =
  | 'idle'
  | 'basic'
  | 'dodge-telegraph'
  | 'dodge-window'
  | 'parry-telegraph'
  | 'parry-window'
  | 'skill-ready'
  | 'finisher-ready'
  | 'completed'
  | 'failed'
  | 'paused';

export interface CombatChallengeState {
  phase: CombatChallengePhase;
  resumePhase: CombatChallengePhase | null;
  selectedElementId: ElementId;
  playerHealth: number;
  enemyHealth: number;
  combo: number;
  bestCombo: number;
  energy: number;
  score: number;
  perfectDodges: number;
  perfectParries: number;
  damageTaken: number;
  startedAt: number | null;
  elapsedMs: number;
  rank: CombatRank | null;
  status: string;
  lastDamage: number;
  sequence: number;
  pendingEcho: number;
  lastAction: 'idle' | 'start' | 'attack' | 'dodge' | 'parry' | 'skill' | 'ultimate' | 'impact';
}

export type CombatChallengeEvent =
  | { type: 'START'; now: number; elementId?: ElementId }
  | { type: 'ATTACK' }
  | { type: 'ADVANCE' }
  | { type: 'DODGE' }
  | { type: 'DODGE_TIMEOUT' }
  | { type: 'PARRY' }
  | { type: 'PARRY_TIMEOUT' }
  | { type: 'SKILL' }
  | { type: 'ELEMENT_ECHO' }
  | { type: 'ULTIMATE'; now: number }
  | { type: 'PAUSE' }
  | { type: 'RESUME' }
  | { type: 'RESTART'; elementId?: ElementId };

export const createCombatChallengeState = (selectedElementId: ElementId): CombatChallengeState => ({
  phase: 'idle',
  resumePhase: null,
  selectedElementId,
  playerHealth: 100,
  enemyHealth: 1000,
  combo: 0,
  bestCombo: 0,
  energy: 20,
  score: 0,
  perfectDodges: 0,
  perfectParries: 0,
  damageTaken: 0,
  startedAt: null,
  elapsedMs: 0,
  rank: null,
  status: 'Trial standing by',
  lastDamage: 0,
  sequence: 0,
  pendingEcho: 0,
  lastAction: 'idle'
});

export function getCombatRank(score: number): CombatRank {
  if (score >= 3500) return 'S';
  if (score >= 2800) return 'A';
  if (score >= 2000) return 'B';
  return 'C';
}

function applyPlayerDamage(state: CombatChallengeState, amount: number, nextPhase: CombatChallengePhase, status: string) {
  const element = getElementDefinition(state.selectedElementId);
  const damage = Math.max(1, Math.round(amount * element.combat.incomingDamageMultiplier));
  const playerHealth = Math.max(0, state.playerHealth - damage);
  return {
    ...state,
    phase: playerHealth === 0 ? 'failed' as const : nextPhase,
    playerHealth,
    combo: 0,
    damageTaken: state.damageTaken + damage,
    score: Math.max(0, state.score - 150),
    status: playerHealth === 0 ? 'Synchronization broken' : status,
    lastDamage: 0,
    sequence: state.sequence + 1,
    lastAction: 'impact' as const
  };
}

function ignoreAction(state: CombatChallengeState, status: string): CombatChallengeState {
  return { ...state, status, lastDamage: 0, sequence: state.sequence + 1 };
}

export function combatChallengeReducer(state: CombatChallengeState, event: CombatChallengeEvent): CombatChallengeState {
  switch (event.type) {
    case 'START':
      if (state.phase !== 'idle') return state;
      return {
        ...createCombatChallengeState(event.elementId ?? state.selectedElementId),
        phase: 'basic',
        startedAt: event.now,
        status: 'Land three attacks to establish synchronization',
        sequence: state.sequence + 1,
        lastAction: 'start'
      };
    case 'ATTACK': {
      if (state.phase !== 'basic') return ignoreAction(state, 'Read the enemy telegraph');
      const element = getElementDefinition(state.selectedElementId);
      const combo = state.combo + 1;
      const damage = 85;
      const phase = combo >= 3 ? 'dodge-telegraph' : 'basic';
      return {
        ...state,
        phase,
        enemyHealth: Math.max(0, state.enemyHealth - damage),
        combo,
        bestCombo: Math.max(state.bestCombo, combo),
        energy: Math.min(100, state.energy + element.combat.attackEnergyGain),
        score: state.score + 100 + (combo - 1) * 10,
        status: phase === 'dodge-telegraph' ? 'Evade the incoming sweep' : `Resonance chain ${combo} / 3`,
        lastDamage: damage,
        sequence: state.sequence + 1,
        lastAction: 'attack'
      };
    }
    case 'ADVANCE':
      if (state.phase === 'dodge-telegraph') {
        return { ...state, phase: 'dodge-window', status: 'Dodge now: avoid the marked sweep', lastDamage: 0, sequence: state.sequence + 1 };
      }
      if (state.phase === 'parry-telegraph') {
        return { ...state, phase: 'parry-window', status: 'Parry now: meet the focused strike', lastDamage: 0, sequence: state.sequence + 1 };
      }
      return state;
    case 'DODGE':
      if (state.phase !== 'dodge-window') return ignoreAction(state, 'Dodge saved for the marked sweep');
      return {
        ...state,
        phase: 'parry-telegraph',
        perfectDodges: state.perfectDodges + 1,
        energy: Math.min(100, state.energy + 20),
        score: state.score + 500,
        status: 'Perfect dodge: counter signal incoming',
        lastDamage: 0,
        sequence: state.sequence + 1,
        lastAction: 'dodge'
      };
    case 'DODGE_TIMEOUT':
      if (state.phase !== 'dodge-window') return state;
      return applyPlayerDamage(state, 22, 'parry-telegraph', 'Sweep connected: prepare to parry');
    case 'PARRY':
      if (state.phase !== 'parry-window') return ignoreAction(state, 'Parry when the focused indicator converges');
      return {
        ...state,
        phase: 'skill-ready',
        perfectParries: state.perfectParries + 1,
        energy: Math.min(100, state.energy + 20),
        score: state.score + 750,
        status: 'Perfect parry: enemy staggered',
        lastDamage: 0,
        sequence: state.sequence + 1,
        lastAction: 'parry'
      };
    case 'PARRY_TIMEOUT':
      if (state.phase !== 'parry-window') return state;
      return applyPlayerDamage(state, 28, 'skill-ready', 'Counter missed: elemental skill still available');
    case 'SKILL': {
      if (state.phase !== 'skill-ready') return ignoreAction(state, 'Elemental skill needs a stagger opening');
      const element = getElementDefinition(state.selectedElementId);
      const damage = element.combat.skillDamage;
      return {
        ...state,
        phase: 'finisher-ready',
        playerHealth: Math.min(100, state.playerHealth + element.combat.skillHealing),
        enemyHealth: Math.max(1, state.enemyHealth - damage),
        energy: Math.min(100, state.energy + element.combat.skillEnergy),
        score: state.score + 400,
        combo: state.combo + 1,
        bestCombo: Math.max(state.bestCombo, state.combo + 1),
        status: `${element.combat.status}: ultimate synchronized`,
        lastDamage: damage,
        sequence: state.sequence + 1,
        pendingEcho: element.combat.echoDamage,
        lastAction: 'skill'
      };
    }
    case 'ELEMENT_ECHO':
      if (state.pendingEcho <= 0 || state.phase !== 'finisher-ready') return state;
      return {
        ...state,
        enemyHealth: Math.max(1, state.enemyHealth - state.pendingEcho),
        status: 'Rootmark echo detonated',
        lastDamage: state.pendingEcho,
        sequence: state.sequence + 1,
        pendingEcho: 0,
        lastAction: 'impact'
      };
    case 'ULTIMATE': {
      if (state.phase !== 'finisher-ready' || state.energy < 100) return ignoreAction(state, 'Ultimate gauge is not synchronized');
      const elapsedMs = Math.max(0, state.startedAt === null ? 0 : event.now - state.startedAt);
      const timeBonus = Math.max(0, 600 - Math.floor(elapsedMs / 1000) * 20);
      const noDamageBonus = state.damageTaken === 0 ? 400 : 0;
      const score = state.score + 1000 + timeBonus + noDamageBonus;
      return {
        ...state,
        phase: 'completed',
        enemyHealth: 0,
        energy: 0,
        score,
        elapsedMs,
        rank: getCombatRank(score),
        status: 'Synchronization complete',
        lastDamage: 520,
        sequence: state.sequence + 1,
        pendingEcho: 0,
        lastAction: 'ultimate'
      };
    }
    case 'PAUSE':
      if (state.phase === 'idle' || state.phase === 'completed' || state.phase === 'failed' || state.phase === 'paused') return state;
      return { ...state, phase: 'paused', resumePhase: state.phase, status: 'Trial paused', sequence: state.sequence + 1 };
    case 'RESUME':
      if (state.phase !== 'paused' || !state.resumePhase) return state;
      return { ...state, phase: state.resumePhase, resumePhase: null, status: 'Synchronization resumed', sequence: state.sequence + 1 };
    case 'RESTART':
      return createCombatChallengeState(event.elementId ?? state.selectedElementId);
  }
}
