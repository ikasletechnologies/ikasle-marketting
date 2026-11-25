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

test('service detail breadcrumbs show and navigate the full hierarchy', async ({ page }) => {
  await page.goto('/services/social-media-marketing/strategy');
  const breadcrumb = page.getByRole('navigation', { name: 'Breadcrumb' });

  await expect(breadcrumb).toContainText('Home');
  await expect(breadcrumb).toContainText('Services');
  await expect(breadcrumb).toContainText('Social Media Marketing');
  await expect(breadcrumb.locator('[aria-current="page"]')).toHaveText('Social Media Strategy');

  await breadcrumb.getByRole('button', { name: 'Social Media Marketing' }).click();
  await expect(page).toHaveURL('/services/social-media-marketing');
});
test('services mega-menu opens a social sub-page and highlights it', async ({ page }) => {
  await page.goto('/');
  await page.locator('.services-trigger').hover();
  await page.locator('.services-category', { hasText: 'Social Media Marketing' }).hover();
  await page.getByRole('button', { name: 'Content Planning & Calendars' }).click();
  await expect(page).toHaveURL('/services/social-media-marketing/content-planning');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Social media content planning');
  // The dropdown closes after navigating, so check the (hidden) item directly.
  await expect(page.locator('.services-submenu button', { hasText: 'Content Planning & Calendars' })).toHaveClass(/active/);
});

test('IM-2: desktop service submenus stay inside a short viewport and remain scrollable', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 480 });
  await page.goto('/');
  await page.locator('.services-trigger').hover();
  await page.locator('.services-category', { hasText: 'Brand Growth & Creative' }).hover();

  const submenu = page.locator('.services-category', { hasText: 'Brand Growth & Creative' }).locator('.services-submenu');
  await expect(submenu).toBeVisible();
  const box = await submenu.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y + box!.height).toBeLessThanOrEqual(480);

  const lastItem = submenu.getByRole('button').last();
  await lastItem.scrollIntoViewIfNeeded();
  await expect(lastItem).toBeVisible();
});

test('IM-3: SEO result rows keep badges, content and indicators aligned', async ({ page }) => {
  await page.goto('/');
  const seoTab = page.locator('.hs-tab', { hasText: 'SEO & Search Growth' });
  await seoTab.scrollIntoViewIfNeeded();
  await seoTab.hover();

  const rows = page.locator('.hs-results li');
  await expect(rows).toHaveCount(4);
  const geometry = await rows.evaluateAll((items) => items.map((item) => {
    const rank = item.querySelector('.hs-rank')!.getBoundingClientRect();
    const content = item.querySelector(':scope > span')!.getBoundingClientRect();
    const row = item.getBoundingClientRect();
    return {
      rankX: rank.x,
      contentX: content.x,
      height: row.height,
      columns: getComputedStyle(item).gridTemplateColumns,
    };
  }));

  for (const key of ['rankX', 'contentX', 'height'] as const) {
    expect(new Set(geometry.map((row) => Math.round(row[key]))).size).toBe(1);
  }
  expect(new Set(geometry.map((row) => row.columns)).size).toBe(1);
});

for (const route of [
  '/services/digital-marketing/strategy',
  '/services/digital-marketing/email-marketing',
  '/services/social-media-marketing/content-planning',
  '/services/seo-search-growth/technical-seo',
  '/services/brand-growth-creative/brand-strategy-positioning',
]) {
  test(`service detail page ${route} includes a closing contact CTA`, async ({ page }) => {
    await page.goto(route);
    const cta = page.locator('.services-cta');
    await expect(cta).toHaveCount(1);
    await expect(cta.getByRole('heading', { name: 'Ready to turn your next idea into action?' })).toBeVisible();
    await expect(cta.getByRole('button', { name: 'Start a Conversation' })).toBeVisible();
  });
}
test('service detail hero actions sit side by side across categories', async ({ page }) => {
  const routes = [
    '/services/social-media-marketing/analytics-reporting',
    '/services/seo-search-growth/technical-seo',
    '/services/brand-growth-creative/brand-strategy-positioning',
  ];

  for (const route of routes) {
    await page.goto(route);
    const buttons = page.locator('.sl-actions').getByRole('button');
    await expect(buttons).toHaveCount(2);
    const boxes = await buttons.evaluateAll((items) => items.map((item) => item.getBoundingClientRect()));
    expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThanOrEqual(1);
    expect(Math.abs(boxes[0].height - boxes[1].height)).toBeLessThanOrEqual(1);
  }
});
test('hero call to action opens the contact page', async ({ page }) => {
  await page.goto('/services/social-media-marketing/analytics-reporting');
  await page.locator('.sl-actions').getByRole('button', { name: 'Get Better Social Reports' }).click();
  await expect(page).toHaveURL('/contact');
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
