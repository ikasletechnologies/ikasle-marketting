export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'marketer' | 'agent' | 'viewer';
  avatarUrl?: string;
}

/** Student lead pipeline stages (IKAS-301). */
export type LeadStatus = 'new' | 'in_contact' | 'interview_scheduled' | 'enrolled' | 'lost';

/** Acquisition channels a lead can come from (IKAS-301). */
export type LeadChannel = 'Google Ads' | 'Meta' | 'SEO' | 'Campus Referral';

export interface Lead {
  id: string;
  studentName: string;
  email: string;
  phone: string;
  courseInterest: string;
  status: LeadStatus;
  source: LeadChannel;
  /** 0-100, based on programme fit and engagement. */
  score: number;
  assignedTo?: string;
  createdAt: string;
  lastContactedAt?: string;
}

export interface CampaignWeek {
  /** ISO date of the Monday that starts the week. */
  weekStart: string;
  leads: number;
  enrolments: number;
  spend: number;
}

export interface Campaign {
  id: string;
  name: string;
  channel: LeadChannel;
  /** Total flight budget in INR. */
  budget: number;
  status: 'active' | 'paused' | 'completed';
  startDate: string;
  endDate: string;
  /** Oldest first. Totals are derived from these so every view agrees. */
  weeks: CampaignWeek[];
  /** Average days from enquiry to enrolment for this campaign's students. */
  avgDaysToEnrol: number;
}
