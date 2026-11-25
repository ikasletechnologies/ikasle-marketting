import React, { useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { CORE_SERVICES } from '../services/coreServices';
import './CoreServicesShowcase.css';

gsap.registerPlugin(useGSAP);

export interface CoreServicesShowcaseProps {
  onServiceClick?: (serviceId: string) => void;
  onViewAllClick?: () => void;
}

/**
 * Home page take on the four main services from the Services listing:
 * dark expanding panels, where the hovered (or focused) panel opens to show its focus areas.
 */
export const CoreServicesShowcase: React.FC<CoreServicesShowcaseProps> = ({ onServiceClick, onViewAllClick }) => {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const firstRun = useRef(true);

  // Entrance, played once the section scrolls into view, plus the idle loops.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // IntersectionObserver rather than ScrollTrigger: sections above change height after load,
      // which can leave a ScrollTrigger start stale (same approach as ServicesSection).
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
      tl.fromTo('.hcs-eyebrow', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 })
        .fromTo('.hcs-title-line > span', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.1)
        .fromTo('.hcs-head-side > *', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.1 }, 0.35)
        .fromTo('.hcs-panel',
          { y: 90, opacity: 0, clipPath: 'inset(35% 0% 0% 0% round 24px)' },
          { y: 0, opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 24px)', duration: 1.3, stagger: 0.12, clearProps: 'clipPath,transform' }, 0.45)
        .fromTo('.hcs-num', { x: -16, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, stagger: 0.12 }, 0.8)
        .fromTo('.hcs-orb-pop', { scale: 0, rotation: -40 }, { scale: 1, rotation: 0, duration: 1.1, stagger: 0.12, ease: 'back.out(1.6)' }, 0.75)
        .fromTo('.hcs-watermark', { yPercent: 40, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.12 }, 0.9)
        .fromTo('.hcs-panel.is-active .hcs-feature', { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }, 1.2);

      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { tl.play(); io.disconnect(); } }, { threshold: 0.15 });
      if (root.current) io.observe(root.current);

      // Each illustration floats on its own rhythm.
      gsap.utils.toArray<HTMLElement>('.hcs-orb-float').forEach((el, i) => {
        gsap.to(el, { y: -12, rotation: i % 2 ? 3 : -3, duration: 2.2 + i * 0.35, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 0.3 });
      });

      return () => io.disconnect();
    });
  }, { scope: root });

  // When a different panel opens, its contents build in.
  useGSAP(() => {
    if (firstRun.current) { firstRun.current = false; return; }
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference) and (min-width: 961px)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.hcs-panel.is-active .hcs-desc', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.15 })
        .fromTo('.hcs-panel.is-active .hcs-feature', { x: -18, opacity: 0 }, { x: 0, opacity: 1, duration: 0.55, stagger: 0.07 }, 0.25)
        .fromTo('.hcs-panel.is-active .hcs-feature-icon svg', { rotation: -120, scale: 0.4 }, { rotation: 0, scale: 1, duration: 0.6, stagger: 0.07, ease: 'back.out(2.2)' }, 0.3)
        .fromTo('.hcs-panel.is-active .hcs-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0.5);
    });
  }, { scope: root, dependencies: [active] });

  // Soft spotlight that follows the pointer inside a panel.
  const trackPointer = (event: React.PointerEvent<HTMLElement>) => {
    const el = event.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${event.clientX - r.left}px`);
    el.style.setProperty('--my', `${event.clientY - r.top}px`);
  };

  return (
    <section ref={root} className="hcs" id="core-services" aria-labelledby="hcs-title">
      <div className="hcs-bg" aria-hidden="true">
        <span className="hcs-blob hcs-blob--a" />
        <span className="hcs-blob hcs-blob--b" />
        <span className="hcs-grid" />
      </div>

      <div className="hcs-inner">
        <header className="hcs-head">
          <div>
            <span className="hcs-eyebrow">OUR CORE SERVICES</span>
            <h2 id="hcs-title" className="hcs-title">
              <span className="hcs-title-line"><span>Four core services.</span></span>
              <span className="hcs-title-line"><span>One <em>growth partner.</em></span></span>
            </h2>
          </div>
          <div className="hcs-head-side">
            <p className="hcs-lead">Explore our core services and see how each can support your next step.</p>
            <button type="button" className="hcs-viewall" onClick={onViewAllClick}>
              <span>View All Services</span>
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="hcs-panels">
          {CORE_SERVICES.map((service, i) => {
            const isActive = i === active;
            return (
              <article
                key={service.id}
                className={`hcs-panel hcs-panel--${service.kind}${isActive ? ' is-active' : ''}`}
                onPointerEnter={() => setActive(i)}
                onPointerMove={trackPointer}
                onFocus={() => setActive(i)}
                onClick={() => onServiceClick?.(service.id)}
              >
                <span className="hcs-watermark" aria-hidden="true">{service.number}</span>
                <span className="hcs-bar" aria-hidden="true" />

                <div className="hcs-panel-top">
                  <span className="hcs-num">{service.number}</span>
                  <span className="hcs-go" aria-hidden="true"><ArrowUpRight size={18} strokeWidth={2} /></span>
                </div>

                <div className="hcs-orb" aria-hidden="true">
                  <div className="hcs-orb-pop">
                    <span className="hcs-orb-ring" />
                    <div className="hcs-orb-float">
                      <img src={service.art} alt="" loading="lazy" />
                    </div>
                  </div>
                </div>

                <div className="hcs-body">
                  <h3 className="hcs-panel-title">{service.title}</h3>
                  <span className="hcs-peek" aria-hidden="true">{service.features.length} focus areas</span>
                  <div className="hcs-details">
                    <div className="hcs-details-clip">
                      <div className="hcs-details-content">
                        <p className="hcs-desc">{service.description}</p>
                        <ul className="hcs-features" aria-label={`${service.title} includes`}>
                          {service.features.map(({ label, icon: Icon }) => (
                            <li className="hcs-feature" key={label}>
                              <span className="hcs-feature-icon" aria-hidden="true"><Icon size={16} strokeWidth={1.9} /></span>
                              <span>{label}</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          type="button"
                          className="hcs-cta"
                          onClick={(event) => { event.stopPropagation(); onServiceClick?.(service.id); }}
                        >
                          <span>{service.linkText}</span>
                          <ArrowRight size={17} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreServicesShowcase;
