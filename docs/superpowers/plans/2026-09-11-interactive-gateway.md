# Interactive Gateway Implementation Plan

**Goal:** Add a connected portal, resonance selector, and playable website combat trial without replacing the existing site architecture or media gallery.

**Architecture:** A focused React context supplies validated shared state. Data-driven element definitions and a pure combat reducer remain independent from DOM animation. Portal timing and combat scheduling are isolated in hooks with explicit cleanup.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, GSAP, Lucide, CSS and Canvas.

### Task 1: Shared Experience And Element Definitions

**Files:**
- Create: `src/interactive/elementDefinitions.ts`
- Create: `src/interactive/InteractiveExperienceContext.tsx`
- Test: `src/test/interactiveExperience.test.tsx`
- Modify: `src/main.tsx`
- Modify: `src/App.tsx`

- [ ] Write failing tests for all seven definitions, invalid persisted values, selection persistence, rank comparison, and provider commands.
- [ ] Run the focused test and confirm failures are caused by missing modules.
- [ ] Implement typed definitions, guarded storage readers, provider state, and canvas-level CSS variables.
- [ ] Re-run the focused test until green.

### Task 2: Portal Charge And Resonance Selector

**Files:**
- Create: `src/sections/Opening/portalCharge.ts`
- Create: `src/sections/Opening/usePortalCharge.ts`
- Create: `src/sections/Opening/ElementSelector.tsx`
- Modify: `src/sections/Opening/OpeningSection.tsx`
- Modify: `src/sections/Opening/PortalParticles.tsx`
- Test: `src/test/portalExperience.test.tsx`

- [ ] Write failing tests for charge progression, early-release decay, one-shot activation, keyboard hold, selection, reset, and arrow-key movement.
- [ ] Confirm the focused test fails for the missing implementation.
- [ ] Implement the hold controller, semantic portal target, direct CSS-variable parallax, element-aware particles, selector, hash update, and smooth/reduced transition paths.
- [ ] Re-run portal tests until green.

### Task 3: Pure Combat State Machine

**Files:**
- Create: `src/sections/Media/combatChallengeMachine.ts`
- Test: `src/test/combatChallenge.test.ts`

- [ ] Write failing reducer tests for start, attacks, phase advancement, dodge/parry success and miss, elemental skill modifiers, ultimate readiness, completion, failure, scoring, ranking, pause/resume, and reset.
- [ ] Confirm failures identify the missing reducer and calculations.
- [ ] Implement immutable state creation, event reduction, score finalization, and rank comparison.
- [ ] Re-run reducer tests until green.

### Task 4: Combat Trial UI And Integration

**Files:**
- Create: `src/sections/Media/CombatChallenge.tsx`
- Create: `src/sections/Media/useCombatChallenge.ts`
- Modify: `src/sections/Media/GameplayShowcase.tsx`
- Modify: `src/sections/Media/MediaSection.tsx`
- Test: `src/test/combatChallengeUi.test.tsx`

- [ ] Write failing component tests for start, input buttons, selected-element capture, restart warning, result content, visibility pause, and safe cleanup.
- [ ] Confirm the focused test fails before implementation.
- [ ] Build the lazy-loaded trial, timer scheduler, HUD, arena, telegraphs, controls, result view, live status, and real-game link.
- [ ] Re-run UI tests until green.

### Task 5: Final CTA, Styling, And Regression Coverage

**Files:**
- Modify: `src/sections/FinalCTA/FinalCTASection.tsx`
- Modify: `src/styles/global.css`
- Modify: `src/styles/tokens.css`
- Modify: `src/test/closingChapters.test.tsx`
- Modify: `src/test/layoutStructure.test.tsx`

- [ ] Write failing assertions for personalized resonance/rank copy and integrated section order.
- [ ] Confirm the assertions fail for the intended missing behavior.
- [ ] Add restrained selected-element accents, portal stages, selector, combat layouts, responsive breakpoints, landscape rules, reduced-motion paths, and CTA personalization.
- [ ] Re-run focused and full suites.

### Task 6: Release Verification And Publication

- [ ] Run `npm test -- --run --reporter=dot`.
- [ ] Run `npm run lint`.
- [ ] Run `npm run build`.
- [ ] Run `git diff --check`.
- [ ] Verify local desktop, responsive matrix, 200 percent zoom, reduced motion, keyboard portal, touch portal, every element, completed and missed combat paths, restart, visibility/intersection pause, existing interactions, console, network, assets, and Play link.
- [ ] Review edited React components against hook, accessibility, cleanup, bundle, and re-render guidance.
- [ ] Commit the verified website changes, push `main`, wait for Vercel, and verify the exact production bundle and live responsive behavior.
