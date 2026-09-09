# AAA Promotional Website Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the existing official website into a cinematic, responsive, accessible promotional experience with truthful News and Media chapters.

**Architecture:** Preserve the current one-page React composition and add focused section components backed by typed static content. Shared navigation, loading, reveal, and lightbox behavior remain independent from game-content data so visual upgrades do not alter factual gameplay content.

**Tech Stack:** React 19, TypeScript, Vite, Vitest, Testing Library, GSAP, CSS

**Spec:** `docs/superpowers/specs/2026-09-09-aaa-promotional-website-upgrade-design.md`

## Global Constraints

- Preserve existing game facts, media, soundtrack, links, and original identity.
- Do not invent news, dates, trailer availability, social links, platforms, or release claims.
- Avoid new dependencies, generic SaaS cards, heavy glassmorphism, gradients as primary imagery, and excessive motion.
- Support keyboard, reduced motion, desktop widths from 768 to 1920, mobile widths 360 and 390, and mobile landscape.
- Keep media lazy-loaded and animations cleanup-safe.

---

### Task 1: Content And Navigation Contract

**Files:**
- Modify: `src/content/siteContent.ts`
- Modify: `src/types/content.ts`
- Modify: `src/test/content.test.ts`
- Modify: `src/test/foundation.test.tsx`
- Modify: `src/test/navigation.test.tsx`

**Interfaces:**
- Produces: `NEWS_ITEMS`, `MEDIA_ITEMS`, and the final `NAVIGATION` anchor list.
- Consumes: existing owned media paths and verified game feature names.

- [ ] **Step 1: Write failing tests** asserting the final chapter IDs, navigation labels, truthful update categories, and owned media paths.
- [ ] **Step 2: Run `npm test -- --run src/test/content.test.ts src/test/foundation.test.tsx src/test/navigation.test.tsx`** and verify the new expectations fail.
- [ ] **Step 3: Add typed `NewsItem` and `MediaItem` models plus content arrays** using only implemented systems and repository-owned assets.
- [ ] **Step 4: Run the focused tests** and verify they pass.

### Task 2: Cinematic Site Shell

**Files:**
- Create: `src/components/CinematicLoader.tsx`
- Modify: `src/components/SiteNavigation.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`
- Create: `src/test/cinematicShell.test.tsx`

**Interfaces:**
- Produces: `CinematicLoader`, scroll-aware `SiteNavigation`, keyboard-safe mobile menu.
- Consumes: `NAVIGATION`, `useReducedExperience`, `SoundToggle`.

- [ ] **Step 1: Write failing component tests** for loader bypass, scrolled-header state, Escape close, focus trap, and focus restoration.
- [ ] **Step 2: Run `npm test -- --run src/test/cinematicShell.test.tsx`** and verify failure.
- [ ] **Step 3: Implement the session-scoped loader and navigation behaviors** with cleaned-up listeners and accessible attributes.
- [ ] **Step 4: Add restrained shell motion and responsive styles** with reduced-motion fallbacks.
- [ ] **Step 5: Run the focused tests** and verify they pass.

### Task 3: News Dispatch Chapter

**Files:**
- Create: `src/sections/News/NewsSection.tsx`
- Create: `src/test/news.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: `NewsSection` with category filtering and a visible featured dispatch.
- Consumes: `NEWS_ITEMS`.

- [ ] **Step 1: Write failing tests** for the heading, category filter, and visible dispatch changes.
- [ ] **Step 2: Run `npm test -- --run src/test/news.test.tsx`** and verify failure.
- [ ] **Step 3: Implement the section** using semantic buttons, articles, and live-region-safe content updates.
- [ ] **Step 4: Add full-width editorial styling** without nested cards.
- [ ] **Step 5: Run the focused test** and verify it passes.

### Task 4: Media Archive And Lightbox

**Files:**
- Create: `src/sections/Media/MediaSection.tsx`
- Create: `src/test/mediaGallery.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: `MediaSection` with category filtering and an accessible modal lightbox.
- Consumes: `MEDIA_ITEMS` and `MediaFallback`.

- [ ] **Step 1: Write failing tests** for open, next, previous, Escape close, and focus restoration.
- [ ] **Step 2: Run `npm test -- --run src/test/mediaGallery.test.tsx`** and verify failure.
- [ ] **Step 3: Implement the gallery and lightbox** with dialog semantics, keyboard handling, body-scroll restoration, and lazy images.
- [ ] **Step 4: Add responsive editorial filmstrip styling** and mobile touch-sized controls.
- [ ] **Step 5: Run the focused test** and verify it passes.

### Task 5: Chapter Rhythm And Visual System

**Files:**
- Modify: `src/sections/Opening/OpeningSection.tsx`
- Modify: `src/sections/World/WorldSection.tsx`
- Modify: `src/sections/Heroes/HeroesSection.tsx`
- Modify: `src/sections/Reactions/ReactionsSection.tsx`
- Modify: `src/sections/Combat/CombatSection.tsx`
- Modify: `src/sections/GameModes/GameModesSection.tsx`
- Modify: `src/sections/Progression/ProgressionSection.tsx`
- Modify: `src/sections/Soundtrack/SoundtrackSection.tsx`
- Modify: `src/sections/FinalCTA/FinalCTASection.tsx`
- Modify: `src/styles/tokens.css`
- Modify: `src/styles/global.css`

**Interfaces:**
- Produces: final chapter order, section numbering, recurring Aetheria signal ornament, tightened typography and pacing.
- Consumes: all existing section interactions and factual content unchanged.

- [ ] **Step 1: Reorder chapters in `App`** to match the approved information architecture.
- [ ] **Step 2: Update section IDs, numbering, and headings** without changing gameplay claims.
- [ ] **Step 3: Add signal-line ornaments, scroll-aware header treatment, hero title lockup, and alternating scene rhythm.**
- [ ] **Step 4: Add breakpoint styles** for 1920, 1440, 1024, 768, 390, 360, and short landscape screens.
- [ ] **Step 5: Run `npm test -- --run` and `npm run build`.**

### Task 6: Browser Verification And Release

**Files:**
- Modify: `README.md`
- Modify: `docs/ASSET_AUDIT.md`

**Interfaces:**
- Produces: verified local release and deployment evidence.
- Consumes: successful production build.

- [ ] **Step 1: Run `npm run lint`, `npm test -- --run`, and `npm run build`.**
- [ ] **Step 2: Inspect every chapter at 1440x900 and 390x844** including console logs, overflow, interactions, and screenshots.
- [ ] **Step 3: Validate 1920, 1024, 768, 360, and mobile landscape bounds** with browser viewport metrics.
- [ ] **Step 4: Update documentation** with implemented sections, asset limits, and local run commands.
- [ ] **Step 5: Commit, push, deploy through the linked Vercel project, and verify the public URL.**
