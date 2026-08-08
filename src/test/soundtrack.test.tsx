import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { SoundtrackSection } from '../sections/Soundtrack/SoundtrackSection';

describe('soundtrack player', () => {
  beforeEach(() => {
    vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();
    vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(() => undefined);
    vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => undefined);
  });

  it('uses one reusable audio element across every track', () => {
    render(<SoundtrackSection soundEnabled onSoundEnabledChange={() => undefined} />);

    expect(document.querySelectorAll('audio')).toHaveLength(1);
    fireEvent.click(screen.getByRole('button', { name: 'Play Main Menu Theme' }));
    fireEvent.click(screen.getByRole('button', { name: 'Play Combat Arena Theme' }));

    expect(document.querySelectorAll('audio')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Combat Arena Theme' })).toBeInTheDocument();
  });

  it('can enable global sound from the player', () => {
    const enableSound = vi.fn();
    render(<SoundtrackSection soundEnabled={false} onSoundEnabledChange={enableSound} />);

    fireEvent.click(screen.getByRole('button', { name: 'Enable sound' }));
    expect(enableSound).toHaveBeenCalledWith(true);
  });
});
