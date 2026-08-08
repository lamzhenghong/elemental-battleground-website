import type { HeroFeature } from '../types/content';

export const HEROES: readonly HeroFeature[] = [
  {
    id: 'aurelia',
    name: 'Aurelia Sunflare',
    shortName: 'Aurelia',
    title: 'Sun Warden of Solaris',
    rarity: 5,
    element: 'Pyro',
    role: 'DPS',
    weapon: 'Sword',
    statement: 'A solar vanguard who brands the field and turns every opening into a decisive blaze.',
    quote: 'An oath does not wait for rank.',
    skill: {
      name: 'Searing Dawnburst',
      description: 'A sweeping ring of fire that scorches nearby enemies and accelerates her assault.'
    },
    ultimate: {
      name: 'Daybreak Solstice',
      description: 'A colossal celestial sword detonates across the arena and leaves enemies burning.'
    },
    image: '/media/images/heroes/aurelia.webp',
    environment: '/media/images/world/aurelia-solaris-relay.webp',
    accent: '#ff8a1f',
    accentSoft: '#ffd36a',
    focalPosition: '62% 40%'
  },
  {
    id: 'kaelen',
    name: 'Kaelen Tidebound',
    shortName: 'Kaelen',
    title: 'Pearl Fleet High Admiral',
    rarity: 5,
    element: 'Hydro',
    role: 'Sub DPS',
    weapon: 'Catalyst',
    statement: 'A precise field commander who gathers enemy formations and breaks them beneath spectral salvos.',
    quote: 'Command is not solitude; it is the promise to keep listening.',
    skill: {
      name: 'Admiralty Vortex',
      description: 'A tactical whirlpool pulls enemy formations into a concentrated Hydro kill zone.'
    },
    ultimate: {
      name: 'Pearl Fleet Salvo',
      description: 'Hydro-spectral cannons answer his command with multiple waves of bombardment.'
    },
    image: '/media/images/heroes/kaelen.webp',
    environment: '/media/images/world/kaelen-stormbound-harbor.webp',
    accent: '#20b9ff',
    accentSoft: '#91ecff',
    focalPosition: '50% 36%'
  },
  {
    id: 'maelis',
    name: 'Maelis Verdantveil',
    shortName: 'Maelis',
    title: 'Rootbound Prince of the Canopy',
    rarity: 5,
    element: 'Dendro',
    role: 'Support',
    weapon: 'Claymore',
    statement: 'A guardian-scholar who protects the party and grows a living nexus for elemental reactions.',
    quote: 'An archive with no room to grow is only a beautiful tomb.',
    skill: {
      name: 'Heartwood Aegis',
      description: 'Living roots form a defensive shield and answer incoming attacks with Dendro thorns.'
    },
    ultimate: {
      name: 'Canopy Sovereign Bloom',
      description: 'A luminous forest circle erupts from the field and strengthens allied reaction damage.'
    },
    image: '/media/images/heroes/maelis.webp',
    environment: '/media/images/world/maelis-living-archive.webp',
    accent: '#38dc7b',
    accentSoft: '#bbff78',
    focalPosition: '52% 33%'
  },
  {
    id: 'veyra',
    name: 'Veyra Stormglass',
    shortName: 'Veyra',
    title: 'Prism Archer of Thunder Spires',
    rarity: 5,
    element: 'Electro',
    role: 'DPS',
    weapon: 'Bow',
    statement: 'A prism archer whose impossible trajectories turn precision into a mobile storm.',
    quote: 'Accuracy needs at least one mirror willing to disagree.',
    skill: {
      name: 'Stormglass Refract',
      description: 'A floating prism repeats her charged shot as an Electro ricochet through nearby targets.'
    },
    ultimate: {
      name: 'Nocturne Thunderfall',
      description: 'A constellation bowstring rains violet lightning arrows across the battlefield.'
    },
    image: '/media/images/heroes/veyra.webp',
    environment: '/media/images/world/veyra-stormglass-observatory.webp',
    accent: '#a56cff',
    accentSoft: '#83f4ff',
    focalPosition: '50% 35%'
  }
] as const;
