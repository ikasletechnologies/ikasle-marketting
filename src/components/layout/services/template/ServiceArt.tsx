import React, { useId } from 'react';
import './ServiceArt.css';

/** Unique, CSS-safe id prefix for SVG gradients (components are reused on one page). */
const useSvgId = () => useId().replace(/[^a-zA-Z0-9_-]/g, '');

/** A leafy sprig growing from (x, y). Wrapped in .sa-sprig so pages can sway it. */
export const Sprig: React.FC<{ x: number; y: number; s?: number; flip?: boolean; color?: string; color2?: string }> = ({ x, y, s = 1, flip = false, color = '#4f7d55', color2 = '#6c9a69' }) => {
  const dir = flip ? -1 : 1;
  const leaves = [0.2, 0.34, 0.48, 0.6, 0.72, 0.84, 0.95];
  const tip = { x: x + 18 * dir * s, y: y - 60 * s };
  const ctrl = { x: x - 4 * dir * s, y: y - 32 * s };
  const at = (t: number) => ({
    x: (1 - t) ** 2 * x + 2 * (1 - t) * t * ctrl.x + t * t * tip.x,
    y: (1 - t) ** 2 * y + 2 * (1 - t) * t * ctrl.y + t * t * tip.y,
  });
  return (
    <g className="sa-sprig" data-ox={x} data-oy={y}>
      <path d={`M${x} ${y} Q${ctrl.x} ${ctrl.y} ${tip.x} ${tip.y}`} stroke="#4d6b4f" strokeWidth={1.4 * s} fill="none" strokeLinecap="round" />
      {leaves.map((t, i) => {
        const p = at(t);
        const side = i % 2 ? 1 : -1;
        const r = side > 0 ? -38 : 38;
        return <ellipse key={i} cx={p.x + side * 5 * s} cy={p.y} rx={8 * s * (1 - t * 0.35)} ry={3.6 * s * (1 - t * 0.3)} transform={`rotate(${r} ${p.x + side * 5 * s} ${p.y})`} fill={i % 3 ? color : color2} />;
      })}
    </g>
  );
};

