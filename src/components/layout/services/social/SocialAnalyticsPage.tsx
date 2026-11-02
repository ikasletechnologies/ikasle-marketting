import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, CalendarDays, FileText, LayoutGrid, Lightbulb, Megaphone, MessageSquareText, PieChart, Settings, Target, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServiceTemplateData, type ServicePageProps } from '../template/ServiceDetailTemplate';
import { Avatar, Book, Brand, Lines, Sprig, ThumbBuilding, ThumbPlant, ThumbSea } from '../template/ServiceArt';
import './SocialAnalyticsPage.css';

const LINE = 'M0 52 C14 46 20 30 34 34 S54 54 68 40 S90 12 104 20 S126 40 140 26 S162 8 180 12';

const HeroVisual = (
  <div className="ss-stage an-hero-stage">
    <Layer className="an-l-plant" depth={4} float={false}>
      <svg viewBox="0 0 80 110" className="an-plant"><Sprig x={40} y={78} s={1.3} /><Sprig x={42} y={78} s={1.1} flip /><Sprig x={38} y={78} s={0.9} /><path d="M24 76h32l-4 34H28Z" fill="#203345" /></svg>
    </Layer>
    <Layer className="an-l-tablet" depth={8} float={false}>
      <div className="an-tablet">
        <div className="an-screen">
          <div className="an-side"><LayoutGrid /><BarChart3 /><UsersRound /><MessageSquareText /><Settings /></div>
          <div className="an-grid">
            <div className="an-card an-chart">
              <small>Platform Insights</small>
              <svg viewBox="0 0 180 60" preserveAspectRatio="none">
                <defs><linearGradient id="an-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#24d1c4" stopOpacity=".45" /><stop offset="1" stopColor="#24d1c4" stopOpacity="0" /></linearGradient></defs>
                {[15, 30, 45].map((y) => <line key={y} x1="0" x2="180" y1={y} y2={y} stroke="#ffffff14" />)}
                <path className="an-area" d={`${LINE} L180 60 L0 60Z`} fill="url(#an-area)" />
                <path className="an-line" d={LINE} pathLength={1} fill="none" stroke="#3fe0d0" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </div>
            <div className="an-card an-donut-card">
              <small>Engagement</small>
              <svg viewBox="0 0 42 42" className="an-donut">
                <circle cx="21" cy="21" r="15.9" fill="none" stroke="#ffffff1a" strokeWidth="5" />
                <circle className="an-donut-arc" cx="21" cy="21" r="15.9" fill="none" stroke="#1fb5e8" strokeWidth="5" strokeLinecap="round" pathLength={100} strokeDasharray="72 100" transform="rotate(-90 21 21)" />
              </svg>
              <div className="an-bars">{[40, 62, 50, 78, 92].map((h, i) => <i key={i} className="an-bar" style={{ height: `${h}%` }} />)}</div>
            </div>
            <div className="an-card an-thumbs">
              <span><ThumbPlant /></span><span><ThumbBuilding /></span><span><ThumbSea /></span>
            </div>
            <div className="an-card an-audience">
              <small>Audience</small>
              <div><span><Avatar bg="#cfe9f5" /></span><span><Avatar bg="#d8f2ef" long hair="#5a3a28" shirt="#0aa5a3" /></span></div>
            </div>
          </div>
        </div>
      </div>
    </Layer>
    <Layer className="an-l-pen" depth={14} float={false}><span className="an-pen" /></Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage an-deliver-stage">
    <Layer className="an-l-report" depth={0}>
      <div className="an-report">
        <h5>Content Analysis</h5>
        <div className="an-report-thumbs"><span><ThumbPlant /></span><span><ThumbBuilding /></span><span><ThumbSea /></span></div>
        <div className="an-report-body">
          <Lines n={4} />
          <div className="an-hbars">{[86, 64, 74, 48, 58].map((w, i) => <i key={i} className="an-hbar" style={{ width: `${w}%` }} />)}</div>
        </div>
      </div>
    </Layer>
    <Layer className="an-l-book" depth={0}>
      <Book tone="navy" className="an-book">
        <h4>Social<br />Performance<br />Review</h4>
        <span className="sa-book-rule" />
        <svg viewBox="0 0 160 90" preserveAspectRatio="none" className="an-book-wave">
          {[0, 1, 2, 3, 4].map((n) => <path key={n} d={`M0 ${50 + n * 6} C40 ${20 + n * 8} 80 ${80 - n * 4} 160 ${30 + n * 7}`} fill="none" stroke="#2fa7d8" strokeOpacity={0.5 - n * 0.08} strokeWidth="1.2" />)}
        </svg>
        <span className="an-book-brand"><Brand light /></span>
      </Book>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'analytics',
  crumb: 'Analytics & Reporting',
  eyebrow: 'SOCIAL ANALYTICS & REPORTING',
  title: ['Understand your activity.', 'Give your next move direction.'],
  intro: 'Turn social platform insights into clear reports, useful observations and practical content recommendations.',
  primaryCta: 'Discuss Your Reporting Needs',
  heroVisual: HeroVisual,
  overviewTitle: <>Look beyond the numbers.<br /><em>Understand what they mean.</em></>,
  overviewText: 'We review available social data against your goals and content activity. Clear reporting helps you see patterns, ask better questions and decide what to test or improve next.',
  helpIcon: Lightbulb,
  helps: ['Reviewing content and channel performance', 'Comparing activity across selected platforms', 'Planning your next content improvements.'],
  scopeTitle: 'What we review and explain.',
  scopeIconStyle: 'plain',
  scope: [
    [Target, 'Goals & KPI Alignment', 'Agree relevant measures for your social objectives.'],
    [BarChart3, 'Platform Insights Review', 'Review available channel activity and audience data.'],
    [FileText, 'Content & Format Analysis', 'Compare agreed content types, topics and formats.'],
    [UsersRound, 'Audience & Engagement Patterns', 'Explore relevant interaction and audience trends.'],
    [PieChart, 'Reports & Dashboard Summaries', 'Present selected measures with clear context.'],
    [MessageSquareText, 'Recommendations & Review Sessions', 'Turn observations into practical next steps.'],
  ],
  deliverTitle: <>Clear reporting.<br /><em>Useful next steps.</em></>,
  deliverables: ['Agreed social measurement framework', 'Selected platform performance summary', 'Content and format comparison', 'Audience and engagement observations', 'Prioritised recommendations', 'Reporting review and discussion notes'],
  deliverNote: 'Platforms, reporting period, data access, dashboard tools and paid campaign analysis are agreed in scope.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processTitle: 'From available data to informed decisions.',
  processStyle: 'centered',
  steps: [
    ['Align', 'Confirm your goals, channels and key questions.'],
    ['Gather', 'Review available data and recent content activity.'],
    ['Analyse', 'Identify patterns, observations and opportunities.'],
    ['Recommend', 'Share clear findings and practical next steps.'],
  ],
  faqTitle: 'Your reporting questions, answered.',
  faqStyle: 'chevron',
  faqs: [
    ['Can you report across multiple platforms?', 'Yes. We agree the channels and available data sources, then present findings with suitable context for each platform.'],
    ['How often will we receive reports?', 'Reporting frequency is agreed in scope, typically monthly or quarterly, with a review session to discuss the findings.'],
    ['Does this include paid campaign analysis?', 'Paid campaign analysis can be included where agreed and where you provide access to the relevant ad accounts.'],
  ],
  relatedTitle: 'Put your insights into action.',
  related: [
    { icon: Target, title: 'Social Media Strategy', text: 'Set direction, focus and a clear plan for your social media.', target: 'Social Media Strategy' },
    { icon: CalendarDays, title: 'Content Planning & Calendars', text: 'Plan and organise content that supports your goals.', target: 'Content Planning' },
    { icon: Megaphone, title: 'Social Media Advertising', text: 'Reach the right audience with targeted social campaigns.', target: 'Social Media Advertising' },
  ],
  ctaTitle: <>Make your next social decision<br /><em>better informed.</em></>,
  ctaText: <>Let’s discuss your <em>channels</em>, <em>goals</em> and <em>reporting</em> needs.</>,
  ctaTone: 'dark',
  animate: () => {
    gsap.timeline({ repeat: -1, repeatDelay: 1.2, delay: 0.8 })
      .fromTo('.an-line', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut' })
      .fromTo('.an-area', { opacity: 0 }, { opacity: 1, duration: 1 }, '-=1.2')
      .to('.an-line, .an-area', { opacity: 0, duration: 0.6 }, '+=2.5')
      .set('.an-line', { opacity: 1 });
    gsap.fromTo('.an-bar', { scaleY: 0.2, transformOrigin: '50% 100%' }, { scaleY: 1, duration: 1.1, stagger: 0.12, repeat: -1, yoyo: true, repeatDelay: 1.4, ease: 'power3.inOut' });
    gsap.fromTo('.an-donut-arc', { strokeDasharray: '0 100' }, { strokeDasharray: '72 100', duration: 2, repeat: -1, yoyo: true, repeatDelay: 1.5, ease: 'power2.inOut' });
    gsap.fromTo('.an-hbar', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 1, stagger: 0.15, repeat: -1, yoyo: true, repeatDelay: 2, ease: 'power3.out' });
    gsap.to('.an-book-wave path', { x: -10, duration: 3, stagger: 0.3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.an-plant .sa-sprig', { rotation: 3, svgOrigin: '40 78', duration: 2.6, stagger: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const SocialAnalyticsPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default SocialAnalyticsPage;
