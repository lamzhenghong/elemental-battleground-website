import { act, fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { InteractiveExperienceProvider, useInteractiveExperience } from '../interactive/InteractiveExperienceContext';
import { ElementSelector } from '../sections/Opening/ElementSelector';
import { OpeningSection } from '../sections/Opening/OpeningSection';
import { PORTAL_HOLD_MS, getPortalChargeStage } from '../sections/Opening/portalCharge';

function PortalProbe() {
  const experience = useInteractiveExperience();
  return <output data-testid="portal-state">{experience.portalActivated ? 'activated' : 'idle'}:{Math.round(experience.portalCharge)}</output>;
}

describe('interactive portal and resonance selection', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.useFakeTimers();
    Object.defineProperty(Element.prototype, 'scrollIntoView', {
      configurable: true,
      value: vi.fn()
    });
  });

  it('maps charge percentages to restrained visual stages', () => {
    expect(getPortalChargeStage(0)).toBe('idle');
    expect(getPortalChargeStage(20)).toBe('stage-one');
    expect(getPortalChargeStage(50)).toBe('stage-two');
    expect(getPortalChargeStage(80)).toBe('stage-three');
    expect(getPortalChargeStage(100)).toBe('activated');
  });

  it('cancels an early pointer hold and returns charge to zero', () => {
    render(
      <InteractiveExperienceProvider>
        <OpeningSection />
        <PortalProbe />
      </InteractiveExperienceProvider>
    );
    const portal = screen.getByRole('button', { name: /synchronize portal/i });
    fireEvent.pointerDown(portal, { pointerId: 1 });
    act(() => vi.advanceTimersByTime(420));
    fireEvent.pointerUp(portal, { pointerId: 1 });
    act(() => vi.advanceTimersByTime(900));
    expect(screen.getByTestId('portal-state')).toHaveTextContent('idle:0');
  });

  it('keeps the visible portal prompt in the hero content flow', () => {
    render(
      <InteractiveExperienceProvider>
        <OpeningSection />
      </InteractiveExperienceProvider>
    );

    const prompt = screen.getByText('Hold portal to synchronize');
    expect(prompt).toHaveClass('opening-portal-hint');
    expect(prompt.closest('.portal-activator')).toBeNull();
    expect(screen.getByRole('button', { name: /synchronize portal/i })).toHaveAccessibleDescription(/hold/i);
  });

  it('activates once after a complete keyboard hold', () => {
    render(
      <InteractiveExperienceProvider>
        <div id="resonance" />
        <OpeningSection />
        <PortalProbe />
      </InteractiveExperienceProvider>
    );
    const portal = screen.getByRole('button', { name: /synchronize portal/i });
    fireEvent.keyDown(portal, { key: 'Enter' });
    fireEvent.keyDown(portal, { key: 'Enter', repeat: true });
    act(() => vi.advanceTimersByTime(PORTAL_HOLD_MS + 80));
    fireEvent.keyUp(portal, { key: 'Enter' });
    expect(screen.getByTestId('portal-state')).toHaveTextContent('activated:100');
    act(() => vi.advanceTimersByTime(1200));
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('selects resonance with click and arrow-key navigation', () => {
    render(<InteractiveExperienceProvider><ElementSelector /></InteractiveExperienceProvider>);
    const hydro = screen.getByRole('radio', { name: /hydro/i });
    fireEvent.click(hydro);
    expect(hydro).toHaveAttribute('aria-checked', 'true');

    fireEvent.keyDown(hydro, { key: 'ArrowRight' });
    expect(screen.getByRole('radio', { name: /cryo/i })).toHaveAttribute('aria-checked', 'true');
    fireEvent.click(screen.getByRole('button', { name: /reset resonance/i }));
    expect(screen.getByRole('radio', { name: /pyro/i })).toHaveAttribute('aria-checked', 'true');
  });

  it('keeps portal activation functional while rendering the reduced-motion media path', () => {
    const originalMatchMedia = window.matchMedia;
    Object.defineProperty(window, 'matchMedia', {
      configurable: true,
      value: (query: string) => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        addListener: vi.fn(),
        removeListener: vi.fn(),
        dispatchEvent: vi.fn()
      })
    });

    try {
      render(
        <InteractiveExperienceProvider>
          <div id="resonance" />
          <OpeningSection />
          <PortalProbe />
        </InteractiveExperienceProvider>
      );
      expect(document.querySelector('.opening-section')).toHaveAttribute('data-motion', 'reduced');

      const portal = screen.getByRole('button', { name: /synchronize portal/i });
      fireEvent.keyDown(portal, { key: ' ' });
      act(() => vi.advanceTimersByTime(PORTAL_HOLD_MS + 80));
      fireEvent.keyUp(portal, { key: ' ' });
      expect(screen.getByTestId('portal-state')).toHaveTextContent('activated:100');
    } finally {
      Object.defineProperty(window, 'matchMedia', { configurable: true, value: originalMatchMedia });
    }
  });
});
