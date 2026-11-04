import React, { useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  CalendarDays,
  ChartLine,
  ChartNoAxesColumnIncreasing,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  Mail,
  Megaphone,
  MapPin,
  MousePointer2,
  Palette,
  Play,
  Settings,
  Target,
  UsersRound,
} from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { splitReveal } from '../../../lib/splitReveal';
import { useGSAP } from '@gsap/react';
import WebThreads from '../../effects/WebThreads';
import digitalArt from '../../../assets/listing-digital.png';
import socialArt from '../../../assets/listing-social.png';
import seoArt from '../../../assets/listing-seo.png';
import brandArt from '../../../assets/listing-brand.png';
import './ServicesListing.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

type ArtKind = 'digital' | 'social' | 'seo' | 'brand';

interface ListingService {
  id: string;
  kind: ArtKind;
  number: string;
  art: string;
  title: string;
  description: string;
  features: { label: string; icon: LucideIcon }[];
  linkText: string;
}

const SERVICES: ListingService[] = [
  {
    id: 'digital-marketing',
    kind: 'digital',
    number: '01',
    art: digitalArt,
    title: 'Digital Marketing',
    description: 'Connect your audience, campaigns and content with a clear plan.',
    features: [
      { label: 'Marketing Strategy', icon: Target },
      { label: 'Google & Meta Ads', icon: ChartNoAxesColumnIncreasing },
      { label: 'Content & Email Marketing', icon: Mail },
      { label: 'Analytics & Reporting', icon: ChartLine },
    ],
    linkText: 'Explore Digital Marketing',
  },
  {
    id: 'social-media',
    kind: 'social',
    number: '02',
    art: socialArt,
    title: 'Social Media Marketing',
    description: 'Build a consistent presence that connects with your audience.',
    features: [
      { label: 'Social Media Strategy', icon: UsersRound },
      { label: 'Account Management', icon: CalendarDays },
      { label: 'Creative Design & Reels', icon: Play },
      { label: 'Social Advertising', icon: Megaphone },
    ],
    linkText: 'Explore Social Media',
  },
  {
    id: 'seo-search',
    kind: 'seo',
    number: '03',
    art: seoArt,
    title: 'SEO & Search Growth',
    description: 'Help the right people discover your business through search.',
    features: [
      { label: 'Technical SEO', icon: Settings },
      { label: 'On-Page Optimisation', icon: FileText },
      { label: 'Local SEO', icon: MapPin },
      { label: 'SEO Content & Reporting', icon: ChartNoAxesColumnIncreasing },
    ],
    linkText: 'Explore SEO',
  },
  {
    id: 'brand-growth',
    kind: 'brand',
    number: '04',
    art: brandArt,
    title: 'Brand Growth & Creative',
    description: 'Create an identity and experience people recognise and remember.',
    features: [
      { label: 'Brand Strategy & Positioning', icon: Lightbulb },
      { label: 'Visual Identity', icon: Palette },
      { label: 'Creative Campaigns', icon: ImageIcon },
      { label: 'Website Design & CRO', icon: MousePointer2 },
    ],
    linkText: 'Explore Branding',
  },
];

export interface ServicesListingProps {
  onServiceClick?: (serviceId: string) => void;
}

