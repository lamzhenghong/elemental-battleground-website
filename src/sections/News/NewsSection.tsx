import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { NEWS_ITEMS } from '../../content/siteContent';
import type { NewsCategory } from '../../types/content';

const FILTERS: readonly ('All' | NewsCategory)[] = ['All', 'Systems', 'Combat', 'Progression'];

const formatDate = (date: string) => new Intl.DateTimeFormat('en', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
  year: 'numeric'
}).format(new Date(`${date}T00:00:00Z`));

export function NewsSection() {
  const [filter, setFilter] = useState<'All' | NewsCategory>('All');
  const visibleItems = filter === 'All' ? NEWS_ITEMS : NEWS_ITEMS.filter(item => item.category === filter);

  return (
    <section id="news" className="news-section" aria-labelledby="news-title">
      <div className="news-shell page-shell">
        <header className="news-heading">
          <div>
            <p className="chapter-index">01 / Official dispatches</p>
            <h2 id="news-title">Latest from Aetheria</h2>
          </div>
          <div className="news-intro">
            <p>Verified development notes from the live project. Every dispatch links to the implementation record.</p>
            <a href="https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND/commits/main/" target="_blank" rel="noreferrer">
              View all development <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </header>

        <div className="news-filters" aria-label="Filter development news">
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
              <img src={item.image} alt="" loading="lazy" />
              <div>
                <p><time dateTime={item.date}>{formatDate(item.date)}</time><span>{item.category}</span></p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <a href={item.href} target="_blank" rel="noreferrer">
                  Read development record <ArrowUpRight aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
