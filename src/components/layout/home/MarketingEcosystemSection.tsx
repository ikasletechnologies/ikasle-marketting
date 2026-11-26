import React, { useEffect, useState } from 'react';
import {
  ArrowUpRight,
  FileText,
  Globe,
  Mail,
  Megaphone,
  Search,
  Share2,
} from 'lucide-react';
import './MarketingEcosystemSection.css';

interface ChannelNode {
  id: string;
  label: string;
  section: string;
  letters: number[];
  position: 'top' | 'bottom';
  col: 'left' | 'center' | 'right';
  Icon: React.FC<{ size?: number; strokeWidth?: number }>;
}

const LETTERS = ['M', 'A', 'R', 'K', 'E', 'T', 'I', 'N', 'G'];

const CHANNELS: ChannelNode[] = [
  {
    id: 'social',
    label: 'SOCIAL MEDIA',
    section: 'Social Media Marketing',
    letters: [0, 1],
    position: 'top',
    col: 'left',
    Icon: Share2,
  },
  {
    id: 'paid',
    label: 'PAID ADS',
    section: 'Google Search Ads',
    letters: [3, 4],
    position: 'top',
    col: 'center',
    Icon: Megaphone,
  },
  {
    id: 'content',
    label: 'CONTENT',
    section: 'Content Marketing',
    letters: [7, 8],
    position: 'top',
    col: 'right',
    Icon: FileText,
  },
  {
    id: 'seo',
    label: 'SEO',
    section: 'SEO & Search Growth',
    letters: [1, 2],
    position: 'bottom',
    col: 'left',
    Icon: Search,
  },
  {
    id: 'email',
    label: 'EMAIL MARKETING',
    section: 'Email Marketing',
    letters: [4, 5],
    position: 'bottom',
    col: 'center',
    Icon: Mail,
  },
  {
    id: 'web',
    label: 'WEB DESIGN',
    section: 'Website & Landing Page Design',
    letters: [6, 7, 8],
    position: 'bottom',
    col: 'right',
    Icon: Globe,
  },
];

export const MarketingEcosystemSection: React.FC<{ onNavigate: (section: string) => void }> = ({
  onNavigate,
}) => {
  const [activeId, setActiveId] = useState<string>(CHANNELS[0].id);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduced) return undefined;
    const id = window.setInterval(() => {
      setActiveId((prev) => {
        const idx = CHANNELS.findIndex((c) => c.id === prev);
        return CHANNELS[(idx + 1) % CHANNELS.length].id;
      });
    }, 2600);
    return () => window.clearInterval(id);
  }, [paused]);

  const activeChannel = CHANNELS.find((c) => c.id === activeId) ?? CHANNELS[0];
  const topChannels = CHANNELS.filter((c) => c.position === 'top');
  const bottomChannels = CHANNELS.filter((c) => c.position === 'bottom');

  return (
    <section
      className="mes-section"
      aria-labelledby="mes-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mes-dot-grid" aria-hidden="true" />
      <div className="mes-glow mes-glow--a" aria-hidden="true" />
      <div className="mes-glow mes-glow--b" aria-hidden="true" />

      <div className="mes-container">
        <header className="mes-header">
          <span className="mes-eyebrow">
            <span className="mes-eyebrow-dot" aria-hidden="true" />
            FULL-FUNNEL ECOSYSTEM
          </span>
          <h2 id="mes-heading" className="mes-title">
            Everything connected under <span className="mes-title-highlight">one growth roof.</span>
          </h2>
        </header>

        <div className="mes-diagram">
          {/* Top Callout Row */}
          <div className="mes-row mes-row--top">
            {topChannels.map(({ id, label, section, col, Icon }) => {
              const isHot = activeId === id;
              return (
                <div
                  key={id}
                  className={`mes-callout mes-callout--${col} mes-callout--top${isHot ? ' is-active' : ''}`}
                >
                  <button
                    type="button"
                    className="mes-callout-btn"
                    onClick={() => onNavigate(section)}
                    onMouseEnter={() => setActiveId(id)}
                    onFocus={() => setActiveId(id)}
                  >
                    <span className="mes-callout-icon" aria-hidden="true">
                      <Icon size={15} strokeWidth={2.2} />
                    </span>
                    <span>{label}</span>
                    <ArrowUpRight className="mes-callout-arrow" size={14} aria-hidden="true" />
                  </button>
                  <span className="mes-connector mes-connector--down" aria-hidden="true">
                    <span className="mes-connector-dot" />
                  </span>
                </div>
              );
            })}
          </div>

          {/* Center 3D Sculptural MARKETING Wordmark */}
          <div className="mes-word-stage" aria-hidden="true">
            <div className="mes-word">
              {LETTERS.map((char, idx) => {
                const isLit = activeChannel.letters.includes(idx);
                return (
                  <span
                    key={`${char}-${idx}`}
                    className={`mes-letter${isLit ? ' is-lit' : ''}`}
                    style={{ '--i': idx } as React.CSSProperties}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
            <div className="mes-floor-shadow" />
          </div>

          {/* Bottom Callout Row */}
          <div className="mes-row mes-row--bottom">
            {bottomChannels.map(({ id, label, section, col, Icon }) => {
              const isHot = activeId === id;
              return (
                <div
                  key={id}
                  className={`mes-callout mes-callout--${col} mes-callout--bottom${isHot ? ' is-active' : ''}`}
                >
                  <span className="mes-connector mes-connector--up" aria-hidden="true">
                    <span className="mes-connector-dot" />
                  </span>
                  <button
                    type="button"
                    className="mes-callout-btn"
                    onClick={() => onNavigate(section)}
                    onMouseEnter={() => setActiveId(id)}
                    onFocus={() => setActiveId(id)}
                  >
                    <span className="mes-callout-icon" aria-hidden="true">
                      <Icon size={15} strokeWidth={2.2} />
                    </span>
                    <span>{label}</span>
                    <ArrowUpRight className="mes-callout-arrow" size={14} aria-hidden="true" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketingEcosystemSection;
