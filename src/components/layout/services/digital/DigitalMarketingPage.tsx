import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import heroArt from '../../../../assets/digital-hero-art.png';
import motionBackground from '../../../../assets/about-cta-blue-flow.png';
import { ServicesCta } from '../ServicesCta';
import { DIGITAL_ICONS } from './DigitalIcons';
import './DigitalMarketingPage.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface DigitalService {
  id: string;
  icon: keyof typeof DIGITAL_ICONS;
  title: string;
  description: string;
  tags: [string, string];
}

const SERVICES: DigitalService[] = [
  { id: 'strategy', icon: 'strategy', title: 'Digital Marketing Strategy', description: 'Turn business goals into a clear marketing roadmap.', tags: ['Marketing audits', 'Channel planning'] },
  { id: 'research', icon: 'research', title: 'Audience & Competitor Research', description: 'Understand your customers and the market around them.', tags: ['Audience insights', 'Competitor analysis'] },
  { id: 'google-ads', icon: 'google', title: 'Google Search Ads', description: 'Reach people actively searching for your offering.', tags: ['Keyword targeting', 'Campaign optimisation'] },
  { id: 'display-youtube', icon: 'video', title: 'Display & YouTube Advertising', description: 'Build awareness through relevant visual and video campaigns.', tags: ['Display campaigns', 'Video advertising'] },
  { id: 'meta-ads', icon: 'meta', title: 'Meta Advertising', description: 'Connect with relevant audiences on Facebook and Instagram.', tags: ['Audience targeting', 'Creative testing'] },
  { id: 'content', icon: 'content', title: 'Content Marketing', description: 'Create useful content that supports your customer journey.', tags: ['Website copy', 'Content planning'] },
  { id: 'email', icon: 'email', title: 'Email Marketing', description: 'Keep your audience informed with relevant campaigns.', tags: ['Newsletters', 'Email sequences'] },
  { id: 'leads', icon: 'leads', title: 'Lead Generation & Nurturing', description: 'Guide interested prospects towards a meaningful enquiry.', tags: ['Lead campaigns', 'Follow-up journeys'] },
  { id: 'landing', icon: 'landing', title: 'Landing Pages & CRO', description: 'Make the next step clearer for website visitors.', tags: ['Landing pages', 'Conversion testing'] },
  { id: 'analytics', icon: 'analytics', title: 'Analytics & Conversion Tracking', description: 'Understand campaign activity and measure meaningful actions.', tags: ['GA4 & GTM', 'Performance reporting'] },
];

export interface DigitalMarketingPageProps {
  onHomeClick?: () => void;
  onServicesClick?: () => void;
  onContactClick?: () => void;
  onStrategyClick?: () => void;
  onResearchClick?: () => void;
  onGoogleAdsClick?: () => void;
  onDisplayYoutubeClick?: () => void;
  onMetaAdsClick?: () => void;
  onContentClick?: () => void;
  onEmailClick?: () => void;
  onLeadsClick?: () => void;
  onLandingClick?: () => void;
  onAnalyticsClick?: () => void;
}

