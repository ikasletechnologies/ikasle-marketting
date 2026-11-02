import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, BookOpen, Ear, FileText, Heart, Lightbulb, MessageCircle, MessageCircleMore, PenLine, PenTool, Search, Settings, Target, User, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Lines, Monitor, Sprig, TypeCard } from '../template/ServiceArt';
import { BRAND_PAGE_DEFAULTS } from './brandShared';
import './BrandMessagingPage.css';

const TealMug: React.FC = () => (
  <svg viewBox="0 0 80 84" className="sa-fill">
    <path d="M60 30h6a12 12 0 0 1 0 24h-6" stroke="#0a8f9c" strokeWidth="6" fill="none" />
    <rect x="6" y="14" width="56" height="66" rx="8" fill="#0aa5a3" />
    <rect x="6" y="14" width="14" height="66" rx="7" fill="#0a8f9c" />
    <text x="38" y="40" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">Good</text>
    <text x="38" y="50" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">brands</text>
    <text x="38" y="60" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">say it</text>
    <text x="38" y="70" textAnchor="middle" fontSize="8" fontWeight="700" fill="#fff">better.</text>
  </svg>
);

const bubbles = [[MessageCircle, 'Clear', 'blue'], [User, 'Human', 'blue'], [Heart, 'Consistent', 'teal']] as const;

