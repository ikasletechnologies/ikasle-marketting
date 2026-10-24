import React, { useEffect, useRef, useState } from 'react';
import { Header } from './components/layout/shared/Header';
import { HeroSection } from './components/layout/home/HeroSection';
import { ServicesSection } from './components/layout/services/ServicesSection';
import { DigitalMarketingPage } from './components/layout/services/digital/DigitalMarketingPage';
import { BrandPage } from './components/layout/services/brand/BrandPage';
import { SeoPage } from './components/layout/services/seo/SeoPage';
import { SocialMediaPage } from './components/layout/services/social/SocialMediaPage';
import { ServicesCta } from './components/layout/services/ServicesCta';
import { ServicesListing } from './components/layout/services/ServicesListing';
import { ServicesHero } from './components/layout/services/ServicesHero';
import { AboutHero } from './components/layout/about/AboutHero';
import { AboutStory } from './components/layout/about/AboutStory';
import { AboutPurpose } from './components/layout/about/AboutPurpose';
import { AboutValues } from './components/layout/about/AboutValues';
import { AboutProcess } from './components/layout/about/AboutProcess';
import { AboutCta } from './components/layout/about/AboutCta';
import { ContactPage } from './components/layout/contact/ContactPage';
import ClickSpark from './components/effects/ClickSpark';
import TargetCursor from './components/effects/TargetCursor';
import { PrivacyPolicyPage, TermsPage, FaqPage } from './components/layout/legal/LegalPages';
import { JourneySection } from './components/layout/home/JourneySection';
import { Footer } from './components/layout/shared/Footer';
import { pathFromSection, sectionFromPath } from './routes';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(() => sectionFromPath(window.location.pathname));
  const aboutMainRef = useRef<HTMLElement>(null);

  // Keep the address bar in sync, and support the browser's back/forward buttons.
  useEffect(() => {
    const onPopState = () => setActiveSection(sectionFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    document.title = activeSection === 'Home' ? 'IKASLĒ Marketing' : `${activeSection} | IKASLĒ Marketing`;
  }, [activeSection]);

  const openSection = (section: string) => {
    const path = pathFromSection(section);
    if (window.location.pathname !== path) window.history.pushState({}, '', path);
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isContactPage = activeSection === 'Contact';
  const isServicesPage = activeSection === 'Services';
  const isAboutPage = activeSection === 'About';
  const goHome = () => openSection('Home');
  const goContact = () => openSection('Contact');

  return (
    <ClickSpark sparkColor={['#0781b1', '#1aa6b7', '#35d7d0']} shape="line" sparkCount={10} sparkSize={12} sparkRadius={34} duration={550} style={{ height: 'auto' }}>
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header
        activeTab={['Digital Marketing', 'Social Media Marketing', 'SEO & Search Growth', 'Brand Growth & Creative'].includes(activeSection) ? 'Services' : activeSection}
        onTabChange={openSection}
        onCtaClick={() => openSection('Contact')}
      />

      {activeSection === 'Brand Growth & Creative' ? (
        <BrandPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onContactClick={goContact}
        />
      ) : activeSection === 'SEO & Search Growth' ? (
        <SeoPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onContactClick={goContact}
        />
      ) : activeSection === 'Social Media Marketing' ? (
        <SocialMediaPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onContactClick={goContact}
        />
      ) : activeSection === 'Digital Marketing' ? (
        <DigitalMarketingPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onContactClick={goContact}
        />
      ) : activeSection === 'Privacy Policy' ? (
        <PrivacyPolicyPage onHomeClick={goHome} onContactClick={goContact} />
      ) : activeSection === 'Terms & Conditions' ? (
        <TermsPage onHomeClick={goHome} onContactClick={goContact} />
      ) : activeSection === 'FAQ' ? (
        <FaqPage onHomeClick={goHome} onContactClick={goContact} />
      ) : isContactPage ? (
        <ContactPage onHomeClick={() => openSection('Home')} />
      ) : isAboutPage ? (
        <main ref={aboutMainRef}>
          <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn container={aboutMainRef} />
          <AboutHero onHomeClick={() => openSection('Home')} />
          <AboutStory />
          <AboutPurpose />
          <AboutValues />
          <AboutProcess />
          <AboutCta onCtaClick={() => openSection('Contact')} />
        </main>
      ) : isServicesPage ? (
        <main>
          <ServicesHero onHomeClick={() => openSection('Home')} />
          <ServicesListing onServiceClick={(id) => openSection(id === 'digital-marketing' ? 'Digital Marketing' : id === 'social-media' ? 'Social Media Marketing' : id === 'seo-search' ? 'SEO & Search Growth' : id === 'brand-growth' ? 'Brand Growth & Creative' : 'Contact')} />
          <ServicesCta onCtaClick={() => openSection('Contact')} />
        </main>
      ) : (
        <main>
          <HeroSection
            onStartJourney={() => openSection('Contact')}
            onExploreServices={() => openSection('Services')}
          />

          <ServicesSection
            onServiceClick={(id) => console.log('Service clicked:', id)}
            onViewAllClick={() => openSection('Services')}
          />

          <JourneySection />
        </main>
      )}

      <Footer onNavigate={openSection} />
    </div>
    </ClickSpark>
  );
};

export default App;
