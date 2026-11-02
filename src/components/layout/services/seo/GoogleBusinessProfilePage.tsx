import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, ChevronRight, Clock, FileText, Globe, ImageIcon, List, MapPin, Megaphone, MessageSquareText, Navigation, Phone as PhoneIcon, Search, Send, Tag, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Chip, MapScene, Phone, Sprig, Storefront, WaveCover } from '../template/ServiceArt';
import { SEO_PAGE_DEFAULTS } from './seoShared';
import './GoogleBusinessProfilePage.css';

const Tree: React.FC = () => (
  <svg viewBox="0 0 60 100" className="sa-fill">
    <rect x="27" y="60" width="6" height="34" fill="#7a5a40" />
    <circle cx="30" cy="40" r="22" fill="#5f8f5a" /><circle cx="18" cy="52" r="14" fill="#6f9f64" /><circle cx="42" cy="50" r="15" fill="#4f7f4c" />
    <path d="M18 88h24l-3 12H21Z" fill="#8a6a50" />
  </svg>
);

const HeroVisual = (
  <div className="ss-stage gb-hero-stage">
    <Layer className="gb-l-tree" depth={3} float={false}><div className="gb-tree"><Tree /></div></Layer>
    <Layer className="gb-l-shop" depth={6} float={false}><div className="gb-shop"><Storefront /></div></Layer>
    <Layer className="gb-l-tree2" depth={5} float={false}><div className="gb-tree sm"><Tree /></div></Layer>
    <Layer className="gb-l-map" depth={10} float={false}>
      <div className="gb-map-wrap"><div className="gb-map"><MapScene /></div><svg viewBox="0 0 30 40" className="gb-pin"><path d="M15 39S2 24 2 15a13 13 0 0 1 26 0c0 9-13 24-13 24Z" fill="#0aa5a3" stroke="#fff" strokeWidth="1.5" /><circle cx="15" cy="15" r="5" fill="#fff" /></svg></div>
    </Layer>
    <Layer className="gb-l-phone" depth={16}>
      <Phone className="gb-phone">
        <div className="gb-profile">
          <h5>Your Business</h5>
          <div className="gb-img"><Storefront /></div>
          <div className="gb-actions">{[[Globe, 'Website'], [PhoneIcon, 'Call'], [Navigation, 'Directions']].map(([I, t]) => { const Icon = I as typeof Globe; return <span key={t as string}><i className="gb-action"><Icon /></i>{t as string}</span>; })}</div>
          <div className="gb-tabs"><span>Overview</span><span>Services</span><span>Photos</span><i className="gb-tab-line" /></div>
          <div className="gb-row"><Clock />Business hours<ChevronRight /></div>
          <div className="gb-row"><List />Services<ChevronRight /></div>
        </div>
      </Phone>
    </Layer>
  </div>
);

const chips = [
  [FileText, 'Profile Information', 'Checked and organised'],
  [Tag, 'Categories & Services', 'Relevant and clear'],
  [ImageIcon, 'Photos & Content', 'Guidance and recommendations'],
  [MessageSquareText, 'Reviews & Updates', 'Response framework'],
  [BarChart3, 'Next Steps', 'Agreed priorities'],
] as const;

