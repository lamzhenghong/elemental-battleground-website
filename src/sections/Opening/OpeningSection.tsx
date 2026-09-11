import { ArrowDown, ExternalLink, Keyboard, MonitorSmartphone, Play, Sparkles } from 'lucide-react';
import { useCallback, useEffect, useRef, type CSSProperties } from 'react';
import { SITE_LINKS } from '../../content/siteContent';
import { useGsapContext } from '../../hooks/useGsapContext';
import { MediaFallback } from '../../components/MediaFallback';
import { PortalParticles } from './PortalParticles';
import { useInteractiveExperience } from '../../interactive/InteractiveExperienceContext';
import { getPortalChargeStage } from './portalCharge';
import { usePortalCharge } from './usePortalCharge';

export function OpeningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const transitionTimerRef = useRef<number>(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const proximityRef = useRef(0);
  const experience = useInteractiveExperience();
  const {
    selectedElement,
    setPortalCharge,
    portalActivated,
    setPortalActivated,
    reducedMotion,
    reducedData,
    coarsePointer
  } = experience;
  const effectsReduced = reducedMotion || reducedData;
  const activatePortal = () => {
    if (portalActivated) return;
    setPortalActivated(true);
    window.clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = window.setTimeout(() => {
      const destination = document.getElementById('resonance');
      if (!destination) return;
      window.history.pushState(null, '', '#resonance');
      destination.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    }, reducedMotion ? 100 : 820);
  };
  const publishSharedCharge = useCallback((charge: number) => {
    if (charge === 0 || charge === 100) setPortalCharge(charge);
  }, [setPortalCharge]);
  const portal = usePortalCharge({ onCharge: publishSharedCharge, onActivate: activatePortal });
  const chargeStage = getPortalChargeStage(portal.charge);

  useEffect(() => () => window.clearTimeout(transitionTimerRef.current), []);

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
    <section
      id="overview"
      ref={sectionRef}
      className="opening-section"
      aria-labelledby="opening-title"
      data-portal-stage={chargeStage}
      data-portal-active={portalActivated ? 'true' : 'false'}
      data-motion={effectsReduced ? 'reduced' : 'full'}
      style={{
        '--portal-accent': selectedElement.primary,
        '--portal-accent-secondary': selectedElement.secondary,
        '--portal-progress': `${portal.charge * 3.6}deg`
      } as CSSProperties}
      onPointerMove={event => {
        if (effectsReduced || coarsePointer) return;
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
        const y = ((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
        pointerRef.current = { x, y };
        const distance = Math.hypot(x, y + 0.12);
        proximityRef.current = Math.max(0, 1 - distance / 0.72);
        event.currentTarget.style.setProperty('--portal-x', x.toFixed(3));
        event.currentTarget.style.setProperty('--portal-y', y.toFixed(3));
        event.currentTarget.style.setProperty('--portal-proximity', proximityRef.current.toFixed(3));
      }}
      onPointerLeave={event => {
        pointerRef.current = { x: 0, y: 0 };
        proximityRef.current = 0;
        event.currentTarget.style.setProperty('--portal-x', '0');
        event.currentTarget.style.setProperty('--portal-y', '0');
        event.currentTarget.style.setProperty('--portal-proximity', '0');
        portal.cancel();
      }}
    >
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
      <PortalParticles
        disabled={effectsReduced || coarsePointer}
        primary={selectedElement.primary}
        secondary={selectedElement.secondary}
        chargeRef={portal.chargeRef}
        pointerRef={pointerRef}
        proximityRef={proximityRef}
      />
      <div className="portal-halo" aria-hidden="true" />
      <button
        type="button"
        className="portal-activator"
        aria-label={`Synchronize portal with ${selectedElement.name}`}
        aria-describedby="portal-instruction"
        onPointerDown={event => {
          if (event.pointerType === 'touch') event.preventDefault();
          event.currentTarget.setPointerCapture?.(event.pointerId);
          portal.start();
        }}
        onPointerUp={event => {
          event.currentTarget.releasePointerCapture?.(event.pointerId);
          portal.cancel();
        }}
        onPointerCancel={portal.cancel}
        onContextMenu={event => event.preventDefault()}
        onKeyDown={event => {
          if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
            event.preventDefault();
            portal.start();
          }
        }}
        onKeyUp={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            portal.cancel();
          }
        }}
      >
        <span className="portal-charge-ring" aria-hidden="true" />
        <span className="portal-target-core" aria-hidden="true" />
        <span id="portal-instruction" className="sr-only">
          {coarsePointer ? 'Hold the portal to enter' : 'Hold the portal to synchronize'}
        </span>
        <span className="sr-only" role="progressbar" aria-label="Portal synchronization" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(portal.charge)}>
          {Math.round(portal.charge)} percent charged
        </span>
      </button>

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
        <span className="opening-portal-hint" aria-hidden="true">
          {coarsePointer ? 'Hold portal to enter' : 'Hold portal to synchronize'}
        </span>
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
