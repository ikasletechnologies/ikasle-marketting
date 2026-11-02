import React, { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, ArrowUpRight, Heart, MessageCircle, Search } from 'lucide-react';
import targetIcon from '../../../assets/service-target.png';
import socialIcon from '../../../assets/service-social.png';
import seoIcon from '../../../assets/service-seo.png';
import brandIcon from '../../../assets/service-brand.png';
import './ServicesSection.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** How long each service stays on stage while auto-cycling. Mirrored by --hs-cycle in CSS. */
const CYCLE_MS = 6000;

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  linkText: string;
  stat: [string, string];
  /** [chip label, app section] — links straight to the sub-service pages. */
  chips: [string, string][];
}

const SERVICES: ServiceItem[] = [
  {
    id: 'digital-marketing',
    icon: targetIcon,
    title: 'Digital Marketing',
    description: 'Strategy, paid advertising, content and analytics working towards the same goals.',
    linkText: 'Explore Digital Marketing',
    stat: ['10', 'specialist services'],
    chips: [
      ['Strategy', 'Digital Marketing Strategy'],
      ['Google Ads', 'Google Search Ads'],
      ['Meta Ads', 'Meta Advertising'],
      ['Email', 'Email Marketing'],
      ['Landing Pages', 'Landing Pages & CRO'],
      ['Analytics', 'Analytics & Conversion Tracking'],
    ],
  },
  {
    id: 'social-media',
    icon: socialIcon,
    title: 'Social Media Marketing',
    description: 'Content, reels and communities built around your brand and your audience.',
    linkText: 'Explore Social Media',
    stat: ['10', 'social services'],
    chips: [
      ['Strategy', 'Social Media Strategy'],
      ['Management', 'Social Media Management'],
      ['Creative Posts', 'Creative Posts & Carousels'],
      ['Reels', 'Reels & Short-Form Video'],
      ['Community', 'Community Management'],
      ['Creators', 'Influencer & Creator Campaigns'],
    ],
  },
  {
    id: 'seo-search',
    icon: seoIcon,
    title: 'SEO & Search Growth',
    description: 'Technical, on-page and local SEO that helps the right people find you.',
    linkText: 'Explore SEO',
    stat: ['10', 'search services'],
    chips: [
      ['SEO Audit', 'SEO Audit & Strategy'],
      ['Keywords', 'Keyword & Search Intent Research'],
      ['Technical SEO', 'Technical SEO'],
      ['Local SEO', 'Local SEO'],
      ['Content Planning', 'SEO Content & Topic Planning'],
      ['E-Commerce', 'E-Commerce SEO'],
    ],
  },
  {
    id: 'brand-growth',
    icon: brandIcon,
    title: 'Brand Growth & Creative',
    description: 'Brand identity, creative campaigns and website experiences people remember.',
    linkText: 'Explore Branding',
    stat: ['10', 'brand services'],
    chips: [
      ['Brand Strategy', 'Brand Strategy & Positioning'],
      ['Visual Identity', 'Logo & Visual Identity'],
      ['Messaging', 'Brand Messaging & Voice'],
      ['Web Design', 'Website & Landing Page Design'],
      ['Campaigns', 'Creative Campaigns & Storytelling'],
      ['Brand Launch', 'Brand Launch & Refresh'],
    ],
  },
];

/* ------------------------------------------------------------------ Scenes */

const DigitalScene: React.FC = () => (
  <svg viewBox="0 0 320 220" className="hs-scene" aria-hidden="true">
    <defs>
      <linearGradient id="hs-d-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#35d7d0" stopOpacity=".35" /><stop offset="1" stopColor="#35d7d0" stopOpacity="0" /></linearGradient>
    </defs>
    {[40, 80, 120, 160].map((y) => <line key={y} x1="20" x2="300" y1={y} y2={y} stroke="#0781b1" strokeOpacity=".08" />)}
    {[[40, 150, 30], [76, 130, 50], [112, 110, 70], [148, 90, 90], [184, 70, 110]].map(([x, y, h], i) => (
      <rect key={i} className="hs-d-bar" x={x} y={y} width="22" height={h} rx="5" fill={i === 4 ? '#0aa5a3' : '#bfe3f0'} />
    ))}
    <path className="hs-d-area" d="M40 160 C80 150 110 120 150 110 S220 60 290 40 L290 180 L40 180Z" fill="url(#hs-d-area)" />
    <path className="hs-d-line" d="M40 160 C80 150 110 120 150 110 S220 60 290 40" pathLength={1} fill="none" stroke="#0781b1" strokeWidth="3.5" strokeLinecap="round" />
    <g className="hs-d-target" transform="translate(262 158)">
      <circle r="42" fill="#fff" stroke="#d6eaf2" strokeWidth="2" />
      <circle r="30" fill="#e6f4fa" /><circle r="19" fill="#0781b1" /><circle r="9" fill="#fff" /><circle r="4" fill="#0aa5a3" />
      <circle className="hs-d-ripple" r="42" fill="none" stroke="#0aa5a3" strokeWidth="2" />
    </g>
    {/* Rests in the bullseye; the loop flies it in from the left. */}
    <g className="hs-d-arrow" transform="translate(262 158)">
      <line x1="-46" y1="-46" x2="0" y2="0" stroke="#0b2b4c" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M-46 -46 l-10 2 l2 -10 Z M-40 -40 l-11 3 M-40 -40 l3 -11" stroke="#0aa5a3" strokeWidth="3" fill="#0aa5a3" strokeLinejoin="round" />
    </g>
  </svg>
);

