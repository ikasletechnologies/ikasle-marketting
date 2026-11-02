import http from 'node:http';
import nodemailer from 'nodemailer';

const PORT = Number(process.env.PORT || 5000);
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = Number(process.env.SMTP_PORT || 587);
const SMTP_SECURE = process.env.SMTP_SECURE === 'true' || SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const CONTACT_FROM = process.env.CONTACT_FROM || SMTP_USER;
const CONTACT_RECIPIENT = process.env.CONTACT_RECIPIENT || 'ikaslemarketing@gmail.com';
const CAREERS_RECIPIENT = process.env.CAREERS_RECIPIENT || CONTACT_RECIPIENT;
const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:3045';
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
const NVIDIA_API_URL = process.env.NVIDIA_API_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';
const NVIDIA_MODEL = process.env.NVIDIA_MODEL || 'meta/llama-3.2-1b-instruct';
const NVIDIA_REASONING_BUDGET = Number(process.env.NVIDIA_REASONING_BUDGET || 64);
const NVIDIA_TIMEOUT_MS = Number(process.env.NVIDIA_TIMEOUT_MS || 15000);

const transporter = SMTP_HOST && SMTP_USER && SMTP_PASS
  ? nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    })
  : null;

const headers = {
  'Access-Control-Allow-Origin': CORS_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json; charset=utf-8',
};

function sendJson(response, status, body) {
  response.writeHead(status, headers);
  response.end(JSON.stringify(body));
}

function readBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';
    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      body += chunk;
      if (body.length > 1_000_000) {
        reject(new Error('Request body is too large.'));
        request.destroy();
      }
    });
    request.on('end', () => {
      try {
        resolve(JSON.parse(body || '{}'));
      } catch {
        reject(new Error('Invalid request body.'));
      }
    });
    request.on('error', reject);
  });
}

function text(value, maxLength = 2000) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && !/[\r\n]/.test(value);
}

