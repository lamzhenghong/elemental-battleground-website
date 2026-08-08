# Elemental Battleground Official Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build, publish, deploy, and verify a separate cinematic promotional website for Elemental Battleground.

**Architecture:** A single-page React experience composes ten focused sections from typed content modules. GSAP/ScrollTrigger owns section entrance and scroll timelines, while reusable media, canvas, audio, and accessibility utilities provide lightweight progressive enhancement with static fallbacks.

**Tech Stack:** React 19, TypeScript 5, Vite 7, GSAP 3, Vitest, Testing Library, modern CSS, Canvas 2D, Vercel.

## Global Constraints

- Public name: `Elemental Battleground`.
- Browser title: `Elemental Battleground - Official Game Website`.
- Package, repository, project, and folder name: `elemental-battleground-website`.
- The existing game repository is read-only and must remain unchanged.
- Audio is muted until explicit user interaction.
- The live Play link is `https://elemental-battleground.vercel.app/`.
- Missing trailer and social destinations must be visibly unavailable, never dead links.
- No analytics, cookies, advertising, authentication, or environment secrets.
- Every interaction must work with keyboard and touch input.
- Reduced motion must remove scroll scrubbing, parallax, particles, shakes, and long cinematic movement.
- Mobile layouts must avoid horizontal overflow and reduce media/effect cost.

---

### Task 1: Project Foundation, Content Contracts, and Media Set

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `tsconfig.node.json`
- Create: `index.html`
- Create: `.gitignore`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/types/content.ts`
- Create: `src/content/siteContent.ts`
- Create: `src/content/heroes.ts`
- Create: `src/content/reactions.ts`
- Create: `src/content/gameModes.ts`
- Create: `src/content/soundtrack.ts`
- Create: `src/test/content.test.ts`
- Copy and optimize: selected game media into `public/media/`

**Interfaces:**
- Produces: `HeroFeature`, `ReactionFeature`, `ModeFeature`, `SoundtrackFeature`, `SiteLink`, and typed exported content arrays.
- Produces: stable asset URLs under `/media/images`, `/media/video`, `/media/audio`, and `/media/icons`.

- [ ] **Step 1: Write the content integrity test**

```ts
import { describe, expect, it } from 'vitest';
import { HEROES } from '../content/heroes';
import { REACTIONS } from '../content/reactions';
import { GAME_MODES } from '../content/gameModes';
import { SITE_LINKS } from '../content/siteContent';

describe('official site content', () => {
  it('keeps the four featured heroes and real links', () => {
    expect(HEROES.map(hero => hero.id)).toEqual(['aurelia', 'kaelen', 'maelis', 'veyra']);
    expect(REACTIONS.every(reaction => reaction.multiplier > 0)).toBe(true);
    expect(GAME_MODES).toHaveLength(6);
    expect(SITE_LINKS.play.href).toBe('https://elemental-battleground.vercel.app/');
    expect(SITE_LINKS.trailer.available).toBe(false);
  });
});
```

- [ ] **Step 2: Run `npm test -- --run` and confirm it fails before modules exist**
- [ ] **Step 3: Implement the strict content types and exact repository-derived content**
- [ ] **Step 4: Copy only selected assets, generate WebP variants, and preserve the original game files**
- [ ] **Step 5: Run `npm test -- --run`, `npm run lint`, and `npm run build`**
- [ ] **Step 6: Commit `feat: establish promotional site foundation`**

### Task 2: Global Experience Shell, Navigation, Opening, and World

**Files:**
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Create: `src/components/SkipLink.tsx`
- Create: `src/components/SiteNavigation.tsx`
- Create: `src/components/SoundToggle.tsx`
- Create: `src/components/MediaFallback.tsx`
- Create: `src/hooks/useReducedExperience.ts`
- Create: `src/hooks/useGsapContext.ts`
- Create: `src/sections/Opening/OpeningSection.tsx`
- Create: `src/sections/Opening/PortalParticles.tsx`
- Create: `src/sections/World/WorldSection.tsx`
- Create: `src/test/navigation.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: section IDs `overview`, `world`, `combat`, `heroes`, `special-ultimates`, `modes`, `progression`, and `play`.
- Produces: `useReducedExperience(): { reducedMotion: boolean; reducedData: boolean; coarsePointer: boolean }`.

