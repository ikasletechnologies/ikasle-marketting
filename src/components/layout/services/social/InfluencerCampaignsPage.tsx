import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, Check, FileText, Mail, Megaphone, Play, ShieldCheck, Smartphone, Target, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServiceTemplateData, type ServicePageProps } from '../template/ServiceDetailTemplate';
import { Book, Brand, Lines, Phone, ProductScene, Sprig } from '../template/ServiceArt';
import './InfluencerCampaignsPage.css';

/** Illustrated creator holding a product jar up to the camera. */
const Creator: React.FC = () => (
  <svg viewBox="0 0 140 160" className="sa-fill in-creator">
    <path d="M40 74q-6-50 30-52t32 52l4 40H36Z" fill="#2a1d18" />
    <path d="M18 160q4-46 52-50t52 50Z" fill="#efe6da" />
    <path d="M58 104q12 10 24 0v12q-12 8-24 0Z" fill="#e2d6c6" />
    <rect x="62" y="84" width="16" height="22" rx="6" fill="#d9a07c" />
    <g className="in-head">
      <ellipse cx="70" cy="66" rx="20" ry="23" fill="#e3ae8a" />
      <path d="M48 66q-2-34 24-34t22 30q-10-16-26-16-12 0-20 20Z" fill="#2a1d18" />
      <circle cx="62" cy="68" r="1.8" fill="#2a1d18" /><circle cx="78" cy="68" r="1.8" fill="#2a1d18" />
      <path d="M63 78q7 5 14 0" stroke="#a5563f" strokeWidth="2" fill="none" strokeLinecap="round" />
    </g>
    <g className="in-arm">
      <path d="M104 160q2-40-6-56l-10 2q8 22 4 54Z" fill="#e8dccb" />
      <ellipse cx="94" cy="100" rx="8" ry="7" fill="#e3ae8a" />
      <rect x="86" y="78" width="18" height="16" rx="3" fill="#f7f3ee" />
      <rect x="85" y="74" width="20" height="6" rx="2" fill="#e3dacd" />
    </g>
  </svg>
);