/** Skincare bottles, jars and a plant on a stone — used inside phones and frames. */
export const ProductScene: React.FC<{ variant?: 0 | 1 | 2 }> = ({ variant = 0 }) => {
  const id = useSvgId();
  const shift = [0, -14, 10][variant];
  return (
    <svg viewBox="0 0 120 160" preserveAspectRatio="xMidYMid slice" className="sa-fill">
      <defs>
        <linearGradient id={`bg${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f5f0e9" /><stop offset="1" stopColor="#d9cec0" /></linearGradient>
        <linearGradient id={`bt${id}`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#fbf8f4" /><stop offset=".6" stopColor="#efe8de" /><stop offset="1" stopColor="#d9cfc2" /></linearGradient>
      </defs>
      <rect width="120" height="160" fill={`url(#bg${id})`} />
      <rect width="46" height="112" fill="#fff" opacity=".35" />
      <g transform={`translate(${shift} 0)`}>
        <Sprig x={98} y={112} s={1.1} />
        <Sprig x={100} y={112} s={0.9} flip />
        <rect y="118" width="160" height="42" x="-20" fill="#e6ddd1" />
        <ellipse cx="62" cy="121" rx="36" ry="8" fill="#cbbfb0" />
        <rect x="49" y="56" width="25" height="63" rx="6" fill={`url(#bt${id})`} />
        <rect x="57" y="44" width="9" height="13" fill="#e2d9cd" />
        <rect x="55" y="39" width="18" height="5" rx="2" fill="#d8cdbf" />
        <rect x="54" y="80" width="15" height="11" rx="1.5" fill="#e8e0d4" />
        <rect x="79" y="97" width="22" height="22" rx="4" fill={`url(#bt${id})`} />
        <rect x="78" y="92" width="24" height="7" rx="2" fill="#e1d6c8" />
        <rect x="28" y="104" width="18" height="15" rx="3" fill={`url(#bt${id})`} />
        <rect x="27" y="100" width="20" height="5" rx="2" fill="#ddd2c4" />
      </g>
    </svg>
  );
};

/** A teal armchair in a room, with optional lamp — used for the advertising visuals. */
export const ArmchairScene: React.FC<{ wall?: string; wall2?: string; lamp?: boolean; plant?: boolean }> = ({ wall = '#f1f4f4', wall2 = '#e2e9ea', lamp = false, plant = true }) => {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 160 120" preserveAspectRatio="xMidYMid slice" className="sa-fill">
      <defs>
        <linearGradient id={`w${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={wall} /><stop offset="1" stopColor={wall2} /></linearGradient>
        <linearGradient id={`c${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f86a0" /><stop offset="1" stopColor="#11607a" /></linearGradient>
      </defs>
      <rect width="160" height="120" fill={`url(#w${id})`} />
      <rect y="94" width="160" height="26" fill="#000" opacity=".06" />
      {lamp && (
        <g className="sa-lamp">
          <circle cx="132" cy="40" r="22" fill="#fff" opacity=".18" />
          <line x1="132" y1="44" x2="132" y2="94" stroke="#2b3a40" strokeWidth="1.6" />
          <path d="M122 46 L142 46 L137 30 L127 30 Z" fill="#fbfaf6" />
          <ellipse cx="132" cy="95" rx="7" ry="1.6" fill="#2b3a40" />
        </g>
      )}
      {plant && (
        <g>
          <Sprig x={22} y={80} s={0.95} flip />
          <Sprig x={24} y={80} s={0.75} />
          <rect x="13" y="78" width="20" height="17" rx="3" fill="#f3efe8" />
        </g>
      )}
      <ellipse cx="82" cy="99" rx="40" ry="3.5" fill="#000" opacity=".12" />
      <line x1="56" y1="88" x2="54" y2="98" stroke="#5a3b26" strokeWidth="2.2" strokeLinecap="round" />
      <line x1="108" y1="88" x2="110" y2="98" stroke="#5a3b26" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M60 58q0-17 16-17h12q16 0 16 17v20H60Z" fill={`url(#c${id})`} />
      <rect x="54" y="74" width="56" height="15" rx="6" fill="#14708a" />
      <rect x="47" y="62" width="14" height="27" rx="6" fill="#1a7d97" />
      <rect x="103" y="62" width="14" height="27" rx="6" fill="#1a7d97" />
      <path d="M66 56q0-10 10-10h12q10 0 10 10" stroke="#ffffff" strokeOpacity=".18" strokeWidth="2" fill="none" />
    </svg>
  );
};

export const Avatar: React.FC<{ skin?: string; hair?: string; shirt?: string; bg?: string; long?: boolean; beard?: boolean }> = ({ skin = '#f1c7a8', hair = '#2b2321', shirt = '#2e8fc9', bg = '#dff1f6', long = false, beard = false }) => (
  <svg viewBox="0 0 60 60" className="sa-fill">
    <circle cx="30" cy="30" r="30" fill={bg} />
    {long && <path d="M15 34q-2-22 15-22t15 22v14H15Z" fill={hair} />}
    <path d="M10 60q2-16 20-16t20 16Z" fill={shirt} />
    <rect x="26" y="36" width="8" height="9" fill={skin} />
    <circle cx="30" cy="28" r="10.5" fill={skin} />
    <path d={long ? 'M19 27q1-12 11-12t11 12q-7-6-11-6t-11 6Z' : 'M19.5 26q0-11 10.5-11t10.5 11q-4-5-10.5-5t-10.5 5Z'} fill={hair} />
    {beard && <path d="M21 30q2 10 9 10t9-10q-2 5-9 5t-9-5Z" fill={hair} />}
  </svg>
);

/* ---------- Devices & print ---------- */

export const Phone: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`sa-phone ${className}`}>
    <div className="sa-phone-screen">{children}</div>
    <span className="sa-phone-notch" />
  </div>
);

export const Laptop: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`sa-laptop ${className}`}>
    <div className="sa-laptop-lid"><div className="sa-laptop-screen">{children}</div></div>
    <div className="sa-laptop-base" />
  </div>
);

export const Brand: React.FC<{ light?: boolean }> = ({ light }) => (
  <span className={`sa-brand${light ? ' light' : ''}`}>IKASLĒ<small>MARKETING</small></span>
);

