import React, { useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowLeft,
  ArrowRight,
  ChartNoAxesColumnIncreasing,
  FileSearch,
  KeyRound,
  LayoutPanelTop,
  Link2,
  MapPin,
  Pencil,
  Settings,
  ShoppingBag,
  Store,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import heroArt from '../../../../assets/seo-hero-art.png';
import { ServicesCta } from '../ServicesCta';
import './SeoPage.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface SeoService {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  tags: [string, string];
}

const SERVICES: SeoService[] = [
  { id: 'audit', icon: FileSearch, title: 'SEO Audit & Strategy', description: 'Find opportunities and prioritise your next steps.', tags: ['Website audits', 'SEO roadmap'] },
  { id: 'keyword', icon: KeyRound, title: 'Keyword & Search Intent Research', description: 'Understand what your audience is searching for.', tags: ['Keyword mapping', 'Search intent'] },
  { id: 'technical', icon: Settings, title: 'Technical SEO', description: 'Help search engines crawl and understand your website.', tags: ['Crawlability', 'Indexing checks'] },
  { id: 'onpage', icon: LayoutPanelTop, title: 'On-Page SEO', description: 'Make important pages clearer and more relevant.', tags: ['Titles & headings', 'Internal links'] },
  { id: 'local', icon: MapPin, title: 'Local SEO', description: 'Strengthen your visibility to nearby customers.', tags: ['Local landing pages', 'Listing consistency'] },
  { id: 'gbp', icon: Store, title: 'Google Business Profile', description: 'Keep your business presence clear and useful.', tags: ['Profile optimisation', 'Review strategy'] },
  { id: 'content', icon: Pencil, title: 'SEO Content & Topic Planning', description: 'Create useful content around audience needs.', tags: ['Content briefs', 'Topic clusters'] },
  { id: 'offpage', icon: Link2, title: 'Off-Page SEO & Digital PR', description: 'Build relevant connections and brand visibility.', tags: ['Outreach', 'Brand mentions'] },
  { id: 'ecommerce', icon: ShoppingBag, title: 'E-Commerce SEO', description: 'Help customers discover products through search.', tags: ['Product pages', 'Category optimisation'] },
  { id: 'analytics', icon: ChartNoAxesColumnIncreasing, title: 'Search Analytics & Reporting', description: 'Understand visibility and track meaningful progress.', tags: ['Search Console', 'Organic performance'] },
];

export interface SeoPageProps {
  onHomeClick?: () => void;
  onServicesClick?: () => void;
  onContactClick?: () => void;
  /** Opens the detail page for a service card id; return false to fall back to contact. */
  onServiceClick?: (id: string) => boolean;
}

