import { describe, expect, it } from 'vitest';
import { GAME_MODES } from '../content/gameModes';
import { HEROES } from '../content/heroes';
import { NEWS_CATEGORIES, NEWS_ITEMS } from '../content/news';
import { REACTIONS } from '../content/reactions';
import { MEDIA_ITEMS, SITE_LINKS, SPECIAL_ULTIMATES } from '../content/siteContent';

describe('official site content', () => {
  it('keeps the four featured limited heroes in the intended order', () => {
    expect(HEROES.map(hero => hero.id)).toEqual(['aurelia', 'kaelen', 'maelis', 'veyra']);
    expect(HEROES.every(hero => hero.rarity === 5)).toBe(true);
  });

  it('uses verified reaction values and modes', () => {
    expect(REACTIONS.map(reaction => reaction.id)).toEqual([
      'vaporize',
      'frozen',
      'overloaded',
      'hyperbloom-quasar'
    ]);
    expect(REACTIONS.find(reaction => reaction.id === 'vaporize')?.multiplier).toBe(2);
    expect(GAME_MODES).toHaveLength(6);
  });

  it('uses real destinations and exposes unavailable links honestly', () => {
    expect(SITE_LINKS.play.href).toBe('https://elemental-battleground.vercel.app/');
    expect(SITE_LINKS.development.href).toBe('https://github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND');
    expect(SITE_LINKS.trailer.available).toBe(false);
  });

  it('keeps both real Special Ultimate pairs', () => {
    expect(SPECIAL_ULTIMATES.map(combo => combo.name)).toEqual(['Eternal Vapor', 'Worldstorm Genesis']);
    expect(SPECIAL_ULTIMATES[0].heroes).toEqual(['Aurelia', 'Kaelen']);
    expect(SPECIAL_ULTIMATES[1].heroes).toEqual(['Maelis', 'Veyra']);
  });

  it('publishes player-facing, repository-backed official dispatches', () => {
    expect(NEWS_CATEGORIES).toEqual(['Update', 'Event', 'Development', 'Announcement']);
    expect(NEWS_ITEMS).toHaveLength(3);
    expect(NEWS_ITEMS.map(item => item.date)).toEqual(['2026-09-08', '2026-08-14', '2026-08-12']);
    expect(NEWS_ITEMS.every(item => item.details.length >= 2)).toBe(true);
    expect(NEWS_ITEMS.every(item => item.technicalHref.includes('github.com/lamzhenghong/ELEMENTAL-BATTLEGROUND/commit/'))).toBe(true);
  });

  it('builds the media archive entirely from owned local assets', () => {
    expect(MEDIA_ITEMS.length).toBeGreaterThanOrEqual(8);
    expect(MEDIA_ITEMS.every(item => item.image.startsWith('/media/images/'))).toBe(true);
    expect(new Set(MEDIA_ITEMS.map(item => item.category))).toEqual(new Set(['World', 'Characters', 'Systems']));
  });
});
