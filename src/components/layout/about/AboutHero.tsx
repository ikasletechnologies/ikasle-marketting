import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import { splitReveal } from '../../../lib/splitReveal';
import { useGSAP } from '@gsap/react';
import aboutHeroImage from '../../../assets/about-hero-team.png';
import './AboutHero.css';

gsap.registerPlugin(SplitText, useGSAP);

export interface AboutHeroProps {
  onHomeClick?: () => void;
}

export const AboutHero: React.FC<AboutHeroProps> = ({ onHomeClick }) => {
  const root = useRef<HTMLElement>(null);

  // Masked line reveal on the headline + a curtain wipe on the visual.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo('.about-hero-visual', { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1.4 }, 0)
        .from('.about-hero-visual img', { scale: 1.25, duration: 2, ease: 'power3.out' }, 0)
        .from('.about-hero-overline', { opacity: 0, y: 14, letterSpacing: '0.45em', duration: 1 }, 0.25)
        .from('.about-hero-content > p, .about-breadcrumb', { opacity: 0, y: 22, duration: 1, stagger: 0.12 }, 0.85);

      SplitText.create('.about-hero-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => splitReveal(self.lines, { yPercent: 115, duration: 1.2, stagger: 0.14 }, tl, 0.4),
      });
    });
  }, { scope: root });

  return (
    <section ref={root} className="about-page-hero" aria-labelledby="about-hero-title">
      <div className="about-hero-visual" aria-hidden="true">
        <img src={aboutHeroImage} alt="" />
      </div>

      <div className="about-hero-content">
        <span className="about-hero-overline">ABOUT US</span>
        <h1 id="about-hero-title" className="about-hero-title">
          <span>The thinking behind</span>
          <strong>your next chapter.</strong>
        </h1>
        <p>
          Meet the strategy and creativity behind
          <span> IKASLĒ Marketing.</span>
        </p>

        <nav className="about-breadcrumb" aria-label="Breadcrumb">
          <button type="button" className="cursor-target" data-cursor-label="Back" onClick={onHomeClick}>Home</button>
          <span aria-hidden="true">/</span>
          <span aria-current="page">About</span>
        </nav>
      </div>
    </section>
  );
};

export default AboutHero;
