import { test, expect } from './fixtures';
import { BLOG_POSTS } from '../src/content/blog/posts';
import { NOT_FOUND_SECTION, sectionFromPath } from '../src/routes';

test('category filters and search narrow the article list without a reload', async ({ page }) => {
  await page.goto('/blogs');
  const filters = page.getByRole('group', { name: 'Filter by category' });
  const cards = page.locator('.blog-card');
  await expect(cards).toHaveCount(BLOG_POSTS.length);

  // Mark the document so a full reload would be detected.
  await page.evaluate(() => ((window as unknown as { __noReload: boolean }).__noReload = true));

  await filters.getByRole('button', { name: /^Social Media/ }).click();
  await expect(cards).toHaveCount(BLOG_POSTS.filter((post) => post.category === 'Social Media').length);
  await expect(page).toHaveURL(/category=Social\+Media/);

  await filters.getByRole('button', { name: /^Case Studies/ }).click();
  await expect(page.getByRole('heading', { name: 'No Case Studies articles yet.' })).toBeVisible();
  await page.getByRole('button', { name: 'Show all articles' }).click();

  await page.getByRole('searchbox', { name: 'Search articles' }).fill('utm');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('UTM Tagging');

  await page.getByRole('searchbox', { name: 'Search articles' }).fill('zzzz-nothing');
  await expect(page.getByRole('heading', { name: /No articles match/ })).toBeVisible();

  expect(await page.evaluate(() => (window as unknown as { __noReload?: boolean }).__noReload)).toBe(true);
});

test('a filtered blog URL restores its filters', async ({ page }) => {
  await page.goto('/blogs?category=SEO+%26+Search');
  await expect(page.getByRole('group', { name: 'Filter by category' }).getByRole('button', { name: /^SEO & Search/ })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.blog-card')).toHaveCount(BLOG_POSTS.filter((post) => post.category === 'SEO & Search').length);
});

test('article page renders markdown, code, callouts, share links and meta', async ({ page }) => {
  await page.goto('/blogs');
  await page.getByRole('link', { name: /Local SEO for Coaching Centres/ }).click();
  await expect(page).toHaveURL('/blogs/local-seo-for-coaching-centres');

  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Local SEO for Coaching Centres and Training Institutes');
  await expect(page.getByRole('heading', { level: 2, name: '4. Add structured data' })).toBeVisible();
  await expect(page.locator('.md-code code.language-json .tok-key').first()).toHaveText('"@context"');
  await expect(page.locator('.md-callout-tip')).toContainText('Reviews are part of local SEO');

  await expect(page).toHaveTitle('Local SEO for Coaching Centres and Training Institutes | IKASLĒ Marketing');
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute('content', 'article');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/blogs\/local-seo-for-coaching-centres$/);

  const linkedin = page.getByRole('link', { name: 'LinkedIn' });
  await expect(linkedin).toHaveAttribute('href', /linkedin\.com\/sharing\/share-offsite\/\?url=http/);
  await expect(linkedin).toHaveAttribute('rel', /noopener/);

  // In-article links to services navigate inside the app.
  await page.locator('.blog-prose').getByRole('link', { name: 'Local SEO', exact: true }).click();
  await expect(page).toHaveURL('/services/seo-search-growth/local-seo');
});

test('unknown article slug shows a friendly not-found state', async ({ page }) => {
  await page.goto('/blogs/not-a-real-article');
  await expect(page.getByRole('heading', { name: /couldn’t find that article/ })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('every internal link inside articles points to a real page', () => {
  for (const post of BLOG_POSTS) {
    for (const [, href] of post.body.matchAll(/\]\((\/[^)\s]*)\)/g)) {
      expect(sectionFromPath(href), `${post.slug} links to ${href}`).not.toBe(NOT_FOUND_SECTION);
    }
  }
});

test('newsletter signup stores the subscriber via the real API', async ({ page }) => {
  await page.goto('/blogs');
  const form = page.locator('.blog-newsletter');
  await form.getByRole('textbox', { name: 'Email address' }).fill('not-an-email');
  await form.getByRole('button', { name: /Subscribe/ }).click();
  await expect(form.getByRole('alert')).toHaveText('Please enter a valid email address.');

  await form.getByRole('textbox', { name: 'Email address' }).fill(`e2e-${Date.now()}@example.com`);
  await form.getByRole('button', { name: /Subscribe/ }).click();
  await expect(form.getByRole('status')).toContainText('Thanks for subscribing.');
});