const HeroVisual = (
  <div className="ss-stage bm-hero-stage">
    <Layer className="bm-l-monitor" depth={6} float={false}>
      <Monitor className="bm-monitor">
        <div className="bm-screen">
          <div className="bm-guide">
            <span className="bm-brand"><Brand /></span>
            <h5>Brand Voice<br />Guide</h5>
            <small>Clear. Human. Consistent.</small>
            <Lines n={4} />
          </div>
          <div className="bm-side">Words<br />Shape<br />Stronger<br />Brands.</div>
        </div>
      </Monitor>
    </Layer>
    {bubbles.map(([Icon, t, tone], i) => (
      <Layer key={t} className={`bm-l-bubble bm-l-b${i}`} depth={18 + i * 3}><span className={`bm-bubble ${tone}`}><Icon />{t}</span></Layer>
    ))}
    <Layer className="bm-l-books" depth={10} float={false}>
      <div className="bm-books">{['Brand Story', 'Audience', 'Messaging', 'Tone of Voice'].map((t) => <span key={t}>{t}</span>)}</div>
    </Layer>
    <Layer className="bm-l-mug" depth={14} float={false}><div className="bm-mug"><TealMug /></div></Layer>
    <Layer className="bm-l-card" depth={16}><div className="bm-hand">Clear<br />Human<br />Consistent</div></Layer>
    <Layer className="bm-l-type" depth={16}><TypeCard className="bm-type" /></Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage bm-deliver-stage">
    <Layer className="bm-l-sprig" depth={0} float={false}><svg viewBox="0 0 80 60" className="bm-sprig"><Sprig x={50} y={60} s={1} /><Sprig x={52} y={60} s={0.85} flip /><Sprig x={48} y={60} s={0.7} /></svg></Layer>
    <Layer className="bm-l-book" depth={0}>
      <Book tone="navy" className="bm-book">
        <Brand light />
        <h4>Brand<br />Messaging &amp;<br />Voice</h4>
        <p className="bm-book-foot">A clear message.<br />A stronger brand.</p>
        <svg viewBox="0 0 100 100" className="bm-book-circles"><circle cx="70" cy="70" r="34" fill="#1a6fd0" opacity=".8" /><circle cx="40" cy="80" r="26" fill="#0aa5a3" opacity=".75" /><circle cx="88" cy="40" r="20" fill="#5fd4e0" opacity=".7" /></svg>
      </Book>
    </Layer>
    <Layer className="bm-l-c1" depth={0}><div className="bm-card">Clear<br />Human<br />Consistent</div></Layer>
    <Layer className="bm-l-c2" depth={0}><div className="bm-card hand">Words<br />Build<br />Brighter<br />Brands.</div></Layer>
    <Layer className="bm-l-c3" depth={0}><TypeCard className="bm-type2" /></Layer>
    <Layer className="bm-l-c4" depth={0}><div className="bm-dots"><i /><i /></div></Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'brand-messaging',
  ...BRAND_PAGE_DEFAULTS,
  crumb: 'Brand Messaging & Voice',
  eyebrow: 'BRAND MESSAGING & VOICE',
  title: ['Say it clearly.', 'Say it like your brand.'],
  intro: 'Create a clear message and a recognisable voice for every place your brand communicates.',
  primaryCta: 'Shape Your Brand Voice',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE DEVELOP', process: 'OUR PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [MessageCircleMore, 'Clear Core Messages', 'Make your value and story easy to understand.'],
    [UsersRound, 'Recognisable Brand Voice', 'Sound consistent and authentic everywhere.'],
    [Target, 'Consistent Communication', 'Build trust across every channel.'],
  ],
  highlightStyle: 'plain',
  overviewTitle: <>Turn your brand’s thinking<br />into words people understand.</>,
  overviewText: 'We help you define what you say, how you say it and why it matters, so your brand communicates with clarity, consistency and confidence across every channel.',
  helpIcon: Lightbulb,
  helps: ['Clarifying your value', 'Aligning copy across channels', 'Giving your team writing guidance'],
  scopeIconStyle: 'plain',
  scope: [
    [MessageCircleMore, 'Core Brand Message', 'A clear and compelling message at the heart of your brand.'],
    [UsersRound, 'Audience Messaging', 'Key messages for your most important audiences.'],
    [BarChart3, 'Value Proposition & Proof Points', 'A strong, credible reason to choose your brand.'],
    [FileText, 'Voice Attributes & Tone', 'A defined voice with clear tone guidelines.'],
    [BookOpen, 'Brand Story & Narratives', 'A simple, authentic story that brings your brand to life.'],
    [PenLine, 'Copy Examples & Applications', 'Real examples to show how it comes to life.'],
  ],
  deliverTitle: 'A practical guide to sounding like you.',
  deliverColumns: 2,
  deliverables: ['Core messaging framework', 'Audience message priorities', 'Brand voice attributes', 'Tone and writing principles', 'Brand story and key messages', 'Example copy and usage guidance'],
  deliverNote: 'Channels, copy examples, research inputs and revision rounds are agreed for your project.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processStyle: 'cards',
  stepIcons: [Ear, FileText, Settings, UsersRound],
  steps: [
    ['Listen', 'Understand brand and audience.'],
    ['Define', 'Shape messages and voice.'],
    ['Apply', 'Create examples for agreed touchpoints.'],
    ['Refine', 'Align language and hand over guidance.'],
  ],
  faqStyle: 'plus-right',
  faqs: [
    ['Does this include all website copy?', 'This service creates your messaging and voice framework. Full website or campaign copy can be added to the agreed scope.'],
    ['Can you use our existing brand strategy?', 'Yes. We build on your existing strategy and positioning, filling any gaps before we develop the messaging.'],
    ['Can tone vary between channels?', 'Yes. Your voice stays consistent while tone adapts to each channel and situation, and the guide shows how.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { icon: Search, title: 'Brand Discovery & Audit', text: 'Understand your brand, market and opportunities.', target: 'Brand Discovery & Audit' },
    { icon: Target, title: 'Brand Strategy & Positioning', text: 'Define a clear direction for growth.', target: 'Brand Strategy & Positioning' },
    { icon: PenTool, title: 'Brand Identity Design', text: 'Turn your strategy into a distinctive visual brand.', target: 'Logo & Visual Identity' },
  ],
  ctaTitle: 'Make every message unmistakably yours.',
  ctaText: 'A clear message. A stronger, more recognisable brand.',
  ctaButton: 'Let’s Talk Brand',
  ctaTone: 'dark',
  animate: () => {
    gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 0.8 })
      .fromTo('.bm-bubble', { scale: 0.4, opacity: 0, transformOrigin: '0% 100%' }, { scale: 1, opacity: 1, duration: 0.55, stagger: 0.45, ease: 'back.out(2.2)' })
      .to('.bm-bubble', { scale: 0.92, opacity: 0, duration: 0.35, stagger: 0.1 }, '+=2.6');
    gsap.fromTo('.bm-guide .sa-lines i', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.6, stagger: 0.25, repeat: -1, repeatDelay: 2.4, ease: 'power2.out' });
    gsap.to('.bm-dots i', { scale: 1.2, duration: 0.6, stagger: { each: 0.3, repeat: -1, yoyo: true }, ease: 'sine.inOut' });
    gsap.to('.bm-book-circles circle', { scale: 1.08, transformOrigin: '50% 50%', duration: 1.6, stagger: { each: 0.4, repeat: -1, yoyo: true }, ease: 'sine.inOut' });
  },
};

export const BrandMessagingPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default BrandMessagingPage;