export const DigitalMarketingPage: React.FC<DigitalMarketingPageProps> = ({
  onHomeClick,
  onServicesClick,
  onContactClick,
  onStrategyClick,
  onResearchClick,
  onGoogleAdsClick,
  onDisplayYoutubeClick,
  onMetaAdsClick,
  onContentClick,
  onEmailClick,
  onLeadsClick,
  onLandingClick,
  onAnalyticsClick,
}) => {
  const root = useRef<HTMLElement>(null);

  const openDigitalService = (serviceId: string) => {
    if (serviceId === 'strategy') onStrategyClick?.();
    else if (serviceId === 'research') onResearchClick?.();
    else if (serviceId === 'google-ads') onGoogleAdsClick?.();
    else if (serviceId === 'display-youtube') onDisplayYoutubeClick?.();
    else if (serviceId === 'meta-ads') onMetaAdsClick?.();
    else if (serviceId === 'content') onContentClick?.();
    else if (serviceId === 'email') onEmailClick?.();
    else if (serviceId === 'leads') onLeadsClick?.();
    else if (serviceId === 'landing') onLandingClick?.();
    else if (serviceId === 'analytics') onAnalyticsClick?.();
    else onContactClick?.();
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Hero: masked headline lines, art slides in from the right.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.dm-breadcrumb', { opacity: 0, y: -12, duration: 0.8 }, 0)
        .from('.dm-overline', { opacity: 0, letterSpacing: '0.7em', duration: 1.1 }, 0.1)
        .from('.dm-hero-copy > p', { opacity: 0, y: 20, duration: 1 }, 0.9)
        .from('.dm-hero-art', { opacity: 0, x: 80, scale: 0.92, duration: 1.4 }, 0.2);
      SplitText.create('.dm-hero-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => tl.from(self.lines, { yPercent: 115, duration: 1.2, stagger: 0.14 }, 0.3),
      });

      // Art floats, and drifts a little with the pointer.
      gsap.to('.dm-hero-art img', { y: -10, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });

    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const hero = root.current?.querySelector<HTMLElement>('.dm-hero');
      const art = root.current?.querySelector<HTMLElement>('.dm-hero-art');
      if (!hero || !art) return;
      const ax = gsap.quickTo(art, 'x', { duration: 1.1, ease: 'power3.out' });
      const ay = gsap.quickTo(art, 'rotationY', { duration: 1.1, ease: 'power3.out' });
      gsap.set(art, { transformPerspective: 900 });
      const move = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        ax(nx * 22);
        ay(nx * 6);
      };
      const leave = () => { ax(0); ay(0); };
      hero.addEventListener('pointermove', move);
      hero.addEventListener('pointerleave', leave);
      return () => {
        hero.removeEventListener('pointermove', move);
        hero.removeEventListener('pointerleave', leave);
      };
    });

    // List: header, then each card builds in; every icon has its own idle loop.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.dm-list-header > *', {
        opacity: 0, y: 24, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.dm-list-header', start: 'top 88%', once: true },
      });

      gsap.utils.toArray<HTMLElement>('.dm-card').forEach((card, i) => {
        const q = gsap.utils.selector(card);
        gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        })
          .from(card, { opacity: 0, y: 44, duration: 0.9, delay: (i % 2) * 0.12, ease: 'expo.out' })
          .from(q('.dm-card-number'), { opacity: 0, x: -14, duration: 0.6 }, 0.2)
          .from(q('.dm-card-icon'), { scale: 0, rotation: -60, duration: 0.8, ease: 'back.out(2)' }, 0.2)
          .from(q('.dm-card-body h3, .dm-card-body p'), { opacity: 0, y: 12, duration: 0.6, stagger: 0.08 }, 0.35)
          .from(q('.dm-tag'), { opacity: 0, scale: 0.7, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' }, 0.55)
          .from(q('.dm-card-link'), { opacity: 0, x: 14, duration: 0.6 }, 0.6);
      });

      const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;
      gsap.to('.dm-card-icon', { y: -3, duration: 2.2, stagger: { each: 0.2, from: 'random' }, ...loop });

      gsap.to('.ic-ring', { scale: 1.06, transformOrigin: '30px 34px', duration: 1.4, ...loop });
      gsap.to('.ic-arrow', { x: -2, y: 2, duration: 1.2, ...loop });
      gsap.to('.ic-lens', { x: 4, y: -4, rotation: 6, transformOrigin: '27px 27px', duration: 1.8, ...loop });
      gsap.to('.ic-bar-a', { rotation: '+=8', transformOrigin: '41px 26px', duration: 1.6, ...loop });
      gsap.to('.ic-bar-b', { rotation: '-=8', transformOrigin: '21px 33px', duration: 1.6, ...loop });
      gsap.to('.ic-dot', { scale: 1.25, transformOrigin: '50% 50%', duration: 1, ...loop });
      gsap.to('.ic-play', { scale: 1.2, transformOrigin: '50% 50%', duration: 0.9, ...loop });
      gsap.fromTo('.ic-loop', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut', repeat: -1, repeatDelay: 1.2 });
      gsap.to('.ic-lines', { x: 2, duration: 0.9, ...loop });
      gsap.to('.ic-pencil', { x: -3, y: -3, rotation: -6, transformOrigin: '50% 100%', duration: 1.1, ...loop });
      gsap.to('.ic-flap', { scaleY: 0.82, transformOrigin: '50% 0%', duration: 1.2, ...loop });
      gsap.to('.ic-funnel', { scaleX: 1.05, transformOrigin: '50% 0%', duration: 1.3, ...loop });
      gsap.to('.ic-badge', { y: -3, scale: 1.08, transformOrigin: '50% 50%', duration: 1.1, ...loop });
      gsap.to('.ic-cursor', { x: -8, y: -6, duration: 0.9, ...loop });
      gsap.fromTo('.ic-col', { scaleY: 0.35, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.9, ease: 'power2.out', stagger: 0.15, repeat: -1, yoyo: true, repeatDelay: 0.8 });
    });

    // Hover: the icon bubble springs and the link arrow slides.
    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const cleanups = gsap.utils.toArray<HTMLElement>('.dm-card').map((card) => {
        const icon = card.querySelector('.dm-card-icon');
        const arrow = card.querySelector('.dm-card-link svg');
        const enter = () => {
          gsap.to(icon, { scale: 1.12, rotation: 6, duration: 0.5, ease: 'back.out(2.4)', overwrite: 'auto' });
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

    // Closing banner: plane glides, words rise.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.dm-motion', start: 'top 88%', once: true },
      });
      tl.from('.dm-motion-plane', { x: -60, y: 30, opacity: 0, rotation: -25, duration: 1.1, ease: 'expo.out' })
        .from('.dm-motion-divider', { scaleY: 0, duration: 0.7 }, 0.3);
      SplitText.create('.dm-motion h2', {
        type: 'words',
        mask: 'words',
        autoSplit: true,
        onSplit: (self) => tl.from(self.words, { yPercent: 110, duration: 0.9, stagger: 0.07, ease: 'expo.out' }, 0.35),
      });
      tl.from('.dm-motion-button', { opacity: 0, scale: 0.85, duration: 0.8, ease: 'back.out(1.8)' }, 0.7);
      gsap.to('.dm-motion-plane svg', { x: 6, y: -6, rotation: 4, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });
  }, { scope: root });

  return (
    <main ref={root} className="digital-page">
      <section className="dm-hero" aria-labelledby="dm-hero-title">
        <div className="dm-hero-inner">
          <nav className="dm-breadcrumb" aria-label="Breadcrumb">
            <button type="button" onClick={onHomeClick}>Home</button>
            <span aria-hidden="true">/</span>
            <button type="button" onClick={onServicesClick}>Services</button>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Digital Marketing</span>
          </nav>

          <div className="dm-hero-copy">
            <span className="dm-overline">DIGITAL MARKETING</span>
            <h1 id="dm-hero-title" className="dm-hero-title">
              <span>One clear strategy.</span>
              <strong>More ways to grow.</strong>
            </h1>
            <p>Explore focused services for planning, advertising, content and measurable marketing.</p>
          </div>

          <div className="dm-hero-art" aria-hidden="true">
            <img src={heroArt} alt="" />
          </div>
        </div>
      </section>

      <section className="dm-list" aria-labelledby="dm-list-title">
        <div className="dm-list-inner">
          <header className="dm-list-header">
            <h2 id="dm-list-title">Explore our digital marketing services.</h2>
            <p>Choose a focused service or bring them together in one connected plan.</p>
          </header>

          <div className="dm-grid">
            {SERVICES.map((service, index) => (
              <article className="dm-card" key={service.id} role="link" tabIndex={0} onClick={() => openDigitalService(service.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') openDigitalService(service.id); }}>
                <span className="dm-card-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
                <span className="dm-card-icon" aria-hidden="true">{DIGITAL_ICONS[service.icon]}</span>
                <div className="dm-card-body">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="dm-card-foot">
                    <ul className="dm-tags" aria-label={`${service.title} includes`}>
                      {service.tags.map((tag) => <li className="dm-tag" key={tag}>{tag}</li>)}
                    </ul>
                    <button type="button" className="dm-card-link" onClick={(event) => { event.stopPropagation(); openDigitalService(service.id); }}>
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
        title="Not sure which service fits your goals?"
        subtitle="Let’s build a suitable plan together."
        onCtaClick={onContactClick}
      />

      <div className="dm-back">
        <button type="button" onClick={onServicesClick}>
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Back to All Services</span>
        </button>
      </div>

      <section className="dm-motion" style={{ backgroundImage: `url(${motionBackground})` }} aria-labelledby="dm-motion-title">
        <div className="dm-motion-inner">
          <span className="dm-motion-plane" aria-hidden="true">
            <Send size={46} strokeWidth={1.3} />
          </span>
          <span className="dm-motion-divider" aria-hidden="true" />
          <h2 id="dm-motion-title">Let’s put your next move into motion.</h2>
          <button type="button" className="dm-motion-button" onClick={onContactClick}>
            <span>Start a Conversation</span>
            <ArrowRight size={19} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default DigitalMarketingPage;
