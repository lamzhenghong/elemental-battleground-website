import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const projectRoot = process.cwd();
const sourceRoot = process.env.GAME_ASSET_ROOT
  ? path.resolve(process.env.GAME_ASSET_ROOT)
  : path.resolve(projectRoot, '..', 'ELEMENTAL BATTLEGROUND', 'assets');
const publicRoot = path.join(projectRoot, 'public', 'media');

const ensureParent = async target => mkdir(path.dirname(target), { recursive: true });

const convertImage = async (sourceRelative, targetRelative, widths = [1600, 960]) => {
  const source = path.join(sourceRoot, sourceRelative);
  const target = path.join(publicRoot, 'images', targetRelative);
  await ensureParent(target);
  const image = sharp(source).rotate();
  const metadata = await image.metadata();
  const primaryWidth = Math.min(widths[0], metadata.width ?? widths[0]);
  await image.clone().resize({ width: primaryWidth, withoutEnlargement: true }).webp({ quality: 84 }).toFile(target);

  for (const width of widths.slice(1)) {
    if ((metadata.width ?? 0) <= width) continue;
    const extension = path.extname(target);
    const responsiveTarget = `${target.slice(0, -extension.length)}-${width}${extension}`;
    await image.clone().resize({ width, withoutEnlargement: true }).webp({ quality: 80 }).toFile(responsiveTarget);
  }
};

const copyAsset = async (sourceRelative, targetRelative) => {
  const target = path.join(publicRoot, targetRelative);
  await ensureParent(target);
  await copyFile(path.join(sourceRoot, sourceRelative), target);
};

const worldImages = [
  'chapter-1-whispering-ruins',
  'chapter-2-elemental-frontier',
  'chapter-3-aether-gates',
  'chapter-4-gloamvault',
  'chapter-5-astral-reliquary',
  'chapter-6-rimeforge-fault',
  'chapter-7-aethelwing-skyroad',
  'chapter-8-eldruin-worldforge',
  'chapter-9-paradox-verge',
  'chapter-10-prime-orbit-core',
  'aurelia-solaris-relay',
  'kaelen-stormbound-harbor',
  'maelis-living-archive',
  'veyra-stormglass-observatory'
];

await Promise.all([
  convertImage('main_menu_bg.jpg', 'brand/portal.webp', [1024, 640]),
  convertImage('home_bg.jpg', 'brand/home-hub.webp', [1024, 640]),
  convertImage('weapon_banner.jpg', 'progression/weapon-forge.webp', [1600, 960]),
  convertImage('standard_banner.jpg', 'progression/celestial-summons.webp', [1600, 960]),
  ...['aurelia', 'kaelen', 'maelis', 'veyra'].map(hero =>
    convertImage(`${hero}_banner.jpg`, `heroes/${hero}.webp`, [1024, 640])
  ),
  ...worldImages.map(name => convertImage(`story/${name}.jpg`, `world/${name}.webp`, [1600, 960])),
  ...['pyro', 'hydro', 'dendro', 'electro'].map(element =>
    convertImage(`${element}_bg.jpg`, `elements/${element}.webp`, [1024, 640])
  ),
  copyAsset('main_menu_bg.mp4', 'video/portal-loop.mp4'),
  copyAsset('game_logo_256.png', 'icons/game-logo.png'),
  copyAsset('bgm/MAIN MENU BGM.mp3', 'audio/main-menu-theme.mp3'),
  copyAsset('bgm/Combat Arena BGM.mp3', 'audio/combat-arena-theme.mp3'),
  copyAsset('bgm/SPECIAL ULTIMATE BGM.mp3', 'audio/special-ultimate-theme.mp3')
]);

console.log(`Prepared website media from ${sourceRoot}`);
