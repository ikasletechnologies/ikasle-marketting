import { test, expect } from './fixtures';
import type { Page } from '@playwright/test';
import { JOBS, isAcceptingApplications, jobPath } from '../src/content/careers/jobs';

const openJobs = JOBS.filter((job) => isAcceptingApplications(job));
const pdf = { name: 'resume.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\n1 0 obj<<>>endobj\ntrailer<<>>\n%%EOF\n') };

async function fillApplication(page: Page, email: string, resume: typeof pdf = pdf) {
  await page.fill('#cj-fullName', 'Test Applicant');
  await page.fill('#cj-email', email);
  await page.fill('#cj-phone', '+91 98765 43210');
  await page.fill('#cj-location', 'Coimbatore');
  await page.selectOption('#cj-experience', '3–5 years');
  await page.selectOption('#cj-noticePeriod', '30 days');
  await page.fill('#cj-coverLetter', 'I have several years of relevant experience and would love to contribute to this team.');
  await page.setInputFiles('.cj-drop input', resume);
  await page.locator('.cj-consent input').check();
}

test('careers listing shows open jobs, filters them and paginates', async ({ page }) => {
  await page.goto('/careers');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Build your future');
  await expect(page.locator('.cj-results-head p')).toHaveText(`${openJobs.length} open positions`);
  const cards = page.locator('.cj-card');
  await expect(cards).toHaveCount(Math.min(6, openJobs.length));

  if (openJobs.length > 6) {
    await page.getByRole('button', { name: /Load more positions/ }).click();
    await expect(cards).toHaveCount(openJobs.length);
  }

  await page.getByLabel('Search jobs').fill('google ads');
  await expect(cards).toHaveCount(1);
  await expect(cards.first()).toContainText('Google Ads Expert');

  await page.getByLabel('Search jobs').fill('no-such-role');
  await expect(page.getByRole('heading', { name: 'No jobs match your search' })).toBeVisible();
  await page.getByRole('button', { name: 'Clear all filters' }).click();

  await page.getByLabel('Filter by department').selectOption('Social Media');
  const social = openJobs.filter((job) => job.department === 'Social Media').length;
  await expect(cards).toHaveCount(social);
  await page.getByRole('button', { name: 'Clear filters' }).click();
  await expect(page.locator('.cj-results-head p')).toHaveText(`${openJobs.length} open positions`);
});

test('View Details opens the job page with full content and SEO data', async ({ page }) => {
  await page.goto('/careers');
  await page.locator('.cj-card', { hasText: 'Google Ads Expert' }).getByRole('link', { name: /View details/ }).click();
  await expect(page).toHaveURL(jobPath('google-ads-expert'));
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Google Ads Expert');
  for (const heading of ['About the role', 'Key responsibilities', 'Required skills', 'Qualifications', 'Preferred skills', 'What we offer']) {
    await expect(page.getByRole('heading', { level: 2, name: heading })).toBeVisible();
  }
  await expect(page.locator('.cj-overview')).toContainText('IKS-PER-001');
  await expect(page).toHaveTitle(/Google Ads Expert .* Careers at IKASLĒ Marketing/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/careers\/jobs\/google-ads-expert$/);
  const schema = await page.locator('script#ikasle-seo-schema').textContent();
  expect(schema).toContain('"JobPosting"');

  await page.getByRole('link', { name: 'Back to All Jobs' }).click();
  await expect(page).toHaveURL('/careers');
});

test('job pages ship their own meta and JobPosting data in the HTML', async ({ request }) => {
  const html = await (await request.get(jobPath('video-editor'))).text();
  expect(html).toContain('<title>Video Editor – Coimbatore | Careers at IKASLĒ Marketing</title>');
  expect(html).toContain('"@type":"JobPosting"');
});

test('unknown job slugs show a not-found state', async ({ page }) => {
  const response = await page.goto('/careers/jobs/not-a-real-job');
  expect(response?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: /couldn’t find that job/ })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('application form validates required fields, email, phone and resume type', async ({ page }) => {
  await page.goto(jobPath('graphic-designer'));
  await page.getByRole('button', { name: /Submit Application/ }).click();
  await expect(page.locator('#cj-fullName-error')).toBeVisible();
  await expect(page.locator('#cj-fullName')).toBeFocused();
  await expect(page.locator('#cj-resume-error')).toHaveText(/upload your resume/i);

  await page.fill('#cj-email', 'not-an-email');
  await page.fill('#cj-phone', '12345');
  await page.setInputFiles('.cj-drop input', { name: 'resume.png', mimeType: 'image/png', buffer: Buffer.from('png') });
  await page.getByRole('button', { name: /Submit Application/ }).click();
  await expect(page.locator('#cj-email-error')).toContainText('valid email');
  await expect(page.locator('#cj-phone-error')).toContainText('Indian mobile');
  await expect(page.locator('#cj-resume-error')).toContainText('PDF, DOC or DOCX');
  await expect(page.locator('#cj-position')).toHaveValue('Graphic Designer (IKS-DES-002)');
});

test('application submits with a resume and blocks a duplicate for the same job', async ({ page }) => {
  const email = `applicant-${Date.now()}@example.com`;
  await page.goto(`${jobPath('video-editor')}#apply`);
  await fillApplication(page, email);
  await page.getByRole('button', { name: /Submit Application/ }).click();
  await expect(page.getByRole('heading', { name: 'Application submitted' })).toBeVisible();

  await page.reload();
  await fillApplication(page, email.toUpperCase());
  await page.getByRole('button', { name: /Submit Application/ }).click();
  await expect(page.locator('.cj-form-alert')).toContainText('already applied');
});

test('the server rejects a resume whose contents are not a real document', async ({ page }) => {
  await page.goto(jobPath('social-media-manager'));
  // Passes the client's extension check; the server inspects the file signature.
  await fillApplication(page, `fake-file-${Date.now()}@example.com`, { ...pdf, buffer: Buffer.from('not really a pdf') });
  await page.getByRole('button', { name: /Submit Application/ }).click();
  await expect(page.locator('.cj-form-alert')).toContainText('does not look like a valid');
});
