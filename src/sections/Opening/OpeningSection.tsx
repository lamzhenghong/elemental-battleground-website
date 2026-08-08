import { ArrowDown, ExternalLink, Play, Sparkles } from 'lucide-react';
import { useRef } from 'react';
import { SITE_LINKS } from '../../content/siteContent';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedExperience } from '../../hooks/useReducedExperience';
import { PortalParticles } from './PortalParticles';

export function OpeningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { reducedMotion, reducedData, coarsePointer } = useReducedExperience();
  const effectsReduced = reducedMotion || reducedData;

  useGsapContext(
    sectionRef,
    ({ gsap }) => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .from('.opening-kicker', { y: 24, autoAlpha: 0, duration: 0.65 })
        .from('.opening-title span', { yPercent: 105, duration: 1.05, stagger: 0.09 }, '-=.35')
        .from('.opening-copy', { y: 24, autoAlpha: 0, duration: 0.7 }, '-=.55')
        .from('.opening-actions > *', { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.08 }, '-=.4');
      gsap.to('.portal-halo', { rotate: 360, duration: 38, ease: 'none', repeat: -1 });
    },
    [],
    effectsReduced
  );

  return (
    <section id="overview" ref={sectionRef} className="opening-section" aria-labelledby="opening-title">
      <div className="opening-media" aria-hidden="true">
        {!reducedData ? (
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/media/images/brand/portal.webp"
          >
            <source src="/media/video/portal-loop.mp4" type="video/mp4" />
          </video>
        ) : (
          <img src="/media/images/brand/portal.webp" alt="" />
        )}
        <div className="opening-vignette" />
      </div>
      <PortalParticles disabled={effectsReduced || coarsePointer} />
      <div className="portal-halo" aria-hidden="true" />

      <div className="opening-content page-shell">
        <p className="opening-kicker"><Sparkles aria-hidden="true" /> Official game website</p>
        <h1 id="opening-title" className="opening-title">
          <span>Elemental</span>
          {' '}
          <span>Battleground</span>
        </h1>
        <p className="opening-copy">Every element answers. Every choice changes the field.</p>
        <div className="opening-actions">
          <a className="button button-primary" href="#world">
            Begin the journey <ArrowDown aria-hidden="true" />
          </a>
          <a className="button button-secondary" href={SITE_LINKS.play.href} target="_blank" rel="noreferrer">
            <Play aria-hidden="true" /> Play now <ExternalLink aria-hidden="true" />
          </a>
          <button className="button button-quiet" type="button" disabled title="Official trailer is in production">
            Watch trailer <span>Coming soon</span>
          </button>
        </div>
      </div>

      <a className="scroll-cue" href="#world" aria-label="Scroll to enter the world">
        <span>Scroll to cross the gate</span>
        <i aria-hidden="true" />
      </a>
    </section>
  );
}
