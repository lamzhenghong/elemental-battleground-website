import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { NAVIGATION } from '../content/siteContent';
import { SoundToggle } from './SoundToggle';

interface SiteNavigationProps {
  soundEnabled: boolean;
  onSoundToggle: () => void;
}

export function SiteNavigation({ soundEnabled, onSoundToggle }: SiteNavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const sections = NAVIGATION
      .map(item => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => Boolean(section));
    if (!sections.length || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { rootMargin: '-30% 0px -55%', threshold: [0.05, 0.25, 0.6] }
    );
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header" data-open={menuOpen ? 'true' : 'false'}>
      <a className="brand-mark" href="#overview" onClick={closeMenu} aria-label="Elemental Battleground overview">
        <img src="/media/icons/game-logo.png" alt="" width="42" height="42" />
        <span>
          <b>Elemental</b>
          <small>Battleground</small>
        </span>
      </a>

      <nav className="primary-nav" aria-label="Primary navigation">
        {NAVIGATION.map(item => (
          <a
            key={item.href}
            href={item.href}
            aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
            onClick={closeMenu}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="header-actions">
        <SoundToggle enabled={soundEnabled} onToggle={onSoundToggle} />
        <button
          ref={menuButtonRef}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(open => !open)}
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" aria-hidden={!menuOpen}>
        {NAVIGATION.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {item.label}
          </a>
        ))}
        <SoundToggle enabled={soundEnabled} onToggle={onSoundToggle} />
      </nav>
    </header>
  );
}
