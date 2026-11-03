import { defineConfig, devices } from '@playwright/test';

const PORT = 4318;

/**
 * E2E suite (IKAS-504). Runs against the production build served by the real Node
 * server. The server is started WITHOUT .env, so tests never send real email or
 * use the NVIDIA key; submissions go to an isolated SQLite file under test-results/.
 * Run `npm run build` first (npm run test:e2e does both).
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  timeout: 45_000,
  // Headless Chromium renders WebGL in software; several workers animating it at once
  // starve the CPU. Two workers + reduced motion keep runs fast and deterministic, and
  // motion.spec.ts still exercises the full animated pages.
  workers: 2,
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    reducedMotion: 'reduce',
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] }, testIgnore: /mobile\.spec\.ts/ },
    { name: 'mobile', use: { ...devices['Pixel 7'] }, testMatch: /mobile\.spec\.ts/ },
  ],
  webServer: {
    command: 'node server/index.mjs --serve-static',
    url: `http://localhost:${PORT}/api/health`,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    env: {
      PORT: String(PORT),
      DATA_DIR: 'test-results/e2e-data',
      FORM_RATE_LIMIT: '1000',
      CHAT_RATE_LIMIT: '1000',
      CORS_ORIGIN: `http://localhost:${PORT}`,
    },
  },
});
