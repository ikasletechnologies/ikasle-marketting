import React, { useRef, useState } from 'react';
import { Compass, Palette, Search, Share2, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { splitReveal } from '../../../lib/splitReveal';
import { useGSAP } from '@gsap/react';
import storyImage from '../../../assets/about-story-workspace.png';
import './AboutStory.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface Strength {
  label: string;
  detail: string;
  Icon: React.FC<{ size?: number; strokeWidth?: number }>;
}

const STRENGTHS: Strength[] = [
  {
    label: 'Strategy',
    detail: 'Research-first roadmaps built around real buyer intent and measurable ROI.',
    Icon: Compass,
  },
  {
    label: 'Social Media',
    detail: 'Scroll-stopping creative, reels, and community systems that spark engagement.',
    Icon: Share2,
  },
  {
    label: 'SEO',
    detail: 'Compounding technical, on-page, and local search visibility that drives leads.',
    Icon: Search,
  },
  {
    label: 'Branding',
    detail: 'Distinctive visual identity and messaging that earn instant audience trust.',
    Icon: Palette,
  },
];

export const AboutStory: React.FC = () => {
  const root = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Image unveils with a clip-path wipe, drifts in parallax, and tilts subtly toward the pointer.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.about-story-image-wrap', { clipPath: 'inset(0 100% 0 0 round 18px)' }, {
        clipPath: 'inset(0 0% 0 0 round 18px)', duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: '.about-story-inner', start: 'top 75%', once: true },
      });
      gsap.fromTo('.about-story-image', { scale: 1.24, yPercent: -5 }, {
        scale: 1.24, yPercent: 5, ease: 'none',
        scrollTrigger: { trigger: '.about-story-image-wrap', start: 'top bottom', end: 'bottom top', scrub: true },
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.about-story-copy', start: 'top 80%', once: true },
      });
      tl.from('.about-story-eyebrow', { opacity: 0, x: -24, duration: 0.8 });
      SplitText.create('.about-story-copy h2', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => splitReveal(self.lines, { yPercent: 110, duration: 1, stagger: 0.12, ease: 'expo.out' }, tl, 0.1),
      });
      tl.from('.about-story-copy p', { opacity: 0, y: 24, duration: 0.9, stagger: 0.15 }, 0.45)
        .from('.about-story-tags li', { opacity: 0, scale: 0.78, y: 14, duration: 0.65, stagger: 0.08, ease: 'back.out(1.9)' }, 0.75)
        .from('.about-story-float', { opacity: 0, y: 18, scale: 0.92, duration: 0.8, stagger: 0.14, ease: 'back.out(1.6)' }, 0.55);
    });

    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const stage = root.current?.querySelector<HTMLElement>('.about-story-stage');
      if (!stage) return undefined;

      const rx = gsap.quickTo(stage, 'rotationX', { duration: 0.55, ease: 'power3.out' });
      const ry = gsap.quickTo(stage, 'rotationY', { duration: 0.55, ease: 'power3.out' });
      gsap.set(stage, { transformPerspective: 1000 });

      const onMove = (e: PointerEvent) => {
        const r = stage.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 7);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 7);
      };
      const onLeave = () => { rx(0); ry(0); };

      stage.addEventListener('pointermove', onMove);
      stage.addEventListener('pointerleave', onLeave);
      return () => {
        stage.removeEventListener('pointermove', onMove);
        stage.removeEventListener('pointerleave', onLeave);
      };
    });
  }, { scope: root });

  const activeStrength = STRENGTHS[activeIndex];

  return (
    <section ref={root} className="about-story" aria-labelledby="about-story-title">
      <div className="about-story-inner">
        <div className="about-story-stage">
          <div className="about-story-dots" aria-hidden="true" />
          <figure className="about-story-image-wrap cursor-target" data-cursor-label="Our story">
            <img className="about-story-image" src={storyImage} alt="A brand strategist developing campaign ideas at a desk" />
          </figure>

          <div className="about-story-float about-story-float--top" aria-hidden="true">
            <span className="about-story-pulse" />
            <span>Creative Studio · Est. 2020</span>
          </div>

          <div className="about-story-float about-story-float--bottom" aria-hidden="true">
            <span className="about-story-float-icon">
              <Sparkles size={15} strokeWidth={2.2} />
            </span>
            <div>
              <strong>4 Core Disciplines</strong>
              <span>Strategy &rarr; Growth</span>
            </div>
          </div>
        </div>

        <div className="about-story-copy">
          <span className="about-story-eyebrow">
            <span className="about-story-eyebrow-line" aria-hidden="true" />
            OUR STORY
          </span>
          <h2 id="about-story-title">
            Built around your brand.
            <br />
            Focused on <span className="about-story-highlight">what comes next.</span>
          </h2>
          <p>IKASLÉ Marketing brings together digital strategy, social media, SEO and branding. We connect your business goals with clear ideas and thoughtful execution.</p>
          <p>From defining your message to shaping your campaigns, our approach starts with understanding your business.</p>

          <ul className="about-story-tags" aria-label="Our core strengths">
            {STRENGTHS.map(({ label, Icon }, idx) => {
              const isActive = idx === activeIndex;
              return (
                <li key={label}>
                  <button
                    type="button"
                    className={`about-story-tag-btn cursor-target${isActive ? ' is-active' : ''}`}
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    aria-pressed={isActive}
                  >
                    <Icon size={15} strokeWidth={2.1} />
                    <span>{label}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="about-story-insight" role="status" aria-live="polite">
            <span className="about-story-insight-dot" aria-hidden="true" />
            <span>{activeStrength.detail}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
