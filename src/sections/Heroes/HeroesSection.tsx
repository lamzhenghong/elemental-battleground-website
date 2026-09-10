import { ChevronLeft, ChevronRight, Sparkles, Swords } from 'lucide-react';
import { useRef, useState, type CSSProperties } from 'react';
import { HEROES } from '../../content/heroes';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedExperience } from '../../hooks/useReducedExperience';
import { MediaFallback } from '../../components/MediaFallback';

export function HeroesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const reducedExperience = useReducedExperience();
  const hero = HEROES[activeIndex];
  const sceneStyle = {
    '--hero-accent': hero.accent,
    '--hero-accent-soft': hero.accentSoft,
    '--hero-focus': hero.focalPosition
  } as CSSProperties;

  useGsapContext(
    sectionRef,
    ({ gsap }) => {
      gsap.fromTo(
        '.hero-scene-copy > *',
        { y: 16, opacity: 0.36 },
        { y: 0, opacity: 1, duration: 0.56, stagger: 0.045, ease: 'power3.out' }
      );
      gsap.fromTo('.hero-portrait', { scale: 1.025, opacity: 0.72 }, { scale: 1, opacity: 1, duration: 0.7 });
    },
    [activeIndex],
    reducedExperience.reducedMotion
  );

  const selectRelative = (offset: number) => {
    setActiveIndex(index => (index + offset + HEROES.length) % HEROES.length);
  };

  return (
    <section id="characters" className="heroes-section" aria-labelledby="heroes-title" ref={sectionRef} style={sceneStyle}>
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-scene page-shell">
        <header className="hero-chapter-heading">
          <p className="chapter-index">03 / Limited legends</p>
          <h2 id="heroes-title">Four lives. Four elements. One changing field.</h2>
        </header>

        <div
          className="hero-stage"
          role="group"
          aria-label="Active hero dossier"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
            event.preventDefault();
            selectRelative(event.key === 'ArrowRight' ? 1 : -1);
          }}
          onTouchStart={event => {
            const touch = event.touches[0];
            touchStartRef.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
          }}
          onTouchEnd={event => {
            const start = touchStartRef.current;
            const touch = event.changedTouches[0];
            touchStartRef.current = null;
            if (!start || !touch) return;
            const horizontal = touch.clientX - start.x;
            const vertical = touch.clientY - start.y;
            if (Math.abs(horizontal) < 54 || Math.abs(horizontal) <= Math.abs(vertical)) return;
            selectRelative(horizontal < 0 ? 1 : -1);
          }}
        >
          <div className="hero-visual" aria-hidden="true">
            <MediaFallback className="hero-primary-media" message={`${hero.name} visual unavailable`}>
              {onError => (
                <>
                  <img className="hero-environment" src={hero.environment} alt="" loading="lazy" onError={onError} width="1600" height="900" />
                  <img className="hero-portrait" src={hero.image} alt="" loading="lazy" onError={onError} width="1024" height="1024" />
                </>
              )}
            </MediaFallback>
            <span className="hero-element-mark">{hero.element}</span>
          </div>

          <article className="hero-scene-copy" aria-live="polite">
            <div className="hero-meta">
              <span>{hero.rarity}-star limited</span>
              <span>{hero.element}</span>
              <span>{hero.weapon}</span>
              <span>{hero.role}</span>
            </div>
            <p className="hero-title">{hero.title}</p>
            <h3>{hero.name}</h3>
            <p className="hero-statement">{hero.statement}</p>

            <div className="hero-kit">
              <div>
                <Sparkles aria-hidden="true" />
                <small>Elemental skill</small>
                <strong>{hero.skill.name}</strong>
                <p>{hero.skill.description}</p>
              </div>
              <div>
                <Swords aria-hidden="true" />
                <small>Ultimate</small>
                <strong>{hero.ultimate.name}</strong>
                <p>{hero.ultimate.description}</p>
              </div>
            </div>

            <blockquote>“{hero.quote}”</blockquote>
          </article>
        </div>

        <div className="hero-roster" aria-label="Choose a hero dossier">
          <button type="button" className="hero-roster-arrow" onClick={() => selectRelative(-1)} aria-label="Previous hero">
            <ChevronLeft aria-hidden="true" />
          </button>
          {HEROES.map((candidate, index) => (
            <button
              type="button"
              key={candidate.id}
              className={index === activeIndex ? 'is-active' : ''}
              aria-pressed={index === activeIndex}
              aria-label={`View ${candidate.name}`}
              onClick={() => setActiveIndex(index)}
              style={{ '--roster-accent': candidate.accent } as CSSProperties}
            >
              <img src={candidate.image} alt="" loading="lazy" width="1024" height="1024" />
              <span>{candidate.shortName}</span>
              <small>{candidate.element}</small>
            </button>
          ))}
          <button type="button" className="hero-roster-arrow" onClick={() => selectRelative(1)} aria-label="Next hero">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
