import { fireEvent, render, screen } from '@testing-library/react';
import { useState } from 'react';
import { waitFor } from '@testing-library/react';
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
    expect(document.querySelector('audio')).not.toHaveAttribute('src');
    fireEvent.click(screen.getByRole('button', { name: 'Play Main Menu Theme' }));
    expect(document.querySelector('audio')).toHaveAttribute('src', '/media/audio/main-menu-theme.mp3');
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

  it('resumes with one click after global sound is muted', async () => {
    function StatefulPlayer() {
      const [enabled, setEnabled] = useState(true);
      return <SoundtrackSection soundEnabled={enabled} onSoundEnabledChange={setEnabled} />;
    }

    render(<StatefulPlayer />);
    fireEvent.click(screen.getByRole('button', { name: 'Play Main Menu Theme' }));
    fireEvent.click(screen.getByRole('button', { name: 'Mute sound' }));

    await waitFor(() => expect(screen.getByRole('button', { name: 'Play selected track Main Menu Theme' })).toBeInTheDocument());
    fireEvent.click(screen.getByRole('button', { name: 'Play selected track Main Menu Theme' }));

    await waitFor(() => expect(screen.getByRole('button', { name: 'Pause selected track Main Menu Theme' })).toBeInTheDocument());
  });
});
