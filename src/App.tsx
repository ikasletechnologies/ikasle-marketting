import React, { useEffect, useRef, useState } from 'react';
import { Header } from './components/layout/shared/Header';
import { HeroSection } from './components/layout/home/HeroSection';
import { ServicesSection } from './components/layout/services/ServicesSection';
import { DigitalMarketingPage } from './components/layout/services/digital/DigitalMarketingPage';
import { DigitalStrategyPage } from './components/layout/services/digital/DigitalStrategyPage';
import { AudienceResearchPage } from './components/layout/services/digital/AudienceResearchPage';
import { GoogleSearchAdsPage } from './components/layout/services/digital/GoogleSearchAdsPage';
import { DisplayYoutubePage } from './components/layout/services/digital/DisplayYoutubePage';
import { MetaAdsPage } from './components/layout/services/digital/MetaAdsPage';
import { ContentMarketingPage } from './components/layout/services/digital/ContentMarketingPage';
import { EmailMarketingPage } from './components/layout/services/digital/EmailMarketingPage';
import { LeadGenerationPage } from './components/layout/services/digital/LeadGenerationPage';
import { LandingCroPage } from './components/layout/services/digital/LandingCroPage';
import { AnalyticsTrackingPage } from './components/layout/services/digital/AnalyticsTrackingPage';
import { BrandPage } from './components/layout/services/brand/BrandPage';
import { SeoPage } from './components/layout/services/seo/SeoPage';
import { SocialMediaPage } from './components/layout/services/social/SocialMediaPage';
import { SocialMediaStrategyPage } from './components/layout/services/social/SocialMediaStrategyPage';
import { ProfileSetupPage } from './components/layout/services/social/ProfileSetupPage';
import { SocialMediaManagementPage } from './components/layout/services/social/SocialMediaManagementPage';
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
import { BlogComingSoon } from './components/layout/blog/BlogComingSoon';
import { CareersPage } from './components/layout/careers/CareersPage';
import ClickSpark from './components/effects/ClickSpark';
import TargetCursor from './components/effects/TargetCursor';
import { PrivacyPolicyPage, TermsPage, FaqPage } from './components/layout/legal/LegalPages';
import { JourneySection } from './components/layout/home/JourneySection';
import { WhyChooseUs } from './components/layout/home/WhyChooseUs';
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
    document.title = activeSection === 'Home' ? 'IKASLÄ’ Marketing' : `${activeSection} | IKASLÄ’ Marketing`;
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
const isBlogsPage = activeSection === 'Blogs';
const isCareersPage = activeSection === 'Careers';
  const goHome = () => openSection('Home');
  const goContact = () => openSection('Contact');

  return (
    <ClickSpark sparkColor={['#0781b1', '#1aa6b7', '#35d7d0']} shape="line" sparkCount={10} sparkSize={12} sparkRadius={34} duration={550} style={{ height: 'auto' }}>
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <Header
        activeTab={activeSection}
        onTabChange={openSection}
        onCtaClick={() => openSection('Contact')}
      />

      {activeSection === 'Analytics & Conversion Tracking' ? (
        <AnalyticsTrackingPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={(id) => openSection(id === 'strategy' ? 'Digital Marketing Strategy' : id === 'google' ? 'Google Search Ads' : id === 'landing' ? 'Landing Pages & CRO' : 'Digital Marketing')}
        />
      ) : activeSection === 'Landing Pages & CRO' ? (
        <LandingCroPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={(id) => openSection(id === 'google' ? 'Google Search Ads' : id === 'meta' ? 'Meta Advertising' : 'Digital Marketing')}
        />
      ) : activeSection === 'Lead Generation & Nurturing' ? (
        <LeadGenerationPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={(id) => openSection(id === 'meta' ? 'Meta Advertising' : id === 'email' ? 'Email Marketing' : 'Digital Marketing')}
        />
      ) : activeSection === 'Email Marketing' ? (
        <EmailMarketingPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={(id) => openSection(id === 'content' ? 'Content Marketing' : 'Digital Marketing')}
        />
      ) : activeSection === 'Content Marketing' ? (
        <ContentMarketingPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={(id) => openSection(id === 'strategy' ? 'Digital Marketing Strategy' : 'Digital Marketing')}
        />
      ) : activeSection === 'Meta Advertising' ? (
        <MetaAdsPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={() => openSection('Digital Marketing')}
        />
      ) : activeSection === 'Display & YouTube Advertising' ? (
        <DisplayYoutubePage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={(id) => openSection(id === 'research' ? 'Audience & Competitor Research' : 'Digital Marketing')}
        />
      ) : activeSection === 'Google Search Ads' ? (
        <GoogleSearchAdsPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={(id) => openSection(id === 'strategy' ? 'Digital Marketing Strategy' : 'Digital Marketing')}
        />
      ) : activeSection === 'Audience & Competitor Research' ? (
        <AudienceResearchPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={(id) => openSection(id === 'strategy' ? 'Digital Marketing Strategy' : 'Digital Marketing')}
        />
      ) : activeSection === 'Digital Marketing Strategy' ? (
        <DigitalStrategyPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
        />
      ) : activeSection === 'Brand Growth & Creative' ? (
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
      ) : activeSection === 'Social Media Strategy' ? (
        <SocialMediaStrategyPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onSocialClick={() => openSection('Social Media Marketing')}
          onContactClick={goContact}
        />
      ) : activeSection === 'Social Media Marketing' ? (
        <SocialMediaPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onContactClick={goContact}
          onStrategyClick={() => openSection('Social Media Strategy')}
          onProfileClick={() => openSection('Profile Setup & Optimisation')}
          onManagementClick={() => openSection('Social Media Management')}
        />
       ) : activeSection === 'Social Media Management' ? (
        <SocialMediaManagementPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onSocialClick={() => openSection('Social Media Marketing')}
          onContactClick={goContact}
        />
      ) : activeSection === 'Profile Setup & Optimisation' ? (
        <ProfileSetupPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onSocialClick={() => openSection('Social Media Marketing')}
          onContactClick={goContact}
        />
      ) : activeSection === 'Digital Marketing' ? (
        <DigitalMarketingPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onContactClick={goContact}
          onStrategyClick={() => openSection('Digital Marketing Strategy')}
          onResearchClick={() => openSection('Audience & Competitor Research')}
          onGoogleAdsClick={() => openSection('Google Search Ads')}
          onDisplayYoutubeClick={() => openSection('Display & YouTube Advertising')}
          onMetaAdsClick={() => openSection('Meta Advertising')}
          onContentClick={() => openSection('Content Marketing')}
          onEmailClick={() => openSection('Email Marketing')}
          onLeadsClick={() => openSection('Lead Generation & Nurturing')}
          onLandingClick={() => openSection('Landing Pages & CRO')}
          onAnalyticsClick={() => openSection('Analytics & Conversion Tracking')}
        />
      ) : activeSection === 'Privacy Policy' ? (
        <PrivacyPolicyPage onHomeClick={goHome} onContactClick={goContact} />
      ) : activeSection === 'Terms & Conditions' ? (
        <TermsPage onHomeClick={goHome} onContactClick={goContact} />
      ) : activeSection === 'FAQ' ? (
        <FaqPage onHomeClick={goHome} onContactClick={goContact} />
      ) : isContactPage ? (
        <ContactPage onHomeClick={() => openSection('Home')} />
      ) : isBlogsPage ? (
        <BlogComingSoon onContactClick={goContact} />
      ) : isCareersPage ? (
        <CareersPage onHomeClick={goHome} onContactClick={goContact} />
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
            onServiceClick={() => openSection('Services')}
            onViewAllClick={() => openSection('Services')}
          />

          <WhyChooseUs />

          <JourneySection />
        </main>
      )}

      <Footer onNavigate={openSection} />
    </div>
    </ClickSpark>
  );
};

export default App;
