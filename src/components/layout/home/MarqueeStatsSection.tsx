import React, { useEffect, useRef, useState } from 'react';
import { Briefcase, Trophy, Users, Clock } from 'lucide-react';
import './MarqueeStatsSection.css';

interface MarqueeItem {
  label: string;
  solid?: boolean;
}

const MARQUEE_ITEMS: MarqueeItem[] = [
  { label: 'OPTIMIZATION' },
  { label: 'DESIGN', solid: true },
  { label: 'DEVELOPMENT' },
  { label: 'STRATEGY' },
  { label: 'GROWTH', solid: true },
  { label: 'MARKETING' },
];

interface StatItem {
  num: string;
  target: number;
  suffix: string;
  label: string;
  tag: string;
  fill: number;
  featured?: boolean;
  Icon: React.FC<{ size?: number; strokeWidth?: number }>;
}

const STATS: StatItem[] = [
  {
    num: '01',
    target: 7,
    suffix: 'K',
    label: 'Projects Completed',
    tag: 'Delivered',
    fill: 92,
    Icon: Briefcase,
  },
  {
    num: '02',
    target: 16,
    suffix: '',
    label: 'Honorable Award',
    tag: 'Recognized',
    fill: 84,
    featured: true,
    Icon: Trophy,
  },
  {
    num: '03',
    target: 4,
    suffix: 'K',
    label: 'Satisfied Customers',
    tag: '96% Retention',
    fill: 96,
    Icon: Users,
  },
  {
    num: '04',
    target: 25,
    suffix: '',
    label: 'Years Great Experience',
    tag: 'Proven Craft',
    fill: 90,
    Icon: Clock,
  },
];

const StatCounter: React.FC<{ target: number; suffix: string; active: boolean }> = ({
  target,
  suffix,
  active,
}) => {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [count, setCount] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (!active || prefersReduced) return;

    const duration = 1400;
    const start = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, prefersReduced, target]);

  return (
    <span className="ms-value">
      {prefersReduced ? target : count}
      <span className="ms-value-suffix">{suffix}+</span>
    </span>
  );
};

export const MarqueeStatsSection: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="ms-section" aria-label="Agency capabilities and milestones">
      <div className="ms-marquee-wrap" aria-hidden="true">
        <div className="ms-marquee-track">
          {[0, 1].map((dup) => (
            <div key={dup} className="ms-marquee-group">
              {MARQUEE_ITEMS.map((item) => (
                <React.Fragment key={`${dup}-${item.label}`}>
                  <span
                    className={`ms-marquee-word ${
                      item.solid ? 'ms-marquee-word--solid' : 'ms-marquee-word--outline'
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="ms-marquee-sep">/</span>
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="ms-container">
        <div ref={gridRef} className={`ms-grid${inView ? ' is-visible' : ''}`}>
          {STATS.map(({ num, target, suffix, label, tag, fill, featured, Icon }) => (
            <article
              key={label}
              className={`ms-card${featured ? ' ms-card--featured' : ''}`}
              style={{ '--fill': `${fill}%` } as React.CSSProperties}
            >
              <span className="ms-watermark" aria-hidden="true">{num}</span>

              <div className="ms-card-top">
                <div className="ms-icon-wrap" aria-hidden="true">
                  <Icon size={24} strokeWidth={1.85} />
                </div>
                <span className="ms-tag">{tag}</span>
              </div>

              <div className="ms-card-body">
                <StatCounter target={target} suffix={suffix} active={inView} />
                <p className="ms-label">{label}</p>
              </div>

              <div className="ms-meter" aria-hidden="true">
                <span className="ms-meter-fill" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeStatsSection;
