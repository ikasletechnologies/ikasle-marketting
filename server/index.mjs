import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import { openStore } from './lib/store.mjs';
import { createRateLimiter, clientIp } from './lib/rateLimit.mjs';
import { createJiraClient } from './lib/jira.mjs';
import { CHAT_SYSTEM_PROMPT } from './lib/chatPrompt.mjs';
import { createStaticHandler } from './lib/static.mjs';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const env = process.env;

const PORT = Number(env.PORT || 5000);
const SMTP_HOST = env.SMTP_HOST;
const SMTP_PORT = Number(env.SMTP_PORT || 587);
const SMTP_SECURE = env.SMTP_SECURE === 'true' || SMTP_PORT === 465;
const SMTP_USER = env.SMTP_USER;
const SMTP_PASS = env.SMTP_PASS;
const CONTACT_FROM = env.CONTACT_FROM || SMTP_USER;
const CONTACT_RECIPIENT = env.CONTACT_RECIPIENT || 'ikaslemarketing@gmail.com';
const CAREERS_RECIPIENT = env.CAREERS_RECIPIENT || CONTACT_RECIPIENT;
const NEWSLETTER_RECIPIENT = env.NEWSLETTER_RECIPIENT || CONTACT_RECIPIENT;
const CORS_ORIGIN = env.CORS_ORIGIN || 'http://localhost:3045';
const TRUST_PROXY = env.TRUST_PROXY === 'true';
const NVIDIA_API_KEY = env.NVIDIA_API_KEY;
const NVIDIA_API_URL = env.NVIDIA_API_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_MODEL = env.NVIDIA_MODEL || 'meta/llama-3.2-1b-instruct';
const NVIDIA_REASONING_BUDGET = Number(env.NVIDIA_REASONING_BUDGET || 64);
const NVIDIA_TIMEOUT_MS = Number(env.NVIDIA_TIMEOUT_MS || 15000);

// Chat abuse limits (IKAS-403).
const CHAT_RATE_LIMIT = Number(env.CHAT_RATE_LIMIT || 15);
const CHAT_MAX_MESSAGE_CHARS = Number(env.CHAT_MAX_MESSAGE_CHARS || 1000);
const CHAT_MAX_HISTORY_CHARS = 8000;
const CHAT_MAX_HISTORY_MESSAGES = 12;
const FORM_RATE_LIMIT = Number(env.FORM_RATE_LIMIT || 5);
const MAX_BODY_BYTES = 64 * 1024;

const DATA_DIR = path.resolve(projectRoot, env.DATA_DIR || 'server/data');
const DIST_DIR = path.resolve(projectRoot, env.DIST_DIR || 'dist');
const SERVE_STATIC = process.argv.includes('--serve-static') || (env.SERVE_STATIC ? env.SERVE_STATIC === 'true' : env.NODE_ENV === 'production');

const transporter = SMTP_HOST && SMTP_USER && SMTP_PASS && CONTACT_FROM
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

let store = null;
try {
  store = openStore(path.join(DATA_DIR, 'ikasle.db'));
} catch (error) {
  console.error('Submission storage is unavailable; continuing with email only:', error);
}

const jira = createJiraClient(env);
const chatLimiter = createRateLimiter({ limit: CHAT_RATE_LIMIT, windowMs: 60_000 });
const formLimiter = createRateLimiter({ limit: FORM_RATE_LIMIT, windowMs: 60_000 });
const serveStatic = SERVE_STATIC ? createStaticHandler(DIST_DIR) : null;
if (SERVE_STATIC && !serveStatic) console.warn(`SERVE_STATIC is on but ${DIST_DIR}/index.html was not found. Run "npm run build" first.`);

const apiHeaders = {
  'Access-Control-Allow-Origin': CORS_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

function sendJson(response, status, body, extraHeaders = {}) {
  response.writeHead(status, { ...apiHeaders, ...extraHeaders });
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let failed = false;
    request.on('data', (chunk) => {
      if (failed) return;
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        failed = true;
        reject(new HttpError(413, 'Request body is too large.'));
        request.resume();
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () => {
      if (failed) return;
      try {
        const parsed = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}');
        if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('not an object');
        resolve(parsed);
      } catch {
        reject(new HttpError(400, 'Invalid request body.'));
      }
    });
    request.on('error', reject);
  });
}

