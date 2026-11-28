/**
 * Per-route title, description and social-card data (IKAS-501).
 *
 * Pure data + functions with explicit .ts imports so it runs both in the app and
 * in Node build scripts. Kept free of blog content so the app shell stays small;
 * blog-post meta lives in ./pages.ts.
 */
import { NOT_FOUND_SECTION, PRIVATE_SECTIONS, ROUTES } from '../routes.ts';
import type { Job } from '../content/careers/jobs.ts';

export const SITE_NAME = 'IKASLĒ Marketing';
export const DEFAULT_OG_IMAGE = '/hero-sculpture.png';

export interface PageMeta {
  title: string;
  description: string;
  /** Canonical path, e.g. /services/seo-search-growth. */
  path: string;
  image: string;
  type: 'website' | 'article';
  noindex: boolean;
  publishedAt?: string;
  /** Set only for open job openings: adds JobPosting structured data. */
  job?: Job;
}

const PAGE_DESCRIPTIONS: Record<string, string> = {
  Home: 'IKASLĒ Marketing helps brands, academies and education providers grow with digital marketing, social media, SEO and brand strategy built around real enquiries.',
  About: 'Meet IKASLĒ Marketing, a Coimbatore-based growth agency combining strategy, creativity and digital marketing to help ambitious brands move forward.',
  Services: 'Explore IKASLĒ Marketing services: digital marketing, social media marketing, SEO & search growth, and brand growth & creative, as one plan or individually.',
  Clients: 'Brands that grow with IKASLĒ Marketing: our clients across hospitality, tech, D2C and B2B, partnering with us on digital marketing, social media and branding.',
  Blogs: 'Practical guides on digital marketing, social media, SEO and student acquisition from the IKASLĒ Marketing team.',
  Contact: 'Tell us about your goals. Contact IKASLĒ Marketing in Coimbatore by form, email or phone to plan your next stage of growth.',
  Careers: 'Careers at IKASLĒ Marketing in Coimbatore. Browse open jobs in design, video, social media and performance marketing, and apply online.',
  'Privacy Policy': 'How IKASLĒ Marketing collects, uses and protects the information you share with us.',
  'Terms & Conditions': 'The terms that apply when you use the IKASLĒ Marketing website and services.',
  'Cookie Policy': 'How IKASLĒ Marketing uses cookies and similar technologies to keep our website fast, secure and helpful.',
  FAQ: 'Answers to common questions about working with IKASLĒ Marketing: services, timelines, results and process.',
  Sitemap: 'Browse every public page, service, blog article and resource on the IKASLĒ Marketing website.',
  'Digital Marketing': 'Performance-focused digital marketing: strategy, search and social ads, content, email, lead generation, CRO and analytics, connected into one growth plan.',
  'Social Media Marketing': 'Social media marketing that builds audiences and enquiries: strategy, content planning, creative, reels, community management, paid social and reporting.',
  'SEO & Search Growth': 'SEO that compounds: audits, keyword research, technical and on-page SEO, local SEO, content planning and search reporting.',
  'Brand Growth & Creative': 'Brand strategy, identity and creative that make you recognisable and trusted, from discovery and messaging to launch.',
  'Digital Marketing Strategy': 'Digital marketing strategy services from IKASLĒ Marketing: marketing audits, audience and competitor research, channel and funnel planning, budgets and KPIs in one practical roadmap.',
  'Audience & Competitor Research': 'Audience research and competitor analysis that reveal who your customers are, how they search and where your brand can stand out.',
  'Google Search Ads': 'Google Ads management built on high-intent keywords, strong ad copy and focused landing pages, so your budget turns into enquiries.',
  'Display & YouTube Advertising': 'Display banner and YouTube video ad campaigns that build awareness, reach new audiences and bring interested visitors back.',
  'Meta Advertising': 'Facebook and Instagram ads with precise targeting, scroll-stopping creative and full-funnel campaigns built to generate leads and sales.',
  'Content Marketing': 'Content marketing services: blogs, guides and case studies that attract the right audience, rank in search and build trust.',
  'Email Marketing': 'Email marketing services: newsletters, automated journeys and targeted campaigns that nurture leads and drive repeat business.',
  'Lead Generation & Nurturing': 'Lead generation campaigns with lead scoring, CRM integration and automated nurturing that turn enquiries into customers.',
  'Landing Pages & CRO': 'High-converting landing pages and conversion rate optimisation that remove friction and get more enquiries from your traffic.',
  'Analytics & Conversion Tracking': 'GA4, Google Tag Manager and conversion tracking set up properly, with dashboards that show which channels drive results.',
  'Social Media Strategy': 'Social media strategy services that define your goals, audience, platforms, content pillars and voice, so every post has a purpose.',
  'Profile Setup & Optimisation': 'Social media profile setup and optimisation for Instagram, Facebook, LinkedIn and YouTube, with clear bios and branded visuals.',
  'Social Media Management': 'End-to-end social media management: content planning, design, captions, scheduling, community replies and monthly reports.',
  'Content Planning': 'Monthly social media content calendars built around your goals, offers and key dates, so you always know what to post and when.',
  'Creative Posts & Carousels': 'Social media post, carousel and story design that follows your brand, explains ideas clearly and earns saves and shares.',
  'Reels & Short-Form Video': 'Instagram Reels and YouTube Shorts planned, scripted and edited with strong hooks that grow reach and keep people watching.',
  'Community Management': 'Social community management across comments, messages and groups that builds trust and protects your reputation.',
  'Social Media Advertising': 'Paid social advertising on Instagram, Facebook, LinkedIn and YouTube with precise targeting, creative testing and clear reporting.',
  'Influencer & Creator Campaigns': 'Influencer and creator marketing, from finding and vetting creators to briefing, campaign management and measuring results.',
  'Social Analytics & Reporting': 'Social media analytics and reporting with dashboards that track growth, engagement, content performance and leads.',
  'SEO Audit & Strategy': 'A complete SEO audit of technical health, content, keywords, backlinks and competitors, turned into a prioritised SEO strategy.',
  'Keyword & Search Intent Research': 'Keyword and search intent research that finds the terms your customers use and maps them to the right pages on your site.',
  'Technical SEO': 'Technical SEO services for crawlability, indexing, Core Web Vitals, site structure, redirects and structured data.',
  'On-Page SEO': 'On-page SEO that optimises titles, meta descriptions, headings, content, images and internal links on your key pages.',
  'Local SEO': 'Local SEO services that help your business appear in Google Maps, the local pack and near me searches.',
  'Google Business Profile': 'Google Business Profile setup, optimisation and management: categories, photos, posts, Q&A and review responses.',
  'SEO Content & Topic Planning': 'SEO content and topic planning that maps keyword clusters into pillar pages and articles to build topical authority.',
  'Off-Page SEO & Digital PR': 'Ethical link building and digital PR that earn quality backlinks, brand mentions and media coverage.',
  'E-Commerce SEO': 'E-commerce SEO for online stores: category and product page optimisation, site structure, filters and product schema.',
  'Search Analytics & Reporting': 'SEO reporting with Google Search Console, GA4 and rank tracking, showing visibility, traffic and conversions in one place.',
  'Brand Discovery & Audit': 'Brand discovery and brand audit services that review your identity, messaging, customer perception and competitors.',
  'Brand Strategy & Positioning': 'Brand strategy and positioning that define your purpose, audience, value proposition and personality.',
  'Brand Messaging & Voice': 'Brand messaging, taglines and tone of voice that explain what you do, why it matters and how you are different.',
  'Logo & Visual Identity': 'Logo design and complete visual identity systems: colour palettes, typography, icons and imagery style.',
  'Brand Guidelines & Templates': 'Brand guidelines and ready-to-use templates for social media, presentations and documents that keep every asset on-brand.',
  'Marketing Collateral Design': 'Brochure, flyer, sales deck, banner and print design that explains your offer clearly and reflects your brand.',
  'Website & Landing Page Design': 'Website and landing page design with clear structure, mobile-first layouts and SEO-friendly foundations built to convert.',
  'Creative Campaigns & Storytelling': 'Creative campaigns and brand storytelling across social media, video, digital ads and print that people remember.',
  'Brand Experience & Consistency': 'Brand experience and consistency services that align your website, social media, service and spaces with your brand.',
  'Brand Launch & Refresh': 'Brand launch and rebranding support, from strategy and identity to rollout planning and launch campaigns.',
  'Leads Dashboard': 'Internal student lead pipeline.',
  'Campaigns Dashboard': 'Internal campaign performance dashboard.',
  [NOT_FOUND_SECTION]: 'The page you are looking for could not be found.',
};

