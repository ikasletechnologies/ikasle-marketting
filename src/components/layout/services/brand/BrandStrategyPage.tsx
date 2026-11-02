import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, Compass as CompassIcon, FileText, Gem, Lightbulb, MessageCircle, PenTool, Search, Settings, Target, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Compass, Sprig } from '../template/ServiceArt';
import { BRAND_PAGE_DEFAULTS } from './brandShared';
import './BrandStrategyPage.css';

const tiles = [[Target, 'Purpose', 'Why we exist'], [UsersRound, 'Audience', 'Who we serve'], [Gem, 'Value', 'What we offer'], [CompassIcon, 'Positioning', 'How we’re different']] as const;
const strips = [['Purpose', 'A more meaningful tomorrow'], ['Audience', 'People with potential'], ['Value', 'Ideas into progress'], ['Positioning', 'A distinct place to grow']] as const;

const HeroVisual = (
  <div className="ss-stage bs-hero-stage">
    <Layer className="bs-l-plant" depth={3} float={false}>
      <svg viewBox="0 0 80 110" className="bs-plant"><Sprig x={40} y={78} s={1.2} /><Sprig x={42} y={78} s={1} flip /><path d="M24 76h32l-4 32H28Z" fill="#f2f4f4" /></svg>
    </Layer>
    <Layer className="bs-l-board" depth={5} float={false}>
      <div className="bs-board">
        <h5>Brand Strategy<br />&amp; Positioning</h5>
        <div className="bs-tiles">{tiles.map(([Icon, t, s]) => <span key={t} className="bs-tile"><Icon /><b>{t}</b><small>{s}</small></span>)}</div>
      </div>
    </Layer>
    <Layer className="bs-l-book" depth={10}>
      <Book tone="navy" className="bs-book">
        <Brand light />
        <h4>Brand Strategy<br />&amp; Positioning</h4>
        <span className="sa-book-rule" />
      </Book>
    </Layer>
    <Layer className="bs-l-strips" depth={14} float={false}>
      <div className="bs-strips">{strips.map(([t, s]) => <span key={t} className="bs-strip"><b>{t}</b>{s}</span>)}</div>
    </Layer>
    <Layer className="bs-l-compass" depth={20}><div className="bs-compass"><Compass /></div></Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage bs-deliver-stage">
    <Layer className="bs-l-sprig" depth={0} float={false}><svg viewBox="0 0 80 60" className="bs-sprig2"><Sprig x={50} y={60} s={1} /><Sprig x={52} y={60} s={0.85} flip /></svg></Layer>
    <Layer className="bs-l-frame" depth={0}>
      <div className="bs-framework">
        <h5>Positioning Framework</h5>
        <svg viewBox="0 0 200 110" className="bs-venn">
          <circle className="bs-venn-l" cx="62" cy="55" r="40" fill="#7fd3e6" opacity=".55" />
          <circle className="bs-venn-r" cx="138" cy="55" r="40" fill="#7fd3e6" opacity=".55" />
          <circle className="bs-venn-c" cx="100" cy="55" r="34" fill="#2fb5c8" opacity=".75" />
          <text x="44" y="52" textAnchor="middle">Audience</text><text x="44" y="62" textAnchor="middle">Needs</text>
          <text x="100" y="48" textAnchor="middle" className="c">Your</text><text x="100" y="58" textAnchor="middle" className="c">Distinctive</text><text x="100" y="68" textAnchor="middle" className="c">Value</text>
          <text x="158" y="52" textAnchor="middle">Category</text><text x="158" y="62" textAnchor="middle">Context</text>
        </svg>
        <small>Our positioning</small>
        <p>A distinct place to create a brighter tomorrow.</p>
      </div>
    </Layer>
    <Layer className="bs-l-book2" depth={0}>
      <Book tone="navy" className="bs-book2">
        <Brand light />
        <h4>Brand Strategy<br />&amp; Positioning</h4>
        <span className="sa-book-rule" />
        <p className="bs-book-foot">A clearer direction<br />A brighter tomorrow</p>
      </Book>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'brand-strategy',
  ...BRAND_PAGE_DEFAULTS,
  crumb: 'Brand Strategy & Positioning',
  eyebrow: 'BRAND STRATEGY & POSITIONING',
  title: ['Define your place.', 'Give your brand direction.'],
  intro: 'Align your purpose, audience and distinctive value with a clear strategy that guides how your brand shows up.',
  primaryCta: 'Shape Your Brand Strategy',
  heroVisual: HeroVisual,
  labels: { overview: 'SERVICE OVERVIEW', scope: 'WHAT WE DEFINE', process: 'OUR STRATEGY PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [Target, 'Clear Brand Purpose', 'A well defined reason to exist.'],
    [Gem, 'Distinctive Value', 'A compelling and differentiated offer.'],
    [Settings, 'Consistent Direction', 'A clear guide for every decision.'],
  ],
  highlightStyle: 'plain',
  overviewTitle: <>A shared direction for<br />your brand’s next chapter.</>,
  overviewText: 'We help you align your business ambitions, customer needs and brand decisions, so you have a clear and consistent direction for the future.',
  helpIcon: Lightbulb,
  helps: ['Launching or repositioning a brand', 'Clarifying what makes you different', 'Aligning teams around a common direction.'],
  scopeIconStyle: 'plain',
  scope: [
    [CompassIcon, 'Purpose, Vision & Values', 'Define why you exist, where you’re heading and what you stand for.'],
    [UsersRound, 'Audience & Customer Needs', 'Understand who you serve and what they need most.'],
    [BarChart3, 'Category & Competitor Context', 'Explore the wider landscape to identify opportunities for a distinctive position.'],
    [Gem, 'Value Proposition', 'Clarify the unique value you offer and why it matters.'],
    [Target, 'Brand Positioning', 'Define your distinct place in the minds of your audience.'],
    [FileText, 'Strategic Brand Principles', 'Set clear principles to guide how your brand shows up.'],
  ],
  deliverTitle: <>A strategy your team can<br />use with confidence.</>,
  deliverables: ['Brand purpose and principles', 'Audience priority summary', 'Category and competitor observations', 'Value proposition framework', 'Brand positioning statement', 'Strategic application guidance'],
  deliverNote: 'Workshops, research depth, stakeholder input and strategic outputs are agreed for your project.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processStyle: 'cards',
  steps: [
    ['Discover', 'Understand your business and ambitions.'],
    ['Explore', 'Review audiences and category context.'],
    ['Define', 'Shape your value and positioning.'],
    ['Align', 'Agree the direction and practical applications.'],
  ],
  faqStyle: 'chevron',
  faqs: [
    ['Does this include a new visual identity?', 'This service defines the strategic direction. Visual identity and messaging development can follow as separately agreed stages.'],
    ['Can you reposition an existing brand?', 'Yes. We review where your brand stands today and define a clearer, more distinctive position for where it needs to go.'],
    ['How do you involve our team?', 'Through workshops and review sessions with agreed stakeholders, so the strategy reflects your business and your team owns it.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { icon: Search, title: 'Brand Discovery & Audit', text: 'Understand where you are and where to go next.', target: 'Brand Discovery & Audit' },
    { icon: PenTool, title: 'Brand Identity Design', text: 'Bring your strategy to life visually.', target: 'Logo & Visual Identity' },
    { icon: MessageCircle, title: 'Brand Messaging & Tone of Voice', text: 'Find the right words to make a lasting impression.', target: 'Brand Messaging & Voice' },
  ],
  ctaTitle: 'Give your brand a direction everyone can follow.',
  ctaButton: 'Let’s Talk Brand',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.to('.sa-compass-needle', { rotation: 50, svgOrigin: '50 50', duration: 1.8, repeat: -1, yoyo: true, ease: 'elastic.inOut(1, .5)' });
    gsap.to('.bs-tile', { y: '-0.35em', boxShadow: '0 0.8em 1.2em -0.4em #0b2b4c44', duration: 0.4, stagger: { each: 0.5, repeat: -1, yoyo: true, repeatDelay: 1.6 } });
    gsap.to('.bs-strip', { x: '0.5em', duration: 0.5, stagger: { each: 0.35, repeat: -1, yoyo: true, repeatDelay: 1.4 }, ease: 'sine.inOut' });
    gsap.to('.bs-venn-l', { attr: { cx: 72 }, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.bs-venn-r', { attr: { cx: 128 }, duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.bs-venn-c', { attr: { r: 37 }, duration: 0.9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const BrandStrategyPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default BrandStrategyPage;
