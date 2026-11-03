// After `vite build`, writes dist/<route>/index.html for every public page with that
// page's <title>, description, canonical and Open Graph tags baked in (IKAS-501).
// Social crawlers (LinkedIn, Facebook, WhatsApp, X) don't run JavaScript, so without
// this every shared link would show the homepage card. The app itself is unchanged:
// the same bundle boots on every route and keeps the tags updated client-side.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getSectionMeta, SITE_NAME } from '../src/seo/meta.ts';
import { getPublicPages } from '../src/seo/pages.ts';
import { NOT_FOUND_SECTION, PRIVATE_SECTIONS } from '../src/routes.ts';
import { siteUrl } from './site-url.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const origin = siteUrl();

const START = '<!-- seo:start';
const END = '<!-- seo:end -->';
const startIndex = template.indexOf(START);
const endIndex = template.indexOf(END);
if (startIndex === -1 || endIndex === -1) throw new Error('index.html is missing the <!-- seo:start --> / <!-- seo:end --> markers.');

const attr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function headFor(meta) {
  const url = origin + meta.path;
  const image = meta.image.startsWith('http') ? meta.image : origin + meta.image;
  return [
    `<title>${attr(meta.title)}</title>`,
    `<meta name="description" content="${attr(meta.description)}" />`,
    meta.noindex ? '<meta name="robots" content="noindex, nofollow" />' : `<link rel="canonical" href="${attr(url)}" />`,
    `<meta property="og:site_name" content="${attr(SITE_NAME)}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:title" content="${attr(meta.title)}" />`,
    `<meta property="og:description" content="${attr(meta.description)}" />`,
    `<meta property="og:url" content="${attr(url)}" />`,
    `<meta property="og:image" content="${attr(image)}" />`,
    meta.publishedAt ? `<meta property="article:published_time" content="${meta.publishedAt}" />` : '',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${attr(meta.title)}" />`,
    `<meta name="twitter:description" content="${attr(meta.description)}" />`,
    `<meta name="twitter:image" content="${attr(image)}" />`,
  ].filter(Boolean).join('\n    ');
}

// Markers are kept so the step is idempotent (it can run again on its own output).
const render = (meta) =>
  template.slice(0, startIndex) + '<!-- seo:start -->\n    ' + headFor(meta) + '\n    ' + template.slice(endIndex);

let count = 0;
// Private pages (dashboards) get their own noindex HTML too, so they never inherit the homepage canonical.
for (const meta of [...getPublicPages(), ...[...PRIVATE_SECTIONS].map(getSectionMeta)]) {
  const target = meta.path === '/' ? path.join(dist, 'index.html') : path.join(dist, ...meta.path.split('/').filter(Boolean), 'index.html');
  // Guard: never write outside dist/.
  if (!path.resolve(target).startsWith(dist + path.sep)) throw new Error(`Refusing to write outside dist: ${target}`);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, render(meta));
  count += 1;
}

// 404.html for static hosts that serve it for unknown paths (noindex).
fs.writeFileSync(path.join(dist, '404.html'), render(getSectionMeta(NOT_FOUND_SECTION)));
console.log(`[seo] Prerendered meta tags for ${count} routes (+ 404.html)`);
