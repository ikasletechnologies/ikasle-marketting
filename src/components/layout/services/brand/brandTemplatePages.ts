import type React from 'react';
import type { ServicePageProps } from '../template/ServiceDetailTemplate';
import { BrandDiscoveryPage } from './BrandDiscoveryPage';
import { BrandStrategyPage } from './BrandStrategyPage';
import { BrandMessagingPage } from './BrandMessagingPage';
import { LogoIdentityPage } from './LogoIdentityPage';
import { BrandGuidelinesPage } from './BrandGuidelinesPage';
import { MarketingCollateralPage } from './MarketingCollateralPage';
import { WebsiteDesignPage } from './WebsiteDesignPage';
import { CreativeCampaignsPage } from './CreativeCampaignsPage';
import { BrandExperiencePage } from './BrandExperiencePage';
import { BrandLaunchPage } from './BrandLaunchPage';

/** Brand Growth & Creative detail pages built on ServiceDetailTemplate, keyed by app section name. */
export const BRAND_TEMPLATE_PAGES: Record<string, React.FC<ServicePageProps> | undefined> = {
  'Brand Discovery & Audit': BrandDiscoveryPage,
  'Brand Strategy & Positioning': BrandStrategyPage,
  'Brand Messaging & Voice': BrandMessagingPage,
  'Logo & Visual Identity': LogoIdentityPage,
  'Brand Guidelines & Templates': BrandGuidelinesPage,
  'Marketing Collateral Design': MarketingCollateralPage,
  'Website & Landing Page Design': WebsiteDesignPage,
  'Creative Campaigns & Storytelling': CreativeCampaignsPage,
  'Brand Experience & Consistency': BrandExperiencePage,
  'Brand Launch & Refresh': BrandLaunchPage,
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
