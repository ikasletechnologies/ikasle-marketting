// Generates public/sitemap.xml and public/robots.txt from src/routes.ts and the blog
// posts (IKAS-503). Runs before every build; Vite then copies both into dist/.
//   node scripts/generate-sitemap.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getPublicPages } from '../src/seo/pages.ts';
import { siteUrl } from './site-url.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = path.join(root, 'public');
const origin = siteUrl();
const today = new Date().toISOString().slice(0, 10);

const escapeXml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');

function priority(pagePath) {
  if (pagePath === '/') return '1.0';
  const depth = pagePath.split('/').filter(Boolean).length;
  return depth === 1 ? '0.8' : depth === 2 ? '0.7' : '0.6';
}

const pages = getPublicPages().filter((page) => !page.noindex);
const seen = new Set();
const entries = pages
  .filter((page) => (seen.has(page.path) ? false : seen.add(page.path)))
  .map((page) => [
    '  <url>',
    `    <loc>${escapeXml(origin + page.path)}</loc>`,
    `    <lastmod>${page.publishedAt ?? today}</lastmod>`,
    `    <priority>${priority(page.path)}</priority>`,
    '  </url>',
  ].join('\n'));

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\nDisallow: /dashboard\nDisallow: /api/\n\nSitemap: ${origin}/sitemap.xml\n`;

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
console.log(`[seo] Wrote sitemap.xml (${entries.length} URLs) and robots.txt for ${origin}`);