export const Book: React.FC<{ tone?: 'white' | 'navy'; className?: string; children: React.ReactNode }> = ({ tone = 'white', className = '', children }) => (
  <div className={`sa-book sa-book-${tone} ${className}`}>
    <div className="sa-book-cover">{children}</div>
  </div>
);

/** Grey placeholder text lines. */
export const Lines: React.FC<{ n?: number; light?: boolean }> = ({ n = 3, light }) => (
  <span className={`sa-lines${light ? ' light' : ''}`}>{Array.from({ length: n }, (_, i) => <i key={i} style={{ width: `${92 - ((i * 23) % 40)}%` }} />)}</span>
);

/* ---------- Small scene thumbnails ---------- */

export const ThumbPlant: React.FC = () => (
  <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice" className="sa-fill">
    <rect width="60" height="60" fill="#e9efe9" />
    <Sprig x={30} y={44} s={0.6} /><Sprig x={30} y={44} s={0.55} flip />
    <path d="M22 44h16l-2 12H24Z" fill="#f4f1ec" />
  </svg>
);
export const ThumbBuilding: React.FC = () => (
  <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice" className="sa-fill">
    <rect width="60" height="60" fill="#cfe4f2" />
    <path d="M14 60V22l18-10 14 8v40Z" fill="#f4f7fa" />
    <path d="M32 12v48h14V20Z" fill="#d6e0ea" />
    {[24, 32, 40, 48].map((y) => <rect key={y} x="18" y={y} width="10" height="3" fill="#b9cfdf" />)}
  </svg>
);
export const ThumbSea: React.FC = () => (
  <svg viewBox="0 0 60 60" preserveAspectRatio="xMidYMid slice" className="sa-fill">
    <rect width="60" height="60" fill="#d8eef6" />
    <rect y="32" width="60" height="28" fill="#2d97bd" />
    <path d="M0 32h60v4c-10-2-20 2-30 0S10 34 0 36Z" fill="#7cc8de" />
    <path d="M0 50q14-6 30 0t30 0v10H0Z" fill="#f0e2c4" />
  </svg>
);

/* ---------- SEO pieces ---------- */

export const Monitor: React.FC<{ className?: string; children: React.ReactNode }> = ({ className = '', children }) => (
  <div className={`sa-monitor ${className}`}>
    <div className="sa-monitor-screen">{children}</div>
    <span className="sa-monitor-neck" />
    <span className="sa-monitor-foot" />
  </div>
);

/** Layered blue/teal waves for the lower half of a book cover. */
export const WaveCover: React.FC<{ className?: string }> = ({ className = '' }) => {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 200 120" preserveAspectRatio="none" className={`sa-wave-cover ${className}`}>
      <defs>
        <linearGradient id={`a${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5fd4e0" /><stop offset="1" stopColor="#0a8fb0" /></linearGradient>
        <linearGradient id={`b${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#1a8fd0" /><stop offset="1" stopColor="#0b4f8a" /></linearGradient>
      </defs>
      <path className="sa-wave-a" d="M0 70 C40 30 80 90 120 50 S180 10 200 30 V120 H0Z" fill={`url(#a${id})`} opacity=".85" />
      <path className="sa-wave-b" d="M0 95 C50 60 90 110 140 75 S190 55 200 60 V120 H0Z" fill={`url(#b${id})`} />
    </svg>
  );
};

export const Magnifier: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 80 80" className={`sa-magnifier ${className}`}>
    <line x1="52" y1="52" x2="74" y2="74" stroke="#1d2228" strokeWidth="8" strokeLinecap="round" />
    <circle cx="32" cy="32" r="24" fill="#ffffff55" stroke="#1d2228" strokeWidth="6" />
    <path d="M18 24a16 16 0 0 1 12-10" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" opacity=".8" />
  </svg>
);

/** Small white card with an icon and label. */
export const Chip: React.FC<{ icon: React.ReactNode; className?: string; children: React.ReactNode }> = ({ icon, className = '', children }) => (
  <div className={`sa-chip ${className}`}><span className="sa-chip-icon">{icon}</span><span className="sa-chip-label">{children}</span></div>
);

