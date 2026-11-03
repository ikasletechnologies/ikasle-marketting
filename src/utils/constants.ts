import type { LeadStatus } from '../types';

export const APP_CONFIG = {
  appName: 'Ikasle Marketing Platform',
  version: '1.0.0',
  // Same-origin by default: Vite proxies /api in development and the Node server serves both in production.
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  itemsPerPage: 10,
};

/** Pipeline stages in order, with display labels (IKAS-301). */
export const LEAD_STATUS_CONFIG: Record<LeadStatus, { label: string; tone: 'blue' | 'amber' | 'violet' | 'teal' | 'rose' }> = {
  new: { label: 'New Lead', tone: 'blue' },
  in_contact: { label: 'In Contact', tone: 'amber' },
  interview_scheduled: { label: 'Interview Scheduled', tone: 'violet' },
  enrolled: { label: 'Enrolled', tone: 'teal' },
  lost: { label: 'Lost', tone: 'rose' },
};

export const LEAD_STATUSES = Object.keys(LEAD_STATUS_CONFIG) as LeadStatus[];

/** Lead score tiers: label + tone so the badge never relies on colour alone. */
export function scoreTier(score: number): { label: 'High' | 'Medium' | 'Low'; tone: 'high' | 'medium' | 'low' } {
  if (score >= 80) return { label: 'High', tone: 'high' };
  if (score >= 50) return { label: 'Medium', tone: 'medium' };
  return { label: 'Low', tone: 'low' };
}
