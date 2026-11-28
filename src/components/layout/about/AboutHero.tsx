import React, { useRef } from 'react';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowRight, Lightbulb, MapPin, Megaphone, Palette, PenTool, Rocket, Search, Sparkles, TrendingUp, Users } from 'lucide-react';
import logoImg from '../../../assets/logo-clean.png';
import { PageHero } from '../shared/PageHero';
import { useInView } from '../../../hooks/motion';
import './AboutHero.css';

export interface AboutHeroProps {
  onHomeClick?: () => void;
  onContactClick?: () => void;
}

/** Same four stages as the "How it works" section below. */
const STEPS = [
  { label: 'Discover', Icon: Search },
  { label: 'Strategise', Icon: Lightbulb },
  { label: 'Launch', Icon: Rocket },
  { label: 'Scale', Icon: TrendingUp },
];

const ROLES = [
  { label: 'Strategy', Icon: Lightbulb },
  { label: 'Design', Icon: Palette },
  { label: 'Content', Icon: PenTool },
  { label: 'Ads', Icon: Megaphone },
];

/** From the "Our values" section. */
const VALUES = ['Understand first', 'Create with purpose', 'Keep improving'];

const AboutShowcase: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView] = useInView(ref);

  return (
    <div className={`ph-stage ab-stage${inView ? '' : ' ph-paused'}`} ref={ref} aria-hidden="true">
      <div className="ph-stage-inner">
        {/* Process ring */}
        <div className="ab-ring">
          <svg viewBox="0 0 100 100" className="ab-ring-svg">
            <defs>
              <linearGradient id="ab-ring-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#00a99d" />
                <stop offset="1" stopColor="#2178a7" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="46" className="ab-ring-track" />
            <circle cx="50" cy="50" r="46" pathLength={100} className="ab-ring-progress" />
          </svg>

          <div className="ab-core">
            <span className="ab-core-pulse" />
            <span className="ab-core-pulse ab-core-pulse--2" />
            <img src={logoImg} alt="" />
          </div>

          {STEPS.map(({ label, Icon }, i) => (
            <span key={label} className={`ab-node ab-node--${i}`} style={{ '--n': i } as CSSProperties}>
              <span className="ab-node-dot"><Icon /></span>
              <span className="ab-node-label"><em>0{i + 1}</em>{label}</span>
            </span>
          ))}
        </div>

        {/* Team */}
        <div className="ph-card ab-team" style={{ '--d': '300ms' } as CSSProperties}>
          <div className="ab-card-head">
            <span className="ab-card-icon"><Users /></span>
            <div>
              <b>One team, every skill</b>
              <small>Under one roof</small>
            </div>
          </div>
          <div className="ab-roles">
            {ROLES.map(({ label, Icon }, i) => (
              <span key={label} className="ab-role" style={{ '--r': i } as CSSProperties}>
                <Icon />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Pillars */}
        <div className="ph-card ab-pillars" style={{ '--d': '480ms' } as CSSProperties}>
          <Sparkles />
          <span>Strategy</span><i /><span>Creativity</span><i /><span>Growth</span>
        </div>

        {/* Values */}
        <div className="ph-card ab-values" style={{ '--d': '640ms' } as CSSProperties}>
          <small>What we believe</small>
          <div className="ab-values-rotor">
            {VALUES.map((v, i) => (
              <b key={v} style={{ '--v': i } as CSSProperties}>{v}</b>
            ))}
          </div>
          <div className="ab-values-dots">
            {VALUES.map((v, i) => <i key={v} style={{ '--v': i } as CSSProperties} />)}
          </div>
        </div>

        {/* Location */}
        <div className="ph-card ab-place" style={{ '--d': '800ms' } as CSSProperties}>
          <span className="ab-pin"><MapPin /></span>
          <div>
            <b>Based in Coimbatore</b>
            <small>Tamil Nadu, India</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AboutHero: React.FC<AboutHeroProps> = ({ onHomeClick, onContactClick }) => {
  const scrollToStory = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.closest('section')?.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <PageHero
      id="about-hero"
      badge="About IKASLĒ Marketing"
      BadgeIcon={Sparkles}
      titleTop="The thinking behind"
      titleLead="your next"
      words={['chapter', 'campaign', 'big launch', 'growth story']}
      description={<>Meet the strategy and creativity behind <strong>IKASLĒ Marketing</strong>: one team that listens first, plans with purpose and keeps improving.</>}
      pageName="About"
      onHomeClick={onHomeClick}
      actions={
        <>
          <button type="button" className="ph-btn ph-btn--primary" onClick={onContactClick}>
            Let’s work together <ArrowRight aria-hidden="true" />
          </button>
          <button type="button" className="ph-btn ph-btn--ghost" onClick={scrollToStory}>
            Our story <ArrowDown aria-hidden="true" />
          </button>
        </>
      }
      visual={<AboutShowcase />}
    />
  );
};

export default AboutHero;
