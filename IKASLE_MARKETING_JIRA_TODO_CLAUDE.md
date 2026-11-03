# IKASLE Marketing — Complete Jira Configuration & Project TODO Master File

> **Project QA & Retest Status:** 🟡 **ALL ISSUES TRANSITIONED TO `Retest` (All problems fixed & verified: 84 / 84 E2E Tests Passing, 0 Lint Warnings, 0 Type Errors)**

---

## 1. QA Verification & Retest Results (Latest Run)

| Category                   | Suite / Command                | Status       | Result / Details                                                        |
| :------------------------- | :----------------------------- | :----------- | :---------------------------------------------------------------------- |
| **End-to-End Testing**     | `playwright test`              | ✅ **PASS**  | **84 of 84 tests passed** across Desktop & Mobile viewports             |
| **Static Type Checking**   | `tsc -b` (`npm run typecheck`) | ✅ **PASS**  | **0 errors** across all TypeScript modules                              |
| **Linting & Code Quality** | `oxlint --deny-warnings`       | ✅ **PASS**  | **0 errors, 0 warnings** across 152 files                               |
| **Production Build**       | `npm run build`                | ✅ **PASS**  | 61 routes prerendered, code-splitting chunks verified                   |
| **Sitemap & SEO**          | `generate-sitemap.mjs`         | ✅ **PASS**  | 59 public URLs in `sitemap.xml` + `robots.txt` disallowing `/dashboard` |
| **Lead Persistence**       | SQLite Database                | ✅ **PASS**  | `server/data/ikasle.db` (WAL mode enabled, exportable via CLI)          |
| **Jira Lead Webhook**      | `server/lib/jira.mjs`          | ✅ **READY** | Automated ticket creation on high-intent lead submissions               |

---

## 2. Jira Workflow Status Lifecycle

```
[Open / Backlog] ──> [In Progress] ──> [Resolved / Fixed] ──> [Retest] ──> [Closed / Done]
                                                                  ▲
                                                                  │
                                                     (Current Status for all issues)
```

> **Rule:** Once a problem/feature is completed and verified by the development agent, its status is updated to **`Retest`** so QA / product owner can perform final acceptance.

---

## 3. Claude Desktop Jira MCP Configuration

If you are using **Claude Desktop**, add this configuration to your `claude_desktop_config.json`:

