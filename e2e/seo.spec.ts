import { test, expect } from './fixtures';

// These read raw HTML (no JavaScript), the way social-preview crawlers do.

test('service pages ship their own title and Open Graph tags in the HTML', async ({ request }) => {
  const response = await request.get('/services/social-media-marketing/content-planning');
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain('<title>Content Planning | IKASLĒ Marketing</title>');
  expect(html).toMatch(/<meta property="og:title" content="Content Planning \| IKASLĒ Marketing" \/>/);
  expect(html).toMatch(/<link rel="canonical" href="https?:\/\/[^"]+\/services\/social-media-marketing\/content-planning" \/>/);
  expect(html.match(/<title>/g)).toHaveLength(1);
});

test('blog posts ship article meta in the HTML', async ({ request }) => {
  const html = await (await request.get('/blogs/utm-tagging-for-student-enquiries')).text();
  expect(html).toContain('<meta property="og:type" content="article" />');
  expect(html).toContain('article:published_time');
});

test('dashboards are noindex in the HTML', async ({ request }) => {
  const html = await (await request.get('/dashboard/leads')).text();
  expect(html).toContain('<meta name="robots" content="noindex, nofollow" />');
  expect(html).not.toContain('rel="canonical"');
});

test('sitemap lists public pages and posts, but not dashboards', async ({ request }) => {
  const xml = await (await request.get('/sitemap.xml')).text();
  expect(xml).toContain('<urlset');
  expect(xml).toMatch(/<loc>[^<]+\/services\/seo-search-growth\/local-seo<\/loc>/);
  expect(xml).toMatch(/<loc>[^<]+\/blogs\/reels-that-bring-enquiries<\/loc>/);
  expect(xml).not.toContain('/dashboard');
});

test('robots.txt blocks dashboards and points to the sitemap', async ({ request }) => {
  const text = await (await request.get('/robots.txt')).text();
  expect(text).toContain('Disallow: /dashboard');
  expect(text).toMatch(/Sitemap: https?:\/\/.+\/sitemap\.xml/);
});

test('in-app navigation keeps the description in sync', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('button', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveTitle('Contact | IKASLĒ Marketing');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Contact IKASLĒ Marketing/);
  await expect(page.locator('meta[name="description"]')).toHaveCount(1);
});
