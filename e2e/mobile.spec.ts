import { test, expect } from './fixtures';

test('mobile menu opens, expands services and navigates', async ({ page }) => {
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Toggle navigation' });
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');

  await page.getByRole('button', { name: 'Toggle services menu' }).click();
  await page.getByRole('button', { name: 'Toggle Social Media Marketing services' }).click();
  await page.getByRole('button', { name: 'Reels & Short-Form Video' }).click();

  await expect(page).toHaveURL('/services/social-media-marketing/reels-short-form-video');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
});

test('blog and dashboards fit the phone width without horizontal scroll', async ({ page }) => {
  for (const path of ['/blogs', '/blogs/local-seo-for-coaching-centres', '/dashboard/leads', '/dashboard/campaigns']) {
    await page.goto(path);
    await expect(page.locator('main h1').first()).toBeVisible();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, `${path} scrolls sideways`).toBeLessThanOrEqual(1);
  }
});
