import type { SiteLink, SpecialUltimateFeature } from '../types/content';

export const SITE_LINKS: Record<'play' | 'development' | 'trailer', SiteLink> = {
  play: {
    label: 'Play Elemental Battleground',
    href: 'https://elemental-battleground.vercel.app/',
    available: true,
    external: true
  },
  development: {
    label: 'Follow Development',
    href: 'https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND',
    available: true,
    external: true
  },
  trailer: {
    label: 'Watch Trailer',
    href: '',
    available: false,
    external: false
  }
};

export const NAVIGATION = [
  { label: 'Overview', href: '#overview' },
  { label: 'Combat', href: '#combat' },
  { label: 'Heroes', href: '#heroes' },
  { label: 'Special Ultimates', href: '#special-ultimates' },
  { label: 'Modes', href: '#modes' },
  { label: 'Progression', href: '#progression' },
  { label: 'Play', href: '#play' }
] as const;

export const WORLD_CHAPTERS = [
  {
    eyebrow: 'Elemental Orbits',
    title: 'A world suspended by living currents.',
    text: 'Celestial rivers of energy bind floating islands, buried crystal cities, and nations shaped by seven elements.',
    image: '/media/images/world/chapter-1-whispering-ruins.webp'
  },
  {
    eyebrow: 'The Erosion',
    title: 'The current is beginning to fail.',
    text: 'An ancient corruption is forcing every nation to decide what it will preserve, claim, or sacrifice.',
    image: '/media/images/world/chapter-2-elemental-frontier.webp'
  },
  {
    eyebrow: 'The Catalyst',
    title: 'One fighter can synchronize what others keep divided.',
    text: 'Build a four-hero party, rotate elements in real time, and turn cooperation into the strongest weapon on the field.',
    image: '/media/images/world/chapter-7-aethelwing-skyroad.webp'
  }
] as const;

export const SPECIAL_ULTIMATES: readonly SpecialUltimateFeature[] = [
  {
    id: 'eternal-vapor',
    name: 'Eternal Vapor',
    heroes: ['Aurelia', 'Kaelen'],
    heroIds: ['aurelia', 'kaelen'],
    dialogue: ['Together?', 'Always.'],
    impact: 'Massive Vaporize Detonation',
    statement: 'Solar fire and admiralty currents collapse into one battlefield-wide answer.',
    colors: ['#ff8a1f', '#20b9ff']
  },
  {
    id: 'worldstorm-genesis',
    name: 'Worldstorm Genesis',
    heroes: ['Maelis', 'Veyra'],
    heroIds: ['maelis', 'veyra'],
    dialogue: ['The forest answers.', 'Then let the heavens roar.'],
    impact: 'Hyperbloom Worldstorm',
    statement: 'Every root becomes a conductor when the storm descends on the living field.',
    colors: ['#38dc7b', '#a56cff']
  }
] as const;

export const PROGRESSION_LAYERS = [
  { id: 'heroes', label: 'Ascend heroes', detail: 'Raise levels, unlock Ascension, and sharpen each combat identity.' },
  { id: 'summons', label: 'Summon new allies', detail: 'Meet new heroes and weapons through limited and standard banners with visible pity progress.' },
  { id: 'artifacts', label: 'Shape artifact sets', detail: 'Build around main stats, substats, and meaningful two- or four-piece effects.' },
  { id: 'forge', label: 'Forge the loadout', detail: 'Improve weapons, manage materials, and assign every armament with intent.' },
  { id: 'team', label: 'Compose the reaction', detail: 'Create four-hero rotations that turn element order into battlefield control.' },
  { id: 'skins', label: 'Choose the impact', detail: 'Customize damage-number effects with performance-conscious visual skins.' }
] as const;