export const Mug: React.FC<{ pens?: boolean }> = ({ pens }) => (
  <svg viewBox="0 0 70 80" className="sa-fill">
    {pens && <g stroke="#1d2228" strokeWidth="3" strokeLinecap="round"><line x1="24" y1="30" x2="16" y2="2" /><line x1="32" y1="30" x2="34" y2="0" /><line x1="40" y1="30" x2="50" y2="4" /></g>}
    <path d="M56 40h4a9 9 0 0 1 0 18h-4" stroke="#e3e8eb" strokeWidth="5" fill="none" />
    <rect x="8" y="28" width="50" height="50" rx="6" fill="#fbfcfc" />
    <rect x="8" y="28" width="12" height="50" rx="6" fill="#e7ecef" />
    <text x="33" y="56" textAnchor="middle" fontSize="8" fontWeight="800" letterSpacing="1" fill="#0b2b4c">IKASLĒ</text>
  </svg>
);

/** Top-down street map: blocks, roads, a park and a river. */
export const MapScene: React.FC = () => (
  <svg viewBox="0 0 160 200" preserveAspectRatio="xMidYMid slice" className="sa-fill">
    <rect width="160" height="200" fill="#eef2f0" />
    <path d="M-10 150 C40 130 70 170 170 140 V170 C80 195 40 160 -10 180Z" fill="#b9dcef" />
    <rect x="96" y="20" width="44" height="34" rx="4" fill="#cfe7c5" />
    {[[10, 14, 34, 26], [54, 14, 30, 26], [10, 60, 34, 30], [54, 60, 30, 30], [96, 66, 44, 26], [10, 104, 34, 22], [54, 104, 30, 22], [96, 100, 44, 26]].map(([x, y, w, h], i) => (
      <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill="#f9faf9" />
    ))}
    <g stroke="#f2c94c" strokeWidth="3" fill="none" strokeLinecap="round"><path d="M0 52 H160" /><path d="M90 0 V200" /></g>
    <g stroke="#fff" strokeWidth="5" fill="none"><path d="M0 97 H160" /><path d="M48 0 V200" /><path d="M-10 0 L160 190" opacity=".7" /></g>
  </svg>
);

export const Storefront: React.FC = () => (
  <svg viewBox="0 0 120 110" className="sa-fill">
    <path d="M6 96 L60 108 L114 96 L60 84Z" fill="#dfe8e4" />
    <rect x="16" y="34" width="88" height="62" fill="#f4efe8" />
    <rect x="16" y="22" width="88" height="14" fill="#e7ddd0" />
    <rect x="24" y="52" width="32" height="34" fill="#ffd98a" opacity=".85" />
    <rect x="64" y="52" width="16" height="44" fill="#6e4a33" />
    <rect x="84" y="52" width="14" height="22" fill="#ffd98a" opacity=".85" />
    <g>{Array.from({ length: 8 }, (_, i) => <path key={i} d={`M${12 + i * 12} 36 h12 l-2 12 a5 5 0 0 1 -10 0Z`} fill={i % 2 ? '#fff' : '#1f7fb0'} />)}</g>
    <circle cx="10" cy="88" r="7" fill="#5f8f5a" /><circle cx="110" cy="88" r="7" fill="#5f8f5a" />
  </svg>
);

export const ServerRack: React.FC<{ className?: string; units?: number }> = ({ className = '', units = 4 }) => (
  <div className={`sa-rack ${className}`}>
    {Array.from({ length: units }, (_, i) => <span key={i}><i className="sa-led" /><i className="sa-led" /><em /></span>)}
  </div>
);

