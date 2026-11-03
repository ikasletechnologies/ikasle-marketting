import React, { useRef } from 'react';
import { Rocket } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { splitReveal } from '../../../lib/splitReveal';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';
import step1 from '../../../assets/journey-1.png';
import step2 from '../../../assets/journey-2.png';
import step3 from '../../../assets/journey-3.png';
import step4 from '../../../assets/journey-4.png';
import step5 from '../../../assets/journey-5.png';
import step6 from '../../../assets/journey-6.png';
import step7 from '../../../assets/journey-7.png';
import './JourneySection.css';

gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin, useGSAP);

interface JourneyStep {
  image: string;
  title: string;
  copy: string;
}

const STEPS: JourneyStep[] = [
  { image: step1, title: 'Understand Your Audience', copy: 'Know who they are, what they need, and what motivates them.' },
  { image: step2, title: 'Build Your Brand Presence', copy: 'Create a strong identity and show up where your audience is.' },
  { image: step3, title: 'Create Valuable Content', copy: 'Educate, entertain, and solve real problems with the right content.' },
  { image: step4, title: 'Attract & Engage Traffic', copy: 'Use the right channels — SEO, social media, email, and ads.' },
  { image: step5, title: 'Convert Leads to Customers', copy: 'Make it easy for people to take action and choose you.' },
  { image: step6, title: 'Keep Growing', copy: 'Analyze, optimize and improve with data and feedback.' },
  { image: step7, title: 'Achieve Long-Term Success', copy: 'Build a sustainable brand, more customers and bigger dreams.' },
];

const FLOW = ['Plan', 'Create', 'Engage', 'Grow', 'Succeed'];

