import fs from 'node:fs';
import { test, expect } from './fixtures';

test('lead pipeline filters by channel and status and exports matching rows', async ({ page }) => {
  await page.goto('/dashboard/leads');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
  const rows = page.locator('.dash-leads-table tbody tr');
  const total = await rows.count();
  expect(total).toBeGreaterThan(10);

  await page.getByLabel('Channel').selectOption('Campus Referral');
  const campusCount = await rows.count();
  expect(campusCount).toBeGreaterThan(0);
  expect(campusCount).toBeLessThan(total);
  for (const text of await rows.locator('td[data-label="Channel"]').allTextContents()) expect(text).toBe('Campus Referral');

  // Every status label from the ticket is available.
  const statusOptions = await page.getByLabel('Status').locator('option').allTextContents();
  expect(statusOptions).toEqual(['All statuses', 'New Lead', 'In Contact', 'Interview Scheduled', 'Enrolled', 'Lost']);

  const scores = await rows.locator('.dash-score b').allTextContents();
  for (const score of scores) {
    expect(Number(score)).toBeGreaterThanOrEqual(0);
    expect(Number(score)).toBeLessThanOrEqual(100);
  }

  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: /Export CSV/ }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^ikasle-leads-\d{4}-\d{2}-\d{2}\.csv$/);
  const csv = fs.readFileSync((await download.path())!, 'utf8').replace(/^﻿/, '');
  const lines = csv.trim().split(/\r\n/);
  expect(lines[0]).toBe('Lead ID,Student name,Email,Phone,Course interest,Channel,Status,Lead score,Counsellor,Received,Last contacted');
  expect(lines).toHaveLength(campusCount + 1);
  // Phone numbers start with "+", so they are neutralised against formula injection.
  expect(lines[1]).toContain(",'+91 ");
});

test('lead search shows an empty state that can be reset', async ({ page }) => {
  await page.goto('/dashboard/leads');
  await page.getByRole('searchbox').fill('no-such-student-xyz');
  await expect(page.getByRole('heading', { name: 'No leads match these filters.' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Export CSV/ })).toBeDisabled();
  await page.getByRole('button', { name: 'Reset filters' }).click();
  await expect(page.locator('.dash-leads-table tbody tr').first()).toBeVisible();
});

test('campaign dashboard shows KPIs, pacing and a chart with a table view', async ({ page }) => {
  await page.goto('/dashboard/campaigns');
  await expect(page.getByRole('heading', { name: 'Cost per lead' })).toBeVisible();
  await expect(page.locator('.dash-tile-value').first()).toContainText('₹');
  await expect(page.getByRole('meter').first()).toBeVisible();

  const weeks = page.locator('.wk-hit');
  await expect(weeks).toHaveCount(8);
  await weeks.nth(3).hover();
  await expect(page.locator('.wk-tooltip')).toContainText('Leads');

  await page.getByRole('button', { name: 'Table', exact: true }).click();
  await expect(page.locator('.wk-table tbody tr')).toHaveCount(8);

  const before = await page.locator('.dash-num-table tbody tr').count();
  await page.getByLabel('Channel').selectOption('Meta');
  const after = await page.locator('.dash-num-table tbody tr').count();
  expect(after).toBeLessThan(before);
  for (const text of await page.locator('.dash-num-table td[data-label="Channel"]').allTextContents()) expect(text).toBe('Meta');
});

test('dashboard tabs switch between pipeline and campaigns', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Student lead pipeline');
  await page.getByRole('link', { name: 'Campaign performance' }).click();
  await expect(page).toHaveURL('/dashboard/campaigns');
});
