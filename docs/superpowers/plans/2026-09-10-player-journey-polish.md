# Elemental Battleground Player Journey Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shorten and strengthen the existing official website while adding truthful player-facing news, an authentic-media-ready gameplay showcase, and polished desktop/mobile interactions.

**Architecture:** Preserve the one-page React composition and existing design tokens. Move News into focused typed data, add small section-owned dialog and input behavior, and use one responsive CSS pacing pass rather than restructuring the application.

**Tech Stack:** React 19, TypeScript, Vite 6, Vitest, Testing Library, GSAP, CSS

**Spec:** `docs/superpowers/specs/2026-09-10-player-journey-polish-design.md`

## Global Constraints

- Preserve the current premium dark-fantasy identity and every working interaction.
- Use only repository-owned media and verified game facts.
- Do not modify the game repository or deploy production.
- Add no runtime dependencies.
- Keep audible media opt-in and provide complete reduced-motion behavior.
- Support 320-1920 CSS-pixel widths, tablet portrait/landscape, and ultrawide layouts.

---

### Task 1: Player-Facing Content Contracts

**Files:**
- Create: `src/content/news.ts`
- Create: `src/content/gameplayMedia.ts`
- Modify: `src/content/siteContent.ts`
- Modify: `src/types/content.ts`
- Modify: `src/test/content.test.ts`
- Modify: `src/test/navigation.test.tsx`

**Interfaces:**
- Produces: `NEWS_ITEMS: readonly NewsItem[]`, `NEWS_CATEGORIES`, `GAMEPLAY_CATEGORIES`, and a shortened `NAVIGATION` label.
- Consumes: the three verified Git commit URLs and owned `/media/images/` paths.

- [x] Write tests that require the four news categories, article detail fields, secondary technical links, authentic-media empty state, and `Modes` navigation label.
- [x] Run `npm test -- --run src/test/content.test.ts src/test/navigation.test.tsx` and confirm the new assertions fail.
- [x] Add typed content modules and migrate the existing repository-backed updates without changing dates or implementation facts.
- [x] Run the focused tests and confirm they pass.

### Task 2: Official News Reading Flow

**Files:**
- Modify: `src/sections/News/NewsSection.tsx`
- Modify: `src/test/news.test.tsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `NEWS_ITEMS`, `NEWS_CATEGORIES`.
- Produces: category filters, semantic articles, and an accessible `dialog` with focus restoration and `Technical implementation` link.

- [x] Write a test that opens a dispatch, reads its details, closes with Escape, restores focus, and verifies the technical link.
- [x] Run `npm test -- --run src/test/news.test.tsx` and confirm failure.
- [x] Implement filter empty states and the article dialog with focus trap, body scroll locking, and safe external link attributes.
- [x] Run the focused test and confirm it passes.

### Task 3: Authentic Gameplay And Media Interaction

**Files:**
- Create: `src/sections/Media/GameplayShowcase.tsx`
- Modify: `src/sections/Media/MediaSection.tsx`
- Modify: `src/test/mediaGallery.test.tsx`
- Modify: `docs/ASSET_AUDIT.md`
- Modify: `src/styles/global.css`

**Interfaces:**
- Consumes: `GAMEPLAY_CATEGORIES`, owned chapter artwork, and `MEDIA_ITEMS`.
- Produces: an honest category-ready gameplay stage and swipe-enabled gallery lightbox.

- [x] Write tests for the Coming Soon state, category switching, and left/right swipe navigation.
- [x] Run `npm test -- --run src/test/mediaGallery.test.tsx` and confirm failure.
- [x] Implement the showcase without fake video controls and add pointer/touch swipe handling to the existing lightbox.
- [x] Document exact future asset paths and dimensions, then run the focused test.

### Task 4: Navigation, Hero, Characters, And Combat

**Files:**
- Modify: `src/components/SiteNavigation.tsx`
- Modify: `src/sections/Opening/OpeningSection.tsx`
- Modify: `src/sections/Heroes/HeroesSection.tsx`
- Modify: `src/sections/Combat/CombatSimulator.tsx`
- Modify: `src/test/navigation.test.tsx`
- Modify: `src/test/heroes.test.tsx`
- Modify: `src/test/combatSimulator.test.tsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: active mobile navigation, primary Play CTA, verified capability labels, hero keyboard/swipe selection, and a complete combat shortcut map.
- Consumes: current GSAP scopes, existing section anchors, `SITE_LINKS.play`, and combat simulation state.

- [x] Add failing tests for mobile active state, hero ArrowRight/swipe, Play CTA precedence, and `R` hero switching.
- [x] Run the focused tests and confirm the intended failures.
- [x] Implement the interactions with cleaned-up event handling and nonblank transition states.
- [x] Run focused tests and confirm they pass.

### Task 5: Sound, Metadata, And Safe External Links

**Files:**
- Modify: `src/sections/Soundtrack/SoundtrackSection.tsx`
- Modify: `src/test/soundtrack.test.tsx`
- Modify: `src/test/metadata.test.ts`
- Modify: `index.html`
- Modify: affected external-link components

**Interfaces:**
- Produces: local key `eb-site-soundtrack-volume`, verified `VideoGame` JSON-LD, and `rel="noopener noreferrer"` on new-tab links.
- Consumes: the existing reusable audio element and official website/game/GitHub URLs.

- [x] Add failing tests for volume restoration, JSON-LD, and safe external links.
- [x] Run focused tests and confirm failure.
- [x] Persist volume without starting playback and add only factual structured data.
- [x] Run focused tests and confirm they pass.

### Task 6: Responsive Pacing And Visual QA

**Files:**
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: a 20-30% shorter desktop document, 44 px touch targets, sticky-header anchor offsets, compact mobile chapters, and unchanged visual identity.
- Consumes: existing section class names and design tokens.

- [x] Reduce World frame height, News/Media row size, Progression orbit height, Soundtrack stage height, and large section padding.
- [x] Add targeted breakpoints for 320, 360, 390, 430, 768, 1024, 1366, 1440, 1920, and ultrawide behavior.
- [x] Verify no horizontal overflow, text collision, face/weapon cropping, sticky-header overlap, or undersized interactive controls.
- [x] Measure final 1280x720 document height and retain at least a 20% reduction from 16,462 px.

### Task 7: Full Verification

**Files:**
- Modify only if verification exposes a defect in the files above.

**Interfaces:**
- Produces: tested local website with no production deployment.
- Consumes: all implementation tasks.

- [x] Run `npm run lint`, `npm test -- --run`, `npm run build`, and TypeScript build checks.
- [x] Start the Vite preview and test every requested interactive chapter in a real browser.
- [x] Inspect console errors, broken images, external Play links, reduced motion, desktop/mobile overflow, and modal focus restoration.
- [x] Re-run focused tests after any verification fix and leave the workspace ready for review.
