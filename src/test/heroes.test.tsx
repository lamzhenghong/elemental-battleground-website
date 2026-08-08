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
});
