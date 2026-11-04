import React, { useId, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  ArrowRight, BarChart3, CalendarDays, Check, GalleryHorizontal, ImageIcon,
  LayoutGrid, Lightbulb, Megaphone, Minus, PenLine, Plus, Target, UsersRound,
} from 'lucide-react';
import './CreativePostsPage.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type CreativeRelatedTarget = 'planning' | 'management' | 'meta';

interface Props {
  onHomeClick?: () => void;
  onServicesClick?: () => void;
  onSocialClick?: () => void;
  onContactClick?: () => void;
  onRelatedClick?: (target: CreativeRelatedTarget) => void;
}

const helps = ['Explaining an offering visually', 'Building a consistent social look', 'Turning complex ideas into simple slides'];

const scope = [
  [Lightbulb, 'Creative Direction & Concepts', 'Define the idea, message and visual approach.'],
  [ImageIcon, 'Static Social Posts', 'Create focused designs for agreed platforms.'],
  [GalleryHorizontal, 'Carousel Storytelling', 'Structure multi-slide content with a clear flow.'],
  [Megaphone, 'Promotional & Campaign Creatives', 'Adapt your offer into coherent campaign visuals.'],
  [LayoutGrid, 'Branded Templates & Adaptations', 'Build reusable layouts and agreed format variations.'],
  [PenLine, 'Copy Alignment & Design Review', 'Refine hierarchy, captions and brand consistency.'],
] as const;

const deliverables = [
  'Agreed creative concepts and direction',
  'Static post designs',
  'Carousel slide sets',
  'Platform-ready exported files',
  'Agreed design revisions',
  'Template or source files where included',
];

const steps = [
  ['Brief', 'We understand your goals, audience and content needs.'],
  ['Concept', 'We explore ideas and visual directions for your feedback.'],
  ['Design', 'We create your posts or carousel designs.'],
  ['Refine', 'We incorporate feedback and finalise your visuals.'],
] as const;

const faqs = [
  ['Can you follow our existing brand guidelines?', 'Yes. We work with your brand assets and agreed guidelines to keep the creative consistent.'],
  ['Are captions and copy included?', 'Copy alignment is part of every design. Full caption writing and copywriting can be included when agreed in scope.'],
  ['Will we receive editable files?', 'You receive platform-ready exports as standard. Templates or editable source files are provided where included in the agreed scope.'],
] as const;

const related = [
  [CalendarDays, 'Content Planning & Calendars', 'Turn your ideas into a clear content plan.', 'planning'],
  [UsersRound, 'Social Media Management', 'Keep your channels active and on brand.', 'management'],
  [BarChart3, 'Meta Advertising', 'Turn your creative into measurable results.', 'meta'],
] as const;

/* ---------------------------------------------------------------- Artwork */

const LEAVES_L: [number, number, number, number][] = [
  [92, 112, -35, 1], [84, 96, -55, 0.9], [78, 80, -30, 1], [70, 66, -60, 0.85], [66, 50, -20, 0.8],
  [98, 100, 20, 0.75], [88, 74, 25, 0.7], [76, 56, 15, 0.7],
];
const LEAVES_R: [number, number, number, number][] = [
  [108, 108, 35, 1], [116, 92, 60, 0.9], [124, 76, 30, 1], [132, 60, 62, 0.85], [138, 44, 25, 0.8],
  [104, 92, -20, 0.75], [118, 68, -25, 0.7], [130, 50, -15, 0.7],
];

const Leaves: React.FC<{ list: typeof LEAVES_L; stem: string; cls: string }> = ({ list, stem, cls }) => (
  <g className={cls}>
    <path d={stem} fill="none" stroke="#4d6b4f" strokeWidth="1.6" strokeLinecap="round" />
    {list.map(([x, y, r, s], i) => (
      <ellipse key={i} cx={x} cy={y} rx={9 * s} ry={4.2 * s} transform={`rotate(${r} ${x} ${y})`} fill={i % 2 ? '#6f9a6c' : '#557f57'} />
    ))}
  </g>
);

