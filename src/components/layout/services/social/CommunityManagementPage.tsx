import React from 'react';
import { gsap } from 'gsap';
import { AtSign, BarChart3, CalendarDays, Heart, Mail, Megaphone, MessageCircle, MessageCircleMore, Route, Send, ShieldCheck, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServiceTemplateData, type ServicePageProps } from '../template/ServiceDetailTemplate';
import { Avatar, Book, Brand, Lines } from '../template/ServiceArt';
import './CommunityManagementPage.css';

const people = [
  { skin: '#f1c7a8', hair: '#3a2a22', shirt: '#2e8fc9', long: true },
  { skin: '#c99772', hair: '#2b2321', shirt: '#0aa5a3', beard: true },
  { skin: '#e8b996', hair: '#5a3a28', shirt: '#7d6ff0', long: true },
  { skin: '#f3d0b6', hair: '#1e1a18', shirt: '#e07aa8' },
];

const HeroVisual = (
  <div className="ss-stage cm-hero-stage">
    <Layer className="cm-l-inbox" depth={6} float={false}>
      <div className="cm-inbox">
        <div className="cm-side">
          <span className="cm-side-dots">• •</span>
          <span className="active"><MessageCircle /><i className="cm-badge">3</i></span>
          <span><Send /></span><span><AtSign /></span><span><Heart /></span>
        </div>
        <div className="cm-main">
          <h4>Social Inbox</h4>
          {people.map((p, i) => (
            <div className="cm-row" key={i}>
              <span className="cm-row-av"><Avatar {...p} /></span>
              <Lines n={2} />
            </div>
          ))}
        </div>
      </div>
    </Layer>
    <Layer className="cm-l-av1" depth={20}><span className="cm-av"><Avatar {...people[0]} /></span></Layer>
    <Layer className="cm-l-b1" depth={24}><span className="cm-bubble"><Lines n={3} /></span></Layer>
    <Layer className="cm-l-av2" depth={16}><span className="cm-av"><Avatar {...people[1]} /></span></Layer>
    <Layer className="cm-l-b2" depth={22}><span className="cm-bubble cm-typing"><i className="cm-dot" /><i className="cm-dot" /><i className="cm-dot" /></span></Layer>
    <Layer className="cm-l-av3" depth={18}><span className="cm-av"><Avatar {...people[2]} /></span></Layer>
    <Layer className="cm-l-group" depth={26}><span className="cm-group"><UsersRound /></span></Layer>
  </div>
);

const replies = [
  [MessageCircle, 'Thanks for getting in touch! We’ve passed this to the right team and they’ll be in touch soon.'],
  [Send, 'That’s a great question! Here’s some helpful information …'],
  [Heart, 'We appreciate your feedback and will review this with our team.'],
] as const;

const DeliverVisual = (
  <div className="ss-deliver-stage cm-deliver-stage">
    <Layer className="cm-l-book" depth={0}>
      <Book tone="navy" className="cm-book">
        <Brand light />
        <h4>Community<br />Playbook</h4>
        <span className="sa-book-rule" />
        <p>Guidelines. Responses.<br />People. Progress.</p>
        <span className="cm-book-rule2" />
      </Book>
    </Layer>
    {replies.map(([Icon, text], i) => (
      <Layer key={i} className={`cm-l-reply cm-l-reply-${i}`} depth={0}>
        <div className="cm-reply"><span className="cm-reply-icon"><Icon /></span><p>{text}</p></div>
      </Layer>
    ))}
  </div>
);

