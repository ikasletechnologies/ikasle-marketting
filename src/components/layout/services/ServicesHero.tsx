import React from 'react';
import servicesArtwork from '../../../assets/services-hero-growth.png';
import './ServicesHero.css';

export interface ServicesHeroProps {
  onHomeClick?: () => void;
}

export const ServicesHero: React.FC<ServicesHeroProps> = ({ onHomeClick }) => {
  return (
    <section className="services-page-hero" aria-labelledby="services-hero-title">
      <div className="services-hero-content">
        <span className="services-hero-overline">OUR SERVICES</span>
        <h1 id="services-hero-title" className="services-hero-title">
          <span>Smart strategy.</span>
          <strong>Stronger impact.</strong>
        </h1>
        <p>
          Digital marketing, social media, SEO and branding,
          <span> working together.</span>
        </p>

        <nav className="services-breadcrumb" aria-label="Breadcrumb">
          <button type="button" onClick={onHomeClick}>Home</button>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Services</span>
        </nav>
      </div>

      <div className="services-hero-visual" aria-hidden="true">
        <div className="services-hero-haze" />
        <img src={servicesArtwork} alt="" />
        <span className="services-hero-shine" />
      </div>
    </section>
  );
};

export default ServicesHero;
