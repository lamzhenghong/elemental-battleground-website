import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { App } from '../App';

describe('site foundation', () => {
  it('renders the official identity and complete chapter landmarks', () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1, name: 'Elemental Battleground' })).toBeInTheDocument();
    for (const id of ['overview', 'world', 'combat', 'heroes', 'special-ultimates', 'modes', 'progression', 'play']) {
      expect(document.getElementById(id)).toBeInTheDocument();
    }
  });
});
