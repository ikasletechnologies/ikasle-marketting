import React, { useRef } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './ServicesCta.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface ServicesCtaProps {
  tone?: 'teal' | 'blue';
  variant?: 'bubbles' | 'outline';
  buttonLabel?: string;
  title?: string;
  subtitle?: string;
  onCtaClick?: () => void;
}

export const ServicesCta: React.FC<ServicesCtaProps> = ({
  tone = 'teal',
  variant = 'bubbles',
  buttonLabel = 'Book a Strategy Call',
  title = 'Not sure where to start?',
  subtitle = 'Tell us about your goals. We’ll help you choose a suitable approach.',
  onCtaClick,
}) => {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Entrance: banner rises, bubbles pop in one after the other, copy follows.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: root.current, start: 'top 88%', once: true },
      });
      tl.from('.services-cta-card', { opacity: 0, y: 40, duration: 0.9, ease: 'expo.out' })
        .from('.cta-bubble--back', { scale: 0, rotation: -25, transformOrigin: '50% 80%', duration: 0.9, ease: 'back.out(2)' }, 0.25)
        .from('.cta-bubble--front', { scale: 0, rotation: 25, transformOrigin: '50% 80%', duration: 0.9, ease: 'back.out(2)' }, 0.4)
        .from('.services-cta-divider', { scaleY: 0, duration: 0.7 }, 0.45)
        .from('.services-cta-copy h2, .services-cta-copy p', { opacity: 0, x: -22, duration: 0.8, stagger: 0.12 }, 0.55)
        .from('.services-cta-button', { opacity: 0, scale: 0.8, duration: 0.8, ease: 'back.out(1.8)' }, 0.8);
    });

    // Idle: the two bubbles bob in opposite directions, like a conversation.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;
      gsap.to('.cta-bubble--back', { y: -5, rotation: -4, transformOrigin: '50% 85%', duration: 2.1, ...loop });
      gsap.to('.cta-bubble--front', { y: 5, rotation: 4, transformOrigin: '50% 85%', duration: 2.6, ...loop });
      gsap.fromTo('.cta-dot', { opacity: 0.25, y: 0 }, { opacity: 1, y: -2.5, duration: 0.45, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: 0.9, stagger: 0.15 });
    });

    // Hover: the button leans toward the pointer and its arrow slides.
    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const button = root.current?.querySelector<HTMLElement>('.services-cta-button');
      if (!button) return;
      const arrow = button.querySelector('svg');
      const bx = gsap.quickTo(button, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      const by = gsap.quickTo(button, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.5)' });
      const move = (e: PointerEvent) => {
        const r = button.getBoundingClientRect();
        bx((e.clientX - (r.left + r.width / 2)) * 0.22);
        by((e.clientY - (r.top + r.height / 2)) * 0.3);
      };
      const enter = () => gsap.to(arrow, { x: 6, duration: 0.4, ease: 'power3.out' });
      const leave = () => { bx(0); by(0); gsap.to(arrow, { x: 0, duration: 0.5, ease: 'power3.out' }); };
      button.addEventListener('pointermove', move);
      button.addEventListener('pointerenter', enter);
      button.addEventListener('pointerleave', leave);
      return () => {
        button.removeEventListener('pointermove', move);
        button.removeEventListener('pointerenter', enter);
        button.removeEventListener('pointerleave', leave);
      };
    });
  }, { scope: root });

  return (
    <section ref={root} className="services-cta" aria-labelledby="services-cta-title">
      <div className="services-cta-card">
        {variant === 'outline' ? (
          <>
            <MessageCircle className="services-cta-icon services-cta-icon--outline cta-bubble cta-bubble--back" strokeWidth={1.8} aria-hidden="true" />
            <span hidden className="cta-bubble--front cta-dot" />
          </>
        ) : (
        <svg className={`services-cta-icon services-cta-icon--${tone}`} viewBox="0 0 112 96" aria-hidden="true">
          <defs>
            <linearGradient id="ctaTeal" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0" stopColor="#4fe0cf" />
              <stop offset="0.55" stopColor="#14b3a6" />
              <stop offset="1" stopColor="#0b8f8a" />
            </linearGradient>
            <linearGradient id="ctaBlue" x1="0.1" y1="0" x2="0.9" y2="1">
              <stop offset="0" stopColor="#9ad6f7" />
              <stop offset="0.5" stopColor="#3f95dd" />
              <stop offset="1" stopColor="#1b62b8" />
            </linearGradient>
            <radialGradient id="ctaShine" cx="0.3" cy="0.22" r="0.55">
              <stop offset="0" stopColor="#fff" stopOpacity="0.75" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <filter id="ctaShadow" x="-20%" y="-20%" width="150%" height="160%">
              <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#1b62b8" floodOpacity="0.22" />
            </filter>
          </defs>

          <g className="cta-bubble cta-bubble--back" filter="url(#ctaShadow)">
            <circle cx="40" cy="38" r="31" fill="url(#ctaTeal)" />
            <path d="M18 56 L10 80 L36 66 Z" fill="url(#ctaTeal)" />
            <circle cx="40" cy="38" r="31" fill="url(#ctaShine)" />
          </g>

          <g className="cta-bubble cta-bubble--front" filter="url(#ctaShadow)">
            <circle cx="70" cy="54" r="29" fill="url(#ctaBlue)" />
            <path d="M80 76 L90 92 L68 82 Z" fill="url(#ctaBlue)" />
            <circle cx="70" cy="54" r="29" fill="url(#ctaShine)" />
            <circle className="cta-dot" cx="60" cy="54" r="2.6" fill="#fff" />
            <circle className="cta-dot" cx="70" cy="54" r="2.6" fill="#fff" />
            <circle className="cta-dot" cx="80" cy="54" r="2.6" fill="#fff" />
          </g>
        </svg>
        )}

        <span className="services-cta-divider" aria-hidden="true" />

        <div className="services-cta-copy">
          <h2 id="services-cta-title">{title}</h2>
          <p>{subtitle}</p>
        </div>

        <button type="button" className="services-cta-button" onClick={onCtaClick}>
          <span>{buttonLabel}</span>
          <ArrowRight size={19} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default ServicesCta;
