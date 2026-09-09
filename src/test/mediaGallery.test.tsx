import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { MediaSection } from '../sections/Media/MediaSection';

describe('media archive', () => {
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
});
