import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { NewsSection } from '../sections/News/NewsSection';

describe('news dispatches', () => {
  it('filters official updates by player-facing category', async () => {
    const user = userEvent.setup();
    render(<NewsSection />);

    expect(screen.getByRole('heading', { name: 'Latest from Aetheria' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Follow development' })).toHaveAttribute(
      'href',
      'https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND/commits/main/'
    );

    await user.click(screen.getByRole('button', { name: 'Announcement updates' }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText('Two Special Ultimates evolve beyond the impact')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Event updates' }));
    expect(screen.queryAllByRole('article')).toHaveLength(0);
    expect(screen.getByText('No event notices are published yet.')).toBeInTheDocument();
  });

  it('opens a readable dispatch and restores focus after Escape', async () => {
    const user = userEvent.setup();
    render(<NewsSection />);

    const opener = screen.getByRole('button', { name: 'Read Five saved team builds are now available' });
    await user.click(opener);

    expect(screen.getByRole('dialog', { name: 'Five saved team builds are now available' })).toBeInTheDocument();
    expect(screen.getByText(/Each preset preserves party members/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Technical implementation' })).toHaveAttribute(
      'rel',
      'noopener noreferrer'
    );

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(opener).toHaveFocus();
  });
});
