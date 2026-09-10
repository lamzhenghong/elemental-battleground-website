import type { NewsCategory, NewsItem } from '../types/content';

export const NEWS_CATEGORIES: readonly NewsCategory[] = ['Update', 'Event', 'Development', 'Announcement'];

export const NEWS_ITEMS: readonly NewsItem[] = [
  {
    id: 'saved-team-builds',
    date: '2026-09-08',
    category: 'Update',
    patch: 'System Update',
    title: 'Five saved team builds are now available',
    summary: 'Store complete lineups and return to your preferred party setup without rebuilding every loadout by hand.',
    details: [
      'Each preset preserves party members, weapons, artifacts, and the selected damage skin.',
      'Players can rename up to five team builds and switch between them outside combat.',
      'Equipment restrictions and missing items remain visible before a build is applied.'
    ],
    technicalHref: 'https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND/commit/e37a6f0',
    image: '/media/images/progression/weapon-forge.webp'
  },
  {
    id: 'special-ultimate-follow-ups',
    date: '2026-08-14',
    category: 'Announcement',
    patch: 'Combat Update',
    title: 'Two Special Ultimates evolve beyond the impact',
    summary: 'Eternal Vapor and Worldstorm Genesis now create distinct tactical windows after their cinematic opening strike.',
    details: [
      'Eternal Vapor marks surviving enemies with Vapor Pressure, rewarding continued party attacks with focused detonations.',
      'Worldstorm Genesis links enemies through electrified roots so direct damage can echo across the network.',
      'Bosses use resistant versions of each follow-up so the systems remain useful without removing encounter pressure.'
    ],
    technicalHref: 'https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND/commit/6538386',
    image: '/media/images/world/chapter-10-prime-orbit-core.webp'
  },
  {
    id: 'combat-artifact-polish',
    date: '2026-08-12',
    category: 'Development',
    patch: 'Presentation Update',
    title: 'Combat impacts and artifact resonance refined',
    summary: 'Hit feedback and artifact-set readability now communicate more of each build without crowding the battlefield.',
    details: [
      'Weapon-shaped impacts, directional damage numbers, elemental critical styles, and final-hit confirmation improve combat clarity.',
      'Artifact emblems and restrained resonance auras distinguish active two-piece and four-piece set bonuses.',
      'Forge set visualization makes completed and missing artifact slots easier to read across desktop and mobile.'
    ],
    technicalHref: 'https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND/commit/4dd4b01',
    image: '/media/images/progression/celestial-summons.webp'
  }
] as const;

