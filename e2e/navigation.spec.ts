import { test, expect } from './fixtures';
import { PRIVATE_SECTIONS, ROUTES } from '../src/routes';

const publicRoutes = Object.entries(ROUTES).filter(([section]) => !PRIVATE_SECTIONS.has(section));

test.describe('every public route renders', () => {
  for (const [section, path] of publicRoutes) {
    test(`${section} (${path})`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      await expect(page.locator('main h1').first()).toBeVisible();
      await expect(page.getByRole('heading', { name: /took a different route/i })).toHaveCount(0);
      await expect(page).toHaveTitle(/IKASLĒ Marketing/);
    });
  }
});

test('header navigation updates the URL and supports back/forward', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Primary navigation' });

  await nav.getByRole('button', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL('/about');
  await expect(page).toHaveTitle('About | IKASLĒ Marketing');

  await nav.getByRole('button', { name: 'Blogs', exact: true }).click();
  await expect(page).toHaveURL('/blogs');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Ideas that help brands');

  await page.goBack();
  await expect(page).toHaveURL('/about');
  await page.goForward();
  await expect(page).toHaveURL('/blogs');
});

test('services mega-menu opens a social sub-page and highlights it', async ({ page }) => {
  await page.goto('/');
  await page.locator('.services-trigger').hover();
  await page.locator('.services-category', { hasText: 'Social Media Marketing' }).hover();
  await page.getByRole('button', { name: 'Content Planning & Calendars' }).click();
  await expect(page).toHaveURL('/services/social-media-marketing/content-planning');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A clear plan.');
  // The dropdown closes after navigating, so check the (hidden) item directly.
  await expect(page.locator('.services-submenu button', { hasText: 'Content Planning & Calendars' })).toHaveClass(/active/);
});

test('footer service links open their hub pages', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('navigation', { name: 'Our services' }).getByRole('button', { name: 'SEO & Search Growth' }).click();
  await expect(page).toHaveURL('/services/seo-search-growth');
});

test('unknown URLs show the not-found page with a 404 status', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /took a different route/i })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  await page.locator('main').getByRole('button', { name: 'Go to home' }).click();
  await expect(page).toHaveURL('/');
});
