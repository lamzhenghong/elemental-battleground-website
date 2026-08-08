import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MediaFallback } from '../components/MediaFallback';

describe('media fallback', () => {
  it('replaces failed media with a readable status', () => {
    render(
      <MediaFallback message="Environment visual unavailable">
        {onError => <img src="/missing.webp" alt="Test environment" onError={onError} />}
      </MediaFallback>
    );

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    fireEvent.error(screen.getByAltText('Test environment'));
    expect(screen.getByRole('status')).toHaveTextContent('Environment visual unavailable');
  });
});
