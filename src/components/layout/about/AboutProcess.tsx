import React, { useRef } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Gauge,
  Handshake,
  Layers3,
  Palette,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { splitReveal } from '../../../lib/splitReveal';
import './AboutProcess.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const milestones = [
  {
    num: '01',
    year: '2020',
    title: 'The Spark',
    copy: 'IKASLE begins with a clear belief: ambitious brands deserve thoughtful digital direction.',
    icon: Sparkles,
  },
  {
    num: '02',
    year: '2021',
    title: 'First Momentum',
    copy: 'Our first partnerships turn strategy into measurable campaigns and lasting working relationships.',
    icon: TrendingUp,
  },
  {
    num: '03',
    year: '2022',
    title: 'Stronger Systems',
    copy: 'We bring social, SEO and brand thinking together so every channel works toward one goal.',
    icon: Layers3,
    featured: true,
  },
  {
    num: '04',
    year: '2023',
    title: 'Creative Reach',
    copy: 'New ideas, richer content and sharper storytelling help more brands find their audience.',
    icon: Palette,
  },
  {
    num: '05',
    year: '2024',
    title: 'Better Partnerships',
    copy: 'We grow through collaboration, building a more connected team around every client challenge.',
    icon: Handshake,
  },
  {
    num: '06',
    year: '2025',
    title: 'Smarter Growth',
    copy: 'Performance, insight and creativity meet in a more focused approach to sustainable growth.',
    icon: Gauge,
  },
  {
    num: '07',
    year: '2026',
    title: 'The Next Chapter',
    copy: 'Seven years in, we keep moving forward with the same curiosity and a bigger view of what is possible.',
    icon: ArrowUpRight,
  },
];

export const AboutProcess: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const headerTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: '.about-process-inner', start: 'top 80%', once: true },
        });

        headerTl.from('.about-process-eyebrow', { opacity: 0, y: 12, duration: 0.6 });

        SplitText.create('#about-process-title', {
          type: 'words',
          autoSplit: true,
          onSplit: (self) =>
            splitReveal(
              self.words,
              { opacity: 0, y: 20, filter: 'blur(8px)', duration: 0.85, stagger: 0.06 },
              headerTl,
              0.08
            ),
        });

        headerTl.from('.about-process-intro', { opacity: 0, y: 16, duration: 0.7 }, 0.3);

        const timelineTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: '.about-process-steps', start: 'top 82%', once: true },
        });

        timelineTl
          .fromTo(
            '.about-process-steps',
            { '--track-scale': 0 },
            { '--track-scale': 1, duration: 1.2, ease: 'expo.out' }
          )
          .fromTo(
            '.about-process-marker',
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.55, stagger: 0.09, ease: 'back.out(1.9)' },
            0.12
          )
          .from('.about-process-year', { opacity: 0, y: -8, duration: 0.45, stagger: 0.09 }, 0.16)
          .from('.about-process-stem', { scaleY: 0, duration: 0.5, stagger: 0.09 }, 0.2)
          .from('.about-process-num', { opacity: 0, scale: 0.75, duration: 0.5, stagger: 0.09 }, 0.25)
          .from('.about-process-copy', { opacity: 0, y: 14, duration: 0.6, stagger: 0.09 }, 0.28)
          .from('.about-process-arrow', { opacity: 0, x: -14, duration: 0.5 }, 0.85);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="about-process" aria-labelledby="about-process-title">
      <div className="about-process-inner">
        <span className="about-process-eyebrow">OUR JOURNEY</span>
        <h2 id="about-process-title">Seven years of moving brands forward.</h2>
        <p className="about-process-intro">
          Every milestone has shaped how we think, create and grow alongside the brands we work with.
        </p>

        <div className="about-process-scroll">
          <ol className="about-process-steps">
            {milestones.map(({ num, year, title, copy, icon: Icon, featured }, index) => {
              const isUp = index % 2 === 1;
              return (
                <li
                  className={
                    'about-process-step cursor-target ' +
                    (isUp ? 'is-up' : 'is-down') +
                    (featured ? ' is-featured' : '')
                  }
                  data-cursor-label={year}
                  key={year}
                >
                  {/* Top slot (used by even steps: 02, 04, 06) */}
                  <div className="about-process-slot about-process-slot--top">
                    {isUp && (
                      <div className="about-process-card">
                        <div className="about-process-card-meta">
                          <span className="about-process-num">{num}</span>
                          <span className="about-process-mobile-year">{year}</span>
                        </div>
                        <div className="about-process-copy">
                          <h3>{title}</h3>
                          <p>{copy}</p>
                        </div>
                      </div>
                    )}
                    {isUp && <span className="about-process-stem" aria-hidden="true" />}
                  </div>

                  {/* Center axis node + year */}
                  <div className="about-process-axis">
                    <span className="about-process-year">{year}</span>
                    <span className="about-process-marker" aria-hidden="true">
                      <Icon className="about-process-marker-icon" size={featured ? 18 : 15} strokeWidth={2.1} />
                    </span>
                  </div>

                  {/* Bottom slot (used by odd steps: 01, 03, 05, 07) */}
                  <div className="about-process-slot about-process-slot--bottom">
                    {!isUp && <span className="about-process-stem" aria-hidden="true" />}
                    {!isUp && (
                      <div className="about-process-card">
                        <div className="about-process-copy">
                          <h3>{title}</h3>
                          <p>{copy}</p>
                        </div>
                        <div className="about-process-card-meta">
                          <span className="about-process-num">{num}</span>
                          <span className="about-process-mobile-year">{year}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
            <li className="about-process-arrow" aria-hidden="true">
              <ArrowRight size={20} strokeWidth={2.2} />
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default AboutProcess;
