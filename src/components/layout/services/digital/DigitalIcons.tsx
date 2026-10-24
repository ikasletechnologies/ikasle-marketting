import React from 'react';

/** Colourful 64×64 service icons. Classes (ic-*) are animation hooks for GSAP. */
export const DIGITAL_ICONS: Record<string, React.ReactNode> = {
  strategy: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g className="ic-ring">
        <circle cx="30" cy="34" r="22" fill="#e6f1fb" stroke="#1767b0" strokeWidth="4" />
        <circle cx="30" cy="34" r="13" fill="#fff" stroke="#1b7fd0" strokeWidth="4" />
      </g>
      <circle className="ic-core" cx="30" cy="34" r="5" fill="#1767b0" />
      <g className="ic-arrow">
        <line x1="31" y1="33" x2="54" y2="10" stroke="#1767b0" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M48 6 L58 6 L58 16 L54 12 L50 10 Z" fill="#16b39e" />
      </g>
    </svg>
  ),
  research: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g className="ic-lens">
        <circle cx="27" cy="27" r="17" fill="#e8f4fd" stroke="#1b7fd0" strokeWidth="5.5" />
        <path d="M18 22 Q21 16 28 15" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" />
        <line x1="40" y1="40" x2="55" y2="55" stroke="#1767b0" strokeWidth="8" strokeLinecap="round" />
      </g>
    </svg>
  ),
  google: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect className="ic-bar-a" x="34" y="6" width="15" height="40" rx="7.5" transform="rotate(30 41 26)" fill="#fbbc04" />
      <rect className="ic-bar-b" x="14" y="12" width="15" height="42" rx="7.5" transform="rotate(-30 21 33)" fill="#2f7be0" />
      <circle className="ic-dot" cx="46" cy="49" r="8" fill="#16a36a" />
    </svg>
  ),
  video: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="6" y="12" width="52" height="40" rx="7" fill="#1b6fd1" />
      <rect x="6" y="12" width="52" height="16" rx="7" fill="#fff" opacity="0.14" />
      <polygon className="ic-play" points="26,22 26,42 43,32" fill="#fff" />
    </svg>
  ),
  meta: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path
        className="ic-loop"
        d="M32 32 C26 20 8 20 8 34 C8 48 26 46 32 32 C38 18 56 20 56 34 C56 48 38 46 32 32 Z"
        fill="none"
        stroke="#1769c7"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
    </svg>
  ),
  content: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="12" y="6" width="36" height="46" rx="4" fill="#fff" stroke="#b6cbe0" strokeWidth="2.5" />
      <g className="ic-lines">
        <line x1="19" y1="17" x2="38" y2="17" stroke="#1b7fd0" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="19" y1="26" x2="41" y2="26" stroke="#1b7fd0" strokeWidth="3.5" strokeLinecap="round" />
        <line x1="19" y1="35" x2="32" y2="35" stroke="#9fb9d3" strokeWidth="3.5" strokeLinecap="round" />
      </g>
      <g className="ic-pencil">
        <polygon points="30,48 50,24 57,30 37,54 28,56" fill="#1767b0" />
        <polygon points="50,24 54,19 61,25 57,30" fill="#16b39e" />
      </g>
    </svg>
  ),
  email: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="6" y="16" width="52" height="36" rx="6" fill="#1b7fd0" />
      <path className="ic-flap" d="M6 22 Q6 16 12 16 H52 Q58 16 58 22 L32 40 Z" fill="#16b39e" />
      <path d="M6 52 L26 34 M58 52 L38 34" stroke="#1767b0" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  ),
  leads: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <polygon className="ic-funnel" points="6,8 52,8 36,30 36,50 22,43 22,30" fill="#1b8fd6" />
      <rect x="6" y="8" width="46" height="6" rx="3" fill="#fff" opacity="0.3" />
      <g className="ic-badge">
        <circle cx="46" cy="46" r="13" fill="#16b39e" stroke="#fff" strokeWidth="3" />
        <circle cx="46" cy="42" r="4.5" fill="#fff" />
        <path d="M37 54 Q46 44 55 54 Z" fill="#fff" />
      </g>
    </svg>
  ),
  landing: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="5" y="9" width="54" height="42" rx="5" fill="#fff" stroke="#1767b0" strokeWidth="3" />
      <rect x="5" y="9" width="54" height="11" rx="5" fill="#1767b0" />
      <circle cx="12" cy="14.5" r="1.8" fill="#fff" />
      <circle cx="18" cy="14.5" r="1.8" fill="#fff" />
      <circle cx="24" cy="14.5" r="1.8" fill="#fff" />
      <rect x="12" y="28" width="22" height="4" rx="2" fill="#b6cbe0" />
      <rect x="12" y="36" width="16" height="4" rx="2" fill="#b6cbe0" />
      <g className="ic-cursor">
        <path d="M38 32 L38 52 L43.5 47 L47.5 56 L51 54.5 L47 46 L54 45.5 Z" fill="#16b39e" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
      </g>
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect className="ic-col" x="8" y="34" width="13" height="22" rx="2.5" fill="#15a6b8" />
      <rect className="ic-col" x="25" y="22" width="13" height="34" rx="2.5" fill="#12b3a4" />
      <rect className="ic-col" x="42" y="8" width="13" height="48" rx="2.5" fill="#16c29a" />
    </svg>
  ),
};
