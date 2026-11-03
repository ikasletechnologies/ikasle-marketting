import type { ComponentType } from 'react';
import { lazyNamed } from '../../../../lib/lazyNamed';
import type { ServicePageProps } from '../template/ServiceDetailTemplate';

/** Brand Growth & Creative detail pages built on ServiceDetailTemplate, keyed by app section name. */
export const BRAND_TEMPLATE_PAGES: Record<string, ComponentType<ServicePageProps> | undefined> = {
  'Brand Discovery & Audit': lazyNamed(() => import('./BrandDiscoveryPage'), 'BrandDiscoveryPage'),
  'Brand Strategy & Positioning': lazyNamed(() => import('./BrandStrategyPage'), 'BrandStrategyPage'),
  'Brand Messaging & Voice': lazyNamed(() => import('./BrandMessagingPage'), 'BrandMessagingPage'),
  'Logo & Visual Identity': lazyNamed(() => import('./LogoIdentityPage'), 'LogoIdentityPage'),
  'Brand Guidelines & Templates': lazyNamed(() => import('./BrandGuidelinesPage'), 'BrandGuidelinesPage'),
  'Marketing Collateral Design': lazyNamed(() => import('./MarketingCollateralPage'), 'MarketingCollateralPage'),
  'Website & Landing Page Design': lazyNamed(() => import('./WebsiteDesignPage'), 'WebsiteDesignPage'),
  'Creative Campaigns & Storytelling': lazyNamed(() => import('./CreativeCampaignsPage'), 'CreativeCampaignsPage'),
  'Brand Experience & Consistency': lazyNamed(() => import('./BrandExperiencePage'), 'BrandExperiencePage'),
  'Brand Launch & Refresh': lazyNamed(() => import('./BrandLaunchPage'), 'BrandLaunchPage'),
};

/** Brand Growth & Creative overview card ids → app section names. */
export const BRAND_SECTION_BY_ID: Record<string, string> = {
  discovery: 'Brand Discovery & Audit',
  strategy: 'Brand Strategy & Positioning',
  messaging: 'Brand Messaging & Voice',
  logo: 'Logo & Visual Identity',
  guidelines: 'Brand Guidelines & Templates',
  collateral: 'Marketing Collateral Design',
  website: 'Website & Landing Page Design',
  creative: 'Creative Campaigns & Storytelling',
  experience: 'Brand Experience & Consistency',
  launch: 'Brand Launch & Refresh',
};
