import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, Check, ClipboardList, Compass as CompassIcon, ImageIcon, Layers, Leaf, Megaphone, MessageCircleMore, Search, Share2, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Compass, Laptop, Lines, LogoMark, MountainScene, Phone, Sprig } from '../template/ServiceArt';
import { BRAND_PAGE_DEFAULTS } from './brandShared';
import './BrandLaunchPage.css';

const planSteps = [[Leaf, 'Prepare', 'Build foundations'], [Megaphone, 'Reveal', 'Share your story'], [BarChart3, 'Rollout', 'Bring it to life']] as const;

const HeroVisual = (
  <div className="ss-stage bl-hero-stage">
    <Layer className="bl-l-plant" depth={3} float={false}>
      <svg viewBox="0 0 80 110" className="bl-plant"><Sprig x={40} y={80} s={1.25} /><Sprig x={42} y={80} s={1.05} flip /><Sprig x={38} y={80} s={0.9} /><path d="M24 78h32l-4 30H28Z" fill="#f2f4f4" /></svg>
    </Layer>
    <Layer className="bl-l-laptop" depth={6} float={false}>
      <Laptop className="bl-laptop">
        <div className="bl-site"><MountainScene /><div className="bl-site-copy"><small><Leaf /> Your Brand</small><b>A bolder<br />tomorrow.</b><Lines n={1} /><i /></div></div>
      </Laptop>
    </Layer>
    <Layer className="bl-l-phone" depth={12}>
      <Phone className="bl-phone"><MountainScene variant={1} /><b className="bl-phone-text">A new<br />chapter<br />begins.</b></Phone>
    </Layer>
    <Layer className="bl-l-plan" depth={10} float={false}>
      <div className="bl-plan">
        <h5>Launch Plan</h5>
        {planSteps.map(([Icon, t, s]) => <div key={t} className="bl-plan-row"><i><Icon /></i><span><b>{t}</b><small>{s}</small></span><em className="bl-plan-tick"><Check /></em></div>)}
      </div>
    </Layer>
    <Layer className="bl-l-arrow" depth={16} float={false}>
      <svg viewBox="0 0 120 90" className="bl-arrow"><path className="bl-arrow-path" d="M6 84 C40 80 60 60 76 40 S100 14 108 10" pathLength={1} /><path className="bl-arrow-head" d="M94 6 L114 6 L110 26Z" /></svg>
    </Layer>
    <Layer className="bl-l-box" depth={14}><div className="bl-box"><Leaf /><b>Your Brand</b><small>A brighter tomorrow<br />starts here.</small></div></Layer>
    <Layer className="bl-l-tent" depth={18}><div className="bl-tent"><Leaf /></div></Layer>
    <Layer className="bl-l-books" depth={8} float={false}><div className="bl-books"><span>Your Brand</span><span /></div></Layer>
  </div>
);

const checklist = ['Strategy and messaging', 'Brand assets', 'Touchpoints and channels', 'Rollout schedule', 'Team handover'];

const DeliverVisual = (
  <div className="ss-deliver-stage bl-deliver-stage">
    <Layer className="bl-l-clip" depth={0}>
      <div className="bl-clip"><span className="bl-clip-top" /><h5>Launch Checklist</h5>{checklist.map((t) => <div key={t} className="bl-check-row"><i><Check /></i>{t}</div>)}</div>
    </Layer>
    <Layer className="bl-l-book" depth={0}>
      <Book className="bl-book">
        <small className="bl-book-brand"><Leaf /> Your Brand</small>
        <h4>Brand<br />Launch &amp;<br />Refresh</h4>
        <p>Strategy. Assets. Rollout.<br />A brighter tomorrow.</p>
        <span className="bl-book-img"><MountainScene /></span>
      </Book>
    </Layer>
    <Layer className="bl-l-card" depth={0}><div className="bl-card"><MountainScene /><b>A new<br />chapter<br />begins.</b></div></Layer>
  </div>
);

const ThumbCompass = <span className="sa-thumb"><span className="bl-thumb-compass"><Compass /></span></span>;
const ThumbLogo = <span className="sa-thumb dark"><span className="bl-thumb-logo"><LogoMark /></span></span>;
const ThumbLaptop = <span className="sa-thumb"><Laptop><MountainScene /></Laptop></span>;

