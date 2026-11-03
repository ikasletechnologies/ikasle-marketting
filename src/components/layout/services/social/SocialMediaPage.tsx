import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { splitReveal } from '../../../../lib/splitReveal';
import { useGSAP } from '@gsap/react';
import heroArt from '../../../../assets/social-hero-art.png';
import { ServicesCta } from '../ServicesCta';
import { SOCIAL_ICONS } from './SocialIcons';
import './SocialMediaPage.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

interface SocialService {
  id: string;
  icon: keyof typeof SOCIAL_ICONS;
  title: string;
  description: string;
  tags: [string, string];
}

const SERVICES: SocialService[] = [
  { id: 'strategy', icon: 'strategy', title: 'Social Media Strategy', description: 'Give your social presence a clear direction.', tags: ['Platform planning', 'Content pillars'] },
  { id: 'profile', icon: 'profile', title: 'Profile Setup & Optimisation', description: 'Make your brand clear and consistent across profiles.', tags: ['Profile branding', 'Bio optimisation'] },
  { id: 'management', icon: 'management', title: 'Social Media Management', description: 'Keep your channels active and organised.', tags: ['Post scheduling', 'Publishing'] },
  { id: 'planning', icon: 'planning', title: 'Content Planning & Calendars', description: 'Plan relevant content around your audience and goals.', tags: ['Monthly calendars', 'Campaign themes'] },
  { id: 'posts', icon: 'posts', title: 'Creative Posts & Carousels', description: 'Turn your message into engaging visual content.', tags: ['Static posts', 'Carousel design'] },
  { id: 'reels', icon: 'reels', title: 'Reels & Short-Form Video', description: 'Bring your brand story to life through video.', tags: ['Video concepts', 'Editing'] },
  { id: 'community', icon: 'community', title: 'Community Management', description: 'Support meaningful conversations with your audience.', tags: ['Comment responses', 'Inbox coordination'] },
  { id: 'advertising', icon: 'advertising', title: 'Social Media Advertising', description: 'Reach relevant audiences with targeted campaigns.', tags: ['Meta campaigns', 'Creative testing'] },
  { id: 'influencer', icon: 'influencer', title: 'Influencer & Creator Campaigns', description: 'Build collaborations with relevant creators.', tags: ['Creator research', 'Campaign coordination'] },
  { id: 'analytics', icon: 'analytics', title: 'Social Analytics & Reporting', description: 'Learn what content and campaigns contribute.', tags: ['Performance reviews', 'Content insights'] },
];

export interface SocialMediaPageProps {
  onHomeClick?: () => void;
  onServicesClick?: () => void;
  onContactClick?: () => void;
  onStrategyClick?: () => void;
  onProfileClick?: () => void;

  onManagementClick?: () => void;
  onPostsClick?: () => void;
  /** Opens the detail page for a service card id; used when no specific handler is set. */
  onServiceClick?: (id: string) => void;
}

