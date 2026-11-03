import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle2, PauseCircle, TrendingDown } from 'lucide-react';
import type { Campaign, LeadChannel } from '../../../types';
import { LEAD_CHANNELS, leadService } from '../../../services/leadService';
import { formatCurrency } from '../../../utils/formatters';
import { DashboardShell } from './DashboardShell';
import { WeeklyChart, type WeekPoint } from './WeeklyChart';

interface CampaignsPageProps {
  onNavigate: (section: string) => void;
}

const DAY = 86_400_000;
const WEEKS_SHOWN = 8;

interface CampaignStats {
  campaign: Campaign;
  spent: number;
  leads: number;
  enrolments: number;
  /** Share of the flight that has elapsed, 0-1. */
  elapsed: number;
  pace: 'on' | 'ahead' | 'behind' | 'paused';
}

function summarise(campaign: Campaign, now: number): CampaignStats {
  const spent = campaign.weeks.reduce((sum, week) => sum + week.spend, 0);
  const leads = campaign.weeks.reduce((sum, week) => sum + week.leads, 0);
  const enrolments = campaign.weeks.reduce((sum, week) => sum + week.enrolments, 0);
  const start = Date.parse(`${campaign.startDate}T00:00:00Z`);
  const end = Date.parse(`${campaign.endDate}T00:00:00Z`) + DAY;
  const elapsed = Math.min(1, Math.max(0, (now - start) / (end - start)));
  const ratio = elapsed > 0 ? spent / (campaign.budget * elapsed) : 0;
  const pace = campaign.status === 'paused' ? 'paused' : ratio > 1.1 ? 'ahead' : ratio < 0.85 ? 'behind' : 'on';
  return { campaign, spent, leads, enrolments, elapsed, pace };
}

const PACE_LABELS = {
  on: { label: 'On pace', icon: CheckCircle2 },
  ahead: { label: 'Spending ahead of pace', icon: AlertTriangle },
  behind: { label: 'Under-spending', icon: TrendingDown },
  paused: { label: 'Paused', icon: PauseCircle },
} as const;

const ratioText = (numerator: number, denominator: number) => (denominator > 0 ? formatCurrency(numerator / denominator) : '—');

