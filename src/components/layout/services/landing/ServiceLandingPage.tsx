import React, { useRef, useState } from 'react';
import {
  ArrowRight, ArrowUpRight, BarChart3, BookOpenCheck, Check, ChevronDown, ClipboardCheck, FileText, Heart,
  LineChart, MessageCircle, MessageSquareText, Search, Settings2, Sparkles, X,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { useGSAP } from '@gsap/react';
import { ROUTES } from '../../../../routes';
import * as HB from './HeroBoards';
import type { Heading, HeroVariant, LandingContent } from './types';
import './ServiceLanding.css';

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, useGSAP);

const STEP_ICONS = [Search, ClipboardCheck, Settings2, BookOpenCheck];
const BENTO_SIZES = ['wide', '', 'tall', '', '', ''];
const pad = (n: number) => String(n).padStart(2, '0');
const H: React.FC<{ h: Heading }> = ({ h: [plain, em, tail] }) => <>{plain}<em>{em}</em>{tail ?? ''}</>;

/** Service, breadcrumb and FAQ structured data for search engines. */
const buildJsonLd = (c: LandingContent, origin: string) => JSON.stringify({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: c.section,
      serviceType: c.section,
      category: c.category,
      provider: { '@type': 'Organization', name: 'IKASLĒ Marketing', url: origin },
      areaServed: 'India',
      url: origin + ROUTES[c.section],
      description: c.lead,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: origin + '/' },
        { '@type': 'ListItem', position: 2, name: 'Services', item: origin + '/services' },
        { '@type': 'ListItem', position: 3, name: c.category, item: origin + ROUTES[c.category] },
        { '@type': 'ListItem', position: 4, name: c.section, item: origin + ROUTES[c.section] },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: c.faqs.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
});

/* ------------------------------------------------------------ Hero boards */

const RoadmapBoard: React.FC<{ c: LandingContent }> = ({ c }) => (
  <>
    <div className="sl-board-head"><span><i /><i /><i /></span><b>{c.visual.title}</b><em>Live plan</em></div>
    <svg viewBox="0 0 400 220" className="sl-road-svg">
      <defs><linearGradient id="sl-road-grad" x1="0" x2="1"><stop offset="0" stopColor="#0875bc" /><stop offset="1" stopColor="#11b9b0" /></linearGradient></defs>
      {[50, 100, 150, 200].map((y) => <line key={y} x1="0" x2="400" y1={y} y2={y} className="sl-road-grid" />)}
      <path className="sl-road-shadow" d="M30 180 C90 175 100 120 150 125 S230 150 260 95 S330 40 370 35" />
      <path className="sl-road" pathLength={1} d="M30 180 C90 175 100 120 150 125 S230 150 260 95 S330 40 370 35" />
      {([[30, 180], [150, 125], [260, 95], [370, 35]] as const).map(([x, y], i) => (
        <g key={x}>
          <circle className="sl-node" cx={x} cy={y} r="9" />
          <text className="sl-node-label" x={x} y={y + 28} textAnchor="middle">{c.visual.items[i]}</text>
        </g>
      ))}
      <circle className="sl-traveller" r="6" cx="30" cy="180" />
    </svg>
  </>
);

const SocialBoard: React.FC<{ c: LandingContent }> = ({ c }) => (
  <>
    <div className="sl-post-head"><i /><div><b>{c.visual.title}</b><small>Sponsored · Just now</small></div><span>•••</span></div>
    <div className="sl-post-media"><span className="sl-post-shine" /><span className="sl-post-play" /></div>
    <div className="sl-post-actions"><Heart /><MessageCircle /><ArrowUpRight /></div>
    <div className="sl-post-stats">
      {c.visual.items.map((label, i) => <div key={label}><small>{label}</small><span><i style={{ width: `${55 + i * 12}%` }} /></span></div>)}
    </div>
    {[0, 1, 2, 3].map((i) => <span key={i} className="sl-float-heart" style={{ left: `${62 + i * 8}%` }}><Heart /></span>)}
  </>
);

const SearchBoard: React.FC<{ c: LandingContent }> = ({ c }) => (
  <>
    <div className="sl-search-bar"><Search /><span className="sl-typed">{c.visual.title}</span><i className="sl-caret" /></div>
    <ol className="sl-results">
      {c.visual.items.map((label, i) => (
        <li key={label} className={i === 1 ? 'sl-you' : ''}>
          <b className="sl-rank">{i + 1}</b>
          <span><strong>{label}</strong><em /><em /></span>
          {i === 1 && <ArrowUpRight className="sl-up" />}
        </li>
      ))}
    </ol>
  </>
);

