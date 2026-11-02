import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, CalendarDays, FileText, Image as ImageIcon, LayoutGrid, MessageCircleMore, MessagesSquare, Play, Send, SquareCheck, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Brand, Laptop, Phone, ProductScene, Sprig, ThumbBuilding, ThumbSea } from '../template/ServiceArt';
import './SocialMediaManagementPage.css';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

/** One scheduled post in the calendar: a thumbnail or a caption chip. */
const Post: React.FC<{ kind: 0 | 1 | 2 | 3 }> = ({ kind }) => (
  <span className={`mg-post mg-post-${kind}`}>
    {kind === 0 && <ThumbSea />}
    {kind === 1 && <ProductScene variant={1} />}
    {kind === 2 && <ThumbBuilding />}
    {kind === 3 && <><i /><i /></>}
  </span>
);

const CALENDAR: (0 | 1 | 2 | 3)[][] = [[3, 2], [1], [3, 0], [0, 3], [2]];

const HeroVisual = (
  <div className="ss-stage mg-hero-stage">
    <Layer className="mg-l-plant" depth={3} float={false}>
      <svg viewBox="0 0 80 110" className="mg-plant"><Sprig x={40} y={82} s={1.25} /><Sprig x={42} y={82} s={1.05} flip /><Sprig x={38} y={82} s={0.9} /><path d="M24 80h32l-4 28H28Z" fill="#f2f4f4" /></svg>
    </Layer>
    <Layer className="mg-l-laptop" depth={6} float={false}>
      <Laptop className="mg-laptop">
        <div className="mg-app">
          <aside>
            <span className="mg-app-brand"><Brand /></span>
            {[[LayoutGrid, 'Content'], [CalendarDays, 'Calendar'], [UsersRound, 'Inbox'], [ImageIcon, 'Media'], [BarChart3, 'Analytics']].map(([I, t], i) => {
              const Icon = I as typeof LayoutGrid;
              return <span key={t as string} className={i === 1 ? 'on' : ''}><Icon />{t as string}</span>;
            })}
          </aside>
          <div className="mg-cal">
            <h5>Social Content Calendar</h5>
            <div className="mg-cal-grid">
              {DAYS.map((d, i) => (
                <div key={d} className="mg-day"><small>{d}</small>{CALENDAR[i].map((k, j) => <Post key={j} kind={k} />)}</div>
              ))}
            </div>
          </div>
        </div>
      </Laptop>
    </Layer>
    <Layer className="mg-l-phone" depth={14}>
      <Phone className="mg-phone">
        <div className="mg-feed">
          <div className="mg-feed-head"><i /><span /></div>
          <div className="mg-feed-grid">{[0, 1, 2, 0, 2, 1].map((k, i) => <Post key={i} kind={k as 0 | 1 | 2} />)}</div>
        </div>
      </Phone>
    </Layer>
    <Layer className="mg-l-b1" depth={20}><span className="mg-badge"><CalendarDays /></span></Layer>
    <Layer className="mg-l-b2" depth={24}><span className="mg-badge"><MessageCircleMore /></span></Layer>
    <Layer className="mg-l-b3" depth={26}><span className="mg-badge"><Send /></span></Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage mg-deliver-stage">
    <Layer className="mg-l-leaves" depth={0} float={false}>
      <svg viewBox="0 0 120 90" className="mg-leaves"><Sprig x={70} y={90} s={1.4} /><Sprig x={72} y={90} s={1.2} flip /><Sprig x={68} y={90} s={1} /></svg>
    </Layer>
    <Layer className="mg-l-sheet" depth={0}>
      <div className="mg-sheet">
        <h5>Content Calendar</h5>
        <div className="mg-sheet-days">{DAYS.map((d) => <small key={d}>{d}</small>)}</div>
        <div className="mg-sheet-grid">{Array.from({ length: 25 }, (_, i) => <i key={i} className={[1, 3, 7, 9, 12, 16, 18, 22].includes(i) ? 'on' : ''} />)}</div>
        <span className="mg-pen" />
      </div>
    </Layer>
    <Layer className="mg-l-book" depth={0}>
      <div className="mg-book">
        <div className="mg-book-copy">
          <Brand />
          <h4>Social<br />Management<br />Plan</h4>
          <i className="sa-book-rule" />
          <p>A structured approach to consistent and engaging social media.</p>
        </div>
        <span className="mg-book-img"><ThumbBuilding /><span className="mg-pool" /></span>
      </div>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'smm',
  crumb: 'Management',
  eyebrow: 'SOCIAL MEDIA MANAGEMENT',
  title: ['Stay consistent.', 'Stay connected.'],
  intro: 'Keep your social channels organised, active and aligned with your brand through planned publishing and thoughtful audience engagement.',
  primaryCta: 'Discuss Your Social Plan',
  heroVisual: HeroVisual,
  overviewTitle: <>Give your social presence<br />a dependable rhythm.</>,
  overviewText: 'We coordinate your agreed content, publishing schedule and community activity so your channels stay consistent. Clear approvals and regular reviews keep the work connected to your business goals.',
  helps: ['Maintaining regular publishing', 'Managing multiple social channels', 'Coordinating content and audience responses.'],
  scopeTitle: 'What we manage for your brand.',
  scopeIconStyle: 'plain',
  scope: [
    [UsersRound, 'Channel & Account Coordination', 'Organise selected channels and agreed account access.'],
    [CalendarDays, 'Publishing & Scheduling', 'Schedule approved posts across selected platforms.'],
    [FileText, 'Captions & Platform Adaptation', 'Adapt agreed content and copy to each channel.'],
    [MessagesSquare, 'Comments & Inbox Coordination', 'Handle agreed responses and escalate enquiries.'],
    [SquareCheck, 'Approvals & Content Workflow', 'Keep reviews and publishing responsibilities clear.'],
    [BarChart3, 'Performance Reviews & Reporting', 'Review available insights and plan improvements.'],
  ],
  deliverTitle: <>A clearer system for<br />your social channels.</>,
  deliverables: ['Agreed publishing calendar', 'Scheduled and published approved posts', 'Platform-ready captions and content adaptations', 'Community response and escalation guidelines', 'Approval and workflow coordination', 'Performance reports and recommendations'],
  deliverNote: 'Platforms, posting volume, response coverage, asset creation and paid advertising are agreed separately in scope.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processTitle: 'From planning to everyday consistency.',
  processStyle: 'line',
  steps: [
    ['Align', 'We confirm your goals, channels and scope.'],
    ['Prepare', 'We organise content, captions and the publishing schedule.'],
    ['Publish & Engage', 'We publish approved posts and manage agreed community activity.'],
    ['Review', 'We look at available insights and recommend improvements.'],
  ],
  faqTitle: 'Your management questions, answered.',
  faqStyle: 'plus-left',
  faqs: [
    ['Do you create the posts as well?', 'Content creation can be included in the agreed scope or we can work with assets supplied by your team.'],
    ['Which platforms can you manage?', 'We can support the platforms selected for your business, subject to agreed access and scope.'],
    ['Do you respond to every message?', 'Response coverage, escalation rules and working hours are agreed before the service begins.'],
  ],
  relatedTitle: 'Support your social presence.',
  related: [
    { icon: CalendarDays, title: 'Content Planning & Calendars', text: 'A clear plan for consistent and relevant content.', target: 'Content Planning' },
    { icon: ImageIcon, title: 'Creative Posts & Carousels', text: 'Branded visuals designed for your channels.', target: 'Creative Posts & Carousels' },
    { icon: Play, title: 'Reels & Short-Form Video', text: 'Short-form video content to bring your brand to life.', target: 'Reels & Short-Form Video' },
  ],
  ctaTitle: 'Give your social channels a clearer routine.',
  ctaText: 'Let’s discuss your platforms, content and management needs.',
  ctaTone: 'blue',
  animate: () => {
    // Posts "publish" into the calendar one after another, then reset.
    gsap.timeline({ repeat: -1, repeatDelay: 1.6, delay: 0.8 })
      .fromTo('.mg-cal .mg-post', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, stagger: 0.22, ease: 'back.out(2)' })
      .to('.mg-cal .mg-post', { opacity: 0.25, duration: 0.4, stagger: 0.05 }, '+=2.4');
    gsap.to('.mg-feed-grid .mg-post', { scale: 0.9, opacity: 0.6, duration: 0.4, stagger: { each: 0.25, from: 'random', repeat: -1, yoyo: true, repeatDelay: 1 } });
    gsap.to('.mg-badge', { scale: 1.1, boxShadow: '0 0 0 0.5em #0aa5a322', duration: 0.6, stagger: { each: 0.5, repeat: -1, yoyo: true }, ease: 'sine.inOut' });
    gsap.to('.mg-sheet-grid .on', { scale: 1.12, duration: 0.45, stagger: { each: 0.25, repeat: -1, yoyo: true, repeatDelay: 1 } });
    gsap.to('.mg-pen', { x: '-1.2em', y: '-0.4em', duration: 1.8, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.mg-plant .sa-sprig', { rotation: 4, svgOrigin: '40 82', duration: 2.6, stagger: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const SocialMediaManagementPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default SocialMediaManagementPage;
