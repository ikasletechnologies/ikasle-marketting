import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, Bookmark, Check, FilePen, Heart, LayoutGrid, MessageCircle, PieChart, Play, Settings, Target, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServiceTemplateData, type ServicePageProps } from '../template/ServiceDetailTemplate';
import { ArmchairScene, Book, Brand, Laptop, Lines, Phone, ProductScene, ThumbPlant } from '../template/ServiceArt';
import './SocialAdvertisingPage.css';

const AdPost: React.FC = () => (
  <div className="ad-post">
    <div className="ad-post-head"><span className="ad-post-logo">IK</span><span><b>IKASLĒ</b><small>Marketing</small></span></div>
    <div className="ad-post-img">
      <ArmchairScene />
      <p>Design<br />for a brighter<br />tomorrow.</p>
    </div>
    <div className="ad-post-cta"><Lines n={1} /><span className="ad-chip">Learn more</span></div>
    <div className="ad-post-icons"><Heart className="ad-heart" /><MessageCircle /><Bookmark className="ad-save" /></div>
  </div>
);

const HeroVisual = (
  <div className="ss-stage ad-hero-stage">
    <Layer className="ad-l-laptop" depth={6} float={false}>
      <Laptop className="ad-laptop">
        <div className="ad-dash">
          <div className="ad-dash-side"><LayoutGrid /><Target /><UsersRound /><BarChart3 /><Settings /></div>
          <div className="ad-dash-main">
            <h5>Campaign Plan</h5>
            <div className="ad-panel">
              <small>Audience</small>
              <div className="ad-audience">
                <ul>{['Key audiences', 'Interests & behaviours', 'Placement options'].map((t) => <li key={t}><span className="ad-check"><Check /></span>{t}</li>)}</ul>
                <UsersRound className="ad-aud-icon" />
              </div>
            </div>
            <div className="ad-panel">
              <small>Creative</small>
              <div className="ad-creatives">
                <span className="ad-creative"><ThumbPlant /></span>
                <span className="ad-creative"><ArmchairScene plant={false} /></span>
                <span className="ad-creative"><ArmchairScene lamp wall="#e9eef0" wall2="#dce5e8" plant={false} /></span>
              </div>
            </div>
          </div>
        </div>
      </Laptop>
    </Layer>
    <Layer className="ad-l-phone" depth={18}><Phone className="ad-phone"><AdPost /></Phone></Layer>
  </div>
);

const AdCard: React.FC<{ text: React.ReactNode; lamp?: boolean }> = ({ text, lamp }) => (
  <div className="ad-card">
    <div className="ad-card-img">
      <ArmchairScene lamp={lamp} plant={false} wall={lamp ? '#2c8193' : '#e9f0f1'} wall2={lamp ? '#1b6274' : '#d8e3e6'} />
      <p className={lamp ? 'light' : ''}>{text}</p>
    </div>
    <Lines n={2} />
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage ad-deliver-stage">
    <Layer className="ad-l-book" depth={0}>
      <Book className="ad-book">
        <Brand />
        <h4>Social<br />Campaign Plan</h4>
        <span className="sa-book-rule" />
        <div className="ad-book-img"><ArmchairScene /></div>
      </Book>
    </Layer>
    <Layer className="ad-l-card1" depth={0}><AdCard lamp text={<>Modern<br />spaces for<br />brighter days.</>} /></Layer>
    <Layer className="ad-l-card2" depth={0}><AdCard text={<>Thoughtful<br />design for<br />everyday living.</>} /></Layer>
  </div>
);

const ThumbPhonePost = <span className="ad-thumb"><Phone className="ad-thumb-phone"><ArmchairScene /></Phone></span>;
const ThumbPhoneVideo = <span className="ad-thumb ad-thumb-dark"><Phone className="ad-thumb-phone"><ProductScene variant={1} /><span className="ad-thumb-play"><Play /></span></Phone></span>;
const ThumbLaptop = <span className="ad-thumb"><Laptop className="ad-thumb-laptop"><ArmchairScene wall="#e5f1f3" /></Laptop></span>;

