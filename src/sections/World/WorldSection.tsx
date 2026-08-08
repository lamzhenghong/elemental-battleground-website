import { useRef } from 'react';
import { WORLD_CHAPTERS } from '../../content/siteContent';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedExperience } from '../../hooks/useReducedExperience';
import { MediaFallback } from '../../components/MediaFallback';

export function WorldSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion, coarsePointer } = useReducedExperience();

  useGsapContext(
    sectionRef,
    ({ gsap }) => {
      gsap.utils.toArray<HTMLElement>('.world-frame').forEach(frame => {
        const image = frame.querySelector('img');
        const copy = frame.querySelector('.world-frame-copy');
        gsap.fromTo(
          image,
          { scale: 1.08 },
          { scale: 1, ease: 'none', scrollTrigger: { trigger: frame, scrub: 0.7, start: 'top bottom', end: 'bottom top' } }
        );
        gsap.fromTo(
          copy,
          { y: 54, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, scrollTrigger: { trigger: frame, start: 'top 72%', toggleActions: 'play none none reverse' } }
        );
      });
    },
    [],
    reducedMotion || coarsePointer
  );

  return (
    <section id="world" ref={sectionRef} className="world-section" aria-labelledby="world-title">
      <header className="chapter-heading page-shell">
        <p className="chapter-index">01 / Enter the world</p>
        <h2 id="world-title">Aetheria is not waiting to be saved.</h2>
        <p>The elemental currents are failing. Every nation has an answer. None of them agree.</p>
      </header>

      <div className="world-frames page-shell">
        {WORLD_CHAPTERS.map((chapter, index) => (
          <article className="world-frame" key={chapter.title}>
            <MediaFallback className="world-frame-media" message={`${chapter.eyebrow} visual unavailable`}>
              {onError => (
                <picture>
                  <source media="(max-width: 720px)" srcSet={chapter.image.replace('.webp', '-960.webp')} />
                  <img
                    src={chapter.image}
                    alt={`Elemental Battleground environment: ${chapter.eyebrow}`}
                    loading="lazy"
                    onError={onError}
                  />
                </picture>
              )}
            </MediaFallback>
            <div className="world-frame-shade" aria-hidden="true" />
            <div className="world-frame-copy">
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{chapter.eyebrow}</p>
              <h3>{chapter.title}</h3>
              <small>{chapter.text}</small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