- [ ] **Step 1: Test that navigation labels target valid sections and the mobile menu closes after selection**
- [ ] **Step 2: Implement semantic shell, skip link, adaptive navigation, focus management, and sound toggle**
- [ ] **Step 3: Implement the opening video/poster fallback and particle canvas with cleanup**
- [ ] **Step 4: Implement the campaign-art world journey using concise repository-derived lore**
- [ ] **Step 5: Add reduced-motion and mobile behavior with no pinned sequences on coarse pointers**
- [ ] **Step 6: Run tests, lint, build, and a 360px overflow smoke check**
- [ ] **Step 7: Commit `feat: open the cinematic portal journey`**

### Task 3: Interactive Combat and Elemental Reactions

**Files:**
- Create: `src/sections/Combat/CombatSection.tsx`
- Create: `src/sections/Combat/CombatSimulator.tsx`
- Create: `src/sections/Combat/combatSimulation.ts`
- Create: `src/sections/Reactions/ReactionsSection.tsx`
- Create: `src/sections/Reactions/reactionPresentation.ts`
- Create: `src/test/combatSimulation.test.ts`
- Create: `src/test/reactions.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `createCombatState()`, `applyCombatAction(state, action)`, and `getReactionPresentation(reactionId)`.
- `CombatAction` is `'attack' | 'dash' | 'parry' | 'switch' | 'skill' | 'burst'`.

- [ ] **Step 1: Test deterministic combat action state changes and reaction lookup**

```ts
const attacked = applyCombatAction(createCombatState(), 'attack');
expect(attacked.combo).toBe(1);
expect(getReactionPresentation('vaporize').multiplierLabel).toBe('2.0x');
```

- [ ] **Step 2: Implement the pure combat state reducer**
- [ ] **Step 3: Implement the labeled Canvas/CSS combat visualization with keyboard and touch controls**
- [ ] **Step 4: Implement the reaction energy collision selector using four representative real reactions**
- [ ] **Step 5: Pause canvas updates outside the viewport and remove animation under reduced motion**
- [ ] **Step 6: Run tests, lint, build, and keyboard interaction smoke tests**
- [ ] **Step 7: Commit `feat: demonstrate combat and elemental reactions`**

### Task 4: Featured Heroes and Special Ultimates

**Files:**
- Create: `src/sections/Heroes/HeroesSection.tsx`
- Create: `src/sections/Heroes/HeroChapter.tsx`
- Create: `src/sections/SpecialUltimates/SpecialUltimatesSection.tsx`
- Create: `src/sections/SpecialUltimates/DualEnergySequence.tsx`
- Create: `src/test/heroes.test.tsx`
- Create: `src/test/specialUltimates.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Consumes: `HEROES`, hero image URLs, and Special Ultimate content from `siteContent.ts`.
- Produces: accessible hero tab/scroll presentation and `DualEnergySequence` with restartable local state.

- [ ] **Step 1: Test that all four hero names, roles, elements, skills, and Ultimates render**
- [ ] **Step 2: Test that both Special Ultimate pairs expose both energy meters and real dialogue**
- [ ] **Step 3: Implement face-safe full-bleed hero chapters with element-specific transitions**
- [ ] **Step 4: Implement the two-pair energy and impact sequence without blocking page scroll**
- [ ] **Step 5: Add reduced-motion crossfade and low-cost mobile variants**
- [ ] **Step 6: Run tests, lint, build, and 390x844/1440x900 visual checks**
- [ ] **Step 7: Commit `feat: showcase heroes and Special Ultimates`**

### Task 5: Modes, Progression, Soundtrack, and Final Reveal

**Files:**
- Create: `src/sections/GameModes/GameModesSection.tsx`
- Create: `src/sections/Progression/ProgressionSection.tsx`
- Create: `src/sections/Soundtrack/SoundtrackSection.tsx`
- Create: `src/sections/Soundtrack/useExclusiveAudio.ts`
- Create: `src/sections/FinalCTA/FinalCTASection.tsx`
- Create: `src/components/SiteFooter.tsx`
- Create: `src/test/audio.test.ts`
- Create: `src/test/links.test.tsx`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: `useExclusiveAudio(tracks)` with `play(id)`, `pause()`, `setVolume(value)`, `activeTrackId`, `playing`, and cleanup.
- Consumes: `GAME_MODES`, progression content, `SOUNDTRACK`, and `SITE_LINKS`.

