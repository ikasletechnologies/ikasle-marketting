import { test, expect } from './fixtures';
import type { Locator, Page } from '@playwright/test';

/**
 * The "Related services" cards are shared by the digital detail pages. Each page is
 * lazy-loaded, so these tests open pages directly: the styles must not depend on another
 * page's stylesheet having been loaded earlier in the session.
 */
const BASE = '/services/digital-marketing';
const META_PATH = `${BASE}/meta-advertising`;
const DIGITAL_PAGES = [
  ['Meta Advertising', META_PATH],
  ['Audience & Competitor Research', `${BASE}/audience-competitor-research`],
  ['Google Search Ads', `${BASE}/google-search-ads`],
  ['Display & YouTube Advertising', `${BASE}/display-youtube-advertising`],
  ['Content Marketing', `${BASE}/content-marketing`],
  ['Email Marketing', `${BASE}/email-marketing`],
  ['Lead Generation & Nurturing', `${BASE}/lead-generation-nurturing`],
  ['Landing Pages & CRO', `${BASE}/landing-pages-cro`],
  ['Analytics & Conversion Tracking', `${BASE}/analytics-conversion-tracking`],
] as const;

const openRelated = async (page: Page, path: string) => {
  await page.goto(path);
  const grid = page.locator('.related-grid');
  await grid.scrollIntoViewIfNeeded();
  await expect(grid.locator('article').first()).toBeVisible();
  return grid;
};

const columnCount = (grid: Locator) =>
  grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);

for (const [name, path] of DIGITAL_PAGES) {
  test(`related services are styled on a direct visit to ${name}`, async ({ page }) => {
    const grid = await openRelated(page, path);

    const styles = await grid.evaluate((el) => {
      const article = el.querySelector('article')!;
      const articleStyle = getComputedStyle(article);
      const icon = getComputedStyle(article.querySelector(':scope > svg')!);
      const button = getComputedStyle(article.querySelector('button')!);
      return {
        gridDisplay: getComputedStyle(el).display,
        articleDisplay: articleStyle.display,
        articleBorder: articleStyle.borderTopWidth,
        articleBackground: articleStyle.backgroundColor,
        iconRadius: icon.borderRadius,
        buttonDisplay: button.display,
        buttonBorder: button.borderTopWidth,
      };
    });

    expect(styles).toEqual({
      gridDisplay: 'grid',
      articleDisplay: 'flex',
      articleBorder: '1px',
      articleBackground: 'rgb(255, 255, 255)',
      iconRadius: '50%',
      buttonDisplay: 'flex',
      buttonBorder: '0px',
    });
  });
}

test('Meta related services lay out as three aligned cards on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  const grid = await openRelated(page, META_PATH);
  await expect(grid.locator('article')).toHaveCount(3);
  expect(await columnCount(grid)).toBe(3);

  const geometry = await grid.locator('article').evaluateAll((cards) => cards.map((card) => {
    const box = card.getBoundingClientRect();
    const icon = card.querySelector(':scope > svg')!.getBoundingClientRect();
    const copy = card.querySelector(':scope > div')!.getBoundingClientRect();
    const button = card.querySelector('button')!.getBoundingClientRect();
    const arrow = card.querySelector('button svg')!.getBoundingClientRect();
    return {
      top: Math.round(box.top),
      height: Math.round(box.height),
      buttonBottom: Math.round(button.bottom),
      iconBeforeCopy: icon.right <= copy.left,
      arrowInsideButton: arrow.top >= button.top && arrow.bottom <= button.bottom,
    };
  }));

  // Same row and height, with every "View Service" link on one baseline.
  for (const key of ['top', 'height', 'buttonBottom'] as const) {
    expect(new Set(geometry.map((card) => card[key])).size, key).toBe(1);
  }
  for (const card of geometry) {
    expect(card.iconBeforeCopy).toBe(true);
    expect(card.arrowInsideButton).toBe(true);
  }
});

test('Meta related services fit at each breakpoint without overflow', async ({ page }) => {
  await page.goto(META_PATH);
  const grid = page.locator('.related-grid');
  for (const [width, columns] of [[1280, 3], [901, 3], [900, 2], [621, 2], [620, 1], [360, 1]] as const) {
    await page.setViewportSize({ width, height: 800 });
    await expect.poll(() => columnCount(grid), `columns at ${width}px`).toBe(columns);
    const overflow = await grid.evaluate((el) => {
      const shell = el.parentElement!.getBoundingClientRect();
      const box = el.getBoundingClientRect();
      return {
        left: box.left < shell.left - 1,
        right: box.right > shell.right + 1,
        scroll: el.scrollWidth > el.clientWidth,
      };
    });
    expect(overflow, `overflow at ${width}px`).toEqual({ left: false, right: false, scroll: false });
  }
});

test('Meta related services look the same after visiting Audience Research in-app', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  const grid = await openRelated(page, META_PATH);
  const snapshot = () => grid.locator('article').first().evaluate((card) => {
    const box = card.getBoundingClientRect();
    return { width: box.width, height: box.height, font: getComputedStyle(card.querySelector('p')!).fontSize };
  });
  const before = await snapshot();

  // Client-side navigation keeps the Audience Research stylesheet loaded on the way back.
  await page.evaluate((path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }, `${BASE}/audience-competitor-research`);
  await expect(page.locator('main.research-page, .strategy-page h1').first()).toBeAttached();
  await expect(page).toHaveURL(/audience-competitor-research$/);
  await expect(page.locator('.research-related')).toBeAttached();
  await page.goBack();
  await expect(page).toHaveURL(new RegExp(`${META_PATH}$`));
  await expect(page.locator('.meta-related')).toBeAttached();
  await grid.scrollIntoViewIfNeeded();
  await expect(grid.locator('article').first()).toBeVisible();
  expect(await snapshot()).toEqual(before);
});

// Navigation must keep working exactly as it did before the styling fix.
const META_RELATED = [
  ['Creative Posts & Carousels', /\/services\/social-media-marketing\/creative-posts$/],
  ['Landing Pages & CRO', /\/services\/digital-marketing\/landing-pages-cro$/],
  ['Analytics & Conversion Tracking', /\/services\/digital-marketing\/analytics-conversion-tracking$/],
] as const;

for (const [title, expected] of META_RELATED) {
  test(`Meta "View Service" opens ${title} and Back returns`, async ({ page }) => {
    const grid = await openRelated(page, META_PATH);
    await grid.locator('article', { hasText: title }).getByRole('button', { name: 'View Service' }).click();
    await expect(page).toHaveURL(expected);
    await expect(page.locator('main h1').first()).toBeVisible();
    await page.goBack();
    await expect(page).toHaveURL(new RegExp(`${META_PATH}$`));
    await expect(page.locator('.meta-related')).toBeAttached();
  });

  test(`clicking the Meta card body opens ${title}`, async ({ page }) => {
    const grid = await openRelated(page, META_PATH);
    await grid.locator('article', { hasText: title }).locator('h3').click();
    await expect(page).toHaveURL(expected);
  });
}

test('Meta "View Service" works from the keyboard', async ({ page }) => {
  const grid = await openRelated(page, META_PATH);
  const button = grid.locator('article', { hasText: 'Landing Pages & CRO' }).getByRole('button', { name: 'View Service' });
  await button.focus();
  await expect(button).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/\/landing-pages-cro$/);
});
