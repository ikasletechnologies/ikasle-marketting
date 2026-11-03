import { test, expect } from './fixtures';
import type { Page } from '@playwright/test';

async function fillContactForm(page: Page) {
  await page.locator('input[name="fullName"]').fill('Asha Raman');
  await page.locator('input[name="email"]').fill('asha@example.com');
  await page.locator('input[name="phone"]').fill('9876543210');
  await page.locator('input[name="company"]').fill('Example Academy');
  await page.locator('select[name="service"]').selectOption('SEO & Search Growth');
  await page.locator('select[name="budget"]').selectOption({ index: 2 });
  await page.locator('textarea[name="message"]').fill('We want more enquiries for our January intake.');
  await page.locator('input[name="privacy"]').check();
}

test('contact form submits the enquiry and shows confirmation', async ({ page }) => {
  let payload: Record<string, string> | undefined;
  await page.route('**/api/contact', async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, message: 'Enquiry sent successfully.' }) });
  });

  await page.goto('/contact');
  await fillContactForm(page);
  await page.locator('#contact-form').getByRole('button', { name: 'Send Enquiry' }).click();

  await expect(page.locator('#contact-form').getByRole('button', { name: 'Enquiry Sent' })).toBeVisible();
  expect(payload).toMatchObject({ fullName: 'Asha Raman', email: 'asha@example.com', service: 'SEO & Search Growth' });
  expect(payload?.budget).toContain('1,00,000');
});

test('contact form shows the server error message', async ({ page }) => {
  await page.route('**/api/contact', (route) =>
    route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ ok: false, message: 'We could not send your enquiry right now. Please try again.' }) }),
  );
  await page.goto('/contact');
  await fillContactForm(page);
  await page.locator('#contact-form').getByRole('button', { name: 'Send Enquiry' }).click();
  await expect(page.locator('#contact-form').getByRole('alert')).toHaveText('We could not send your enquiry right now. Please try again.');
});

test('contact form blocks submission when required fields are missing', async ({ page }) => {
  let called = false;
  await page.route('**/api/contact', (route) => {
    called = true;
    return route.abort();
  });
  await page.goto('/contact');
  await page.locator('#contact-form').getByRole('button', { name: 'Send Enquiry' }).click();
  await expect(page.locator('input[name="fullName"]')).toHaveJSProperty('validity.valid', false);
  expect(called).toBe(false);
});

test('browser validation rejects an invalid phone number and name (pattern attributes compile)', async ({ page }) => {
  let called = false;
  await page.route('**/api/contact', (route) => {
    called = true;
    return route.abort();
  });
  await page.goto('/contact');
  await fillContactForm(page);
  await page.locator('input[name="phone"]').fill('12345');
  await page.locator('input[name="fullName"]').fill('1nvalid');
  await page.locator('#contact-form').getByRole('button', { name: 'Send Enquiry' }).click();
  await expect(page.locator('input[name="phone"]')).toHaveJSProperty('validity.patternMismatch', true);
  await expect(page.locator('input[name="fullName"]')).toHaveJSProperty('validity.patternMismatch', true);
  expect(called).toBe(false);
});

test('the real API stores an enquiry even when email is not configured', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: { fullName: 'Ravi Kumar', email: 'ravi@example.com', budget: '₹50,000 - ₹1,00,000', message: 'E2E persistence check' },
  });
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({ ok: true });
});

test('the real API rejects invalid enquiries', async ({ request }) => {
  const response = await request.post('/api/contact', { data: { fullName: '1', email: 'nope', message: '' } });
  expect(response.status()).toBe(400);
});
