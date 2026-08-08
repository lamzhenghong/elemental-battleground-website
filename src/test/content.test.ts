import { describe, expect, it } from 'vitest';
import { GAME_MODES } from '../content/gameModes';
import { HEROES } from '../content/heroes';
import { REACTIONS } from '../content/reactions';
import { SITE_LINKS, SPECIAL_ULTIMATES } from '../content/siteContent';

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
});
