/**
 * Blog articles (IKAS-201 / IKAS-202).
 *
 * Plain data with no React or asset imports, so build scripts (sitemap, per-route
 * meta tags) can import this file directly with Node. Bodies use the Markdown subset
 * documented in src/components/layout/blog/Markdown.tsx.
 */

export const BLOG_CATEGORIES = [
  'Digital Marketing',
  'Social Media',
  'SEO & Search',
  'Education Growth',
  'Case Studies',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  tags: string[];
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  author: string;
  body: string;
}

const TEAM = 'IKASLĒ Marketing Team';

const POSTS: BlogPost[] = [
  {
    slug: 'student-acquisition-funnel-for-academies',
    title: 'How to Plan a Student Acquisition Funnel for Your Academy',
    excerpt:
      'Map every step from first ad impression to enrolment, so you know where enquiries come from and where they quietly drop off.',
    category: 'Education Growth',
    tags: ['Admissions', 'Funnels', 'Strategy'],
    publishedAt: '2026-10-28',
    author: TEAM,
    body: `
Most academies do not have a traffic problem. They have a *visibility* problem: enquiries arrive from five channels, land in three inboxes, and nobody can say which campaign produced the students who actually enrolled.

A simple, written funnel fixes that. It gives your marketing and admissions teams one shared picture of how a prospective student moves from "never heard of you" to "enrolled".

## The five stages worth tracking

1. **Awareness**: the student or parent first sees your academy (search, social, referral, campus event).
2. **Interest**: they visit a course page, watch a video or download a brochure.
3. **Enquiry**: they submit a form, call or send a WhatsApp message.
4. **Counselling**: an admissions counsellor speaks with them and books an interview or demo class.
5. **Enrolment**: they pay the fee or confirm their seat.

> [!TIP] Name stages after what people *do*
> "Booked a demo class" is measurable. "Warm lead" is an opinion. Use stage names that two different people would apply the same way.

## Decide what counts as a conversion at each stage

For every stage, write down the single event that moves someone forward and where it is recorded:

- Course page visit → website analytics
- Form submission → your CRM or lead sheet
- Counselling call completed → counsellor notes
- Fee paid → finance or admissions system

If a stage has no recorded event, you cannot measure drop-off there, so that is the first gap to close.

## Measure the handovers, not just the totals

The most useful numbers are the *rates between stages*: enquiry → counselling, counselling → enrolment. A channel that produces many enquiries but few counselling calls usually has a targeting or messaging problem. A healthy enquiry flow with low enrolment usually points to follow-up speed or programme fit.

## Review it monthly

Put the funnel on one page and review it with marketing and admissions together each month. Agree on one stage to improve next, change one thing, and compare the following month. Small, deliberate changes beat a full rebuild every term.

---

Want help mapping your funnel? Our [Lead Generation & Nurturing](/services/digital-marketing/lead-generation-nurturing) service starts exactly here.
`,
  },
  {
    slug: 'track-course-enquiries-from-google-ads',
    title: 'Tracking Course Enquiries from Google Ads: A Practical Setup Checklist',
    excerpt:
      'If your ads report clicks but not enquiries, you are optimising for the wrong thing. Here is how to send real form submissions back as conversions.',
    category: 'Digital Marketing',
    tags: ['Google Ads', 'GA4', 'Conversion Tracking'],
    publishedAt: '2026-10-21',
    author: TEAM,
    body: `
Google Ads can only optimise toward what you tell it matters. If the only signal it receives is a click, it will find you more clickers, not more students.

## 1. Fire an event when the enquiry succeeds

Send the event only after the form is *successfully* submitted, not when the button is clicked. With Google Analytics 4 installed through \`gtag.js\`, the recommended event name for an enquiry is \`generate_lead\`:

\`\`\`js
// Call this after your form request returns successfully.
function trackEnquiry(courseName) {
  gtag('event', 'generate_lead', {
    course_name: courseName, // custom parameter: register it in GA4 to report on it
    form_location: 'course_page',
  });
}
\`\`\`

> [!WARNING] Never send personal data
> Do not put names, emails or phone numbers into analytics events. Google's policies prohibit it, and you do not need it to measure performance.

## 2. Mark the event as a key event

In GA4, open **Admin → Events**, find \`generate_lead\` once it has been received, and mark it as a key event. Then import it into Google Ads as a conversion action.

## 3. Check the basics before trusting the numbers

- Submit a test enquiry and confirm it appears in GA4's real-time report.
- Make sure the thank-you state does not fire the event twice on refresh.
- Confirm Google Ads shows the imported conversion as *Recording conversions* after a day or two.

## 4. Optimise toward enquiries, then toward quality

Once conversions are flowing, bidding can target enquiries instead of clicks. Later, if your CRM records which enquiries enrolled, you can feed that back as offline conversions so campaigns learn which searches bring students, not just form fills.

Need a second pair of eyes? See our [Analytics & Conversion Tracking](/services/digital-marketing/analytics-conversion-tracking) service.
`,
  },
  {
    slug: 'monthly-social-media-content-calendar',
    title: 'Building a Monthly Social Media Content Calendar Your Team Will Actually Use',
    excerpt:
      'A content calendar only works if it is simple enough to keep updated. A practical structure for pillars, formats and approvals.',
    category: 'Social Media',
    tags: ['Content Planning', 'Workflow'],
    publishedAt: '2026-10-14',
    author: TEAM,
    body: `
A content calendar is not a spreadsheet of dates. It is an agreement about *what* you will publish, *why*, and *who* signs it off, made before the week gets busy.

## Start with three to five content pillars

Pillars are the recurring themes your audience cares about. For an academy they might be:

- **Student outcomes**: projects, placements, testimonials (with permission)
- **Learning experience**: classes, faculty, campus life
- **Career guidance**: advice that is useful even to people who never enrol
- **Admissions**: deadlines, scholarships, open days

Every post should belong to a pillar. If it does not fit any, question whether it belongs on your feed.

## Give every row the same columns

| Column | Why it matters |
| --- | --- |
| Publish date | Keeps a steady rhythm |
| Platform | Instagram, LinkedIn and YouTube need different formats |
| Pillar | Keeps the mix balanced |
| Format | Reel, carousel, static post, story |
| Owner | One named person, not "the team" |
| Status | Idea → Draft → In review → Approved → Scheduled |

> [!NOTE] Plan four weeks, detail two
> Lock the next two weeks in detail and keep weeks three and four as topics only. That leaves room for timely posts without abandoning the plan.

## Make approvals a step, not a surprise

Agree on one reviewer and a deadline (for example, two working days before publishing). Most calendars fail at the approval stage, not the ideas stage.

## Review what worked before planning the next month

Look at saves, shares and enquiries per pillar, not just likes. Shift the next month's mix toward the pillars that move people to act.

Our [Content Planning & Calendars](/services/social-media-marketing/content-planning) service builds this structure with your team.
`,
  },
  {
    slug: 'local-seo-for-coaching-centres',
    title: 'Local SEO for Coaching Centres and Training Institutes',
    excerpt:
      'Most students search with a location in mind. How to show up for "course near me" searches with your profile, pages and structured data.',
    category: 'SEO & Search',
    tags: ['Local SEO', 'Google Business Profile', 'Schema'],
    publishedAt: '2026-10-07',
    author: TEAM,
    body: `
"Data science course in Coimbatore". "IELTS coaching near me". Students and parents search with a place in mind, and local results often appear above everything else.

## 1. Complete your Google Business Profile

- Choose the most accurate primary category (for example, *Educational institution* or *Coaching center*).
- Add your real opening hours, phone number and website.
- Upload genuine photos of classrooms, labs and events.
- Reply to every review, positive or negative, politely and promptly.

## 2. Keep your name, address and phone identical everywhere

Your website footer, contact page, Google profile and directory listings should match exactly. Inconsistent details make it harder for search engines to trust which listing is correct.

## 3. Give each course and location its own page

If you teach several courses or run more than one branch, create a page for each with unique content: syllabus, duration, batch timings, faculty and how to enrol. Avoid copying the same text with only the city name changed.

## 4. Add structured data

Structured data helps search engines understand who you are. A minimal example for an institute:

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "Example Academy",
  "url": "https://www.example.com",
  "telephone": "+91-00000-00000",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "12 Example Road",
    "addressLocality": "Coimbatore",
    "postalCode": "641004",
    "addressCountry": "IN"
  }
}
\`\`\`

Place it inside a \`<script type="application/ld+json">\` tag on your contact or home page, and validate it with Google's Rich Results Test.

> [!TIP] Reviews are part of local SEO
> Ask enrolled students for reviews at natural moments, such as after a successful placement or course completion. Never offer incentives for reviews.

Explore our [Local SEO](/services/seo-search-growth/local-seo) and [Google Business Profile](/services/seo-search-growth/google-business-profile) services.
`,
  },
  {
    slug: 'reels-that-bring-enquiries',
    title: 'Reels That Bring Enquiries, Not Just Views',
    excerpt:
      'Short-form video can fill your inbox as well as your view count, if every reel has a clear hook, a single message and a next step.',
    category: 'Social Media',
    tags: ['Reels', 'Short-Form Video', 'Creative'],
    publishedAt: '2026-09-30',
    author: TEAM,
    body: `
Views feel good, but enquiries pay the bills. The difference usually comes down to structure.

## Hook in the first two seconds

Open with the viewer's question or problem, not your logo:

- "Three things nobody tells you before choosing a coding bootcamp"
- "What a day in our design lab actually looks like"

## One reel, one message

Each video should make a single point. If you need to explain three things, make three reels. Focused videos are easier to understand and easier to rewatch.

## Show, then tell

Real classrooms, real student work and real faculty build more trust than polished stock footage. Add on-screen captions, since many people watch with the sound off.

## End with a specific next step

"Link in bio" is vague. Try:

1. "Comment *SYLLABUS* and we'll send you the course outline."
2. "Book a free demo class through the link in our bio."
3. "Save this for when you're choosing a course."

> [!NOTE] Measure what you asked for
> If a reel asks people to comment a keyword, count those comments. Judge each video against its own call to action, not only against views.

## Plan reels as a series

A weekly series ("Faculty Fridays", "Placement Stories") is easier to produce and teaches your audience to come back.

See how we approach [Reels & Short-Form Video](/services/social-media-marketing/reels-short-form-video).
`,
  },
  {
    slug: 'utm-tagging-for-student-enquiries',
    title: 'UTM Tagging: Know Which Campaign Brought Each Student Enquiry',
    excerpt:
      'A five-minute habit that turns "it came from Instagram, probably" into data you can act on. Naming rules, examples and common mistakes.',
    category: 'Digital Marketing',
    tags: ['Analytics', 'UTM', 'Attribution'],
    publishedAt: '2026-09-23',
    author: TEAM,
    body: `
UTM parameters are short tags added to the end of a link. Analytics tools read them to record where a visit came from. Used consistently, they answer the question every admissions team asks: *which campaign actually worked?*

## The three tags you always need

- \`utm_source\`: where the link lives (\`instagram\`, \`newsletter\`, \`google\`)
- \`utm_medium\`: the type of channel (\`social\`, \`email\`, \`cpc\`)
- \`utm_campaign\`: the specific campaign (\`jan-2027-data-science-intake\`)

## An example link

\`\`\`bash
https://www.example.com/courses/data-science?utm_source=instagram&utm_medium=social&utm_campaign=jan-2027-data-science-intake&utm_content=reel-placement-story
\`\`\`

The optional \`utm_content\` tag distinguishes between creatives in the same campaign, such as two different reels.

## Rules that keep reports clean

1. **Always lowercase.** \`Instagram\` and \`instagram\` show up as two separate sources.
2. **Use hyphens, not spaces.**
3. **Keep a shared sheet** of approved sources, mediums and campaign names.
4. **Never tag internal links** on your own website, because doing so overwrites the original source of the visit.

> [!WARNING] Google Ads already tags itself
> With auto-tagging switched on, Google Ads adds its own click identifier. You usually do not need manual UTMs on those ads, and mixing both can cause confusion.

## Connect it to your enquiries

Capture the UTM values in a hidden field on your enquiry form and store them with the lead. Then your lead list can show not only *who* enquired, but *which campaign* brought them.

Our [Analytics & Conversion Tracking](/services/digital-marketing/analytics-conversion-tracking) team can set this up end to end.
`,
  },
];

const WORDS_PER_MINUTE = 200;

export function readingMinutes(post: Pick<BlogPost, 'body'>): number {
  const words = post.body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

/** Newest first. */
export const BLOG_POSTS: readonly BlogPost[] = [...POSTS].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export const blogPostPath = (slug: string): string => `/blogs/${slug}`;
