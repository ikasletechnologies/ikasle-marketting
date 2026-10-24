import React, { useRef } from 'react';
import { ClipboardList, Pencil, Search, Settings } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './AboutProcess.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const steps = [
  { title: 'Discover', copy: 'Understand your goals', icon: Search },
  { title: 'Plan', copy: 'Build the direction', icon: ClipboardList },
  { title: 'Create', copy: 'Bring ideas to life', icon: Pencil },
  { title: 'Refine', copy: 'Review and improve', icon: Settings },
];

export const AboutProcess: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  // Scroll-scrubbed timeline: the connector line draws and lights each step as it passes.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const items = gsap.utils.toArray<HTMLElement>('.about-process-step');
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: '.about-process-steps', start: 'top 80%', end: 'bottom 55%', scrub: 0.6 },
      });

      tl.fromTo('.about-process-steps', { '--line': 0 }, { '--line': 1, duration: items.length - 1 }, 0);
      items.forEach((step, i) => {
        const icon = step.querySelector('.about-process-icon');
        tl.from(step, { opacity: 0.25, y: 24, duration: 0.6, ease: 'power2.out' }, i)
          .fromTo(icon, { scale: 0.7, backgroundColor: '#f9fdfd', color: '#0781b1' }, {
            scale: 1, backgroundColor: '#0781b1', color: '#ffffff', duration: 0.6, ease: 'back.out(2)',
          }, i);
      });
    });
  }, { scope: root });

  return (
    <section ref={root} className="about-process" aria-labelledby="about-process-title">
      <div className="about-process-inner">
        <span className="about-process-eyebrow">OUR PROCESS</span>
        <h2 id="about-process-title">A connected way of working.</h2>

        <ol className="about-process-steps">
          {steps.map(({ title, copy, icon: Icon }) => (
            <li className="about-process-step cursor-target" data-cursor-label={`Step ${steps.findIndex((s) => s.title === title) + 1}`} key={title}>
              <span className="about-process-icon" aria-hidden="true">
                <Icon size={34} strokeWidth={1.6} />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default AboutProcess;
