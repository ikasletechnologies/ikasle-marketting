import React, { useRef } from 'react';
import { Eye, Target } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { splitReveal } from '../../../lib/splitReveal';
import { useGSAP } from '@gsap/react';
import './AboutPurpose.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const pillars = [
  {
    title: 'Our Mission',
    copy: 'Help brands communicate clearly, connect with the right people and build a stronger digital presence.',
    icon: Target,
  },
  {
    title: 'Our Vision',
    copy: 'Make thoughtful strategy and purposeful creativity part of every brand’s growth journey.',
    icon: Eye,
  },
];

export const AboutPurpose: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  // Words blur into focus, cards rise, and each card tilts in 3D toward the pointer.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.about-purpose-inner', start: 'top 78%', once: true },
      });
      tl.from('.about-purpose-eyebrow', { opacity: 0, y: 12, duration: 0.7 });
      SplitText.create('.about-purpose h2', {
        type: 'words',
        autoSplit: true,
        onSplit: (self) => splitReveal(self.words, { opacity: 0, y: 18, filter: 'blur(10px)', duration: 0.9, stagger: 0.08 }, tl, 0.1),
      });
      tl.from('.about-purpose-card', { opacity: 0, y: 60, rotationX: -12, transformPerspective: 900, duration: 1.1, stagger: 0.18, ease: 'expo.out' }, 0.4)
        .from('.about-purpose-icon', { scale: 0, rotation: -120, duration: 0.9, stagger: 0.18, ease: 'back.out(1.8)' }, 0.7);
    });

    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const cleanups = gsap.utils.toArray<HTMLElement>('.about-purpose-card').map((card) => {
        const rx = gsap.quickTo(card, 'rotationX', { duration: 0.5, ease: 'power3.out' });
        const ry = gsap.quickTo(card, 'rotationY', { duration: 0.5, ease: 'power3.out' });
        gsap.set(card, { transformPerspective: 900 });

        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 8);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
        };
        const leave = () => { rx(0); ry(0); };
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerleave', leave);
        return () => {
          card.removeEventListener('pointermove', move);
          card.removeEventListener('pointerleave', leave);
        };
      });
      return () => cleanups.forEach((fn) => fn());
    });
  }, { scope: root });

  return (
    <section ref={root} className="about-purpose" aria-labelledby="about-purpose-title">
      <div className="about-purpose-inner">
        <span className="about-purpose-eyebrow">OUR PHILOSOPHY</span>
        <h2 id="about-purpose-title">Clear purpose. Creative direction.</h2>

        <div className="about-purpose-grid">
          {pillars.map(({ title, copy, icon: Icon }) => (
            <article className="about-purpose-card cursor-target" data-cursor-label={title} key={title}>
              <span className="about-purpose-icon" aria-hidden="true">
                <Icon size={29} strokeWidth={1.7} />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{copy}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutPurpose;