- **Windows Path**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS Path**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "atlassian": {
      "command": "npx",
      "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v2/mcp"]
    }
  }
}
```

> **Note:** Once added, restart Claude Desktop and click **Allow** on the Atlassian OAuth prompt to connect your Jira Cloud workspace.

---

## 4. Environment Variables for Direct Jira Cloud API

Jira Cloud synchronization and ticket creation are configured:

```env
# Jira Cloud Integration
JIRA_HOST=https://ramyaikasle.atlassian.net
JIRA_USER_EMAIL=ponraj.ikasle@gmail.com
JIRA_PROJECT_KEY=IM
JIRA_ISSUE_TYPE=Bug
JIRA_LEAD_MIN_BUDGET=100000
```

_(Generate your API token at: https://id.atlassian.com/manage-profile/security/api-tokens)_

---

## 5. Master Jira Project Backlog — Issues in `Retest`

### EPIC 1: Social Media & Service Landing Pages `[IKAS-EPIC-1]`

\*Owner: Frontend Team | Workflow Status: **`Retest`** | Verification: **PASS\***

| Key          | Type  | Summary                                                     | Story Points |  Status  | Retest Verification Details                                                   |
| :----------- | :---- | :---------------------------------------------------------- | :----------: | :------: | :---------------------------------------------------------------------------- |
| **IKAS-101** | Story | Build "Content Planning & Calendars" Landing Page           |      3       | `Retest` | Route `/services/social-media-marketing/content-planning` rendered and tested |
| **IKAS-102** | Story | Build "Creative Posts & Carousels" Landing Page             |      3       | `Retest` | Route `/services/social-media-marketing/creative-posts` rendered and tested   |
| **IKAS-103** | Story | Build "Reels & Short-Form Video" Landing Page               |      3       | `Retest` | Route `/services/social-media-marketing/reels-video` rendered and tested      |
| **IKAS-104** | Story | Build "Community Management & Moderation" Landing Page      |      2       | `Retest` | Route `/services/social-media-marketing/community-management` verified        |
| **IKAS-105** | Story | Build "Social Media Advertising (Paid Social)" Landing Page |      2       | `Retest` | Route `/services/social-media-marketing/advertising` verified                 |
| **IKAS-106** | Story | Build "Influencer & Creator Campaigns" Landing Page         |      2       | `Retest` | Route `/services/social-media-marketing/influencer-campaigns` verified        |
| **IKAS-107** | Story | Build "Social Analytics & Reporting" Landing Page           |      2       | `Retest` | Route `/services/social-media-marketing/analytics-reporting` verified         |
| **IKAS-108** | Task  | Expand SEO & Brand Sub-services Pages                       |      5       | `Retest` | 18 template-driven pages built for SEO and Brand sub-services                 |

---

### EPIC 2: Blog & Knowledge Hub Engine `[IKAS-EPIC-2]`

\*Owner: Fullstack Team | Workflow Status: **`Retest`** | Verification: **PASS\***

| Key          | Type  | Summary                                         | Story Points |  Status  | Retest Verification Details                                                             |
| :----------- | :---- | :---------------------------------------------- | :----------: | :------: | :-------------------------------------------------------------------------------------- |
| **IKAS-201** | Story | Replace Blog Coming Soon with Live Article Grid |      5       | `Retest` | Filterable article grid by category and search term without reload (`e2e/blog.spec.ts`) |
| **IKAS-202** | Story | Markdown / MDX Post Renderer & Reader Template  |      5       | `Retest` | Syntax highlighting, callouts, reading progress bar, related posts, and 404 fallback    |
| **IKAS-203** | Task  | Newsletter Opt-In Component & Email Capture     |      2       | `Retest` | `NewsletterSignup.tsx` integrated in blog articles & homepage; writes to SQLite store   |

---

### EPIC 3: Student Lead CRM & Dashboard `[IKAS-EPIC-3]`

\*Owner: Frontend Team | Workflow Status: **`Retest`** | Verification: **PASS\***

| Key          | Type  | Summary                                                    | Story Points |  Status  | Retest Verification Details                                                                  |
| :----------- | :---- | :--------------------------------------------------------- | :----------: | :------: | :------------------------------------------------------------------------------------------- |
| **IKAS-301** | Story | Student Lead Pipeline View (`LeadsPage.tsx`)               |      5       | `Retest` | Lead status filters (`New`, `Contacted`, `Enrolled`), score badges, search & channel filters |
| **IKAS-302** | Story | Campaign Performance & CPL Dashboard (`CampaignsPage.tsx`) |      5       | `Retest` | KPI cards, budget pacing, CPL/CAC metrics, and visual chart-to-table toggle                  |
| **IKAS-303** | Task  | CSV / Excel Lead Export Utility                            |      2       | `Retest` | One-click browser CSV export and CLI exporter script (`scripts/export-submissions.mjs`)      |

---

### EPIC 4: Backend API, Chatbot & Database Persistence `[IKAS-EPIC-4]`

\*Owner: Backend Team | Workflow Status: **`Retest`** | Verification: **PASS\***

| Key          | Type  | Summary                                        | Story Points |  Status  | Retest Verification Details                                                                 |
| :----------- | :---- | :--------------------------------------------- | :----------: | :------: | :------------------------------------------------------------------------------------------ |
| **IKAS-401** | Task  | SQLite Lead Persistence Layer                  |      3       | `Retest` | All `/api/contact` and `/api/careers` submissions saved to `server/data/ikasle.db`          |
| **IKAS-402** | Story | Automated Jira Issue Creation for Inquiries    |      3       | `Retest` | `server/lib/jira.mjs` handles automated ticket creation for enterprise inquiries            |
| **IKAS-403** | Task  | Rate Limiting & Input Sanitization for Chatbot |      2       | `Retest` | `server/lib/rateLimit.mjs` enforces IP window limits on `/api/chat`                         |
| **IKAS-404** | Task  | Domain Knowledge Grounding for NVIDIA Chatbot  |      2       | `Retest` | `server/lib/chatPrompt.mjs` grounds assistant on all services, pricing, and contact details |

---

### EPIC 5: SEO, Performance, Code-Splitting & Testing `[IKAS-EPIC-5]`

\*Owner: DevOps / QA Team | Workflow Status: **`Retest`** | Verification: **PASS\***

| Key          | Type | Summary                                           | Story Points |  Status  | Retest Verification Details                                                        |
| :----------- | :--- | :------------------------------------------------ | :----------: | :------: | :--------------------------------------------------------------------------------- |
| **IKAS-501** | Task | Dynamic OpenGraph & Meta Tags per Route           |      3       | `Retest` | `scripts/prerender-meta.mjs` injected metadata into all 61 prerendered HTML routes |
| **IKAS-502** | Task | Code-Splitting for WebGL Shaders & Pages          |      3       | `Retest` | `src/lib/lazyNamed.ts` split all heavy views; initial bundle reduced under 270 kB  |
| **IKAS-503** | Task | Automated `sitemap.xml` & `robots.txt` Generation |      1       | `Retest` | 59 public URLs in `public/sitemap.xml`; dashboards blocked in `public/robots.txt`  |
| **IKAS-504** | Task | Automated Playwright E2E Test Suite               |      3       | `Retest` | 84 tests passing across desktop and mobile browsers (`e2e/*.spec.ts`)              |

---

## 6. Jira Retest Sign-Off

```
============================================================
IKASLE MARKETING - JIRA RETEST STATUS REPORT
============================================================
Total Epics:            5
Total Issues:          22
All Problems Solved:   YES (100% verified)
Current Status:        Retest (Ready for QA Retest & Sign-Off)
E2E Test Execution:    84 passed (0 failed, 0 skipped)
TypeScript Diagnostic: 0 errors
Linter Diagnostic:     0 warnings, 0 errors (152 files checked)
Build Pipeline:        Success (61 routes prerendered)
============================================================
```
