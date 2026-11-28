import React from 'react';
import type { RegionId } from '../../content/clients/clients';

const FLAGS: Record<RegionId, React.ReactNode> = {
  india: (
    <>
      <rect width="32" height="22" rx="2.5" fill="#fff" />
      <rect width="32" height="7.3" fill="#FF9933" />
      <rect y="14.7" width="32" height="7.3" fill="#138808" />
      <circle cx="16" cy="11" r="2.6" fill="none" stroke="#000080" strokeWidth="1" />
      <circle cx="16" cy="11" r="0.7" fill="#000080" />
    </>
  ),
  usa: (
    <>
      <rect width="32" height="22" rx="2.5" fill="#fff" />
      <path fill="#B22234" d="M0 0h32v1.7H0zm0 3.4h32v1.7H0zm0 3.4h32v1.7H0zm0 3.4h32v1.7H0zm0 3.4h32v1.7H0zm0 3.4h32v1.7H0zm0 3.4h32V22H0z" />
      <rect width="14" height="11.9" rx="1" fill="#3C3B6E" />
    </>
  ),
  uk: (
    <>
      <rect width="32" height="22" rx="2.5" fill="#012169" />
      <path d="M0 0l32 22M32 0L0 22" stroke="#fff" strokeWidth="3.8" />
      <path d="M0 0l32 22M32 0L0 22" stroke="#C8102E" strokeWidth="2" />
      <path d="M16 0v22M0 11h32" stroke="#fff" strokeWidth="6" />
      <path d="M16 0v22M0 11h32" stroke="#C8102E" strokeWidth="3.4" />
    </>
  ),
  canada: (
    <>
      <rect width="32" height="22" rx="2.5" fill="#fff" />
      <rect width="8" height="22" rx="2" fill="#D80621" />
      <rect x="24" width="8" height="22" rx="2" fill="#D80621" />
      <path fill="#D80621" d="M16 4l1.2 3.2 2.4-.7-.8 2.6 2.2 1.1-1.3 1.5.4 1.6-3-.6V17h-2.2v-4.3l-3 .6.4-1.6-1.3-1.5 2.2-1.1-.8-2.6 2.4.7z" />
    </>
  ),
  australia: (
    <>
      <rect width="32" height="22" rx="2.5" fill="#00008B" />
      <rect width="14" height="10" fill="#012169" />
      <path d="M0 0l14 10M14 0L0 10" stroke="#fff" strokeWidth="1.8" />
      <path d="M7 0v10M0 5h14" stroke="#fff" strokeWidth="2.8" />
      <path d="M7 0v10M0 5h14" stroke="#C8102E" strokeWidth="1.6" />
      <circle cx="7" cy="15.5" r="1.6" fill="#fff" />
      <circle cx="24" cy="6" r="1.1" fill="#fff" />
      <circle cx="27" cy="10" r="1" fill="#fff" />
      <circle cx="22" cy="11.5" r="1" fill="#fff" />
      <circle cx="24.5" cy="16" r="1.1" fill="#fff" />
    </>
  ),
  europe: (
    <>
      <rect width="32" height="22" rx="2.5" fill="#003399" />
      <circle cx="16" cy="5.5" r="1" fill="#FFCC00" />
      <circle cx="19.3" cy="6.6" r="1" fill="#FFCC00" />
      <circle cx="21" cy="9.5" r="1" fill="#FFCC00" />
      <circle cx="21" cy="12.7" r="1" fill="#FFCC00" />
      <circle cx="19.3" cy="15.4" r="1" fill="#FFCC00" />
      <circle cx="16" cy="16.5" r="1" fill="#FFCC00" />
      <circle cx="12.7" cy="15.4" r="1" fill="#FFCC00" />
      <circle cx="11" cy="12.7" r="1" fill="#FFCC00" />
      <circle cx="11" cy="9.5" r="1" fill="#FFCC00" />
      <circle cx="12.7" cy="6.6" r="1" fill="#FFCC00" />
    </>
  ),
};

const NAMES: Record<RegionId, string> = {
  india: 'India',
  usa: 'United States',
  uk: 'United Kingdom',
  canada: 'Canada',
  australia: 'Australia',
  europe: 'European Union',
};

interface CountryFlagProps {
  id: RegionId;
  width?: number;
  /** Decorative flags (next to a visible country name) are hidden from screen readers. */
  decorative?: boolean;
  className?: string;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({ id, width = 32, decorative = false, className }) => (
  <svg
    viewBox="0 0 32 22"
    width={width}
    height={(width * 22) / 32}
    className={className}
    {...(decorative ? { 'aria-hidden': true } : { role: 'img', 'aria-label': NAMES[id] })}
  >
    {FLAGS[id]}
  </svg>
);

export const COUNTRY_NAMES = NAMES;
