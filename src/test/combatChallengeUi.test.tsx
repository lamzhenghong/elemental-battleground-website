import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InteractiveExperienceProvider } from '../interactive/InteractiveExperienceContext';
import { ElementSelector } from '../sections/Opening/ElementSelector';
import { CombatChallenge } from '../sections/Media/CombatChallenge';

describe('playable website combat challenge', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
  });

  it('captures the selected element and completes the guided combat sequence', () => {
    render(
      <InteractiveExperienceProvider>
        <ElementSelector />
        <CombatChallenge />
      </InteractiveExperienceProvider>
    );
    fireEvent.click(screen.getByRole('radio', { name: /electro/i }));
    fireEvent.click(screen.getByRole('button', { name: /start trial/i }));
    expect(screen.getAllByText(/electro resonance/i).length).toBeGreaterThan(0);

    const attack = screen.getByRole('button', { name: /^attack/i });
    fireEvent.click(attack);
    fireEvent.click(attack);
    fireEvent.click(attack);
    act(() => vi.advanceTimersByTime(1000));
    fireEvent.click(screen.getByRole('button', { name: /^dodge/i }));
    act(() => vi.advanceTimersByTime(1000));
    fireEvent.click(screen.getByRole('button', { name: /^parry/i }));
    fireEvent.click(screen.getByRole('button', { name: /elemental skill/i }));
    fireEvent.click(screen.getByRole('button', { name: /ultimate/i }));

    expect(screen.getByRole('heading', { name: /synchronization complete/i })).toBeInTheDocument();
    expect(screen.getByText(/rank s/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /play full game/i })).toHaveAttribute('href', 'https://elemental-battleground.vercel.app/');
  });

  it('prompts for restart when resonance changes during an attempt', () => {
    render(
      <InteractiveExperienceProvider>
        <ElementSelector />
        <CombatChallenge />
      </InteractiveExperienceProvider>
    );
    fireEvent.click(screen.getByRole('button', { name: /start trial/i }));
    fireEvent.click(screen.getByRole('radio', { name: /hydro/i }));
    expect(screen.getByText(/restart the trial to synchronize hydro/i)).toBeInTheDocument();
  });
});