const DeliverVisual = (
  <div className="ss-deliver-stage gb-deliver-stage">
    <Layer className="gb-l-book" depth={0}>
      <Book className="gb-book">
        <Brand />
        <h4>Google<br />Business Profile</h4>
        <p>Profile Review<br />&amp; Recommendations</p>
        <WaveCover />
        <div className="gb-book-img"><Storefront /></div>
      </Book>
    </Layer>
    {chips.map(([Icon, t, sub], i) => (
      <Layer key={t} className={`gb-l-chip gb-l-chip-${i}`} depth={0}><Chip icon={<Icon />} className="gb-chip">{t}<small>{sub}</small></Chip></Layer>
    ))}
    <Layer className="gb-l-sprig" depth={0} float={false}><svg viewBox="0 0 60 60" className="gb-sprig"><Sprig x={30} y={60} s={0.8} /><Sprig x={32} y={60} s={0.7} flip /></svg></Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'gbp',
  ...SEO_PAGE_DEFAULTS,
  titleTone: 'accent',
  crumb: 'Google Business Profile',
  eyebrow: 'GOOGLE BUSINESS PROFILE',
  title: ['Make your business profile work harder', 'for you.'],
  intro: 'Present accurate business information, useful visuals and clear contact options so nearby customers can learn about your business.',
  primaryCta: 'Discuss Your Business Profile',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE WORK ON', process: 'OUR PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [FileText, 'Accurate Business Information', ''],
    [ImageIcon, 'A More Complete Profile', ''],
    [UsersRound, 'Clear Customer Actions', ''],
  ],
  highlightStyle: 'plain',
  highlightsCard: true,
  overviewTitle: <>Give customers a clearer<br />picture of your business.</>,
  overviewText: 'A well-presented business profile helps people understand what you do, where you are and how to get in touch. We help you organise your profile information and present it clearly so nearby customers can find and learn about your business.',
  helps: ['Setting up an eligible business profile', 'Refreshing outdated business information', 'Improving profile content and consistency'],
  scopeTitle: 'Six key areas for a stronger business profile.',
  scopeIconStyle: 'plain',
  scope: [
    [UsersRound, 'Profile Setup & Access Support', 'Guidance with setting up or regaining access to your business profile.'],
    [FileText, 'Business Information Review', 'Check and improve your business name, description, hours and other key details.'],
    [Tag, 'Categories & Service Details', 'Help you choose relevant categories and present your services clearly.'],
    [ImageIcon, 'Photos & Profile Content', 'Guidance on useful photos and content to showcase your business.'],
    [MessageSquareText, 'Updates & Review Response Guidance', 'Support with regular updates and how to approach customer reviews.'],
    [BarChart3, 'Profile Insights & Next Steps', 'Review what’s working, identify opportunities and agree next steps.'],
  ],
  deliverTitle: <>A well-organised profile.<br />Clear next steps.</>,
  deliverables: ['Profile review and recommendations', 'Business information checklist', 'Category and service guidance', 'Photo and content recommendations', 'Review response framework', 'Agreed updates and handover notes'],
  deliverNote: 'Eligibility, verification, access and available features depend on your business and the platform.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processTitle: 'Our profile optimisation process.',
  processStyle: 'cards',
  stepIcons: [Search, FileText, Tag, Send],
  steps: [
    ['Understand', 'Review your business and service model.'],
    ['Review', 'Check access and existing information.'],
    ['Refine', 'Update agreed profile elements.'],
    ['Handover', 'Document changes and ongoing priorities.'],
  ],
  faqTitle: 'Common questions.',
  faqLayout: 'paired',
  faqStyle: 'chevron',
  faqs: [
    ['Can you help with a new business profile?', 'We can guide setup for eligible businesses and help prepare accurate information. Verification decisions remain with Google.'],
    ['Can you update an existing profile?', 'Yes. With the right access, we review your current profile and update the agreed information, categories and content.'],
    ['Does this include responding to customer reviews?', 'We provide a review response framework. Ongoing review responses can be added to the agreed scope.'],
  ],
  relatedTitle: 'Explore related services.',
  relatedStyle: 'arrow',
  related: [
    { icon: MapPin, title: 'Local SEO', text: 'Improve your visibility in local search results.', target: 'Local SEO' },
    { icon: FileText, title: 'On-Page SEO', text: 'Strengthen your website content and structure.', target: 'On-Page SEO' },
    { icon: BarChart3, title: 'SEO Audit & Strategy', text: 'Identify opportunities and build a clear plan.', target: 'SEO Audit & Strategy' },
  ],
  ctaIcon: Megaphone,
  ctaTitle: 'Give local customers a better first impression.',
  ctaText: 'Let’s discuss how we can help you get more from your business profile.',
  ctaButton: 'Let’s Talk',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.timeline({ repeat: -1, defaults: { duration: 0.5, ease: 'power2.inOut' } })
      .to('.gb-tab-line', { xPercent: 100, delay: 1.6 })
      .to('.gb-tab-line', { xPercent: 200, delay: 1.6 })
      .to('.gb-tab-line', { xPercent: 0, delay: 1.6 });
    gsap.to('.gb-action', { scale: 1.15, duration: 0.4, stagger: { each: 0.45, repeat: -1, yoyo: true, repeatDelay: 1.6 }, ease: 'sine.inOut' });
    gsap.to('.gb-pin', { y: '-0.8em', duration: 1.1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.gb-row', { backgroundColor: '#e8f4fa', duration: 0.5, stagger: { each: 0.8, repeat: -1, yoyo: true, repeatDelay: 1.2 } });
    gsap.to('.gb-chip .sa-chip-icon', { scale: 1.15, duration: 0.5, stagger: { each: 0.35, repeat: -1, yoyo: true, repeatDelay: 1.4 }, ease: 'sine.inOut' });
  },
};

export const GoogleBusinessProfilePage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default GoogleBusinessProfilePage;