export const JourneySection: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Section header.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.jr-header', start: 'top 85%', once: true },
      });
      SplitText.create('.jr-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => splitReveal(self.lines, { yPercent: 115, duration: 1.1, stagger: 0.14, ease: 'expo.out' }, tl),
      });
      tl.from('.jr-subtitle', { opacity: 0, y: 18, duration: 0.9 }, 0.4)
        .from('.jr-rule', { scaleX: 0, transformOrigin: '0% 50%', duration: 0.9, ease: 'expo.out' }, 0.7);
    });

    // Desktop staircase: a path links the numbered badges and draws itself as you scroll,
    // while a small light travels along it.
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 1101px)', () => {
      const wrap = root.current?.querySelector<HTMLElement>('.jr-steps');
      const svg = root.current?.querySelector<SVGSVGElement>('.jr-path');
      const path = root.current?.querySelector<SVGPathElement>('.jr-path-line');
      const trail = root.current?.querySelector<SVGPathElement>('.jr-path-base');
      if (!wrap || !svg || !path || !trail) return;

      const badges = Array.from(wrap.querySelectorAll<HTMLElement>('.jr-badge'));

      // Layout offsets ignore the transforms used by the entrance animation.
      const centreWithin = (el: HTMLElement) => {
        let x = 0;
        let y = 0;
        let node: HTMLElement | null = el;
        while (node && node !== wrap) {
          x += node.offsetLeft;
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement | null;
        }
        return [x + el.offsetWidth / 2, y + el.offsetHeight / 2];
      };

      const build = () => {
        svg.setAttribute('viewBox', `0 0 ${wrap.offsetWidth} ${wrap.offsetHeight}`);
        const pts = badges.map(centreWithin);
        let d = `M ${pts[0][0]} ${pts[0][1]}`;
        for (let i = 1; i < pts.length; i++) {
          const [x0, y0] = pts[i - 1];
          const [x1, y1] = pts[i];
          const dx = (x1 - x0) * 0.5;
          d += ` C ${x0 + dx} ${y0}, ${x1 - dx} ${y1}, ${x1} ${y1}`;
        }
        path.setAttribute('d', d);
        trail.setAttribute('d', d);
      };

      // Build before the entrance tweens move the cards.
      build();
      path.setAttribute('pathLength', '1');
      gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 });

      // The line draws as you scroll, and a small light rides its tip.
      const draw = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: wrap, start: 'top 70%', end: 'bottom 60%', scrub: 0.6 },
      });
      draw.to(path, { strokeDashoffset: 0, duration: 1 }, 0)
        .to('.jr-dot', { motionPath: { path: trail, align: trail, alignOrigin: [0.5, 0.5] }, duration: 1 }, 0);
      gsap.to('.jr-dot', { attr: { r: 9 }, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });

      const onResize = () => {
        build();
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    });

    // Each step rises into place; badges pop, illustrations settle.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('.jr-step').forEach((step, i) => {
        const q = gsap.utils.selector(step);
        gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: step, start: 'top 90%', once: true },
        })
          .from(step, { opacity: 0, y: 70, duration: 1, delay: (i % 3) * 0.08, ease: 'expo.out' })
          .from(q('.jr-art'), { scale: 0.6, rotation: -6, opacity: 0, duration: 1, ease: 'back.out(1.6)' }, 0.15)
          .from(q('.jr-badge'), { scale: 0, duration: 0.7, ease: 'back.out(2.6)' }, 0.3)
          .from(q('.jr-step-title, .jr-step-copy'), { opacity: 0, y: 14, duration: 0.7, stagger: 0.1 }, 0.4);
      });

      // Idle: each illustration moves in its own way.
      const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;
      gsap.to('.jr-step--1 .jr-art-float', { x: 5, rotation: 2, duration: 2.4, ...loop });
      gsap.to('.jr-step--2 .jr-art-float', { y: -6, duration: 2, ...loop });
      gsap.to('.jr-step--3 .jr-art-float', { y: -5, rotation: -1.5, duration: 2.6, ...loop });
      gsap.to('.jr-step--4 .jr-art-float', { scale: 1.06, transformOrigin: '20% 60%', duration: 1.2, ...loop });
      gsap.to('.jr-step--5 .jr-art-float', { y: -5, x: -3, duration: 2.2, ...loop });
      gsap.to('.jr-step--6 .jr-art-float', { scaleY: 1.05, transformOrigin: '50% 100%', duration: 1.6, ...loop });
      gsap.to('.jr-step--7 .jr-art-float', { y: -7, duration: 2.8, ...loop });

      // Little extras that sit on top of the illustrations.
      gsap.fromTo('.jr-wave', { scale: 0.4, opacity: 0.6 }, { scale: 1.8, opacity: 0, duration: 2, ease: 'power1.out', repeat: -1, stagger: 0.65 });
      gsap.fromTo('.jr-click', { scale: 0.3, opacity: 0.8 }, { scale: 1.6, opacity: 0, duration: 1.4, ease: 'power1.out', repeat: -1, repeatDelay: 0.8 });
      gsap.fromTo('.jr-twinkle', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(3)', repeat: -1, yoyo: true, repeatDelay: 0.6, stagger: { each: 0.5, from: 'random' } });

      // Closing panel: the rocket hovers while the flow words light up one by one.
      gsap.to('.jr-rocket', { y: -6, x: 4, rotation: 4, duration: 1.6, ...loop });
      const flow = gsap.timeline({ repeat: -1, repeatDelay: 0.6 });
      gsap.utils.toArray<HTMLElement>('.jr-flow-word').forEach((word, i) => {
        flow.to(word, { color: '#0e9a98', y: -3, duration: 0.3, ease: 'power2.out' }, i * 0.45)
          .to(word, { color: '#51657b', y: 0, duration: 0.3, ease: 'power2.in' }, i * 0.45 + 0.45);
      });

      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.jr-closing', start: 'top 90%', once: true },
      })
        .from('.jr-closing', { opacity: 0, y: 40, duration: 0.9, ease: 'expo.out' })
        .from('.jr-rocket', { x: -40, y: 40, opacity: 0, rotation: -20, duration: 1, ease: 'back.out(1.6)' }, 0.2)
        .from('.jr-closing h3 span', { opacity: 0, x: -20, duration: 0.7, stagger: 0.12 }, 0.35)
        .from('.jr-flow li', { opacity: 0, y: 12, duration: 0.5, stagger: 0.08 }, 0.6);
    });

    // Hover: the illustration leans toward the pointer.
    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const cleanups = gsap.utils.toArray<HTMLElement>('.jr-step').map((step) => {
        const art = step.querySelector<HTMLElement>('.jr-art');
        const badge = step.querySelector<HTMLElement>('.jr-badge');
        if (!art) return () => undefined;
        const rx = gsap.quickTo(art, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const ry = gsap.quickTo(art, 'rotationY', { duration: 0.6, ease: 'power3.out' });
        const sc = gsap.quickTo(art, 'scale', { duration: 0.6, ease: 'power3.out' });
        gsap.set(art, { transformPerspective: 700 });
        const move = (e: PointerEvent) => {
          const r = step.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 18);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 14);
        };
        const enter = () => { sc(1.08); gsap.to(badge, { scale: 1.15, duration: 0.4, ease: 'back.out(2.5)' }); };
        const leave = () => { rx(0); ry(0); sc(1); gsap.to(badge, { scale: 1, duration: 0.4, ease: 'power3.out' }); };
        step.addEventListener('pointermove', move);
        step.addEventListener('pointerenter', enter);
        step.addEventListener('pointerleave', leave);
        return () => {
          step.removeEventListener('pointermove', move);
          step.removeEventListener('pointerenter', enter);
          step.removeEventListener('pointerleave', leave);
        };
      });
      return () => cleanups.forEach((fn) => fn());
    });
  }, { scope: root });

  return (
    <section ref={root} className="journey" id="journey" aria-labelledby="journey-title">
      <div className="jr-inner">
        <header className="jr-header">
          <h2 id="journey-title" className="jr-title">
            <span>From Strategy to</span>
            <strong>Success</strong>
          </h2>
          <p className="jr-subtitle">
            The right marketing steps. The right growth.
            <br />
            Your success.
          </p>
          <span className="jr-rule" aria-hidden="true" />
        </header>

        <div className="jr-steps">
          <svg className="jr-path" aria-hidden="true" preserveAspectRatio="none">
            <defs>
              <linearGradient id="jrGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#1aa6b7" />
                <stop offset="1" stopColor="#0d6fa8" />
              </linearGradient>
            </defs>
            <path className="jr-path-base" fill="none" stroke="#cfe6ec" strokeWidth="3" strokeLinecap="round" />
            <path className="jr-path-line" fill="none" stroke="url(#jrGradient)" strokeWidth="4" strokeLinecap="round" />
            <circle className="jr-dot" r="6" fill="#35d7d0" stroke="#fff" strokeWidth="2" />
          </svg>

          <ol className="jr-list">
            {STEPS.map((step, index) => (
              <li className={`jr-step jr-step--${index + 1}`} key={step.title} style={{ '--i': index } as React.CSSProperties}>
                <div className="jr-art">
                  <div className="jr-art-float">
                    <img src={step.image} alt="" loading="lazy" />
                    {index === 3 && (
                      <>
                        <span className="jr-wave" aria-hidden="true" />
                        <span className="jr-wave" aria-hidden="true" />
                      </>
                    )}
                    {index === 4 && <span className="jr-click" aria-hidden="true" />}
                    {index === 6 && (
                      <>
                        <span className="jr-twinkle jr-twinkle--a" aria-hidden="true" />
                        <span className="jr-twinkle jr-twinkle--b" aria-hidden="true" />
                        <span className="jr-twinkle jr-twinkle--c" aria-hidden="true" />
                      </>
                    )}
                  </div>
                </div>
                <span className="jr-badge" aria-hidden="true">{index + 1}</span>
                <h3 className="jr-step-title">{step.title}</h3>
                <p className="jr-step-copy">{step.copy}</p>
              </li>
            ))}
          </ol>

          <div className="jr-closing">
            <Rocket className="jr-rocket" size={62} strokeWidth={1.4} aria-hidden="true" />
            <span className="jr-closing-divider" aria-hidden="true" />
            <div className="jr-closing-body">
              <h3>
                <span>Better Marketing.</span>
                <span>Bigger Growth.</span>
              </h3>
              <ul className="jr-flow" aria-label="Our approach">
                {FLOW.map((word, i) => (
                  <li key={word}>
                    <span className="jr-flow-word">{word}</span>
                    {i < FLOW.length - 1 && <span className="jr-flow-arrow" aria-hidden="true">→</span>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;