const BrandBoard: React.FC<{ c: LandingContent }> = ({ c }) => (
  <>
    <div className="sl-board-head"><span><i /><i /><i /></span><b>{c.visual.title}</b><em>v2.0</em></div>
    <div className="sl-brand-body">
      <svg viewBox="0 0 100 100" className="sl-mark">
        <path className="sl-mark-a" d="M14 8 C40 22 44 78 14 92 Z" fill="#0b4f8a" />
        <path className="sl-mark-b" d="M40 50 C44 22 64 8 92 8 C88 36 70 50 40 50Z" fill="#11b9b0" />
        <path className="sl-mark-c" d="M40 50 C70 50 88 64 92 92 C64 92 44 78 40 50Z" fill="#5fc9d6" />
      </svg>
      <div className="sl-brand-side">
        <span className="sl-type">Aa</span>
        <div className="sl-swatches">{['#071d35', '#0875bc', '#11b9b0', '#35d7d0', '#d8f3f6'].map((col) => <i key={col} style={{ background: col }} />)}</div>
      </div>
    </div>
    <div className="sl-attrs">{c.visual.items.map((label) => <span key={label}>{label}</span>)}</div>
  </>
);

/** Boards animated with GSAP (animateBoard); they read the whole content object. */
const GSAP_BOARDS: Partial<Record<HeroVariant, React.FC<{ c: LandingContent }>>> = { roadmap: RoadmapBoard, social: SocialBoard, search: SearchBoard, brand: BrandBoard };
/** Service-specific boards with CSS-only motion. */
const CSS_BOARDS: Partial<Record<HeroVariant, React.FC<HB.BoardProps>>> = {
  persona: HB.PersonaBoard, ads: HB.AdsBoard, video: HB.VideoBoard, leadform: HB.LeadFormBoard, article: HB.ArticleBoard,
  inbox: HB.InboxBoard, pipeline: HB.PipelineBoard, abtest: HB.AbTestBoard, analytics: HB.AnalyticsBoard, tracking: HB.TrackingBoard,
  pillars: HB.PillarsBoard, profile: HB.ProfileBoard, queue: HB.QueueBoard, calendar: HB.CalendarBoard, carousel: HB.CarouselBoard,
  reel: HB.ReelBoard, chat: HB.ChatBoard, creators: HB.CreatorsBoard,
  audit: HB.AuditBoard, keywords: HB.KeywordsBoard, vitals: HB.VitalsBoard, snippet: HB.SnippetBoard, map: HB.MapBoard,
  listing: HB.ListingBoard, cluster: HB.ClusterBoard, backlinks: HB.BacklinksBoard, products: HB.ProductsBoard,
  notes: HB.NotesBoard, quadrant: HB.QuadrantBoard, house: HB.HouseBoard, book: HB.BookBoard, print: HB.PrintBoard,
  browser: HB.BrowserBoard, storyboard: HB.StoryboardBoard, touchpoints: HB.TouchpointsBoard, launch: HB.LaunchBoard,
};

const HeroBoard: React.FC<{ c: LandingContent }> = ({ c }) => {
  const Legacy = GSAP_BOARDS[c.visual.variant];
  if (Legacy) return <Legacy c={c} />;
  const Board = CSS_BOARDS[c.visual.variant] ?? HB.AnalyticsBoard;
  return <Board title={c.visual.title} items={c.visual.items} />;
};

/** Chip arrangement around the board, varied per page so heroes do not all look alike. */
const chipLayout = (section: string) => [...section].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % 3;

