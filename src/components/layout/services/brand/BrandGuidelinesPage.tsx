import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, FileText, ImageIcon, Layers, Lightbulb, MessageSquareText, Palette, PenTool, PieChart, Search, Send, Settings, ShieldCheck, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Lines, MountainScene, TypeCard } from '../template/ServiceArt';
import { BRAND_PAGE_DEFAULTS } from './brandShared';
import './BrandGuidelinesPage.css';

/** Isometric cube brand mark. */
const HexMark: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" className={`bg-hex ${className}`}>
    <path d="M50 6 L90 28 L50 50 L10 28Z" fill="#5fc9d6" />
    <path d="M10 28 L50 50 L50 94 L10 72Z" fill="#0a6fa8" />
    <path d="M90 28 L50 50 L50 94 L90 72Z" fill="#0b2b4c" />
  </svg>
);

/** Angular blue/teal geometric pattern for covers. */
const Geo: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={`bg-geo ${className}`}>
    <path d="M0 0 L60 0 L20 50Z" fill="#0b4f8a" /><path d="M60 0 L100 0 L100 40Z" fill="#5fc9d6" />
    <path d="M20 50 L60 0 L100 40 L60 70Z" fill="#1a8fd0" /><path d="M0 50 L20 50 L60 70 L0 100Z" fill="#0aa5a3" opacity=".85" />
    <path d="M60 70 L100 40 L100 100 L40 100Z" fill="#0b2b4c" />
  </svg>
);

const Template: React.FC<{ text?: string }> = ({ text }) => (
  <span className="bg-tpl"><MountainScene />{text && <b>{text}</b>}</span>
);

