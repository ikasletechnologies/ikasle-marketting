import React from 'react';

/** Filled 64×64 SEO icons, in the same style as DIGITAL_ICONS / SOCIAL_ICONS / BRAND_ICONS. */
export const SEO_ICONS: Record<string, React.ReactNode> = {
  audit: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M12 6 H38 L50 18 V56 Q50 58 48 58 H12 Q10 58 10 56 V8 Q10 6 12 6 Z" fill="#1b7fd0" />
      <path d="M38 6 V16 Q38 18 40 18 H50 Z" fill="#7fc3f2" />
      <rect x="17" y="24" width="20" height="4" rx="2" fill="#fff" opacity="0.85" />
      <rect x="17" y="32" width="14" height="4" rx="2" fill="#fff" opacity="0.6" />
      <circle cx="42" cy="44" r="10" fill="#16b39e" stroke="#fff" strokeWidth="3" />
      <line x1="49" y1="51" x2="57" y2="59" stroke="#0f7f74" strokeWidth="5" strokeLinecap="round" />
    </svg>
  ),
  keyword: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="22" cy="24" r="16" fill="#16b39e" />
      <circle cx="18" cy="20" r="5" fill="#fff" />
      <path d="M32 34 L54 56 L54 60 L46 60 L46 54 L40 54 L40 48 L34 48 L28 40 Z" fill="#1b7fd0" />
    </svg>
  ),
  technical: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path
        d="M28 4 H36 L38 12 L44 15 L51 10 L56 15 L52 22 L54 28 L62 30 V36 L54 38 L52 44 L56 51 L51 56 L44 52 L38 54 L36 62 H28 L26 54 L20 52 L13 56 L8 51 L12 44 L10 38 L2 36 V30 L10 28 L12 22 L8 15 L13 10 L20 15 L26 12 Z"
        fill="#1b7fd0"
      />
      <circle cx="32" cy="33" r="11" fill="#fff" />
      <circle cx="32" cy="33" r="5" fill="#16b39e" />
    </svg>
  ),
  onpage: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="5" y="9" width="54" height="46" rx="6" fill="#1767b0" />
      <rect x="5" y="9" width="54" height="11" rx="6" fill="#1b8fd6" />
      <circle cx="12" cy="14.5" r="1.8" fill="#fff" />
      <circle cx="18" cy="14.5" r="1.8" fill="#fff" />
      <rect x="12" y="26" width="28" height="6" rx="3" fill="#16b39e" />
      <rect x="12" y="36" width="40" height="4" rx="2" fill="#fff" opacity="0.6" />
      <rect x="12" y="44" width="30" height="4" rx="2" fill="#fff" opacity="0.4" />
    </svg>
  ),
  local: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <ellipse cx="32" cy="56" rx="16" ry="4" fill="#bfe3f7" />
      <path d="M32 4 C19 4 10 13 10 25 C10 40 32 56 32 56 C32 56 54 40 54 25 C54 13 45 4 32 4 Z" fill="#1b7fd0" />
      <circle cx="32" cy="25" r="9" fill="#fff" />
      <circle cx="32" cy="25" r="4.5" fill="#16b39e" />
    </svg>
  ),
  gbp: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="9" y="28" width="46" height="30" rx="3" fill="#1767b0" />
      <path d="M6 12 Q6 8 10 8 H54 Q58 8 58 12 L60 26 Q60 30 54 30 Q48 30 46 26 Q44 30 38 30 Q32 30 32 26 Q30 30 24 30 Q18 30 18 26 Q16 30 10 30 Q4 30 4 26 Z" fill="#16b39e" />
      <rect x="26" y="40" width="12" height="18" rx="1.5" fill="#7fc3f2" />
      <rect x="44" y="38" width="7" height="7" rx="1.5" fill="#fff" opacity="0.8" />
    </svg>
  ),
  content: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="8" y="6" width="38" height="50" rx="5" fill="#1b8fd6" />
      <rect x="14" y="16" width="24" height="4" rx="2" fill="#fff" opacity="0.85" />
      <rect x="14" y="25" width="18" height="4" rx="2" fill="#fff" opacity="0.6" />
      <rect x="14" y="34" width="22" height="4" rx="2" fill="#fff" opacity="0.6" />
      <path d="M50 18 L58 26 L34 50 L24 52 L26 42 Z" fill="#16b39e" stroke="#fff" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  ),
  offpage: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="4" y="22" width="32" height="20" rx="10" fill="none" stroke="#1b7fd0" strokeWidth="7" transform="rotate(-35 20 32)" />
      <rect x="28" y="22" width="32" height="20" rx="10" fill="none" stroke="#16b39e" strokeWidth="7" transform="rotate(-35 44 32)" />
    </svg>
  ),
  ecommerce: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <path d="M22 20 V16 Q22 6 32 6 Q42 6 42 16 V20" fill="none" stroke="#1767b0" strokeWidth="4.5" strokeLinecap="round" />
      <path d="M10 20 H54 L50 56 Q50 58 48 58 H16 Q14 58 14 56 Z" fill="#1b7fd0" />
      <path d="M10 20 H54 L53 28 H11 Z" fill="#fff" opacity="0.18" />
      <circle cx="32" cy="40" r="9" fill="#16b39e" />
      <path d="M28 40 L31 43 L37 37" fill="none" stroke="#fff" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect x="8" y="36" width="12" height="20" rx="2.5" fill="#15a6b8" />
      <rect x="26" y="26" width="12" height="30" rx="2.5" fill="#1b7fd0" />
      <rect x="44" y="16" width="12" height="40" rx="2.5" fill="#16c29a" />
      <path d="M8 26 L24 16 L36 20 L56 6" fill="none" stroke="#1767b0" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M50 4 L58 4 L58 12 Z" fill="#1767b0" />
    </svg>
  ),
};