// Strips control characters (keeps newlines and tabs) and trims to a maximum length.
function text(value, maxLength = 2000) {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, maxLength);
}

function isValidEmail(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (/\s/.test(trimmed) || trimmed.length > 254) return false;
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(trimmed);
}

function isValidName(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length >= 2 && trimmed.length <= 120 && /^[A-Za-z\s]+$/.test(trimmed);
}

function isValidPhone(value) {
  if (!value || typeof value !== 'string') return true;
  const trimmed = value.trim();
  if (!trimmed) return true;
  if (/[^0-9+\s-]/.test(trimmed)) return false;
  const plusCount = (trimmed.match(/\+/g) || []).length;
  if (plusCount > 1 || (plusCount === 1 && !trimmed.startsWith('+'))) return false;
  let digits = trimmed;
  if (digits.startsWith('+91')) digits = digits.slice(3);
  else if (digits.startsWith('91') && digits.replace(/[\s-]/g, '').length === 12) digits = digits.slice(2);
  digits = digits.replace(/[\s-]/g, '');
  return /^[6-9]\d{9}$/.test(digits);
}

function isValidMessage(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length >= 20 && trimmed.length <= 5000 && !/^(.)\1{19,}$/.test(trimmed);
}

function isValidBudget(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length > 0 && trimmed !== 'Select a budget range';
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol);
  } catch {
    return false;
  }
}

function enforceLimit(limiter, request, response, message) {
  const verdict = limiter.check(clientIp(request, TRUST_PROXY));
  if (verdict.allowed) return true;
  sendJson(response, 429, { ok: false, message }, { 'Retry-After': String(verdict.retryAfterSeconds) });
  return false;
}

function saveSubmission(kind, record) {
  if (!store) return null;
  try {
    return store.saveSubmission(kind, record);
  } catch (error) {
    console.error(`Could not store ${kind} submission:`, error);
    return null;
  }
}

function markEmail(id, status, error) {
  if (store && id !== null) {
    try {
      store.markEmail(id, status, error);
    } catch (storeError) {
      console.error('Could not update submission email status:', storeError);
    }
  }
}

/**
 * Sends the internal notification (must succeed for status "sent") and then a
 * best-effort auto-reply. A bad visitor address must not turn a delivered
 * enquiry into an error, or the visitor resubmits and the team gets duplicates.
 */
async function deliver(id, internal, autoReply) {
  if (!transporter) {
    markEmail(id, 'not_configured');
    return false;
  }
  try {
    await transporter.sendMail(internal);
  } catch (error) {
    console.error('Notification email failed:', error);
    markEmail(id, 'failed', error?.message);
    return false;
  }
  markEmail(id, 'sent');
  transporter.sendMail(autoReply).catch((error) => console.error('Auto-reply email failed:', error));
  return true;
}

