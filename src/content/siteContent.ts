import type { MediaItem, SiteLink, SpecialUltimateFeature } from '../types/content';

export { NEWS_ITEMS } from './news';

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
  { label: 'Home', href: '#overview' },
  { label: 'News', href: '#news' },
  { label: 'World', href: '#world' },
  { label: 'Characters', href: '#characters' },
  { label: 'Elements', href: '#elements' },
  { label: 'Modes', href: '#modes' },
  { label: 'Media', href: '#media' },
  { label: 'Play', href: '#play' }
] as const;

export const MEDIA_ITEMS: readonly MediaItem[] = [
  {
    id: 'whispering-ruins',
    title: 'Whispering Ruins',
    caption: 'An overgrown threshold where Aetheria first answers the party.',
    category: 'World',
    image: '/media/images/world/chapter-1-whispering-ruins.webp',
    mobileImage: '/media/images/world/chapter-1-whispering-ruins-960.webp'
  },
  {
    id: 'aether-gates',
    title: 'Aether Gates',
    caption: 'Ancient transit rings suspended between elemental frontiers.',
    category: 'World',
    image: '/media/images/world/chapter-3-aether-gates.webp',
    mobileImage: '/media/images/world/chapter-3-aether-gates-960.webp'
  },
  {
    id: 'aurelia-sunflare',
    title: 'Aurelia Sunflare',
    caption: 'Solaris answers through a sword drawn like a sunrise.',
    category: 'Characters',
    image: '/media/images/heroes/aurelia.webp',
    mobileImage: '/media/images/heroes/aurelia-640.webp',
    focalPosition: '52% 32%'
  },
  {
    id: 'kaelen-tidebound',
    title: 'Kaelen Tidebound',
    caption: 'The Pearl Fleet High Admiral holds the line in living water.',
    category: 'Characters',
    image: '/media/images/heroes/kaelen.webp',
    mobileImage: '/media/images/heroes/kaelen-640.webp',
    focalPosition: '50% 28%'
  },
  {
    id: 'maelis-verdantveil',
    title: 'Maelis Verdantveil',
    caption: 'The Living Archive grows wherever its prince takes root.',
    category: 'Characters',
    image: '/media/images/heroes/maelis.webp',
    mobileImage: '/media/images/heroes/maelis-640.webp',
    focalPosition: '50% 28%'
  },
  {
    id: 'veyra-stormglass',
    title: 'Veyra Stormglass',
    caption: 'A prism archer maps impossible paths through the storm.',
    category: 'Characters',
    image: '/media/images/heroes/veyra.webp',
    mobileImage: '/media/images/heroes/veyra-640.webp',
    focalPosition: '50% 28%'
  },
  {
    id: 'celestial-summons',
    title: 'Celestial Summons',
    caption: 'A constellation aligns before a new ally answers.',
    category: 'Systems',
    image: '/media/images/progression/celestial-summons.webp',
    mobileImage: '/media/images/progression/celestial-summons-960.webp'
  },
  {
    id: 'weapon-forge',
    title: 'The Forge',
    caption: 'Armaments and artifact sets are composed around each hero.',
    category: 'Systems',
    image: '/media/images/progression/weapon-forge.webp',
    mobileImage: '/media/images/progression/weapon-forge-960.webp'
  },
  {
    id: 'paradox-verge',
    title: 'Paradox Verge',
    caption: 'The horizon folds where the oldest currents lose their direction.',
    category: 'World',
    image: '/media/images/world/chapter-9-paradox-verge.webp',
    mobileImage: '/media/images/world/chapter-9-paradox-verge-960.webp'
  }
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
  { id: 'heroes', label: 'Ascend heroes', shortLabel: 'Heroes', detail: 'Raise levels, unlock Ascension, and sharpen each combat identity.' },
  { id: 'summons', label: 'Summon new allies', shortLabel: 'Summons', detail: 'Meet new heroes and weapons through limited and standard banners with visible pity progress.' },
  { id: 'artifacts', label: 'Shape artifact sets', shortLabel: 'Artifacts', detail: 'Build around main stats, substats, and meaningful two- or four-piece effects.' },
  { id: 'forge', label: 'Forge the loadout', shortLabel: 'Forge', detail: 'Improve weapons, manage materials, and assign every armament with intent.' },
  { id: 'team', label: 'Compose the reaction', shortLabel: 'Reactions', detail: 'Create four-hero rotations that turn element order into battlefield control.' },
  { id: 'skins', label: 'Choose the impact', shortLabel: 'Skins', detail: 'Customize damage-number effects with performance-conscious visual skins.' }
] as const;
