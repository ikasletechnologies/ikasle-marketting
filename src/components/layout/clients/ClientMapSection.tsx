import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight, ArrowUpRight, Globe2, MapPin, Pause, Play } from 'lucide-react';
import { REGIONS, clientsIn } from '../../../content/clients/clients';
import type { RegionId } from '../../../content/clients/clients';
import { CountryFlag } from '../../ui/CountryFlag';
import { useInView, usePrefersReducedMotion } from '../../../hooks/motion';
import { LAND_DOTS, MAP_HEIGHT, MAP_STEP, MAP_WIDTH, project } from './worldDots';
import './ClientMapSection.css';

/** How long the auto-tour stays on a region: longer where there are logos to look at. */
const DWELL_WITH_CLIENTS = 8000;
const DWELL_EMPTY = 3500;

const PINS = REGIONS.map((r) => {
  const [x, y] = project(r.lon, r.lat);
  return { ...r, x, y, count: clientsIn(r.id).length };
});

const HQ = PINS.find((p) => p.hq) ?? PINS[0];

/** Curved route from HQ to a pin, lifted in proportion to its length. */
const arcPath = (x: number, y: number) => {
  const mx = (HQ.x + x) / 2;
  const my = (HQ.y + y) / 2;
  const lift = Math.hypot(x - HQ.x, y - HQ.y) * 0.32;
  return `M${HQ.x} ${HQ.y} Q${mx} ${my - lift} ${x} ${y}`;
};

interface ClientMapSectionProps {
  onNavigate?: (section: string) => void;
}

