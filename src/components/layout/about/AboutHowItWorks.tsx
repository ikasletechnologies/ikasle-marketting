import React, { useRef } from 'react';
import {
  Compass,
  Layers3,
  Rocket,
  SearchCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import { splitReveal } from '../../../lib/splitReveal';
import './AboutHowItWorks.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface WorkStep {
  step: string;
  title: string;
  copy: string;
  Icon: React.FC<{ size?: number; strokeWidth?: number }>;
  BadgeIcon: React.FC<{ size?: number; strokeWidth?: number }>;
}

const STEPS: WorkStep[] = [
  {
    step: 'Step 01',
    title: 'Brand & Audience Discovery',
    copy: 'We audit your digital presence, study your market, and uncover what motivates your ideal customers.',
    Icon: SearchCheck,
    BadgeIcon: Sparkles,
  },
  {
    step: 'Step 02',
    title: 'Channel & Content Strategy',
    copy: 'We map out a connected plan across SEO, social media, paid campaigns, and brand storytelling.',
    Icon: Compass,
    BadgeIcon: Layers3,
  },
  {
    step: 'Step 03',
    title: 'Creative Execution & Launch',
    copy: 'Our team crafts high-converting campaigns, engaging visuals, and search-ready content built to perform.',
    Icon: Rocket,
    BadgeIcon: Sparkles,
  },
  {
    step: 'Step 04',
    title: 'Analyze, Refine & Scale',
    copy: 'We track real metrics, double down on what converts, and continuously optimize for sustainable ROI.',
    Icon: TrendingUp,
    BadgeIcon: TrendingUp,
  },
];

const TAGS = [
  'Digital Marketing',
  'Social Media Growth',
  'SEO & Search Visibility',
  'Brand Storytelling',
];

export const AboutHowItWorks: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const headerTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: '.ahiw-header', start: 'top 82%', once: true },
        });

        headerTl.from('.ahiw-eyebrow', { opacity: 0, y: 14, duration: 0.6 });

        SplitText.create('.ahiw-title', {
          type: 'words',
          autoSplit: true,
          onSplit: (self) =>
            splitReveal(
              self.words,
              { opacity: 0, y: 20, filter: 'blur(8px)', duration: 0.85, stagger: 0.06 },
              headerTl,
              0.1
            ),
        });

        const stepsTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: '.ahiw-steps-grid', start: 'top 80%', once: true },
        });

        stepsTl
          .from('.ahiw-step', { opacity: 0, y: 34, duration: 0.75, stagger: 0.14 })
          .from(
            '.ahiw-icon-box',
            { scale: 0.72, rotation: -8, duration: 0.65, stagger: 0.14, ease: 'back.out(1.7)' },
            0.05
          )
          .from(
            '.ahiw-step-pill',
            { scale: 0.85, opacity: 0, duration: 0.5, stagger: 0.14 },
            0.18
          )
          .from('.ahiw-tag', { opacity: 0, y: 16, duration: 0.55, stagger: 0.08 }, 0.45);
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} className="ahiw-section" aria-labelledby="ahiw-heading">
      <div className="ahiw-container">
        <header className="ahiw-header">
          <span className="ahiw-eyebrow">
            <span className="ahiw-dot" aria-hidden="true" />
            HOW WE WORK
          </span>
          <h2 id="ahiw-heading" className="ahiw-title">
            Thoughtful Strategy Built for Measurable Brand Growth
          </h2>
        </header>

        <div className="ahiw-steps-wrap">
          <ol className="ahiw-steps-grid">
            {STEPS.map(({ step, title, copy, Icon, BadgeIcon }) => (
              <li key={step} className="ahiw-step">
                <div className="ahiw-icon-box" aria-hidden="true">
                  <Icon size={28} strokeWidth={1.75} />
                  <span className="ahiw-icon-accent">
                    <BadgeIcon size={11} strokeWidth={2.4} />
                  </span>
                </div>

                <div className="ahiw-pill-row">
                  <span className="ahiw-step-pill">{step}</span>
                </div>

                <h3 className="ahiw-step-title">{title}</h3>
                <p className="ahiw-step-copy">{copy}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="ahiw-tags" aria-label="Core capabilities">
          {TAGS.map((tag) => (
            <span key={tag} className="ahiw-tag">
              <span className="ahiw-dot" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutHowItWorks;
