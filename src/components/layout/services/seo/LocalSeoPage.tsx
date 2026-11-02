import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, Check, FileText, Globe, MapPin, MessageCircleMore, Navigation, Network, Phone as PhoneIcon, Search, Store, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Lines, MapScene, Phone, Storefront } from '../template/ServiceArt';
import { SEO_PAGE_DEFAULTS } from './seoShared';
import './LocalSeoPage.css';

const Pin: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 30 40" className={`lo-pin-svg ${className}`}>
    <path d="M15 39S2 24 2 15a13 13 0 0 1 26 0c0 9-13 24-13 24Z" fill="#0aa5a3" stroke="#fff" strokeWidth="1.5" />
    <circle cx="15" cy="15" r="5" fill="#fff" />
  </svg>
);

const HeroVisual = (
  <div className="ss-stage lo-hero-stage">
    <Layer className="lo-l-ground" depth={3} float={false}><div className="lo-ground"><MapScene /></div></Layer>
    <Layer className="lo-l-shop" depth={12} float={false}><div className="lo-shop"><Storefront /></div></Layer>
    <Layer className="lo-l-bigpin" depth={20} float={false}>
      <div className="lo-bigpin-wrap"><span className="lo-ripple" /><Pin className="lo-bigpin" /></div>
    </Layer>
    <Layer className="lo-l-phone" depth={14}>
      <Phone className="lo-phone">
        <MapScene />
        <div className="lo-searchbar"><MapPin />local business near me<Search /></div>
        {[[22, 30], [58, 24], [70, 44], [36, 50]].map(([l, t], i) => (
          <span key={i} className="lo-pin" style={{ left: `${l}%`, top: `${t}%` }}><Pin /></span>
        ))}
        <div className="lo-biz">
          <div className="lo-biz-img"><Storefront /></div>
          <b>Your Business</b>
          <div className="lo-biz-actions"><span><Globe />Website</span><span><PhoneIcon />Call</span><span><Navigation />Directions</span></div>
        </div>
      </Phone>
    </Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage lo-deliver-stage">
    <Layer className="lo-l-book" depth={0}>
      <Book className="lo-book">
        <Brand />
        <h4>Local SEO<br />Report</h4>
        <div className="lo-book-map"><MapScene /><Pin className="lo-book-pin" /></div>
      </Book>
    </Layer>
    <Layer className="lo-l-info" depth={0}>
      <div className="lo-card lo-info">
        <span className="lo-card-icon"><Store /></span>
        <div>
          <b>Business Information</b>
          {['Business name', 'Business category', 'Website link', 'Contact options', 'Service areas'].map((t) => <span className="lo-check-row" key={t}><i><Check /></i>{t}</span>)}
        </div>
      </div>
    </Layer>
    <Layer className="lo-l-pages" depth={0}>
      <div className="lo-card"><span className="lo-card-icon"><FileText /></span><div><b>Location Pages</b><Lines n={2} /></div></div>
    </Layer>
    <Layer className="lo-l-listings" depth={0}>
      <div className="lo-card"><span className="lo-card-icon"><Network /></span><div><b>Local Listings</b><Lines n={2} /></div></div>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'local',
  ...SEO_PAGE_DEFAULTS,
  crumb: 'Local SEO',
  eyebrow: 'LOCAL SEO',
  title: ['Help nearby customers', 'find your business.'],
  intro: 'Build a clear, consistent local presence across your business profile, website and relevant listings.',
  primaryCta: 'Discuss Your Local Presence',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE WORK ON', process: 'OUR LOCAL SEO PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [Search, 'Local Search Relevance', 'Be visible for relevant local searches.'],
    [FileText, 'Consistent Business Details', 'Accurate information across platforms.'],
    [UsersRound, 'Easier Customer Contact', 'Make it simple for customers to reach you.'],
  ],
  highlightStyle: 'circle',
  highlightsTinted: true,
  overviewTitle: <>Connect your business with<br />people searching nearby.</>,
  overviewText: 'Local SEO helps your business appear in relevant local searches and on map platforms. We focus on a clear, consistent local presence across your business profile, website and key listings, so nearby customers can easily find useful information and get in touch.',
  helps: ['Serving customers in a local area', 'Improving an existing business profile', 'Managing multiple business locations'],
  scopeIconStyle: 'circle',
  scope: [
    [Search, 'Local Presence Audit', 'Review your current local presence across profiles, website and listings.'],
    [Store, 'Business Profile Optimisation', 'Improve your business profile with accurate and helpful information.'],
    [BarChart3, 'Local Keyword Research', 'Identify relevant local keywords your customers are searching for.'],
    [FileText, 'Location Page Improvements', 'Refine or create location pages with useful, relevant information.'],
    [Network, 'Business Listing Consistency', 'Check and align your business details across key online listings.'],
    [MessageCircleMore, 'Review Response Guidance', 'Provide guidance on responding to customer reviews constructively.'],
  ],
  deliverTitle: <>A clearer local presence.<br />Practical next steps.</>,
  deliverables: ['Local presence review', 'Business profile recommendations', 'Local keyword opportunities', 'Location page guidance', 'Listing consistency checklist', 'Prioritised action plan'],
  deliverNote: 'Locations, profile eligibility, access and implementation scope are agreed for your business.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processStyle: 'badge',
  steps: [
    ['Discover', 'Understand your business and service areas.'],
    ['Review', 'Check profiles, pages and listings.'],
    ['Optimise', 'Refine agreed local presence elements.'],
    ['Monitor', 'Review available data and next steps.'],
  ],
  faqLayout: 'paired',
  faqStyle: 'plus-left',
  faqs: [
    ['Can you help a service-area business?', 'We review your service model and agree suitable profile and website improvements for the areas you genuinely serve.'],
    ['Can you support multiple locations?', 'Yes. We can plan location pages and keep business details consistent across each location’s profile and listings.'],
    ['Does this include managing customer reviews?', 'We provide review response guidance. Ongoing review management can be added to the agreed scope.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { icon: BarChart3, title: 'SEO Audit & Strategy', text: 'Get a clear plan to improve your overall search performance.', target: 'SEO Audit & Strategy' },
    { icon: FileText, title: 'On-Page SEO', text: 'Optimise your website pages for greater relevance and visibility.', target: 'On-Page SEO' },
    { icon: Search, title: 'Keyword & Search Intent Research', text: 'Find the right search opportunities for your business.', target: 'Keyword & Search Intent Research' },
  ],
  ctaTitle: 'Make it easier for local customers to reach you.',
  ctaText: 'Build a stronger local presence with clear, consistent information across your business profile, website and key listings.',
  ctaButton: 'Let’s Talk Local SEO',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.timeline({ repeat: -1, repeatDelay: 1.8, delay: 0.8 })
      .fromTo('.lo-pin', { y: '-2.5em', opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, stagger: 0.25, ease: 'bounce.out' })
      .fromTo('.lo-biz', { y: '2em', opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to('.lo-pin, .lo-biz', { opacity: 0, duration: 0.4 }, '+=2.6');
    gsap.to('.lo-bigpin', { y: '-0.8em', duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.fromTo('.lo-ripple', { scale: 0.4, opacity: 0.7 }, { scale: 1.6, opacity: 0, duration: 1.8, repeat: -1, ease: 'power2.out' });
    gsap.fromTo('.lo-book-pin', { y: '-0.6em' }, { y: 0, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.fromTo('.lo-check-row i', { scale: 0 }, { scale: 1, duration: 0.3, stagger: 0.25, repeat: -1, repeatDelay: 2.4, ease: 'back.out(3)' });
  },
};

export const LocalSeoPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default LocalSeoPage;