const data: ServiceTemplateData = {
  key: 'brand-launch',
  ...BRAND_PAGE_DEFAULTS,
  crumb: 'Brand Launch & Refresh',
  eyebrow: 'BRAND LAUNCH & REFRESH',
  title: ['A fresh chapter.', 'A confident introduction.'],
  intro: 'Plan and coordinate your brand launch or refresh with clear messaging, aligned assets and a practical rollout.',
  primaryCta: 'Plan Your Brand Launch',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE SUPPORT', process: 'OUR LAUNCH PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [CompassIcon, 'Clear Launch Direction', 'A focused plan for a confident introduction.'],
    [Layers, 'Aligned Brand Assets', 'Consistent, on-brand assets across key touchpoints.'],
    [UsersRound, 'Coordinated Rollout', 'A smooth, well-planned launch across your chosen channels.'],
  ],
  highlightStyle: 'circle',
  highlightsTinted: true,
  overviewTitle: <>Bring your brand’s next<br />chapter together.</>,
  overviewText: 'We help you prepare a new brand introduction or refresh an existing presence, bringing together clear messaging, aligned assets and a practical rollout across your agreed touchpoints.',
  helps: ['Introducing a new brand', 'Refreshing an established identity', 'Coordinating a phased brand rollout'],
  scopeIconStyle: 'circle',
  scope: [
    [ClipboardList, 'Launch & Refresh Planning', 'Define the change, audience, goals and key touchpoints.'],
    [Search, 'Brand Transition Review', 'Review your current brand and identify what to retain, refine or reimagine.'],
    [MessageCircleMore, 'Launch Messaging & Story', 'Develop clear, consistent messaging to introduce your next chapter.'],
    [ImageIcon, 'Priority Asset Updates', 'Create or update key brand assets for your launch or refresh.'],
    [Share2, 'Channel & Touchpoint Coordination', 'Plan and align your launch across agreed channels and touchpoints.'],
    [UsersRound, 'Internal Handover & Rollout Guidance', 'Provide guidance and materials to support a smooth handover and rollout.'],
  ],
  deliverTitle: <>A practical plan for your<br />brand’s introduction.</>,
  deliverables: ['Launch or refresh roadmap', 'Priority touchpoint checklist', 'Agreed announcement messaging', 'Selected updated brand assets', 'Rollout schedule and responsibilities', 'Team handover guidance'],
  deliverNote: 'Strategy, identity design, asset quantities, production, media and rollout support are agreed for your project.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processStyle: 'cards',
  steps: [
    ['Align', 'Define the change, audience and goals.'],
    ['Prepare', 'Organise messaging and priority assets.'],
    ['Introduce', 'Coordinate agreed launch touchpoints.'],
    ['Support', 'Review rollout and plan follow-up actions.'],
  ],
  faqStyle: 'plus-left',
  faqs: [
    ['Can you refresh our brand without changing everything?', 'We review what should be retained and agree targeted changes that support your brand’s next stage.'],
    ['Does this include a new logo and identity?', 'Identity design can be included if your launch needs it, or delivered through our Logo & Visual Identity service.'],
    ['Can you support a phased launch?', 'Yes. We plan rollout stages, priorities and responsibilities so each phase lands smoothly.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { thumb: ThumbCompass, title: 'Brand Strategy & Positioning', text: '', target: 'Brand Strategy & Positioning' },
    { thumb: ThumbLogo, title: 'Logo & Visual Identity', text: '', target: 'Logo & Visual Identity' },
    { thumb: ThumbLaptop, title: 'Brand Experience & Consistency', text: '', target: 'Brand Experience & Consistency' },
  ],
  ctaTitle: 'Make your next brand chapter ready to launch.',
  ctaText: 'Clear planning, aligned assets and a confident introduction.',
  ctaButton: 'Let’s Talk Brand',
  ctaTone: 'blue',
  animate: () => {
    gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 0.6 })
      .fromTo('.bl-arrow-path', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' })
      .fromTo('.bl-arrow-head', { scale: 0, transformOrigin: '50% 50%' }, { scale: 1, duration: 0.4, ease: 'back.out(3)' })
      .fromTo('.bl-plan-tick', { scale: 0 }, { scale: 1, duration: 0.35, stagger: 0.4, ease: 'back.out(3)' }, 0.2)
      .to('.bl-plan-tick, .bl-arrow-head', { scale: 0, duration: 0.3 }, '+=2.2');
    gsap.fromTo('.bl-check-row i svg', { scale: 0 }, { scale: 1, duration: 0.3, stagger: 0.35, repeat: -1, repeatDelay: 2.4, ease: 'back.out(3)' });
    gsap.to('.sa-compass-needle', { rotation: 40, svgOrigin: '50 50', duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.bl-plant .sa-sprig', { rotation: 4, svgOrigin: '40 80', duration: 2.6, stagger: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const BrandLaunchPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default BrandLaunchPage;