const data: ServiceTemplateData = {
  key: 'community',
  crumb: 'Community Management',
  eyebrow: 'COMMUNITY MANAGEMENT',
  title: ['Better conversations.', 'Stronger connections.'],
  intro: 'Keep your audience heard with thoughtful responses, clear moderation and organised enquiry handovers.',
  primaryCta: 'Discuss Your Community Plan',
  heroVisual: HeroVisual,
  overviewTitle: <>Show up for the people<br />who engage with your brand.</>,
  overviewText: 'We help manage everyday conversations across agreed social channels. A clear response approach keeps your brand voice consistent and helps enquiries, feedback and sensitive issues reach the right people.',
  helps: ['Managing comments and direct messages', 'Keeping responses consistent with your brand', 'Routing enquiries and sensitive issues.'],
  scopeTitle: 'What we support in your community.',
  scopeIconStyle: 'plain',
  scope: [
    [MessageCircleMore, 'Response Guidelines & Brand Voice', 'Agree tone, approved answers and response boundaries.'],
    [Mail, 'Comment & Inbox Management', 'Review and respond within agreed coverage.'],
    [UsersRound, 'Conversation & Engagement Support', 'Support relevant, helpful audience interactions.'],
    [ShieldCheck, 'Moderation & Escalation', 'Apply agreed rules and flag sensitive issues.'],
    [Route, 'Enquiry Routing & Team Handover', 'Pass relevant enquiries to your designated team.'],
    [BarChart3, 'Feedback Themes & Reporting', 'Summarise recurring questions and useful audience insights.'],
  ],
  deliverTitle: <>A clear framework for<br />everyday conversations.</>,
  deliverables: ['Community response guidelines', 'Approved reply and FAQ templates', 'Agreed comment and inbox coverage', 'Moderation and escalation workflow', 'Enquiry routing and handover notes', 'Community activity and feedback reports'],
  deliverNote: 'Channels, coverage hours, response targets, languages and escalation responsibilities are agreed in scope.',
  deliverVisual: DeliverVisual,
  processTitle: 'From listening to useful follow-through.',
  processStyle: 'line',
  steps: [
    ['Align', 'Agree channels, response guidelines and escalation processes.'],
    ['Listen', 'Review and monitor comments and direct messages.'],
    ['Respond', 'Provide thoughtful responses and route enquiries as needed.'],
    ['Review', 'Identify recurring themes and share useful insights.'],
  ],
  faqTitle: 'Your community questions, answered.',
  faqStyle: 'chevron',
  faqs: [
    ['Do you provide round-the-clock responses?', 'Coverage hours and response expectations are agreed in scope. Sensitive or specialist enquiries are escalated to your team.'],
    ['How do you handle complaints?', 'We follow your agreed escalation process: acknowledging the comment, moving the conversation to a private channel where appropriate and passing it to the right person on your team.'],
    ['Can you respond in our brand voice?', 'Yes. We agree tone, approved phrases and example replies up front so every response sounds like your brand.'],
  ],
  relatedTitle: 'Support a connected social presence.',
  related: [
    { icon: Megaphone, title: 'Social Media Management', text: 'Consistent, on-brand content and day-to-day management.', target: 'Social Media Management' },
    { icon: CalendarDays, title: 'Content Planning & Calendars', text: 'A clear plan for what to share and when.', target: 'Content Planning' },
    { icon: BarChart3, title: 'Social Analytics & Reporting', text: 'Understand what’s working and where to focus next.', target: 'Social Analytics & Reporting' },
  ],
  ctaTitle: 'Make your audience feel heard.',
  ctaText: 'Let’s discuss your channels, conversations and community needs.',
  ctaTone: 'blue',
  animate: () => {
    const rows = gsap.utils.toArray<HTMLElement>('.cm-row');
    const tl = gsap.timeline({ repeat: -1, delay: 1.2 });
    rows.forEach((r) => tl.to(r, { backgroundColor: '#e3f6f6', x: 6, boxShadow: '0 0.5em 1.2em #0b2b4c22', duration: 0.4, ease: 'power2.out' })
      .to(r, { backgroundColor: '#ffffff', x: 0, boxShadow: '0 0.2em 0.5em #0b2b4c12', duration: 0.4, ease: 'power2.in' }, '+=0.8'));
    gsap.to('.cm-dot', { y: -4, duration: 0.35, stagger: 0.15, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.fromTo('.cm-badge', { scale: 1 }, { scale: 1.3, duration: 0.5, repeat: -1, yoyo: true, repeatDelay: 1.2, ease: 'back.out(3)' });
    gsap.fromTo('.cm-bubble .sa-lines i', { scaleX: 0, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 0.6, stagger: 0.25, repeat: -1, repeatDelay: 2.2, ease: 'power2.out' });
    gsap.to('.cm-reply-icon', { scale: 1.12, duration: 0.6, stagger: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const CommunityManagementPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default CommunityManagementPage;
