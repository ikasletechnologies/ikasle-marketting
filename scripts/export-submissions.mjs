// Prints stored submissions or newsletter subscribers as CSV.
//   npm run export:submissions                 -> contact + careers submissions
//   npm run export:submissions -- subscribers  -> newsletter subscribers
// Redirect to a file: npm run export:submissions > submissions.csv
import fs from 'node:fs';
import path from 'node:path';
import { openStore } from '../server/lib/store.mjs';

const dataDir = path.resolve(process.env.DATA_DIR || 'server/data');
const dbPath = path.join(dataDir, 'ikasle.db');
if (!fs.existsSync(dbPath)) {
  console.error(`No database found at ${dbPath}. Submissions are stored there once the server receives one.`);
  process.exit(1);
}

const store = openStore(dbPath);
const which = process.argv[2] === 'subscribers' ? 'subscribers' : 'submissions';

const cell = (value) => {
  let s = value == null ? '' : String(value);
  // Neutralise spreadsheet formula injection.
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

let header;
let rows;
if (which === 'subscribers') {
  header = ['email', 'source', 'created_at'];
  rows = store.listSubscribers().map((r) => [r.email, r.source, r.created_at]);
} else {
  header = ['id', 'kind', 'created_at', 'full_name', 'email', 'phone', 'company', 'service', 'budget', 'message', 'email_status', 'jira_key'];
  rows = store.listSubmissions().map((r) => {
    const p = JSON.parse(r.payload);
    return [r.id, r.kind, r.created_at, r.full_name, r.email, p.phone, p.company, p.service, p.budget, p.message, r.email_status, r.jira_key];
  });
}

process.stdout.write([header, ...rows].map((row) => row.map(cell).join(',')).join('\n') + '\n');
store.close();
