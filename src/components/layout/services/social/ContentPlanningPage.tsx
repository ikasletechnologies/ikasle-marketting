import React, { useState } from 'react';
import { ArrowRight, CalendarDays, Check, ChevronDown, FileCheck2, Goal, Lightbulb, Megaphone, Network, UsersRound } from 'lucide-react';
import heroImg from '../../../../assets/content-planning-hero.png';
import planImg from '../../../../assets/content-planning-deliverables.png';
import creativeImg from '../../../../assets/social-strategy-overview.png';
import reelsImg from '../../../../assets/social-strategy-why.png';
import managementImg from '../../../../assets/social-strategy-hero.png';
import './ContentPlanningPage.css';

interface Props {
  onHomeClick?: () => void; onServicesClick?: () => void; onSocialClick?: () => void;
  onContactClick?: () => void;
  onRelatedClick?: (target: 'strategy' | 'management' | 'profile' | 'creative' | 'reels') => void;
}
const planItems = [
  [Goal, 'Goals & Audience Review', 'Align content priorities with your audience and business.'],
  [FileCheck2, 'Content Pillars & Themes', 'Define recurring topics that support your brand.'],
  [Lightbulb, 'Topic & Format Planning', 'Match ideas with suitable posts, carousels and videos.'],
  [Megaphone, 'Campaign & Seasonal Mapping', 'Plan relevant launches and timely brand moments.'],
  [CalendarDays, 'Calendar & Publishing Schedule', 'Organise agreed content across selected channels.'],
  [UsersRound, 'Briefs & Approval Workflow', 'Clarify requirements, responsibilities and review stages.'],
] as const;
const deliverables = ['Content pillars and theme guide','Topic and format recommendations','Agreed channel content calendar','Campaign and seasonal content map','Content briefs and asset requirements','Approval workflow and handover notes'];
const process = [
  [Lightbulb, 'Understand', 'We learn about your goals, audience and key priorities.'],
  [FileCheck2, 'Map', 'We develop content themes, campaigns and topic ideas.'],
  [CalendarDays, 'Organise', 'We build a clear content calendar and schedule.'],
  [Network, 'Align', 'We share the plan for your review and agree next steps.'],
] as const;
const faqs = [
  ['Does this include creating the posts?', 'Content creation can be included separately in the agreed scope, or your team can use the calendar and briefs to produce assets.'],
  ['Can you plan for multiple platforms?', 'Yes. We can plan channel-specific content for the platforms that matter most to your audience and goals.'],
  ['Can the calendar change after approval?', 'Absolutely. The calendar is a working plan and can be adjusted as priorities, campaigns or opportunities evolve.'],
] as const;
const related = [
  [creativeImg, 'Creative Posts & Carousels', 'On-brand visuals designed for your content plan.', 'creative'],
  [reelsImg, 'Reels & Short-Form Video', 'Engaging short-form content to bring your themes to life.', 'reels'],
  [managementImg, 'Social Media Management', 'Ongoing support to keep your content consistent.', 'management'],
] as const;

export const ContentPlanningPage: React.FC<Props> = (props) => {
  const [openFaq, setOpenFaq] = useState(0);
  return <main className="cp-page">
    <section className="cp-hero"><img src={heroImg} alt="Laptop showing a content calendar" className="cp-hero-image" />
      <div className="cp-container cp-hero-inner"><div className="cp-hero-copy">
        <nav className="cp-breadcrumb"><button onClick={props.onHomeClick}>Home</button><span>/</span><button onClick={props.onServicesClick}>Services</button><span>/</span><button onClick={props.onSocialClick}>Social Media Marketing</button><span>/</span><span aria-current="page">Content Planning &amp; Calendars</span></nav>
        <span className="cp-eyebrow">CONTENT PLANNING &amp; CALENDARS</span><h1>A clear plan.<br/><em>A consistent brand story.</em></h1>
        <p>Bring your ideas, campaigns and publishing schedule together in a practical content calendar.</p>
        <div className="cp-actions"><button className="cp-button primary" onClick={props.onContactClick}>Discuss Your Content Calendar <ArrowRight/></button><button className="cp-button ghost" onClick={props.onServicesClick}>Explore the Service</button></div>
      </div></div>
    </section>
    <section className="cp-section"><div className="cp-container cp-overview">
      <div><span className="cp-eyebrow">OVERVIEW</span><h2>Know what to share,<br/><em>and why it matters.</em></h2><p>We turn your goals, audience interests and brand themes into an organised publishing plan. Your team gets a clear view of topics, formats, priorities and approvals before content goes live.</p></div>
      <aside className="cp-help"><CalendarDays/><div><h3>When this service helps</h3><ul><li><Check/>Planning consistent social content</li><li><Check/>Coordinating campaigns and seasonal moments</li><li><Check/>Bringing clarity to team approvals</li></ul></div></aside>
    </div><div className="cp-container cp-scope"><span className="cp-eyebrow">SCOPE</span><h2>What goes into your content plan.</h2><div className="cp-plan-grid">{planItems.map(([Icon,title,text])=><article key={title}><Icon/><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>
    <section className="cp-deliver"><img src={planImg} alt="Printed content calendar plan"/><div className="cp-container"><div className="cp-deliver-copy"><span className="cp-eyebrow">DELIVERABLES</span><h2>An organised plan<br/><em>your team can use.</em></h2><ul>{deliverables.map(x=><li key={x}><Check/>{x}</li>)}</ul><p>Calendar period, channels, content volume, creation and publishing support are agreed in scope.</p></div></div></section>
    <section className="cp-section cp-process"><div className="cp-container"><span className="cp-eyebrow">PROCESS</span><h2>From scattered ideas to a clear schedule.</h2><div className="cp-process-grid">{process.map(([Icon,title,text],i)=><React.Fragment key={title}><article><b>{i+1}</b><Icon/><h3>{title}</h3><p>{text}</p></article>{i<3&&<ArrowRight className="next"/>}</React.Fragment>)}</div></div></section>
    <section className="cp-section cp-faq"><div className="cp-container"><span className="cp-eyebrow">FAQ</span><h2>Your calendar questions, answered.</h2><div className="cp-faq-list">{faqs.map(([q,a],i)=><div className={openFaq===i?'open':''} key={q}><button onClick={()=>setOpenFaq(openFaq===i?-1:i)}><span><CalendarDays/>{q}</span><ChevronDown/></button>{openFaq===i&&<p>{a}</p>}</div>)}</div></div></section>
    <section className="cp-section cp-related"><div className="cp-container"><span className="cp-eyebrow">RELATED SERVICES</span><h2>Bring the plan to life.</h2><div className="cp-related-grid">{related.map(([img,title,text,target])=><article key={title}><img src={img} alt=""/><div><h3>{title}</h3><p>{text}</p><button onClick={()=>props.onRelatedClick?.(target)}>View Service <ArrowRight/></button></div></article>)}</div></div></section>
  </main>;
};
export default ContentPlanningPage;