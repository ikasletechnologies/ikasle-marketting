import React, { useLayoutEffect, useRef, useState } from 'react';

export interface WeekPoint {
  weekStart: string;
  leads: number;
  enrolments: number;
  /** The current week is still in progress. */
  partial: boolean;
}

const SERIES = [
  { key: 'leads', label: 'Leads', className: 'wk-leads' },
  { key: 'enrolments', label: 'Enrolments', className: 'wk-enrol' },
] as const;

const WEEK_LABEL = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', timeZone: 'UTC' });
const weekLabel = (iso: string) => WEEK_LABEL.format(new Date(`${iso}T00:00:00Z`));

/** A "nice" axis maximum and step (1/2/5 × 10^n), aiming for ~4 ticks. */
function niceScale(max: number): { top: number; step: number } {
  if (max <= 0) return { top: 4, step: 1 };
  const rough = max / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 5, 10].map((m) => m * magnitude).find((s) => s >= rough) ?? 10 * magnitude;
  return { top: Math.ceil(max / step) * step, step };
}

/** Column with a 4px rounded data-end and a square baseline. */
function columnPath(x: number, y: number, width: number, height: number): string {
  if (height <= 0) return '';
  const r = Math.min(4, width / 2, height);
  const bottom = y + height;
  return `M${x},${bottom}V${y + r}Q${x},${y} ${x + r},${y}H${x + width - r}Q${x + width},${y} ${x + width},${y + r}V${bottom}Z`;
}

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(640);
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return undefined;
    const update = () => setWidth(Math.max(280, Math.round(element.getBoundingClientRect().width)));
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, width] as const;
}

/**
 * Grouped weekly columns: leads and enrolments share one count axis. Hover or focus a
 * week to see both values; a table view carries every value without hovering.
 */
export const WeeklyChart: React.FC<{ data: WeekPoint[] }> = ({ data }) => {
  const [wrapRef, width] = useWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);
  const [view, setView] = useState<'chart' | 'table'>('chart');

  const height = 260;
  const margin = { top: 24, right: 8, bottom: 30, left: 40 };
  const plotW = width - margin.left - margin.right;
  const plotH = height - margin.top - margin.bottom;
  const { top, step } = niceScale(Math.max(0, ...data.map((d) => Math.max(d.leads, d.enrolments))));
  const ticks = Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);
  const band = data.length ? plotW / data.length : plotW;
  const barW = Math.max(4, Math.min(24, (band * 0.62 - 2) / 2));
  const y = (value: number) => margin.top + plotH - (value / top) * plotH;
  // Selective direct labels: the most recent complete week only.
  const labelIndex = data.length ? (data[data.length - 1].partial && data.length > 1 ? data.length - 2 : data.length - 1) : -1;
  const point = active === null ? null : data[active];

  return (
    <div className="wk" ref={wrapRef}>
      <div className="wk-toolbar">
        <ul className="wk-legend" aria-label="Legend">
          {SERIES.map((series) => (
            <li key={series.key}><span className={`wk-swatch ${series.className}`} aria-hidden="true" />{series.label}</li>
          ))}
        </ul>
        <div className="wk-toggle" role="group" aria-label="Display as">
          <button type="button" aria-pressed={view === 'chart'} onClick={() => setView('chart')}>Chart</button>
          <button type="button" aria-pressed={view === 'table'} onClick={() => setView('table')}>Table</button>
        </div>
      </div>

      {view === 'table' ? (
        <div className="dash-table-wrap">
          <table className="dash-table wk-table">
            <thead><tr><th scope="col">Week starting</th><th scope="col">Leads</th><th scope="col">Enrolments</th></tr></thead>
            <tbody>
              {data.map((d) => (
                <tr key={d.weekStart}>
                  <td>{weekLabel(d.weekStart)}{d.partial ? ' (so far)' : ''}</td>
                  <td>{d.leads.toLocaleString('en-IN')}</td>
                  <td>{d.enrolments.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="wk-plot" onPointerLeave={() => setActive(null)}>
          <svg width={width} height={height} role="img" aria-label={`Weekly leads and enrolments, ${data.length} weeks. Use the Table view for exact values.`}>
            {ticks.map((tick) => (
              <g key={tick}>
                <line className="wk-grid" x1={margin.left} x2={width - margin.right} y1={y(tick)} y2={y(tick)} />
                <text className="wk-tick" x={margin.left - 8} y={y(tick)} dy="0.32em" textAnchor="end">{tick.toLocaleString('en-IN')}</text>
              </g>
            ))}
            {data.map((d, i) => {
              const cx = margin.left + band * i + band / 2;
              const leadX = cx - barW - 1;
              const enrolX = cx + 1;
              return (
                <g key={d.weekStart} className={active === i ? 'wk-week active' : 'wk-week'}>
                  <path className={`wk-bar wk-leads${d.partial ? ' wk-partial' : ''}`} d={columnPath(leadX, y(d.leads), barW, y(0) - y(d.leads))} />
                  <path className={`wk-bar wk-enrol${d.partial ? ' wk-partial' : ''}`} d={columnPath(enrolX, y(d.enrolments), barW, y(0) - y(d.enrolments))} />
                  {i === labelIndex && (
                    <>
                      <text className="wk-value" x={leadX + barW / 2} y={y(d.leads) - 6} textAnchor="middle">{d.leads}</text>
                      <text className="wk-value" x={enrolX + barW / 2} y={y(d.enrolments) - 6} textAnchor="middle">{d.enrolments}</text>
                    </>
                  )}
                  <text className="wk-tick" x={cx} y={height - 10} textAnchor="middle">
                    {band >= 52 || i % 2 === data.length % 2 ? weekLabel(d.weekStart) : ''}
                  </text>
                  {/* Hit target: the whole week band, larger than the marks. */}
                  <rect
                    className="wk-hit"
                    x={margin.left + band * i}
                    y={margin.top}
                    width={band}
                    height={plotH}
                    tabIndex={0}
                    aria-label={`Week of ${weekLabel(d.weekStart)}${d.partial ? ' (so far)' : ''}: ${d.leads} leads, ${d.enrolments} enrolments`}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onBlur={() => setActive(null)}
                  />
                </g>
              );
            })}
            <line className="wk-axis" x1={margin.left} x2={width - margin.right} y1={y(0)} y2={y(0)} />
          </svg>
          {point && active !== null && (
            <div
              className="wk-tooltip"
              role="presentation"
              style={{
                left: Math.min(Math.max(margin.left + band * active + band / 2, 90), width - 90),
                top: Math.max(4, y(Math.max(point.leads, point.enrolments)) - 12),
              }}
            >
              <p className="wk-tooltip-title">Week of {weekLabel(point.weekStart)}{point.partial ? ' · so far' : ''}</p>
              {SERIES.map((series) => (
                <p key={series.key} className="wk-tooltip-row">
                  <span className={`wk-key ${series.className}`} aria-hidden="true" />
                  <strong>{point[series.key].toLocaleString('en-IN')}</strong>
                  <span>{series.label}</span>
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
