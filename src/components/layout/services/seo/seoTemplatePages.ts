import type { ComponentType } from 'react';
import { lazyNamed } from '../../../../lib/lazyNamed';
import type { ServicePageProps } from '../template/ServiceDetailTemplate';

/** SEO detail pages built on ServiceDetailTemplate, keyed by app section name. */
export const SEO_TEMPLATE_PAGES: Record<string, ComponentType<ServicePageProps> | undefined> = {
  'SEO Audit & Strategy': lazyNamed(() => import('./SeoAuditPage'), 'SeoAuditPage'),
  'Keyword & Search Intent Research': lazyNamed(() => import('./KeywordResearchPage'), 'KeywordResearchPage'),
  'Technical SEO': lazyNamed(() => import('./TechnicalSeoPage'), 'TechnicalSeoPage'),
  'On-Page SEO': lazyNamed(() => import('./OnPageSeoPage'), 'OnPageSeoPage'),
  'Local SEO': lazyNamed(() => import('./LocalSeoPage'), 'LocalSeoPage'),
  'Google Business Profile': lazyNamed(() => import('./GoogleBusinessProfilePage'), 'GoogleBusinessProfilePage'),
  'SEO Content & Topic Planning': lazyNamed(() => import('./ContentTopicPlanningPage'), 'ContentTopicPlanningPage'),
  'Off-Page SEO & Digital PR': lazyNamed(() => import('./OffPageSeoPage'), 'OffPageSeoPage'),
  'E-Commerce SEO': lazyNamed(() => import('./EcommerceSeoPage'), 'EcommerceSeoPage'),
  'Search Analytics & Reporting': lazyNamed(() => import('./SearchAnalyticsPage'), 'SearchAnalyticsPage'),
};

/** SEO & Search Growth overview card ids → app section names. */
export const SEO_SECTION_BY_ID: Record<string, string> = {
  audit: 'SEO Audit & Strategy',
  keyword: 'Keyword & Search Intent Research',
  technical: 'Technical SEO',
  onpage: 'On-Page SEO',
  local: 'Local SEO',
  gbp: 'Google Business Profile',
  content: 'SEO Content & Topic Planning',
  offpage: 'Off-Page SEO & Digital PR',
  ecommerce: 'E-Commerce SEO',
  analytics: 'Search Analytics & Reporting',
};
