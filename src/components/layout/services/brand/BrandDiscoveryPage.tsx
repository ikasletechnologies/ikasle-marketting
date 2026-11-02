import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, FileText, Layers, Lightbulb, MessageCircleMore, Palette, PieChart, Target, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Magnifier, Sprig, Swatches, ThumbBuilding, TypeCard, WaveCover } from '../template/ServiceArt';
import { BRAND_PAGE_DEFAULTS } from './brandShared';
import './BrandDiscoveryPage.css';

const PALETTE = ['#0b2b4c', '#0a5f96', '#1a8fd0', '#0a87b4', '#0aa5a3', '#5fd4e0', '#8fd8e6', '#bfe9f2', '#e3f4f8'];

const tiles = [[Target, 'Purpose'], [UsersRound, 'Audience'], [BarChart3, 'Positioning'], [Lightbulb, 'Identity']] as const;

const HeroVisual = (
  <div className="ss-stage bd-hero-stage">
    <Layer className="bd-l-frame" depth={4} float={false}>
      <div className="bd-frame">{tiles.map(([Icon, t]) => <span key={t} className="bd-tile"><Icon />{t}</span>)}</div>
    </Layer>
    <Layer className="bd-l-swatches" depth={6} float={false}><Swatches className="bd-swatches" colors={PALETTE} /></Layer>
    <Layer className="bd-l-books" depth={6} float={false}>
      <div className="bd-books">{['Brand', 'Strategy', 'Creative', 'Growth'].map((t) => <span key={t}>{t}</span>)}</div>
    </Layer>
    <Layer className="bd-l-report" depth={12}>
      <Book className="bd-report">
        <h4>Brand<br />Discovery<br />&amp; Audit</h4>
        <WaveCover />
        <span className="bd-report-brand"><Brand /></span>
      </Book>
    </Layer>
    <Layer className="bd-l-type" depth={14}><TypeCard className="bd-type" /></Layer>
    <Layer className="bd-l-mag" depth={20} float={false}><div className="bd-mag"><Magnifier /></div></Layer>
    <Layer className="bd-l-note" depth={16}><div className="bd-note">Clarity<br />Direction<br />Growth</div></Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage bd-deliver-stage">
    <Layer className="bd-l-desk" depth={0} float={false}><div className="bd-desk" /></Layer>
    <Layer className="bd-l-sprig" depth={0} float={false}><svg viewBox="0 0 80 60" className="bd-sprig"><Sprig x={30} y={60} s={1} /><Sprig x={32} y={60} s={0.85} flip /><Sprig x={28} y={60} s={0.7} /></svg></Layer>
    <Layer className="bd-l-photos" depth={0}><div className="bd-photos"><span><ThumbBuilding /></span><span><ThumbBuilding /></span></div></Layer>
    <Layer className="bd-l-big" depth={0}>
      <Book className="bd-big">
        <Brand />
        <h4>Brand<br />Discovery &amp; Audit</h4>
        <p>Brand Assessment Report<br /><small>Insights · Opportunities · Next Steps</small></p>
        <WaveCover />
      </Book>
    </Layer>
    <Layer className="bd-l-sw2" depth={0}><div className="bd-sw-cards"><i /><i /></div></Layer>
    <Layer className="bd-l-note2" depth={0}><div className="bd-note lg">Ideas<br />audience<br />growth<br />brand<br />direction</div></Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'brand-discovery',
  ...BRAND_PAGE_DEFAULTS,
  titleTone: 'accent',
  crumb: 'Brand Discovery & Audit',
  eyebrow: 'BRAND DISCOVERY & AUDIT',
  title: ['Understand your brand.', 'Shape what comes next.'],
  intro: 'Explore your business, audience and brand touchpoints to uncover strengths, gaps and a clearer direction for growth.',
  primaryCta: 'Discover Your Brand',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE EXPLORE', process: 'OUR BRAND DISCOVERY PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [Target, 'Clear Brand Understanding', 'Uncover what’s working and where to go next.'],
    [Layers, 'Consistent Brand Experience', 'Identify gaps across your brand touchpoints.'],
    [BarChart3, 'Focused Growth Priorities', 'Turn insights into a clear plan for what to do next.'],
  ],
  highlightStyle: 'plain',
  overviewTitle: <>Start with clarity<br />about who you are.</>,
  overviewText: 'Our Brand Discovery & Audit helps you understand your current brand identity and how it is communicated across all touchpoints. We explore your business, audience, messaging and visual identity to identify strengths, gaps and opportunities, giving you a clearer direction for growth.',
  helpIcon: Lightbulb,
  helps: ['Preparing for a brand refresh', 'Aligning your team around the brand', 'Reviewing inconsistent brand touchpoints'],
  scopeIconStyle: 'plain',
  scope: [
    [FileText, 'Business & Brand Discovery', 'Understand your business, goals, values and current brand story.'],
    [UsersRound, 'Audience & Perception Review', 'Explore who your audience is and how they perceive your brand.'],
    [PieChart, 'Competitor & Category Review', 'Look at your competitors and wider category for context and opportunity.'],
    [MessageCircleMore, 'Brand Messaging Audit', 'Review your key messages, tone of voice and how you communicate your value.'],
    [Palette, 'Visual Identity & Touchpoint Review', 'Assess your visual identity and brand touchpoints for consistency and effectiveness.'],
    [BarChart3, 'Insights & Brand Priorities', 'Bring everything together to define clear, practical priorities for growth.'],
  ],
  deliverTitle: 'A clear view of your brand today.',
  deliverIntro: 'You’ll receive a comprehensive summary of our findings, including:',
  deliverables: ['Discovery workshop summary', 'Brand strengths and gaps', 'Audience and category observations', 'Messaging and identity review', 'Touchpoint consistency findings', 'Prioritised brand recommendations'],
  deliverNote: 'Workshops, research methods, touchpoints and stakeholder participation are agreed for your project.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processStyle: 'cards',
  steps: [
    ['Listen', 'Understand your business, goals and people.'],
    ['Review', 'Examine agreed brand materials and touchpoints.'],
    ['Connect', 'Bring together patterns, strengths and gaps.'],
    ['Recommend', 'Define practical priorities for your brand.'],
  ],
  faqLayout: 'paired',
  faqStyle: 'plus-left',
  faqs: [
    ['Does this include a new logo or visual identity?', 'This service focuses on discovery and review. Identity design can follow as a separately agreed stage.'],
    ['Can you review an existing brand?', 'Yes. Most discovery projects start with an existing brand, reviewing what’s working and what needs attention.'],
    ['Does this include customer research?', 'Customer interviews or surveys can be included where agreed. Otherwise we work with the insights and data you already have.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { icon: Target, title: 'Brand Strategy & Positioning', text: 'Define a clear strategy to guide your brand growth.', target: 'Brand Strategy & Positioning' },
    { icon: Palette, title: 'Brand Identity Design', text: 'Create a distinctive visual identity for your brand.', target: 'Logo & Visual Identity' },
    { icon: MessageCircleMore, title: 'Brand Messaging & Tone of Voice', text: 'Develop clear, consistent messaging that connects.', target: 'Brand Messaging & Voice' },
  ],
  ctaEyebrow: 'READY TO MOVE FORWARD?',
  ctaTitle: 'Build your next brand chapter on clarity.',
  ctaButton: 'Let’s Talk Brand',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 0.6, delay: 1 });
    gsap.utils.toArray<HTMLElement>('.bd-tile').forEach((t) => {
      tl.to(t, { backgroundColor: '#0a87b4', color: '#fff', scale: 1.06, duration: 0.35, ease: 'power2.out' })
        .to(t, { backgroundColor: '#fff', color: '#0b2b4c', scale: 1, duration: 0.35, ease: 'power2.in' }, '+=0.6');
    });
    gsap.timeline({ repeat: -1, defaults: { duration: 1.4, ease: 'sine.inOut' } })
      .to('.bd-mag', { x: '3em', y: '-2em' })
      .to('.bd-mag', { x: '-3em', y: '-4em' })
      .to('.bd-mag', { x: 0, y: 0 });
    gsap.to('.bd-swatches i', { opacity: 0.55, duration: 0.6, stagger: { each: 0.15, from: 'random', repeat: -1, yoyo: true } });
    gsap.to('.bd-report .sa-wave-a, .bd-big .sa-wave-a', { x: -6, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const BrandDiscoveryPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default BrandDiscoveryPage;
