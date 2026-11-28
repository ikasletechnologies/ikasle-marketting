import React, { useCallback, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight, ArrowUpRight, MousePointerClick, PenTool, Search, Share2, Sparkles } from 'lucide-react';
import Magnet from '../../effects/Magnet';
import HeroShowcase from './HeroShowcase';
import { useCountUp, useInView, useInterval, usePrefersReducedMotion } from '../../../hooks/motion';
import './HeroSection.css';

export interface HeroSectionProps {
  onStartJourney?: () => void;
  onExploreServices?: () => void;
  /** Opens an app section by name; used by the service quick links. */
  onNavigate?: (section: string) => void;
}

const ROTATING_WORDS = ['brand growth', 'real leads', 'loyal fans', 'more sales'];

const QUICK_LINKS = [
  { label: 'Social Media', section: 'Social Media Marketing', Icon: Share2 },
  { label: 'SEO', section: 'SEO & Search Growth', Icon: Search },
  { label: 'Performance Ads', section: 'Digital Marketing', Icon: MousePointerClick },
  { label: 'Branding', section: 'Brand Growth & Creative', Icon: PenTool },
];

/** Same figures as the stats section further down the page. */
const STATS = [
  { value: 7, suffix: 'K+', label: 'Projects delivered' },
  { value: 4, suffix: 'K+', label: 'Happy clients' },
  { value: 25, suffix: '+', label: 'Years of experience' },
];

const Stat: React.FC<{ value: number; suffix: string; label: string; run: boolean }> = ({ value, suffix, label, run }) => {
  const n = useCountUp(value, run, 1400);
  return (
    <div className="hero-stat">
      <b>{n}<span>{suffix}</span></b>
      <small>{label}</small>
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartJourney,
  onExploreServices,
  onNavigate,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, seen] = useInView(sectionRef);
  const reduced = usePrefersReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  const nextWord = useCallback(() => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length), []);
  useInterval(nextWord, inView && !reduced ? 2600 : null);

  return (
    <section className="hero-section" id="home" aria-labelledby="home-hero-title" ref={sectionRef}>
      <div className="hero-bg" aria-hidden="true">
        <span className="hero-blob hero-blob--teal" />
        <span className="hero-blob hero-blob--blue" />
        <span className="hero-blob hero-blob--sky" />
        <span className="hero-grid" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-badge" style={{ '--i': 0 } as CSSProperties}>
            <span className="hero-badge-icon"><Sparkles /></span>
            Digital marketing. Real direction.
          </p>

          <h1 className="hero-title" id="home-hero-title" style={{ '--i': 1 } as CSSProperties}>
            <span className="hero-title-line">Turn digital reach</span>
            <span className="hero-title-line">
              into{' '}
              <span className="hero-rotator" aria-hidden="true">
                {ROTATING_WORDS.map((word, i) => (
                  <span key={word} className={`hero-rotator-word${i === wordIndex ? ' is-active' : ''}`}>
                    {word}.
                    {i === wordIndex && (
                      <svg className="hero-swoosh" viewBox="0 0 300 16" preserveAspectRatio="none">
                        <path d="M3 11 C70 3 150 2 297 8" pathLength={1} />
                      </svg>
                    )}
                  </span>
                ))}
              </span>
              <span className="hero-sr-only">brand growth.</span>
            </span>
          </h1>

          <p className="hero-description" style={{ '--i': 2 } as CSSProperties}>
            Strategy, social media, SEO and creative campaigns that move your business forward.
          </p>

          <div className="hero-actions" style={{ '--i': 3 } as CSSProperties}>
            <Magnet
              padding={78}
              magnetStrength={4.8}
              maxOffset={11}
              exclusive
              axis="both"
              tilt={2.2}
              scale={1.015}
              spring={{ stiffness: 190, damping: 18, mass: 0.85 }}
              wrapperClassName="hero-magnet hero-magnet--primary"
              innerClassName="hero-magnet-inner"
              onActiveChange={undefined}
              style={undefined}
            >
              <button type="button" className="hero-btn-primary" onClick={onExploreServices}>
                <span>Explore Services</span>
                <ArrowRight size={19} className="hero-btn-arrow" />
              </button>
            </Magnet>

            <Magnet
              padding={70}
              magnetStrength={6}
              maxOffset={8}
              exclusive
              axis="both"
              tilt={1.5}
              scale={1.01}
              spring={{ stiffness: 180, damping: 19, mass: 0.9 }}
              wrapperClassName="hero-magnet hero-magnet--secondary"
              innerClassName="hero-magnet-inner"
              onActiveChange={undefined}
              style={undefined}
            >
              <button type="button" className="hero-btn-secondary" onClick={onStartJourney}>
                <span>Let’s Talk</span>
                <ArrowUpRight size={18} className="hero-btn-arrow-up" />
              </button>
            </Magnet>
          </div>

          <nav className="hero-quick" aria-label="Popular services" style={{ '--i': 4 } as CSSProperties}>
            <span className="hero-quick-label">Popular:</span>
            {QUICK_LINKS.map(({ label, section, Icon }) => (
              <button
                key={section}
                type="button"
                className="hero-chip"
                onClick={() => (onNavigate ? onNavigate(section) : onExploreServices?.())}
              >
                <Icon aria-hidden="true" />
                {label}
              </button>
            ))}
          </nav>

          <div className="hero-stats" style={{ '--i': 5 } as CSSProperties}>
            {STATS.map((s) => (
              <Stat key={s.label} {...s} run={seen} />
            ))}
          </div>
        </div>

        <div className="hero-visual">
          <HeroShowcase />
        </div>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span />
      </div>
    </section>
  );
};

export default HeroSection;
