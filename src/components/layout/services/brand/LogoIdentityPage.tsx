import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, BookOpen, Copy, Layers, Leaf, Lightbulb, MessageSquareText, Monitor as MonitorIcon, Palette, PenTool, Search, Send, Settings, Target, Type } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Lines, LogoMark, Sprig, Swatches, TypeCard, WaveCover } from '../template/ServiceArt';
import { BRAND_PAGE_DEFAULTS } from './brandShared';
import './LogoIdentityPage.css';

const DOTS = ['#0b2b4c', '#0a5f96', '#0aa5a3'];
const STRIP = ['#0b4f6a', '#0a7f8c', '#1aa6b7', '#5fc9d6', '#a9e3ea'];

const BusinessCards: React.FC = () => (
  <div className="lv-bcards">{[0, 1, 2].map((i) => <span key={i}><LogoMark /></span>)}</div>
);

const HeroVisual = (
  <div className="ss-stage lv-hero-stage">
    <Layer className="lv-l-plant" depth={3} float={false}>
      <svg viewBox="0 0 80 110" className="lv-plant"><Sprig x={40} y={78} s={1.25} /><Sprig x={42} y={78} s={1.05} flip /><Sprig x={38} y={78} s={0.9} /><path d="M24 76h32l-4 32H28Z" fill="#f2f4f4" /></svg>
    </Layer>
    <Layer className="lv-l-board" depth={5} float={false}>
      <div className="lv-board">
        <span className="lv-board-mark"><LogoMark className="lv-hero-mark" /></span>
        <div className="lv-board-side">
          <h5>Visual<br />Identity</h5>
          <TypeCard className="lv-board-type" font="Plus Jakarta Sans" />
          <span className="lv-dots">{DOTS.map((c) => <i key={c} style={{ background: c }} />)}</span>
        </div>
      </div>
    </Layer>
    <Layer className="lv-l-letter" depth={8} float={false}>
      <div className="lv-letter"><span className="lv-letter-mark"><LogoMark /></span><Lines n={6} /></div>
    </Layer>
    <Layer className="lv-l-cards" depth={12}><BusinessCards /></Layer>
    <Layer className="lv-l-notebook" depth={14}><div className="lv-notebook"><LogoMark /></div></Layer>
    <Layer className="lv-l-strip" depth={16} float={false}>
      <div className="lv-strip"><Swatches className="lv-strip-sw" colors={STRIP} /><span className="lv-wave"><WaveCover /></span></div>
    </Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage lv-deliver-stage">
    <Layer className="lv-l-spread" depth={0}>
      <div className="lv-spread">
        <div className="lv-page">
          <h5>Logo &amp;<br />Visual Identity</h5>
          <span className="lv-page-mark"><LogoMark className="lv-del-mark" /></span>
        </div>
        <div className="lv-page">
          <div className="lv-page-cols">
            <div>
              <small>Colour Palette</small>
              <span className="lv-dots">{DOTS.map((c) => <i key={c} style={{ background: c }} />)}</span>
              <Swatches className="lv-page-sw" colors={['#5fc9d6', '#0b2b4c', '#e6edf0']} />
            </div>
            <div><small>Typography</small><TypeCard className="lv-page-type" /></div>
          </div>
          <span className="lv-page-wave"><WaveCover /></span>
          <p>A clear and cohesive visual identity for a stronger brand presence.</p>
        </div>
      </div>
    </Layer>
    <Layer className="lv-l-cards2" depth={0}><BusinessCards /></Layer>
    <Layer className="lv-l-nb2" depth={0}><div className="lv-notebook lg"><LogoMark /></div></Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'logo-identity',
  ...BRAND_PAGE_DEFAULTS,
  crumb: 'Logo & Visual Identity',
  eyebrow: 'LOGO & VISUAL IDENTITY',
  title: ['A distinctive look.', 'A recognisable brand.'],
  intro: 'Bring your brand strategy to life through a considered logo, colour palette, typography and a coherent visual system.',
  primaryCta: 'Create Your Brand Identity',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE DESIGN', process: 'OUR IDENTITY DESIGN PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [PenTool, 'Distinctive Logo Design', 'A unique mark for your brand.'],
    [Layers, 'Cohesive Visual System', 'A unified and consistent look.'],
    [Target, 'Consistent Brand Applications', 'Ready for real world use.'],
  ],
  highlightStyle: 'plain',
  highlightsTinted: true,
  overviewTitle: <>Give your brand a visual<br />language of its own.</>,
  overviewText: 'We turn your brand direction into a recognisable design across your agreed touchpoints, creating a consistent and distinctive visual identity that helps your brand stand out and feel undeniably yours.',
  helps: ['Launching a new brand', 'Refreshing an existing identity', 'Bringing consistency to brand visuals'],
  scopeIconStyle: 'plain',
  scope: [
    [PenTool, 'Logo Concepts & Refinement', 'Original concepts developed and refined to the right mark.'],
    [Copy, 'Logo Variations & Lockups', 'Versatile versions for different use cases and formats.'],
    [Palette, 'Brand Colour Palette', 'A considered palette that brings your brand to life.'],
    [Type, 'Typography Direction', 'Font choices that match your brand’s character.'],
    [Leaf, 'Supporting Visual Elements', 'Graphic elements, patterns and icon styles.'],
    [MonitorIcon, 'Identity Applications & Guidelines', 'Real world mockups and clear guidelines for consistent use.'],
  ],
  deliverTitle: <>An identity system ready<br />to put to work.</>,
  deliverables: ['Approved primary logo', 'Agreed logo variations', 'Colour and typography specifications', 'Supporting graphic elements', 'Selected application mockups', 'Final artwork and usage guidance'],
  deliverNote: 'Concept routes, revisions, applications, file formats and font licensing are agreed for your project.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processStyle: 'cards',
  stepIcons: [Search, Lightbulb, Settings, Send],
  steps: [
    ['Discover', 'Understand your brand and design goals.'],
    ['Explore', 'Develop visual directions and logo concepts.'],
    ['Refine', 'Shape the selected identity system.'],
    ['Deliver', 'Prepare agreed artwork and guidelines.'],
  ],
  faqStyle: 'chevron',
  faqs: [
    ['Does this include brand strategy?', 'We use your existing strategy or agree a discovery stage before design. Full brand strategy can be scoped separately.'],
    ['What final files will we receive?', 'You receive your logo and identity assets in the agreed formats for print and digital use, with usage guidance.'],
    ['Can you refresh an existing logo?', 'Yes. We can evolve your current logo and visual system, keeping the recognition you’ve built while modernising the look.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { icon: BookOpen, title: 'Brand Discovery & Audit', text: 'Uncover opportunities for growth.', target: 'Brand Discovery & Audit' },
    { icon: BarChart3, title: 'Brand Strategy & Positioning', text: 'Define a clearer, stronger brand.', target: 'Brand Strategy & Positioning' },
    { icon: MessageSquareText, title: 'Brand Messaging & Voice', text: 'Find the right words to connect.', target: 'Brand Messaging & Voice' },
  ],
  ctaTitle: 'Give your brand a look people can recognise.',
  ctaButton: 'Let’s Talk Design',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.timeline({ repeat: -1, repeatDelay: 2.4, delay: 0.8 })
      .fromTo('.lv-hero-mark .sa-lm-a', { x: -30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      .fromTo('.lv-hero-mark .sa-lm-b', { rotation: -60, scale: 0, svgOrigin: '40 50' }, { rotation: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, '-=0.4')
      .fromTo('.lv-hero-mark .sa-lm-c', { rotation: 60, scale: 0, svgOrigin: '40 50' }, { rotation: 0, scale: 1, duration: 0.8, ease: 'back.out(1.6)' }, '-=0.6');
    gsap.to('.lv-strip-sw i', { x: '0.4em', duration: 0.5, stagger: { each: 0.15, repeat: -1, yoyo: true, repeatDelay: 1 }, ease: 'sine.inOut' });
    gsap.to('.lv-dots i', { scale: 1.2, duration: 0.5, stagger: { each: 0.25, repeat: -1, yoyo: true, repeatDelay: 0.8 }, ease: 'sine.inOut' });
    gsap.to('.lv-del-mark', { rotation: 4, transformOrigin: '50% 50%', duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.lv-page-wave .sa-wave-a', { x: -6, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const LogoIdentityPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default LogoIdentityPage;
