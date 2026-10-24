import React, { useRef } from 'react';
import { ChartNoAxesColumnIncreasing, Lightbulb, UsersRound } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './AboutValues.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const values = [
  {
    number: '01',
    title: 'Understand first',
    copy: 'Listen closely. Ask better questions. Start with the business.',
    icon: UsersRound,
  },
  {
    number: '02',
    title: 'Create with purpose',
    copy: 'Give every message, visual and campaign a clear role.',
    icon: Lightbulb,
  },
  {
    number: '03',
    title: 'Keep improving',
    copy: 'Learn from the work and refine the next step.',
    icon: ChartNoAxesColumnIncreasing,
  },
];

export const AboutValues: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  // Numbers count up while each icon's strokes draw themselves.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.about-values-eyebrow, .about-values h2', {
        opacity: 0, y: 24, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.about-values-inner', start: 'top 80%', once: true },
      });

      gsap.utils.toArray<HTMLElement>('.about-value').forEach((card, i) => {
        const number = card.querySelector<HTMLElement>('.about-value-number');
        const strokes = card.querySelectorAll<SVGElement>('.about-value-icon :is(path, line, circle, rect, polyline)');
        const counter = { n: 0 };

        strokes.forEach((el) => el.setAttribute('pathLength', '1'));
        const tl = gsap.timeline({
          delay: i * 0.18,
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: '.about-values-grid', start: 'top 82%', once: true },
        });
        tl.from(card, { opacity: 0, y: 40, duration: 1 })
          .fromTo(strokes, { strokeDasharray: 1, strokeDashoffset: 1, opacity: 0 }, {
            strokeDashoffset: 0, opacity: 1, duration: 1.4, stagger: 0.08, ease: 'power2.inOut',
            clearProps: 'strokeDasharray,strokeDashoffset',
          }, 0.15)
          .from(card.querySelectorAll('h3, p'), { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, 0.4);
        if (number) {
          tl.to(counter, {
            n: i + 1, duration: 1, ease: 'power1.out',
            onUpdate: () => { number.textContent = String(Math.round(counter.n)).padStart(2, '0'); },
          }, 0);
        }
      });
    });
  }, { scope: root });

  return (
    <section ref={root} className="about-values" aria-labelledby="about-values-title">
      <div className="about-values-inner">
        <span className="about-values-eyebrow">OUR VALUES</span>
        <h2 id="about-values-title">The principles behind the work.</h2>

        <div className="about-values-grid">
          {values.map(({ number, title, copy, icon: Icon }) => (
            <article className="about-value cursor-target" data-cursor-label={title} key={number}>
              <span className="about-value-number">{number}</span>
              <div className="about-value-content">
                <Icon className="about-value-icon" size={48} strokeWidth={1.55} aria-hidden="true" />
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

export default AboutValues;
