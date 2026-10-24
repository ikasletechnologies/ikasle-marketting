import React from 'react';

/** Colourful 64×64 service icons. Classes (si-*) are animation hooks for GSAP. */
export const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  strategy: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="34" r="25" fill="#2e8fe0" />
      <circle cx="32" cy="34" r="19" fill="#eaf5ff" stroke="#1b62b8" strokeWidth="2.5" />
      <rect x="27" y="4" width="10" height="7" rx="2" fill="#1b62b8" />
      <g className="si-needle">
        <polygon points="32,34 38,22 44,18 36,28" fill="#16b39e" opacity="0" />
        <polygon points="32,20 36.5,34 32,48 27.5,34" fill="#1b62b8" transform="rotate(40 32 34)" />
        <polygon points="32,20 36.5,34 32,34 27.5,34" fill="#16b39e" transform="rotate(40 32 34)" />
      </g>
      <circle cx="32" cy="34" r="2.6" fill="#fff" />
    </svg>
  ),
  profile: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="30" cy="30" r="26" fill="#1f78d0" />
      <circle cx="30" cy="24" r="9" fill="#fff" />
      <path d="M12 50 Q30 28 48 50 Q30 58 12 50 Z" fill="#fff" />
      <g className="si-gear" transform="translate(47 47)">
        <circle r="11" fill="#16b39e" stroke="#fff" strokeWidth="2.5" />
        <circle r="4" fill="#fff" />
        <g stroke="#16b39e" strokeWidth="4" strokeLinecap="round">
          <line x1="0" y1="-12" x2="0" y2="-9" />
          <line x1="0" y1="12" x2="0" y2="9" />
          <line x1="-12" y1="0" x2="-9" y2="0" />
          <line x1="12" y1="0" x2="9" y2="0" />
        </g>
      </g>
    </svg>
  ),
  management: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="6" y="10" width="46" height="46" rx="7" fill="#f3f7fb" stroke="#c4d4e6" strokeWidth="2.5" />
      <rect x="6" y="10" width="46" height="13" rx="7" fill="#2e8fe0" />
      <line x1="17" y1="5" x2="17" y2="15" stroke="#1b62b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="31" y1="5" x2="31" y2="15" stroke="#1b62b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="45" y1="5" x2="45" y2="15" stroke="#1b62b8" strokeWidth="4" strokeLinecap="round" />
      <g fill="#c4d4e6">
        <rect x="12" y="29" width="8" height="7" rx="1.5" />
        <rect x="25" y="29" width="8" height="7" rx="1.5" />
        <rect x="12" y="41" width="8" height="7" rx="1.5" />
        <rect x="25" y="41" width="8" height="7" rx="1.5" />
      </g>
      <g className="si-check">
        <circle cx="46" cy="46" r="13" fill="#16b39e" stroke="#fff" strokeWidth="3" />
        <polyline points="39,46 44,51 54,40" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  ),
  planning: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="6" y="10" width="46" height="46" rx="7" fill="#f3f7fb" stroke="#c4d4e6" strokeWidth="2.5" />
      <rect x="6" y="10" width="46" height="13" rx="7" fill="#2e8fe0" />
      <line x1="17" y1="5" x2="17" y2="15" stroke="#1b62b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="31" y1="5" x2="31" y2="15" stroke="#1b62b8" strokeWidth="4" strokeLinecap="round" />
      <line x1="45" y1="5" x2="45" y2="15" stroke="#1b62b8" strokeWidth="4" strokeLinecap="round" />
      <g fill="#c4d4e6">
        <rect x="12" y="29" width="8" height="7" rx="1.5" />
        <rect x="25" y="29" width="8" height="7" rx="1.5" />
        <rect x="12" y="41" width="8" height="7" rx="1.5" />
      </g>
      <g className="si-pencil">
        <polygon points="30,52 50,28 57,34 37,58 28,60" fill="#2e8fe0" />
        <polygon points="50,28 54,23 61,29 57,34" fill="#16b39e" />
      </g>
    </svg>
  ),
  posts: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g className="si-frame">
        <rect x="6" y="8" width="52" height="48" rx="8" fill="#dbe5f0" />
        <rect x="11" y="13" width="42" height="38" rx="5" fill="#1ec3b0" />
        <polygon points="14,46 27,24 36,38 42,30 51,46" fill="#2e8fe0" />
        <circle cx="42" cy="22" r="3.5" fill="#fff" opacity="0.8" />
      </g>
    </svg>
  ),
  reels: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="6" y="24" width="52" height="34" rx="6" fill="#1f78d0" />
      <g className="si-clap">
        <rect x="6" y="10" width="52" height="12" rx="3" fill="#1b62b8" transform="rotate(-8 6 22)" />
        <g fill="#fff" transform="rotate(-8 6 22)">
          <polygon points="14,10 22,10 16,22 8,22" />
          <polygon points="30,10 38,10 32,22 24,22" />
          <polygon points="46,10 54,10 48,22 40,22" />
        </g>
      </g>
      <polygon className="si-play" points="26,32 26,50 42,41" fill="#fff" />
    </svg>
  ),
  community: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path className="si-bubble-b" d="M30 28 H54 Q60 28 60 34 V44 Q60 50 54 50 H50 L50 58 L42 50 H30 Q24 50 24 44 V34 Q24 28 30 28 Z" fill="#dfe7f1" />
      <path className="si-bubble-a" d="M14 6 H40 Q48 6 48 14 V28 Q48 36 40 36 H26 L14 46 V36 Q6 36 6 28 V14 Q6 6 14 6 Z" fill="#1f78d0" />
      <g fill="#fff">
        <circle className="si-dot" cx="17" cy="21" r="3.2" />
        <circle className="si-dot" cx="27" cy="21" r="3.2" />
        <circle className="si-dot" cx="37" cy="21" r="3.2" />
      </g>
    </svg>
  ),
  advertising: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g className="si-mega">
        <path d="M10 26 L40 8 Q46 5 46 12 V44 Q46 51 40 48 L10 34 Z" fill="#1f78d0" />
        <ellipse cx="45" cy="28" rx="6" ry="20" fill="#16b39e" />
        <ellipse cx="45" cy="28" rx="3" ry="12" fill="#0e9a86" />
        <path d="M14 34 L22 38 L18 56 Q17 60 13 59 L9 58 Q7 57 8 54 Z" fill="#1b62b8" />
        <rect x="4" y="25" width="9" height="10" rx="3" fill="#c4d4e6" />
      </g>
      <path className="si-wave" d="M52 18 Q58 28 52 38" stroke="#16b39e" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  ),
  influencer: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <g className="si-p-side">
        <circle cx="14" cy="26" r="8" fill="#16b39e" />
        <path d="M0 52 Q0 36 14 36 Q22 36 24 42 L24 54 L2 54 Z" fill="#16b39e" />
        <circle cx="50" cy="26" r="8" fill="#16b39e" />
        <path d="M64 52 Q64 36 50 36 Q42 36 40 42 L40 54 L62 54 Z" fill="#16b39e" />
      </g>
      <g className="si-p-mid">
        <circle cx="32" cy="22" r="10" fill="#2e8fe0" />
        <path d="M14 56 Q14 36 32 36 Q50 36 50 56 Z" fill="#1b62b8" />
      </g>
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect className="si-col" x="8" y="34" width="13" height="22" rx="2.5" fill="#2e8fe0" />
      <rect className="si-col" x="25" y="22" width="13" height="34" rx="2.5" fill="#15a6b8" />
      <rect className="si-col" x="42" y="8" width="13" height="48" rx="2.5" fill="#16c29a" />
    </svg>
  ),
};
