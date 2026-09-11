import { act, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { OpeningSection } from '../sections/Opening/OpeningSection';
import { SpecialUltimatesSection } from '../sections/SpecialUltimates/SpecialUltimatesSection';
import { renderWithExperience } from './renderWithExperience';

describe('collision-resistant section structure', () => {
  it('keeps the opening scroll cue in normal flow after the CTA row', () => {
    const { container } = renderWithExperience(<OpeningSection />);
    const content = container.querySelector<HTMLElement>('.opening-content');
    const actions = container.querySelector<HTMLElement>('.opening-actions');
    const cue = container.querySelector<HTMLElement>('.scroll-cue');

    expect(content).toContainElement(cue);
    expect(actions?.nextElementSibling).toBe(cue);
  });

  it('makes Play Now primary and states only verified browser capabilities', () => {
    renderWithExperience(<OpeningSection />);

    expect(screen.getByRole('link', { name: /Play now/i })).toHaveClass('button-primary');
    expect(screen.getByRole('link', { name: /Explore the world/i })).toHaveClass('button-secondary');
    expect(screen.getByText('Play in browser')).toBeInTheDocument();
    expect(screen.getByText('Keyboard + touch')).toBeInTheDocument();
  });

  it('pauses the ambient portal video while it is offscreen', () => {
    let notifyVisibility: IntersectionObserverCallback | null = null;
    const observe = vi.fn();
    const disconnect = vi.fn();
    const pause = vi.spyOn(HTMLMediaElement.prototype, 'pause');
    const play = vi.spyOn(HTMLMediaElement.prototype, 'play').mockResolvedValue();

    class VisibilityObserver {
      constructor(callback: IntersectionObserverCallback) {
        notifyVisibility = callback;
      }

      observe = observe;
      disconnect = disconnect;
      unobserve() {}
      takeRecords() { return []; }
      root = null;
      rootMargin = '';
      thresholds = [];
    }

    const originalObserver = window.IntersectionObserver;
    window.IntersectionObserver = VisibilityObserver as unknown as typeof IntersectionObserver;
    const { container, unmount } = renderWithExperience(<OpeningSection />);
    const video = container.querySelector('video');
    expect(video).toBeInTheDocument();
    expect(observe).toHaveBeenCalledWith(video);

    act(() => notifyVisibility?.([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(pause).toHaveBeenCalled();

    act(() => notifyVisibility?.([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver));
    expect(play).toHaveBeenCalled();

    unmount();
    expect(disconnect).toHaveBeenCalled();
    window.IntersectionObserver = originalObserver;
  });

  it('groups Special Ultimate labels in a dedicated metadata row', () => {
    const { container } = render(<SpecialUltimatesSection />);
    const metadata = container.querySelector<HTMLElement>('.special-meta');

    expect(metadata).toContainElement(container.querySelector<HTMLElement>('.chapter-index'));
    expect(metadata).toContainElement(container.querySelector<HTMLElement>('.special-eyebrow'));
  });
});