/** White ceramic vase with a sprig of leaves, in front of a soft arch. */
const VaseArt: React.FC<{ arch: string; archTo: string }> = ({ arch, archTo }) => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  return (
    <svg viewBox="0 0 200 220" className="cr-art" aria-hidden="true">
      <defs>
        <linearGradient id={`a${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={arch} /><stop offset="1" stopColor={archTo} /></linearGradient>
        <radialGradient id={`v${uid}`} cx=".35" cy=".35" r=".8"><stop offset="0" stopColor="#ffffff" /><stop offset=".7" stopColor="#eef1f2" /><stop offset="1" stopColor="#cfd8dc" /></radialGradient>
      </defs>
      <path d="M58 220V96a62 62 0 0 1 124 0v124Z" fill={`url(#a${uid})`} />
      <ellipse cx="100" cy="210" rx="52" ry="7" fill="#0b2b4c" opacity=".12" />
      <Leaves list={LEAVES_L} stem="M100 132 Q88 96 64 44" cls="cr-leaves-l" />
      <Leaves list={LEAVES_R} stem="M100 132 Q114 92 140 38" cls="cr-leaves-r" />
      <path d="M72 152c-16 22-10 56 28 58 38-2 44-36 28-58-5-7-11-11-11-22H83c0 11-6 15-11 22Z" fill={`url(#v${uid})`} />
      <ellipse cx="100" cy="131" rx="17" ry="3.4" fill="#c5cfd3" />
    </svg>
  );
};

/** Coastal cliff, sea and sky — the “Discover more” slide. */
const SeaArt: React.FC = () => {
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const wave = (y: number) => {
    let d = `M-40 ${y}`;
    for (let x = -40; x < 320; x += 40) d += ` q10 -4 20 0 t20 0`;
    return d;
  };
  return (
    <svg viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice" className="cr-sea" aria-hidden="true">
      <defs>
        <linearGradient id={`s${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f2f8fa" /><stop offset="1" stopColor="#b9dde8" /></linearGradient>
        <linearGradient id={`w${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3aa2c0" /><stop offset=".5" stopColor="#167fa0" /><stop offset="1" stopColor="#0c5b78" /></linearGradient>
        <linearGradient id={`c${uid}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#5d7f5c" /><stop offset=".35" stopColor="#3d5a4d" /><stop offset="1" stopColor="#1f3438" /></linearGradient>
      </defs>
      <rect width="200" height="260" fill={`url(#s${uid})`} />
      <circle className="cr-sun" cx="150" cy="118" r="26" fill="#fff" opacity=".55" />
      <rect y="140" width="200" height="120" fill={`url(#w${uid})`} />
      <g className="cr-waves" stroke="#e9fbff" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d={wave(158)} opacity=".45" />
        <path d={wave(178)} opacity=".35" transform="translate(-14 0)" />
        <path d={wave(202)} opacity=".3" />
        <path d={wave(230)} opacity=".25" transform="translate(-20 0)" />
      </g>
      <path d="M200 112c-18-4-34 2-44 18-12 18-14 42-26 62-10 18-12 40-6 68h76Z" fill={`url(#c${uid})`} />
      <path d="M200 112c-18-4-34 2-44 18-5 8-8 16-10 26 14-14 34-22 54-22Z" fill="#7aa36f" opacity=".75" />
      <path className="cr-foam" d="M122 232c8-6 18-4 24 2" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".7" />
    </svg>
  );
};

type CardKind = 'fresh' | 'story' | 'discover';

const PostCard: React.FC<{ kind: CardKind; count: string }> = ({ kind, count }) => (
  <div className={`cr-post cr-post-${kind}`}>
    {kind === 'discover' && <SeaArt />}
    <span className="cr-post-count">{count}</span>
    {kind === 'fresh' && <h4>Fresh<br />ideas</h4>}
    {kind === 'story' && <h4>One<br />clear<br />story</h4>}
    {kind === 'discover' && <h4>Discover<br />more</h4>}
    {kind === 'fresh' && <p>Turn ideas into<br />progress.</p>}
    {kind === 'fresh' && <VaseArt arch="#2f7d86" archTo="#175a66" />}
    {kind === 'story' && <VaseArt arch="#dfe8ea" archTo="#c7d6db" />}
    {kind === 'discover' && <span className="cr-post-arrow"><ArrowRight /></span>}
  </div>
);

/** Positioned card with separate layers for entrance, float/parallax and hover. */
const Slot: React.FC<{ className: string; children: React.ReactNode }> = ({ className, children }) => (
  <div className={`cr-slot ${className}`}>
    <div className="cr-enter"><div className="cr-float">{children}</div></div>
  </div>
);

const DesignKit: React.FC = () => (
  <div className="cr-book">
    <div className="cr-book-cover">
      <h4>Creative<br />Design Kit</h4>
      <p>Social posts &amp;<br />carousels</p>
      <i />
      <VaseArt arch="#d9e6e9" archTo="#c3d4d9" />
    </div>
  </div>
);

/* ------------------------------------------------------------------- Page */

export const CreativePostsPage: React.FC<Props> = (props) => {
  const root = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState(0);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      /* Hero entrance */
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.cr-hero-copy > *', { y: 28, opacity: 0, duration: 1, stagger: 0.08 })
        .from('.cr-hero-stage .cr-enter', {
          x: (i) => [170, 0, -170][i] ?? 0,
          y: (i) => [40, 70, 40][i] ?? 40,
          rotation: (i) => [6, -3, -10][i] ?? 0,
          scale: 0.8, opacity: 0, duration: 1.4, stagger: 0.13, ease: 'back.out(1.3)',
        }, 0.15)
        .from('.cr-hero-glow', { scale: 0.6, opacity: 0, duration: 1.6 }, 0.1);

      /* Ambient motion inside every card mock-up */
      gsap.to('.cr-float', { y: -11, duration: 2.8, stagger: { each: 0.6, from: 'start' }, ...loop });
      gsap.to('.cr-leaves-l', { rotation: -5, svgOrigin: '100 132', duration: 2.6, stagger: 0.35, ...loop });
      gsap.to('.cr-leaves-r', { rotation: 5, svgOrigin: '100 132', duration: 3.1, stagger: 0.3, ...loop });
      gsap.to('.cr-waves path', { x: '-=40', duration: 3.2, ease: 'none', repeat: -1, stagger: 0.4 });
      gsap.fromTo('.cr-sun', { scale: 0.9, transformOrigin: '50% 50%' }, { scale: 1.15, opacity: 0.8, duration: 2.4, ...loop });
      gsap.fromTo('.cr-foam', { opacity: 0.2 }, { opacity: 0.85, duration: 1.4, ...loop });
      gsap.to('.cr-post-arrow svg', { x: 3, duration: 0.7, ...loop });
      gsap.to('.cr-hero-glow', { scale: 1.08, duration: 5, ...loop });

      /* Scroll reveals */
      const reveal = (targets: string, trigger: string, vars: gsap.TweenVars = {}) => {
        gsap.set(targets, { transition: 'none' });
        gsap.from(targets, { y: 34, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, clearProps: 'transform,opacity,transition', ...vars, scrollTrigger: { trigger, start: 'top 82%', once: true } });
      };

      reveal('.cr-overview-copy > *', '.cr-overview');
      reveal('.cr-help', '.cr-overview', { x: 30, y: 0, delay: 0.15 });
      gsap.from('.cr-help li', { x: -14, opacity: 0, stagger: 0.12, duration: 0.6, delay: 0.5, ease: 'power2.out', scrollTrigger: { trigger: '.cr-help', start: 'top 85%', once: true } });
      gsap.from('.cr-help-icon', { scale: 0, rotation: -90, duration: 0.9, delay: 0.3, ease: 'back.out(2)', scrollTrigger: { trigger: '.cr-help', start: 'top 85%', once: true } });

      reveal('.cr-scope > .cr-eyebrow, .cr-scope > h2', '.cr-scope');
      reveal('.cr-scope-grid article', '.cr-scope-grid', { stagger: 0.09 });
      gsap.to('.cr-scope-icon', { y: -4, duration: 1.8, stagger: { each: 0.25, from: 'random' }, ...loop });

      const dtl = gsap.timeline({ defaults: { ease: 'expo.out' }, scrollTrigger: { trigger: '.cr-deliver', start: 'top 72%', once: true } });
      dtl.from('.cr-deliver-copy > .cr-eyebrow, .cr-deliver-copy > h2', { y: 30, opacity: 0, duration: 1, stagger: 0.1 })
        .from('.cr-deliver li', { x: -24, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.25)
        .from('.cr-deliver li svg', { scale: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(3)' }, 0.35)
        .from('.cr-deliver-copy > p', { opacity: 0, duration: 0.8 }, 0.8)
        .from('.cr-kit-stage .cr-slot-book .cr-enter', { x: -90, rotationY: 35, opacity: 0, duration: 1.4, transformPerspective: 900 }, 0.1)
        .from('.cr-kit-stage .cr-slot-tall .cr-enter', { y: -70, rotation: 14, opacity: 0, duration: 1.3, ease: 'back.out(1.2)' }, 0.3)
        .from('.cr-kit-stage .cr-slot-mini .cr-enter', { y: 90, opacity: 0, scale: 0.85, duration: 1.1, stagger: 0.12, ease: 'back.out(1.4)' }, 0.45);

      gsap.fromTo('.cr-kit-stage', { yPercent: 4 }, { yPercent: -4, ease: 'none', scrollTrigger: { trigger: '.cr-deliver', start: 'top bottom', end: 'bottom top', scrub: true } });

      const ptl = gsap.timeline({ scrollTrigger: { trigger: '.cr-steps', start: 'top 82%', once: true } });
      reveal('.cr-process .cr-eyebrow, .cr-process h2', '.cr-process');
      ptl.from('.cr-steps article', { y: 26, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out' })
        .from('.cr-steps b', { scale: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(3)' }, 0.1)
        .from('.cr-steps .cr-next', { x: -14, opacity: 0, duration: 0.5, stagger: 0.18 }, 0.35);

      reveal('.cr-faq .cr-eyebrow, .cr-faq h2, .cr-faq-item', '.cr-faq');
      reveal('.cr-related .cr-eyebrow, .cr-related h2', '.cr-related');
      reveal('.cr-related-grid article', '.cr-related-grid', { stagger: 0.12 });
    });

    /* Mouse parallax on the hero cards (desktop pointers only) */
    mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
      const hero = root.current?.querySelector<HTMLElement>('.cr-hero');
      const stage = root.current?.querySelector<HTMLElement>('.cr-hero-stage');
      if (!hero || !stage) return;
      const depth = [16, 7, 22];
      const floats = gsap.utils.toArray<HTMLElement>('.cr-hero-stage .cr-float');
      const xs = floats.map((el) => gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }));
      const rx = gsap.quickTo(stage, 'rotationX', { duration: 1, ease: 'power3.out' });
      const ry = gsap.quickTo(stage, 'rotationY', { duration: 1, ease: 'power3.out' });
      gsap.set(stage, { transformPerspective: 1200 });
      const move = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        xs.forEach((fn, i) => fn(nx * (depth[i] ?? 10)));
        ry(nx * 8); rx(-ny * 6);
      };
      const leave = () => { xs.forEach((fn) => fn(0)); rx(0); ry(0); };
      hero.addEventListener('pointermove', move);
      hero.addEventListener('pointerleave', leave);
      return () => { hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave); };
    });
  }, { scope: root });

  return (
    <main className="cr-page" ref={root}>
      {/* HERO */}
      <section className="cr-hero">
        <div className="cr-container cr-hero-inner">
          <div className="cr-hero-copy">
            <nav className="cr-breadcrumb" aria-label="Breadcrumb">
              <button onClick={props.onHomeClick}>Home</button><span>/</span>
              <button onClick={props.onServicesClick}>Services</button><span>/</span>
              <button onClick={props.onSocialClick}>Social Media Marketing</button><span>/</span>
              <span className="cr-current" aria-current="page">Creative Posts &amp; Carousels</span>
            </nav>
            <span className="cr-eyebrow">CREATIVE POSTS &amp; CAROUSELS</span>
            <h1>Make the scroll pause.<br /><em>Make your message clear.</em></h1>
            <p>On-brand social posts and carousel designs that turn your ideas into clear, engaging visual stories.</p>
            <div className="cr-actions">
              <button className="cr-button primary" onClick={props.onContactClick}>Discuss Your Creative Brief <ArrowRight /></button>
              <button className="cr-button ghost" onClick={() => document.querySelector('.cr-scope')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Explore the Service</button>
            </div>
          </div>
          <div className="cr-hero-visual" aria-hidden="true">
            <div className="cr-hero-glow" />
            <div className="cr-hero-stage">
              <Slot className="cr-slot-a"><PostCard kind="fresh" count="1/3" /></Slot>
              <Slot className="cr-slot-b"><PostCard kind="story" count="2/3" /></Slot>
              <Slot className="cr-slot-c"><PostCard kind="discover" count="3/3" /></Slot>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW + SCOPE */}
      <section className="cr-section">
        <div className="cr-container cr-overview">
          <div className="cr-overview-copy">
            <span className="cr-eyebrow">OVERVIEW</span>
            <h2>Good design gives<br />your message a purpose.</h2>
            <p>We combine brand identity, content hierarchy and thoughtful layouts to help your audience understand your message. Each post or carousel is shaped around the platform, audience and agreed objective.</p>
          </div>
          <aside className="cr-help">
            <span className="cr-help-icon"><Target /></span>
            <div>
              <h3>When this service helps</h3>
              <ul>{helps.map((h) => <li key={h}><Check />{h}</li>)}</ul>
            </div>
          </aside>
        </div>

        <div className="cr-container cr-scope">
          <span className="cr-eyebrow">SCOPE</span>
          <h2>What we design for your channels.</h2>
          <div className="cr-scope-grid">
            {scope.map(([Icon, title, text]) => (
              <article key={title}>
                <span className="cr-scope-icon"><Icon /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="cr-deliver">
        <div className="cr-container cr-deliver-inner">
          <div className="cr-deliver-copy">
            <span className="cr-eyebrow">DELIVERABLES</span>
            <h2>Ready-to-share visuals.<br /><em>A consistent brand feel.</em></h2>
            <ul>{deliverables.map((d) => <li key={d}><Check />{d}</li>)}</ul>
            <p>Post volume, slide count, copywriting, source files and publishing are agreed in scope.</p>
          </div>
          <div className="cr-kit-visual" aria-hidden="true">
            <div className="cr-kit-stage">
              <Slot className="cr-slot-tall"><PostCard kind="fresh" count="1/3" /></Slot>
              <Slot className="cr-slot-book"><DesignKit /></Slot>
              <Slot className="cr-slot-mini cr-mini-1"><PostCard kind="fresh" count="1/3" /></Slot>
              <Slot className="cr-slot-mini cr-mini-2"><PostCard kind="story" count="2/3" /></Slot>
              <Slot className="cr-slot-mini cr-mini-3"><PostCard kind="discover" count="3/3" /></Slot>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="cr-section cr-process">
        <div className="cr-container">
          <span className="cr-eyebrow">PROCESS</span>
          <h2>From your brief to a clear visual story.</h2>
          <div className="cr-steps">
            {steps.map(([title, text], i) => (
              <React.Fragment key={title}>
                <article>
                  <div className="cr-step-head"><b>{i + 1}</b><h3>{title}</h3></div>
                  <p>{text}</p>
                </article>
                {i < steps.length - 1 && <ArrowRight className="cr-next" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="cr-section cr-faq">
        <div className="cr-container">
          <span className="cr-eyebrow">FAQ</span>
          <h2>Your creative questions, answered.</h2>
          <div className="cr-faq-list">
            {faqs.map(([q, a], i) => {
              const open = openFaq === i;
              return (
                <div className={`cr-faq-item${open ? ' open' : ''}`} key={q}>
                  <button aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : i)}>
                    <span className="cr-faq-toggle">{open ? <Minus /> : <Plus />}</span>{q}
                  </button>
                  <div className="cr-faq-answer"><div><p>{a}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="cr-section cr-related">
        <div className="cr-container">
          <span className="cr-eyebrow">RELATED SERVICES</span>
          <h2>Give your creative a connected plan.</h2>
          <div className="cr-related-grid">
            {related.map(([Icon, title, text, target]) => (
              <article key={title}>
                <span className="cr-related-icon"><Icon /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <button onClick={() => props.onRelatedClick?.(target)}>View Service <ArrowRight /></button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CreativePostsPage;
