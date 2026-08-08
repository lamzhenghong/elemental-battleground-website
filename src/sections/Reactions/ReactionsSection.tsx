import { Atom, Plus } from 'lucide-react';
import { useState, type CSSProperties } from 'react';
import { REACTIONS } from '../../content/reactions';
import type { ReactionFeature } from '../../types/content';
import { getReactionPresentation } from './reactionPresentation';

type ReactionStyle = CSSProperties & { '--reaction-a': string; '--reaction-b': string };

export function ReactionsSection() {
  const [activeId, setActiveId] = useState<ReactionFeature['id']>('vaporize');
  const reaction = getReactionPresentation(activeId);
  const style: ReactionStyle = { '--reaction-a': reaction.colors[0], '--reaction-b': reaction.colors[1] };

  return (
    <section id="reactions" className="reactions-section" aria-labelledby="reactions-title" style={style}>
      <div className="reaction-stage page-shell">
        <header>
          <p className="chapter-index">03 / Elemental reactions</p>
          <h2 id="reactions-title">Two elements enter. The battlefield leaves changed.</h2>
        </header>

        <div className="reaction-collider" aria-live="polite">
          <div className="energy-source energy-source-a"><span>{reaction.elements[0]}</span><i /></div>
          <Plus className="reaction-plus" aria-hidden="true" />
          <div className="reaction-core">
            <Atom aria-hidden="true" />
            <small>{reaction.effect}</small>
            <strong>{reaction.name}</strong>
            <b>{reaction.multiplierLabel}</b>
            <span>{reaction.pairing}</span>
          </div>
          <div className="energy-source energy-source-b"><span>{reaction.elements.at(-1)}</span><i /></div>
        </div>

        <p className="reaction-description">{reaction.description}</p>

        <div className="reaction-selector" aria-label="Choose a reaction">
          {REACTIONS.map(item => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show ${item.name} reaction`}
              aria-pressed={activeId === item.id}
              onClick={() => setActiveId(item.id)}
            >
              <span style={{ background: `linear-gradient(90deg, ${item.colors[0]}, ${item.colors[1]})` }} />
              {item.name}
              <small>{item.pairing}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
