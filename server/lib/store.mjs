import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

/**
 * Durable record of every form submission (IKAS-401).
 *
 * Submissions are written *before* any email is attempted, so an SMTP outage never
 * loses an enquiry. Uses Node's built-in SQLite (Node 22.13+), so no native deps.
 */
export function openStore(filePath) {
  if (filePath !== ':memory:') fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const db = new DatabaseSync(filePath);

  db.exec(`
    PRAGMA journal_mode = WAL;
    PRAGMA busy_timeout = 5000;

    CREATE TABLE IF NOT EXISTS submissions (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      kind         TEXT NOT NULL CHECK (kind IN ('contact', 'careers')),
      full_name    TEXT NOT NULL,
      email        TEXT NOT NULL,
      payload      TEXT NOT NULL,
      email_status TEXT NOT NULL DEFAULT 'pending',
      email_error  TEXT,
      jira_key     TEXT,
      created_at   TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
    CREATE INDEX IF NOT EXISTS submissions_created_at ON submissions (created_at);

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
      email      TEXT PRIMARY KEY COLLATE NOCASE,
      source     TEXT,
      created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    );
  `);

  const insertSubmission = db.prepare(
    'INSERT INTO submissions (kind, full_name, email, payload) VALUES (?, ?, ?, ?)',
  );
  const setEmailStatus = db.prepare('UPDATE submissions SET email_status = ?, email_error = ? WHERE id = ?');
  const setJiraKey = db.prepare('UPDATE submissions SET jira_key = ? WHERE id = ?');
  const insertSubscriber = db.prepare(
    'INSERT INTO newsletter_subscribers (email, source) VALUES (?, ?) ON CONFLICT(email) DO NOTHING',
  );

  return {
    /** Returns the new submission id. */
    saveSubmission(kind, record) {
      const result = insertSubmission.run(kind, record.fullName, record.email, JSON.stringify(record));
      return Number(result.lastInsertRowid);
    },
    markEmail(id, status, error = null) {
      setEmailStatus.run(status, error ? String(error).slice(0, 500) : null, id);
    },
    markJira(id, key) {
      setJiraKey.run(key, id);
    },
    /** Idempotent: re-subscribing an existing address is a no-op. Returns true only for a new subscriber. */
    addSubscriber(email, source) {
      return insertSubscriber.run(email.toLowerCase(), source || null).changes > 0;
    },
    listSubmissions() {
      return db.prepare('SELECT * FROM submissions ORDER BY id').all();
    },
    listSubscribers() {
      return db.prepare('SELECT * FROM newsletter_subscribers ORDER BY created_at').all();
    },
    close() {
      db.close();
    },
  };
}
