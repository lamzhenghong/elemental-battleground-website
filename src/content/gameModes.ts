import type { ModeFeature } from '../types/content';

export const GAME_MODES: readonly ModeFeature[] = [
  {
    id: 'story-campaign',
    name: 'Story Campaign',
    kicker: 'A world in motion',
    statement: 'Cross ten authored chapters where each victory opens the next fracture in Aetheria.',
    objective: 'Choose paths, meet the nations, and confront a unique boss at every chapter finale.',
    image: '/media/images/world/chapter-3-aether-gates.webp',
    accent: '#64d9ff'
  },
  {
    id: 'combat-arena',
    name: 'Combat Arena',
    kicker: 'Master the endless rhythm',
    statement: 'Endless waves sharpen reflexes, rotations, reactions, and survival under pressure.',
    objective: 'Build a streak, adapt to weather, and push beyond your previous limit.',
    image: '/media/images/world/chapter-10-prime-orbit-core.webp',
    accent: '#ff4e65'
  },
  {
    id: 'artifact-grind',
    name: 'Artifact Grind',
    kicker: 'Earn the next breakthrough',
    statement: 'Turn combat mastery into artifacts that reshape how each hero performs.',
    objective: 'Hunt rarity, complete sets, and refine a build worth carrying into harder battles.',
    image: '/media/images/world/chapter-5-astral-reliquary.webp',
    accent: '#ffd04d'
  },
  {
    id: 'rogue-ruins',
    name: 'Rogue Ruins',
    kicker: 'No two descents agree',
    statement: 'Uncertain routes, changing advantages, and escalating encounters reward adaptation.',
    objective: 'Choose each advantage carefully and survive long enough to challenge the ruin core.',
    image: '/media/images/world/chapter-4-gloamvault.webp',
    accent: '#a87aff'
  },
  {
    id: 'character-stories',
    name: 'Character Stories',
    kicker: 'Power has a memory',
    statement: 'Optional side battles reveal the decisions that shaped each hero.',
    objective: 'Clear three escalating acts and recover memories without permanent power rewards.',
    image: '/media/images/world/veyra-stormglass-observatory.webp',
    accent: '#74ecff'
  },
  {
    id: 'boss-battles',
    name: 'Boss Battles',
    kicker: 'Read the warning. Break the pattern.',
    statement: 'Named threats transform their arenas with mechanics that demand more than raw damage.',
    objective: 'Learn phase changes, respect telegraphs, and create the opening that ends the fight.',
    image: '/media/images/world/chapter-9-paradox-verge.webp',
    accent: '#ff6f3d'
  }
] as const;