/** Lake, forest and mountains — used for PR / outreach story imagery. */
export const MountainScene: React.FC<{ variant?: 0 | 1 }> = ({ variant = 0 }) => {
  const id = useSvgId();
  return (
    <svg viewBox="0 0 120 80" preserveAspectRatio="xMidYMid slice" className="sa-fill">
      <defs><linearGradient id={`s${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={variant ? '#f3dcc0' : '#cfe8f5'} /><stop offset="1" stopColor="#eef6f9" /></linearGradient></defs>
      <rect width="120" height="80" fill={`url(#s${id})`} />
      <path d="M0 52 L26 22 L40 36 L60 12 L84 40 L98 28 L120 46 V80 H0Z" fill="#7d98ad" />
      <path d="M54 19 L60 12 L66 20 L62 18 L58 22Z M22 27 L26 22 L30 27Z" fill="#fff" />
      <path d="M0 58 Q30 48 60 56 T120 54 V80 H0Z" fill="#3f6b55" />
      <rect y="62" width="120" height="18" fill="#5aa7c8" />
      <path d="M0 62 Q30 60 60 63 T120 62" stroke="#b9e3f1" strokeWidth="1" fill="none" />
    </svg>
  );
};

/** Tiny line/area chart. Path has pathLength 1 so it can be drawn with strokeDashoffset. */
export const MiniLine: React.FC<{ className?: string; area?: boolean; color?: string }> = ({ className = '', area = true, color = '#2f8fe0' }) => {
  const id = useSvgId();
  const d = 'M0 34 C10 30 14 22 24 24 S40 30 50 20 S68 8 80 12 S94 4 100 2';
  return (
    <svg viewBox="0 0 100 40" preserveAspectRatio="none" className={`sa-fill ${className}`}>
      <defs><linearGradient id={`l${id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={color} stopOpacity=".35" /><stop offset="1" stopColor={color} stopOpacity="0" /></linearGradient></defs>
      {area && <path className="sa-mini-area" d={`${d} L100 40 L0 40Z`} fill={`url(#l${id})`} />}
      <path className="sa-mini-line" d={d} pathLength={1} fill="none" stroke={color} strokeWidth="1.8" />
    </svg>
  );
};

export const MiniBars: React.FC<{ values?: number[]; className?: string }> = ({ values = [30, 45, 38, 60, 52, 74, 68, 90], className = '' }) => (
  <span className={`sa-mini-bars ${className}`}>{values.map((v, i) => <i key={i} style={{ height: `${v}%` }} />)}</span>
);

/* ---------- Brand pieces ---------- */

/** A grid or strip of colour swatches in the brand palette. */
export const Swatches: React.FC<{ className?: string; colors?: string[] }> = ({ className = '', colors = ['#0b2b4c', '#0a5f96', '#1a8fd0', '#0aa5a3', '#5fd4e0', '#bfe9f2'] }) => (
  <span className={`sa-swatches ${className}`}>{colors.map((c, i) => <i key={i} style={{ background: c }} />)}</span>
);

/** Typography specimen card. */
export const TypeCard: React.FC<{ className?: string; font?: string }> = ({ className = '', font }) => (
  <div className={`sa-type ${className}`}>
    <b>Aa</b>
    {font && <small className="sa-type-name">{font}</small>}
    <span>Bb Cc Dd Ee</span>
    <span>0123456789</span>
  </div>
);

/** Abstract leaf-shaped brand mark (navy stem + two teal leaves). */
export const LogoMark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={`sa-logomark ${className}`}>
    <path className="sa-lm-a" d="M14 8 C40 22 44 78 14 92 Z" fill="#0b4f8a" />
    <path className="sa-lm-b" d="M40 50 C44 22 64 8 92 8 C88 36 70 50 40 50Z" fill="#0aa5a3" />
    <path className="sa-lm-c" d="M40 50 C70 50 88 64 92 92 C64 92 44 78 40 50Z" fill="#5fc9d6" />
  </svg>
);

export const Compass: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={`sa-compass ${className}`}>
    <circle cx="50" cy="50" r="46" fill="#0b4f6a" stroke="#c9a96a" strokeWidth="4" />
    <circle cx="50" cy="50" r="38" fill="#0e6680" />
    {Array.from({ length: 12 }, (_, i) => <line key={i} x1="50" y1="14" x2="50" y2="19" stroke="#bfe9f2" strokeWidth="1.5" transform={`rotate(${i * 30} 50 50)`} />)}
    <g className="sa-compass-needle">
      <path d="M50 20 L56 50 L50 54 L44 50Z" fill="#ff6b5a" />
      <path d="M50 80 L56 50 L50 46 L44 50Z" fill="#e8eef2" />
    </g>
    <circle cx="50" cy="50" r="4" fill="#c9a96a" />
  </svg>
);
