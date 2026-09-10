import type { GameplayCategory } from '../types/content';

export const GAMEPLAY_CATEGORIES: readonly GameplayCategory[] = [
  {
    id: 'combat',
    label: 'Combat',
    description: 'Perfect parries, dodges, character switching, and elemental reaction sequences.',
    assetPath: '/media/gameplay/combat-01.webp',
    status: 'awaiting-authentic-capture'
  },
  {
    id: 'world',
    label: 'World',
    description: 'Aetheria environments, campaign encounters, weather, and traversal moments.',
    assetPath: '/media/gameplay/world-01.webp',
    status: 'awaiting-authentic-capture'
  },
  {
    id: 'bosses',
    label: 'Bosses',
    description: 'Distinct boss silhouettes, mechanics, telegraphs, and counterplay.',
    assetPath: '/media/gameplay/bosses-01.webp',
    status: 'awaiting-authentic-capture'
  },
  {
    id: 'special-ultimates',
    label: 'Special Ultimates',
    description: 'Eternal Vapor and Worldstorm Genesis from activation through follow-up states.',
    assetPath: '/media/gameplay/special-ultimates-01.webp',
    status: 'awaiting-authentic-capture'
  }
] as const;
