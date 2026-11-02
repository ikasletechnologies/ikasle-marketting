import React from 'react';
import { gsap } from 'gsap';
import { FileText, Folder, Megaphone, MessagesSquare, Monitor as MonitorIcon, MonitorSmartphone, Network, Palette, PenTool, Target, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Chip, Lines, Monitor, Phone, Sprig, ThumbBuilding } from '../template/ServiceArt';
import { BRAND_PAGE_DEFAULTS } from './brandShared';
import './WebsiteDesignPage.css';

/** A miniature marketing website; `size` switches the responsive layout. */
const SiteMock: React.FC<{ size: 'desktop' | 'tablet' | 'phone' }> = ({ size }) => (
  <div className={`wd-site wd-s-${size}`}>
    <div className="wd-scroll">
      <div className="wd-nav"><Brand />{size === 'desktop' && <span className="wd-links"><i /><i /><i /><i /></span>}<b className="wd-cta" /></div>
      <div className="wd-hero">
        <div className="wd-hero-copy"><h5>Ideas into <em>meaningful</em> growth.</h5><Lines n={2} /><b className="wd-btn" /></div>
        <span className="wd-hero-img"><ThumbBuilding /></span>
      </div>
      <div className="wd-features">{['Brand Strategy', 'Creative Design', 'Digital Presence'].map((t) => <span key={t}><i />{t}</span>)}</div>
      <div className="wd-more"><Lines n={3} /><span className="wd-more-img"><ThumbBuilding /></span></div>
    </div>
  </div>
);

