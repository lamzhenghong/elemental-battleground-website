# Elemental Battleground Player Journey Polish Design

## Intent

Refine the existing official website into a shorter, clearer player journey without replacing its cinematic portal artwork, dark elemental palette, editorial typography, or proven interactive chapters.

## Experience Direction

The website remains an Aetheria signal journey, but each chapter earns its space. Visitors should understand the game, inspect truthful updates and owned media, try representative combat interactions, and reach the live game with less scrolling and fewer developer-facing distractions.

## Pacing

- Target a 20-30% reduction from the measured 16,462 px desktop document height.
- Compress World scene heights, News and Media card rows, Progression orbit spacing, Soundtrack staging, and inter-chapter padding.
- Keep the opening and final portal at full viewport height, while preserving enough breathing room for the major editorial scenes.
- Integrate the gameplay showcase into Media instead of adding another full-height chapter.

## Player-Facing Content

- News becomes an official dispatch archive with Update, Event, Development, and Announcement filters.
- Each real repository-backed update opens in an accessible article dialog with a player-facing summary and factual details.
- GitHub commit links remain available as a secondary "Technical implementation" action.
- The gameplay showcase uses no invented footage. Until authentic captures exist, it presents an honest asset-ready stage with categories for Combat, World, Bosses, and Special Ultimates.

## Navigation And Conversion

- Rename the crowded "Game Modes" navigation item to "Modes" while preserving the `#modes` destination.
- Preserve the sticky desktop navigation, active section marker, sound control, mobile focus trap, Escape close, and scroll locking.
- Expose active state inside the mobile drawer and ensure every touch target is at least 44 px.
- Make "Play Now" the primary hero action and "Explore the World" secondary.
- State only verified availability: browser play and keyboard/touch controls. Do not claim the game is an installable PWA.

## Interaction Upgrades

- Character dossiers support click, previous/next controls, Left/Right arrow keys, and horizontal swipe without blanking copy during transitions.
- The combat demo maps every displayed shortcut to an actual action, uses `R` for hero switching so Tab remains available for accessibility, and provides one concise instruction.
- Media lightbox preserves focus behavior and adds horizontal swipe navigation.
- Soundtrack volume persists locally while audible playback remains strictly opt-in.

## Performance And Accessibility

- Reuse current optimized WebP assets and lazy loading; no new runtime dependency.
- Keep hero video muted and poster-backed, and reduce reveal delay so the title becomes readable immediately.
- Use transform/opacity motion with complete `prefers-reduced-motion` behavior.
- Add sticky-header-safe anchor offsets, visible focus, semantic dialogs, accurate ARIA state, safe external links, and JSON-LD using only verified game facts.

## Authentic Media Contract

Expected future files:

- `/public/media/gameplay/trailer.mp4` or `.webm`, 1920x1080, web-optimized.
- `/public/media/gameplay/trailer-poster.webp`, 1920x1080.
- `/public/media/gameplay/combat-01.webp`, `/world-01.webp`, `/bosses-01.webp`, and `/special-ultimates-01.webp`, 1920x1080.
- Optional mechanic clips should be 6-12 seconds, muted by default, captioned where speech exists, and sized for mobile delivery.

Until those files are supplied, the interface must say "Gameplay showcase coming soon" and must not render fake playback controls.

## Boundaries

- Do not modify the game repository or production deployment settings.
- Do not fabricate footage, platforms, stores, dates, events, player counts, reviews, awards, or social links.
- Do not remove working sections, gameplay facts, sound controls, accessibility behavior, or owned visual identity.

