import type { ReactionFeature } from '../types/content';

export const REACTIONS: readonly ReactionFeature[] = [
  {
    id: 'vaporize',
    name: 'Vaporize',
    elements: ['Hydro', 'Pyro'],
    pairing: 'Hydro + Pyro',
    multiplier: 2,
    effect: 'Thermal Vaporization',
    description: 'Amplifies the triggering attack to deal double damage.',
    colors: ['#24b7ff', '#ff6a1f']
  },
  {
    id: 'frozen',
    name: 'Frozen',
    elements: ['Hydro', 'Cryo'],
    pairing: 'Hydro + Cryo',
    multiplier: 1.1,
    effect: 'Deep Freeze',
    description: 'Locks the enemy in ice for about 3.3 seconds and primes a shatter opportunity.',
    colors: ['#2cc9ff', '#b8f4ff']
  },
  {
    id: 'overloaded',
    name: 'Overloaded',
    elements: ['Pyro', 'Electro'],
    pairing: 'Pyro + Electro',
    multiplier: 1.65,
    effect: 'Kinetic Shockwave',
    description: 'Creates an explosive knockback that disrupts coordinated enemy pressure.',
    colors: ['#ff5a36', '#b55cff']
  },
  {
    id: 'hyperbloom-quasar',
    name: 'Hyperbloom Quasar',
    elements: ['Hydro', 'Dendro', 'Electro'],
    pairing: 'Bloom + Electro',
    multiplier: 2.3,
    effect: 'Conductive Spark Chaining',
    description: 'Strikes the target and chains part of the reaction damage through nearby enemies.',
    colors: ['#3ae58a', '#9b65ff']
  }
] as const;
