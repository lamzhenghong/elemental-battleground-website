import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { OpeningSection } from '../sections/Opening/OpeningSection';
import { SpecialUltimatesSection } from '../sections/SpecialUltimates/SpecialUltimatesSection';

describe('collision-resistant section structure', () => {
  it('keeps the opening scroll cue in normal flow after the CTA row', () => {
    const { container } = render(<OpeningSection />);
    const content = container.querySelector<HTMLElement>('.opening-content');
    const actions = container.querySelector<HTMLElement>('.opening-actions');
    const cue = container.querySelector<HTMLElement>('.scroll-cue');

    expect(content).toContainElement(cue);
    expect(actions?.nextElementSibling).toBe(cue);
  });

  it('groups Special Ultimate labels in a dedicated metadata row', () => {
    const { container } = render(<SpecialUltimatesSection />);
    const metadata = container.querySelector<HTMLElement>('.special-meta');

    expect(metadata).toContainElement(container.querySelector<HTMLElement>('.chapter-index'));
    expect(metadata).toContainElement(container.querySelector<HTMLElement>('.special-eyebrow'));
  });
});
