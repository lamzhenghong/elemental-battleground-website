import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App';
import { renderWithExperience } from './renderWithExperience';

describe('site foundation', () => {
  it('renders the official identity and complete chapter landmarks', () => {
    renderWithExperience(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Elemental Battleground' })).toBeInTheDocument();
    for (const id of ['overview', 'resonance', 'news', 'world', 'characters', 'elements', 'combat', 'special-ultimates', 'modes', 'progression', 'media', 'play']) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });
});
