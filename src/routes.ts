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
  'SEO & Search Growth': '/services/seo-search-growth',
  'Brand Growth & Creative': '/services/brand-growth-creative',
  'Privacy Policy': '/privacy-policy',
  'Terms & Conditions': '/terms-and-conditions',
  FAQ: '/faq',
  Shop: '/shop',
};

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
  if (clean === '/shop' || clean.startsWith('/shop/')) return 'Shop';

  return 'Home';
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
