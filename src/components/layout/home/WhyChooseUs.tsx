import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Antigravity from '../../effects/Antigravity';
import './WhyChooseUs.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  color: string;
  iconBg: string;
  icon: React.ReactNode;
}

export const WhyChooseUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const features: FeatureItem[] = [
    {
      id: 'certified-experts',
      title: 'Certified Experts',
      description: 'Our team of certified professionals deliver top quality results.',
      color: '#1d72b8',
      iconBg: 'rgba(29, 114, 184, 0.08)',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="why-icon-svg"
          aria-hidden="true"
        >
          <circle cx="12" cy="7" r="4.5" />
          <path d="M4.5 21a7.5 7.5 0 0 1 15 0" />
        </svg>
      ),
    },
    {
      id: 'roi-focused',
      title: 'ROI Focused',
      description: 'We focus on strategies that deliver maximum return on investment.',
      color: '#7c3aed',
      iconBg: 'rgba(124, 58, 237, 0.08)',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="why-icon-svg"
          aria-hidden="true"
        >
          {/* Target with concentric rings and arrow */}
          <circle cx="11.5" cy="12.5" r="8" />
          <circle cx="11.5" cy="12.5" r="4.5" />
          <circle cx="11.5" cy="12.5" r="1.5" />
          <path d="m20.5 3.5-6.5 6.5" />
          <path d="M16 3.5h4.5V8" />
        </svg>
      ),
    },
    {
      id: 'transparent-reporting',
      title: 'Transparent Reporting',
      description: 'Get clear reports and real-time updates on campaign performance.',
      color: '#059669',
      iconBg: 'rgba(5, 150, 105, 0.08)',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="why-icon-svg"
          aria-hidden="true"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="12" x2="16" y2="12" />
          <line x1="8" y1="16" x2="16" y2="16" />
        </svg>
      ),
    },
    {
      id: 'dedicated-support',
      title: 'Dedicated Support',
      description: 'We provide 24/7 support and a dedicated account manager.',
      color: '#d97706',
      iconBg: 'rgba(217, 119, 6, 0.08)',
      icon: (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="why-icon-svg"
          aria-hidden="true"
        >
          {/* Headset / headphones with mic */}
          <path d="M3 14h2a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6a10 10 0 0 1 20 0v6a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h2" />
          <path d="M18 19a6 6 0 0 1-6 3" />
        </svg>
      ),
    },
  ];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        });

        tl.from('.why-eyebrow', { opacity: 0, y: -10, duration: 0.6 }, 0)
          .from('.why-heading', { opacity: 0, y: 22, duration: 0.8 }, 0.1)
          .from('.why-divider', { scaleX: 0, transformOrigin: 'left center', duration: 0.6, ease: 'expo.out' }, 0.3)
          .from('.why-description', { opacity: 0, y: 16, duration: 0.7 }, 0.35)
          .from(
            '.why-feature-item',
            {
              opacity: 0,
              y: 28,
              duration: 0.75,
              stagger: 0.1,
              ease: 'back.out(1.4)',
            },
            0.4
          );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="why-section" ref={sectionRef} aria-labelledby="why-heading-id">
      <div className="why-section-antigravity" aria-hidden="true">
        <Antigravity
          colors={['#2178A7', '#00A99D', '#0781b1', '#35d7d0']}
          count={650}
          magnetRadius={9}
          ringRadius={6.5}
          particleSize={0.85}
          autoAnimate={true}
          colorMode="radial"
          particleShape="capsule"
          waveAmplitude={2.5}
          waveCount={4}
          lightMode={true}
          opacity={0.38}
        />
      </div>

      <div className="why-container">
        <div className="why-grid">
          {/* Left Column: Heading and Intro */}
          <div className="why-header-block">
            <span className="why-eyebrow">WHY CHOOSE US</span>
            <h2 id="why-heading-id" className="why-heading">
              We Deliver Results That<br />
              Drive Your Business Growth
            </h2>
            <div className="why-divider" aria-hidden="true" />
            <p className="why-description">
              We use data, creativity and strategy to grow your brand and maximizes your ROI.
            </p>
          </div>

          {/* Right Column: 4 Key Features */}
          <div className="why-features-block" role="list" aria-label="Why Choose Us Features">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="why-feature-item"
                role="listitem"
                style={{ '--feature-color': feature.color, '--feature-bg': feature.iconBg } as React.CSSProperties}
              >
                <div className="why-icon-wrapper" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3 className="why-feature-title">{feature.title}</h3>
                <p className="why-feature-desc">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

