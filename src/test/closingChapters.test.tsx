import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FinalCTASection } from '../sections/FinalCTA/FinalCTASection';
import { GameModesSection } from '../sections/GameModes/GameModesSection';
import { ProgressionSection } from '../sections/Progression/ProgressionSection';

describe('closing chapters', () => {
  it('lets visitors inspect all six real game modes', () => {
    render(<GameModesSection />);

    for (const mode of ['Story Campaign', 'Combat Arena', 'Artifact Grind', 'Rogue Ruins', 'Character Stories', 'Boss Battles']) {
      expect(screen.getByRole('button', { name: `Explore ${mode}` })).toBeInTheDocument();
    }

    fireEvent.click(screen.getByRole('button', { name: 'Explore Rogue Ruins' }));
    expect(screen.getByRole('heading', { name: 'Rogue Ruins' })).toBeInTheDocument();
    expect(screen.getByText('No two descents agree')).toBeInTheDocument();
  });

  it('reveals progression details without showing a stats table', () => {
    render(<ProgressionSection />);

    fireEvent.click(screen.getByRole('button', { name: 'Summon new allies' }));
    expect(screen.getByText(/limited and standard banners/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Shape artifact sets' }));
    expect(screen.getByText(/main stats, substats/i)).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('links only to real destinations', () => {
    render(<FinalCTASection />);

    expect(screen.getByRole('link', { name: 'Play Elemental Battleground' })).toHaveAttribute(
      'href',
      'https://elemental-battleground.vercel.app/'
    );
    expect(screen.getByRole('link', { name: 'Follow Development' })).toHaveAttribute(
      'href',
      'https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND'
    );
    expect(screen.getByText('Trailer coming soon')).toBeInTheDocument();
  });
});
