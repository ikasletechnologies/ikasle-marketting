/** Maps each page (section name used by the app) to its URL path. */
export const ROUTES: Record<string, string> = {
  Home: '/',
  About: '/about',
  Services: '/services',
  Blogs: '/blogs',
  Contact: '/contact',
  'Digital Marketing': '/services/digital-marketing',
  'Social Media Marketing': '/services/social-media-marketing',
  'SEO & Search Growth': '/services/seo-search-growth',
  'Brand Growth & Creative': '/services/brand-growth-creative',
  'Privacy Policy': '/privacy-policy',
  'Terms & Conditions': '/terms-and-conditions',
  FAQ: '/faq',
};

const normalise = (path: string) => (path.length > 1 ? path.replace(/\/+$/, '') : path);

export const sectionFromPath = (path: string): string =>
  Object.keys(ROUTES).find((section) => ROUTES[section] === normalise(path)) ?? 'Home';

export const pathFromSection = (section: string): string => ROUTES[section] ?? '/';
