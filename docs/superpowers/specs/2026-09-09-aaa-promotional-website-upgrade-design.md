# Elemental Battleground Promotional Website Upgrade Design

## Intent

Evolve the existing portal-journey website into a commercially polished official game site while preserving its original artwork, game facts, soundtrack, links, and dark elemental identity.

## Experience Direction

The site becomes an "Aetheria Signal Journey": the portal introduces the world, official dispatches establish a living project, and each following chapter reveals a different layer of the game. A thin orbital-line motif, section-specific elemental accents, editorial typography, and restrained motion create continuity without copying another game's interface.

## Information Architecture

1. Home: cinematic portal hero with a concise value proposition and primary Play action.
2. News: truthful development dispatches sourced from implemented game systems.
3. World: three full-bleed Aetheria chapters with alternating editorial composition.
4. Characters: the four current limited five-star heroes in an interactive dossier.
5. Elements: readable reaction visualization with real pairings and values.
6. Combat: interactive demonstration and concise combat principles.
7. Game Modes: real modes only, with a strong active-mode stage.
8. Progression: the existing connected build systems.
9. Media: owned world, hero, and system imagery in a keyboard-accessible lightbox.
10. Play: final portal call to action, soundtrack, and project credit.

## Design System

- Preserve dark navy and black foundations with gold, cyan, violet, and elemental accents.
- Use full-bleed scenes, rails, dividers, and layered editorial compositions instead of card grids.
- Keep the portal ring and orbital line as the recurring owned visual signature.
- Keep motion transform/opacity based, restrained, and disabled under reduced-motion preferences.
- Use the existing optimized media; no invented trailer, release announcement, platform, or social destination.

## Interaction

- Header changes from transparent to compact solid navigation after scrolling.
- Mobile navigation traps focus, closes on Escape and destination selection, and restores trigger focus.
- News categories filter a small truthful development archive.
- Media gallery supports filter controls, previous/next navigation, Escape close, backdrop close, and focus restoration.
- Loader is brief, branded, session-scoped, and bypassed for reduced-motion or test environments.

## Responsive And Accessibility

- Validate 1920, 1440, 1024, 768, 390, and 360 CSS-pixel widths plus mobile landscape.
- No horizontal overflow, clipped controls, or unreadable overlaid text.
- Preserve skip link, heading hierarchy, semantic landmarks, visible focus, alt text, keyboard operation, and reduced-motion support.

## Performance

- Keep the hero video metadata-preloaded and poster-backed.
- Lazy-load offscreen images and mount large gallery imagery only while its lightbox is open.
- Pause animation loops when hidden/offscreen and clean up every listener.
- Avoid new runtime dependencies and full-screen post-processing.

