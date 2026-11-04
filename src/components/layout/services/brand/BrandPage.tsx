import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { splitReveal } from '../../../../lib/splitReveal';
import { useGSAP } from '@gsap/react';
import heroArt from '../../../../assets/brand-hero-art.png';
import { BRAND_ICONS } from './BrandIcons';
import './BrandPage.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface BrandService {
  id: string;
  title: string;
  description: string;
  tags: [string, string];
}

const SERVICES: BrandService[] = [
  { id: 'discovery', title: 'Brand Discovery & Audit', description: 'Understand where your brand stands and what comes next.', tags: ['Brand workshops', 'Touchpoint review'] },
  { id: 'strategy', title: 'Brand Strategy & Positioning', description: 'Define your place in the market and the value you offer.', tags: ['Audience definition', 'Value proposition'] },
  { id: 'messaging', title: 'Brand Messaging & Voice', description: 'Give your business a clear and consistent way to speak.', tags: ['Core messaging', 'Tone of voice'] },
  { id: 'logo', title: 'Logo & Visual Identity', description: 'Create a recognisable look that reflects your brand.', tags: ['Logo design', 'Colours & typography'] },
  { id: 'guidelines', title: 'Brand Guidelines & Templates', description: 'Keep your identity consistent across everyday work.', tags: ['Brand guidelines', 'Design templates'] },
  { id: 'collateral', title: 'Marketing Collateral Design', description: 'Bring your brand to the materials customers see.', tags: ['Brochures', 'Presentations'] },
  { id: 'website', title: 'Website & Landing Page Design', description: 'Shape your digital experiences around your brand.', tags: ['UI & UX design', 'Landing pages'] },
  { id: 'creative', title: 'Creative Campaigns & Storytelling', description: 'Turn your message into a connected creative idea.', tags: ['Campaign concepts', 'Brand stories'] },
  { id: 'experience', title: 'Brand Experience & Consistency', description: 'Connect the details across your customer touchpoints.', tags: ['Consistency audits', 'Journey review'] },
  { id: 'launch', title: 'Brand Launch & Refresh', description: 'Introduce a new direction with a coordinated plan.', tags: ['Launch planning', 'Brand refresh'] },
];

export interface BrandPageProps {
  onHomeClick?: () => void;
  onServicesClick?: () => void;
  onContactClick?: () => void;
  /** Opens the detail page for a service card id; return false to fall back to contact. */
  onServiceClick?: (id: string) => boolean;
}