const SERVICE_GROUPS: [prefix: string, group: string][] = [
  ['/services/digital-marketing/', 'Digital Marketing'],
  ['/services/social-media-marketing/', 'Social Media Marketing'],
  ['/services/seo-search-growth/', 'SEO & Search Growth'],
  ['/services/brand-growth-creative/', 'Brand Growth & Creative'],
];

function describe(section: string, path: string): string {
  const known = PAGE_DESCRIPTIONS[section];
  if (known) return known;
  const group = SERVICE_GROUPS.find(([prefix]) => path.startsWith(prefix))?.[1];
  if (group) {
    return `${section} from IKASLĒ Marketing, part of our ${group} services. Clear scope, practical deliverables and honest reporting to help your brand grow.`;
  }
  return PAGE_DESCRIPTIONS.Home;
}

export const titleFor = (name: string) => (name === 'Home' ? `${SITE_NAME} | Digital Marketing & Student Growth Agency` : `${name} | ${SITE_NAME}`);

export function getSectionMeta(section: string): PageMeta {
  const path = ROUTES[section] ?? '/';
  return {
    title: titleFor(section === NOT_FOUND_SECTION ? 'Page not found' : section),
    description: describe(section, path),
    path,
    image: DEFAULT_OG_IMAGE,
    type: 'website',
    noindex: PRIVATE_SECTIONS.has(section) || section === NOT_FOUND_SECTION,
  };
}
