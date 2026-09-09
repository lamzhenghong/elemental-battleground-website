import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CinematicLoader } from '../components/CinematicLoader';

describe('cinematic site shell', () => {
  it('reveals the site after the loader completes and remembers the session', () => {
    vi.useFakeTimers();
    window.sessionStorage.clear();
    render(<CinematicLoader duration={250} />);

    expect(screen.getByRole('status', { name: 'Opening the Aether Gate' })).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(450));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(window.sessionStorage.getItem('eb-site-intro-seen')).toBe('true');
    vi.useRealTimers();
  });
});