async function handleContact(request, response) {
  const body = await readBody(request);
  const enquiry = {
    fullName: text(body.fullName, 120),
    email: text(body.email, 254),
    phone: text(body.phone, 50),
    company: text(body.company, 160),
    service: text(body.service, 120),
    budget: text(body.budget, 120),
    message: text(body.message, 5000),
  };

  if (!isValidName(enquiry.fullName)) {
    sendJson(response, 400, { ok: false, message: 'Please provide a valid full name (letters and spaces only, minimum 2 characters).' });
    return;
  }
  if (!isValidEmail(enquiry.email)) {
    sendJson(response, 400, { ok: false, message: 'Please provide a valid email address (e.g. name@gmail.com).' });
    return;
  }
  if (!isValidPhone(enquiry.phone)) {
    sendJson(response, 400, { ok: false, message: 'Please provide a valid 10-digit Indian phone number (e.g. 9876543210).' });
    return;
  }
  if (!isValidBudget(enquiry.budget)) {
    sendJson(response, 400, { ok: false, message: 'Please select a valid budget range.' });
    return;
  }
  if (!isValidMessage(enquiry.message)) {
    sendJson(response, 400, { ok: false, message: 'Please provide a message with at least 20 characters.' });
    return;
  }

  const id = saveSubmission('contact', enquiry);

  if (jira.enabled && jira.isHighIntent(enquiry)) {
    jira.createLeadIssue(enquiry)
      .then((key) => {
        console.log(`Created Jira lead ${key}`);
        if (store && id !== null) store.markJira(id, key);
      })
      .catch((error) => console.error('Jira lead creation failed:', error.message));
  }

  const emailed = await deliver(
    id,
    {
      from: CONTACT_FROM,
      to: CONTACT_RECIPIENT,
      replyTo: enquiry.email,
      subject: `[Website enquiry] ${enquiry.fullName}`,
      text: [
        `Name: ${enquiry.fullName}`,
        `Email: ${enquiry.email}`,
        `Phone: ${enquiry.phone || 'Not provided'}`,
        `Company: ${enquiry.company || 'Not provided'}`,
        `Service: ${enquiry.service || 'Not provided'}`,
        `Budget: ${enquiry.budget || 'Not provided'}`,
        '',
        'Message:',
        enquiry.message,
      ].join('\n'),
    },
    {
      from: CONTACT_FROM,
      to: enquiry.email,
      subject: 'Thanks for contacting Ikasle Marketing',
      text: `Hi ${enquiry.fullName},\n\nThanks for reaching out to Ikasle Marketing. We received your enquiry and will get back to you shortly.\n\nRegards,\nIkasle Marketing`,
    },
  );

  if (emailed || id !== null) {
    sendJson(response, 200, { ok: true, message: 'Enquiry sent successfully.' });
  } else {
    sendJson(response, transporter ? 500 : 503, { ok: false, message: 'We could not send your enquiry right now. Please try again.' });
  }
}

async function handleCareers(request, response) {
  const body = await readBody(request);
  const application = {
    fullName: text(body.fullName, 120),
    email: text(body.email, 254),
    phone: text(body.phone, 50),
    experience: text(body.experience, 120),
    portfolio: text(body.portfolio, 300),
    availability: text(body.availability, 120),
    message: text(body.message, 5000),
  };

  const { fullName, email, phone, experience, portfolio, availability, message } = application;
  if (!isValidName(fullName) || !isValidEmail(email) || !phone || !isValidPhone(phone) || !experience || !availability || !message || (portfolio && !isValidUrl(portfolio))) {
    sendJson(response, 400, { ok: false, message: 'Please provide valid application details.' });
    return;
  }

  const id = saveSubmission('careers', application);
  const emailed = await deliver(
    id,
    {
      from: CONTACT_FROM,
      to: CAREERS_RECIPIENT,
      replyTo: email,
      subject: `[Careers application] Social Media Manager - ${fullName}`,
      text: [
        'Role: Social Media Manager',
        `Name: ${fullName}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Experience: ${experience}`,
        `Portfolio / LinkedIn: ${portfolio || 'Not provided'}`,
        `Availability: ${availability}`,
        '',
        'About the applicant:',
        message,
      ].join('\n'),
    },
    {
      from: CONTACT_FROM,
      to: email,
      subject: 'We received your Ikasle Marketing application',
      text: `Hi ${fullName},\n\nThanks for applying for the Social Media Manager role at Ikasle Marketing. We received your details and will review them shortly.\n\nRegards,\nIkasle Marketing`,
    },
  );

  if (emailed || id !== null) {
    sendJson(response, 200, { ok: true, message: 'Application sent successfully.' });
  } else {
    sendJson(response, transporter ? 500 : 503, { ok: false, message: 'We could not send your application right now. Please try again.' });
  }
}

