import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, BookOpen, ClipboardList, FileText, ImageIcon, Layers, Lightbulb, MessageSquareText, Monitor as MonitorIcon, PenTool, Sparkles, Target } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Lines, MountainScene, Sprig, ThumbBuilding } from '../template/ServiceArt';
import { BRAND_PAGE_DEFAULTS } from './brandShared';
import './MarketingCollateralPage.css';

/** Diagonal-cut cover image used across the collateral pieces. */
const Cut: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`mc-cut ${className}`}>{children}</span>
);

const HeroVisual = (
  <div className="ss-stage mc-hero-stage">
    <Layer className="mc-l-plant" depth={3} float={false}>
      <svg viewBox="0 0 80 110" className="mc-plant"><Sprig x={40} y={80} s={1.3} /><Sprig x={42} y={80} s={1.1} flip /><Sprig x={38} y={80} s={0.9} /><path d="M24 78h32l-4 30H28Z" fill="#f2f4f4" /></svg>
    </Layer>
    <Layer className="mc-l-brochure" depth={8}>
      <div className="mc-brochure"><Cut><ThumbBuilding /></Cut><h5>Strategic<br />Ideas for<br />a Brighter<br />Tomorrow</h5><i className="mc-rule" /></div>
    </Layer>
    <Layer className="mc-l-trifold" depth={6} float={false}>
      <div className="mc-trifold"><span><b>Ideas<br />Strategy<br />Progress</b><Lines n={3} /></span><span><ThumbBuilding /></span><span><MountainScene /></span></div>
    </Layer>
    <Layer className="mc-l-mag" depth={14}>
      <div className="mc-mag">
        <div className="mc-mag-page"><Cut className="sm"><MountainScene /></Cut><h5>A Clearer<br />Path Forward</h5></div>
        <div className="mc-mag-page mc-turn"><h5>Solutions<br />That Make<br />a Difference</h5>{[0, 1, 2, 3].map((i) => <span key={i} className="mc-li"><i />{<Lines n={1} />}</span>)}<span className="mc-mag-img"><MountainScene variant={1} /></span></div>
      </div>
    </Layer>
    <Layer className="mc-l-tablet" depth={20}>
      <div className="mc-tablet"><div className="mc-tablet-screen"><b>Ideas<br />Strategy<br />Progress</b><span><MountainScene /></span></div></div>
    </Layer>
  </div>
);

const approach = [[Lightbulb, 'Strategic Thinking'], [Sparkles, 'Creative Execution'], [Target, 'Meaningful Results']] as const;

