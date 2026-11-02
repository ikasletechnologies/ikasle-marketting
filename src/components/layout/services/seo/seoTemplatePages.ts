import type React from 'react';
import type { ServicePageProps } from '../template/ServiceDetailTemplate';
import { SeoAuditPage } from './SeoAuditPage';
import { KeywordResearchPage } from './KeywordResearchPage';
import { TechnicalSeoPage } from './TechnicalSeoPage';
import { OnPageSeoPage } from './OnPageSeoPage';
import { LocalSeoPage } from './LocalSeoPage';
import { GoogleBusinessProfilePage } from './GoogleBusinessProfilePage';
import { ContentTopicPlanningPage } from './ContentTopicPlanningPage';
import { OffPageSeoPage } from './OffPageSeoPage';
import { EcommerceSeoPage } from './EcommerceSeoPage';
import { SearchAnalyticsPage } from './SearchAnalyticsPage';

/** SEO detail pages built on ServiceDetailTemplate, keyed by app section name. */
export const SEO_TEMPLATE_PAGES: Record<string, React.FC<ServicePageProps> | undefined> = {
  'SEO Audit & Strategy': SeoAuditPage,
  'Keyword & Search Intent Research': KeywordResearchPage,
  'Technical SEO': TechnicalSeoPage,
  'On-Page SEO': OnPageSeoPage,
  'Local SEO': LocalSeoPage,
  'Google Business Profile': GoogleBusinessProfilePage,
  'SEO Content & Topic Planning': ContentTopicPlanningPage,
  'Off-Page SEO & Digital PR': OffPageSeoPage,
  'E-Commerce SEO': EcommerceSeoPage,
  'Search Analytics & Reporting': SearchAnalyticsPage,
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
