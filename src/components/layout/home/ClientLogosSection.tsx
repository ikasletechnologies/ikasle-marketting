import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';
import './ClientLogosSection.css';

interface ClientLogo {
  name: string;
  sector: string;
  focus: string;
  src: string;
}

const CLIENT_LOGOS: ClientLogo[] = [
  {
    name: 'Aadhan Caterers',
    sector: 'Hospitality',
    focus: 'Social Media, Local SEO & Event Lead Generation',
    src: '/clientlogo/aadhancaterers.jpeg',
  },
  {
    name: 'Acme Bricks',
    sector: 'Manufacturing',
    focus: 'B2B Search Visibility & Brand Positioning',
    src: '/clientlogo/acme-bricks.webp',
  },
  {
    name: 'Akvinz',
    sector: 'Technology',
    focus: 'Digital Strategy, Content & Performance Ads',
    src: '/clientlogo/akvinz.png',
  },
  {
    name: 'Get Events',
    sector: 'Events',
    focus: 'Creative Campaigns, Reels & Audience Growth',
    src: '/clientlogo/get-events.png',
  },
  {
    name: 'Giftery',
    sector: 'D2C & Gifting',
    focus: 'E-Commerce SEO, Meta Ads & Brand Creative',
    src: '/clientlogo/giftery.png',
  },
  {
    name: 'Rent-O-Mate',
    sector: 'PropTech',
    focus: 'Performance Marketing & Conversion Funnel',
    src: '/clientlogo/rent-o-mate.png',
  },
  {
    name: 'Uzhavar Connect',
    sector: 'AgriTech',
    focus: 'Brand Storytelling, Community & Search Growth',
    src: '/clientlogo/uzhavar-connect.webp',
  },
];

const TOTAL = CLIENT_LOGOS.length;
const ORBIT_RADIUS = 178;

export const ClientLogosSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (paused || reduced) return undefined;
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOTAL);
    }, 2800);
    return () => window.clearInterval(id);
  }, [paused]);

  const active = CLIENT_LOGOS[activeIndex];
  const activeAngle = -90 + (360 / TOTAL) * activeIndex;

  return (
    <section
      className="cl-section"
      aria-label="Trusted client brands"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="cl-aura cl-aura--a" aria-hidden="true" />
      <div className="cl-aura cl-aura--b" aria-hidden="true" />

      <div className="cl-container">
        {/* Left: Interactive Orbital Constellation */}
        <div className="cl-orbit-wrap" aria-label="Client constellation">
          <div className="cl-orbit-ring cl-orbit-ring--outer" aria-hidden="true" />
          <div className="cl-orbit-ring cl-orbit-ring--inner" aria-hidden="true" />

          {/* Active beam from center hub to selected satellite */}
          <div
            className="cl-beam"
            style={{ transform: `rotate(${activeAngle}deg)` }}
            aria-hidden="true"
          />

          {/* Center IKASLĒ Hub */}
          <div className="cl-hub" aria-hidden="true">
            <span className="cl-hub-pulse" />
            <span className="cl-hub-brand">IKASLĒ</span>
            <small className="cl-hub-sub">7+ Partners</small>
          </div>

          {/* 7 Orbiting Client Nodes */}
          {CLIENT_LOGOS.map(({ name, src }, idx) => {
            const angleRad = ((-90 + (360 / TOTAL) * idx) * Math.PI) / 180;
            const x = Math.round(Math.cos(angleRad) * ORBIT_RADIUS);
            const y = Math.round(Math.sin(angleRad) * ORBIT_RADIUS);
            const isActive = idx === activeIndex;

            return (
              <button
                key={name}
                type="button"
                className={`cl-node${isActive ? ' is-active' : ''}`}
                style={{ '--nx': `${x}px`, '--ny': `${y}px` } as React.CSSProperties}
                onClick={() => setActiveIndex(idx)}
                onMouseEnter={() => setActiveIndex(idx)}
                aria-label={`Select ${name}`}
                aria-pressed={isActive}
              >
                <img src={src} alt={`${name} logo`} loading="lazy" decoding="async" />
              </button>
            );
          })}
        </div>

        {/* Right: Editorial Copy + Live Partner Story */}
        <div className="cl-info">
          <span className="cl-eyebrow">
            <span className="cl-eyebrow-line" aria-hidden="true" />
            TRUSTED PARTNERS
          </span>
          <h2 className="cl-title">
            Brands orbiting <span className="cl-title-highlight">growth with IKASLĒ.</span>
          </h2>
          <p className="cl-desc">
            Hover or click any brand in our partner constellation to see how we help businesses scale across industries.
          </p>

          <article key={active.name} className="cl-spotlight">
            <div className="cl-spotlight-top">
              <span className="cl-spotlight-sector">
                <Sparkles size={12} strokeWidth={2.2} aria-hidden="true" />
                {active.sector}
              </span>
              <span className="cl-spotlight-count">
                0{activeIndex + 1} / 0{TOTAL}
              </span>
            </div>

            <div className="cl-spotlight-body">
              <div className="cl-spotlight-logo">
                <img src={active.src} alt={`${active.name} logo`} />
              </div>
              <div>
                <h3>{active.name}</h3>
                <p>{active.focus}</p>
              </div>
            </div>
          </article>

          <div className="cl-pills" role="tablist" aria-label="Select partner brand">
            {CLIENT_LOGOS.map(({ name }, idx) => (
              <button
                key={name}
                type="button"
                role="tab"
                aria-selected={idx === activeIndex}
                className={`cl-pill-btn${idx === activeIndex ? ' is-active' : ''}`}
                onClick={() => setActiveIndex(idx)}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
