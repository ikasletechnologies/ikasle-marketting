/**
 * Creates a Jira Cloud issue for high-intent website enquiries (IKAS-402).
 * Disabled unless JIRA_HOST, JIRA_USER_EMAIL, JIRA_API_TOKEN and JIRA_PROJECT_KEY are all set.
 */

/** Lower bound of a budget label such as "₹1,00,000 - ₹2,50,000" or "₹2,50,000+" (in rupees). */
export function budgetFloor(budget) {
  const match = String(budget || '').match(/\d[\d,]*/);
  return match ? Number(match[0].replace(/,/g, '')) : 0;
}

export function createJiraClient(env) {
  const host = env.JIRA_HOST?.replace(/\/+$/, '');
  const { JIRA_USER_EMAIL: user, JIRA_API_TOKEN: token, JIRA_PROJECT_KEY: projectKey } = env;
  const issueType = env.JIRA_ISSUE_TYPE || 'Task';
  const minBudget = Number(env.JIRA_LEAD_MIN_BUDGET ?? 100000);
  const enabled = Boolean(host && user && token && projectKey);

  const auth = enabled ? `Basic ${Buffer.from(`${user}:${token}`).toString('base64')}` : '';

  const paragraph = (text) => ({ type: 'paragraph', content: text ? [{ type: 'text', text }] : [] });
  const field = (label, value) => ({
    type: 'paragraph',
    content: [
      { type: 'text', text: `${label}: `, marks: [{ type: 'strong' }] },
      { type: 'text', text: value || 'Not provided' },
    ],
  });

  async function post(fields) {
    const response = await fetch(`${host}/rest/api/3/issue`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ fields }),
      signal: AbortSignal.timeout(10000),
    });
    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, data };
  }

  return {
    enabled,
    isHighIntent(enquiry) {
      return budgetFloor(enquiry.budget) >= minBudget;
    },
    /** Resolves to the new issue key. Throws on failure; callers must not block the visitor on it. */
    async createLeadIssue(enquiry) {
      if (!enabled) throw new Error('Jira is not configured.');
      const summary = `[Lead] ${enquiry.fullName} - ${enquiry.service || 'General enquiry'}`
        .replace(/[\r\n]+/g, ' ')
        .slice(0, 250);
      const fields = {
        project: { key: projectKey },
        issuetype: { name: issueType },
        summary,
        labels: ['lead-inbound'],
        priority: { name: 'High' },
        description: {
          type: 'doc',
          version: 1,
          content: [
            field('Name', enquiry.fullName),
            field('Email', enquiry.email),
            field('Phone', enquiry.phone),
            field('Company', enquiry.company),
            field('Service', enquiry.service),
            field('Budget', enquiry.budget),
            { type: 'heading', attrs: { level: 3 }, content: [{ type: 'text', text: 'Message' }] },
            ...enquiry.message.split(/\n{2,}/).map((block) => paragraph(block.trim())),
          ],
        },
      };

      let result = await post(fields);
      // Some projects hide the Priority field on the create screen; retry without it
      // rather than dropping the lead.
      if (!result.ok && result.status === 400 && result.data?.errors?.priority) {
        delete fields.priority;
        result = await post(fields);
      }
      if (!result.ok) {
        const detail = JSON.stringify(result.data?.errors || result.data?.errorMessages || result.data).slice(0, 300);
        throw new Error(`Jira responded ${result.status}: ${detail}`);
      }
      return result.data.key;
    },
  };
}
