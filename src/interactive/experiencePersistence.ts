import { DEFAULT_ELEMENT_ID, isElementId, type ElementId } from './elementDefinitions';

export type CombatRank = 'S' | 'A' | 'B' | 'C';

export const ELEMENT_STORAGE_KEY = 'eb-site-selected-element-v1';
export const BEST_RANK_STORAGE_KEY = 'eb-site-best-combat-rank-v1';

const RANK_STRENGTH: Record<CombatRank, number> = { S: 4, A: 3, B: 2, C: 1 };

export function getBetterRank(current: CombatRank | null, candidate: CombatRank): CombatRank {
  return !current || RANK_STRENGTH[candidate] > RANK_STRENGTH[current] ? candidate : current;
}

function isCombatRank(value: unknown): value is CombatRank {
  return typeof value === 'string' && value in RANK_STRENGTH;
}

function safeStorageRead(storage: Pick<Storage, 'getItem'> | undefined, key: string): string | null {
  try {
    return storage?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function safeStorageWrite(key: string, value: string) {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in strict privacy modes; the session still works.
  }
}

export function readStoredElementId(storage: Pick<Storage, 'getItem'> | undefined): ElementId {
  const value = safeStorageRead(storage, ELEMENT_STORAGE_KEY);
  return isElementId(value) ? value : DEFAULT_ELEMENT_ID;
}

export function readStoredRank(storage: Pick<Storage, 'getItem'> | undefined): CombatRank | null {
  const value = safeStorageRead(storage, BEST_RANK_STORAGE_KEY);
  return isCombatRank(value) ? value : null;
}
