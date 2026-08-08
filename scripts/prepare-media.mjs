import { copyFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import sharp from 'sharp';

const projectRoot = process.cwd();
const sourceRoot = process.env.GAME_ASSET_ROOT
  ? path.resolve(process.env.GAME_ASSET_ROOT)
  : path.resolve(projectRoot, '..', 'ELEMENTAL BATTLEGROUND', 'assets');
const publicRoot = path.join(projectRoot, 'public', 'media');
const sitePublicRoot = path.join(projectRoot, 'public');

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

const logoSource = path.join(publicRoot, 'icons', 'game-logo.png');
const portalSource = path.join(publicRoot, 'images', 'brand', 'portal.webp');
const socialTarget = path.join(sitePublicRoot, 'social', 'elemental-battleground-og.webp');
await ensureParent(socialTarget);

const socialLogo = await sharp(logoSource).resize(96, 96).png().toBuffer();
const socialOverlay = Buffer.from(`
  <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#03050a" stop-opacity="0.12"/>
        <stop offset="1" stop-color="#03050a" stop-opacity="0.84"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#shade)"/>
    <rect x="72" y="70" width="5" height="490" fill="#ffc846"/>
    <text x="206" y="110" fill="#9aeeff" font-family="Arial, sans-serif" font-size="20" font-weight="700" letter-spacing="6">OFFICIAL GAME WEBSITE</text>
    <text x="72" y="408" fill="#f7f4e8" font-family="Georgia, serif" font-size="92" font-weight="700">ELEMENTAL</text>
    <text x="72" y="500" fill="#f7f4e8" font-family="Georgia, serif" font-size="92" font-weight="700">BATTLEGROUND</text>
    <text x="78" y="548" fill="#d8e0ef" font-family="Arial, sans-serif" font-size="24" letter-spacing="3">EVERY ELEMENT ANSWERS.</text>
  </svg>
`);

await Promise.all([
  sharp(logoSource).resize(32, 32).png().toFile(path.join(sitePublicRoot, 'favicon-32.png')),
  sharp(logoSource).resize(180, 180).png().toFile(path.join(sitePublicRoot, 'apple-touch-icon.png')),
  sharp(logoSource).resize(192, 192).png().toFile(path.join(sitePublicRoot, 'icon-192.png')),
  sharp(logoSource).resize(512, 512).png().toFile(path.join(sitePublicRoot, 'icon-512.png')),
  sharp(portalSource)
    .resize(1200, 630, { fit: 'cover' })
    .modulate({ brightness: 0.72, saturation: 0.9 })
    .composite([
      { input: socialOverlay, top: 0, left: 0 },
      { input: socialLogo, top: 66, left: 92 }
    ])
    .webp({ quality: 88 })
    .toFile(socialTarget)
]);

console.log(`Prepared website media from ${sourceRoot}`);