export const ClientMapSection: React.FC<ClientMapSectionProps> = ({ onNavigate }) => {
  const rootRef = useRef<HTMLElement>(null);
  const [inView] = useInView(rootRef);
  const reduced = usePrefersReducedMotion();

  const [activeId, setActiveId] = useState<RegionId>(HQ.id);
  // Reduced-motion visitors start with the tour paused; they can still press play.
  const [playing, setPlaying] = useState<boolean | null>(null);
  const isPlaying = playing ?? !reduced;
  const running = isPlaying && inView;

  const active = PINS.find((p) => p.id === activeId) ?? HQ;
  const clients = useMemo(() => clientsIn(active.id), [active.id]);
  const dwell = clients.length ? DWELL_WITH_CLIENTS : DWELL_EMPTY;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      const i = PINS.findIndex((p) => p.id === activeId);
      setActiveId(PINS[(i + 1) % PINS.length].id);
    }, dwell);
    return () => window.clearTimeout(timer);
  }, [running, activeId, dwell]);

  const select = (id: RegionId) => setActiveId(id);

  return (
    <section className="cm-section" ref={rootRef} aria-labelledby="cm-title">
      <div className="cm-container">
        <header className="cm-header">
          <div>
            <span className="cm-eyebrow">
              <span className="cm-eyebrow-line" aria-hidden="true" />
              WHERE WE WORK
            </span>
            <h1 className="cm-title" id="cm-title">
              From Coimbatore <span>to the world.</span>
            </h1>
          </div>
          <p className="cm-sub">
            Pick a country on the map to see the brands we work with there, or let the map tour on its own.
          </p>
        </header>

        <div className="cm-grid">
          {/* ---------------- Map ---------------- */}
          <div className="cm-map-card">
            <div className="cm-map-top">
              <span className="cm-legend">
                <i className="cm-legend-hq" /> HQ · Coimbatore
              </span>
              <span className="cm-legend">
                <i className="cm-legend-served" /> Countries we serve
              </span>
              <button
                type="button"
                className="cm-play"
                onClick={() => setPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Pause the map tour' : 'Play the map tour'}
                aria-pressed={!isPlaying}
              >
                {isPlaying ? <Pause /> : <Play />}
                <span>{isPlaying ? 'Auto tour' : 'Paused'}</span>
              </button>
            </div>

            <div className="cm-map-area">
            <div className="cm-map">
              <svg
                className="cm-map-svg"
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="cm-arc" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#00e0cf" />
                    <stop offset="1" stopColor="#5fb7ff" />
                  </linearGradient>
                  <radialGradient id="cm-glow">
                    <stop offset="0" stopColor="#00d4c4" stopOpacity="0.45" />
                    <stop offset="1" stopColor="#00d4c4" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <path d={LAND_DOTS} className="cm-dots" strokeWidth={MAP_STEP * 0.42} />

                <circle cx={active.x} cy={active.y} r="70" fill="url(#cm-glow)" className="cm-spot" key={`glow-${active.id}`} />

                {PINS.filter((p) => !p.hq).map((p) => (
                  <path
                    key={p.id}
                    d={arcPath(p.x, p.y)}
                    className={`cm-arc${p.id === active.id ? ' is-active' : ''}`}
                  />
                ))}

                {!active.hq && (
                  <circle r="4.5" className="cm-traveller" key={`t-${active.id}`}>
                    <animateMotion dur="2.2s" repeatCount="indefinite" path={arcPath(active.x, active.y)} />
                  </circle>
                )}
              </svg>

              {PINS.map((p) => {
                const isActive = p.id === active.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`cm-pin${isActive ? ' is-active' : ''}${p.hq ? ' is-hq' : ''}`}
                    style={{ left: `${(p.x / MAP_WIDTH) * 100}%`, top: `${(p.y / MAP_HEIGHT) * 100}%` } as CSSProperties}
                    onClick={() => select(p.id)}
                    aria-label={`${p.name}: ${p.count ? `${p.count} clients` : 'coming soon'}`}
                    aria-pressed={isActive}
                  >
                    <span className="cm-pin-ring" />
                    <span className="cm-pin-ring cm-pin-ring--2" />
                    <span className="cm-pin-core">{p.count > 0 && <b>{p.count}</b>}</span>
                    {isActive && (
                      <span className="cm-pin-label" key={p.id}>
                        <CountryFlag id={p.id} width={18} decorative />
                        {p.name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            </div>

            <div className="cm-chips" role="group" aria-label="Choose a country">
              {PINS.map((p) => {
                const isActive = p.id === active.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    className={`cm-chip${isActive ? ' is-active' : ''}`}
                    onClick={() => select(p.id)}
                    aria-pressed={isActive}
                  >
                    <CountryFlag id={p.id} width={20} decorative />
                    <span>{p.name}</span>
                    <em>{p.count || '—'}</em>
                    {isActive && running && (
                      <i
                        className="cm-chip-progress"
                        key={`${p.id}-${dwell}`}
                        style={{ '--dwell': `${dwell}ms` } as CSSProperties}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ---------------- Logos ---------------- */}
          <div className="cm-panel" aria-live="polite">
            <div className="cm-panel-head" key={`head-${active.id}`}>
              <CountryFlag id={active.id} width={40} decorative className="cm-panel-flag" />
              <div>
                <h3>{active.name}</h3>
                <p>
                  <MapPin aria-hidden="true" />
                  {active.place}
                </p>
              </div>
              <span className={`cm-count${clients.length ? '' : ' is-soon'}`}>
                {clients.length ? `${clients.length} clients` : 'Coming soon'}
              </span>
            </div>

            {clients.length > 0 ? (
              <ul className="cm-logos" key={`logos-${active.id}`}>
                {clients.map((c, i) => (
                  <li key={c.name} style={{ '--i': i } as CSSProperties}>
                    <a className="cm-logo-card" href={c.url} target="_blank" rel="noopener noreferrer">
                      <span className="cm-logo-img">
                        <img src={c.src} alt={`${c.name} logo`} loading="lazy" decoding="async" />
                      </span>
                      <span className="cm-logo-text">
                        <b>{c.name}</b>
                        <small>{c.industry}</small>
                        <small className="cm-logo-place">
                          <MapPin aria-hidden="true" />
                          {c.location}
                        </small>
                      </span>
                      <ArrowUpRight className="cm-logo-go" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="cm-empty" key={`empty-${active.id}`}>
                <span className="cm-empty-icon">
                  <Globe2 aria-hidden="true" />
                </span>
                <h4>Client stories from {active.name} are on their way</h4>
                <p>
                  {active.name} is one of the countries we serve. Want your brand to be the first one featured here?
                </p>
                <button type="button" className="cm-cta" onClick={() => onNavigate?.('Contact')}>
                  Start a project <ArrowRight aria-hidden="true" />
                </button>
                <button type="button" className="cm-back" onClick={() => select(HQ.id)}>
                  See our {clientsIn(HQ.id).length} clients in {HQ.name}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientMapSection;
