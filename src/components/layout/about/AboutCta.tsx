import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import ctaBackground from '../../../assets/about-cta-blue-flow.png';
import './AboutCta.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export interface AboutCtaProps {
  onCtaClick?: () => void;
}

export const AboutCta: React.FC<AboutCtaProps> = ({ onCtaClick }) => {
  const root = useRef<HTMLElement>(null);

  // Tracking-in eyebrow, word-by-word headline, a drifting background, and a magnetic button.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
      });
      tl.from('.about-cta-eyebrow', { opacity: 0, letterSpacing: '0.6em', duration: 1.2 });
      SplitText.create('.about-cta h2', {
        type: 'words',
        mask: 'words',
        autoSplit: true,
        onSplit: (self) => tl.from(self.words, { yPercent: 110, rotation: 4, duration: 1, stagger: 0.07, ease: 'expo.out' }, 0.1),
      });
      tl.from('.about-cta-button', { opacity: 0, scale: 0.85, duration: 0.9, ease: 'back.out(1.8)' }, 0.6);
    });

    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 761px)', () => {
      gsap.fromTo(root.current, { backgroundPosition: '25% 50%' }, {
        backgroundPosition: '75% 50%', ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const button = root.current?.querySelector<HTMLElement>('.about-cta-button');
      if (!button) return;
      const label = button.querySelector<HTMLElement>('span');
      const arrow = button.querySelector<SVGElement>('svg');

      const bx = gsap.quickTo(button, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      const by = gsap.quickTo(button, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      const lx = gsap.quickTo(label, 'x', { duration: 0.5, ease: 'power3.out' });
      const move = (e: PointerEvent) => {
        const r = button.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        bx(dx * 0.25); by(dy * 0.35); lx(dx * 0.08);
      };
      const enter = () => gsap.to(arrow, { x: 6, duration: 0.4, ease: 'power3.out' });
      const leave = () => { bx(0); by(0); lx(0); gsap.to(arrow, { x: 0, duration: 0.5, ease: 'power3.out' }); };
      button.addEventListener('pointerenter', enter);
      button.addEventListener('pointermove', move);
      button.addEventListener('pointerleave', leave);
      return () => {
        button.removeEventListener('pointerenter', enter);
        button.removeEventListener('pointermove', move);
        button.removeEventListener('pointerleave', leave);
      };
    });
  }, { scope: root });

  return (
    <section
      ref={root}
      className="about-cta"
      aria-labelledby="about-cta-title"
      style={{ backgroundImage: `url(${ctaBackground})` }}
    >
      <div className="about-cta-inner">
        <div className="about-cta-copy">
          <span className="about-cta-eyebrow">LET’S TALK</span>
          <h2 id="about-cta-title">Let’s shape your next chapter.</h2>
        </div>

        <button className="about-cta-button cursor-target" data-cursor-label="Contact" type="button" onClick={onCtaClick}>
          <span>Start a Conversation</span>
          <ArrowRight size={20} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default AboutCta;
