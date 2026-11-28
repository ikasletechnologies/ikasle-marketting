import React, { useCallback, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Heart, Layers, Megaphone, PenTool, Search, Share2 } from 'lucide-react';
import logoImg from '../../../assets/logo-clean.png';
import { PageHero } from '../shared/PageHero';
import { useInView, useInterval, usePrefersReducedMotion } from '../../../hooks/motion';
import './ServicesHero.css';

export interface ServicesHeroProps {
  onHomeClick?: () => void;
  onContactClick?: () => void;
  /** Opens one of the four service hubs by id (see coreServices.ts). */
  onServiceClick?: (id: string) => void;
}

const TILES = [
  { id: 'digital-marketing', title: 'Digital Marketing', tags: 'Ads · Email · CRO', Icon: Megaphone, kind: 'digital' },
  { id: 'social-media', title: 'Social Media', tags: 'Posts · Reels · Community', Icon: Share2, kind: 'social' },
  { id: 'seo-search', title: 'SEO & Search', tags: 'Technical · Local · Content', Icon: Search, kind: 'seo' },
  { id: 'brand-growth', title: 'Brand & Creative', tags: 'Identity · Web · Campaigns', Icon: PenTool, kind: 'brand' },
] as const;

/** Connector from the hub (50,46) to each tile's inner corner, in stage units (100 × 92). */
const LINKS = ['M50 46 C44 40 42 32 40 26', 'M50 46 C56 40 58 32 60 26', 'M50 46 C44 52 42 60 40 66', 'M50 46 C56 52 58 60 60 66'];

const Viz: React.FC<{ kind: (typeof TILES)[number]['kind'] }> = ({ kind }) => {
  if (kind === 'digital') {
    return (
      <span className="sv-viz sv-viz--bars" aria-hidden="true">
        {[38, 52, 46, 70, 92].map((h, i) => (
          <i key={i} style={{ '--h': `${h}%`, '--b': i } as CSSProperties} />
        ))}
      </span>
    );
  }
  if (kind === 'social') {
    return (
      <span className="sv-viz sv-viz--social" aria-hidden="true">
        <span className="sv-avatars"><i /><i /><i /></span>
        <span className="sv-heart"><Heart /><b /><b /></span>
      </span>
    );
  }
  if (kind === 'seo') {
    return (
      <span className="sv-viz sv-viz--seo" aria-hidden="true">
        <span className="sv-search"><Search /><span className="sv-typed">best agency near me</span></span>
        <span className="sv-rank">#1</span>
      </span>
    );
  }
  return (
    <span className="sv-viz sv-viz--brand" aria-hidden="true">
      {['#071d35', '#2178a7', '#00a99d', '#7fe3dc'].map((c, i) => (
        <i key={c} style={{ background: c, '--s': i } as CSSProperties} />
      ))}
      <span className="sv-type">Aa</span>
    </span>
  );
};

const ServicesShowcase: React.FC<{ onServiceClick?: (id: string) => void }> = ({ onServiceClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView] = useInView(ref);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);

  const next = useCallback(() => setActive((a) => (a + 1) % TILES.length), []);
  useInterval(next, inView && !reduced && !hovering ? 2400 : null);

  return (
    <div
      className={`ph-stage sv-stage${inView ? '' : ' ph-paused'}`}
      ref={ref}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="ph-stage-inner">
        <svg className="sv-links" viewBox="0 0 100 92" preserveAspectRatio="none" aria-hidden="true">
          {LINKS.map((d, i) => (
            <path key={d} d={d} className={`sv-link${i === active ? ' is-active' : ''}`} />
          ))}
        </svg>

        <div className="sv-hub" aria-hidden="true">
          <span className="sv-hub-ring" />
          <span className="sv-hub-ring sv-hub-ring--2" />
          <span className="sv-hub-core"><img src={logoImg} alt="" /></span>
          <span className="sv-hub-label"><Layers /> One connected plan</span>
        </div>

        {TILES.map((t, i) => (
          <button
            key={t.id}
            type="button"
            className={`ph-card sv-tile sv-tile--${i}${i === active ? ' is-active' : ''}`}
            style={{ '--d': `${250 + i * 140}ms` } as CSSProperties}
            onClick={() => onServiceClick?.(t.id)}
            onMouseEnter={() => { setHovering(true); setActive(i); }}
            onFocus={() => setActive(i)}
          >
            <span className="sv-tile-top">
              <span className={`sv-icon sv-icon--${t.kind}`}><t.Icon aria-hidden="true" /></span>
              <ArrowUpRight className="sv-go" aria-hidden="true" />
            </span>
            <b>{t.title}</b>
            <small>{t.tags}</small>
            <Viz kind={t.kind} />
          </button>
        ))}
      </div>
    </div>
  );
};

export const ServicesHero: React.FC<ServicesHeroProps> = ({ onHomeClick, onContactClick, onServiceClick }) => {
  const scrollToListing = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.closest('section')?.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageHero
      id="services-hero"
      badge="Our services"
      BadgeIcon={Layers}
      titleTop="Smart strategy."
      titleLead="Stronger"
      words={['impact', 'reach', 'brands', 'results']}
      description={<>Digital marketing, social media, SEO and branding, <strong>working together</strong> as one plan. Pick a service to dive in.</>}
      pageName="Services"
      onHomeClick={onHomeClick}
      actions={
        <>
          <button type="button" className="ph-btn ph-btn--primary" onClick={scrollToListing}>
            Explore services <ArrowDown aria-hidden="true" />
          </button>
          <button type="button" className="ph-btn ph-btn--ghost" onClick={onContactClick}>
            Let’s Talk <ArrowRight aria-hidden="true" />
          </button>
        </>
      }
      visual={<ServicesShowcase onServiceClick={onServiceClick} />}
    />
  );
};

export default ServicesHero;
