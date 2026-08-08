# Elemental Battleground Website Asset Audit

Source repository: `C:\Users\lamzh\OneDrive\Documents\Games\ELEMENTAL BATTLEGROUND`

This report inventories media suitable for the separate official website. Original game assets remain in place. Only selected copies will be optimized and published.

## Existing Usable Assets

| Asset | Type / size | Website use | Optimization |
| --- | --- | --- | --- |
| `assets/main_menu_bg.mp4` | MP4, 10s, 1.04 MB | Opening and final portal motion | Keep; preload metadata/poster only |
| `assets/main_menu_bg.jpg` | JPEG, 1024x1024, 0.86 MB | Opening fallback and social-image base | Create responsive WebP variants |
| `assets/home_bg.jpg` | JPEG, 1024x576, 0.32 MB | Progression or world transition | Create WebP variant |
| `assets/game_logo_256.png` | PNG, 256x256, 0.17 MB | Favicon, navigation mark, footer | Keep PNG; derive favicon sizes |
| `assets/aurelia_banner.jpg` | JPEG, 1024x1024, 0.33 MB | Aurelia showcase | Create face-safe responsive WebP |
| `assets/kaelen_banner.jpg` | JPEG, 1024x1024, 0.34 MB | Kaelen showcase | Create face-safe responsive WebP |
| `assets/maelis_banner.jpg` | JPEG, 1024x1024, 0.27 MB | Maelis showcase | Create face-safe responsive WebP |
| `assets/veyra_banner.jpg` | JPEG, 1024x1024, 0.24 MB | Veyra showcase | Create face-safe responsive WebP |
| `assets/story/chapter-1-whispering-ruins.jpg` | JPEG, 1600x900, 0.33 MB | World chapter | Create 960/1600 WebP variants |
| `assets/story/chapter-2-elemental-frontier.jpg` | JPEG, 1600x900, 0.32 MB | World chapter | Create 960/1600 WebP variants |
| `assets/story/chapter-3-aether-gates.jpg` | JPEG, 1600x900, 0.33 MB | World chapter | Create 960/1600 WebP variants |
| `assets/story/chapter-4-gloamvault.jpg` | JPEG, 1600x900, 0.11 MB | Rogue Ruins mode | Create WebP variant |
| `assets/story/chapter-5-astral-reliquary.jpg` | JPEG, 1600x900, 0.19 MB | Artifact/progression mode | Create WebP variant |
| `assets/story/chapter-6-rimeforge-fault.jpg` | JPEG, 1600x900, 0.17 MB | Forge/progression mode | Create WebP variant |
| `assets/story/chapter-7-aethelwing-skyroad.jpg` | JPEG, 1600x900, 0.18 MB | Story mode scene | Create WebP variant |
| `assets/story/chapter-8-eldruin-worldforge.jpg` | JPEG, 1600x900, 0.18 MB | Forge/progression scene | Create WebP variant |
| `assets/story/chapter-9-paradox-verge.jpg` | JPEG, 1600x900, 0.20 MB | Boss/mode scene | Create WebP variant |
| `assets/story/chapter-10-prime-orbit-core.jpg` | JPEG, 1600x900, 0.21 MB | Final reveal | Create WebP variant |
| `assets/story/aurelia-solaris-relay.jpg` | JPEG, 1600x900, 0.15 MB | Aurelia/world transition | Create WebP variant |
| `assets/story/kaelen-stormbound-harbor.jpg` | JPEG, 1600x900, 0.16 MB | Kaelen/world transition | Create WebP variant |
| `assets/story/maelis-living-archive.jpg` | JPEG, 1600x900, 0.18 MB | Maelis/world transition | Create WebP variant |
| `assets/story/veyra-stormglass-observatory.jpg` | JPEG, 1600x900, 0.18 MB | Veyra/world transition | Create WebP variant |
| Element and weapon backgrounds | 14 JPEGs, 1024x1024, 0.19-0.27 MB each | Reaction and progression texture layers | Use only selected crops; WebP |
| `assets/bgm/MAIN MENU BGM.mp3` | MP3, 3:08, 2.41 MB | Optional main-theme sample | Lazy-load |
| `assets/bgm/Combat Arena BGM.mp3` | MP3, 1:45, 1.55 MB | Optional combat sample | Lazy-load |
| `assets/bgm/SPECIAL ULTIMATE BGM.mp3` | MP3, 2:21, 3.22 MB | Optional signature-system sample | Lazy-load |

The other eleven BGM files remain available but will not be copied initially, keeping the site payload focused. Their durations range from 3:13 to 8:00 and total approximately 43.6 MB.

## Verified Source Content

- Four limited heroes with real titles, roles, elements, weapons, skills, and Ultimates.
- Two Special Ultimates: Eternal Vapor and Worldstorm Genesis.
- Twelve shared reaction definitions with real pairings and multipliers.
- Real combat mechanics: normal attacks, skills, Burst, dash, perfect dodge, parry, switching, combos, weather, enemies, and bosses.
- Real modes: Story Campaign, Combat Arena, Artifact Grind, Rogue Ruins, Character Stories, and boss encounters.
- Progression systems: hero growth, Ascension, artifacts, sets, weapons, Forge, summoning, team building, and damage skins.
- Official live game URL and GitHub development repository.

## Missing Assets

- No transparent full-body hero renders.
- No high-resolution vector logo or wordmark.
- No captured gameplay trailer or per-mechanic gameplay clips.
- No Special Ultimate video captures.
- No dedicated mobile gameplay screenshots.
- No voice lines or captions.
- No purpose-built 1200x630 Open Graph image.
- No official social/community URLs or trailer URL.

## Placeholder and Fallback Policy

- Combat and reaction sections use labeled interactive system visualizations, never unlabeled fake gameplay.
- Trailer controls display `Coming soon` and do not act as dead links.
- The Open Graph image is built from owned project art and branding until dedicated key art is supplied.
- Hero sections use the square banner art with explicit focal positioning because transparent renders are unavailable.
- Missing media always falls back to static artwork and text.

## Rights and Publication Assumption

The user delegated asset and release decisions. The implementation will publish only media already supplied inside the user's game repository and will not add third-party imagery, fonts, music, or stock assets. This is a conservative technical filter, not an independent legal ownership determination.

