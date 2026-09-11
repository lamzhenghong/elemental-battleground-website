import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import {
  InteractiveExperienceProvider,
  useInteractiveExperience
} from '../interactive/InteractiveExperienceContext';
import {
  BEST_RANK_STORAGE_KEY,
  ELEMENT_STORAGE_KEY,
  getBetterRank,
  readStoredElementId
} from '../interactive/experiencePersistence';
import { ELEMENT_DEFINITIONS, ELEMENT_IDS } from '../interactive/elementDefinitions';

function ExperienceProbe() {
  const experience = useInteractiveExperience();
  return (
    <div>
      <span data-testid="element">{experience.selectedElement.id}</span>
      <span data-testid="rank">{experience.bestCombatRank ?? 'none'}</span>
      <span data-testid="sound">{experience.soundEnabled ? 'on' : 'off'}</span>
      <button type="button" onClick={() => experience.selectElement('electro')}>Electro</button>
      <button type="button" onClick={() => experience.completeCombat({ score: 2800, rank: 'A' })}>Complete A</button>
      <button type="button" onClick={experience.toggleSound}>Sound</button>
    </div>
  );
}

describe('interactive experience state', () => {
  beforeEach(() => localStorage.clear());

  it('defines every element supported by the game', () => {
    expect(ELEMENT_IDS).toEqual(['pyro', 'hydro', 'cryo', 'electro', 'anemo', 'geo', 'dendro']);
    expect(ELEMENT_DEFINITIONS).toHaveLength(7);
    for (const element of ELEMENT_DEFINITIONS) {
      expect(element.primary).toMatch(/^#/);
      expect(element.combat.attackStyle).toBeTruthy();
      expect(element.combat.status).toBeTruthy();
    }
  });

  it('falls back safely when a stored element is invalid', () => {
    localStorage.setItem(ELEMENT_STORAGE_KEY, 'void');
    expect(readStoredElementId(localStorage)).toBe('pyro');
  });

  it('restores and persists a valid selected element', () => {
    localStorage.setItem(ELEMENT_STORAGE_KEY, 'hydro');
    render(<InteractiveExperienceProvider><ExperienceProbe /></InteractiveExperienceProvider>);
    expect(screen.getByTestId('element')).toHaveTextContent('hydro');

    fireEvent.click(screen.getByRole('button', { name: 'Electro' }));
    expect(screen.getByTestId('element')).toHaveTextContent('electro');
    expect(localStorage.getItem(ELEMENT_STORAGE_KEY)).toBe('electro');
  });

  it('keeps the strongest combat rank and leaves sound opt-in', () => {
    expect(getBetterRank('A', 'B')).toBe('A');
    expect(getBetterRank('B', 'S')).toBe('S');

    render(<InteractiveExperienceProvider><ExperienceProbe /></InteractiveExperienceProvider>);
    expect(screen.getByTestId('sound')).toHaveTextContent('off');
    fireEvent.click(screen.getByRole('button', { name: 'Complete A' }));
    expect(screen.getByTestId('rank')).toHaveTextContent('A');
    expect(localStorage.getItem(BEST_RANK_STORAGE_KEY)).toBe('A');

    act(() => fireEvent.click(screen.getByRole('button', { name: 'Sound' })));
    expect(screen.getByTestId('sound')).toHaveTextContent('on');
  });
});
