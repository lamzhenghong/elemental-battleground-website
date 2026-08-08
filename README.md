# Elemental Battleground Official Website

Official cinematic promotional website for **Elemental Battleground**, a browser-based fantasy action RPG. The site presents the game's world, combat, elemental reactions, featured heroes, Special Ultimates, modes, progression, soundtrack, and public play link as one responsive scroll journey.

## Technology

- React 19 and TypeScript
- Vite
- GSAP and ScrollTrigger
- Modern responsive CSS
- Vitest and Testing Library
- Sharp media preparation
- Vercel deployment

## Local Development

```bash
npm install
npm run prepare:media
npm run dev
```

The media preparation command reads owned game assets from the sibling `ELEMENTAL BATTLEGROUND/assets` folder by default. Set `GAME_ASSET_ROOT` to a different absolute asset folder when required.

## Verification

```bash
npm test -- --run
npm run lint
npm run build
npm run preview
```

The production output is written to `dist`.

## Project Structure

```text
public/                 Optimized public media, icons, manifest, and SEO files
scripts/prepare-media.mjs  Safe copy/optimization pipeline for owned game assets
src/components/         Shared navigation, footer, skip link, and fallbacks
src/content/            Typed game facts and public links
src/hooks/              Motion and device capability hooks
src/sections/           Independent cinematic page chapters
src/styles/             Design tokens and responsive global presentation
src/test/               Content, behavior, navigation, audio, and metadata tests
```

## Media and Asset Replacement

Editable website facts live in `src/content`. Source image/audio mappings live in `scripts/prepare-media.mjs`; original game assets are never moved or deleted. Images are converted to responsive WebP variants, the opening MP4 remains the only critical motion asset, and soundtrack files use metadata-only preload until a visitor explicitly starts playback.

The current public media is copied from the creator-owned game repository. A final legal review is still recommended before wider commercial promotion. No analytics, advertising trackers, cookies, or secret environment variables are used.

## Accessibility and Performance

- Semantic chapters and heading order
- Keyboard-operable navigation and interactions
- Skip link and visible focus states
- Muted-by-default optional audio with one reusable player
- Reduced-motion presentation and lower particle counts on coarse/reduced-data devices
- Lazy non-critical images, deferred audio, and dynamically loaded GSAP modules
- Mobile-specific layouts with no forced horizontal page scrolling

## Deployment

GitHub repository: `elemental-battleground-website`

Vercel project: `elemental-battleground-website`

Vercel uses `npm install`, `npm run build`, and the `dist` output directory. The site is a single page using hash navigation, so route rewrites are unnecessary.

## Known Limitations

- No official gameplay trailer URL is available; the trailer action is visibly marked `Coming soon`.
- The combat scene is explicitly presented as an interactive system visualization, not captured gameplay.
- Browser-generated media playback remains subject to each browser's user-interaction policy.
