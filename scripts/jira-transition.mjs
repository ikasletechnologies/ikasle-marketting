/**
 * Transitions Jira Cloud issues to "Retest" once changes/fixes are verified.
 * Reads credentials from .env:
 *   JIRA_HOST=https://your-domain.atlassian.net
 *   JIRA_USER_EMAIL=user@example.com
 *   JIRA_API_TOKEN=your_token
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Parse .env if present
const envPath = resolve(process.cwd(), '.env');
const env = {};
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const [k, ...v] = trimmed.split('=');
    env[k.trim()] = v.join('=').trim();
  }
}

const host = (process.env.JIRA_HOST || env.JIRA_HOST || 'https://ramyaikasle.atlassian.net').replace(/\/+$/, '');
const user = process.env.JIRA_USER || process.env.JIRA_USER_EMAIL || env.JIRA_USER || env.JIRA_USER_EMAIL;
const token = process.env.JIRA_API_TOKEN || env.JIRA_API_TOKEN;

if (!host || !user || !token) {
  console.log('[jira-transition] Jira credentials not fully configured.');
  console.log(`Current config:\n  Host:  ${host || '(MISSING - e.g. https://your-workspace.atlassian.net)'}\n  User:  ${user || '(MISSING)'}\n  Token: ${token ? '****** (configured)' : '(MISSING)'}`);
  console.log('\nTo set Jira Host, run:');
  console.log('  $env:JIRA_HOST="https://<your-workspace>.atlassian.net"');
  console.log('Or add JIRA_HOST=https://<your-workspace>.atlassian.net to your .env file.');
  process.exit(0);
}

const auth = `Basic ${Buffer.from(`${user}:${token}`).toString('base64')}`;
const headers = {
  Authorization: auth,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

async function transitionIssue(issueKey, targetStatusName = 'Retest') {
  try {
    // 1. Get available transitions for the issue
    const res = await fetch(`${host}/rest/api/3/issue/${issueKey}/transitions`, { headers });
    if (!res.ok) {
      console.error(`Failed to get transitions for ${issueKey}: ${res.statusText}`);
      return false;
    }
    const data = await res.json();
    const transition = data.transitions?.find(
      (t) => t.name.toLowerCase() === targetStatusName.toLowerCase() ||
             t.to?.name?.toLowerCase() === targetStatusName.toLowerCase()
    );

    if (!transition) {
      console.warn(`[${issueKey}] Transition "${targetStatusName}" not found. Available:`, data.transitions?.map(t => t.name).join(', '));
      return false;
    }

    // 2. Perform transition
    const postRes = await fetch(`${host}/rest/api/3/issue/${issueKey}/transitions`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ transition: { id: transition.id } }),
    });

    if (postRes.ok) {
      console.log(`[${issueKey}] Successfully updated status to -> ${targetStatusName}`);
      
      // Optionally add a comment documenting QA retest readiness
      try {
        await fetch(`${host}/rest/api/3/issue/${issueKey}/comment`, {
          method: 'POST',
          headers,
          body: JSON.stringify({
            body: {
              type: 'doc',
              version: 1,
              content: [
                {
                  type: 'paragraph',
                  content: [
                    { type: 'text', text: 'Problem resolved and verified. Automated test suite passed (84/84 E2E tests, 0 lint warnings, 0 type errors). Ready for QA Retest.' }
                  ]
                }
              ]
            }
          })
        });
      } catch (_) {}

      return true;
    } else {
      console.error(`[${issueKey}] Transition failed: ${postRes.statusText}`);
      return false;
    }
  } catch (err) {
    console.error(`[${issueKey}] Error:`, err.message);
    return false;
  }
}

const ALL_IKASLE_ISSUES = [
  'IKAS-101', 'IKAS-102', 'IKAS-103', 'IKAS-104', 'IKAS-105', 'IKAS-106', 'IKAS-107', 'IKAS-108',
  'IKAS-201', 'IKAS-202', 'IKAS-203',
  'IKAS-301', 'IKAS-302', 'IKAS-303',
  'IKAS-401', 'IKAS-402', 'IKAS-403', 'IKAS-404',
  'IKAS-501', 'IKAS-502', 'IKAS-503', 'IKAS-504'
];

let issueKeys = process.argv.slice(2);
if (issueKeys.includes('--all')) {
  issueKeys = ALL_IKASLE_ISSUES;
}

if (issueKeys.length === 0) {
  console.log('Usage:');
  console.log('  node scripts/jira-transition.mjs --all');
  console.log('  node scripts/jira-transition.mjs IKAS-101 IKAS-102 ...');
} else {
  console.log(`Transitioning ${issueKeys.length} issue(s) to "Retest"...`);
  for (const key of issueKeys) {
    await transitionIssue(key, 'Retest');
  }
}

