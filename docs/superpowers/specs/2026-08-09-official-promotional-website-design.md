# Elemental Battleground Official Website Design

Date: 2026-08-09
Status: Approved by delegated user authority

## Goal

Build a separate, public promotional website that introduces Elemental Battleground as a cinematic action RPG. The experience must communicate the game through motion, imagery, short copy, and interactive demonstrations rather than wiki-style exposition.

## Product Decisions

- The project lives in `elemental-battleground-website`, outside the game repository.
- The public name is always **Elemental Battleground**.
- The browser title is `Elemental Battleground — Official Game Website`.
- The real game remains unchanged and is linked at `https://elemental-battleground.vercel.app/`.
- The official source link is `https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND`.
- No trailer or social links are invented. Unavailable actions are rendered as clearly labeled `Coming soon` controls rather than dead links.
- Existing repository media is treated as user-supplied project media. Audio remains muted until explicit interaction.

## Creative Direction

The site is a continuous **portal journey**. It opens on the same elemental gate that establishes the game brand, travels through campaign environments, accelerates into combat and reactions, pauses for four distinct hero reveals, peaks at Special Ultimates, then resolves at the restored portal with the Play call to action.

The composition uses dark navy and black as a stage, cyan and gold as brand anchors, and controlled element colors for chapter transitions. Editorial serif display type creates the cinematic identity; a compact sans-serif supports labels and controls. Cards are limited to compact controls and repeated mode previews.

## Storyboard

### 1. The Gate

- Purpose: establish the official game identity within the first viewport.
- Visual: the real animated menu portal, layered with a lightweight particle canvas and title mask.
- Copy: `Every element answers. Every choice changes the field.`
- Motion: title resolves from the portal core; scroll cue moves into the gate.
- Mobile: centered crop, reduced particles, no pinned sequence.
- Fallback: static `main_menu_bg.jpg` when video or motion is unavailable.

### 2. Aetheria in Motion

- Purpose: introduce the world without a lore wall.
- Visual: campaign environments in a horizontal-looking but vertically controlled parallax sequence.
- Copy: four short statements derived from the game lore: floating nations, Elemental Orbits, the Erosion, and the Chosen Catalyst.
- Motion: layered depth and color shifts; no horizontal scroll hijacking.
- Mobile: stacked environment panels with native scrolling.

### 3. Combat, Instinctively

- Purpose: explain real-time combat and defensive skill.
- Visual: an honest interactive combat-system visualization modeled on the game's arena language, explicitly labeled `Interactive system visualization`.
- Interaction: attack, dash, parry, switch, skill, and burst controls trigger lightweight canvas/CSS responses.
- Motion: enemy telegraph, perfect dodge window, hit feedback, combo count, and hero switching.
- Fallback: static sequence with the same explanations.

### 4. Reactions Rewrite the Fight

- Purpose: show that hero-applied elements combine and team choice matters.
- Visual: two selectable energy streams collide around a target.
- Content: representative real reactions: Vaporize, Frozen, Overloaded, and Hyperbloom Quasar.
- Interaction: element controls update pairing, multiplier, effect, and color.
- Reduced motion: immediate state swap without stream animation.

### 5. Four Limited Legends

- Purpose: give Aurelia, Kaelen, Maelis, and Veyra premium individual identity.
- Visual: full-bleed real hero artwork with deliberate face-safe crops.
- Content: real element, role, weapon, title, concise combat identity, skill, and ultimate.
- Motion: each hero owns a distinct transition language: solar flare, current wipe, living roots, prism fracture.
- Mobile: snap-free stacked chapters with portrait-safe focal positions.

### 6. Resonance Beyond One Hero

- Purpose: present Special Ultimates as the signature peak.
- Visual: paired split portraits, two energy gauges, cinematic title reveal, and restrained impact animation.
- Content: Eternal Vapor and Worldstorm Genesis using real dialogue and rules.
- Audio: optional preview from the existing Special Ultimate theme, loaded only after interaction.
- Fallback: simplified crossfade and typography for reduced-motion or low-performance devices.

