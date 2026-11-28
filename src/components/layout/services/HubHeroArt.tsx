import React, { useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { useInView } from '../../../hooks/motion';
import './HubHeroArt.css';

export interface HubHeroIcon {
  label: string;
  icon: ReactNode;
}

interface HubHeroArtProps {
  /** Large icon in the middle tile. */
  center: ReactNode;
  /** Up to 8 service icons placed around the centre. */
  icons: HubHeroIcon[];
  /** e.g. "10 focused services". */
  caption: string;
}

/** Ellipse the icons sit on, in stage units (stage is 100 × 60). */
const CX = 50;
const CY = 30;
const RX = 39;
const RY = 19.5;
const SPOT_SECONDS = 1.2;

/**
 * Hub hero visual for the four service hub pages: filled service icons
 * floating around the hub's main icon, each spotlighted in turn.
 */
export const HubHeroArt: React.FC<HubHeroArtProps> = ({ center, icons, caption }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView] = useInView(ref);
  const items = icons.slice(0, 8);
  const cycle = items.length * SPOT_SECONDS;

  const placed = items.map((item, i) => {
    // Start at the top-left and go clockwise.
    const a = (-150 + (360 / items.length) * i) * (Math.PI / 180);
    return { ...item, x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a), i };
  });

  return (
    <div
      className={`hha-stage${inView ? '' : ' hha-paused'}`}
      ref={ref}
      aria-hidden="true"
      style={{ '--cycle': `${cycle}s`, '--spot': `${SPOT_SECONDS}s` } as CSSProperties}
    >
      <div className="hha-inner">
        <svg className="hha-lines" viewBox="0 0 100 60" preserveAspectRatio="none">
          <ellipse cx={CX} cy={CY} rx={RX} ry={RY} className="hha-orbit" />
          {placed.map((p) => (
            <line
              key={p.label}
              x1={CX}
              y1={CY}
              x2={p.x}
              y2={p.y}
              className="hha-link"
              style={{ '--i': p.i } as CSSProperties}
            />
          ))}
        </svg>

        <div className="hha-center">
          <span className="hha-halo" />
          <span className="hha-halo hha-halo--2" />
          <span className="hha-center-tile">
            <span className="hha-center-icon">{center}</span>
          </span>
          <span className="hha-caption">{caption}</span>
        </div>

        {placed.map((p) => (
          <span
            key={p.label}
            className="hha-tile"
            style={{
              left: `${p.x}%`,
              top: `${(p.y / 60) * 100}%`,
              '--i': p.i,
              '--dx': `${CX - p.x}cqw`,
              '--dy': `${CY - p.y}cqw`,
            } as CSSProperties}
          >
            <span className="hha-tile-body">
              <span className="hha-tile-icon">{p.icon}</span>
            </span>
            <span className={`hha-label${p.y < CY ? ' is-top' : ''}`}>{p.label}</span>
          </span>
        ))}

        <span className="hha-spark hha-spark--1" />
        <span className="hha-spark hha-spark--2" />
        <span className="hha-spark hha-spark--3" />
      </div>
    </div>
  );
};

export default HubHeroArt;
