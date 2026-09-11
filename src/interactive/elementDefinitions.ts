export const ELEMENT_IDS = ['pyro', 'hydro', 'cryo', 'electro', 'anemo', 'geo', 'dendro'] as const;

export type ElementId = typeof ELEMENT_IDS[number];
export type ElementIconKey = 'flame' | 'droplets' | 'snowflake' | 'zap' | 'wind' | 'gem' | 'leaf';

export interface ElementDefinition {
  id: ElementId;
  name: string;
  primary: string;
  secondary: string;
  glow: string;
  icon: ElementIconKey;
  portalEffect: string;
  particleBehavior: string;
  description: string;
  combat: {
    attackStyle: string;
    status: string;
    skillDamage: number;
    skillEnergy: number;
    skillHealing: number;
    attackEnergyGain: number;
    incomingDamageMultiplier: number;
    dodgeWindowBonusMs: number;
    parryWindowBonusMs: number;
    echoDamage: number;
  };
}

export const DEFAULT_ELEMENT_ID: ElementId = 'pyro';

export const ELEMENT_DEFINITIONS: readonly ElementDefinition[] = [
  {
    id: 'pyro',
    name: 'Pyro',
    primary: '#ff6a32',
    secondary: '#ffc046',
    glow: 'rgba(255, 91, 42, 0.42)',
    icon: 'flame',
    portalEffect: 'Solar ignition',
    particleBehavior: 'Rising ember sparks',
    description: 'Fast pressure and a heavier elemental skill impact.',
    combat: {
      attackStyle: 'Solar edge flurry',
      status: 'Scorched',
      skillDamage: 210,
      skillEnergy: 35,
      skillHealing: 0,
      attackEnergyGain: 15,
      incomingDamageMultiplier: 1,
      dodgeWindowBonusMs: 0,
      parryWindowBonusMs: 0,
      echoDamage: 0
    }
  },
  {
    id: 'hydro',
    name: 'Hydro',
    primary: '#3fd8ff',
    secondary: '#4f8dff',
    glow: 'rgba(63, 216, 255, 0.4)',
    icon: 'droplets',
    portalEffect: 'Tidal refraction',
    particleBehavior: 'Orbiting water motes',
    description: 'Fluid recovery that restores health on skill impact.',
    combat: {
      attackStyle: 'Tidebound current',
      status: 'Tidebound',
      skillDamage: 180,
      skillEnergy: 35,
      skillHealing: 14,
      attackEnergyGain: 15,
      incomingDamageMultiplier: 1,
      dodgeWindowBonusMs: 0,
      parryWindowBonusMs: 0,
      echoDamage: 0
    }
  },
  {
    id: 'cryo',
    name: 'Cryo',
    primary: '#b9f1ff',
    secondary: '#78aaff',
    glow: 'rgba(164, 231, 255, 0.4)',
    icon: 'snowflake',
    portalEffect: 'Crystal refraction',
    particleBehavior: 'Slow falling shards',
    description: 'Control-focused frost with a more forgiving parry window.',
    combat: {
      attackStyle: 'Rime crystal thrust',
      status: 'Deep Frost',
      skillDamage: 180,
      skillEnergy: 35,
      skillHealing: 0,
      attackEnergyGain: 15,
      incomingDamageMultiplier: 1,
      dodgeWindowBonusMs: 0,
      parryWindowBonusMs: 220,
      echoDamage: 0
    }
  },
  {
    id: 'electro',
    name: 'Electro',
    primary: '#b66dff',
    secondary: '#6f8dff',
    glow: 'rgba(167, 92, 255, 0.42)',
    icon: 'zap',
    portalEffect: 'Storm lattice',
    particleBehavior: 'Short branching sparks',
    description: 'Rapid energy gain and angular chain-lightning feedback.',
    combat: {
      attackStyle: 'Stormglass volley',
      status: 'Overcharged',
      skillDamage: 175,
      skillEnergy: 45,
      skillHealing: 0,
      attackEnergyGain: 20,
      incomingDamageMultiplier: 1,
      dodgeWindowBonusMs: 0,
      parryWindowBonusMs: 0,
      echoDamage: 0
    }
  },
  {
    id: 'anemo',
    name: 'Anemo',
    primary: '#72f1d0',
    secondary: '#b8fff1',
    glow: 'rgba(94, 239, 205, 0.36)',
    icon: 'wind',
    portalEffect: 'Aerial spiral',
    particleBehavior: 'Curved wind ribbons',
    description: 'Mobile wind flow with a more forgiving dodge window.',
    combat: {
      attackStyle: 'Gale crescent',
      status: 'Windborne',
      skillDamage: 180,
      skillEnergy: 35,
      skillHealing: 0,
      attackEnergyGain: 15,
      incomingDamageMultiplier: 1,
      dodgeWindowBonusMs: 220,
      parryWindowBonusMs: 0,
      echoDamage: 0
    }
  },
  {
    id: 'geo',
    name: 'Geo',
    primary: '#ffc44e',
    secondary: '#d98a32',
    glow: 'rgba(255, 188, 62, 0.38)',
    icon: 'gem',
    portalEffect: 'Resonant facets',
    particleBehavior: 'Angular amber fragments',
    description: 'Steady defence that reduces damage from missed counters.',
    combat: {
      attackStyle: 'Worldstone breaker',
      status: 'Fortified',
      skillDamage: 185,
      skillEnergy: 35,
      skillHealing: 0,
      attackEnergyGain: 15,
      incomingDamageMultiplier: 0.68,
      dodgeWindowBonusMs: 0,
      parryWindowBonusMs: 0,
      echoDamage: 0
    }
  },
  {
    id: 'dendro',
    name: 'Dendro',
    primary: '#77e45b',
    secondary: '#d6dd55',
    glow: 'rgba(112, 222, 87, 0.36)',
    icon: 'leaf',
    portalEffect: 'Living geometry',
    particleBehavior: 'Leaf-rune growth paths',
    description: 'Setup-driven roots that echo after the elemental skill.',
    combat: {
      attackStyle: 'Verdant root sweep',
      status: 'Rootmarked',
      skillDamage: 170,
      skillEnergy: 35,
      skillHealing: 0,
      attackEnergyGain: 15,
      incomingDamageMultiplier: 1,
      dodgeWindowBonusMs: 0,
      parryWindowBonusMs: 0,
      echoDamage: 50
    }
  }
] as const;

const ELEMENT_BY_ID = new Map(ELEMENT_DEFINITIONS.map(element => [element.id, element]));

export function isElementId(value: unknown): value is ElementId {
  return typeof value === 'string' && ELEMENT_BY_ID.has(value as ElementId);
}

export function getElementDefinition(id: ElementId): ElementDefinition {
  return ELEMENT_BY_ID.get(id) ?? ELEMENT_BY_ID.get(DEFAULT_ELEMENT_ID)!;
}