const HeroVisual = (
  <div className="ss-stage wd-hero-stage">
    <Layer className="wd-l-plant" depth={3} float={false}>
      <svg viewBox="0 0 80 110" className="wd-plant"><Sprig x={40} y={80} s={1.3} /><Sprig x={42} y={80} s={1.1} flip /></svg>
    </Layer>
    <Layer className="wd-l-monitor" depth={6} float={false}><Monitor className="wd-monitor"><SiteMock size="desktop" /></Monitor></Layer>
    <Layer className="wd-l-tablet" depth={12}><div className="wd-tablet"><SiteMock size="tablet" /></div></Layer>
    <Layer className="wd-l-phone" depth={18}><Phone className="wd-phone"><SiteMock size="phone" /></Phone></Layer>
    <Layer className="wd-l-c1" depth={22}><Chip icon={<Network />} className="wd-chip">Clear Structure<small>Easy to navigate</small></Chip></Layer>
    <Layer className="wd-l-c2" depth={24}><Chip icon={<MonitorSmartphone />} className="wd-chip">Responsive Layouts<small>Beautiful on every device</small></Chip></Layer>
    <Layer className="wd-l-c3" depth={26}><Chip icon={<Target />} className="wd-chip">Focused Actions<small>Guide users to what’s next</small></Chip></Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage wd-deliver-stage">
    <Layer className="wd-l-wire" depth={0}>
      <div className="wd-wire">{[0, 1, 2].map((i) => <span key={i} className="wd-wire-box"><i /><Lines n={2} /></span>)}</div>
    </Layer>
    <Layer className="wd-l-print" depth={0}><div className="wd-print"><SiteMock size="desktop" /></div></Layer>
    <Layer className="wd-l-book" depth={0}>
      <Book tone="navy" className="wd-book">
        <Brand light />
        <h4>Website &amp;<br />Landing Page<br />Design</h4>
        <span className="sa-book-rule" />
        <p>A clear design direction<br />for a stronger online presence.</p>
      </Book>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'website-design',
  ...BRAND_PAGE_DEFAULTS,
  titleTone: 'accent',
  crumb: 'Website & Landing Page Design',
  eyebrow: 'WEBSITE & LANDING PAGE DESIGN',
  title: ['Designed to make your', 'next step clear.'],
  intro: 'Create thoughtful website and landing page experiences that bring your brand, content and customer journey together.',
  primaryCta: 'Discuss Your Website',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE DESIGN', process: 'OUR DESIGN PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [UsersRound, 'Clear User Journeys', 'Help visitors find what they need.'],
    [MonitorIcon, 'Responsive Visual Design', 'Look great on every device.'],
    [Target, 'Purposeful Page Layouts', 'Support your business goals.'],
  ],
  highlightStyle: 'circle',
  overviewTitle: <>Bring clarity to every page<br />and interaction.</>,
  overviewText: 'We design website and landing page experiences with clear structure and purposeful content, tailored to your audience’s needs and your business goals. Every page is created to guide, inform and inspire the next step.',
  helps: ['Launching or refreshing a website', 'Creating a focused campaign landing page', 'Improving unclear page structure'],
  scopeIconStyle: 'circle',
  scope: [
    [Network, 'Website Structure & Page Planning', 'Plan a clear structure for your key pages and content.'],
    [FileText, 'Wireframes & User Journeys', 'Map user journeys and design wireframes to define layout and flow.'],
    [Palette, 'Brand-Aligned UI Design', 'Create modern, on-brand designs that bring your content to life.'],
    [Megaphone, 'Campaign Landing Pages', 'Design focused landing pages for specific campaigns or goals.'],
    [MonitorSmartphone, 'Responsive Layouts', 'Design for a seamless experience across desktop, tablet and mobile.'],
    [Folder, 'Design Handover & Guidance', 'Provide organised design files with guidance for implementation.'],
  ],
  deliverTitle: <>A clear design direction,<br />ready for the next stage.</>,
  deliverColumns: 2,
  deliverables: ['Agreed page structure', 'Selected wireframes', 'High-fidelity page designs', 'Responsive layout specifications', 'Key interaction guidance', 'Organised design handover files'],
  deliverNote: 'Page count, breakpoints, content, interactions, development and publishing are agreed for your project.',
  deliverVisual: DeliverVisual,
  processStyle: 'cards',
  steps: [
    ['Discover', 'Understand audience, goals and content.'],
    ['Structure', 'Plan pages and key journeys.'],
    ['Design', 'Create and refine agreed layouts.'],
    ['Handover', 'Prepare design files and implementation guidance.'],
  ],
  faqStyle: 'plus-left',
  faqs: [
    ['Does this include website development?', 'This service focuses on design. Development, integrations and publishing can be included when agreed in the project scope.'],
    ['Can you redesign an existing website?', 'Yes. We review your current site and content, then design a clearer structure and refreshed pages.'],
    ['Will mobile layouts be included?', 'Yes. Responsive layouts for the agreed breakpoints are part of the design scope.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { icon: PenTool, title: 'Logo & Visual Identity', text: 'Create a distinctive visual identity for your brand.', target: 'Logo & Visual Identity' },
    { icon: MessagesSquare, title: 'Brand Messaging & Voice', text: 'Develop a clear and consistent brand message.', target: 'Brand Messaging & Voice' },
    { icon: FileText, title: 'Marketing Collateral Design', text: 'Design impactful materials to support your marketing.', target: 'Marketing Collateral Design' },
  ],
  ctaTitle: 'Give your website a clearer direction.',
  ctaText: 'Create a website or landing page design that brings your brand and goals together.',
  ctaButton: 'Let’s Talk Design',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.to('.wd-hero-stage .wd-scroll', { yPercent: -28, duration: 4, stagger: 0.6, repeat: -1, yoyo: true, repeatDelay: 1.2, ease: 'power1.inOut' });
    gsap.to('.wd-btn', { scale: 1.12, duration: 0.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.wd-chip .sa-chip-icon', { scale: 1.15, duration: 0.5, stagger: { each: 0.4, repeat: -1, yoyo: true, repeatDelay: 1.2 } });
    gsap.to('.wd-wire-box i', { opacity: 0.4, duration: 0.6, stagger: { each: 0.3, repeat: -1, yoyo: true } });
  },
};

export const WebsiteDesignPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default WebsiteDesignPage;