export const BrandPage: React.FC<BrandPageProps> = ({ onHomeClick, onServicesClick, onContactClick, onServiceClick }) => {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Hero: masked headline, the brand scene unveils from the right.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.br-breadcrumb', { opacity: 0, y: -12, duration: 0.8 }, 0)
        .from('.br-overline', { opacity: 0, x: -30, duration: 1 }, 0.1)
        .from('.br-hero-copy > p', { opacity: 0, y: 20, duration: 1 }, 0.9)
        .fromTo('.br-hero-art', { clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0%)', duration: 1.5 }, 0.15)
        .from('.br-hero-art img', { scale: 1.2, duration: 2, ease: 'power3.out' }, 0.15);
      SplitText.create('.br-hero-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => splitReveal(self.lines, { yPercent: 115, duration: 1.2, stagger: 0.14 }, tl, 0.3),
      });
    });

    // Slow parallax drift of the scene while you scroll past.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.br-hero-art img', { yPercent: -3 }, {
        yPercent: 3, ease: 'none',
        scrollTrigger: { trigger: '.br-hero', start: 'top top', end: 'bottom top', scrub: true },
      });
    });

    // Cards build in; every icon has its own idle motion.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.br-list-header > *', {
        opacity: 0, y: 24, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.br-list-header', start: 'top 88%', once: true },
      });

      gsap.utils.toArray<HTMLElement>('.br-card').forEach((card, i) => {
        const q = gsap.utils.selector(card);
        gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        })
          .from(card, { opacity: 0, y: 40, duration: 0.9, delay: (i % 2) * 0.12, ease: 'expo.out' })
          .from(q('.br-card-icon'), { scale: 0, rotation: -40, duration: 0.8, ease: 'back.out(2)' }, 0.2)
          .from(q('.br-card-title, .br-card-desc'), { opacity: 0, x: -16, duration: 0.6, stagger: 0.08 }, 0.3)
          .from(q('.br-tag'), { opacity: 0, scale: 0.7, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' }, 0.5)
          .from(q('.br-card-link'), { opacity: 0, x: 14, duration: 0.6 }, 0.55);
      });

      const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;
      gsap.to('.br-card-icon', { y: -3, duration: 2.2, stagger: { each: 0.2, from: 'random' }, ...loop });

      gsap.to('.bi-lens', { x: 4, y: -4, rotation: 8, transformOrigin: '27px 27px', duration: 1.6, ...loop });
      gsap.to('.bi-rings', { scale: 1.06, transformOrigin: '30px 34px', duration: 1.3, ...loop });
      gsap.to('.bi-dart', { x: -2, y: 2, duration: 1.1, ...loop });
      gsap.to('.bi-bubble-a', { y: -3, duration: 1.4, ...loop });
      gsap.to('.bi-bubble-b', { y: 3, duration: 1.7, ...loop });
      gsap.to('.bi-nib', { rotation: 10, transformOrigin: '50% 100%', duration: 1.3, ...loop });
      gsap.to('.bi-lines', { x: 2, duration: 0.9, ...loop });
      gsap.to('.bi-panel-a', { scaleX: 0.9, transformOrigin: '0% 50%', duration: 1.4, ...loop });
      gsap.to('.bi-panel-c', { scaleX: 0.9, transformOrigin: '100% 50%', duration: 1.4, ...loop });
      gsap.to('.bi-panel-b', { scaleY: 1.04, transformOrigin: '50% 50%', duration: 1.4, ...loop });
      gsap.fromTo('.bi-dots circle', { opacity: 0.3 }, { opacity: 1, duration: 0.5, repeat: -1, yoyo: true, stagger: 0.18, repeatDelay: 0.5 });
      gsap.to('.bi-screen', { scaleX: 0.88, transformOrigin: '0% 50%', duration: 1.3, ...loop });
      gsap.fromTo('.bi-glow', { scale: 0.85, opacity: 0.08, transformOrigin: '32px 26px' }, { scale: 1.2, opacity: 0.28, duration: 1.2, ...loop });
      gsap.to('.bi-node', { scale: 1.12, transformOrigin: '50% 50%', duration: 1, stagger: 0.25, ...loop });
      gsap.fromTo('.bi-links', { opacity: 0.45 }, { opacity: 1, duration: 1, ...loop });
      gsap.to('.bi-arrow', { y: -4, duration: 0.8, ...loop });
    });

    // Hover: icon tile springs, link arrow slides.
    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const cleanups = gsap.utils.toArray<HTMLElement>('.br-card').map((card) => {
        const icon = card.querySelector('.br-card-icon');
        const arrow = card.querySelector('.br-card-link svg');
        const enter = () => {
          gsap.to(icon, { scale: 1.12, rotation: 5, duration: 0.5, ease: 'back.out(2.4)', overwrite: 'auto' });
          gsap.to(arrow, { x: 5, duration: 0.35, ease: 'power3.out' });
        };
        const leave = () => {
          gsap.to(icon, { scale: 1, rotation: 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
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

    // CTA card.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      // The CSS transform transition must be off while GSAP reads the end state; cleared for hover.
      gsap.set('.br-cta-button', { transition: 'none' });
      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.br-cta', start: 'top 88%', once: true },
      })
        .from('.br-cta-card', { opacity: 0, y: 40, duration: 0.9, ease: 'expo.out' })
        .from('.br-cta-copy h2, .br-cta-copy p', { opacity: 0, x: -22, duration: 0.8, stagger: 0.12 }, 0.3)
        .from('.br-cta-button', { opacity: 0, scale: 0.85, duration: 0.8, ease: 'back.out(1.8)', clearProps: 'transform,opacity,transition' }, 0.5)
        .from('.br-cta-back', { opacity: 0, y: 10, duration: 0.6 }, 0.7);
    });
  }, { scope: root });

  return (
    <main ref={root} className="brand-page">
      <section className="br-hero" aria-labelledby="br-hero-title">
        <div className="br-hero-inner">
          <nav className="br-breadcrumb" aria-label="Breadcrumb">
            <button type="button" onClick={onHomeClick}>Home</button>
            <span aria-hidden="true">/</span>
            <button type="button" onClick={onServicesClick}>Services</button>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Brand Growth &amp; Creative</span>
          </nav>

          <div className="br-hero-copy">
            <span className="br-overline">BRAND GROWTH &amp; CREATIVE</span>
            <h1 id="br-hero-title" className="br-hero-title">
              <span>A clearer identity.</span>
              <strong>A stronger connection.</strong>
            </h1>
            <p>Bring your positioning, visual identity and brand experience together with purpose.</p>
          </div>
        </div>
        <div className="br-hero-art" aria-hidden="true">
          <img src={heroArt} alt="" />
        </div>
      </section>

      <section className="br-list" aria-labelledby="br-list-title">
        <div className="br-list-inner">
          <header className="br-list-header">
            <h2 id="br-list-title">Explore our brand growth services.</h2>
            <p>Build a brand people can understand, recognise and remember.</p>
          </header>

          <div className="br-grid">
            {SERVICES.map(({ id, title, description, tags }) => (
              <article className="br-card" key={id}>
                <span className="br-card-icon" aria-hidden="true">{BRAND_ICONS[id]}</span>
                <div className="br-card-body">
                  <h3 className="br-card-title">{title}</h3>
                  <p className="br-card-desc">{description}</p>
                  <div className="br-card-foot">
                    <ul className="br-tags" aria-label={`${title} includes`}>
                      {tags.map((tag) => <li className="br-tag" key={tag}>{tag}</li>)}
                    </ul>
                    <button type="button" className="br-card-link" onClick={() => { if (!onServiceClick?.(id)) onContactClick?.(); }}>
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

      <section className="br-cta" aria-labelledby="br-cta-title">
        <div className="br-cta-card">
          <div className="br-cta-copy">
            <h2 id="br-cta-title">Ready to give your brand a clearer direction?</h2>
            <p>Let’s explore your goals and shape the next step.</p>
          </div>
          <div className="br-cta-actions">
            <button type="button" className="br-cta-button" onClick={onContactClick}>Book a Brand Consultation</button>
            <button type="button" className="br-cta-back" onClick={onServicesClick}>
              <ArrowLeft size={17} aria-hidden="true" />
              <span>Back to All Services</span>
            </button>
          </div>
        </div>
      </section>

    </main>
  );
};

export default BrandPage;
