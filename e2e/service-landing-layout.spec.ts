import { test, expect } from './fixtures';
import { ROUTES } from '../src/routes';

/** One service detail page per category (each category uses a different hero board). */
const SAMPLES = ['SEO Audit & Strategy', 'Google Search Ads', 'Social Media Management', 'Brand Launch & Refresh'];

/** Content blocks that must stay inside the page shell at every width. */
const BLOCKS = ['.sl-compare', '.sl-framework-body', '.sl-funnel-list', '.sl-bento', '.sl-docs', '.sl-steps', '.sl-measure-grid', '.sl-faq-grid'];

for (const section of SAMPLES) {
  test(`${section} sections stay within the container across viewports`, async ({ page }) => {
    await page.goto(ROUTES[section]);
    await expect(page.locator('main.sl-page h1')).toBeVisible();

    for (const width of [1440, 1280, 1100, 960, 768, 480, 360]) {
      await page.setViewportSize({ width, height: 800 });
      const result = await page.evaluate((selectors) => {
        const overflowing = selectors.filter((selector) => {
          const el = document.querySelector(selector);
          const shell = el?.closest('.sl-shell')?.getBoundingClientRect();
          const box = el?.getBoundingClientRect();
          return !el || !shell || !box || box.left < shell.left - 2 || box.right > shell.right + 2;
        });
        return { overflowing, docOverflow: document.documentElement.scrollWidth > window.innerWidth };
      }, BLOCKS);

      expect(result.docOverflow, `horizontal scroll at ${width}px`).toBe(false);
      expect(result.overflowing, `blocks outside the container at ${width}px`).toEqual([]);
    }
  });
}

test('service detail pages expose a single H1, nine section headings and FAQ structured data', async ({ page }) => {
  await page.goto(ROUTES['Technical SEO']);
  await expect(page.locator('main h1')).toHaveCount(1);
  await expect(page.locator('main h2')).toHaveCount(9);

  const graph = await page.locator('main script[type="application/ld+json"]').evaluate((el) => JSON.parse(el.textContent!)['@graph']);
  expect(graph.map((node: { '@type': string }) => node['@type'])).toEqual(['Service', 'BreadcrumbList', 'FAQPage']);
  const faqCount = await page.locator('.sl-faq-item').count();
  expect(graph[2].mainEntity).toHaveLength(faqCount);
});

test('scope pillars switch with the tabs', async ({ page }) => {
  await page.goto(ROUTES['Digital Marketing Strategy']);
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(6);
  await expect(page.getByRole('tabpanel')).toHaveCount(1);

  await tabs.nth(3).click();
  await expect(tabs.nth(3)).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText(await tabs.nth(3).locator('.sl-tab-title').innerText());
});
