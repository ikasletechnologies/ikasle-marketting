import React from 'react';
import { gsap } from 'gsap';
import { BookOpen, FileText, ImageIcon, Layers, Lightbulb, Megaphone, MessagesSquare, Play, Search, Share2, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Laptop, Lines, MountainScene, Phone, ThumbBuilding, TypeCard } from '../template/ServiceArt';
import { BRAND_PAGE_DEFAULTS } from './brandShared';
import './CreativeCampaignsPage.css';

/** Figure looking out to sea — the campaign's hero image. */
const Wanderer: React.FC = () => (
  <span className="cc-wanderer"><MountainScene /><svg viewBox="0 0 20 40" className="cc-figure"><circle cx="10" cy="6" r="4" fill="#3b2a22" /><path d="M4 40 L6 14 Q10 10 14 14 L16 40Z" fill="#f2efe9" /></svg></span>
);

const HeroVisual = (
  <div className="ss-stage cc-hero-stage">
    <Layer className="cc-l-big" depth={4} float={false}><div className="cc-card cc-big"><b className="hand">Big Idea</b><Wanderer /></div></Layer>
    <Layer className="cc-l-story" depth={5} float={false}><div className="cc-card cc-story"><b>Brand<br />Story</b><i className="cc-rule" /><Lines n={2} /></div></Layer>
    <Layer className="cc-l-video" depth={6} float={false}>
      <div className="cc-card cc-video"><MountainScene /><b>A<br />brighter<br />tomorrow<br />together.</b><span className="cc-play"><Play /></span></div>
    </Layer>
    <Layer className="cc-l-swatch" depth={6} float={false}><span className="cc-swatch">{['#2b3a40', '#6c7c80', '#c9b79c', '#e7ddcf'].map((c) => <i key={c} style={{ background: c }} />)}</span></Layer>
    <Layer className="cc-l-assets" depth={8} float={false}><div className="cc-card cc-assets hand">Campaign<br />Assets</div></Layer>
    <Layer className="cc-l-laptop" depth={14}>
      <Laptop className="cc-laptop">
        <div className="cc-slides">
          <span className="cc-slide"><MountainScene /><b>Same<br />People<br />Brighter<br />Places</b></span>
          <span className="cc-slide"><Wanderer /></span>
          <span className="cc-slide"><MountainScene variant={1} /></span>
        </div>
      </Laptop>
    </Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage cc-deliver-stage">
    <Layer className="cc-l-board" depth={0}>
      <div className="cc-board"><h5>Campaign Storyboard</h5><div className="cc-frames">{[0, 1, 2, 3].map((i) => <span key={i} className="cc-frame"><i /><Lines n={1} /></span>)}</div></div>
    </Layer>
    <Layer className="cc-l-print" depth={0}><div className="cc-print"><MountainScene /><b>Same<br />People<br />Brighter<br />Places</b></div></Layer>
    <Layer className="cc-l-phone" depth={0}><Phone className="cc-phone"><Wanderer /><b className="cc-phone-text">Same<br />People<br />Brighter<br />Places</b><span className="cc-play sm"><Play /></span></Phone></Layer>
    <Layer className="cc-l-book" depth={0}>
      <Book tone="navy" className="cc-book">
        <h4>Creative<br />Campaigns &amp;<br />Storytelling</h4>
        <p>Turning ideas into<br />stories that move people.</p>
        <span className="cc-book-brand"><Brand light /></span>
      </Book>
    </Layer>
  </div>
);

const ThumbNotebook = <span className="sa-thumb"><TypeCard className="cc-thumb-type" /></span>;
const ThumbBook = <span className="sa-thumb"><Book className="cc-thumb-book"><Brand /><h4>Brand</h4></Book></span>;
const ThumbLaptop = <span className="sa-thumb"><Laptop><ThumbBuilding /></Laptop></span>;

