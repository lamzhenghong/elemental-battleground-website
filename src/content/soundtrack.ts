import type { SoundtrackFeature } from '../types/content';

export const SOUNDTRACK: readonly SoundtrackFeature[] = [
  {
    id: 'main-theme',
    name: 'Main Menu Theme',
    context: 'At the threshold',
    src: '/media/audio/main-menu-theme.mp3',
    duration: '3:08'
  },
  {
    id: 'arena-theme',
    name: 'Combat Arena Theme',
    context: 'When the next wave arrives',
    src: '/media/audio/combat-arena-theme.mp3',
    duration: '1:45'
  },
  {
    id: 'special-ultimate-theme',
    name: 'Resonance of Aetheria',
    context: 'When two Ultimates answer together',
    src: '/media/audio/special-ultimate-theme.mp3',
    duration: '2:21'
  }
] as const;
