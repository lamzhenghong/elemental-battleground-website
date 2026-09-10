import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroesSection } from '../sections/Heroes/HeroesSection';

describe('hero showcase', () => {
  it('presents every featured hero and lets visitors open a dossier', () => {
    render(<HeroesSection />);

    for (const name of ['Aurelia Sunflare', 'Kaelen Tidebound', 'Maelis Verdantveil', 'Veyra Stormglass']) {
      expect(screen.getByRole('button', { name: `View ${name}` })).toBeInTheDocument();
    }

    fireEvent.click(screen.getByRole('button', { name: 'View Veyra Stormglass' }));
    expect(screen.getByRole('heading', { name: 'Veyra Stormglass' })).toBeInTheDocument();
    expect(screen.getByText('Stormglass Refract')).toBeInTheDocument();
    expect(screen.getByText('Nocturne Thunderfall')).toBeInTheDocument();
  });

  it('changes dossiers with arrow keys and horizontal swipes', () => {
    render(<HeroesSection />);
    const stage = screen.getByRole('group', { name: 'Active hero dossier' });

    fireEvent.keyDown(stage, { key: 'ArrowRight' });
    expect(screen.getByRole('heading', { name: 'Kaelen Tidebound' })).toBeInTheDocument();

    fireEvent.touchStart(stage, { touches: [{ clientX: 260, clientY: 120 }] });
    fireEvent.touchEnd(stage, { changedTouches: [{ clientX: 110, clientY: 124 }] });
    expect(screen.getByRole('heading', { name: 'Maelis Verdantveil' })).toBeInTheDocument();
  });
});