const data: ServiceTemplateData = {
  key: 'creative-campaigns',
  ...BRAND_PAGE_DEFAULTS,
  crumb: 'Creative Campaigns & Storytelling',
  eyebrow: 'CREATIVE CAMPAIGNS & STORYTELLING',
  title: ['A clear idea. A story', 'worth sharing.'],
  intro: 'Bring your brand message to life through creative concepts, compelling narratives and coordinated campaign assets.',
  primaryCta: 'Discuss Your Campaign',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE CREATE', process: 'OUR CREATIVE PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [Lightbulb, 'Clear Campaign Concepts', 'Turn your goals into focused, creative ideas.'],
    [BookOpen, 'Meaningful Brand Stories', 'Shape narratives that connect with people.'],
    [Share2, 'Connected Creative Assets', 'Bring your story to life across every channel.'],
  ],
  highlightStyle: 'plain',
  highlightsTinted: true,
  overviewTitle: <>Connect your message through<br />a shared creative idea.</>,
  overviewText: 'We help you develop a single, unifying creative idea that brings together your audience, brand purpose and campaign goals, then turn it into compelling stories and coordinated assets across your agreed channels.',
  helpIcon: UsersRound,
  helps: ['Launching a product or service', 'Introducing a new brand message', 'Bringing consistency to a campaign'],
  scopeIconStyle: 'plain',
  scope: [
    [Search, 'Campaign Discovery & Brief', 'We explore your goals, audience, challenges and opportunities to create a clear creative brief.'],
    [Lightbulb, 'Creative Concepts & Big Ideas', 'We develop creative routes and big ideas that bring your brand message to life.'],
    [FileText, 'Brand Stories & Narratives', 'We craft compelling narratives that express your brand purpose and resonate with your audience.'],
    [MessagesSquare, 'Campaign Messaging & Copy', 'We create key messages and copy for your campaign across selected channels.'],
    [ImageIcon, 'Storyboards & Visual Direction', 'We develop storyboards and visual references to show how the campaign can come to life.'],
    [Layers, 'Campaign Asset Adaptations', 'We adapt the creative concept for different channels and asset types to ensure a consistent campaign.'],
  ],
  deliverTitle: 'A focused story, ready to take shape.',
  deliverables: ['Campaign creative brief', 'Agreed concept direction', 'Story and message framework', 'Selected copy and narrative assets', 'Storyboard or visual references', 'Agreed campaign design adaptations'],
  deliverNote: 'Scope note: channels, asset quantities, production, media buying and usage rights are agreed for your campaign.',
  deliverVisual: DeliverVisual,
  processStyle: 'cards',
  steps: [
    ['Discover', 'Understand audience, message and goals.'],
    ['Imagine', 'Develop creative routes and story ideas.'],
    ['Shape', 'Refine the selected concept and assets.'],
    ['Deliver', 'Prepare agreed creative for launch.'],
  ],
  faqLayout: 'paired',
  faqStyle: 'chevron-left',
  faqs: [
    ['Does this include filming or full production?', 'This service covers agreed concepts and creative assets. Filming, photography and production can be scoped separately.'],
    ['Can you work with an existing campaign idea?', 'Yes. We can develop, refine or extend an existing idea across new channels and assets.'],
    ['Does this include paid advertising?', 'Media buying isn’t included, but we can prepare the creative for your paid channels.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { thumb: ThumbNotebook, title: 'Brand Messaging & Voice', text: '', target: 'Brand Messaging & Voice' },
    { thumb: ThumbBook, title: 'Marketing Collateral Design', text: '', target: 'Marketing Collateral Design' },
    { thumb: ThumbLaptop, title: 'Website & Landing Page Design', text: '', target: 'Website & Landing Page Design' },
  ],
  ctaIcon: Megaphone,
  ctaTitle: 'Start your next campaign with a stronger story.',
  ctaButton: 'Let’s Talk Creative',
  ctaTone: 'blue',
  animate: () => {
    gsap.fromTo('.cc-play', { boxShadow: '0 0 0 0 #ffffffaa' }, { boxShadow: '0 0 0 0.9em #ffffff00', duration: 1.4, repeat: -1, ease: 'power2.out' });
    const slides = gsap.utils.toArray<HTMLElement>('.cc-slide');
    const tl = gsap.timeline({ repeat: -1 });
    slides.forEach((s, i) => {
      const next = slides[(i + 1) % slides.length];
      tl.to(s, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, '+=1.8').to(next, { opacity: 1, duration: 0.8, ease: 'power2.inOut' }, '<');
    });
    gsap.to('.cc-card', { rotation: (i) => (i % 2 ? 1.5 : -1.5), duration: 2.4, stagger: 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.cc-frame i', { backgroundColor: '#d5ecf3', duration: 0.5, stagger: { each: 0.4, repeat: -1, yoyo: true, repeatDelay: 1 } });
  },
};

export const CreativeCampaignsPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default CreativeCampaignsPage;
