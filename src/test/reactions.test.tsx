import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { ReactionsSection } from '../sections/Reactions/ReactionsSection';
import { getReactionPresentation } from '../sections/Reactions/reactionPresentation';

describe('elemental reaction presentation', () => {
  it('maps a verified reaction to its display values', () => {
    expect(getReactionPresentation('vaporize')).toMatchObject({
      name: 'Vaporize',
      multiplierLabel: '2.0x',
      pairing: 'Hydro + Pyro'
    });
  });

  it('lets visitors inspect another reaction', async () => {
    const user = userEvent.setup();
    render(<ReactionsSection />);

    await user.click(screen.getByRole('button', { name: 'Show Overloaded reaction' }));
    expect(screen.getByText('1.65x')).toBeInTheDocument();
    expect(screen.getByText('Kinetic Shockwave')).toBeInTheDocument();
    expect(screen.getAllByText('Pyro + Electro')).toHaveLength(2);
  });
});