/** Looping motion for the hero board, per variant. */
const animateBoard = (variant: HeroVariant) => {
  if (!GSAP_BOARDS[variant]) return;
  const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;
  if (variant === 'roadmap') {
    gsap.timeline()
      .fromTo('.sl-road', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' })
      .fromTo('.sl-node', { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.5, stagger: 0.3, ease: 'back.out(3)' }, 0.2)
      .fromTo('.sl-node-label', { y: 8, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.3 }, 0.35);
    gsap.to('.sl-traveller', { motionPath: { path: '.sl-road', align: '.sl-road', alignOrigin: [0.5, 0.5] }, duration: 5, ease: 'none', repeat: -1, delay: 1.8 });
  } else if (variant === 'social') {
    gsap.fromTo('.sl-post-stats i', { scaleX: 0 }, { scaleX: 1, duration: 1, stagger: 0.15, ease: 'expo.out', delay: 0.4 });
    gsap.to('.sl-post-shine', { xPercent: 260, duration: 2.4, repeat: -1, repeatDelay: 1.6, ease: 'power2.inOut', delay: 1 });
    gsap.utils.toArray<HTMLElement>('.sl-float-heart').forEach((el, i) => {
      gsap.fromTo(el, { y: 0, opacity: 0, scale: 0.6 }, { y: -140, scale: 1.1, duration: 2.6, delay: 1 + i * 0.6, repeat: -1, ease: 'power1.out', keyframes: { opacity: [0, 1, 1, 0] } });
    });
    gsap.to('.sl-post-play', { scale: 1.12, duration: 0.9, ...loop });
  } else if (variant === 'search') {
    gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
      .fromTo('.sl-typed', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'steps(24)' })
      .fromTo('.sl-results li', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.4, stagger: 0.12, ease: 'power2.out' })
      .to('.sl-you', { y: '-100%', duration: 0.7, ease: 'back.inOut(1.4)' }, '+=0.4')
      .to('.sl-results li:first-child', { y: '100%', duration: 0.7, ease: 'back.inOut(1.4)' }, '<')
      .to('.sl-you .sl-rank', { textContent: 1, duration: 0.1, snap: { textContent: 1 } }, '<0.35')
      .to('.sl-results li:first-child .sl-rank', { textContent: 2, duration: 0.1, snap: { textContent: 1 } }, '<')
      .fromTo('.sl-up', { scale: 0, rotation: -45 }, { scale: 1, rotation: 0, duration: 0.5, ease: 'back.out(3)' })
      .to('.sl-results li, .sl-typed', { opacity: 0, duration: 0.4 }, '+=2')
      .set('.sl-you, .sl-results li:first-child', { y: 0 })
      .set('.sl-you .sl-rank', { textContent: 2 })
      .set('.sl-results li:first-child .sl-rank', { textContent: 1 })
      .set('.sl-typed', { opacity: 1 });
    gsap.to('.sl-caret', { opacity: 0, duration: 0.45, repeat: -1, yoyo: true, ease: 'steps(1)' });
  } else {
    gsap.timeline({ repeat: -1, repeatDelay: 2.2 })
      .fromTo('.sl-mark-a', { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
      .fromTo('.sl-mark-b', { scale: 0, rotation: -70, svgOrigin: '40 50' }, { scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.35')
      .fromTo('.sl-mark-c', { scale: 0, rotation: 70, svgOrigin: '40 50' }, { scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.5')
      .fromTo('.sl-swatches i', { scale: 0 }, { scale: 1, duration: 0.4, stagger: 0.08, ease: 'back.out(2.5)' }, '-=0.3')
      .fromTo('.sl-attrs span', { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.1 }, '-=0.2')
      .to('.sl-mark path, .sl-attrs span', { opacity: 0, duration: 0.4 }, '+=2.6');
    gsap.to('.sl-type', { y: -6, rotation: -4, duration: 2, ...loop });
  }
};

/* ------------------------------------------------------------ Page */

export const ServiceLandingPage: React.FC<{ content: LandingContent; onNavigate: (section: string) => void }> = ({ content: c, onNavigate }) => {
  const root = useRef<HTMLElement>(null);
  const visual = useRef<HTMLDivElement>(null);
  const [pillar, setPillar] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  const firstPillar = useRef(true);
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  const ids = (name: string) => `sl-${name}-title`;

  useGSAP((_, contextSafe) => {
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const once = (trigger: string | Element, start = 'top 82%') => ({ trigger, start, once: true });

      /* Hero, paused until the app's page loader has faded so it is not played unseen behind it. */
      const heroCopy = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .fromTo('.sl-kicker', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo('.sl-h1-line > span', { yPercent: 110 }, { yPercent: 0, duration: 1.1, stagger: 0.1 }, 0.1)
        .fromTo('.sl-lead', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.45)
        .fromTo('.sl-actions > *', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.08 }, 0.6)
        .fromTo('.sl-facts li', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 }, 0.75);
      const heroVisual = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })
        .fromTo('.sl-board', { y: 50, opacity: 0, rotationX: 18, scale: 0.94 }, { y: 0, opacity: 1, rotationX: 0, scale: 1, duration: 1.2, ease: 'expo.out' })
        .fromTo('.sl-chip', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, stagger: 0.12, ease: 'back.out(2)' }, 0.6)
        .fromTo('.sl-mini', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, 0.8)
        .fromTo('.sl-mini-bars i', { scaleY: 0 }, { scaleY: 1, duration: 0.6, stagger: 0.07, ease: 'back.out(1.8)' }, 1);

      let started = false;
      const startHero = contextSafe!(() => {
        if (started) return;
        started = true;
        heroCopy.play();
        heroVisual.play();
        gsap.delayedCall(0.4, contextSafe!(() => animateBoard(c.visual.variant)));
        gsap.utils.toArray<HTMLElement>('.sl-chip').forEach((chip, i) => {
          gsap.to(chip, { y: i % 2 ? 10 : -10, rotation: i % 2 ? -2 : 2, duration: 2.4 + i * 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.8 + i * 0.2 });
        });
        gsap.to('.sl-mini-bars i', { scaleY: () => gsap.utils.random(0.55, 1), duration: 1.4, repeat: -1, yoyo: true, repeatRefresh: true, ease: 'sine.inOut', stagger: 0.12, delay: 2.2 });
      });
      const loader = document.querySelector('.page-loader');
      const loaderObserver = new MutationObserver(() => { if (!loader?.classList.contains('is-visible')) { loaderObserver.disconnect(); startHero(); } });
      if (loader?.classList.contains('is-visible')) loaderObserver.observe(loader, { attributes: true, attributeFilter: ['class'] });
      else startHero();

      /* Section headings */
      gsap.utils.toArray<HTMLElement>('.sl-head').forEach((head) => {
        gsap.from(head.children, { y: 30, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out', scrollTrigger: once(head, 'top 85%') });
      });

      /* Why: the two sides slide in from opposite edges. */
      gsap.timeline({ scrollTrigger: once('.sl-compare') })
        .from('.sl-side--without', { x: -60, opacity: 0, duration: 1, ease: 'expo.out' })
        .from('.sl-side--with', { x: 60, opacity: 0, duration: 1, ease: 'expo.out' }, 0.1)
        .from('.sl-vs', { scale: 0, rotation: -180, duration: 0.9, ease: 'back.out(2)' }, 0.4)
        .from('.sl-side--without li', { x: -20, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.5)
        .from('.sl-side--with li', { x: 20, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.6);

      /* Scope pillars */
      gsap.from('.sl-tab', { x: -30, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out', scrollTrigger: once('.sl-framework-body') });
      gsap.from('.sl-pillar-stage', { y: 40, opacity: 0, duration: 1, ease: 'expo.out', scrollTrigger: once('.sl-framework-body') });

      /* Journey: each layer narrows in from the centre, tags pop after. */
      gsap.utils.toArray<HTMLElement>('.sl-funnel-row').forEach((row, i) => {
        const q = gsap.utils.selector(row);
        gsap.timeline({ scrollTrigger: once(row, 'top 88%'), delay: i * 0.08 })
          .from(q('.sl-layer'), { scaleX: 0.2, opacity: 0, duration: 0.9, ease: 'expo.out' })
          .from(q('.sl-funnel-goal > *'), { y: 12, opacity: 0, duration: 0.5, stagger: 0.06 }, 0.2)
          .from(q('.sl-channel'), { scale: 0.6, opacity: 0, duration: 0.45, stagger: 0.05, ease: 'back.out(2)' }, 0.3)
          .from(q('.sl-kpi'), { x: 20, opacity: 0, duration: 0.5 }, 0.45);
      });

      /* Who it is for */
      gsap.from('.sl-bento-card', { y: 50, scale: 0.95, opacity: 0, duration: 0.9, stagger: 0.08, ease: 'expo.out', clearProps: 'transform', scrollTrigger: once('.sl-bento') });

      /* Deliverables: documents flip up into place. */
      gsap.from('.sl-doc', { y: 80, rotationX: -55, opacity: 0, transformPerspective: 900, transformOrigin: '50% 100%', duration: 1.1, stagger: 0.1, ease: 'expo.out', clearProps: 'transform', scrollTrigger: once('.sl-docs') });
      gsap.from('.sl-doc-lines i', { scaleX: 0, transformOrigin: 'left', duration: 0.6, stagger: 0.04, ease: 'power2.out', scrollTrigger: once('.sl-docs', 'top 70%') });

      /* Process: the line fills with scroll and lights each step it reaches. */
      const steps = gsap.utils.toArray<HTMLElement>('.sl-step');
      const lightSteps = (progress: number) => steps.forEach((step, i) => step.classList.toggle('is-lit', progress >= i / (steps.length - 1) - 0.02));
      gsap.fromTo('.sl-track-fill', { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '.sl-timeline', start: 'top 75%', end: 'bottom 55%', scrub: 0.6, onUpdate: (self) => lightSteps(self.progress) },
      });
      gsap.from(steps, { y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'expo.out', scrollTrigger: once('.sl-timeline') });

      /* Measurement dashboard */
      gsap.timeline({ defaults: { ease: 'power3.out' }, scrollTrigger: once('.sl-dash') })
        .from('.sl-dash', { y: 50, rotationY: -12, transformPerspective: 1000, opacity: 0, duration: 1.1, ease: 'expo.out' })
        .from('.sl-tile', { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, 0.3)
        .fromTo('.sl-spark', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, stagger: 0.2, ease: 'power2.inOut' }, 0.5)
        .fromTo('.sl-ring-fill', { strokeDasharray: '0 1' }, { strokeDasharray: '0.68 1', duration: 1.4 }, 0.6)
        .from('.sl-donut circle', { strokeDasharray: '0 100', duration: 1.2, stagger: 0.15 }, 0.7)
        .from('.sl-kpi-list li', { x: -20, opacity: 0, duration: 0.5, stagger: 0.08 }, 0.2);

      /* Related + FAQ */
      gsap.from('.sl-related-row', { x: -40, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out', scrollTrigger: once('.sl-related-list') });
      gsap.from('.sl-faq-item', { y: 24, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out', scrollTrigger: once('.sl-faq-list') });

      return () => loaderObserver.disconnect();
    });

    /* Hero parallax: layers drift with the pointer. */
    mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
      const el = visual.current;
      if (!el) return;
      const layers = gsap.utils.toArray<HTMLElement>('[data-depth]', el).map((layer) => ({
        x: gsap.quickTo(layer, 'x', { duration: 0.9, ease: 'power3.out' }),
        y: gsap.quickTo(layer, 'y', { duration: 0.9, ease: 'power3.out' }),
        depth: Number(layer.dataset.depth),
      }));
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        layers.forEach((l) => { l.x(nx * l.depth); l.y(ny * l.depth); });
      };
      const leave = () => layers.forEach((l) => { l.x(0); l.y(0); });
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', leave);
      return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
    });
  }, { scope: root, dependencies: [c.section], revertOnUpdate: true });

  // Scope pillars: the newly selected pillar's content builds in.
  useGSAP(() => {
    if (firstPillar.current) { firstPillar.current = false; return; }
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .fromTo('.sl-pillar.is-active .sl-pillar-icon', { scale: 0.4, rotation: -90 }, { scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(2)' })
        .fromTo('.sl-pillar.is-active .sl-pillar-copy > *', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06 }, 0.05)
        .fromTo('.sl-pillar.is-active .sl-pillar-cols li', { x: -14, opacity: 0 }, { x: 0, opacity: 1, duration: 0.45, stagger: 0.05 }, 0.25);
    });
  }, { scope: root, dependencies: [pillar] });

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  const { why, pillars, journey, who, deliverables, process, measure } = c;

  return (
    <main ref={root} className={`sl-page sl-page--${c.visual.variant}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: buildJsonLd(c, origin) }} />

      {/* Hero */}
      <section className="sl-hero" aria-labelledby="sl-h1">
        <div className="sl-hero-bg" aria-hidden="true"><span /><span /><span /></div>
        <div className="sl-shell sl-hero-grid">
          <div className="sl-hero-copy">
            <nav className="sl-breadcrumb" aria-label="Breadcrumb">
              <button type="button" onClick={() => onNavigate('Home')}>Home</button><span>/</span>
              <button type="button" onClick={() => onNavigate('Services')}>Services</button><span>/</span>
              <button type="button" onClick={() => onNavigate(c.category)}>{c.category}</button><span>/</span>
              <span aria-current="page">{c.crumb}</span>
            </nav>
            <p className="sl-kicker"><Sparkles aria-hidden="true" />{c.kicker}</p>
            <h1 id="sl-h1" className="sl-h1">
              <span className="sl-h1-line"><span>{c.h1[0]}</span></span>{' '}
              <span className="sl-h1-line"><span>{c.h1[1]}</span></span>{' '}
              <span className="sl-h1-line"><span><em>{c.h1[2]}</em></span></span>
            </h1>
            <p className="sl-lead">{c.lead}</p>
            <div className="sl-actions">
              <button type="button" className="sl-btn sl-btn--primary" onClick={() => onNavigate('Contact')}>{c.cta} <ArrowRight aria-hidden="true" /></button>
              <button type="button" className="sl-btn sl-btn--ghost" onClick={() => scrollTo('sl-scope')}>See What Is Included</button>
            </div>
            <ul className="sl-facts">
              <li><b>{pillars.items.length}</b><span>core focus areas</span></li>
              <li><b>{process.steps.length}</b><span>step working process</span></li>
              <li><b>{deliverables.items.length}</b><span>practical deliverables</span></li>
            </ul>
          </div>

          <div className="sl-visual" ref={visual} aria-hidden="true" data-layout={chipLayout(c.section)}>
            <div className="sl-glow" data-depth="10" />
            <div className={`sl-board sl-board--${c.visual.variant}`} data-depth="18"><HeroBoard c={c} /></div>
            {c.visual.chips.map(([Icon, label], i) => (
              <div key={label} className={`sl-chip sl-chip--${'abcd'[i]}`} data-depth={[34, 42, 28, 38][i]}><Icon />{label}</div>
            ))}
            <div className="sl-mini" data-depth="26">
              <span>{c.visual.mini[0]}</span>
              <div className="sl-mini-bars">{[0.35, 0.5, 0.45, 0.7, 0.62, 0.9].map((h, i) => <i key={i} style={{ height: `${h * 100}%` }} />)}</div>
              <b><LineChart />{c.visual.mini[1]}</b>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section className="sl-section sl-why" aria-labelledby={ids('why')}>
        <div className="sl-shell">
          <header className="sl-head sl-head--center">
            <p className="sl-eyebrow">{why.eyebrow ?? 'Why It Matters'}</p>
            <h2 id={ids('why')}><H h={why.title} /></h2>
            <p>{why.intro}</p>
          </header>
          <div className="sl-compare">
            <article className="sl-side sl-side--without">
              <h3>{why.sides?.[0] ?? 'Without a clear plan'}</h3>
              <ul>{why.without.map((t) => <li key={t}><span><X aria-hidden="true" /></span>{t}</li>)}</ul>
            </article>
            <div className="sl-vs" aria-hidden="true">VS</div>
            <article className="sl-side sl-side--with">
              <h3>{why.sides?.[1] ?? `With expert ${c.crumb.toLowerCase()}`}</h3>
              <ul>{why.with.map((t) => <li key={t}><span><Check aria-hidden="true" /></span>{t}</li>)}</ul>
            </article>
          </div>
        </div>
      </section>

      {/* Scope pillars */}
      <section id="sl-scope" className="sl-section sl-framework" aria-labelledby={ids('scope')}>
        <div className="sl-shell">
          <header className="sl-head">
            <p className="sl-eyebrow">{pillars.eyebrow ?? 'Scope of Service'}</p>
            <h2 id={ids('scope')}><H h={pillars.title} /></h2>
            <p>{pillars.intro}</p>
          </header>
          <div className="sl-framework-body">
            <div className="sl-tabs" role="tablist" aria-label={`${c.section} focus areas`} aria-orientation="vertical">
              {pillars.items.map(([, title], i) => (
                <button key={title} type="button" role="tab" id={`sl-tab-${i}`} aria-selected={pillar === i} aria-controls={`sl-pillar-${i}`} className={`sl-tab${pillar === i ? ' is-active' : ''}`} onClick={() => setPillar(i)}>
                  <span className="sl-tab-num">{pad(i + 1)}</span>
                  <span className="sl-tab-title">{title}</span>
                  <ArrowRight className="sl-tab-arrow" aria-hidden="true" />
                </button>
              ))}
            </div>
            <div className="sl-pillar-stage">
              {pillars.items.map(([Icon, title, text, review, get], i) => (
                <div key={title} id={`sl-pillar-${i}`} role="tabpanel" aria-labelledby={`sl-tab-${i}`} className={`sl-pillar${pillar === i ? ' is-active' : ''}`} hidden={pillar !== i}>
                  <span className="sl-pillar-bignum" aria-hidden="true">{pad(i + 1)}</span>
                  <span className="sl-pillar-icon" aria-hidden="true"><Icon /></span>
                  <div className="sl-pillar-copy"><h3>{title}</h3><p>{text}</p></div>
                  <div className="sl-pillar-cols">
                    <div><h4>What we cover</h4><ul>{review.map((r) => <li key={r}><Check aria-hidden="true" />{r}</li>)}</ul></div>
                    <div><h4>What you get</h4><ul><li><FileText aria-hidden="true" />{get}</li></ul></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="sl-section sl-funnel" aria-labelledby={ids('journey')}>
        <div className="sl-shell">
          <header className="sl-head sl-head--split">
            <div>
              <p className="sl-eyebrow">{journey.eyebrow ?? 'How It Works'}</p>
              <h2 id={ids('journey')}><H h={journey.title} /></h2>
            </div>
            <p>{journey.intro}</p>
          </header>
          <ol className="sl-funnel-list">
            {journey.stages.map(([stage, goal, tags, kpi], i) => (
              <li className="sl-funnel-row" key={stage} style={{ '--i': i } as React.CSSProperties}>
                <div className="sl-layer"><span className="sl-layer-num">{pad(i + 1)}</span><h3>{stage}</h3></div>
                <div className="sl-funnel-goal">
                  <strong>{goal}</strong>
                  <div className="sl-channels">{tags.map((t) => <span className="sl-channel" key={t}>{t}</span>)}</div>
                </div>
                <div className="sl-kpi"><small>Key measure</small><BarChart3 aria-hidden="true" /><span>{kpi}</span></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Who it is for */}
      <section className="sl-section sl-who" aria-labelledby={ids('who')}>
        <div className="sl-shell">
          <header className="sl-head sl-head--center">
            <p className="sl-eyebrow">{who.eyebrow ?? 'Who It Is For'}</p>
            <h2 id={ids('who')}><H h={who.title} /></h2>
            <p>{who.intro}</p>
          </header>
          <div className="sl-bento">
            {who.items.map(([Icon, title, text], i) => (
              <article key={title} className={`sl-bento-card${BENTO_SIZES[i] ? ` is-${BENTO_SIZES[i]}` : ''}`}>
                <span className="sl-bento-icon" aria-hidden="true"><Icon /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="sl-section sl-deliver" aria-labelledby={ids('deliver')}>
        <div className="sl-deliver-bg" aria-hidden="true" />
        <div className="sl-shell">
          <header className="sl-head sl-head--center sl-head--light">
            <p className="sl-eyebrow">{deliverables.eyebrow ?? 'Deliverables'}</p>
            <h2 id={ids('deliver')}><H h={deliverables.title} /></h2>
            <p>{deliverables.intro}</p>
          </header>
          <div className="sl-docs">
            {deliverables.items.map(([title, text], i) => (
              <article className="sl-doc" key={title}>
                <div className="sl-doc-top"><span className="sl-doc-tag">DOC {pad(i + 1)}</span><FileText aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{text}</p>
                <div className="sl-doc-lines" aria-hidden="true"><i /><i /><i /></div>
              </article>
            ))}
          </div>
          <p className="sl-note">{deliverables.note ?? 'Final deliverables are agreed in your project scope.'}</p>
        </div>
      </section>

      {/* Process */}
      <section className="sl-section sl-process" aria-labelledby={ids('process')}>
        <div className="sl-shell">
          <header className="sl-head">
            <p className="sl-eyebrow">{process.eyebrow ?? 'Our Process'}</p>
            <h2 id={ids('process')}><H h={process.title} /></h2>
            <p>{process.intro}</p>
          </header>
          <div className="sl-timeline">
            <div className="sl-track" aria-hidden="true"><span className="sl-track-fill" /></div>
            <ol className="sl-steps">
              {process.steps.map(([title, text, output], i) => {
                const Icon = STEP_ICONS[i % STEP_ICONS.length];
                return (
                  <li className="sl-step" key={title}>
                    <span className="sl-step-node" aria-hidden="true"><Icon /></span>
                    <span className="sl-step-num">Step {pad(i + 1)}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <span className="sl-step-out"><Check aria-hidden="true" />{output}</span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* Measurement */}
      <section className="sl-section sl-measure" aria-labelledby={ids('measure')}>
        <div className="sl-shell sl-measure-grid">
          <div>
            <header className="sl-head">
              <p className="sl-eyebrow">{measure.eyebrow ?? 'Measuring Success'}</p>
              <h2 id={ids('measure')}><H h={measure.title} /></h2>
              <p>{measure.intro}</p>
            </header>
            <ul className="sl-kpi-list">{measure.points.map((k) => <li key={k}><span><Check aria-hidden="true" /></span>{k}</li>)}</ul>
          </div>
          <div className="sl-dash" aria-hidden="true">
            <div className="sl-dash-head"><b>{c.crumb} performance</b><span>Sample dashboard</span></div>
            <div className="sl-tiles">
              <div className="sl-tile">
                <small>{measure.dash.up[0]}</small>
                <svg viewBox="0 0 120 44"><path className="sl-spark" pathLength={1} d="M2 38 L22 32 L40 34 L58 22 L76 24 L96 12 L118 6" /></svg>
                <em className="up">{measure.dash.up[1]}</em>
              </div>
              <div className="sl-tile">
                <small>{measure.dash.down[0]}</small>
                <svg viewBox="0 0 120 44"><path className="sl-spark sl-spark--down" pathLength={1} d="M2 8 L22 12 L40 10 L58 20 L76 18 L96 30 L118 34" /></svg>
                <em className="down">{measure.dash.down[1]}</em>
              </div>
              <div className="sl-tile sl-tile--ring">
                <small>{measure.dash.ring}</small>
                <svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="17" className="sl-ring-bg" /><circle cx="22" cy="22" r="17" className="sl-ring-fill" pathLength={1} /></svg>
              </div>
              <div className="sl-tile sl-tile--donut">
                <small>{measure.dash.donut[0]}</small>
                <svg viewBox="0 0 42 42" className="sl-donut">
                  <circle cx="21" cy="21" r="15.9" pathLength={100} style={{ stroke: '#0875bc', strokeDasharray: '40 60', strokeDashoffset: 25 }} />
                  <circle cx="21" cy="21" r="15.9" pathLength={100} style={{ stroke: '#11b9b0', strokeDasharray: '30 70', strokeDashoffset: -15 }} />
                  <circle cx="21" cy="21" r="15.9" pathLength={100} style={{ stroke: '#7fd6f0', strokeDasharray: '30 70', strokeDashoffset: -45 }} />
                </svg>
                <ul>{measure.dash.donut.slice(1).map((label, i) => <li key={label}><i style={{ background: ['#0875bc', '#11b9b0', '#7fd6f0'][i] }} />{label}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="sl-section sl-related" aria-labelledby={ids('related')}>
        <div className="sl-shell">
          <header className="sl-head sl-head--split">
            <div>
              <p className="sl-eyebrow">Related Services</p>
              <h2 id={ids('related')}>Services that work well with <em>{c.crumb}</em></h2>
            </div>
            <p>Combine these {c.category.toLowerCase()} and growth services to get more from your investment.</p>
          </header>
          <div className="sl-related-list">
            {c.related.map(([section, text], i) => (
              <button type="button" className="sl-related-row" key={section} onClick={() => onNavigate(section)}>
                <span className="sl-related-num">{pad(i + 1)}</span>
                <span className="sl-related-text"><b>{section}</b><small>{text}</small></span>
                <span className="sl-related-go" aria-hidden="true"><ArrowUpRight /></span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sl-section sl-faq" aria-labelledby={ids('faq')}>
        <div className="sl-shell sl-faq-grid">
          <div className="sl-faq-side">
            <header className="sl-head">
              <p className="sl-eyebrow">FAQ</p>
              <h2 id={ids('faq')}>{c.section} <em>FAQs</em></h2>
              <p>Answers to the questions we hear most often before a {c.crumb.toLowerCase()} project begins.</p>
            </header>
            <div className="sl-faq-card">
              <MessageSquareText aria-hidden="true" />
              <div><b>Still have a question?</b><span>Talk to us about your goals.</span></div>
              <button type="button" onClick={() => onNavigate('Contact')} aria-label="Contact us"><ArrowRight aria-hidden="true" /></button>
            </div>
          </div>
          <div className="sl-faq-list">
            {c.faqs.map(([q, a], i) => {
              const open = openFaq === i;
              return (
                <div className={`sl-faq-item${open ? ' is-open' : ''}`} key={q}>
                  <h3>
                    <button type="button" aria-expanded={open} aria-controls={`sl-faq-${i}`} onClick={() => setOpenFaq(open ? -1 : i)}>
                      <span className="sl-faq-num">{pad(i + 1)}</span>
                      <span className="sl-faq-q">{q}</span>
                      <ChevronDown aria-hidden="true" />
                    </button>
                  </h3>
                  <div className="sl-faq-answer" id={`sl-faq-${i}`}><div><p>{a}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceLandingPage;
