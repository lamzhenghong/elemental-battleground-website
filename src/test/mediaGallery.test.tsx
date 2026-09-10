import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MediaSection } from '../sections/Media/MediaSection';

describe('media archive', () => {
  it('shows an honest gameplay capture stage with useful categories', async () => {
    const user = userEvent.setup();
    render(<MediaSection />);

    expect(screen.getByRole('heading', { name: 'Gameplay showcase coming soon' })).toBeInTheDocument();
    expect(screen.getByText(/Authentic gameplay capture has not been supplied/)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Bosses' }));
    expect(screen.getByText('Distinct boss silhouettes, mechanics, telegraphs, and counterplay.')).toBeInTheDocument();
  });

  it('opens, advances, and closes its lightbox with the keyboard', async () => {
    const user = userEvent.setup();
    render(<MediaSection />);

    const opener = screen.getByRole('button', { name: 'Open Whispering Ruins media' });
    await user.click(opener);
    expect(screen.getByRole('dialog', { name: 'Whispering Ruins' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close media' })).toHaveFocus();

    await user.tab({ shift: true });
    expect(screen.getByRole('button', { name: 'Next media' })).toHaveFocus();
    await user.tab();
    expect(screen.getByRole('button', { name: 'Close media' })).toHaveFocus();

    await user.click(screen.getByRole('button', { name: 'Next media' }));
    expect(screen.getByRole('dialog', { name: 'Aether Gates' })).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });

  it('advances the lightbox with a horizontal swipe', async () => {
    const user = userEvent.setup();
    render(<MediaSection />);

    await user.click(screen.getByRole('button', { name: 'Open Whispering Ruins media' }));
    const dialog = screen.getByRole('dialog', { name: 'Whispering Ruins' });
    fireEvent.touchStart(dialog, { touches: [{ clientX: 260, clientY: 120 }] });
    fireEvent.touchEnd(dialog, { changedTouches: [{ clientX: 120, clientY: 124 }] });

    expect(screen.getByRole('dialog', { name: 'Aether Gates' })).toBeInTheDocument();
  });
});