const data: ServiceTemplateData = {
  key: 'advertising',
  crumb: 'Social Media Advertising',
  eyebrow: 'SOCIAL MEDIA ADVERTISING',
  title: ['Give your message', 'a relevant audience.'],
  intro: 'Connect thoughtful creative with focused social campaigns built around your audience and business goals.',
  primaryCta: 'Discuss Your Social Campaign',
  heroVisual: HeroVisual,
  overviewTitle: <>Bring creative and<br />campaign direction together.</>,
  overviewText: 'We plan and manage paid social activity around a clear objective, suitable audiences and relevant messages. Testing and reporting help guide improvements as your campaigns run.',
  helps: ['Building awareness for your brand', 'Promoting products, services or launches', 'Supporting relevant enquiries and website actions.'],
  scopeTitle: 'What goes into your social campaign.',
  scopeIconStyle: 'plain',
  scope: [
    [Target, 'Campaign Strategy & Objectives', 'Agree goals, selected platforms and campaign priorities.'],
    [UsersRound, 'Audience Planning & Targeting', 'Define relevant audience approaches and available options.'],
    [FilePen, 'Ad Creative & Copy', 'Prepare messages and assets for agreed placements.'],
    [Settings, 'Campaign Setup & Budgeting', 'Configure campaigns, schedules and spending settings.'],
    [BarChart3, 'Tracking & Conversion Journeys', 'Connect ads with suitable landing pages or lead forms.'],
    [PieChart, 'Testing & Performance Review', 'Review creative and campaign activity to guide changes.'],
  ],
  deliverTitle: <>A focused plan from creative<br />to campaign review.</>,
  deliverables: ['Campaign objectives and audience plan', 'Agreed ad copy and creative assets', 'Campaign and placement setup', 'Budget and scheduling configuration', 'Agreed tracking and enquiry journey', 'Reports and optimisation recommendations'],
  deliverNote: 'Advertising spend is separate from service fees. Platforms, creative production and tracking requirements are agreed in scope.',
  deliverVisual: DeliverVisual,
  processTitle: 'From campaign direction to informed improvements.',
  processStyle: 'inline',
  steps: [
    ['Plan', 'Define objectives, audiences and campaign approach.'],
    ['Create', 'Prepare ad creative, copy and campaign setup.'],
    ['Launch', 'Activate campaigns across agreed platforms.'],
    ['Refine', 'Review performance and make informed improvements.'],
  ],
  faqTitle: 'Your social advertising questions, answered.',
  faqStyle: 'plus-left',
  faqs: [
    ['Which platforms can you advertise on?', 'We recommend suitable platforms around your audience and objectives, then agree the selected channels in scope.'],
    ['Is advertising spend included?', 'No. Advertising spend is paid directly to the platforms and is separate from our service fees.'],
    ['Do you create the ad visuals?', 'Ad creative and copy can be included in scope, or we can work with assets your team provides.'],
  ],
  relatedTitle: 'Connect your campaign with the wider journey.',
  related: [
    { thumb: ThumbPhonePost, title: 'Creative Posts & Carousels', text: 'On-brand social content to build awareness and support your campaigns.', target: 'Creative Posts & Carousels' },
    { thumb: ThumbPhoneVideo, title: 'Reels & Short-Form Video', text: 'Engaging short-form content to complement your campaign activity.', target: 'Reels & Short-Form Video' },
    { thumb: ThumbLaptop, title: 'Landing Pages & CRO', text: 'Focused landing pages to support your campaigns and drive relevant actions.', target: 'Landing Pages & CRO' },
  ],
  ctaTitle: <>Give your next social campaign<br />a clear direction.</>,
  ctaText: 'Let’s discuss your audience, message and campaign goals.',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.timeline({ repeat: -1, repeatDelay: 1.5, delay: 1.2 })
      .fromTo('.ad-check', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.45, stagger: 0.5, ease: 'back.out(3)' })
      .fromTo('.ad-creative', { y: 8, opacity: 0.3 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.25, ease: 'power2.out' }, '-=0.3')
      .to('.ad-check, .ad-creative', { opacity: 0.3, duration: 0.5 }, '+=2.5');
    gsap.to('.ad-chip', { scale: 1.08, duration: 0.7, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.fromTo('.ad-heart', { scale: 1 }, { scale: 1.35, fill: '#ff5a7a', color: '#ff5a7a', duration: 0.35, repeat: -1, yoyo: true, repeatDelay: 1.8, ease: 'back.out(3)' });
    gsap.to('.ad-aud-icon', { scale: 1.1, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.sa-lamp circle', { opacity: 0.45, scale: 1.25, transformOrigin: '50% 50%', duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const SocialAdvertisingPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default SocialAdvertisingPage;