### 7. Choose the Trial

- Purpose: explain modes through atmosphere and objectives.
- Visual: six near-full-screen mode scenes using campaign and game artwork.
- Modes: Story Campaign, Combat Arena, Artifact Grind, Rogue Ruins, Character Stories, Boss Battles.
- Motion: each scene changes pacing and accent without becoming a generic feature grid.

### 8. Build Your Answer

- Purpose: communicate progression and customization without spreadsheets.
- Visual: a hero silhouette surrounded by animated artifact, forge, team, summon, and damage-skin layers.
- Interaction: selecting a layer changes the short statement and scene treatment.
- Content: real systems only; no fabricated stat numbers.

### 9. Hear the World

- Purpose: offer an optional atmosphere sample.
- Audio: three lazy-loaded selections from the main menu, combat arena, and Special Ultimate tracks.
- Controls: play/pause, progress, volume, and global mute.
- Behavior: one reusable audio element, no overlap, pause on hidden tab, explicit user activation.

### 10. Enter the Battleground

- Purpose: close with a clear action.
- Visual: return to the elemental gate in its brightest state.
- CTA: `Play Elemental Battleground` links to the live game.
- Secondary actions: source/development link; trailer remains visibly `Coming soon`.
- Footer: branding, creator credit, legal note, and asset attribution status.

## Architecture

- React 19, strict TypeScript, Vite, GSAP, and ScrollTrigger.
- CSS handles most transitions and responsive behavior; one lightweight canvas supports opening particles and the combat visualization.
- `App` composes independently testable sections.
- Editable facts live in typed content modules for navigation, heroes, reactions, modes, soundtrack, and links.
- Section-local hooks own GSAP contexts and clean them up on unmount.
- Media components own lazy loading, fallback state, and visibility pausing.
- No client-side router is required; hash navigation keeps direct refresh simple.

## Performance Strategy

- Copy only assets used by the site.
- Convert large JPEG presentation assets to WebP while retaining source attribution in the audit.
- Use responsive `srcset` variants for opening, environment, and hero media.
- Keep the opening MP4 as the only critical motion asset and provide a JPEG poster.
- Audio uses metadata-only preload and loads on demand.
- Dynamically import the soundtrack player and non-critical canvas demo.
- Reduce particles, blur, and pinned timing on touch/coarse-pointer devices.
- Disable decorative canvas when reduced motion or save-data is active.
- Reserve media aspect ratios to avoid layout shift.

## Accessibility and Error Handling

- Semantic landmarks, one `h1`, ordered headings, skip link, visible focus, and keyboard-operable navigation.
- Mobile menu traps and restores focus.
- Sound is off by default and never required to understand content.
- Reduced motion removes scrubbing, parallax, shakes, and animated particles.
- Every image has meaningful alt text; decorative layers are hidden from assistive technology.
- Failed video, image, or audio loads fall back to static artwork and readable copy.
- `noscript` content preserves the game title, description, and Play link.

## Testing

- Unit tests cover content integrity, link behavior, reaction selection, and audio exclusivity.
- TypeScript and production build must pass.
- Browser smoke tests cover navigation, interactive combat, reaction selector, heroes, audio, final CTA, and direct refresh.
- Responsive checks cover 360x800, 390x844, 768x1024, 1366x768, 1440x900, and 1920x1080.
- Keyboard navigation, reduced motion, no horizontal overflow, console errors, and failed required requests are release gates.

## Release

- Initialize a standalone Git repository with package name `elemental-battleground-website`.
- Publish only website files to `lamzhenghong/elemental-battleground-website`.
- Create or link the Vercel project named `elemental-battleground-website` with Vite defaults and `dist` output.
- Verify the public production alias, metadata, HTTPS, favicon, Open Graph, responsive layouts, controls, and required network requests.

## Explicit Non-Goals

- No changes to the game repository.
- No database, authentication, analytics, cookies, ads, or purchases.
- No invented trailer, community, or social account.
- No heavy always-on Three.js scene.
- No claim that the system visualization is captured gameplay.