function isValidName(value) {
  return /^[A-Za-z][A-Za-z .'-]{1,119}$/.test(value);
}

function isValidPhone(value) {
  return !value || /^(?:\+91[\s-]?)?[6-9][0-9]{9}$/.test(value);
}

function isValidUrl(value) {
  try {
    const url = new URL(value);
    return ['http:', 'https:'].includes(url.protocol) && !/[\r\n]/.test(value);
  } catch {
    return false;
  }
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    response.writeHead(204, headers);
    response.end();
    return;
  }

  if (request.method !== 'POST' || !['/api/contact', '/api/careers', '/api/chat'].includes(request.url)) {
    sendJson(response, 404, { ok: false, message: 'Not found.' });
    return;
  }

  if (request.url === '/api/chat') {
    if (!NVIDIA_API_KEY) {
      sendJson(response, 503, { ok: false, message: 'Chat service is not configured yet.' });
      return;
    }

    try {
      const body = await readBody(request);
      const incomingMessages = Array.isArray(body.messages) ? body.messages : [];
      const messages = incomingMessages
        .filter((message) => message && (message.role === 'user' || message.role === 'assistant') && typeof message.content === 'string')
        .map((message) => ({ role: message.role, content: text(message.content, 4000) }))
        .filter((message) => message.content)
        .slice(-12);

      if (!messages.length || messages[messages.length - 1].role !== 'user') {
        sendJson(response, 400, { ok: false, message: 'Please send a valid chat message.' });
        return;
      }

      const nvidiaResponse = await fetch(NVIDIA_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${NVIDIA_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          model: NVIDIA_MODEL,
          messages: [
            {
              role: 'system',
              content: 'You are the helpful Ikasle Marketing website assistant. Explain our digital marketing, social media, SEO and branding services clearly and briefly. Do not invent pricing, guarantees or company facts. If a visitor wants a quote or has a detailed project, direct them to the Contact page.',
            },
            ...messages,
          ],
          temperature: 0.3,
          max_tokens: 600,
          reasoning_budget: NVIDIA_REASONING_BUDGET,
          stream: false,
        }),
        signal: AbortSignal.timeout(NVIDIA_TIMEOUT_MS),
      });
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
    } catch (error) {
      console.error('Chat request failed:', error);
      if (error?.name === 'TimeoutError' || error?.name === 'AbortError') {
        sendJson(response, 504, { ok: false, message: 'The assistant took too long to respond. Please try again.' });
      } else {
        sendJson(response, 500, { ok: false, message: 'The assistant could not respond right now.' });
      }
    }
    return;
  }
  if (!transporter || !CONTACT_FROM) {
    sendJson(response, 503, { ok: false, message: 'Email service is not configured yet.' });
    return;
  }

  try {
    const body = await readBody(request);

    if (request.url === '/api/careers') {
      const fullName = text(body.fullName, 120);
      const email = text(body.email, 254);
      const phone = text(body.phone, 50);
      const experience = text(body.experience, 120);
      const portfolio = text(body.portfolio, 300);
      const availability = text(body.availability, 120);
      const message = text(body.message, 5000);

      if (!fullName || !isValidName(fullName) || !email || !isValidEmail(email) || !phone || !isValidPhone(phone) || !experience || !availability || !message || (portfolio && !isValidUrl(portfolio))) {
        sendJson(response, 400, { ok: false, message: 'Please provide valid application details.' });
        return;
      }

      const applicationSubject = `[Careers application] Social Media Manager - ${fullName}`;
      const applicationText = [
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
      ].join('\n');

      await Promise.all([
        transporter.sendMail({
          from: CONTACT_FROM,
          to: CAREERS_RECIPIENT,
          replyTo: email,
          subject: applicationSubject,
          text: applicationText,
        }),
        transporter.sendMail({
          from: CONTACT_FROM,
          to: email,
          subject: 'We received your Ikasle Marketing application',
          text: `Hi ${fullName},\n\nThanks for applying for the Social Media Manager role at Ikasle Marketing. We received your details and will review them shortly.\n\nRegards,\nIkasle Marketing`,
        }),
      ]);

      sendJson(response, 200, { ok: true, message: 'Application sent successfully.' });
      return;
    }

    const fullName = text(body.fullName, 120);
    const email = text(body.email, 254);
    const phone = text(body.phone, 50);
    const company = text(body.company, 160);
    const service = text(body.service, 120);
    const budget = text(body.budget, 120);
    const message = text(body.message, 5000);

    if (!fullName || !isValidName(fullName) || !email || !message || !budget || !isValidEmail(email) || !isValidPhone(phone)) {
      sendJson(response, 400, { ok: false, message: 'Please provide a valid name, email, phone number, budget, and message.' });
      return;
    }

    const enquirySubject = `[Website enquiry] ${fullName}`;
    const enquiryText = [
      `Name: ${fullName}`,
      `Email: ${email}`,
      `Phone: ${phone || 'Not provided'}`,
      `Company: ${company || 'Not provided'}`,
      `Service: ${service || 'Not provided'}`,
      `Budget: ${budget || 'Not provided'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    await Promise.all([
      transporter.sendMail({
        from: CONTACT_FROM,
        to: CONTACT_RECIPIENT,
        replyTo: email,
        subject: enquirySubject,
        text: enquiryText,
      }),
      transporter.sendMail({
        from: CONTACT_FROM,
        to: email,
        subject: 'Thanks for contacting Ikasle Marketing',
        text: `Hi ${fullName},\n\nThanks for reaching out to Ikasle Marketing. We received your enquiry and will get back to you shortly.\n\nRegards,\nIkasle Marketing`,
      }),
    ]);

    sendJson(response, 200, { ok: true, message: 'Enquiry sent successfully.' });
  } catch (error) {
    console.error('Contact form email failed:', error);
    sendJson(response, 500, { ok: false, message: 'We could not send your enquiry right now. Please try again.' });
  }
});

server.listen(PORT, () => {
  console.log(`Contact mail server listening on http://localhost:${PORT}`);
});