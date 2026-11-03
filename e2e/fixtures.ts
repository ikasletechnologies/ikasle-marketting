import { test as base, expect } from '@playwright/test';

/**
 * Fails any test whose page logs a console error or throws an uncaught exception,
 * so broken pages can't pass just because an element happened to render.
 * Requests to third-party font CDNs are ignored (offline CI runners).
 */
export const test = base.extend<{ pageErrors: string[] }>({
  pageErrors: [
    async ({ page }, use) => {
      // Keep the suite hermetic and fast: third-party fonts would otherwise hold up the
      // load event (or hang on offline runners). The site falls back to system fonts.
      await page.route(/fonts\.(googleapis|gstatic)\.com/, (route) => route.abort());
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
      page.on('console', (message) => {
        if (message.type() !== 'error') return;
        const text = message.text();
        if (/fonts\.(googleapis|gstatic)\.com/.test(text) || /Failed to load resource/.test(text)) return;
        errors.push(`console: ${text}`);
      });
      await use(errors);
      expect(errors, 'page logged errors').toEqual([]);
    },
    { auto: true },
  ],
});

export { expect };
