import { ArrowRight, ArrowUpRight, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { NEWS_CATEGORIES, NEWS_ITEMS } from '../../content/news';
import type { NewsCategory } from '../../types/content';

const FILTERS: readonly ('All' | NewsCategory)[] = ['All', ...NEWS_CATEGORIES];

const formatDate = (date: string) => new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric'
}).format(new Date(`${date}T00:00:00Z`));

export function NewsSection() {
  const [filter, setFilter] = useState<'All' | NewsCategory>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const visibleItems = filter === 'All' ? NEWS_ITEMS : NEWS_ITEMS.filter(item => item.category === filter);
  const selected = NEWS_ITEMS.find(item => item.id === selectedId) ?? null;

  const closeArticle = useCallback(() => {
    setSelectedId(null);
    openerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeArticle();
        return;
      }

      if (event.key !== 'Tab') return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]') ?? []
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
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [closeArticle, selected]);

  return (
    <section id="news" className="news-section" aria-labelledby="news-title">
      <div className="news-shell page-shell">
        <header className="news-heading">
          <div>
            <p className="chapter-index">01 / Official dispatches</p>
            <h2 id="news-title">Latest from Aetheria</h2>
          </div>
          <div className="news-intro">
            <p>Player-facing notes from the live project, backed by the real implementation record.</p>
            <a href="https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND/commits/main/" target="_blank" rel="noopener noreferrer">
              Follow development <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className="news-filters" aria-label="Filter official news">
          {FILTERS.map(category => (
            <button
              type="button"
              key={category}
              aria-pressed={filter === category}
              aria-label={`${category} updates`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="news-list" aria-live="polite">
          {visibleItems.map((item, index) => (
            <article key={item.id} className={index === 0 ? 'is-featured' : undefined}>
              <img src={item.image} alt="" loading="lazy" width="1600" height="900" />
              <div>
                <p><time dateTime={item.date}>{formatDate(item.date)}</time><span>{item.category}</span><span>{item.patch}</span></p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <button
                  className="news-read"
                  type="button"
                  aria-label={`Read ${item.title}`}
                  onClick={event => {
                    openerRef.current = event.currentTarget;
                    setSelectedId(item.id);
                  }}
                >
                  Read dispatch <ArrowRight aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
          {visibleItems.length === 0 && (
            <p className="news-empty">No {filter.toLowerCase()} notices are published yet.</p>
          )}
        </div>
      </div>

      {selected && (
        <div ref={dialogRef} className="news-dialog" role="dialog" aria-modal="true" aria-labelledby={`news-dialog-${selected.id}`}>
          <button className="news-dialog-backdrop" type="button" onClick={closeArticle} aria-label="Dismiss article" tabIndex={-1} />
          <article className="news-dialog-panel">
            <img src={selected.image} alt="" width="1600" height="900" />
            <div className="news-dialog-content">
              <p className="chapter-index">{selected.category} / {selected.patch}</p>
              <h2 id={`news-dialog-${selected.id}`}>{selected.title}</h2>
              <p className="news-dialog-date"><time dateTime={selected.date}>{formatDate(selected.date)}</time></p>
              <p className="news-dialog-summary">{selected.summary}</p>
              <ul>
                {selected.details.map(detail => <li key={detail}>{detail}</li>)}
              </ul>
              <a href={selected.technicalHref} target="_blank" rel="noopener noreferrer">
                Technical implementation <ArrowUpRight aria-hidden="true" />
              </a>
            </div>
            <button ref={closeButtonRef} className="news-dialog-close" type="button" onClick={closeArticle} aria-label="Close article">
              <X aria-hidden="true" />
            </button>
          </article>
        </div>
      )}
    </section>
  );
}