const SocialScene: React.FC = () => (
  <div className="hs-scene hs-social" aria-hidden="true">
    <div className="hs-phone">
      <span className="hs-phone-notch" />
      <div className="hs-feed">
        {[0, 1, 2, 0, 1, 2].map((v, i) => (
          <div key={i} className="hs-post">
            <div className="hs-post-head"><i /><span /></div>
            <div className={`hs-post-img v${v}`} />
            <div className="hs-post-actions"><Heart /><MessageCircle /></div>
          </div>
        ))}
      </div>
    </div>
    {[0, 1, 2, 3, 4].map((i) => <span key={i} className="hs-heart" style={{ '--x': `${54 + i * 9}%` } as CSSProperties}><Heart /></span>)}
    <span className="hs-bubble b1"><i /><i /><i /></span>
    <span className="hs-bubble b2">New follower</span>
  </div>
);

const SeoScene: React.FC = () => (
  <div className="hs-scene hs-seo" aria-hidden="true">
    <div className="hs-search"><Search /><span className="hs-typed">marketing agency near me</span><i className="hs-caret" /></div>
    <ol className="hs-results">
      {['Competitor A', 'Your Business', 'Competitor B', 'Competitor C'].map((t, i) => (
        <li key={t} className={i === 1 ? 'hs-you' : ''}>
          <b className="hs-rank">{i + 1}</b>
          <span><strong>{t}</strong><em /><em /></span>
          {i === 1 && <ArrowUpRight className="hs-up" />}
        </li>
      ))}
    </ol>
  </div>
);

const BrandScene: React.FC = () => (
  <div className="hs-scene hs-brand" aria-hidden="true">
    <div className="hs-orbit">
      {['#0b2b4c', '#0781b1', '#0aa5a3', '#35d7d0', '#bfe9f2'].map((c, i) => (
        <span key={c} className="hs-swatch" style={{ background: c, '--a': `${i * 72}deg` } as CSSProperties} />
      ))}
    </div>
    <svg viewBox="0 0 100 100" className="hs-mark">
      <path className="hs-mark-a" d="M14 8 C40 22 44 78 14 92 Z" fill="#0b4f8a" />
      <path className="hs-mark-b" d="M40 50 C44 22 64 8 92 8 C88 36 70 50 40 50Z" fill="#0aa5a3" />
      <path className="hs-mark-c" d="M40 50 C70 50 88 64 92 92 C64 92 44 78 40 50Z" fill="#5fc9d6" />
    </svg>
    <span className="hs-type">Aa</span>
    <span className="hs-wordmark">IKASLĒ</span>
  </div>
);

const SCENES: Record<string, React.FC> = {
  'digital-marketing': DigitalScene,
  'social-media': SocialScene,
  'seo-search': SeoScene,
  'brand-growth': BrandScene,
};

