import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FinalCTASection } from '../sections/FinalCTA/FinalCTASection';
import { GameModesSection } from '../sections/GameModes/GameModesSection';
import { ProgressionSection } from '../sections/Progression/ProgressionSection';
import { useInteractiveExperience } from '../interactive/InteractiveExperienceContext';
import { renderWithExperience } from './renderWithExperience';

function ExperienceResultControls() {
  const experience = useInteractiveExperience();
  return (
    <>
      <button type="button" onClick={() => experience.selectElement('hydro')}>Choose Hydro</button>
      <button type="button" onClick={() => experience.completeCombat({ score: 2910, rank: 'A' })}>Record Rank A</button>
    </>
  );
}

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
    renderWithExperience(<FinalCTASection />);

    expect(screen.getByRole('link', { name: 'Play Elemental Battleground' })).toHaveAttribute(
      'href',
      'https://elemental-battleground.vercel.app/'
    );
    expect(screen.getByRole('link', { name: 'Play Elemental Battleground' })).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );
    expect(screen.getByRole('link', { name: 'Follow Development' })).toHaveAttribute(
      'href',
      'https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND'
    );
    expect(screen.getByText('Trailer coming soon')).toBeInTheDocument();
  });

  it('acknowledges the selected resonance and completed combat rank', () => {
    renderWithExperience(<><ExperienceResultControls /><FinalCTASection /></>);
    fireEvent.click(screen.getByRole('button', { name: 'Choose Hydro' }));
    fireEvent.click(screen.getByRole('button', { name: 'Record Rank A' }));

    expect(screen.getByText('Hydro synchronized · Combat rank A')).toBeInTheDocument();
  });
});
