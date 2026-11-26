import React, { useRef, useState } from 'react';
import { ArrowUpRight, Eye, Target } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { splitReveal } from '../../../lib/splitReveal';
import { useGSAP } from '@gsap/react';
import './AboutPurpose.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface Pillar {
  number: string;
  eyebrow: string;
  title: string;
  copy: string;
  highlights: { label: string; note: string }[];
  icon: React.FC<{ size?: number; strokeWidth?: number }>;
}

const pillars: Pillar[] = [
  {
    number: '01',
    eyebrow: 'WHY WE EXIST',
    title: 'Our Mission',
    copy: 'Help brands communicate clearly, connect with the right people and build a stronger digital presence.',
    highlights: [
      { label: 'Clarity', note: 'Sharp messaging that resonates fast' },
      { label: 'Connection', note: 'Reaching the right audience' },
      { label: 'Presence', note: 'Consistent across every channel' },
    ],
    icon: Target,
  },
  {
    number: '02',
    eyebrow: 'WHERE WE LEAD',
    title: 'Our Vision',
    copy: 'Make thoughtful strategy and purposeful creativity part of every brand’s growth journey.',
    highlights: [
      { label: 'Strategy', note: 'Data-backed growth roadmaps' },
      { label: 'Creativity', note: 'Design & stories people remember' },
      { label: 'Growth', note: 'Compounding, measurable ROI' },
    ],
    icon: Eye,
  },
];

export const AboutPurpose: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.about-purpose-inner', start: 'top 78%', once: true },
      });
      tl.from('.about-purpose-eyebrow', { opacity: 0, y: 12, duration: 0.65 });
      SplitText.create('.about-purpose-title-main', {
        type: 'words',
        autoSplit: true,
        onSplit: (self) =>
          splitReveal(
            self.words,
            { opacity: 0, y: 18, filter: 'blur(8px)', duration: 0.85, stagger: 0.08 },
            tl,
            0.08
          ),
      });
      tl.from('.about-purpose-highlight', { opacity: 0, y: 18, duration: 0.75 }, 0.24)
        .from('.about-purpose-sub', { opacity: 0, y: 14, duration: 0.7 }, 0.34)
        .from('.about-purpose-switcher', { opacity: 0, y: 16, duration: 0.7 }, 0.42)
        .from('.about-purpose-deck', { opacity: 0, y: 36, duration: 0.9, ease: 'expo.out' }, 0.35);
    });
  }, { scope: root });

  return (
    <section ref={root} className="about-purpose" aria-labelledby="about-purpose-title">
      <div className="about-purpose-inner">
        <div className="about-purpose-left">
          <span className="about-purpose-eyebrow">
            <span className="about-purpose-eyebrow-line" aria-hidden="true" />
            OUR PHILOSOPHY
          </span>
          <h2 id="about-purpose-title">
            <span className="about-purpose-title-main">Clear purpose.</span>
            <br />
            <span className="about-purpose-highlight">Creative direction.</span>
          </h2>
          <p className="about-purpose-sub">
            Every decision we make balances strategic clarity with creative craft—built to move your brand forward.
          </p>

          <div className="about-purpose-switcher" role="tablist" aria-label="Philosophy pillars">
            {pillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              const isActive = idx === activeIndex;
              return (
                <button
                  key={pillar.title}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`about-purpose-pill cursor-target${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                >
                  <span className="about-purpose-pill-icon" aria-hidden="true">
                    <Icon size={16} strokeWidth={2.1} />
                  </span>
                  <span>
                    <small>{pillar.number}</small> {pillar.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="about-purpose-deck" role="tabpanel">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isActive = idx === activeIndex;
            return (
              <article
                key={pillar.title}
                className={`about-purpose-card ${isActive ? 'is-front' : 'is-back'}${idx === 1 ? ' is-dark' : ''}`}
                onClick={() => {
                  if (!isActive) setActiveIndex(idx);
                }}
                aria-hidden={!isActive}
              >
                <span className="about-purpose-watermark" aria-hidden="true">
                  {pillar.number}
                </span>

                <div className="about-purpose-card-top">
                  <div className="about-purpose-card-badge">
                    <span className="about-purpose-card-icon" aria-hidden="true">
                      <Icon size={24} strokeWidth={1.9} />
                    </span>
                    <div>
                      <span className="about-purpose-card-eyebrow">{pillar.eyebrow}</span>
                      <h3>{pillar.title}</h3>
                    </div>
                  </div>
                  {!isActive ? (
                    <span className="about-purpose-peek-hint">
                      View <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  ) : (
                    <span className="about-purpose-card-counter">{pillar.number} / 02</span>
                  )}
                </div>

                <p className="about-purpose-card-copy">{pillar.copy}</p>

                <div className="about-purpose-pillars">
                  {pillar.highlights.map(({ label, note }) => (
                    <div key={label} className="about-purpose-pillar-item">
                      <strong>{label}</strong>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutPurpose;
