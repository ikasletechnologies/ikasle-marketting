import type { ComponentType } from 'react';
import { lazyNamed } from '../../../../lib/lazyNamed';
import type { ServicePageProps } from '../template/ServiceDetailTemplate';

/** Social service pages built on ServiceDetailTemplate, keyed by app section name. */
export const SOCIAL_TEMPLATE_PAGES: Record<string, ComponentType<ServicePageProps> | undefined> = {
  'Social Media Management': lazyNamed(() => import('./SocialMediaManagementPage'), 'SocialMediaManagementPage'),
  'Reels & Short-Form Video': lazyNamed(() => import('./ReelsVideoPage'), 'ReelsVideoPage'),
  'Community Management': lazyNamed(() => import('./CommunityManagementPage'), 'CommunityManagementPage'),
  'Social Media Advertising': lazyNamed(() => import('./SocialAdvertisingPage'), 'SocialAdvertisingPage'),
  'Influencer & Creator Campaigns': lazyNamed(() => import('./InfluencerCampaignsPage'), 'InfluencerCampaignsPage'),
  'Social Analytics & Reporting': lazyNamed(() => import('./SocialAnalyticsPage'), 'SocialAnalyticsPage'),
};

/** Social Media Marketing overview card ids → app section names. */
export const SOCIAL_SECTION_BY_ID: Record<string, string> = {
  strategy: 'Social Media Strategy',
  profile: 'Profile Setup & Optimisation',
  management: 'Social Media Management',
  planning: 'Content Planning',
  posts: 'Creative Posts & Carousels',
  reels: 'Reels & Short-Form Video',
  community: 'Community Management',
  advertising: 'Social Media Advertising',
  influencer: 'Influencer & Creator Campaigns',
  analytics: 'Social Analytics & Reporting',
};
