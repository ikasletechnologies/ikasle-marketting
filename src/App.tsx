import React, { Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Header } from './components/layout/shared/Header';
import { Footer } from './components/layout/shared/Footer';
import ClickSpark from './components/effects/ClickSpark';
import PageLoader from './components/ui/PageLoader';
import ChatBot from './components/ui/ChatBot';
import { ScrollToTop } from './components/ui/FloatingActions';
import { RouteErrorBoundary } from './components/ui/RouteErrorBoundary';
import { ServicesCta } from './components/layout/services/ServicesCta';
import { SOCIAL_SECTION_BY_ID } from './components/layout/services/social/socialTemplatePages';
import { SEO_SECTION_BY_ID } from './components/layout/services/seo/seoTemplatePages';
import { BRAND_SECTION_BY_ID } from './components/layout/services/brand/brandTemplatePages';
import { landingPageFor } from './components/layout/services/landing/landingPages';
import { lazyNamed } from './lib/lazyNamed';
import { NOT_FOUND_SECTION, normalise, pathFromSection, sectionFromPath } from './routes';
import { getSectionMeta } from './seo/meta';
import { applyPageMeta } from './seo/applyMeta';

// Every page is its own chunk, so the first visit only downloads the page it lands on (IKAS-502).
const HomePage = lazyNamed(() => import('./components/layout/home/HomePage'), 'HomePage');
const AboutPage = lazyNamed(() => import('./components/layout/about/AboutPage'), 'AboutPage');
const ServicesPage = lazyNamed(() => import('./components/layout/services/ServicesPage'), 'ServicesPage');
const ContactPage = lazyNamed(() => import('./components/layout/contact/ContactPage'), 'ContactPage');
const ClientsPage = lazyNamed(() => import('./components/layout/clients/ClientsPage'), 'ClientsPage');
const CareersPage = lazyNamed(() => import('./components/layout/careers/CareersPage'), 'CareersPage');
const CareerJobPage = lazyNamed(() => import('./components/layout/careers/CareerJobPage'), 'CareerJobPage');
const BlogPage = lazyNamed(() => import('./components/layout/blog/BlogPage'), 'BlogPage');
const BlogPostPage = lazyNamed(() => import('./components/layout/blog/BlogPostPage'), 'BlogPostPage');
const LeadsPage = lazyNamed(() => import('./components/layout/dashboard/LeadsPage'), 'LeadsPage');
const CampaignsPage = lazyNamed(() => import('./components/layout/dashboard/CampaignsPage'), 'CampaignsPage');
const NotFoundPage = lazyNamed(() => import('./components/layout/shared/NotFoundPage'), 'NotFoundPage');
const PrivacyPolicyPage = lazyNamed(() => import('./components/layout/legal/LegalPages'), 'PrivacyPolicyPage');
const TermsPage = lazyNamed(() => import('./components/layout/legal/LegalPages'), 'TermsPage');
const CookiePolicyPage = lazyNamed(() => import('./components/layout/legal/LegalPages'), 'CookiePolicyPage');
const FaqPage = lazyNamed(() => import('./components/layout/legal/LegalPages'), 'FaqPage');
const SitemapPage = lazyNamed(() => import('./components/layout/legal/LegalPages'), 'SitemapPage');
const DigitalMarketingPage = lazyNamed(() => import('./components/layout/services/digital/DigitalMarketingPage'), 'DigitalMarketingPage');
const BrandPage = lazyNamed(() => import('./components/layout/services/brand/BrandPage'), 'BrandPage');
const SeoPage = lazyNamed(() => import('./components/layout/services/seo/SeoPage'), 'SeoPage');
const SocialMediaPage = lazyNamed(() => import('./components/layout/services/social/SocialMediaPage'), 'SocialMediaPage');


const currentLocation = () => normalise(window.location.pathname);

