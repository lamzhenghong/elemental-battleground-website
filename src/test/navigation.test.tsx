import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { SiteNavigation } from '../components/SiteNavigation';
import { NAVIGATION } from '../content/siteContent';

describe('site navigation', () => {
  it('uses the final official-site destinations in order', () => {
    expect(NAVIGATION.map(item => item.label)).toEqual([
      'Home',
      'News',
      'World',
      'Characters',
      'Elements',
      'Game Modes',
      'Media',
      'Play'
    ]);
  });

  it('maps every navigation item to a valid page section', () => {
    render(<SiteNavigation soundEnabled={false} onSoundToggle={vi.fn()} />);
    for (const item of NAVIGATION) {
      expect(screen.getByRole('link', { name: item.label })).toHaveAttribute('href', item.href);
    }
  });

  it('closes the mobile menu after selecting a destination', async () => {
    const user = userEvent.setup();
    render(<SiteNavigation soundEnabled={false} onSoundToggle={vi.fn()} />);

    const menuButton = screen.getByRole('button', { name: 'Open navigation' });
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    await user.click(screen.getByRole('link', { name: 'Characters' }));
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes the mobile menu on Escape and restores trigger focus', async () => {
    const user = userEvent.setup();
    render(<SiteNavigation soundEnabled={false} onSoundToggle={vi.fn()} />);

    const menuButton = screen.getByRole('button', { name: 'Open navigation' });
    await user.click(menuButton);
    await user.keyboard('{Escape}');

    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveFocus();
  });

  it('exposes a real sound preference control', async () => {
    const user = userEvent.setup();
    const onSoundToggle = vi.fn();
    render(<SiteNavigation soundEnabled={false} onSoundToggle={onSoundToggle} />);

    await user.click(screen.getByRole('button', { name: 'Enable website sound' }));
    expect(onSoundToggle).toHaveBeenCalledOnce();
  });
});
