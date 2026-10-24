export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'marketer' | 'agent' | 'viewer';
  avatarUrl?: string;
}

export interface Lead {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  courseInterest: string;
  status: 'new' | 'contacted' | 'qualified' | 'enrolled' | 'lost';
  source: 'Google Ads' | 'Meta' | 'Organic' | 'Referral' | 'Campus Drive';
  score: number;
  assignedTo?: string;
  createdAt: string;
  lastContactedAt?: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: 'Google' | 'Meta' | 'LinkedIn' | 'Email' | 'SMS';
  budget: number;
  spent: number;
  leadsGenerated: number;
  cpl: number; // Cost Per Lead
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate?: string;
}

export interface MetricSummary {
  totalLeads: number;
  leadsGrowthPercentage: number;
  activeCampaigns: number;
  conversionRate: number;
  totalSpend: number;
  averageCPL: number;
}
