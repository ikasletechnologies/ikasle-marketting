import { test, expect } from './fixtures';
import { ROUTES } from '../src/routes';

/**
 * Every service detail page is built on the shared landing template, which ends with a
 * "Related services" list. Each category's content is its own lazy chunk, so one page per
 * category is opened directly: styles must not depend on another page loading first.
 */
const SAMPLES = [
  ['Meta Advertising', ROUTES['Meta Advertising']],
  ['Reels & Short-Form Video', ROUTES['Reels & Short-Form Video']],
  ['Local SEO', ROUTES['Local SEO']],
  ['Logo & Visual Identity', ROUTES['Logo & Visual Identity']],
] as const;

const relatedRows = async (page: import('@playwright/test').Page, path: string) => {
  await page.goto(path);
  const rows = page.locator('.sl-related-row');
  await rows.first().scrollIntoViewIfNeeded();
  await expect(rows).toHaveCount(4);
  return rows;
};

for (const [name, path] of SAMPLES) {
  test(`related services are styled on a direct visit to ${name}`, async ({ page }) => {
    const rows = await relatedRows(page, path);
    const styles = await rows.first().evaluate((row) => ({
      display: getComputedStyle(row).display,
      cursor: getComputedStyle(row).cursor,
      title: getComputedStyle(row.querySelector('.sl-related-text b')!).display,
      arrowRadius: getComputedStyle(row.querySelector('.sl-related-go')!).borderRadius,
    }));
    expect(styles).toEqual({ display: 'grid', cursor: 'pointer', title: 'block', arrowRadius: '50%' });
  });

  test(`related services on ${name} open the right page and Back returns`, async ({ page }) => {
    const rows = await relatedRows(page, path);
    const title = (await rows.nth(1).locator('.sl-related-text b').textContent())!.trim();
    const target = ROUTES[title];
    expect(target, `"${title}" should be a known route`).toBeTruthy();

    await rows.nth(1).click();
    await expect(page).toHaveURL(target);
    await expect(page.locator('main h1').first()).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(path);
    await expect(page.locator('.sl-related-row')).toHaveCount(4);
  });
}

test('related services work from the keyboard', async ({ page }) => {
  const rows = await relatedRows(page, ROUTES['Meta Advertising']);
  const title = (await rows.first().locator('.sl-related-text b').textContent())!.trim();
  await rows.first().focus();
  await expect(rows.first()).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(ROUTES[title]);
});

test('related services fit at each breakpoint without overflow', async ({ page }) => {
  const rows = await relatedRows(page, ROUTES['Meta Advertising']);
  for (const width of [1280, 960, 640, 360]) {
    await page.setViewportSize({ width, height: 800 });
    const overflow = await rows.evaluateAll((items) => {
      const shell = items[0].closest('.sl-shell')!.getBoundingClientRect();
      return items.some((item) => {
        const box = item.getBoundingClientRect();
        return box.left < shell.left - 1 || box.right > shell.right + 1;
      });
    });
    expect(overflow, `rows overflow at ${width}px`).toBe(false);
  }
});