- [ ] **Step 1: Test that selecting a second track pauses the first and unmount cleanup pauses audio**
- [ ] **Step 2: Test that every available external link is safe and unavailable links are disabled**
- [ ] **Step 3: Implement cinematic mode chapters and the interactive progression assembly**
- [ ] **Step 4: Implement one reusable, lazy-loaded audio element with explicit activation and visibility pause**
- [ ] **Step 5: Implement the final portal reveal, Play CTA, development link, Coming soon trailer control, and footer**
- [ ] **Step 6: Run tests, lint, build, media failure checks, and touch checks**
- [ ] **Step 7: Commit `feat: complete the promotional journey`**

### Task 6: Metadata, SEO, PWA Branding, Documentation, and Release Tests

**Files:**
- Create: `public/favicon.ico`
- Create: `public/apple-touch-icon.png`
- Create: `public/og/elemental-battleground.jpg`
- Create: `public/robots.txt`
- Create: `public/sitemap.xml`
- Create: `public/site.webmanifest`
- Create: `src/test/accessibility.test.tsx`
- Create: `src/test/metadata.test.ts`
- Create: `README.md`
- Create: `vercel.json`
- Modify: `index.html`

**Interfaces:**
- Produces: complete production metadata and static indexing files.

- [ ] **Step 1: Test title, description, Open Graph, Twitter card, canonical, manifest, and icon declarations**
- [ ] **Step 2: Test one `h1`, landmark structure, skip link, button names, and image alternatives**
- [ ] **Step 3: Generate the branded social image and icon variants from project-owned artwork**
- [ ] **Step 4: Implement metadata, robots, sitemap, manifest, and minimal Vercel configuration**
- [ ] **Step 5: Write the required README with install, build, preview, asset replacement, accessibility, performance, and deployment details**
- [ ] **Step 6: Run the full unit suite, lint, build, and `git diff --check`**
- [ ] **Step 7: Commit `chore: prepare official website release`**

### Task 7: Production Browser QA and Performance Pass

**Files:**
- Create: `docs/PRODUCTION_QA.md`
- Modify: implementation files only when a reproduced issue requires a fix

**Interfaces:**
- Produces: evidence-backed local release report.

- [ ] **Step 1: Start `npm run preview -- --host 0.0.0.0` from the production build**
- [ ] **Step 2: Test opening, navigation, combat controls, reactions, hero presentation, Special Ultimates, modes, progression, audio, CTA, and direct refresh**
- [ ] **Step 3: Test 360x800, 390x844, 768x1024, 1366x768, 1440x900, and 1920x1080**
- [ ] **Step 4: Test keyboard-only flow and emulated reduced motion**
- [ ] **Step 5: Record console errors, required failed requests, overflow, media behavior, and measured bundle/media sizes**
- [ ] **Step 6: Fix reproduced defects and repeat the affected checks**
- [ ] **Step 7: Commit `test: verify production website experience`**

### Task 8: GitHub Publication, Vercel Deployment, and Production Verification

**Files:**
- Modify: metadata canonical and sitemap URLs only if the final Vercel alias differs
- Modify: `docs/PRODUCTION_QA.md` with production verification

**Interfaces:**
- Produces: public GitHub repository and public Vercel production URL.

- [ ] **Step 1: Confirm `gh auth status`, `vercel whoami`, clean intended scope, and no staged secrets**
- [ ] **Step 2: Create public repository `lamzhenghong/elemental-battleground-website` with the required description**
- [ ] **Step 3: Add the GitHub remote and push `main`**
- [ ] **Step 4: Link or create Vercel project `elemental-battleground-website` and deploy production**
- [ ] **Step 5: Verify HTTPS, title, favicon, opening, media, navigation, controls, direct refresh, mobile/tablet/desktop layouts, metadata, console, and required network requests**
- [ ] **Step 6: If the production alias differs, update canonical/sitemap metadata, rebuild, commit, push, and reverify**
- [ ] **Step 7: Record final URLs, commit SHA, deployment state, and honest test limitations in the final report**

