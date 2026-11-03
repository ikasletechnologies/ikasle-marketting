import React, { useEffect, useMemo, useState } from 'react';
import { Download, Search, SearchX, X } from 'lucide-react';
import type { Lead, LeadChannel, LeadStatus } from '../../../types';
import { LEAD_CHANNELS, leadService } from '../../../services/leadService';
import { LEAD_STATUSES, LEAD_STATUS_CONFIG, scoreTier } from '../../../utils/constants';
import { useDebounce } from '../../../hooks/useDebounce';
import { downloadCsv, toCsv, type CsvColumn } from '../../../utils/csv';
import { DashboardShell } from './DashboardShell';

interface LeadsPageProps {
  onNavigate: (section: string) => void;
}

const RANGES = [
  { value: 'all', label: 'All time', days: 0 },
  { value: '7', label: 'Last 7 days', days: 7 },
  { value: '30', label: 'Last 30 days', days: 30 },
  { value: '90', label: 'Last 90 days', days: 90 },
] as const;
type Range = (typeof RANGES)[number]['value'];

type Sort = 'newest' | 'oldest' | 'score-desc' | 'score-asc';

const DATE = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
const formatDate = (iso?: string) => (iso ? DATE.format(new Date(iso)) : '');

const CSV_COLUMNS: CsvColumn<Lead>[] = [
  { header: 'Lead ID', value: (lead) => lead.id },
  { header: 'Student name', value: (lead) => lead.studentName },
  { header: 'Email', value: (lead) => lead.email },
  { header: 'Phone', value: (lead) => lead.phone },
  { header: 'Course interest', value: (lead) => lead.courseInterest },
  { header: 'Channel', value: (lead) => lead.source },
  { header: 'Status', value: (lead) => LEAD_STATUS_CONFIG[lead.status].label },
  { header: 'Lead score', value: (lead) => lead.score },
  { header: 'Counsellor', value: (lead) => lead.assignedTo ?? '' },
  { header: 'Received', value: (lead) => lead.createdAt.slice(0, 10) },
  { header: 'Last contacted', value: (lead) => lead.lastContactedAt?.slice(0, 10) ?? '' },
];