export const SeoPage: React.FC<SeoPageProps> = ({ onHomeClick, onServicesClick, onContactClick, onServiceClick }) => {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Hero: masked headline, the search scene slides in and floats.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.seo-breadcrumb', { opacity: 0, y: -12, duration: 0.8 }, 0)
        .from('.seo-overline', { opacity: 0, letterSpacing: '0.7em', duration: 1.1 }, 0.1)
        .from('.seo-hero-copy > p', { opacity: 0, y: 20, duration: 1 }, 0.9)
        .from('.seo-hero-art', { opacity: 0, x: 90, scale: 0.94, duration: 1.4 }, 0.2);
      SplitText.create('.seo-hero-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => tl.from(self.lines, { yPercent: 115, duration: 1.2, stagger: 0.14 }, 0.3),
      });
      gsap.to('.seo-hero-art img', { y: -8, x: 6, duration: 3.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });

    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const hero = root.current?.querySelector<HTMLElement>('.seo-hero');
      const art = root.current?.querySelector<HTMLElement>('.seo-hero-art');
      if (!hero || !art) return;
      const ax = gsap.quickTo(art, 'x', { duration: 1.1, ease: 'power3.out' });
      const ay = gsap.quickTo(art, 'y', { duration: 1.1, ease: 'power3.out' });
      const move = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        ax(((e.clientX - r.left) / r.width - 0.5) * 26);
        ay(((e.clientY - r.top) / r.height - 0.5) * 16);
      };
      const leave = () => { ax(0); ay(0); };
      hero.addEventListener('pointermove', move);
      hero.addEventListener('pointerleave', leave);
      return () => {
        hero.removeEventListener('pointermove', move);
        hero.removeEventListener('pointerleave', leave);
      };
    });

    // Cards build in; every icon moves in its own way.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.seo-list-header > *', {
        opacity: 0, y: 24, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.seo-list-header', start: 'top 88%', once: true },
      });

      gsap.utils.toArray<HTMLElement>('.seo-card').forEach((card, i) => {
        const q = gsap.utils.selector(card);
        gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        })
          .from(card, { opacity: 0, y: 40, duration: 0.9, delay: (i % 2) * 0.12, ease: 'expo.out' })
          .from(q('.seo-card-icon'), { scale: 0, duration: 0.8, ease: 'back.out(2.2)' }, 0.2)
          .from(q('.seo-card-title, .seo-card-desc'), { opacity: 0, x: -16, duration: 0.6, stagger: 0.08 }, 0.3)
          .from(q('.seo-tag'), { opacity: 0, scale: 0.7, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' }, 0.5)
          .from(q('.seo-card-link'), { opacity: 0, x: 14, duration: 0.6 }, 0.55);
      });

      const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;
      gsap.to('.seo-card-icon', { scale: 1.05, duration: 2.2, stagger: { each: 0.2, from: 'random' }, ...loop });

      gsap.to('.seo-ic--audit', { rotation: 8, x: 2, duration: 1.4, ...loop });
      gsap.fromTo('.seo-ic--keyword', { rotation: -25 }, { rotation: 15, duration: 1.1, ...loop });
      gsap.to('.seo-ic--technical', { rotation: 360, duration: 8, repeat: -1, ease: 'none' });
      gsap.to('.seo-ic--onpage', { y: 3, scaleY: 0.92, transformOrigin: '50% 0%', duration: 1.1, ...loop });
      gsap.to('.seo-ic--local', { y: -7, duration: 0.55, ease: 'power2.out', repeat: -1, yoyo: true, repeatDelay: 0.9 });
      gsap.to('.seo-ic--gbp', { rotation: 6, transformOrigin: '50% 100%', duration: 1.2, ...loop });
      gsap.to('.seo-ic--content', { x: -3, y: -3, rotation: -10, transformOrigin: '50% 100%', duration: 0.9, ...loop });
      gsap.to('.seo-ic--offpage', { rotation: 14, scaleX: 1.12, duration: 1.2, ...loop });
      gsap.fromTo('.seo-ic--ecommerce', { rotation: -9 }, { rotation: 9, transformOrigin: '50% 0%', duration: 1.3, ...loop });
      gsap.to('.seo-ic--analytics', { scaleY: 0.78, transformOrigin: '50% 100%', duration: 1, ...loop });
    });

    // Hover: icon circle pops, link arrow slides.
    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const cleanups = gsap.utils.toArray<HTMLElement>('.seo-card').map((card) => {
        const icon = card.querySelector('.seo-card-icon');
        const arrow = card.querySelector('.seo-card-link svg');
        const enter = () => {
          gsap.to(icon, { scale: 1.14, duration: 0.5, ease: 'back.out(2.4)', overwrite: 'auto' });
          gsap.to(arrow, { x: 5, duration: 0.35, ease: 'power3.out' });
        };
        const leave = () => {
          gsap.to(icon, { scale: 1, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
          gsap.to(arrow, { x: 0, duration: 0.4, ease: 'power3.out' });
        };
        card.addEventListener('pointerenter', enter);
        card.addEventListener('pointerleave', leave);
        return () => {
          card.removeEventListener('pointerenter', enter);
          card.removeEventListener('pointerleave', leave);
        };
      });
      return () => cleanups.forEach((fn) => fn());
    });

    // Closing banner.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.seo-ready', start: 'top 90%', once: true },
      });
      SplitText.create('.seo-ready h2', {
        type: 'words',
        mask: 'words',
        autoSplit: true,
        onSplit: (self) => tl.from(self.words, { yPercent: 110, duration: 0.9, stagger: 0.07, ease: 'expo.out' }),
      });
      tl.from('.seo-ready-button', { opacity: 0, y: 20, scale: 0.9, duration: 0.8, ease: 'back.out(1.8)' }, 0.45);
    });
  }, { scope: root });

  return (
    <main ref={root} className="seo-page">
      <section className="seo-hero" aria-labelledby="seo-hero-title">
        <div className="seo-hero-inner">
          <nav className="seo-breadcrumb" aria-label="Breadcrumb">
            <button type="button" onClick={onHomeClick}>Home</button>
            <span aria-hidden="true">/</span>
            <button type="button" onClick={onServicesClick}>Services</button>
            <span aria-hidden="true">/</span>
            <span aria-current="page">SEO &amp; Search Growth</span>
          </nav>

          <div className="seo-hero-copy">
            <span className="seo-overline">SEO &amp; SEARCH GROWTH</span>
            <h1 id="seo-hero-title" className="seo-hero-title">
              <span>Be found by the people</span>
              <strong>looking for you.</strong>
            </h1>
            <p>Improve your website’s search visibility with thoughtful technical, content and local SEO.</p>
          </div>

          <div className="seo-hero-art" aria-hidden="true">
            <img src={heroArt} alt="" />
          </div>
        </div>
      </section>

      <section className="seo-list" aria-labelledby="seo-list-title">
        <div className="seo-list-inner">
          <header className="seo-list-header">
            <h2 id="seo-list-title">Explore our SEO services.</h2>
            <p>Build a stronger foundation for search, one clear step at a time.</p>
          </header>

          <div className="seo-grid">
            {SERVICES.map(({ id, icon: Icon, title, description, tags }) => (
              <article className="seo-card" key={id}>
                <span className="seo-card-icon" aria-hidden="true">
                  <span className={`seo-ic seo-ic--${id}`}>
                    <Icon size={32} strokeWidth={1.7} />
                  </span>
                </span>
                <div className="seo-card-body">
                  <h3 className="seo-card-title">{title}</h3>
                  <p className="seo-card-desc">{description}</p>
                  <div className="seo-card-foot">
                    <ul className="seo-tags" aria-label={`${title} includes`}>
                      {tags.map((tag) => <li className="seo-tag" key={tag}>{tag}</li>)}
                    </ul>
                    <button type="button" className="seo-card-link" onClick={() => { if (!onServiceClick?.(id)) onContactClick?.(); }}>
                      <span>View Service</span>
                      <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServicesCta
        variant="outline"
        title="Not sure where your SEO stands?"
        subtitle="Let’s review your goals and identify a suitable starting point."
        buttonLabel="Book an SEO Consultation"
        onCtaClick={onContactClick}
      />

      <div className="seo-back">
        <button type="button" onClick={onServicesClick}>
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Back to All Services</span>
        </button>
      </div>

      <section className="seo-ready" aria-labelledby="seo-ready-title">
        <div className="seo-ready-inner">
          <h2 id="seo-ready-title">Turn search visibility into your next opportunity.</h2>
          <button type="button" className="seo-ready-button" onClick={onContactClick}>
            <span>Start a Conversation</span>
            <ArrowRight size={19} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default SeoPage;
