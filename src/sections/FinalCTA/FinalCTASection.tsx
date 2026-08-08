import { ArrowUpRight, Gamepad2, Github, Play } from 'lucide-react';
import { SITE_LINKS } from '../../content/siteContent';

export function FinalCTASection() {
  return (
    <section id="play" className="final-cta-section" aria-labelledby="final-title">
      <img src="/media/images/brand/portal.webp" alt="The elemental portal of Aetheria" loading="lazy" />
      <div className="final-cta-shade" aria-hidden="true" />
      <div className="page-shell final-cta-copy">
        <p className="chapter-index">10 / The gate reopens</p>
        <h2 id="final-title">Your element is waiting.</h2>
        <p>Assemble four heroes. Read the field. Change the outcome.</p>
        <div className="final-actions">
          <a className="primary-cta" href={SITE_LINKS.play.href} target="_blank" rel="noreferrer">
            <Play aria-hidden="true" /> {SITE_LINKS.play.label} <ArrowUpRight aria-hidden="true" />
          </a>
          <a className="secondary-cta" href={SITE_LINKS.development.href} target="_blank" rel="noreferrer">
            <Github aria-hidden="true" /> {SITE_LINKS.development.label}
          </a>
          <span className="unavailable-cta" aria-disabled="true">
            <Gamepad2 aria-hidden="true" /> Trailer coming soon
          </span>
        </div>
      </div>
    </section>
  );
}
