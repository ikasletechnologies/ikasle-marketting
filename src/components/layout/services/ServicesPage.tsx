import React from 'react';
import { ServicesHero } from './ServicesHero';
import { ServicesListing } from './ServicesListing';
import { ServicesCta } from './ServicesCta';

const HUB_BY_ID: Record<string, string> = {
  'digital-marketing': 'Digital Marketing',
  'social-media': 'Social Media Marketing',
  'seo-search': 'SEO & Search Growth',
  'brand-growth': 'Brand Growth & Creative',
};

export const ServicesPage: React.FC<{ onNavigate: (section: string) => void }> = ({ onNavigate }) => (
  <main>
    <ServicesHero onHomeClick={() => onNavigate('Home')} />
    <ServicesListing onServiceClick={(id) => onNavigate(HUB_BY_ID[id] ?? 'Contact')} />
    <ServicesCta onCtaClick={() => onNavigate('Contact')} />
  </main>
);

export default ServicesPage;
