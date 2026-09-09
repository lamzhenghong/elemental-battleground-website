import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { MediaFallback } from '../../components/MediaFallback';
import { MEDIA_ITEMS } from '../../content/siteContent';
import type { MediaCategory } from '../../types/content';

const FILTERS: readonly ('All' | MediaCategory)[] = ['All', 'World', 'Characters', 'Systems'];

export function MediaSection() {
  const [filter, setFilter] = useState<'All' | MediaCategory>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const visibleItems = filter === 'All' ? MEDIA_ITEMS : MEDIA_ITEMS.filter(item => item.category === filter);
  const selectedIndex = selectedId ? visibleItems.findIndex(item => item.id === selectedId) : -1;
  const selected = selectedIndex >= 0 ? visibleItems[selectedIndex] : null;

  const close = () => {
    setSelectedId(null);
    openerRef.current?.focus();
  };

  const move = (offset: number) => {
    if (selectedIndex < 0) return;
    setSelectedId(visibleItems[(selectedIndex + offset + visibleItems.length) % visibleItems.length].id);
  };

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'ArrowLeft') move(-1);
      if (event.key === 'ArrowRight') move(1);
      if (event.key === 'Tab') {
        const focusable = Array.from(
          lightboxRef.current?.querySelectorAll<HTMLButtonElement>('button:not([tabindex="-1"])') ?? []
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedId, selectedIndex, selected, visibleItems]);

  const selectFilter = (category: 'All' | MediaCategory) => {
    setFilter(category);
    setSelectedId(null);
  };

  return (
    <section id="media" className="media-section" aria-labelledby="media-title">
      <div className="media-shell page-shell">
        <header>
          <p className="chapter-index">09 / Field archive</p>
          <h2 id="media-title">Aetheria, frame by frame.</h2>
          <p>Explore owned artwork from the world, its heroes, and the systems that shape every build.</p>
        </header>

        <div className="media-filters" aria-label="Filter media">
          {FILTERS.map(category => (
            <button
              type="button"
              key={category}
              aria-pressed={filter === category}
              onClick={() => selectFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="media-grid">
          {visibleItems.map((item, index) => (
            <button
              type="button"
              className={index === 0 ? 'media-tile media-tile-featured' : 'media-tile'}
              key={item.id}
              aria-label={`Open ${item.title} media`}
              onClick={event => {
                openerRef.current = event.currentTarget;
                setSelectedId(item.id);
              }}
            >
              <MediaFallback className="media-tile-image" message={`${item.title} image unavailable`}>
                {onError => (
                  <picture>
                    {item.mobileImage && <source media="(max-width: 720px)" srcSet={item.mobileImage} />}
                    <img
                      src={item.image}
                      alt=""
                      loading="lazy"
                      onError={onError}
                      style={{ '--media-focus': item.focalPosition ?? 'center' } as CSSProperties}
                    />
                  </picture>
                )}
              </MediaFallback>
              <span><small>{item.category}</small><strong>{item.title}</strong></span>
              <Expand aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div ref={lightboxRef} className="media-lightbox" role="dialog" aria-modal="true" aria-label={selected.title}>
          <button className="media-lightbox-backdrop" type="button" onClick={close} aria-label="Dismiss expanded media" tabIndex={-1} />
          <figure>
            <MediaFallback className="media-lightbox-image" message={`${selected.title} image unavailable`}>
              {onError => <img src={selected.image} alt={selected.title} onError={onError} />}
            </MediaFallback>
            <figcaption>
              <span>{selected.category} / {String(selectedIndex + 1).padStart(2, '0')}</span>
              <strong>{selected.title}</strong>
              <p>{selected.caption}</p>
            </figcaption>
          </figure>
          <button ref={closeButtonRef} className="media-lightbox-close" type="button" onClick={close} aria-label="Close media">
            <X aria-hidden="true" />
          </button>
          <button className="media-lightbox-prev" type="button" onClick={() => move(-1)} aria-label="Previous media">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button className="media-lightbox-next" type="button" onClick={() => move(1)} aria-label="Next media">
            <ChevronRight aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
