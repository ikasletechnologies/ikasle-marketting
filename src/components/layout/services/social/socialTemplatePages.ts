import type React from 'react';
import type { ServicePageProps } from '../template/ServiceDetailTemplate';
import { ReelsVideoPage } from './ReelsVideoPage';
import { SocialMediaManagementPage } from './SocialMediaManagementPage';
import { CommunityManagementPage } from './CommunityManagementPage';
import { SocialAdvertisingPage } from './SocialAdvertisingPage';
import { InfluencerCampaignsPage } from './InfluencerCampaignsPage';
import { SocialAnalyticsPage } from './SocialAnalyticsPage';

/** Social service pages built on ServiceDetailTemplate, keyed by app section name. */
export const SOCIAL_TEMPLATE_PAGES: Record<string, React.FC<ServicePageProps> | undefined> = {
  'Social Media Management': SocialMediaManagementPage,
  'Reels & Short-Form Video': ReelsVideoPage,
  'Community Management': CommunityManagementPage,
  'Social Media Advertising': SocialAdvertisingPage,
  'Influencer & Creator Campaigns': InfluencerCampaignsPage,
  'Social Analytics & Reporting': SocialAnalyticsPage,
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