/** Looping animation for the scene on stage. Runs inside a gsap.context, so it is reverted on change. */
const animateScene = (id: string) => {
  const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;
  if (id === 'digital-marketing') {
    gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
      .fromTo('.hs-d-bar', { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.6)' })
      .fromTo('.hs-d-line', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' }, 0.2)
      .fromTo('.hs-d-area', { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.9)
      .fromTo('.hs-d-arrow', { x: 132, y: 38, opacity: 0 }, { x: 262, y: 158, opacity: 1, duration: 0.55, ease: 'power3.in' }, 1)
      .fromTo('.hs-d-ripple', { scale: 1, opacity: 0.8, transformOrigin: '50% 50%' }, { scale: 1.6, opacity: 0, duration: 0.8, ease: 'power2.out' }, 1.55)
      .to('.hs-d-target', { x: '+=4', duration: 0.06, repeat: 3, yoyo: true }, 1.55)
      .to('.hs-d-bar, .hs-d-area, .hs-d-arrow', { opacity: 0, duration: 0.4 }, '+=2');
  } else if (id === 'social-media') {
    gsap.to('.hs-feed', { yPercent: -50, duration: 9, ease: 'none', repeat: -1 });
    gsap.utils.toArray<HTMLElement>('.hs-heart').forEach((h, i) => {
      gsap.fromTo(h, { y: 0, opacity: 0, scale: 0.6 }, { y: -150, opacity: 1, scale: 1.1, duration: 2.6, delay: i * 0.5, repeat: -1, ease: 'power1.out', keyframes: { opacity: [0, 1, 1, 0] } });
    });
    gsap.to('.hs-bubble.b1 i', { y: -4, duration: 0.35, stagger: 0.12, ...loop });
    gsap.fromTo('.hs-bubble', { scale: 0.85 }, { scale: 1, duration: 1.4, stagger: 0.7, ...loop });
  } else if (id === 'seo-search') {
    gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
      .fromTo('.hs-typed', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'steps(24)' })
      .fromTo('.hs-results li', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'power2.out' })
      // "Your Business" climbs from #2 to #1.
      .to('.hs-you', { y: '-100%', duration: 0.7, ease: 'back.inOut(1.4)' }, '+=0.4')
      .to('.hs-results li:first-child', { y: '100%', duration: 0.7, ease: 'back.inOut(1.4)' }, '<')
      .to('.hs-you .hs-rank', { textContent: 1, duration: 0.1, snap: { textContent: 1 } }, '<0.35')
      .to('.hs-results li:first-child .hs-rank', { textContent: 2, duration: 0.1, snap: { textContent: 1 } }, '<')
      .fromTo('.hs-up', { scale: 0, rotation: -45 }, { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(3)' })
      .to('.hs-results li, .hs-typed', { opacity: 0, duration: 0.4 }, '+=2')
      .set('.hs-you, .hs-results li:first-child', { y: 0 })
      .set('.hs-you .hs-rank', { textContent: 2 })
      .set('.hs-results li:first-child .hs-rank', { textContent: 1 })
      .set('.hs-typed', { opacity: 1 });
    gsap.to('.hs-caret', { opacity: 0, duration: 0.45, repeat: -1, yoyo: true, ease: 'steps(1)' });
  } else {
    gsap.to('.hs-orbit', { rotation: 360, duration: 14, ease: 'none', repeat: -1 });
    gsap.to('.hs-swatch', { rotation: -360, duration: 14, ease: 'none', repeat: -1 });
    gsap.timeline({ repeat: -1, repeatDelay: 2.2 })
      .fromTo('.hs-mark-a', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
      .fromTo('.hs-mark-b', { scale: 0, rotation: -70, svgOrigin: '40 50' }, { scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.35')
      .fromTo('.hs-mark-c', { scale: 0, rotation: 70, svgOrigin: '40 50' }, { scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.5')
      .fromTo('.hs-wordmark', { letterSpacing: '0.9em', opacity: 0 }, { letterSpacing: '0.28em', opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.3')
      .to('.hs-mark path, .hs-wordmark', { opacity: 0, duration: 0.4 }, '+=2.4');
    gsap.to('.hs-type', { y: -8, rotation: -4, duration: 2, ...loop });
  }
};

/* ----------------------------------------------------------------- Section */

export interface ServicesSectionProps {
  onServiceClick?: (serviceId: string) => void;
  onViewAllClick?: () => void;
  /** Opens an app section by name; used by the sub-service chips. */
  onNavigate?: (section: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onServiceClick, onViewAllClick, onNavigate }) => {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const service = SERVICES[active];
  const Scene = SCENES[service.id];

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Only cycle while the section is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cycling = inView && !paused && !reduced;
  useEffect(() => {
    if (!cycling) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % SERVICES.length), CYCLE_MS);
    return () => window.clearTimeout(t);
  }, [cycling, active]);

  // Section entrance + scroll reveals.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // Played by an IntersectionObserver rather than a ScrollTrigger: the hero above changes
      // height after load, which can leave a ScrollTrigger start stale and the section hidden.
      const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } });
      // fromTo with explicit end values: a from() would read the element's current state,
      // which can be mid-reset when React mounts twice in development.
      tl.fromTo('.hs-overline', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo('.hs-title-line > span', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.12 }, 0.1)
        .fromTo('.hs-subtitle', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.35)
        .fromTo('.hs-tab', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.9, stagger: 0.1, clearProps: 'transform' }, 0.4)
        .fromTo('.hs-stage', { y: 50, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 1.2 }, 0.45)
        .fromTo('.hs-footer > *', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.9);
      const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { tl.play(); io.disconnect(); } }, { threshold: 0.15 });
      if (root.current) io.observe(root.current);
      gsap.to('.hs-glow', { xPercent: 12, yPercent: -10, scale: 1.15, duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      return () => io.disconnect();
    });
  }, { scope: root });

  // Stage content swap + the active scene's loops. Reverted whenever the service changes.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .fromTo('.hs-scene-wrap', { opacity: 0, y: 30, scale: 0.94, rotateX: 12 }, { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 0.9 })
        .fromTo('.hs-stage-copy > *', { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.07 }, 0.1)
        .fromTo('.hs-chip', { y: 14, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.05, ease: 'back.out(2)' }, 0.3)
        .fromTo('.hs-stat b', { textContent: 0 }, { textContent: Number(service.stat[0]), duration: 1, snap: { textContent: 1 }, ease: 'power2.out' }, 0.25);
      animateScene(service.id);
    });
  }, { scope: stage, dependencies: [active], revertOnUpdate: true });

  // Pointer tilt on the stage (desktop only).
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
      const el = stage.current;
      if (!el) return;
      gsap.set(el, { transformPerspective: 1200 });
      const rx = gsap.quickTo(el, 'rotationX', { duration: 0.8, ease: 'power3.out' });
      const ry = gsap.quickTo(el, 'rotationY', { duration: 0.8, ease: 'power3.out' });
      const glowX = gsap.quickTo(el, '--mx', { duration: 0.4 });
      const glowY = gsap.quickTo(el, '--my', { duration: 0.4 });
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width, ny = (e.clientY - r.top) / r.height;
        ry((nx - 0.5) * 6); rx(-(ny - 0.5) * 5); glowX(nx * 100); glowY(ny * 100);
      };
      const leave = () => { rx(0); ry(0); };
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
    });
  }, { scope: root });

  return (
    <section ref={root} className={`services-section hs-${service.id}`} id="services">

      <div className="services-container">
        <header className="hs-header">
          <span className="hs-overline">WHAT WE DO</span>
          <h2 className="hs-title">
            <span className="hs-title-line"><span>The right strategy.</span></span>
            <span className="hs-title-line"><span>The right kind of <em>growth.</em></span></span>
          </h2>
          <p className="hs-subtitle">From the first impression to the next conversion, we bring your marketing together.</p>
        </header>

        <div className="hs-body" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
          <div className="hs-tabs" role="tablist" aria-label="Our services">
            {SERVICES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                role="tab"
                id={`hs-tab-${s.id}`}
                aria-selected={i === active}
                aria-controls="hs-stage"
                className={`hs-tab${i === active ? ' is-active' : ''}`}
                onClick={() => (i === active ? onServiceClick?.(s.id) : setActive(i))}
                onMouseEnter={() => setActive(i)}
              >
                <span className="hs-tab-num">0{i + 1}</span>
                <span className="hs-tab-icon"><img src={s.icon} alt="" loading="lazy" /></span>
                <span className="hs-tab-text"><b>{s.title}</b><small>{s.description}</small></span>
                <ArrowRight className="hs-tab-arrow" />
                <i className={`hs-progress${i === active && cycling ? ' is-running' : ''}`} key={i === active ? `p${active}` : 'idle'} />
              </button>
            ))}
          </div>

          <div ref={stage} id="hs-stage" className="hs-stage" role="tabpanel" aria-labelledby={`hs-tab-${service.id}`} aria-live="polite">
            <span className="hs-glow" aria-hidden="true" />
            <span className="hs-spot" aria-hidden="true" />
            <div className="hs-scene-wrap"><Scene /></div>
            <div className="hs-stage-copy">
              <span className="hs-stage-kicker">0{active + 1} / 0{SERVICES.length}</span>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="hs-chips">
                {service.chips.map(([label, section]) => (
                  <button key={section} type="button" className="hs-chip" onClick={() => onNavigate?.(section)}>{label}<ArrowUpRight /></button>
                ))}
              </div>
              <div className="hs-stage-foot">
                <button type="button" className="hs-explore" onClick={() => onServiceClick?.(service.id)}>
                  <span>{service.linkText}</span><ArrowRight />
                </button>
                <span className="hs-stat"><b>{service.stat[0]}</b>{service.stat[1]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hs-footer">
          <div className="hs-dots" aria-hidden="true">{SERVICES.map((s, i) => <i key={s.id} className={i === active ? 'on' : ''} />)}</div>
          <button type="button" className="view-all-services-btn" onClick={onViewAllClick}>
            <span>View All Services</span><ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
