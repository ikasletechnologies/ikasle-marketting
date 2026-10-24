export const APP_CONFIG = {
  appName: 'Ikasle Marketing Platform',
  version: '1.0.0',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  itemsPerPage: 10,
};

export const LEAD_STATUS_CONFIG = {
  new: { label: 'New Lead', color: 'blue', bg: 'var(--color-blue-subtle)' },
  contacted: { label: 'Contacted', color: 'amber', bg: 'var(--color-amber-subtle)' },
  qualified: { label: 'Qualified', color: 'purple', bg: 'var(--color-purple-subtle)' },
  enrolled: { label: 'Enrolled', color: 'emerald', bg: 'var(--color-emerald-subtle)' },
  lost: { label: 'Lost', color: 'rose', bg: 'var(--color-rose-subtle)' },
} as const;

export const CAMPAIGN_CHANNELS = ['Google', 'Meta', 'LinkedIn', 'Email', 'SMS'] as const;
