import { render, type RenderOptions } from '@testing-library/react';
import type { ReactElement, ReactNode } from 'react';
import { InteractiveExperienceProvider } from '../interactive/InteractiveExperienceContext';

function ExperienceWrapper({ children }: { children: ReactNode }) {
  return <InteractiveExperienceProvider>{children}</InteractiveExperienceProvider>;
}

export function renderWithExperience(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: ExperienceWrapper, ...options });
}
