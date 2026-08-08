import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { GAME_MODES } from '../content/gameModes';
import { HEROES } from '../content/heroes';
import { SOUNDTRACK } from '../content/soundtrack';
import { WORLD_CHAPTERS } from '../content/siteContent';

const read = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

describe('production metadata', () => {
  it('uses the exact official title and share metadata', () => {
    const html = read('index.html');

    expect(html).toContain('<title>Elemental Battleground — Official Game Website</title>');
    expect(html).toContain('rel="canonical" href="https://elemental-battleground-website.vercel.app/"');
    expect(html).toContain('property="og:title" content="Elemental Battleground — Official Game Website"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
  });

  it('ships indexable web app and brand assets', () => {
    for (const path of [
      'public/manifest.webmanifest',
      'public/robots.txt',
      'public/sitemap.xml',
      'public/favicon-32.png',
      'public/apple-touch-icon.png',
      'public/social/elemental-battleground-og.webp'
    ]) {
      expect(existsSync(resolve(process.cwd(), path)), `${path} should exist`).toBe(true);
    }

    const manifest = JSON.parse(read('public/manifest.webmanifest')) as { name: string; start_url: string };
    expect(manifest.name).toBe('Elemental Battleground');
    expect(manifest.start_url).toBe('/');
    expect(read('public/robots.txt')).toContain('Allow: /');
    expect(read('public/sitemap.xml')).toContain('https://elemental-battleground-website.vercel.app/');
  });

  it('keeps every configured media reference deployable', () => {
    const mediaPaths = [
      ...GAME_MODES.map(mode => mode.image),
      ...HEROES.flatMap(hero => [hero.image, hero.environment]),
      ...SOUNDTRACK.map(track => track.src),
      ...WORLD_CHAPTERS.map(chapter => chapter.image),
      '/media/icons/game-logo.png',
      '/media/images/brand/portal.webp',
      '/media/video/portal-loop.mp4'
    ];

    for (const mediaPath of mediaPaths) {
      expect(existsSync(resolve(process.cwd(), 'public', mediaPath.slice(1))), `${mediaPath} should exist`).toBe(true);
    }
  });
});
