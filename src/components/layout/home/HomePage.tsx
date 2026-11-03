import React, { Suspense } from 'react';
import { HeroSection } from './HeroSection';
import { lazyNamed } from '../../../lib/lazyNamed';

// Below-the-fold sections (and the GSAP/WebGL code they use) load after the hero is on screen.
const ServicesSection = lazyNamed(() => import('../services/ServicesSection'), 'ServicesSection');
const WhyChooseUs = lazyNamed(() => import('./WhyChooseUs'), 'WhyChooseUs');
const JourneySection = lazyNamed(() => import('./JourneySection'), 'JourneySection');
const NewsletterSignup = lazyNamed(() => import('../../ui/NewsletterSignup'), 'NewsletterSignup');

const HUB_BY_ID: Record<string, string> = {
  'digital-marketing': 'Digital Marketing',
  'social-media': 'Social Media Marketing',
  'seo-search': 'SEO & Search Growth',
  'brand-growth': 'Brand Growth & Creative',
};

export const HomePage: React.FC<{ onNavigate: (section: string) => void }> = ({ onNavigate }) => (
  <main>
    <HeroSection onStartJourney={() => onNavigate('Contact')} onExploreServices={() => onNavigate('Services')} />
    {/* Reserve space while the sections load so the page does not jump. */}
    <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-busy="true" />}>
      <ServicesSection
        onServiceClick={(id) => onNavigate(HUB_BY_ID[id] ?? 'Services')}
        onNavigate={onNavigate}
        onViewAllClick={() => onNavigate('Services')}
      />
      <WhyChooseUs />
      <JourneySection />
      <div style={{ width: 'min(1180px, calc(100% - 32px))', margin: '0 auto', padding: '24px 0 72px' }}>
        <NewsletterSignup source="home" />
      </div>
    </Suspense>
  </main>
);

export default HomePage;