const HeroVisual = (
  <div className="ss-stage in-hero-stage">
    <Layer className="in-l-ring" depth={4} float={false}><span className="in-ring" /></Layer>
    <Layer className="in-l-creator" depth={8} float={false}><Creator /></Layer>
    <Layer className="in-l-desk" depth={10} float={false}>
      <svg viewBox="0 0 160 60" className="in-desk"><Sprig x={130} y={44} s={0.7} /><Sprig x={132} y={44} s={0.6} flip /><rect x="122" y="40" width="18" height="16" rx="3" fill="#f2efe9" /><rect x="96" y="40" width="14" height="16" rx="3" fill="#f6f2ec" /><rect x="95" y="36" width="16" height="5" rx="2" fill="#e2d8cb" /></svg>
    </Layer>
    <Layer className="in-l-tripod" depth={18}>
      <div className="in-tripod">
        <Phone className="in-phone"><ProductScene variant={2} /><span className="in-rec"><i />REC</span></Phone>
        <svg viewBox="0 0 60 60" className="in-legs"><path d="M30 0v22M30 22 6 60M30 22l24 38M30 22v38" stroke="#1d2228" strokeWidth="3" strokeLinecap="round" /></svg>
      </div>
    </Layer>
    <Layer className="in-l-brief" depth={22}>
      <div className="in-card in-brief">
        <h5><FileText /> Creator Brief</h5>
        <ul>{['Campaign goals', 'Key message', 'Content ideas', 'Deliverables'].map((t) => <li key={t}><span className="in-tick"><Check /></span>{t}</li>)}</ul>
      </div>
    </Layer>
    <Layer className="in-l-concept" depth={28}>
      <div className="in-card in-concept">
        <h5>Video Concept</h5>
        <span className="in-concept-img"><ProductScene variant={1} /><span className="in-play"><Play /></span></span>
        <span className="in-bar"><i /></span>
        <Lines n={1} />
      </div>
    </Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage in-deliver-stage">
    <Layer className="in-l-board" depth={0}>
      <div className="in-sheet in-board">
        <h5>Content Storyboard</h5>
        {[0, 1, 2].map((v) => (
          <div className="in-board-row" key={v}>
            <span className="in-frame"><ProductScene variant={v as 0 | 1 | 2} /><span className="in-play sm"><Play /></span></span>
            <Lines n={3} />
          </div>
        ))}
      </div>
    </Layer>
    <Layer className="in-l-book" depth={0}>
      <Book className="in-book">
        <Brand />
        <h4>Creator<br />Campaign Brief</h4>
        <p>Strategy · Content · Collaboration</p>
        <div className="in-book-img"><ProductScene /></div>
      </Book>
    </Layer>
    <Layer className="in-l-sample" depth={0}>
      <div className="in-sheet in-sample">
        <h5>Sample Video Concept</h5>
        <span className="in-sample-img"><ProductScene variant={2} /><span className="in-play"><Play /></span></span>
      </div>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'influencer',
  crumb: 'Creator Campaigns',
  eyebrow: 'INFLUENCER & CREATOR CAMPAIGNS',
  title: ['Relevant voices.', 'A shared brand story.'],
  intro: 'Plan purposeful creator collaborations around your audience, message and campaign goals.',
  primaryCta: 'Discuss Your Creator Campaign',
  heroVisual: HeroVisual,
  overviewTitle: <>Find the right fit<br />for your brand’s next story.</>,
  overviewText: 'We help identify relevant creators and coordinate collaborations from the brief to the campaign review. Audience relevance, creative fit and clear expectations guide the process.',
  helps: ['Introducing a product or brand story', 'Reaching relevant creator communities', 'Coordinating content collaborations'],
  scopeTitle: 'What we plan and coordinate.',
  scopeIconStyle: 'plain',
  scope: [
    [Target, 'Campaign Goals & Creative Brief', 'Define your message, audience and collaboration scope.'],
    [UsersRound, 'Creator Discovery & Evaluation', 'Review relevance, content style and audience fit.'],
    [Mail, 'Outreach & Collaboration Coordination', 'Coordinate availability, proposals and agreed expectations.'],
    [FileText, 'Content Briefs & Approval Workflow', 'Align deliverables, messaging and review stages.'],
    [ShieldCheck, 'Usage Rights & Disclosure Planning', 'Clarify agreed content usage and disclosure requirements.'],
    [BarChart3, 'Campaign Tracking & Review', 'Review available activity and share useful observations.'],
  ],
  deliverTitle: <>Clear expectations.<br />A coordinated collaboration.</>,
  deliverables: ['Campaign objectives and creator brief', 'Creator shortlist and evaluation notes', 'Agreed collaboration and deliverable plan', 'Content review and approval coordination', 'Usage and disclosure requirements summary', 'Campaign report and recommendations'],
  deliverNote: 'Creator fees, product samples, travel, production, usage rights and paid amplification are agreed in scope.',
  deliverVisual: DeliverVisual,
  processTitle: 'From creator discovery to campaign learning.',
  processStyle: 'line',
  steps: [
    ['Plan', 'Define goals, audience, message and collaboration scope.'],
    ['Select', 'Identify and evaluate relevant creators.'],
    ['Coordinate', 'Manage outreach, briefs, approvals and deliverables.'],
    ['Review', 'Review available activity and share insights for future campaigns.'],
  ],
  faqTitle: 'Your creator campaign questions, answered.',
  faqStyle: 'plus-right',
  faqs: [
    ['Are creator fees included?', 'Creator fees are separate unless specifically included in the agreed project scope.'],
    ['Can we approve creators before outreach?', 'Yes. You review the shortlist and evaluation notes, and approve creators before we contact them.'],
    ['Can we reuse the campaign content?', 'Reuse depends on the usage rights agreed with each creator. We clarify these before the collaboration begins.'],
  ],
  relatedTitle: 'Connect creator content with your wider plan.',
  related: [
    { icon: Smartphone, title: 'Reels & Short-Form Video', text: 'Plan and produce engaging short-form content for social media.', target: 'Reels & Short-Form Video' },
    { icon: Megaphone, title: 'Social Media Advertising', text: 'Extend your content with targeted social media campaigns.', target: 'Social Media Advertising' },
    { icon: BarChart3, title: 'Social Analytics & Reporting', text: 'Understand what’s working and inform your next campaign.', target: 'Social Analytics & Reporting' },
  ],
  ctaTitle: <>Give your next collaboration<br />a clear purpose.</>,
  ctaText: 'Let’s discuss your audience, brand story and creator needs.',
  ctaTone: 'navy',
  ctaInset: true,
  animate: () => {
    gsap.to('.in-ring', { boxShadow: '0 0 4em 1.4em #ffffffcc, inset 0 0 2em .6em #ffffffaa', duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.in-head', { rotation: -4, svgOrigin: '70 88', duration: 2.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.in-arm', { rotation: 3, svgOrigin: '100 160', duration: 1.9, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.in-rec i', { opacity: 0.15, duration: 0.6, repeat: -1, yoyo: true, ease: 'steps(1)' });
    gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 1 })
      .fromTo('.in-tick', { scale: 0 }, { scale: 1, duration: 0.4, stagger: 0.45, ease: 'back.out(3)' })
      .to('.in-tick', { scale: 0, duration: 0.3, stagger: 0.05 }, '+=2.4');
    gsap.fromTo('.in-bar i', { scaleX: 0 }, { scaleX: 1, transformOrigin: '0% 50%', duration: 5, ease: 'none', repeat: -1 });
    gsap.fromTo('.in-play', { scale: 1 }, { scale: 1.15, duration: 0.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const InfluencerCampaignsPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default InfluencerCampaignsPage;