export const ServicesListing: React.FC<ServicesListingProps> = ({ onServiceClick }) => {
  const root = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Entrance: header, then each card builds itself piece by piece.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const head = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.listing-header', start: 'top 85%', once: true },
      });
      head.from('.listing-eyebrow', { opacity: 0, letterSpacing: '0.7em', duration: 1 });
      SplitText.create('.listing-title', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => splitReveal(self.lines, { yPercent: 110, duration: 1.1, ease: 'expo.out' }, head, 0.1),
      });
      head.from('.listing-subtitle', { opacity: 0, y: 18, duration: 0.9 }, 0.5);

      gsap.utils.toArray<HTMLElement>('.listing-card').forEach((card, i) => {
        const q = gsap.utils.selector(card);
        // These carry CSS transform transitions, which would make GSAP capture the offset start
        // position as final. Clearing afterwards restores the hover effects.
        const clearProps = 'transform,opacity,transition';
        gsap.set([card, ...q('.listing-feature'), ...q('.listing-button')], { transition: 'none' });
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: card, start: 'top 88%', once: true },
        });
        tl.from(card, { opacity: 0, y: 60, duration: 1, delay: (i % 2) * 0.15, ease: 'expo.out', clearProps })
          .from(q('.listing-number'), { opacity: 0, x: -18, duration: 0.7 }, 0.25)
          .from(q('.listing-art'), { opacity: 0, scale: 0.7, rotation: -8, filter: 'blur(14px)', duration: 1.2, ease: 'back.out(1.5)', clearProps: 'filter' }, 0.2)
          .from(q('.listing-card-title, .listing-card-desc'), { opacity: 0, y: 16, duration: 0.8, stagger: 0.1 }, 0.45)
          .from(q('.listing-feature'), { opacity: 0, x: -18, duration: 0.6, stagger: 0.09, clearProps }, 0.65)
          .from(q('.listing-feature-icon'), { scale: 0, rotation: -90, duration: 0.6, stagger: 0.09, ease: 'back.out(2.4)' }, 0.7)
          .from(q('.listing-button'), { opacity: 0, y: 14, scale: 0.92, duration: 0.7, ease: 'back.out(1.8)', clearProps }, 1);
      });
    });

    // Idle motion: every illustration moves in its own way.
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;

      // Megaphone: a gentle recoil plus sound waves leaving the bell.
      gsap.to('.listing-card--digital .listing-art', { rotation: -4, x: -5, transformOrigin: '30% 80%', duration: 1.6, ...loop });
      gsap.fromTo('.listing-card--digital .listing-wave',
        { scale: 0.5, opacity: 0.55 },
        { scale: 1.9, opacity: 0, duration: 2.2, ease: 'power1.out', repeat: -1, stagger: 0.7 });

      // Chat bubbles: float and sway while little bubbles drift up.
      gsap.to('.listing-card--social .listing-art', { y: -12, rotation: 2.5, duration: 2.4, ...loop });
      gsap.fromTo('.listing-card--social .listing-pop',
        { y: 0, scale: 0.4, opacity: 0 },
        { y: -46, scale: 1, opacity: 0.8, duration: 2.6, ease: 'power1.out', repeat: -1, stagger: 0.9 });

      // Magnifier: sweeps in a lazy circle while a glint crosses the lens.
      gsap.to('.listing-card--seo .listing-art', { x: 8, y: -8, rotation: 4, transformOrigin: '20% 85%', duration: 2.2, ...loop });
      gsap.fromTo('.listing-card--seo .listing-glint',
        { xPercent: -140, opacity: 0 },
        { xPercent: 180, opacity: 1, duration: 1.6, ease: 'power2.inOut', repeat: -1, repeatDelay: 1.8 });

      // Brand loop: swings in 3D and breathes.
      gsap.set('.listing-card--brand .listing-art', { transformPerspective: 700 });
      gsap.to('.listing-card--brand .listing-art', { rotationY: 16, rotationX: -6, scale: 1.04, duration: 2.8, ...loop });
    });

    // Hover: tilt the illustration toward the pointer, spin the feature icons.
    mm.add('(prefers-reduced-motion: no-preference) and (hover: hover)', () => {
      const cleanups = gsap.utils.toArray<HTMLElement>('.listing-card').map((card) => {
        const art = card.querySelector<HTMLElement>('.listing-art-tilt');
        if (!art) return () => undefined;
        const rx = gsap.quickTo(art, 'rotationX', { duration: 0.6, ease: 'power3.out' });
        const ry = gsap.quickTo(art, 'rotationY', { duration: 0.6, ease: 'power3.out' });
        const sc = gsap.quickTo(art, 'scale', { duration: 0.6, ease: 'power3.out' });
        gsap.set(art, { transformPerspective: 800 });

        const move = (e: PointerEvent) => {
          const r = card.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 22);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 22);
        };
        const enter = () => sc(1.08);
        const leave = () => { rx(0); ry(0); sc(1); };
        card.addEventListener('pointermove', move);
        card.addEventListener('pointerenter', enter);
        card.addEventListener('pointerleave', leave);
        return () => {
          card.removeEventListener('pointermove', move);
          card.removeEventListener('pointerenter', enter);
          card.removeEventListener('pointerleave', leave);
        };
      });

      const rows = gsap.utils.toArray<HTMLElement>('.listing-feature');
      const rowCleanups = rows.map((row) => {
        const icon = row.querySelector('svg');
        const enter = () => gsap.fromTo(icon, { rotation: 0, scale: 1 }, { rotation: 360, scale: 1.2, duration: 0.7, ease: 'back.out(2)', yoyo: true, repeat: 1, repeatDelay: 0.05 });
        row.addEventListener('pointerenter', enter);
        return () => row.removeEventListener('pointerenter', enter);
      });

      return () => [...cleanups, ...rowCleanups].forEach((fn) => fn());
    });
  }, { scope: root });

  return (
    <section ref={root} className="services-listing" id="services-listing" aria-labelledby="listing-title">
      <div className="services-listing-webthreads" aria-hidden="true">
        <WebThreads
          colors={['#2178A7', '#00A99D', '#0781b1', '#1aa6b7', '#35d7d0', '#071D35']}
          coreColor="#00A99D"
          backgroundColor="transparent"
          lightMode={true}
          threadCount={8}
          speed={0.16}
          frequency={4.5}
          spread={0.18}
          position={0.52}
          pinch={0.5}
          glow={0.02}
          thickness={1.2}
          opacity={0.45}
          mouseInteraction={true}
          pulseOnClick={true}
        />
      </div>

      <div className="listing-inner">
        <header className="listing-header">
          <span className="listing-eyebrow">SERVICES LISTING</span>
          <h2 id="listing-title" className="listing-title">Find the right direction for your brand.</h2>
          <p className="listing-subtitle">Explore our core services and see how each can support your next step.</p>
        </header>

        <div className="listing-grid">
          {SERVICES.map((service) => (
            <article className={`listing-card listing-card--${service.kind}`} key={service.id} role="link" tabIndex={0} onClick={() => onServiceClick?.(service.id)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') onServiceClick?.(service.id); }}>
              <div className="listing-visual">
                <span className="listing-number" aria-hidden="true">{service.number}</span>
                <div className="listing-art">
                  <div className="listing-art-tilt">
                    <img src={service.art} alt="" loading="lazy" />
                  </div>
                  {service.kind === 'digital' && (
                    <>
                      <span className="listing-wave" aria-hidden="true" />
                      <span className="listing-wave" aria-hidden="true" />
                      <span className="listing-wave" aria-hidden="true" />
                    </>
                  )}
                  {service.kind === 'social' && (
                    <>
                      <span className="listing-pop listing-pop--a" aria-hidden="true" />
                      <span className="listing-pop listing-pop--b" aria-hidden="true" />
                      <span className="listing-pop listing-pop--c" aria-hidden="true" />
                    </>
                  )}
                  {service.kind === 'seo' && <span className="listing-glint" aria-hidden="true" />}
                </div>
              </div>

              <div className="listing-info">
                <h3 className="listing-card-title">{service.title}</h3>
                <p className="listing-card-desc">{service.description}</p>

                <ul className="listing-features" aria-label={`${service.title} includes`}>
                  {service.features.map(({ label, icon: Icon }) => (
                    <li className="listing-feature" key={label}>
                      <span className="listing-feature-icon" aria-hidden="true">
                        <Icon size={17} strokeWidth={1.8} />
                      </span>
                      <span>{label}</span>
                    </li>
                  ))}
                </ul>

                <button type="button" className="listing-button" onClick={(event) => { event.stopPropagation(); onServiceClick?.(service.id); }}>
                  <span>{service.linkText}</span>
                  <ArrowRight size={18} strokeWidth={2} aria-hidden="true" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesListing;
