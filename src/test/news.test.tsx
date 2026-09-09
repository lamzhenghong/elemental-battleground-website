import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { NewsSection } from '../sections/News/NewsSection';

describe('news dispatches', () => {
  it('filters real development updates by category', async () => {
    const user = userEvent.setup();
    render(<NewsSection />);

    expect(screen.getByRole('heading', { name: 'Latest from Aetheria' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'View all development' })).toHaveAttribute(
      'href',
      'https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND/commits/main/'
    );

    await user.click(screen.getByRole('button', { name: 'Combat updates' }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByText('Special Ultimates gain follow-up states')).toBeInTheDocument();
  });
});