const DeliverVisual = (
  <div className="ss-deliver-stage mc-deliver-stage">
    <Layer className="mc-l-spread" depth={0}>
      <div className="mc-spread">
        <div className="mc-spread-l"><span className="mc-spread-img"><ThumbBuilding /></span><h5>Ideas<br />today.<br />Progress<br />tomorrow.</h5><small>Clear ideas.<br />Stronger brands.<br />Brighter opportunities.</small></div>
        <div className="mc-spread-r"><h6>Our Approach</h6><Lines n={3} />{approach.map(([Icon, t]) => <span key={t} className="mc-step"><i><Icon /></i>{t}</span>)}</div>
      </div>
    </Layer>
    <Layer className="mc-l-b1" depth={0}>
      <div className="mc-flyer"><h5>Solutions<br />That Move<br />You Forward</h5><span><MountainScene /></span></div>
    </Layer>
    <Layer className="mc-l-b2" depth={0}>
      <div className="mc-flyer alt"><span><ThumbBuilding /></span><h5>A Stronger<br />Brand for<br />What’s Next</h5></div>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'collateral',
  ...BRAND_PAGE_DEFAULTS,
  titleTone: 'accent',
  crumb: 'Marketing Collateral Design',
  eyebrow: 'MARKETING COLLATERAL DESIGN',
  title: ['Bring your message to life. Across', 'every format.'],
  intro: 'Create clear, consistent marketing materials that help your team present your brand, explain your offer and support customer conversations.',
  primaryCta: 'Discuss Your Design Needs',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE DESIGN', process: 'OUR DESIGN PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [MessageSquareText, 'Clear Communication', 'Present your message simply and effectively.'],
    [Layers, 'Consistent Brand Design', 'Keep a unified look across all materials.'],
    [Target, 'Purposeful Formats', 'Designed for real-world use and your business goals.'],
  ],
  highlightStyle: 'circle',
  highlightsCard: true,
  overviewTitle: <>Materials that make your<br />message easier to understand.</>,
  overviewText: 'We translate your brand identity and key information into well-structured print and digital collateral. From brochures and flyers to sales decks and event graphics, we create materials that are clear, visually engaging and aligned with your overall marketing strategy.',
  helps: ['Preparing for sales meetings or events', 'Introducing products or services', 'Refreshing inconsistent marketing materials'],
  scopeTitle: 'A complete range of marketing collateral.',
  scopeIconStyle: 'circle',
  scope: [
    [BookOpen, 'Brochures & Company Profiles', 'Showcase your brand, story and key information.'],
    [FileText, 'Flyers & Promotional Leaflets', 'Create concise, eye-catching materials for campaigns and events.'],
    [ClipboardList, 'Product & Service Sheets', 'Explain your offer with clear benefits and features.'],
    [BarChart3, 'Sales Decks & Presentations', 'Support your team with professional, on-brand decks.'],
    [MonitorIcon, 'Event & Display Graphics', 'Design materials for exhibitions, events and in-store use.'],
    [ImageIcon, 'Digital Marketing Assets', 'Create graphics for email, social media and online campaigns.'],
  ],
  deliverTitle: <>Practical design assets<br />for your next campaign.</>,
  deliverables: ['Agreed collateral designs', 'Brand-aligned layouts', 'Structured content presentation', 'Selected format adaptations', 'Final export files', 'Production and usage notes'],
  deliverNote: 'Scope note: formats, quantities, copywriting, editable files, printing and production are agreed for your project.',
  deliverVisual: DeliverVisual,
  processTitle: 'A clear and collaborative process.',
  processStyle: 'cards',
  steps: [
    ['Brief', 'Understand audience, purpose and formats.'],
    ['Structure', 'Organise the message and content.'],
    ['Design', 'Develop and refine agreed layouts.'],
    ['Deliver', 'Prepare files for agreed channels.'],
  ],
  faqTitle: 'Your questions, answered.',
  faqLayout: 'paired',
  faqStyle: 'plus-left',
  faqs: [
    ['Does this include printing?', 'Design is the core service. Printing and production coordination can be discussed and scoped separately.'],
    ['Can you use our existing brand guidelines?', 'Yes. We design within your current guidelines and flag any gaps we find along the way.'],
    ['Will we receive editable files?', 'Final exports are included. Editable source files can be provided where agreed in the project scope.'],
  ],
  relatedTitle: 'Explore related services.',
  relatedStyle: 'arrow',
  related: [
    { icon: PenTool, title: 'Logo & Visual Identity', text: 'Create a distinctive visual foundation for your brand.', target: 'Logo & Visual Identity' },
    { icon: Layers, title: 'Brand Guidelines & Templates', text: 'Keep your brand consistent across all touchpoints.', target: 'Brand Guidelines & Templates' },
    { icon: MessageSquareText, title: 'Brand Messaging & Voice', text: 'Develop clear, compelling messaging for your brand.', target: 'Brand Messaging & Voice' },
  ],
  ctaTitle: 'Give your next campaign the materials it needs.',
  ctaButton: 'Let’s Talk Design',
  ctaTone: 'blue',
  animate: () => {
    gsap.to('.mc-turn', { rotationY: -16, transformOrigin: '0% 50%', transformPerspective: 600, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.mc-plant .sa-sprig', { rotation: 4, svgOrigin: '40 80', duration: 2.6, stagger: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.mc-step i', { scale: 1.2, backgroundColor: '#0aa5a3', duration: 0.45, stagger: { each: 0.5, repeat: -1, yoyo: true, repeatDelay: 1 } });
    gsap.to('.mc-li i', { backgroundColor: '#0aa5a3', duration: 0.4, stagger: { each: 0.3, repeat: -1, yoyo: true, repeatDelay: 1.2 } });
  },
};

export const MarketingCollateralPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default MarketingCollateralPage;
