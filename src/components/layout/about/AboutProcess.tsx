import React from 'react';
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
import './AboutProcess.css';

const milestones = [
  {
    year: '2020',
    title: 'The Spark',
    copy: 'IKASLE begins with a clear belief: ambitious brands deserve thoughtful digital direction.',
    icon: Sparkles,
  },
  {
    year: '2021',
    title: 'First Momentum',
    copy: 'Our first partnerships turn strategy into measurable campaigns and lasting working relationships.',
    icon: TrendingUp,
  },
  {
    year: '2022',
    title: 'Stronger Systems',
    copy: 'We bring social, SEO and brand thinking together so every channel works toward one goal.',
    icon: Layers3,
    featured: true,
  },
  {
    year: '2023',
    title: 'Creative Reach',
    copy: 'New ideas, richer content and sharper storytelling help more brands find their audience.',
    icon: Palette,
  },
  {
    year: '2024',
    title: 'Better Partnerships',
    copy: 'We grow through collaboration, building a more connected team around every client challenge.',
    icon: Handshake,
  },
  {
    year: '2025',
    title: 'Smarter Growth',
    copy: 'Performance, insight and creativity meet in a more focused approach to sustainable growth.',
    icon: Gauge,
  },
  {
    year: '2026',
    title: 'The Next Chapter',
    copy: 'Seven years in, we keep moving forward with the same curiosity and a bigger view of what is possible.',
    icon: ArrowUpRight,
  },
];

export const AboutProcess: React.FC = () => {
  return (
    <section className="about-process" aria-labelledby="about-process-title">
      <div className="about-process-inner">
        <span className="about-process-eyebrow">OUR JOURNEY</span>
        <h2 id="about-process-title">Seven years of moving brands forward.</h2>
        <p className="about-process-intro">
          Every milestone has shaped how we think, create and grow alongside the brands we work with.
        </p>

        <div className="about-process-scroll">
          <ol className="about-process-steps">
            {milestones.map(({ year, title, copy, icon: Icon, featured }) => (
              <li
                className={'about-process-step cursor-target' + (featured ? ' is-featured' : '')}
                data-cursor-label={year}
                key={year}
              >
                <span className="about-process-year">{year}</span>
                <span className="about-process-marker" aria-hidden="true">
                  <Icon className="about-process-marker-icon" size={featured ? 26 : 18} strokeWidth={1.9} />
                </span>
                <div className="about-process-copy">
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </div>
              </li>
            ))}
            <li className="about-process-arrow" aria-hidden="true">
              <ArrowRight size={24} strokeWidth={2.1} />
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default AboutProcess;