import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CombatSimulator } from '../sections/Combat/CombatSimulator';

describe('combat simulator keyboard access', () => {
  it('does not trap Tab on the simulator container', () => {
    render(<CombatSimulator />);

    const simulator = screen.getByLabelText('Interactive combat system visualization');
    expect(fireEvent.keyDown(simulator, { key: 'Tab' })).toBe(true);
    expect(screen.getByText('Aurelia')).toBeInTheDocument();
  });

  it('lets Space activate a focused action button', async () => {
    const user = userEvent.setup();
    render(<CombatSimulator />);

    const strike = screen.getByRole('button', { name: /Strike/ });
    strike.focus();
    await user.keyboard(' ');

    expect(screen.getByLabelText('Enemy health 880 of 1000')).toBeInTheDocument();
    expect(screen.getByText('Strike connects')).toBeInTheDocument();
  });
});