export const LeadsPage: React.FC<LeadsPageProps> = ({ onNavigate }) => {
  const [leads, setLeads] = useState<Lead[] | null>(null);
  const [range, setRange] = useState<Range>('all');
  const [query, setQuery] = useState('');
  const [channel, setChannel] = useState<'all' | LeadChannel>('all');
  const [status, setStatus] = useState<'all' | LeadStatus>('all');
  const [sort, setSort] = useState<Sort>('newest');
  const [now] = useState(() => Date.now());
  const debouncedQuery = useDebounce(query.trim().toLowerCase(), 150);

  useEffect(() => {
    let cancelled = false;
    leadService.getLeads(now).then((data) => {
      if (!cancelled) setLeads(data);
    });
    return () => {
      cancelled = true;
    };
  }, [now]);

  // Range-scoped list: the status counts and the table both use it so the numbers agree.
  const inRange = useMemo(() => {
    if (!leads) return [];
    const days = RANGES.find((option) => option.value === range)?.days ?? 0;
    if (!days) return leads;
    const cutoff = now - days * 86_400_000;
    return leads.filter((lead) => new Date(lead.createdAt).getTime() >= cutoff);
  }, [leads, range, now]);

  const filtered = useMemo(() => {
    const words = debouncedQuery ? debouncedQuery.split(/\s+/) : [];
    const rows = inRange.filter((lead) => {
      if (channel !== 'all' && lead.source !== channel) return false;
      if (status !== 'all' && lead.status !== status) return false;
      if (!words.length) return true;
      const haystack = `${lead.studentName} ${lead.email} ${lead.courseInterest} ${lead.assignedTo ?? ''}`.toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
    const sorted = [...rows];
    if (sort === 'newest') sorted.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sort === 'oldest') sorted.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
    if (sort === 'score-desc') sorted.sort((a, b) => b.score - a.score);
    if (sort === 'score-asc') sorted.sort((a, b) => a.score - b.score);
    return sorted;
  }, [inRange, channel, status, debouncedQuery, sort]);

  const statusCounts = useMemo(() => {
    const counts = Object.fromEntries(LEAD_STATUSES.map((key) => [key, 0])) as Record<LeadStatus, number>;
    for (const lead of inRange) {
      if (channel === 'all' || lead.source === channel) counts[lead.status] += 1;
    }
    return counts;
  }, [inRange, channel]);

  const hasFilters = range !== 'all' || channel !== 'all' || status !== 'all' || Boolean(query);
  const resetFilters = () => {
    setRange('all');
    setChannel('all');
    setStatus('all');
    setQuery('');
  };

  const exportCsv = () => {
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(`ikasle-leads-${stamp}.csv`, toCsv(filtered, CSV_COLUMNS));
  };

  return (
    <DashboardShell
      active="Leads Dashboard"
      title="Student lead pipeline"
      subtitle="Review incoming enquiries from every campaign and move them toward enrolment."
      onNavigate={onNavigate}
      actions={
        <button type="button" className="dash-button primary" onClick={exportCsv} disabled={!filtered.length}>
          <Download size={17} aria-hidden="true" /> Export CSV{filtered.length ? ` (${filtered.length})` : ''}
        </button>
      }
    >
      <div className="dash-filters" role="group" aria-label="Filter leads">
        <label className="dash-field">
          <span>Received</span>
          <select value={range} onChange={(event) => setRange(event.target.value as Range)}>
            {RANGES.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label className="dash-field dash-field-search">
          <span>Search</span>
          <span className="dash-search">
            <Search size={16} aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, email, course or counsellor" maxLength={80} />
          </span>
        </label>
        <label className="dash-field">
          <span>Channel</span>
          <select value={channel} onChange={(event) => setChannel(event.target.value as 'all' | LeadChannel)}>
            <option value="all">All channels</option>
            {LEAD_CHANNELS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="dash-field">
          <span>Status</span>
          <select value={status} onChange={(event) => setStatus(event.target.value as 'all' | LeadStatus)}>
            <option value="all">All statuses</option>
            {LEAD_STATUSES.map((key) => <option key={key} value={key}>{LEAD_STATUS_CONFIG[key].label}</option>)}
          </select>
        </label>
        <label className="dash-field">
          <span>Sort</span>
          <select value={sort} onChange={(event) => setSort(event.target.value as Sort)}>
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="score-desc">Highest score</option>
            <option value="score-asc">Lowest score</option>
          </select>
        </label>
        {hasFilters && (
          <button type="button" className="dash-button ghost dash-reset" onClick={resetFilters}>
            <X size={16} aria-hidden="true" /> Reset
          </button>
        )}
      </div>

      <div className="dash-status-strip" role="group" aria-label="Leads by status">
        {LEAD_STATUSES.map((key) => (
          <button
            key={key}
            type="button"
            className={`dash-status-card${status === key ? ' active' : ''}`}
            aria-pressed={status === key}
            onClick={() => setStatus(status === key ? 'all' : key)}
          >
            <span className={`dash-pill dash-pill-${LEAD_STATUS_CONFIG[key].tone}`}>{LEAD_STATUS_CONFIG[key].label}</span>
            <strong>{statusCounts[key]}</strong>
          </button>
        ))}
      </div>

      <p className="dash-count" aria-live="polite">
        {leads === null ? 'Loading leads…' : `${filtered.length} of ${leads.length} leads`}
      </p>

      {leads !== null && filtered.length === 0 ? (
        <div className="dash-empty">
          <SearchX size={36} aria-hidden="true" />
          <h2>No leads match these filters.</h2>
          <button type="button" className="dash-button ghost" onClick={resetFilters}>Reset filters</button>
        </div>
      ) : (
        <div className="dash-table-wrap">
          <table className="dash-table dash-leads-table">
            <thead>
              <tr>
                <th scope="col">Student</th>
                <th scope="col">Course interest</th>
                <th scope="col">Channel</th>
                <th scope="col">Status</th>
                <th scope="col">Score</th>
                <th scope="col">Counsellor</th>
                <th scope="col">Received</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => {
                const tier = scoreTier(lead.score);
                return (
                  <tr key={lead.id}>
                    <td data-label="Student">
                      <strong>{lead.studentName}</strong>
                      <span className="dash-sub">{lead.email}</span>
                    </td>
                    <td data-label="Course">{lead.courseInterest}</td>
                    <td data-label="Channel">{lead.source}</td>
                    <td data-label="Status"><span className={`dash-pill dash-pill-${LEAD_STATUS_CONFIG[lead.status].tone}`}>{LEAD_STATUS_CONFIG[lead.status].label}</span></td>
                    <td data-label="Score">
                      <span className={`dash-score dash-score-${tier.tone}`} title={`${tier.label} fit and engagement`}>
                        <b>{lead.score}</b> {tier.label}
                      </span>
                    </td>
                    <td data-label="Counsellor">{lead.assignedTo ?? <span className="dash-sub">Unassigned</span>}</td>
                    <td data-label="Received"><time dateTime={lead.createdAt}>{formatDate(lead.createdAt)}</time></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
};

export default LeadsPage;
