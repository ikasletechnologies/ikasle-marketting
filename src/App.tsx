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
import { ContentPlanningPage } from './components/layout/services/social/ContentPlanningPage';
import { CreativePostsPage } from './components/layout/services/social/CreativePostsPage';
import { SOCIAL_SECTION_BY_ID, SOCIAL_TEMPLATE_PAGES } from './components/layout/services/social/socialTemplatePages';
import { SEO_SECTION_BY_ID, SEO_TEMPLATE_PAGES } from './components/layout/services/seo/seoTemplatePages';
import { BRAND_SECTION_BY_ID, BRAND_TEMPLATE_PAGES } from './components/layout/services/brand/brandTemplatePages';
import { DIGITAL_RELATED_SECTIONS } from './components/layout/services/digital/digitalRelated';
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
import PageLoader from './components/ui/PageLoader';
import ChatBot from './components/ui/ChatBot';
import { pathFromSection, sectionFromPath } from './routes';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>(() => sectionFromPath(window.location.pathname));
  const [isPageLoading, setIsPageLoading] = useState(true);
  const loaderTimerRef = useRef<number | null>(null);
  const aboutMainRef = useRef<HTMLElement>(null);

  const startPageTransition = (duration = 520) => {
    if (loaderTimerRef.current !== null) window.clearTimeout(loaderTimerRef.current);
    setIsPageLoading(true);
    loaderTimerRef.current = window.setTimeout(() => {
      setIsPageLoading(false);
      loaderTimerRef.current = null;
    }, duration);
  };
  useEffect(() => {
    const initialTimer = window.setTimeout(() => setIsPageLoading(false), 760);
    return () => window.clearTimeout(initialTimer);
  }, []);
  // Keep the address bar in sync, and support the browser's back/forward buttons.
  useEffect(() => {
    const onPopState = () => {
      startPageTransition();
      setActiveSection(sectionFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      if (loaderTimerRef.current !== null) window.clearTimeout(loaderTimerRef.current);
    };
  }, []);

  useEffect(() => {
    document.title = activeSection === 'Home' ? 'IKASLÄ’ Marketing' : `${activeSection} | IKASLÄ’ Marketing`;
  }, [activeSection]);

  const openSection = (section: string) => {
    startPageTransition();
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
  const openDigitalRelated = (id: string) => openSection(DIGITAL_RELATED_SECTIONS[id] ?? 'Digital Marketing');
  const DetailTemplatePage = SOCIAL_TEMPLATE_PAGES[activeSection] ?? SEO_TEMPLATE_PAGES[activeSection] ?? BRAND_TEMPLATE_PAGES[activeSection];

  return (
    <ClickSpark sparkColor={['#0781b1', '#1aa6b7', '#35d7d0']} shape="line" sparkCount={10} sparkSize={12} sparkRadius={34} duration={550} style={{ height: 'auto' }}>
    <PageLoader visible={isPageLoading} />
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
          onRelatedClick={openDigitalRelated}
        />
      ) : activeSection === 'Landing Pages & CRO' ? (
        <LandingCroPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={openDigitalRelated}
        />
      ) : activeSection === 'Lead Generation & Nurturing' ? (
        <LeadGenerationPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={openDigitalRelated}
        />
      ) : activeSection === 'Email Marketing' ? (
        <EmailMarketingPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={openDigitalRelated}
        />
      ) : activeSection === 'Content Marketing' ? (
        <ContentMarketingPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={openDigitalRelated}
        />
      ) : activeSection === 'Meta Advertising' ? (
        <MetaAdsPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={openDigitalRelated}
        />
      ) : activeSection === 'Display & YouTube Advertising' ? (
        <DisplayYoutubePage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={openDigitalRelated}
        />
      ) : activeSection === 'Google Search Ads' ? (
        <GoogleSearchAdsPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={openDigitalRelated}
        />
      ) : activeSection === 'Audience & Competitor Research' ? (
        <AudienceResearchPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onDigitalClick={() => openSection('Digital Marketing')}
          onContactClick={goContact}
          onRelatedClick={openDigitalRelated}
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
          onServiceClick={(id) => {
            const section = BRAND_SECTION_BY_ID[id];
            if (section) openSection(section);
            return Boolean(section);
          }}
        />
      ) : activeSection === 'SEO & Search Growth' ? (
        <SeoPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onContactClick={goContact}
          onServiceClick={(id) => {
            const section = SEO_SECTION_BY_ID[id];
            if (section) openSection(section);
            return Boolean(section);
          }}
        />
      ) : activeSection === 'Social Media Strategy' ? (
        <SocialMediaStrategyPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onSocialClick={() => openSection('Social Media Marketing')}
          onContactClick={goContact}
        />
      ) : activeSection === 'Content Planning' ? (
        <ContentPlanningPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onSocialClick={() => openSection('Social Media Marketing')}
          onContactClick={goContact}
          onRelatedClick={(target) => openSection(target === 'management' ? 'Social Media Management' : target === 'creative' ? 'Creative Posts & Carousels' : target === 'reels' ? 'Reels & Short-Form Video' : target === 'profile' ? 'Profile Setup & Optimisation' : 'Social Media Strategy')}
        />
      ) : DetailTemplatePage ? (
        <DetailTemplatePage onNavigate={openSection} />
      ) : activeSection === 'Creative Posts & Carousels' ? (
        <CreativePostsPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onSocialClick={() => openSection('Social Media Marketing')}
          onContactClick={goContact}
          onRelatedClick={(target) => openSection(target === 'planning' ? 'Content Planning' : target === 'management' ? 'Social Media Management' : 'Meta Advertising')}
        />
      ) : activeSection === 'Social Media Marketing' ? (
        <SocialMediaPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onContactClick={goContact}
          onStrategyClick={() => openSection('Social Media Strategy')}
          onProfileClick={() => openSection('Profile Setup & Optimisation')}
          onManagementClick={() => openSection('Social Media Management')}
          onPostsClick={() => openSection('Creative Posts & Carousels')}
          onServiceClick={(id) => openSection(SOCIAL_SECTION_BY_ID[id] ?? 'Contact')}
        />
      ) : activeSection === 'Profile Setup & Optimisation' ? (
        <ProfileSetupPage
          onHomeClick={goHome}
          onServicesClick={() => openSection('Services')}
          onSocialClick={() => openSection('Social Media Marketing')}
          onContactClick={goContact}
          onNavigate={openSection}
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
          <AboutProcess />
          <AboutValues />
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
            onServiceClick={(id) => openSection(id === 'digital-marketing' ? 'Digital Marketing' : id === 'social-media' ? 'Social Media Marketing' : id === 'seo-search' ? 'SEO & Search Growth' : id === 'brand-growth' ? 'Brand Growth & Creative' : 'Services')}
            onNavigate={openSection}
            onViewAllClick={() => openSection('Services')}
          />

          <WhyChooseUs />

          <JourneySection />
        </main>
      )}

      <Footer onNavigate={openSection} />
      <ChatBot />
    </div>
    </ClickSpark>
  );
};

export default App;
