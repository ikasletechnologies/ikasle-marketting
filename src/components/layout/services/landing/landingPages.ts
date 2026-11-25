import type { ComponentType } from 'react';
import { lazyNamed } from '../../../../lib/lazyNamed';
import { ROUTES } from '../../../../routes';
import type { LandingPageProps } from './types';

/** One lazily loaded chunk per service category, so a visit only downloads its category's content. */
const BY_PREFIX: [prefix: string, page: ComponentType<LandingPageProps>][] = [
  ['/services/digital-marketing/', lazyNamed(() => import('./content/digital'), 'DigitalLanding')],
  ['/services/social-media-marketing/', lazyNamed(() => import('./content/social'), 'SocialLanding')],
  ['/services/seo-search-growth/', lazyNamed(() => import('./content/seo'), 'SeoLanding')],
  ['/services/brand-growth-creative/', lazyNamed(() => import('./content/brand'), 'BrandLanding')],
];

/** The landing page component for a service detail section, or undefined for every other page. */
export const landingPageFor = (section: string): ComponentType<LandingPageProps> | undefined => {
  const path = ROUTES[section];
  return path ? BY_PREFIX.find(([prefix]) => path.startsWith(prefix))?.[1] : undefined;
};
