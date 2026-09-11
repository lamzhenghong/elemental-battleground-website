import { useCallback, useEffect, useReducer, useRef, type RefObject } from 'react';
import { useInteractiveExperience } from '../../interactive/InteractiveExperienceContext';
import { getElementDefinition } from '../../interactive/elementDefinitions';
import {
  combatChallengeReducer,
  createCombatChallengeState,
  type CombatChallengeEvent,
  type CombatChallengePhase
} from './combatChallengeMachine';
import { useCombatAudio } from './useCombatAudio';

const ACTIVE_PHASES = new Set<CombatChallengePhase>([
  'basic',
  'dodge-telegraph',
  'dodge-window',
  'parry-telegraph',
  'parry-window',
  'skill-ready',
  'finisher-ready'
]);

export function useCombatChallenge(stageRef: RefObject<HTMLElement | null>) {
  const experience = useInteractiveExperience();
  const [state, dispatch] = useReducer(
    combatChallengeReducer,
    experience.selectedElement.id,
    createCombatChallengeState
  );
  const completedSequenceRef = useRef(-1);
  const playCue = useCombatAudio(experience.soundEnabled);
  const trialElement = getElementDefinition(
    state.phase === 'idle' ? experience.selectedElement.id : state.selectedElementId
  );
  const isActive = ACTIVE_PHASES.has(state.phase);
  const needsElementRestart = (isActive || state.phase === 'paused')
    && state.selectedElementId !== experience.selectedElement.id;

  const send = useCallback((event: CombatChallengeEvent) => dispatch(event), []);
  const start = useCallback(() => {
    dispatch({ type: 'START', now: Date.now(), elementId: experience.selectedElement.id });
    experience.beginCombat();
    stageRef.current?.focus();
  }, [experience, stageRef]);
  const restart = useCallback(() => {
    dispatch({ type: 'RESTART', elementId: experience.selectedElement.id });
    experience.resetCombat();
  }, [experience]);
  const resume = useCallback(() => dispatch({ type: 'RESUME' }), []);
  const pause = useCallback(() => dispatch({ type: 'PAUSE' }), []);

  const action = useCallback((event: CombatChallengeEvent) => {
    dispatch(event);
    if (event.type === 'ATTACK') playCue('attack');
    if (event.type === 'DODGE' || event.type === 'PARRY') playCue('perfect');
    if (event.type === 'SKILL') playCue('skill');
    if (event.type === 'ULTIMATE') playCue('ultimate');
  }, [playCue]);

  useEffect(() => {
    let timer = 0;
    const element = getElementDefinition(state.selectedElementId);
    if (state.phase === 'dodge-telegraph') timer = window.setTimeout(() => send({ type: 'ADVANCE' }), 850);
    if (state.phase === 'dodge-window') timer = window.setTimeout(() => {
      playCue('impact');
      send({ type: 'DODGE_TIMEOUT' });
    }, 720 + element.combat.dodgeWindowBonusMs);
    if (state.phase === 'parry-telegraph') timer = window.setTimeout(() => send({ type: 'ADVANCE' }), 850);
    if (state.phase === 'parry-window') timer = window.setTimeout(() => {
      playCue('impact');
      send({ type: 'PARRY_TIMEOUT' });
    }, 720 + element.combat.parryWindowBonusMs);
    if (state.phase === 'finisher-ready' && state.pendingEcho > 0) {
      timer = window.setTimeout(() => send({ type: 'ELEMENT_ECHO' }), 480);
    }
    return () => window.clearTimeout(timer);
  }, [playCue, send, state.pendingEcho, state.phase, state.selectedElementId]);

  useEffect(() => {
    if (state.phase !== 'completed' || !state.rank || completedSequenceRef.current === state.sequence) return;
    completedSequenceRef.current = state.sequence;
    experience.completeCombat({ score: state.score, rank: state.rank });
  }, [experience, state.phase, state.rank, state.score, state.sequence]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) dispatch({ type: 'PAUSE' });
    };
    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
          if (entry && !entry.isIntersecting) dispatch({ type: 'PAUSE' });
        }, { threshold: 0.12 });
    if (stageRef.current) observer?.observe(stageRef.current);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [stageRef]);

  return {
    state,
    trialElement,
    pendingElement: experience.selectedElement,
    isActive,
    needsElementRestart,
    start,
    restart,
    pause,
    resume,
    action
  };
}
