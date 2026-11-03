// Public origin used for absolute URLs in sitemap.xml, robots.txt and prerendered meta tags.
// Set SITE_URL in the environment (or .env) for production builds.
export const DEFAULT_SITE_URL = 'https://www.ikaslemarketing.com';

export function siteUrl() {
  const value = (process.env.SITE_URL || DEFAULT_SITE_URL).trim().replace(/\/+$/, '');
  const url = new URL(value); // throws on a malformed value, failing the build early
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error(`SITE_URL must be http(s): ${value}`);
  if (!process.env.SITE_URL) console.warn(`[seo] SITE_URL is not set; using ${DEFAULT_SITE_URL}. Set it to your production domain.`);
  return value;
}
