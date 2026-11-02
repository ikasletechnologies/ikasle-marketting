import React, { useEffect, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent } from 'react';
import { ArrowRight } from 'lucide-react';
import targetIcon from '../../../assets/service-target.png';
import socialIcon from '../../../assets/service-social.png';
import seoIcon from '../../../assets/service-seo.png';
import brandIcon from '../../../assets/service-brand.png';
import Antigravity from '../../effects/Antigravity';
import './ServicesSection.css';

interface ServiceItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  linkText: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'digital-marketing',
    icon: targetIcon,
    title: 'Digital Marketing',
    description: 'Strategy, paid advertising, content and analytics.',
    linkText: 'Explore Digital Marketing',
  },
  {
    id: 'social-media',
    icon: socialIcon,
    title: 'Social Media Marketing',
    description: 'Content, reels and communities built around your brand.',
    linkText: 'Explore Social Media',
  },
  {
    id: 'seo-search',
    icon: seoIcon,
    title: 'SEO & Search Growth',
    description: 'Technical, on-page and local SEO for better visibility.',
    linkText: 'Explore SEO',
  },
  {
    id: 'brand-growth',
    icon: brandIcon,
    title: 'Brand Growth & Creative',
    description: 'Brand identity, creative campaigns and website experiences.',
    linkText: 'Explore Branding',
  },
];

const ServiceEffect: React.FC<{ serviceId: string }> = ({ serviceId }) => {
  if (serviceId === 'digital-marketing') {
    return (
      <div className="service-fx service-fx-target" aria-hidden="true">
        <span className="target-arrow" />
        <span className="target-ripple" />
        <span className="target-sheen" />
      </div>
    );
  }

  if (serviceId === 'social-media') {
    return (
      <div className="service-fx service-fx-social" aria-hidden="true">
        <span className="chat-depth" />
        <span className="chat-front">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </span>
        <span className="notification-pulse" />
      </div>
    );
  }

  if (serviceId === 'seo-search') {
    return (
      <div className="service-fx service-fx-seo" aria-hidden="true">
        <span className="seo-scan-ring" />
        <span className="seo-lens-shine" />
      </div>
    );
  }

  return (
    <div className="service-fx service-fx-brand" aria-hidden="true">
      <span className="ribbon-light" />
      <span className="ribbon-orbit" />
    </div>
  );
};

export interface ServicesSectionProps {
  onServiceClick?: (serviceId: string) => void;
  onViewAllClick?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onServiceClick,
  onViewAllClick,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(() =>
    typeof window === 'undefined' || !('IntersectionObserver' in window),
  );

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const activateCard = (serviceId: string) => {
    onServiceClick?.(serviceId);
  };

  const handleCardKeyDown = (
    event: KeyboardEvent<HTMLDivElement>,
    serviceId: string,
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      activateCard(serviceId);
    }
  };

  return (
    <section
      ref={sectionRef}
      className={'services-section' + (isVisible ? ' is-visible' : '')}
      id="services"
    >
      <div className="services-section-antigravity" aria-hidden="true">
        <Antigravity
          colors={['#2178A7', '#00A99D', '#0781b1', '#35d7d0']}
          count={700}
          magnetRadius={10}
          ringRadius={7.5}
          particleSize={0.9}
          autoAnimate={true}
          colorMode="radial"
          particleShape="capsule"
          waveAmplitude={3}
          waveCount={4}
          lightMode={true}
          opacity={0.42}
        />
      </div>

      <div className="services-container">
        <div className="services-header">
          <span className="services-overline">WHAT WE DO</span>
          <h2 className="services-title">
            <span className="title-break">The right strategy.</span>
            <span className="title-break">The right kind of growth.</span>
          </h2>
          <p className="services-subtitle">
            From the first impression to the next conversion, we bring your marketing together.
          </p>
        </div>

        <div className="services-grid">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              className={'service-card service-card--' + service.id}
              style={{ '--service-index': index } as CSSProperties}
              role="button"
              tabIndex={0}
              aria-label={service.linkText}
              onClick={() => activateCard(service.id)}
              onKeyDown={(event) => handleCardKeyDown(event, service.id)}
            >
              <div className="service-icon-box">
                <div className="service-icon-stage">
                  <img
                    src={service.icon}
                    alt=""
                    className="service-icon-img"
                    loading="lazy"
                  />
                  <ServiceEffect serviceId={service.id} />
                </div>
              </div>

              <div className="service-info">
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-desc">{service.description}</p>
                <button
                  type="button"
                  className="service-link"
                  onClick={(event) => {
                    event.stopPropagation();
                    activateCard(service.id);
                  }}
                >
                  <span>{service.linkText}</span>
                  <ArrowRight size={16} className="service-arrow" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="services-footer-action">
          <button
            type="button"
            className="view-all-services-btn"
            onClick={onViewAllClick}
          >
            <span>View All Services</span>
            <ArrowRight size={15} className="service-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
