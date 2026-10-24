import type { Lead, MetricSummary } from '../types';

// Mock initial data for development and immediate visual preview
const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    studentName: 'Aarav Patel',
    email: 'aarav.patel@example.com',
    phone: '+91 98765 43210',
    courseInterest: 'Full Stack Web Engineering',
    status: 'enrolled',
    source: 'Google Ads',
    score: 95,
    assignedTo: 'Sarah Jenkins',
    createdAt: '2026-10-18T10:30:00Z',
    lastContactedAt: '2026-10-21T14:15:00Z',
  },
  {
    id: 'lead-2',
    studentName: 'Ananya Sharma',
    email: 'ananya.s@example.com',
    phone: '+91 98451 12345',
    courseInterest: 'Data Science & AI',
    status: 'qualified',
    source: 'Meta',
    score: 88,
    assignedTo: 'Sarah Jenkins',
    createdAt: '2026-10-19T08:20:00Z',
    lastContactedAt: '2026-10-22T09:40:00Z',
  },
  {
    id: 'lead-3',
    studentName: 'Vikram Sundaram',
    email: 'vikram.sundar@example.com',
    phone: '+91 97890 65432',
    courseInterest: 'UI/UX Product Design',
    status: 'contacted',
    source: 'Campus Drive',
    score: 72,
    assignedTo: 'Rajesh Kumar',
    createdAt: '2026-10-20T11:45:00Z',
  },
  {
    id: 'lead-4',
    studentName: 'Priya Nambiar',
    email: 'priya.n@example.com',
    phone: '+91 99012 34567',
    courseInterest: 'Cloud & DevOps Masters',
    status: 'new',
    source: 'Organic',
    score: 65,
    createdAt: '2026-10-22T13:10:00Z',
  },
  {
    id: 'lead-5',
    studentName: 'Karthik Subramanian',
    email: 'karthik.sub@example.com',
    phone: '+91 94440 98765',
    courseInterest: 'Full Stack Web Engineering',
    status: 'lost',
    source: 'Meta',
    score: 40,
    assignedTo: 'Rajesh Kumar',
    createdAt: '2026-10-15T09:00:00Z',
  },
];

export const leadService = {
  async getLeads(): Promise<Lead[]> {
    // In production, this calls api.get<Lead[]>('/leads')
    return Promise.resolve(MOCK_LEADS);
  },

  async getMetrics(): Promise<MetricSummary> {
    return Promise.resolve({
      totalLeads: 1420,
      leadsGrowthPercentage: 18.4,
      activeCampaigns: 8,
      conversionRate: 14.2,
      totalSpend: 12500,
      averageCPL: 8.8,
    });
  },
};