async function handleNewsletter(request, response) {
  const body = await readBody(request);
  // Honeypot: real visitors never see or fill this field.
  if (text(body.website, 200)) {
    sendJson(response, 200, { ok: true, message: 'Thanks for subscribing.' });
    return;
  }
  const email = text(body.email, 254).toLowerCase();
  const source = text(body.source, 60);
  if (!isValidEmail(email)) {
    sendJson(response, 400, { ok: false, message: 'Please enter a valid email address.' });
    return;
  }
  if (!store) {
    sendJson(response, 503, { ok: false, message: 'Subscriptions are unavailable right now. Please try again later.' });
    return;
  }
  const isNew = store.addSubscriber(email, source);

  // Email the team and welcome the subscriber, only for new sign-ups (so repeats don't spam
  // anyone). Best-effort and not awaited: the subscription is already saved.
  if (isNew && transporter) {
    const placement = source || 'website';
    transporter
      .sendMail({
        from: CONTACT_FROM,
        to: NEWSLETTER_RECIPIENT,
        replyTo: email,
        subject: `[Newsletter] New subscriber: ${email}`,
        text: `A new visitor subscribed to the Ikasle Marketing newsletter.\n\nEmail: ${email}\nSigned up from: ${placement}\nTime: ${new Date().toISOString()}\n\nExport all subscribers with: npm run export:submissions -- subscribers`,
      })
      .catch((error) => console.error('Newsletter notification email failed:', error));
    transporter
      .sendMail({
        from: CONTACT_FROM,
        to: email,
        subject: 'You are subscribed to Ikasle Marketing growth notes',
        text: `Hi,\n\nThanks for subscribing to Ikasle Marketing. Once a month we'll send practical ideas on digital marketing, social media, SEO and student growth.\n\nIf you didn't sign up, just reply to this email and we'll remove you.\n\nRegards,\nIkasle Marketing`,
      })
      .catch((error) => console.error('Newsletter welcome email failed:', error));
  }

  // Same reply for new and existing subscribers so the endpoint can't be used to probe the list.
  sendJson(response, 200, { ok: true, message: 'Thanks for subscribing.' });
}

async function handleChat(request, response) {
  if (!NVIDIA_API_KEY) {
    sendJson(response, 503, { ok: false, message: 'Chat service is not configured yet.' });
    return;
  }

  const body = await readBody(request);
  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const valid = incoming.filter(
    (message) => message && (message.role === 'user' || message.role === 'assistant') && typeof message.content === 'string',
  );
  const last = valid[valid.length - 1];
  if (!last || last.role !== 'user' || !text(last.content)) {
    sendJson(response, 400, { ok: false, message: 'Please send a valid chat message.' });
    return;
  }
  if (last.content.trim().length > CHAT_MAX_MESSAGE_CHARS) {
    sendJson(response, 400, { ok: false, message: `Please keep your message under ${CHAT_MAX_MESSAGE_CHARS} characters.` });
    return;
  }

  // Keep the most recent turns within both a message and a character budget.
  const messages = [];
  let budget = CHAT_MAX_HISTORY_CHARS;
  for (let i = valid.length - 1; i >= 0 && messages.length < CHAT_MAX_HISTORY_MESSAGES; i -= 1) {
    const content = text(valid[i].content, 2000);
    if (!content) continue;
    if (content.length > budget) break;
    budget -= content.length;
    messages.unshift({ role: valid[i].role, content });
  }

  const nvidiaResponse = await fetchChatCompletion(messages);
  if (!nvidiaResponse) {
    sendJson(response, 502, { ok: false, message: 'The assistant is unavailable right now. Please try again.' });
    return;
  }
  const data = await nvidiaResponse.json().catch(() => ({}));

  if (!nvidiaResponse.ok) {
    console.error('NVIDIA chat request failed:', nvidiaResponse.status, data?.detail || data?.message || 'Unknown error');
    sendJson(response, 502, { ok: false, message: 'The assistant is unavailable right now. Please try again.' });
    return;
  }

  const answer = text(data?.choices?.[0]?.message?.content, 4000);
  if (!answer) {
    sendJson(response, 502, { ok: false, message: 'The assistant returned an empty response.' });
    return;
  }
  sendJson(response, 200, { ok: true, message: answer });
}

