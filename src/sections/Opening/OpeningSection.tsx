import { ArrowDown, ExternalLink, Keyboard, MonitorSmartphone, Play, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { SITE_LINKS } from '../../content/siteContent';
import { useGsapContext } from '../../hooks/useGsapContext';
import { useReducedExperience } from '../../hooks/useReducedExperience';
import { MediaFallback } from '../../components/MediaFallback';
import { PortalParticles } from './PortalParticles';

export function OpeningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { reducedMotion, reducedData, coarsePointer } = useReducedExperience();
  const effectsReduced = reducedMotion || reducedData;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reducedData) return;
    let inView = true;

    const syncPlayback = () => {
      if (inView && !document.hidden) void video.play().catch(() => undefined);
      else video.pause();
    };
    const observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver(([entry]) => {
          inView = entry?.isIntersecting ?? false;
          syncPlayback();
        }, { rootMargin: '120px 0px' });

    observer?.observe(video);
    document.addEventListener('visibilitychange', syncPlayback);
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', syncPlayback);
      video.pause();
    };
  }, [reducedData]);

  useGsapContext(
    sectionRef,
    ({ gsap }) => {
      const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });
      timeline
        .from('.opening-kicker', { y: 24, autoAlpha: 0, duration: 0.65 })
        .from('.opening-title span', { yPercent: 28, autoAlpha: 0.55, duration: 0.72, stagger: 0.07 }, '-=.5')
        .from('.opening-copy', { y: 18, autoAlpha: 0, duration: 0.6 }, '-=.42')
        .from('.opening-actions > *', { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.08 }, '-=.4');
      gsap.to('.portal-halo', { rotate: 360, duration: 38, ease: 'none', repeat: -1 });
    },
    [],
    effectsReduced
  );

  return (
    <section id="overview" ref={sectionRef} className="opening-section" aria-labelledby="opening-title">
      <div className="opening-media" aria-hidden="true">
        <MediaFallback className="opening-primary-media" message="Portal visual unavailable">
          {onError => !reducedData ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/media/images/brand/portal.webp"
              onError={onError}
            >
              <source src="/media/video/portal-loop.mp4" type="video/mp4" />
            </video>
          ) : (
            <img src="/media/images/brand/portal.webp" alt="" onError={onError} />
          )}
        </MediaFallback>
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
        <div className="opening-signals" aria-label="Game overview">
          <span><b>07</b> Elements</span>
          <span><b>04</b> Hero party</span>
          <span><b>10</b> Story chapters</span>
        </div>
        <div className="opening-capabilities" aria-label="Verified game availability">
          <span><MonitorSmartphone aria-hidden="true" /> Play in browser</span>
          <span><Keyboard aria-hidden="true" /> Keyboard + touch</span>
        </div>
        <div className="opening-actions">
          <a className="button button-primary" href={SITE_LINKS.play.href} target="_blank" rel="noopener noreferrer">
            <Play aria-hidden="true" /> Play now <ExternalLink aria-hidden="true" />
          </a>
          <a className="button button-secondary" href="#world">
            Explore the world <ArrowDown aria-hidden="true" />
          </a>
          <button className="button button-quiet" type="button" disabled title="Official trailer is in production">
            Watch trailer <span>Coming soon</span>
          </button>
        </div>
        <a className="scroll-cue" href="#world" aria-label="Scroll to enter the world">
          <span>Scroll to cross the gate</span>
          <i aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
