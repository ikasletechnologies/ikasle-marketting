import type { Campaign, CampaignWeek, Lead, LeadChannel, LeadStatus } from '../types';

/**
 * Demo data for the internal Leads and Campaigns dashboards (IKAS-301/302).
 *
 * Generated deterministically and *relative to today*, so the dashboards always show
 * a realistic recent window instead of going stale. Replace the bodies of
 * getLeads()/getCampaigns() with api.get(...) calls once a lead API exists.
 */

const DAY = 86_400_000;

/** Small seeded PRNG so the demo data is stable across reloads. */
function seeded(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

const FIRST = ['Aarav', 'Ananya', 'Vikram', 'Priya', 'Karthik', 'Meera', 'Rohan', 'Divya', 'Arjun', 'Lakshmi', 'Nikhil', 'Sneha', 'Harish', 'Kavya', 'Rahul', 'Fathima', 'Siddharth', 'Nandini', 'Joel', 'Ishita', 'Manoj', 'Revathi', 'Aditya', 'Pooja'];
const LAST = ['Patel', 'Sharma', 'Sundaram', 'Nambiar', 'Subramanian', 'Iyer', 'Menon', 'Reddy', 'Krishnan', 'Pillai', 'Rao', 'Thomas', 'Joseph', 'Varma', 'Nair', 'Das'];
const COURSES = ['Full Stack Web Engineering', 'Data Science & AI', 'UI/UX Product Design', 'Cloud & DevOps', 'Digital Marketing Pro'];
const COUNSELLORS = ['Sarah Jenkins', 'Rajesh Kumar', 'Anitha Prakash'];
const CHANNELS: LeadChannel[] = ['Google Ads', 'Meta', 'SEO', 'Campus Referral'];

function buildLeads(now: number): Lead[] {
  const rand = seeded(20261103);
  const leads: Lead[] = [];
  for (let i = 0; i < 48; i += 1) {
    const first = FIRST[i % FIRST.length];
    const last = LAST[Math.floor(rand() * LAST.length)];
    const ageDays = Math.floor(rand() * 85);
    const createdAt = now - ageDays * DAY - Math.floor(rand() * DAY);
    const source = CHANNELS[Math.floor(rand() * CHANNELS.length)];
    const score = Math.min(100, Math.max(8, Math.round(35 + rand() * 60 + (source === 'Campus Referral' ? 8 : 0))));
    // Older, higher-scoring leads are further down the pipeline.
    const progress = rand() * 0.6 + (score / 100) * 0.4 + Math.min(ageDays / 60, 1) * 0.3;
    let status: LeadStatus = 'new';
    if (ageDays > 2) status = 'in_contact';
    if (progress > 0.72) status = 'interview_scheduled';
    if (progress > 0.95 && ageDays > 10) status = 'enrolled';
    if (score < 45 && ageDays > 20) status = 'lost';
    const contacted = status !== 'new';
    leads.push({
      id: `lead-${String(i + 1).padStart(3, '0')}`,
      studentName: `${first} ${last}`,
      email: `${first}.${last}${i}`.toLowerCase() + '@example.com',
      phone: `+91 9${String(Math.floor(rand() * 1e9)).padStart(9, '0').replace(/(\d{4})(\d{5})/, '$1 $2')}`,
      courseInterest: COURSES[Math.floor(rand() * COURSES.length)],
      status,
      source,
      score,
      assignedTo: contacted ? COUNSELLORS[i % COUNSELLORS.length] : undefined,
      createdAt: new Date(createdAt).toISOString(),
      lastContactedAt: contacted ? new Date(Math.min(now, createdAt + (1 + Math.floor(rand() * 6)) * DAY)).toISOString() : undefined,
    });
  }
  return leads.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

const CAMPAIGN_SEEDS: { id: string; name: string; channel: LeadChannel; budget: number; startWeeksAgo: number; lengthWeeks: number; cpl: number; enrolRate: number; status: Campaign['status']; days: number }[] = [
  { id: 'cmp-1', name: 'Data Science Jan Intake · Search', channel: 'Google Ads', budget: 240000, startWeeksAgo: 7, lengthWeeks: 12, cpl: 620, enrolRate: 0.09, status: 'active', days: 18 },
  { id: 'cmp-2', name: 'Full Stack Bootcamp · Lead Forms', channel: 'Meta', budget: 180000, startWeeksAgo: 7, lengthWeeks: 10, cpl: 410, enrolRate: 0.05, status: 'active', days: 24 },
  { id: 'cmp-3', name: 'UI/UX Design · Reels Retargeting', channel: 'Meta', budget: 90000, startWeeksAgo: 5, lengthWeeks: 8, cpl: 380, enrolRate: 0.06, status: 'active', days: 21 },
  { id: 'cmp-4', name: 'Course Pages · Organic Content', channel: 'SEO', budget: 60000, startWeeksAgo: 7, lengthWeeks: 16, cpl: 250, enrolRate: 0.11, status: 'active', days: 15 },
  { id: 'cmp-5', name: 'Campus Ambassador Programme', channel: 'Campus Referral', budget: 75000, startWeeksAgo: 7, lengthWeeks: 8, cpl: 300, enrolRate: 0.16, status: 'active', days: 12 },
  { id: 'cmp-6', name: 'Cloud & DevOps · Brand Search', channel: 'Google Ads', budget: 50000, startWeeksAgo: 6, lengthWeeks: 6, cpl: 700, enrolRate: 0.08, status: 'paused', days: 20 },
];

/** Monday 00:00 UTC of the week containing `time`. */
function weekStart(time: number): number {
  const date = new Date(time);
  const day = (date.getUTCDay() + 6) % 7;
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() - day);
}

function buildCampaigns(now: number): Campaign[] {
  const thisWeek = weekStart(now);
  return CAMPAIGN_SEEDS.map((seed, index) => {
    const rand = seeded(1000 + index * 97);
    const start = thisWeek - seed.startWeeksAgo * 7 * DAY;
    const end = start + seed.lengthWeeks * 7 * DAY - DAY;
    const weeklyBudget = seed.budget / seed.lengthWeeks;
    const weeks: CampaignWeek[] = [];
    for (let w = 0; w <= seed.startWeeksAgo; w += 1) {
      const isCurrent = w === seed.startWeeksAgo;
      const elapsedShare = isCurrent ? Math.max(0.15, ((now - thisWeek) / (7 * DAY))) : 1;
      if (seed.status === 'paused' && w > 3) {
        weeks.push({ weekStart: new Date(start + w * 7 * DAY).toISOString().slice(0, 10), leads: 0, enrolments: 0, spend: 0 });
        continue;
      }
      // Pacing varies by campaign: some run hot, some under-deliver.
      const pace = 0.8 + rand() * 0.45 + (index === 1 ? 0.18 : 0) - (index === 3 ? 0.2 : 0);
      const spend = Math.round(weeklyBudget * pace * elapsedShare);
      const leads = Math.max(0, Math.round((spend / seed.cpl) * (0.85 + rand() * 0.3)));
      const enrolments = w < 2 ? 0 : Math.round(leads * seed.enrolRate * (0.7 + rand() * 0.6));
      weeks.push({ weekStart: new Date(start + w * 7 * DAY).toISOString().slice(0, 10), leads, enrolments, spend });
    }
    return {
      id: seed.id,
      name: seed.name,
      channel: seed.channel,
      budget: seed.budget,
      status: seed.status,
      startDate: new Date(start).toISOString().slice(0, 10),
      endDate: new Date(end).toISOString().slice(0, 10),
      weeks,
      avgDaysToEnrol: seed.days,
    };
  });
}

export const leadService = {
  async getLeads(now = Date.now()): Promise<Lead[]> {
    return buildLeads(now);
  },
  async getCampaigns(now = Date.now()): Promise<Campaign[]> {
    return buildCampaigns(now);
  },
};

export const LEAD_CHANNELS = CHANNELS;
