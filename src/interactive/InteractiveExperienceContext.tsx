import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { useReducedExperience } from '../hooks/useReducedExperience';
import {
  DEFAULT_ELEMENT_ID,
  getElementDefinition,
  isElementId,
  type ElementDefinition,
  type ElementId
} from './elementDefinitions';
import {
  BEST_RANK_STORAGE_KEY,
  ELEMENT_STORAGE_KEY,
  getBetterRank,
  readStoredElementId,
  readStoredRank,
  safeStorageWrite,
  type CombatRank
} from './experiencePersistence';

export interface CombatResultSummary {
  score: number;
  rank: CombatRank;
}

interface InteractiveExperienceValue {
  selectedElement: ElementDefinition;
  selectElement: (element: ElementId) => void;
  resetElement: () => void;
  portalCharge: number;
  setPortalCharge: (charge: number) => void;
  portalActivated: boolean;
  setPortalActivated: (activated: boolean) => void;
  combatStarted: boolean;
  combatCompleted: boolean;
  combatScore: number;
  combatRank: CombatRank | null;
  bestCombatRank: CombatRank | null;
  beginCombat: () => void;
  resetCombat: () => void;
  completeCombat: (result: CombatResultSummary) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  toggleSound: () => void;
  reducedMotion: boolean;
  reducedData: boolean;
  coarsePointer: boolean;
}

const InteractiveExperienceContext = createContext<InteractiveExperienceValue | null>(null);

export function InteractiveExperienceProvider({ children }: { children: ReactNode }) {
  const preference = useReducedExperience();
  const [selectedElementId, setSelectedElementId] = useState<ElementId>(() =>
    readStoredElementId(typeof window === 'undefined' ? undefined : window.localStorage)
  );
  const [portalCharge, setPortalChargeState] = useState(0);
  const [portalActivated, setPortalActivated] = useState(false);
  const [combatResult, setCombatResult] = useState<CombatResultSummary | null>(null);
  const [combatStarted, setCombatStarted] = useState(false);
  const [bestCombatRank, setBestCombatRank] = useState<CombatRank | null>(() =>
    readStoredRank(typeof window === 'undefined' ? undefined : window.localStorage)
  );
  const [soundEnabled, setSoundEnabled] = useState(false);

  const selectElement = useCallback((element: ElementId) => {
    if (!isElementId(element)) return;
    setSelectedElementId(element);
    safeStorageWrite(ELEMENT_STORAGE_KEY, element);
  }, []);

  const resetElement = useCallback(() => selectElement(DEFAULT_ELEMENT_ID), [selectElement]);
  const setPortalCharge = useCallback((charge: number) => {
    setPortalChargeState(Math.max(0, Math.min(100, Number.isFinite(charge) ? charge : 0)));
  }, []);
  const beginCombat = useCallback(() => {
    setCombatStarted(true);
    setCombatResult(null);
  }, []);
  const resetCombat = useCallback(() => {
    setCombatStarted(false);
    setCombatResult(null);
  }, []);
  const completeCombat = useCallback((result: CombatResultSummary) => {
    setCombatStarted(false);
    setCombatResult(result);
    setBestCombatRank(current => {
      const next = getBetterRank(current, result.rank);
      safeStorageWrite(BEST_RANK_STORAGE_KEY, next);
      return next;
    });
  }, []);
  const toggleSound = useCallback(() => setSoundEnabled(enabled => !enabled), []);

  const value = useMemo<InteractiveExperienceValue>(() => ({
    selectedElement: getElementDefinition(selectedElementId),
    selectElement,
    resetElement,
    portalCharge,
    setPortalCharge,
    portalActivated,
    setPortalActivated,
    combatStarted,
    combatCompleted: Boolean(combatResult),
    combatScore: combatResult?.score ?? 0,
    combatRank: combatResult?.rank ?? null,
    bestCombatRank,
    beginCombat,
    resetCombat,
    completeCombat,
    soundEnabled,
    setSoundEnabled,
    toggleSound,
    ...preference
  }), [
    beginCombat,
    bestCombatRank,
    combatResult,
    combatStarted,
    completeCombat,
    portalActivated,
    portalCharge,
    preference,
    resetCombat,
    resetElement,
    selectElement,
    setPortalCharge,
    soundEnabled,
    selectedElementId,
    toggleSound
  ]);

  return <InteractiveExperienceContext.Provider value={value}>{children}</InteractiveExperienceContext.Provider>;
}

export function useInteractiveExperience() {
  const value = useContext(InteractiveExperienceContext);
  if (!value) throw new Error('useInteractiveExperience must be used inside InteractiveExperienceProvider');
  return value;
}
