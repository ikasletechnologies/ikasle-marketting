/** Maps each page (section name used by the app) to its URL path. */
export const ROUTES: Record<string, string> = {
  Home: '/',
  About: '/about',
  Services: '/services',
  Blogs: '/blogs',
  Contact: '/contact',
  'Digital Marketing': '/services/digital-marketing',
  'Digital Marketing Strategy': '/services/digital-marketing/strategy',
  'Audience & Competitor Research': '/services/digital-marketing/audience-competitor-research',
  'Google Search Ads': '/services/digital-marketing/google-search-ads',
  'Display & YouTube Advertising': '/services/digital-marketing/display-youtube-advertising',
  'Meta Advertising': '/services/digital-marketing/meta-advertising',
  'Content Marketing': '/services/digital-marketing/content-marketing',
  'Email Marketing': '/services/digital-marketing/email-marketing',
  'Lead Generation & Nurturing': '/services/digital-marketing/lead-generation-nurturing',
  'Landing Pages & CRO': '/services/digital-marketing/landing-pages-cro',
  'Analytics & Conversion Tracking': '/services/digital-marketing/analytics-conversion-tracking',
  'Social Media Marketing': '/services/social-media-marketing',
  'Social Media Strategy': '/services/social-media-marketing/strategy',
  'Profile Setup & Optimisation': '/services/social-media-marketing/profile-setup',
  'Social Media Management': '/services/social-media-marketing/management',
  'Content Planning': '/services/social-media-marketing/content-planning',
  'Creative Posts & Carousels': '/services/social-media-marketing/creative-posts',
  'Reels & Short-Form Video': '/services/social-media-marketing/reels-short-form-video',
  'Community Management': '/services/social-media-marketing/community-management',
  'Social Media Advertising': '/services/social-media-marketing/advertising',
  'Influencer & Creator Campaigns': '/services/social-media-marketing/influencer-creator-campaigns',
  'Social Analytics & Reporting': '/services/social-media-marketing/analytics-reporting',
  'SEO & Search Growth': '/services/seo-search-growth',
  'SEO Audit & Strategy': '/services/seo-search-growth/audit-strategy',
  'Keyword & Search Intent Research': '/services/seo-search-growth/keyword-research',
  'Technical SEO': '/services/seo-search-growth/technical-seo',
  'On-Page SEO': '/services/seo-search-growth/on-page-seo',
  'Local SEO': '/services/seo-search-growth/local-seo',
  'Google Business Profile': '/services/seo-search-growth/google-business-profile',
  'SEO Content & Topic Planning': '/services/seo-search-growth/content-topic-planning',
  'Off-Page SEO & Digital PR': '/services/seo-search-growth/off-page-seo-digital-pr',
  'E-Commerce SEO': '/services/seo-search-growth/ecommerce-seo',
  'Search Analytics & Reporting': '/services/seo-search-growth/search-analytics-reporting',
  'Brand Growth & Creative': '/services/brand-growth-creative',
  'Brand Discovery & Audit': '/services/brand-growth-creative/brand-discovery-audit',
  'Brand Strategy & Positioning': '/services/brand-growth-creative/brand-strategy-positioning',
  'Brand Messaging & Voice': '/services/brand-growth-creative/brand-messaging-voice',
  'Logo & Visual Identity': '/services/brand-growth-creative/logo-visual-identity',
  'Brand Guidelines & Templates': '/services/brand-growth-creative/brand-guidelines-templates',
  'Marketing Collateral Design': '/services/brand-growth-creative/marketing-collateral-design',
  'Website & Landing Page Design': '/services/brand-growth-creative/website-landing-page-design',
  'Creative Campaigns & Storytelling': '/services/brand-growth-creative/creative-campaigns-storytelling',
  'Brand Experience & Consistency': '/services/brand-growth-creative/brand-experience-consistency',
  'Brand Launch & Refresh': '/services/brand-growth-creative/brand-launch-refresh',
  'Privacy Policy': '/privacy-policy',
  'Terms & Conditions': '/terms-and-conditions',
  FAQ: '/faq',
  Careers: '/careers',
  'Leads Dashboard': '/dashboard/leads',
  'Campaigns Dashboard': '/dashboard/campaigns',
};

/** Shown for any URL that does not match a page. */
export const NOT_FOUND_SECTION = 'Not Found';

/** Internal pages that must not be indexed or listed in the sitemap. */
export const PRIVATE_SECTIONS = new Set(['Leads Dashboard', 'Campaigns Dashboard']);

export const normalise = (path: string): string => {
  if (!path) return '/';
  const clean = path.split('?')[0].split('#')[0];
  return clean.length > 1 ? clean.replace(/\/+$/, '') : clean;
};

export const sectionFromPath = (path: string): string => {
  const clean = normalise(path);
  // 1. Exact match
  const exact = Object.keys(ROUTES).find((section) => ROUTES[section] === clean);
  if (exact) return exact;

  // 2. Longest prefix match for nested routes
  const matched = Object.keys(ROUTES)
    .filter((section) => ROUTES[section] !== '/' && (clean === ROUTES[section] || clean.startsWith(ROUTES[section] + '/')))
    .sort((a, b) => ROUTES[b].length - ROUTES[a].length)[0];

  if (matched) return matched;

  // 3. Fallback for top-level prefixes
  if (clean === '/services' || clean.startsWith('/services/')) return 'Services';
  if (clean === '/about' || clean.startsWith('/about/')) return 'About';
  if (clean === '/contact' || clean.startsWith('/contact/')) return 'Contact';
  if (clean === '/blogs' || clean.startsWith('/blogs/')) return 'Blogs';
  if (clean === '/dashboard') return 'Leads Dashboard';

  return NOT_FOUND_SECTION;
};

export const pathFromSection = (section: string): string => ROUTES[section] ?? '/';

export const isServiceSection = (section?: string): boolean => {
  if (!section) return false;
  if (section === 'Services') return true;
  const route = ROUTES[section];
  return Boolean(route && route.startsWith('/services'));
};

export const getActiveNavSection = (sectionOrPath?: string): string => {
  if (!sectionOrPath) return 'Home';
  if (sectionOrPath.startsWith('/')) {
    const sec = sectionFromPath(sectionOrPath);
    return isServiceSection(sec) ? 'Services' : sec;
  }
  return isServiceSection(sectionOrPath) ? 'Services' : sectionOrPath;
};