const HeroVisual = (
  <div className="ss-stage bg-hero-stage">
    <Layer className="bg-l-book" depth={5} float={false}>
      <div className="bg-spread">
        <div className="bg-page">
          <span className="bg-page-mark"><HexMark /></span>
          <h5>Brand<br />Guidelines</h5>
          <Lines n={3} />
        </div>
        <div className="bg-page">
          <small>Logo Usage</small>
          <span className="bg-usage"><HexMark /></span>
          <small>Colour Palette</small>
          <span className="bg-dots">{['#0b4f8a', '#0a6fa8', '#5fc9d6', '#c9d6dc'].map((c) => <i key={c} style={{ background: c }} />)}</span>
          <TypeCard className="bg-type" />
        </div>
      </div>
    </Layer>
    <Layer className="bg-l-brochure" depth={10} float={false}>
      <div className="bg-brochure"><Geo /><span>Building a brighter future together.</span></div>
    </Layer>
    <Layer className="bg-l-tablet" depth={16}>
      <div className="bg-tablet">
        <div className="bg-tablet-screen">
          <small>Social Media Templates</small>
          <div className="bg-tpl-row">{[0, 1, 2].map((i) => <Template key={i} text="Ideas" />)}</div>
          <small>Presentation Templates</small>
          <div className="bg-tpl-row">{[0, 1, 2].map((i) => <Template key={i} />)}</div>
        </div>
      </div>
    </Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage bg-deliver-stage">
    <Layer className="bg-l-gbook" depth={0}>
      <Book className="bg-gbook">
        <Geo className="bg-gbook-geo" />
        <h4>Brand<br />Guidelines<br />&amp; Templates</h4>
        <p>A consistent brand<br />for a brighter future.</p>
      </Book>
    </Layer>
    <Layer className="bg-l-tab2" depth={0}>
      <div className="bg-tablet lg">
        <div className="bg-tablet-screen bg-tab2">
          <div className="bg-tab2-copy"><Lines n={1} /><b>Ideas today.<br />Brighter<br />tomorrows.</b><i className="bg-tab2-btn" /></div>
          <span className="bg-tab2-img"><MountainScene /></span>
          <span className="bg-tab2-side"><MountainScene variant={1} /></span>
        </div>
      </div>
    </Layer>
    <Layer className="bg-l-fold" depth={0}>
      <div className="bg-fold"><span className="bg-fold-text">A consistent<br />brand creates<br />bigger opportunities.</span><span className="bg-fold-img"><MountainScene /></span><span className="bg-fold-img"><MountainScene variant={1} /></span></div>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'brand-guidelines',
  ...BRAND_PAGE_DEFAULTS,
  crumb: 'Brand Guidelines & Templates',
  eyebrow: 'BRAND GUIDELINES & TEMPLATES',
  title: ['One brand. A consistent', 'way to show up.'],
  intro: 'Give your team clear brand rules and practical templates to create consistent materials with confidence.',
  primaryCta: 'Build Your Brand Toolkit',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE CREATE', process: 'OUR TOOLKIT PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [ShieldCheck, 'Clear Usage Rules', ''],
    [UsersRound, 'Practical Team Templates', ''],
    [Layers, 'Consistent Brand Materials', ''],
  ],
  highlightStyle: 'plain',
  overviewTitle: <>Make brand consistency<br />easier for your team.</>,
  overviewText: 'We translate your brand identity and messaging into clear, practical guidance and ready-to-use templates, so your team can create consistent, on-brand materials every day.',
  helpIcon: Lightbulb,
  helps: ['Rolling out a new visual identity', 'Aligning materials across teams', 'Reducing inconsistency in everyday designs'],
  scopeIconStyle: 'plain',
  scope: [
    [PenTool, 'Logo Usage & Clear Space', 'Clear rules for logo use, versions and the space it needs.'],
    [PieChart, 'Colour & Typography Standards', 'Defined colour palette, type choices and how to use them.'],
    [ImageIcon, 'Imagery & Graphic Direction', 'Guidance on imagery style, graphics and visual elements.'],
    [MessageSquareText, 'Voice & Messaging Guidance', 'Key messaging, tone of voice and examples for different uses.'],
    [Layers, 'Social & Marketing Templates', 'Editable templates for social posts, ads and marketing materials.'],
    [FileText, 'Presentation & Document Templates', 'Branded templates for presentations, proposals and everyday documents.'],
  ],
  deliverTitle: <>A practical toolkit<br />for everyday brand use.</>,
  deliverables: ['Agreed brand guidelines document', 'Logo colour and type usage rules', 'Imagery and graphic examples', 'Selected editable templates', 'Template usage instructions', 'Organised handover assets'],
  deliverNote: 'Template count, editing platform, asset availability and licensing are agreed for your project.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processStyle: 'cards',
  stepIcons: [Search, FileText, Settings, Send],
  steps: [
    ['Review', 'Understand your identity and team needs.'],
    ['Define', 'Document agreed brand standards.'],
    ['Build', 'Create templates for selected uses.'],
    ['Handover', 'Share assets and practical guidance.'],
  ],
  faqStyle: 'chevron',
  faqs: [
    ['Will the templates be editable?', 'We agree an editing platform suited to your team and provide the selected templates in the agreed format.'],
    ['Can you use our existing brand identity?', 'Yes. We document your current identity and fill any gaps needed for clear, practical guidelines.'],
    ['Does this include designing a new logo?', 'No. Logo design is part of our Logo & Visual Identity service, which can come before or alongside this work.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { icon: Palette, title: 'Logo & Visual Identity', text: '', target: 'Logo & Visual Identity' },
    { icon: MessageSquareText, title: 'Brand Messaging & Voice', text: '', target: 'Brand Messaging & Voice' },
    { icon: BarChart3, title: 'Brand Strategy & Positioning', text: '', target: 'Brand Strategy & Positioning' },
  ],
  ctaTitle: 'Give your team the tools to stay on brand.',
  ctaButton: 'Let’s Talk Brand',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.to('.bg-hero-stage .bg-tpl', { scale: 1.08, boxShadow: '0 0.6em 1.2em #0b2b4c44', duration: 0.4, stagger: { each: 0.3, repeat: -1, yoyo: true, repeatDelay: 2 } });
    gsap.to('.bg-page-mark .bg-hex', { rotation: 8, transformOrigin: '50% 50%', duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.bg-dots i', { scale: 1.25, duration: 0.45, stagger: { each: 0.25, repeat: -1, yoyo: true, repeatDelay: 1 } });
    gsap.to('.bg-tab2-btn', { scaleX: 1.15, transformOrigin: '0% 50%', duration: 0.7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const BrandGuidelinesPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default BrandGuidelinesPage;
