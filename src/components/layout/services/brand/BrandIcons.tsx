import React from 'react';

/** Solid 64×64 service icons. Classes (bi-*) are animation hooks for GSAP. */
export const BRAND_ICONS: Record<string, React.ReactNode> = {
  discovery: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g className="bi-lens">
        <circle cx="27" cy="27" r="18" fill="#0f6fc2" />
        <circle cx="27" cy="27" r="11" fill="#e8f4fd" opacity="0.28" />
        <path d="M17 22 Q20 15 28 14" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.7" />
        <line x1="40" y1="40" x2="56" y2="56" stroke="#0e9a98" strokeWidth="9" strokeLinecap="round" />
      </g>
    </svg>
  ),
  strategy: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g className="bi-rings">
        <circle cx="30" cy="34" r="24" fill="none" stroke="#1b7fd0" strokeWidth="5" />
        <circle cx="30" cy="34" r="14" fill="none" stroke="#0f6fc2" strokeWidth="5" />
      </g>
      <circle cx="30" cy="34" r="5" fill="#0e9a98" />
      <g className="bi-dart">
        <line x1="32" y1="32" x2="54" y2="10" stroke="#0e9a98" strokeWidth="4" strokeLinecap="round" />
        <path d="M46 4 L60 4 L60 18 L55 13 L51 9 Z" fill="#0e9a98" />
      </g>
    </svg>
  ),
  messaging: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path className="bi-bubble-b" d="M34 26 H52 Q60 26 60 34 V42 Q60 50 52 50 H50 V58 L42 50 H34 Q26 50 26 42 V34 Q26 26 34 26 Z" fill="#14a6a2" />
      <path className="bi-bubble-a" d="M14 6 H34 Q44 6 44 16 V26 Q44 36 34 36 H26 L14 46 V36 Q4 36 4 26 V16 Q4 6 14 6 Z" fill="#0f6fc2" />
    </svg>
  ),
  logo: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g className="bi-nib">
        <path d="M32 4 L50 28 Q54 36 46 44 L18 44 Q10 36 14 28 Z" fill="#0f6fc2" />
        <circle cx="32" cy="30" r="3.4" fill="#fff" />
        <line x1="32" y1="33" x2="32" y2="44" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" />
        <rect x="16" y="46" width="32" height="9" rx="4.5" fill="#0e9a98" />
      </g>
    </svg>
  ),
  guidelines: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M12 6 H38 L52 20 V54 Q52 58 48 58 H16 Q12 58 12 54 Z" fill="#0f6fc2" />
      <path d="M38 6 L52 20 H42 Q38 20 38 16 Z" fill="#7fb8ea" />
      <g className="bi-lines" stroke="#fff" strokeWidth="4" strokeLinecap="round">
        <line x1="20" y1="30" x2="44" y2="30" />
        <line x1="20" y1="39" x2="44" y2="39" />
        <line x1="20" y1="48" x2="34" y2="48" />
      </g>
    </svg>
  ),
  collateral: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path className="bi-panel-a" d="M4 14 L22 8 V52 L4 58 Z" fill="#0e9a98" />
      <path className="bi-panel-b" d="M22 8 L42 14 V58 L22 52 Z" fill="#0f6fc2" />
      <path className="bi-panel-c" d="M42 14 L60 8 V52 L42 58 Z" fill="#14a6a2" />
    </svg>
  ),
  website: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="4" y="10" width="56" height="44" rx="7" fill="#0f6fc2" />
      <g className="bi-dots" fill="#fff">
        <circle cx="13" cy="18" r="2.4" />
        <circle cx="21" cy="18" r="2.4" />
        <circle cx="29" cy="18" r="2.4" />
      </g>
      <rect className="bi-screen" x="10" y="26" width="44" height="22" rx="4" fill="#fff" />
    </svg>
  ),
  creative: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle className="bi-glow" cx="32" cy="26" r="24" fill="#0f6fc2" opacity="0.14" />
      <path d="M32 4 Q50 4 50 22 Q50 32 42 38 Q39 41 39 46 H25 Q25 41 22 38 Q14 32 14 22 Q14 4 32 4 Z" fill="#0f6fc2" />
      <path d="M22 14 Q25 9 31 9" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
      <rect x="24" y="48" width="16" height="5" rx="2.5" fill="#0e9a98" />
      <rect x="27" y="55" width="10" height="5" rx="2.5" fill="#0e9a98" />
    </svg>
  ),
  experience: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g className="bi-links" stroke="#0f6fc2" strokeWidth="5" strokeLinecap="round">
        <line x1="32" y1="17" x2="17" y2="46" />
        <line x1="32" y1="17" x2="47" y2="46" />
      </g>
      <circle className="bi-node" cx="32" cy="15" r="11" fill="#0f6fc2" />
      <circle className="bi-node" cx="15" cy="49" r="11" fill="#0f6fc2" />
      <circle className="bi-node" cx="49" cy="49" r="11" fill="#0f6fc2" />
    </svg>
  ),
  launch: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="28" fill="#0f6fc2" />
      <g className="bi-arrow">
        <line x1="32" y1="46" x2="32" y2="20" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <polyline points="20,31 32,19 44,31" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  ),
};