export const SocialMediaPage: React.FC<SocialMediaPageProps> = ({
  onHomeClick,
  onServicesClick,
  onContactClick,
  onStrategyClick,
  onProfileClick,
  onManagementClick,
  onPostsClick,
  onServiceClick,
}) => {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Hero: masked headline, then the phone rises and settles.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.sm-breadcrumb', { opacity: 0, y: -12, duration: 0.8 }, 0)
        .from('.sm-overline', { opacity: 0, x: -30, duration: 1 }, 0.1)
        .from('.sm-hero-copy > p', { opacity: 0, y: 20, duration: 1 }, 0.9)
        .from('.sm-hero-art', { opacity: 0, y: 70, rotation: 3, scale: 0.94, duration: 1.5 }, 0.2);
      SplitText.create('.sm-hero-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => splitReveal(self.lines, { yPercent: 115, duration: 1.2, stagger: 0.14 }, tl, 0.3),
      });
      gsap.to('.sm-hero-art img', { y: -12, rotation: 0.6, duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    });

    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const hero = root.current?.querySelector<HTMLElement>('.sm-hero');
      const art = root.current?.querySelector<HTMLElement>('.sm-hero-art');
      if (!hero || !art) return;
      const ry = gsap.quickTo(art, 'rotationY', { duration: 1.1, ease: 'power3.out' });
      const rx = gsap.quickTo(art, 'rotationX', { duration: 1.1, ease: 'power3.out' });
      gsap.set(art, { transformPerspective: 1000 });
      const move = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 8);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 6);
      };
      const leave = () => { ry(0); rx(0); };
      hero.addEventListener('pointermove', move);
      hero.addEventListener('pointerleave', leave);
      return () => {
        hero.removeEventListener('pointermove', move);
        hero.removeEventListener('pointerleave', leave);
      };
    });

    // Cards build in; every icon has its own idle motion.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from('.sm-list-header > *', {
        opacity: 0, y: 24, duration: 0.9, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.sm-list-header', start: 'top 88%', once: true },
      });

      gsap.utils.toArray<HTMLElement>('.sm-card').forEach((card, i) => {
        const q = gsap.utils.selector(card);
        gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: card, start: 'top 90%', once: true },
        })
          .from(card, { opacity: 0, y: 40, duration: 0.9, delay: (i % 2) * 0.12, ease: 'expo.out' })
          .from(q('.sm-card-icon'), { scale: 0, rotation: 50, duration: 0.8, ease: 'back.out(2)' }, 0.2)
          .from(q('.sm-card-title, .sm-card-desc'), { opacity: 0, x: -16, duration: 0.6, stagger: 0.08 }, 0.3)
          .from(q('.sm-tag'), { opacity: 0, scale: 0.7, duration: 0.5, stagger: 0.08, ease: 'back.out(2)' }, 0.5)
          .from(q('.sm-card-link'), { opacity: 0, x: 14, duration: 0.6 }, 0.55);
      });

      const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;
      gsap.to('.sm-card-icon', { y: -3, duration: 2.2, stagger: { each: 0.2, from: 'random' }, ...loop });

      gsap.fromTo('.si-needle', { rotation: -35, transformOrigin: '32px 34px' }, { rotation: 35, duration: 1.8, ...loop });
      gsap.to('.si-gear', { rotation: 360, transformOrigin: '0px 0px', duration: 6, repeat: -1, ease: 'none' });
      gsap.fromTo('.si-check', { scale: 0.85, transformOrigin: '46px 46px' }, { scale: 1.1, duration: 0.9, ...loop });
      gsap.to('.si-pencil', { x: -3, y: -4, rotation: -6, transformOrigin: '50% 100%', duration: 1.1, ...loop });
      gsap.to('.si-frame', { rotation: 3, transformOrigin: '50% 50%', scale: 1.04, duration: 1.8, ...loop });
      gsap.to('.si-clap', { rotation: -10, transformOrigin: '6px 22px', duration: 0.6, repeat: -1, yoyo: true, repeatDelay: 1.2, ease: 'power2.inOut' });
      gsap.to('.si-play', { scale: 1.18, transformOrigin: '50% 50%', duration: 0.9, ...loop });
      gsap.to('.si-bubble-a', { y: -3, duration: 1.4, ...loop });
      gsap.to('.si-bubble-b', { y: 3, duration: 1.7, ...loop });
      gsap.fromTo('.si-dot', { opacity: 0.3, y: 0 }, { opacity: 1, y: -2, duration: 0.45, ease: 'sine.inOut', repeat: -1, yoyo: true, repeatDelay: 0.8, stagger: 0.15 });
      gsap.to('.si-mega', { rotation: -5, transformOrigin: '20% 80%', duration: 1.3, ...loop });
      gsap.fromTo('.si-wave', { opacity: 0, x: -3 }, { opacity: 1, x: 4, duration: 1.1, ease: 'power1.out', repeat: -1 });
      gsap.to('.si-p-mid', { y: -4, duration: 1.3, ...loop });
      gsap.to('.si-p-side', { y: 2, duration: 1.6, ...loop });
      gsap.fromTo('.si-col', { scaleY: 0.35, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 0.9, ease: 'power2.out', stagger: 0.15, repeat: -1, yoyo: true, repeatDelay: 0.8 });
    });

    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const cleanups = gsap.utils.toArray<HTMLElement>('.sm-card').map((card) => {
        const icon = card.querySelector('.sm-card-icon');
        const arrow = card.querySelector('.sm-card-link svg');
        const enter = () => {
          gsap.to(icon, { scale: 1.12, rotation: -6, duration: 0.5, ease: 'back.out(2.4)', overwrite: 'auto' });
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

    // Closing banner.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.sm-ready', start: 'top 90%', once: true },
      });
      SplitText.create('.sm-ready h2', {
        type: 'words',
        mask: 'words',
        autoSplit: true,
        onSplit: (self) => splitReveal(self.words, { yPercent: 110, duration: 0.9, stagger: 0.08, ease: 'expo.out' }, tl),
      });
      tl.from('.sm-ready-button', { opacity: 0, scale: 0.85, duration: 0.8, ease: 'back.out(1.8)' }, 0.4);
    });
  }, { scope: root });

  return (
    <main ref={root} className="social-page">
      <section className="sm-hero" aria-labelledby="sm-hero-title">
        <div className="sm-hero-inner">
          <nav className="sm-breadcrumb" aria-label="Breadcrumb">
            <button type="button" onClick={onHomeClick}>Home</button>
            <span aria-hidden="true">/</span>
            <button type="button" onClick={onServicesClick}>Services</button>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Social Media Marketing</span>
          </nav>

          <div className="sm-hero-copy">
            <span className="sm-overline">SOCIAL MEDIA MARKETING</span>
            <h1 id="sm-hero-title" className="sm-hero-title">
              <span>Build your presence.</span>
              <strong>Connect with your people.</strong>
            </h1>
            <p>Strategy, content and community management that bring your brand’s social presence together.</p>
          </div>

          <div className="sm-hero-art" aria-hidden="true">
            <img src={heroArt} alt="" />
          </div>
        </div>
      </section>

      <section className="sm-list" aria-labelledby="sm-list-title">
        <div className="sm-list-inner">
          <header className="sm-list-header">
            <h2 id="sm-list-title">Explore our social media services.</h2>
            <p>Choose focused support or a connected plan for your brand.</p>
          </header>

          <div className="sm-grid">
            {SERVICES.map((service, index) => (
              <article className="sm-card" key={service.id}>
                <span className="sm-card-icon" aria-hidden="true">{SOCIAL_ICONS[service.icon]}</span>
                <div className="sm-card-body">
                  <h3 className="sm-card-title">
                    <span className="sm-card-number">{String(index + 1).padStart(2, '0')}.</span>
                    {service.title}
                  </h3>
                  <p className="sm-card-desc">{service.description}</p>
                  <ul className="sm-tags" aria-label={`${service.title} includes`}>
                    {service.tags.map((tag) => <li className="sm-tag" key={tag}>{tag}</li>)}
                  </ul>
                </div>
                <button
                  type="button"
                  className="sm-card-link"
                  onClick={service.id === 'strategy' && onStrategyClick ? onStrategyClick : service.id === 'profile' && onProfileClick ? onProfileClick : service.id === 'management' && onManagementClick ? onManagementClick : service.id === 'posts' && onPostsClick ? onPostsClick : onServiceClick ? () => onServiceClick(service.id) : onContactClick}
                >
                  <span>View Service</span>
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServicesCta
        tone="blue"
        title="Let’s find your brand’s social direction."
        subtitle="Tell us where you are and what you want to build."
        onCtaClick={onContactClick}
      />

      <div className="sm-back">
        <button type="button" onClick={onServicesClick}>
          <ArrowLeft size={18} aria-hidden="true" />
          <span>Back to All Services</span>
        </button>
      </div>

      <section className="sm-ready" aria-labelledby="sm-ready-title">
        <div className="sm-ready-inner">
          <h2 id="sm-ready-title">Ready to start a conversation?</h2>
          <button type="button" className="sm-ready-button" onClick={onContactClick}>
            <span>Start a Conversation</span>
            <ArrowRight size={19} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>
      </section>
    </main>
  );
};

export default SocialMediaPage;