export const App: React.FC = () => {
  const [path, setPath] = useState<string>(currentLocation);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const loaderTimerRef = useRef<number | null>(null);
  const pathRef = useRef(path);
  useLayoutEffect(() => {
    pathRef.current = path;
  }, [path]);

  const activeSection = sectionFromPath(path);
  const blogSlug = activeSection === 'Blogs' && path.startsWith('/blogs/') ? decodeURIComponent(path.slice('/blogs/'.length)) : '';
  // /careers/jobs/<slug> is a job detail page; /careers and /careers/jobs show the listing.
  const jobSlug = activeSection === 'Careers' && path.startsWith('/careers/jobs/') ? decodeURIComponent(path.slice('/careers/jobs/'.length)) : '';

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

  // Keep the view in sync with the browser's back/forward buttons.
  useEffect(() => {
    const onPopState = () => {
      const next = currentLocation();
      // Fragment-only changes (#anchor jumps) also fire popstate; they are not page changes.
      if (next === pathRef.current) return;
      startPageTransition();
      setPath(next);
    };
    window.addEventListener('popstate', onPopState);
    return () => {
      window.removeEventListener('popstate', onPopState);
      if (loaderTimerRef.current !== null) window.clearTimeout(loaderTimerRef.current);
    };
  }, []);

  // Title, description, canonical and social-card tags per route (IKAS-501).
  // Blog posts set their own (BlogPostPage), so they are skipped here.
  useEffect(() => {
    if (blogSlug || jobSlug) return;
    applyPageMeta(getSectionMeta(activeSection));
  }, [activeSection, blogSlug, jobSlug]);

  /** Navigate to an in-app URL (may include ?query). */
  const navigate = (to: string) => {
    startPageTransition();
    if (window.location.pathname + window.location.search !== to) window.history.pushState({}, '', to);
    setPath(normalise(to));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const openSection = (section: string) => navigate(pathFromSection(section));

  const goHome = () => openSection('Home');
  const goServices = () => openSection('Services');
  const goContact = () => openSection('Contact');
  const openFromMap = (map: Record<string, string>) => (id: string) => {
    const section = map[id];
    if (section) openSection(section);
    return Boolean(section);
  };

  const LandingPage = landingPageFor(activeSection);

  const renderPage = (): React.ReactNode => {
    // Service detail pages share one landing template; keyed so state resets between services.
    if (LandingPage) return <LandingPage key={activeSection} section={activeSection} onNavigate={openSection} />;

    switch (activeSection) {
      case 'Home':
        return <HomePage onNavigate={openSection} />;
      case 'About':
        return <AboutPage onNavigate={openSection} />;
      case 'Services':
        return <ServicesPage onNavigate={openSection} />;
      case 'Clients':
        return <ClientsPage onNavigate={openSection} />;
      case 'Contact':
        return <ContactPage onHomeClick={goHome} />;
      case 'Careers':
        return jobSlug ? <CareerJobPage key={jobSlug} slug={jobSlug} onNavigate={navigate} /> : <CareersPage onNavigate={navigate} />;
      case 'Blogs':
        return blogSlug ? <BlogPostPage slug={blogSlug} onNavigate={navigate} /> : <BlogPage onNavigate={navigate} onContactClick={goContact} />;
      case 'Leads Dashboard':
        return <LeadsPage onNavigate={openSection} />;
      case 'Campaigns Dashboard':
        return <CampaignsPage onNavigate={openSection} />;
      case 'Privacy Policy':
        return <PrivacyPolicyPage onHomeClick={goHome} onContactClick={goContact} />;
      case 'Terms & Conditions':
        return <TermsPage onHomeClick={goHome} onContactClick={goContact} />;
      case 'Cookie Policy':
        return <CookiePolicyPage onHomeClick={goHome} onContactClick={goContact} />;
      case 'FAQ':
        return <FaqPage onHomeClick={goHome} onContactClick={goContact} />;
      case 'Sitemap':
        return <SitemapPage onHomeClick={goHome} onNavigate={navigate} />;
      case 'Digital Marketing':
        return (
          <DigitalMarketingPage
            onHomeClick={goHome}
            onServicesClick={goServices}
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
        );
      case 'Brand Growth & Creative':
        return <BrandPage onHomeClick={goHome} onServicesClick={goServices} onContactClick={goContact} onServiceClick={openFromMap(BRAND_SECTION_BY_ID)} />;
      case 'SEO & Search Growth':
        return <SeoPage onHomeClick={goHome} onServicesClick={goServices} onContactClick={goContact} onServiceClick={openFromMap(SEO_SECTION_BY_ID)} />;
      case 'Social Media Marketing':
        return (
          <SocialMediaPage
            onHomeClick={goHome}
            onServicesClick={goServices}
            onContactClick={goContact}
            onStrategyClick={() => openSection('Social Media Strategy')}
            onProfileClick={() => openSection('Profile Setup & Optimisation')}
            onManagementClick={() => openSection('Social Media Management')}
            onPostsClick={() => openSection('Creative Posts & Carousels')}
            onServiceClick={(id) => openSection(SOCIAL_SECTION_BY_ID[id] ?? 'Contact')}
          />
        );
      case NOT_FOUND_SECTION:
      default:
        return <NotFoundPage onHomeClick={goHome} onServicesClick={goServices} onContactClick={goContact} />;
    }
  };

  return (
    <ClickSpark sparkColor={['#0781b1', '#1aa6b7', '#35d7d0']} shape="line" sparkCount={10} sparkSize={12} sparkRadius={34} duration={550} style={{ height: 'auto' }}>
      <PageLoader visible={isPageLoading} />
      <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
        <Header activeTab={activeSection} onTabChange={openSection} onCtaClick={goContact} />
        <RouteErrorBoundary key={path}>
          <Suspense fallback={<div style={{ minHeight: '100vh' }} aria-busy="true" />}>
            {renderPage()}
            {LandingPage && (
              <ServicesCta
                title="Ready to turn your next idea into action?"
                subtitle="Tell us what you want to achieve. We'll help you shape the right next step."
                buttonLabel="Start a Conversation"
                onCtaClick={goContact}
              />
            )}
          </Suspense>
        </RouteErrorBoundary>
        <Footer onNavigate={openSection} />
        <ScrollToTop />
        <ChatBot />
      </div>
    </ClickSpark>
  );
};

export default App;
