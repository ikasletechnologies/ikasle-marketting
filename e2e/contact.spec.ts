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

test('email and phone contact methods open native applications', async ({ page }) => {
  await page.goto('/contact');

  await expect(page.getByRole('link', { name: 'Email Us: ikaslemarketing@gmail.com' }))
    .toHaveAttribute('href', 'mailto:ikaslemarketing@gmail.com');
  await expect(page.getByRole('link', { name: 'Call Us: +91 78451 32962' }))
    .toHaveAttribute('href', 'tel:+917845132962');
});
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

test('contact form shows inline validation errors for screenshot edge cases on blur and submit', async ({ page }) => {
  await page.goto('/contact');

  // 1. Full name with numbers
  const nameInput = page.locator('input[name="fullName"]');
  await nameInput.fill('356536536398');
  await nameInput.blur();
  await expect(page.locator('#fullName-error')).toBeVisible();
  await expect(page.locator('#fullName-error')).toContainText('letters and spaces');

  // 2. Email with trailing space and numbers
  const emailInput = page.locator('input[name="email"]');
  await emailInput.fill('27467852@gmail.com 657347453');
  await emailInput.blur();
  await expect(page.locator('#email-error')).toBeVisible();
  await expect(page.locator('#email-error')).toContainText('single valid email address');

  // 3. Phone number with invalid characters / symbols
  const phoneInput = page.locator('input[name="phone"]');
  await phoneInput.fill('45386+98+/96+/');
  await phoneInput.blur();
  await expect(page.locator('#phone-error')).toBeVisible();
  await expect(page.locator('#phone-error')).toContainText('Phone number');

  // 4. Message shorter than 20 characters
  const messageInput = page.locator('textarea[name="message"]');
  await messageInput.fill('Too short');
  await messageInput.blur();
  await expect(page.locator('#message-error')).toBeVisible();
  await expect(page.locator('#message-error')).toContainText('at least 20 characters');

  // 5. Correcting inputs clears errors
  await nameInput.fill('Asha Raman');
  await expect(page.locator('#fullName-error')).toBeHidden();

  await emailInput.fill('asha@gmail.com');
  await expect(page.locator('#email-error')).toBeHidden();

  await phoneInput.fill('9876543210');
  await expect(page.locator('#phone-error')).toBeHidden();

  await messageInput.fill('This is a detailed enquiry that exceeds twenty characters easily.');
  await expect(page.locator('#message-error')).toBeHidden();
});