export const CampaignsPage: React.FC<CampaignsPageProps> = ({ onNavigate }) => {
  const [campaigns, setCampaigns] = useState<Campaign[] | null>(null);
  const [channel, setChannel] = useState<'all' | LeadChannel>('all');
  const [now] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;
    leadService.getCampaigns(now).then((data) => {
      if (!cancelled) setCampaigns(data);
    });
    return () => {
      cancelled = true;
    };
  }, [now]);

  // The channel filter scopes every tile, meter, chart and table below it.
  const stats = useMemo(
    () => (campaigns ?? []).filter((c) => channel === 'all' || c.channel === channel).map((c) => summarise(c, now)),
    [campaigns, channel, now],
  );

  const totals = useMemo(() => {
    const spent = stats.reduce((sum, s) => sum + s.spent, 0);
    const leads = stats.reduce((sum, s) => sum + s.leads, 0);
    const enrolments = stats.reduce((sum, s) => sum + s.enrolments, 0);
    const budget = stats.reduce((sum, s) => sum + s.campaign.budget, 0);
    const daysWeighted = stats.reduce((sum, s) => sum + s.campaign.avgDaysToEnrol * s.enrolments, 0);
    return { spent, leads, enrolments, budget, avgDays: enrolments ? Math.round(daysWeighted / enrolments) : null };
  }, [stats]);

  const weekly = useMemo<WeekPoint[]>(() => {
    const byWeek = new Map<string, WeekPoint>();
    for (const s of stats) {
      for (const week of s.campaign.weeks) {
        const point = byWeek.get(week.weekStart) ?? { weekStart: week.weekStart, leads: 0, enrolments: 0, partial: false };
        point.leads += week.leads;
        point.enrolments += week.enrolments;
        byWeek.set(week.weekStart, point);
      }
    }
    const points = [...byWeek.values()].sort((a, b) => a.weekStart.localeCompare(b.weekStart)).slice(-WEEKS_SHOWN);
    const last = points[points.length - 1];
    if (last && now - Date.parse(`${last.weekStart}T00:00:00Z`) < 7 * DAY) last.partial = true;
    return points;
  }, [stats, now]);

  return (
    <DashboardShell
      active="Campaigns Dashboard"
      title="Campaign performance"
      subtitle="Cost per lead, acquisition cost and budget pacing across every active campaign."
      onNavigate={onNavigate}
    >
      <div className="dash-filters" role="group" aria-label="Filter campaigns">
        <label className="dash-field">
          <span>Channel</span>
          <select value={channel} onChange={(event) => setChannel(event.target.value as 'all' | LeadChannel)}>
            <option value="all">All channels</option>
            {LEAD_CHANNELS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>

      {campaigns === null ? (
        <p className="dash-count">Loading campaigns…</p>
      ) : (
        <>
          <section className="dash-tiles" aria-label="Key figures">
            <article className="dash-tile">
              <h2>Cost per lead</h2>
              <p className="dash-tile-value">{ratioText(totals.spent, totals.leads)}</p>
              <p className="dash-tile-sub">{totals.leads.toLocaleString('en-IN')} leads from {formatCurrency(totals.spent)} spend</p>
            </article>
            <article className="dash-tile">
              <h2>Cost per enrolment (CAC)</h2>
              <p className="dash-tile-value">{ratioText(totals.spent, totals.enrolments)}</p>
              <p className="dash-tile-sub">{totals.enrolments.toLocaleString('en-IN')} enrolled students</p>
            </article>
            <article className="dash-tile">
              <h2>Lead-to-enrolment rate</h2>
              <p className="dash-tile-value">{totals.leads ? `${((totals.enrolments / totals.leads) * 100).toFixed(1)}%` : '—'}</p>
              <p className="dash-tile-sub">Across {stats.length} campaign{stats.length === 1 ? '' : 's'}</p>
            </article>
            <article className="dash-tile">
              <h2>Average days to enrol</h2>
              <p className="dash-tile-value">{totals.avgDays ?? '—'}</p>
              <p className="dash-tile-sub">From first enquiry to confirmed seat</p>
            </article>
          </section>

          <section className="dash-card" aria-labelledby="dash-velocity-title">
            <div className="dash-card-head">
              <h2 id="dash-velocity-title">Conversion velocity</h2>
              <p>Leads and enrolments per week, last {WEEKS_SHOWN} weeks. The current week is shown lighter until it ends.</p>
            </div>
            <WeeklyChart data={weekly} />
          </section>

          <section className="dash-card" aria-labelledby="dash-pacing-title">
            <div className="dash-card-head">
              <h2 id="dash-pacing-title">Budget pacing</h2>
              <p>Spend so far against each campaign’s budget. The marker shows where spend should be for the time elapsed.</p>
            </div>
            <ul className="dash-pacing">
              {stats.map((s) => {
                const pace = PACE_LABELS[s.pace];
                const PaceIcon = pace.icon;
                const spentPct = Math.min(100, (s.spent / s.campaign.budget) * 100);
                return (
                  <li key={s.campaign.id} className={`dash-pace dash-pace-${s.pace}`}>
                    <div className="dash-pace-head">
                      <div>
                        <strong>{s.campaign.name}</strong>
                        <span className="dash-sub">{s.campaign.channel}</span>
                      </div>
                      <span className="dash-pace-status"><PaceIcon size={16} aria-hidden="true" /> {pace.label}</span>
                    </div>
                    <div
                      className="dash-meter"
                      role="meter"
                      aria-valuemin={0}
                      aria-valuemax={s.campaign.budget}
                      aria-valuenow={s.spent}
                      aria-valuetext={`${formatCurrency(s.spent)} of ${formatCurrency(s.campaign.budget)} spent, ${Math.round(s.elapsed * 100)}% of the flight elapsed`}
                      aria-label={`${s.campaign.name} budget`}
                    >
                      <span className="dash-meter-fill" style={{ width: `${spentPct}%` }} />
                      <span className="dash-meter-marker" style={{ left: `${s.elapsed * 100}%` }} />
                    </div>
                    <p className="dash-pace-figures">
                      <span><b>{formatCurrency(s.spent)}</b> of {formatCurrency(s.campaign.budget)} ({Math.round(spentPct)}%)</span>
                      <span>{Math.round(s.elapsed * 100)}% of flight elapsed</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </section>

          <section className="dash-card" aria-labelledby="dash-table-title">
            <div className="dash-card-head">
              <h2 id="dash-table-title">Campaign breakdown</h2>
            </div>
            <div className="dash-table-wrap">
              <table className="dash-table dash-num-table">
                <thead>
                  <tr>
                    <th scope="col">Campaign</th>
                    <th scope="col">Channel</th>
                    <th scope="col">Spend</th>
                    <th scope="col">Leads</th>
                    <th scope="col">CPL</th>
                    <th scope="col">Enrolments</th>
                    <th scope="col">CAC</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.map((s) => (
                    <tr key={s.campaign.id}>
                      <td data-label="Campaign"><strong>{s.campaign.name}</strong></td>
                      <td data-label="Channel">{s.campaign.channel}</td>
                      <td data-label="Spend">{formatCurrency(s.spent)}</td>
                      <td data-label="Leads">{s.leads.toLocaleString('en-IN')}</td>
                      <td data-label="CPL">{ratioText(s.spent, s.leads)}</td>
                      <td data-label="Enrolments">{s.enrolments.toLocaleString('en-IN')}</td>
                      <td data-label="CAC">{ratioText(s.spent, s.enrolments)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}
    </DashboardShell>
  );
};

export default CampaignsPage;