/** Resolves to the upstream Response, or null when the network call itself failed. Timeouts are rethrown (→ 504). */
async function fetchChatCompletion(messages) {
  try {
    return await fetch(NVIDIA_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        model: NVIDIA_MODEL,
        messages: [{ role: 'system', content: CHAT_SYSTEM_PROMPT }, ...messages],
        temperature: 0.3,
        max_tokens: 600,
        reasoning_budget: NVIDIA_REASONING_BUDGET,
        stream: false,
      }),
      signal: AbortSignal.timeout(NVIDIA_TIMEOUT_MS),
    });
  } catch (error) {
    if (error?.name === 'TimeoutError' || error?.name === 'AbortError') throw error;
    console.error('NVIDIA chat request could not be sent:', error?.cause?.message || error?.message);
    return null;
  }
}

const POST_ROUTES = {
  '/api/contact': { handler: handleContact, limiter: formLimiter, limitMessage: 'Too many submissions. Please wait a minute and try again.' },
  '/api/careers': { handler: handleCareers, limiter: formLimiter, limitMessage: 'Too many submissions. Please wait a minute and try again.' },
  '/api/newsletter': { handler: handleNewsletter, limiter: formLimiter, limitMessage: 'Too many attempts. Please wait a minute and try again.' },
  '/api/chat': { handler: handleChat, limiter: chatLimiter, limitMessage: 'You are sending messages too quickly. Please wait a moment and try again.' },
};

const server = http.createServer(async (request, response) => {
  let pathname;
  try {
    pathname = new URL(request.url || '/', 'http://localhost').pathname.replace(/\/+$/, '') || '/';
  } catch {
    sendJson(response, 400, { ok: false, message: 'Bad request.' });
    return;
  }

  if (pathname === '/api' || pathname.startsWith('/api/')) {
    if (request.method === 'OPTIONS') {
      response.writeHead(204, apiHeaders);
      response.end();
      return;
    }

    if (pathname === '/api/health' && request.method === 'GET') {
      sendJson(response, 200, {
        ok: true,
        email: Boolean(transporter),
        storage: Boolean(store),
        chat: Boolean(NVIDIA_API_KEY),
        jira: jira.enabled,
      });
      return;
    }

    const route = POST_ROUTES[pathname];
    if (!route) {
      sendJson(response, 404, { ok: false, message: 'Not found.' });
      return;
    }
    if (request.method !== 'POST') {
      sendJson(response, 405, { ok: false, message: 'Method not allowed.' }, { Allow: 'POST, OPTIONS' });
      return;
    }
    if (!enforceLimit(route.limiter, request, response, route.limitMessage)) return;

    try {
      await route.handler(request, response);
    } catch (error) {
      if (response.headersSent) return;
      if (error instanceof HttpError) {
        sendJson(response, error.status, { ok: false, message: error.message });
      } else if (error?.name === 'TimeoutError' || error?.name === 'AbortError') {
        sendJson(response, 504, { ok: false, message: 'The service took too long to respond. Please try again.' });
      } else {
        console.error(`Request to ${pathname} failed:`, error);
        sendJson(response, 500, { ok: false, message: 'Something went wrong. Please try again.' });
      }
    }
    return;
  }

  if (serveStatic && (request.method === 'GET' || request.method === 'HEAD')) {
    serveStatic(request, response, pathname);
    return;
  }

  sendJson(response, 404, { ok: false, message: 'Not found.' });
});

server.listen(PORT, () => {
  console.log(`Ikasle server listening on http://localhost:${PORT}`);
  console.log(`  email: ${transporter ? 'on' : 'off'} | storage: ${store ? 'on' : 'off'} | chat: ${NVIDIA_API_KEY ? 'on' : 'off'} | jira: ${jira.enabled ? 'on' : 'off'} | static: ${serveStatic ? DIST_DIR : 'off'}`);
});

function shutdown() {
  server.close(() => {
    store?.close();
    process.exit(0);
  });
  setTimeout(() => process.exit(0), 5000).unref();
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
