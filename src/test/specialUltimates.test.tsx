import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SpecialUltimatesSection } from '../sections/SpecialUltimates/SpecialUltimatesSection';

describe('Special Ultimate showcase', () => {
  it('charges a shared pair and reveals the verified sequence', () => {
    render(<SpecialUltimatesSection />);

    expect(screen.getByRole('heading', { name: 'Eternal Vapor' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Charge Aurelia and Kaelen' }));

    expect(screen.getByText('Together?')).toBeInTheDocument();
    expect(screen.getByText('Always.')).toBeInTheDocument();
    expect(screen.getByText('Massive Vaporize Detonation')).toBeInTheDocument();
  });

  it('switches to the second verified combination', () => {
    render(<SpecialUltimatesSection />);

    fireEvent.click(screen.getByRole('button', { name: 'Show Worldstorm Genesis' }));
    expect(screen.getByRole('heading', { name: 'Worldstorm Genesis' })).toBeInTheDocument();
    expect(screen.getByText('Maelis + Veyra')).toBeInTheDocument();
  });
});
