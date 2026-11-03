import { test, expect } from './fixtures';

// The rest of the suite runs with reduced motion; this covers the full WebGL/GSAP path.
test.use({ reducedMotion: 'no-preference' });
// Headless Chromium composites WebGL in software, so animated pages are slow here (not for real users).
test.describe.configure({ timeout: 120_000 });

for (const path of ['/', '/services', '/about']) {
  test(`animated page ${path} renders without errors`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator('main h1').first()).toBeVisible();
    await page.mouse.move(400, 300);
    await page.mouse.wheel(0, 1200);
    await page.waitForTimeout(500);
  });
}
