/**
 * Per-route title, description and social-card data (IKAS-501).
 *
 * Pure data + functions with explicit .ts imports so it runs both in the app and
 * in Node build scripts. Kept free of blog content so the app shell stays small;
 * blog-post meta lives in ./pages.ts.
 */
import { NOT_FOUND_SECTION, PRIVATE_SECTIONS, ROUTES } from '../routes.ts';

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
}

const PAGE_DESCRIPTIONS: Record<string, string> = {
  Home: 'IKASLĒ Marketing helps brands, academies and education providers grow with digital marketing, social media, SEO and brand strategy built around real enquiries.',
  About: 'Meet IKASLĒ Marketing, a Coimbatore-based growth agency combining strategy, creativity and digital marketing to help ambitious brands move forward.',
  Services: 'Explore IKASLĒ Marketing services: digital marketing, social media marketing, SEO & search growth, and brand growth & creative, as one plan or individually.',
  Blogs: 'Practical guides on digital marketing, social media, SEO and student acquisition from the IKASLĒ Marketing team.',
  Contact: 'Tell us about your goals. Contact IKASLĒ Marketing in Coimbatore by form, email or phone to plan your next stage of growth.',
  Careers: 'Join IKASLĒ Marketing. See open roles and apply to help brands grow through strategy, creativity and digital marketing.',
  'Privacy Policy': 'How IKASLĒ Marketing collects, uses and protects the information you share with us.',
  'Terms & Conditions': 'The terms that apply when you use the IKASLĒ Marketing website and services.',
  FAQ: 'Answers to common questions about working with IKASLĒ Marketing: services, timelines, results and process.',
  'Digital Marketing': 'Performance-focused digital marketing: strategy, search and social ads, content, email, lead generation, CRO and analytics, connected into one growth plan.',
  'Social Media Marketing': 'Social media marketing that builds audiences and enquiries: strategy, content planning, creative, reels, community management, paid social and reporting.',
  'SEO & Search Growth': 'SEO that compounds: audits, keyword research, technical and on-page SEO, local SEO, content planning and search reporting.',
  'Brand Growth & Creative': 'Brand strategy, identity and creative that make you recognisable and trusted, from discovery and messaging to launch.',
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
