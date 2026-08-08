import { REACTIONS } from '../../content/reactions';
import type { ReactionFeature } from '../../types/content';

export interface ReactionPresentation extends ReactionFeature {
  multiplierLabel: string;
}

export function getReactionPresentation(id: ReactionFeature['id']): ReactionPresentation {
  const reaction = REACTIONS.find(candidate => candidate.id === id);
  if (!reaction) throw new Error(`Unknown reaction: ${id}`);
  return {
    ...reaction,
    multiplierLabel: `${Number.isInteger(reaction.multiplier) ? reaction.multiplier.toFixed(1) : reaction.multiplier}x`
  };
}
