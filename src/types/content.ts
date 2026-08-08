export type Element = 'Pyro' | 'Hydro' | 'Cryo' | 'Electro' | 'Anemo' | 'Geo' | 'Dendro';

export interface SiteLink {
  label: string;
  href: string;
  available: boolean;
  external: boolean;
}

export interface HeroFeature {
  id: 'aurelia' | 'kaelen' | 'maelis' | 'veyra';
  name: string;
  shortName: string;
  title: string;
  rarity: 5;
  element: Element;
  role: 'DPS' | 'Sub DPS' | 'Support';
  weapon: 'Sword' | 'Catalyst' | 'Claymore' | 'Bow';
  statement: string;
  quote: string;
  skill: { name: string; description: string };
  ultimate: { name: string; description: string };
  image: string;
  environment: string;
  accent: string;
  accentSoft: string;
  focalPosition: string;
}

export interface ReactionFeature {
  id: 'vaporize' | 'frozen' | 'overloaded' | 'hyperbloom-quasar';
  name: string;
  elements: readonly Element[];
  pairing: string;
  multiplier: number;
  effect: string;
  description: string;
  colors: readonly [string, string];
}

export interface ModeFeature {
  id: string;
  name: string;
  kicker: string;
  statement: string;
  objective: string;
  image: string;
  accent: string;
}

export interface SoundtrackFeature {
  id: 'main-theme' | 'arena-theme' | 'special-ultimate-theme';
  name: string;
  context: string;
  src: string;
  duration: string;
}

export interface SpecialUltimateFeature {
  id: 'eternal-vapor' | 'worldstorm-genesis';
  name: string;
  heroes: readonly [string, string];
  heroIds: readonly [HeroFeature['id'], HeroFeature['id']];
  dialogue: readonly [string, string];
  impact: string;
  statement: string;
  colors: readonly [string, string];
}
