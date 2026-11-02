import React from 'react';
import { gsap } from 'gsap';
import { FileText, Map as MapIcon, MessagesSquare, Monitor as MonitorIcon, Palette, PenTool, RefreshCw, Search, Settings, Share2, Target, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Laptop, Phone, Sprig, ThumbBuilding } from '../template/ServiceArt';
import { BRAND_PAGE_DEFAULTS } from './brandShared';
import './BrandExperiencePage.css';

/** Overlapping teal/navy circles — the identity pattern carried across every touchpoint. */
const Circles: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" className={`bx-circles ${className}`}>
    <g className="bx-circles-g">
      <circle cx="70" cy="30" r="34" fill="#0b4f6a" />
      <circle cx="40" cy="70" r="30" fill="#0aa5a3" opacity=".9" />
      <circle cx="85" cy="80" r="24" fill="#0b2b4c" />
      <circle cx="20" cy="20" r="16" fill="#5fc9d6" opacity=".85" />
    </g>
  </svg>
);

const HeroVisual = (
  <div className="ss-stage bx-hero-stage">
    <Layer className="bx-l-laptop" depth={6} float={false}>
      <Laptop className="bx-laptop">
        <div className="bx-site">
          <div className="bx-site-nav"><Brand /><i /><i /><i /></div>
          <div className="bx-site-hero"><b>A more<br />connected<br />brand experience.</b><span className="bx-site-art"><Circles /><span className="bx-site-img"><ThumbBuilding /></span></span></div>
        </div>
      </Laptop>
    </Layer>
    <Layer className="bx-l-box" depth={10}><div className="bx-box"><Brand /><Circles /></div></Layer>
    <Layer className="bx-l-phone" depth={16}>
      <Phone className="bx-phone"><div className="bx-profile"><span className="bx-avatar"><Brand light /></span><div className="bx-grid">{Array.from({ length: 9 }, (_, i) => <i key={i} className="bx-tile">{i % 3 === 1 ? <Circles /> : null}</i>)}</div></div></Phone>
    </Layer>
    <Layer className="bx-l-brochure" depth={12} float={false}><div className="bx-brochure"><Circles /><b>Brand<br />Experience &amp;<br />Consistency</b></div></Layer>
    <Layer className="bx-l-cards" depth={14} float={false}><div className="bx-cards"><span><Brand /></span><span><Brand /></span></div></Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage bx-deliver-stage">
    <Layer className="bx-l-plant" depth={0} float={false}><svg viewBox="0 0 80 110" className="bx-plant"><Sprig x={40} y={80} s={1.2} /><Sprig x={42} y={80} s={1} flip /><path d="M24 78h32l-4 30H28Z" fill="#f2efe9" /></svg></Layer>
    <Layer className="bx-l-laptop2" depth={0}>
      <Laptop className="bx-laptop sm"><div className="bx-site"><div className="bx-site-hero"><b>A more<br />connected<br />brand experience.</b><span className="bx-site-art"><Circles /></span></div></div></Laptop>
    </Layer>
    <Layer className="bx-l-phone2" depth={0}><Phone className="bx-phone sm"><div className="bx-profile"><span className="bx-avatar"><Brand light /></span><div className="bx-grid">{Array.from({ length: 6 }, (_, i) => <i key={i} className="bx-tile">{i % 2 ? <Circles /> : null}</i>)}</div></div></Phone></Layer>
    <Layer className="bx-l-book" depth={0}>
      <Book className="bx-book"><Brand /><h4>Brand<br />Experience &amp;<br />Consistency</h4><Circles className="bx-book-circles" /></Book>
    </Layer>
    <Layer className="bx-l-stack" depth={0}><div className="bx-stack"><Brand /></div></Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'brand-experience',
  ...BRAND_PAGE_DEFAULTS,
  crumb: 'Brand Experience & Consistency',
  eyebrow: 'BRAND EXPERIENCE & CONSISTENCY',
  title: ['One brand. A connected', 'experience.'],
  intro: 'Align your brand’s visuals, messaging and customer touchpoints so every interaction feels clear, coherent and familiar.',
  primaryCta: 'Align Your Brand Experience',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE ALIGN', process: 'OUR ALIGNMENT PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [Share2, 'Connected Touchpoints', 'A seamless experience across every channel.'],
    [MessagesSquare, 'Consistent Communication', 'Clear, unified messaging at every stage.'],
    [UsersRound, 'Practical Team Guidance', 'Tools and support to keep your brand consistent.'],
  ],
  highlightStyle: 'plain',
  highlightsTinted: true,
  overviewTitle: <>Make your brand feel familiar<br />wherever people meet it.</>,
  overviewText: 'We review and align your brand’s expression across agreed digital, print and customer communication materials, helping you create a consistent and coherent experience at every touchpoint.',
  helps: [],
  helpItems: [
    [Target, 'Aligning materials across teams', ''],
    [RefreshCw, 'Rolling out a refreshed identity', ''],
    [UsersRound, 'Resolving inconsistent customer touchpoints', ''],
  ],
  scopeTitle: 'Six areas for a more consistent brand experience.',
  scopeIconStyle: 'plain',
  scope: [
    [MonitorIcon, 'Brand Touchpoint Review', 'Assess key digital, print and customer touchpoints.'],
    [Palette, 'Visual Consistency Checks', 'Review the use of colours, typography, imagery and design elements.'],
    [MessagesSquare, 'Messaging & Voice Alignment', 'Ensure consistent tone, language and key messages.'],
    [Share2, 'Customer Journey Touchpoints', 'Look at the end-to-end experience across customer touchpoints.'],
    [UsersRound, 'Team Guidance & Templates', 'Provide practical guidance and templates for your team.'],
    [FileText, 'Rollout Priorities & Review', 'Agree priorities and a plan for ongoing review.'],
  ],
  deliverTitle: 'A clearer, more consistent brand experience.',
  deliverables: ['Touchpoint review summary', 'Visual and messaging gap register', 'Prioritised alignment recommendations', 'Selected touchpoint refinements', 'Team usage guidance', 'Brand rollout and review plan'],
  deliverNote: 'Scope note: touchpoints, asset updates, team sessions and implementation responsibilities are agreed for your project.',
  deliverVisual: DeliverVisual,
  processTitle: 'A clear and collaborative process.',
  processStyle: 'cards',
  stepIcons: [MapIcon, Search, Settings, UsersRound],
  steps: [
    ['Map', 'Identify key brand touchpoints.'],
    ['Review', 'Compare visuals, messaging and experience.'],
    ['Align', 'Refine agreed materials and guidance.'],
    ['Support', 'Plan rollout and ongoing checks.'],
  ],
  faqTitle: 'Your questions, answered.',
  faqStyle: 'chevron',
  faqs: [
    ['Does this include redesigning every brand asset?', 'We agree which touchpoints need review and which assets will be refined. A full redesign can be scoped separately.'],
    ['Can you work with our existing guidelines?', 'Yes. We use your current guidelines as the reference point and recommend updates where gaps appear.'],
    ['How do you help our team maintain consistency?', 'Through practical guidance, templates and review sessions, so your team can apply the brand with confidence.'],
  ],
  relatedTitle: 'Explore related brand services.',
  relatedStyle: 'arrow',
  related: [
    { icon: FileText, title: 'Brand Guidelines & Templates', text: 'Create clear guidelines and practical templates for consistent brand use.', target: 'Brand Guidelines & Templates' },
    { icon: MessagesSquare, title: 'Brand Messaging & Voice', text: 'Develop clear, consistent messaging and tone of voice.', target: 'Brand Messaging & Voice' },
    { icon: PenTool, title: 'Logo & Visual Identity', text: 'Build a distinctive and versatile visual identity.', target: 'Logo & Visual Identity' },
  ],
  ctaTitle: 'Bring every brand touchpoint into alignment.',
  ctaButton: 'Let’s Talk Brand',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.to('.bx-circles-g', { rotation: 360, svgOrigin: '55 55', duration: 24, ease: 'none', repeat: -1 });
    gsap.to('.bx-hero-stage .bx-tile', { scale: 0.85, opacity: 0.6, duration: 0.4, stagger: { each: 0.2, from: 'random', repeat: -1, yoyo: true, repeatDelay: 1 } });
    gsap.to('.bx-plant .sa-sprig', { rotation: 4, svgOrigin: '40 80', duration: 2.6, stagger: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const BrandExperiencePage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default BrandExperiencePage;
