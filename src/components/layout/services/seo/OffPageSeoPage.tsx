import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, FileText, Link, Newspaper, Search, Send, Settings, Target, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Laptop, Lines, MountainScene, ThumbBuilding } from '../template/ServiceArt';
import { SEO_PAGE_DEFAULTS } from './seoShared';
import './OffPageSeoPage.css';

const StoryCard: React.FC<{ title: string; img: React.ReactNode; className?: string }> = ({ title, img, className = '' }) => (
  <div className={`of-card ${className}`}><h5>{title}</h5><div className="of-card-body"><span className="of-card-img">{img}</span><Lines n={4} /></div></div>
);

const HeroVisual = (
  <div className="ss-stage of-hero-stage">
    <Layer className="of-l-path" depth={4} float={false}>
      <svg viewBox="0 0 360 250" className="of-path"><path d="M40 150 C80 40 200 10 290 40 S350 180 330 220" /></svg>
    </Layer>
    <Layer className="of-l-laptop" depth={8} float={false}>
      <Laptop className="of-laptop">
        <div className="of-article">
          <div className="of-article-main"><Lines n={2} /><span className="of-article-img"><MountainScene /></span><Lines n={4} /></div>
          <div className="of-article-side"><Lines n={5} /><span className="of-article-img sm"><MountainScene variant={1} /></span></div>
        </div>
      </Laptop>
    </Layer>
    <Layer className="of-l-story" depth={18}><StoryCard title="Brand Story" img={<MountainScene />} /></Layer>
    <Layer className="of-l-media" depth={22}><StoryCard title="Media Outreach" img={<ThumbBuilding />} /></Layer>
    <Layer className="of-l-mentions" depth={26}><StoryCard title="Relevant Mentions" img={<MountainScene variant={1} />} /></Layer>
    {[[Newspaper, 'b1'], [FileText, 'b2'], [Link, 'b3'], [UsersRound, 'b4']].map(([I, c]) => {
      const Icon = I as typeof Link;
      return <Layer key={c as string} className={`of-l-badge of-${c as string}`} depth={30}><span className="of-badge"><Icon /></span></Layer>;
    })}
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage of-deliver-stage">
    <Layer className="of-l-spread" depth={0}>
      <div className="of-spread">
        <div className="of-page">
          <h5>Editorial Pitch</h5>
          <span className="of-page-img"><MountainScene /></span>
          <Lines n={5} />
        </div>
        <div className="of-page">
          <h5>Outreach Activity</h5>
          {[0, 1, 2].map((i) => <div className="of-activity" key={i}><i /><Lines n={1} /></div>)}
          <h5 className="mt">Coverage Report</h5>
          <div className="of-cov"><span className="of-page-img sm"><MountainScene variant={1} /></span><Lines n={3} /></div>
        </div>
      </div>
    </Layer>
    <Layer className="of-l-book" depth={0}>
      <Book className="of-book">
        <Brand />
        <h4>Off-Page SEO<br />&amp; Digital PR</h4>
        <p>Outreach Plan &amp; Report</p>
        <div className="of-book-img"><MountainScene /></div>
      </Book>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'offpage',
  ...SEO_PAGE_DEFAULTS,
  crumb: 'Off-Page SEO & Digital PR',
  eyebrow: 'OFF-PAGE SEO & DIGITAL PR',
  title: ['Build meaningful connections.', 'Earn relevant visibility.'],
  intro: 'Develop outreach ideas, share useful stories and pursue relevant brand mentions and editorial opportunities.',
  primaryCta: 'Discuss Your Outreach Goals',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE WORK ON', process: 'OUR OUTREACH PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [UsersRound, 'Relevant Relationships', 'Build genuine connections with relevant industry audiences.'],
    [FileText, 'Useful Brand Stories', 'Share valuable ideas, research and perspectives.'],
    [Target, 'Earned Opportunities', 'Pursue relevant editorial coverage and brand mentions.'],
  ],
  highlightStyle: 'plain',
  highlightsCard: true,
  overviewTitle: <>Give people a reason to<br />talk about your brand.</>,
  overviewText: 'We help you develop useful content, reach out to relevant audiences and earn contextual brand visibility through digital PR and off-page activity.',
  helps: ['Introducing a new brand story', 'Promoting useful research or resources', 'Building relevant industry relationships'],
  scopeIconStyle: 'plain',
  scope: [
    [Search, 'Off-Page Presence Review', 'Assess your existing off-page visibility, brand mentions and relevant opportunities.'],
    [FileText, 'Digital PR Story Development', 'Help shape useful stories, angles and assets for outreach.'],
    [UsersRound, 'Relevant Prospect Research', 'Identify and prioritise relevant publications, creators and industry audiences.'],
    [Send, 'Outreach Planning & Coordination', 'Plan and manage tailored outreach to relevant prospects.'],
    [Link, 'Link & Mention Opportunity Review', 'Evaluate potential link and mention opportunities for relevance and fit.'],
    [BarChart3, 'Coverage Tracking & Reporting', 'Track outreach activity and report on responses and earned coverage.'],
  ],
  deliverTitle: <>A focused outreach plan.<br />Clear activity reporting.</>,
  deliverColumns: 2,
  deliverables: ['Existing presence review', 'Campaign story angles', 'Relevant prospect shortlist', 'Outreach messaging framework', 'Agreed outreach activity log', 'Coverage and mention summary'],
  deliverNote: 'Outreach scope is agreed in advance. Publication, editorial coverage and links remain at each publisher’s discretion.',
  deliverVisual: DeliverVisual,
  processStyle: 'cards',
  stepIcons: [Search, FileText, Send, BarChart3],
  steps: [
    ['Discover', 'Understand your brand and priorities.'],
    ['Develop', 'Shape useful stories and outreach assets.'],
    ['Connect', 'Contact relevant prospects with tailored pitches.'],
    ['Review', 'Track responses and earned opportunities.'],
  ],
  faqStyle: 'chevron-left',
  faqs: [
    ['Can you guarantee media coverage or backlinks?', 'We cannot guarantee placements. We focus on relevant opportunities, useful stories and transparent outreach reporting.'],
    ['Does this include creating campaign content?', 'We help shape story angles and outreach assets. Larger content pieces, such as research reports, can be added to the agreed scope.'],
    ['Can you review our existing backlinks?', 'Yes. The off-page presence review looks at your current links and mentions to find gaps and opportunities.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { icon: FileText, title: 'SEO Content & Topic Planning', text: 'Plan and create content that supports your search growth.', target: 'SEO Content & Topic Planning' },
    { icon: BarChart3, title: 'SEO Audit & Strategy', text: 'Identify opportunities and build a clear plan for growth.', target: 'SEO Audit & Strategy' },
    { icon: Settings, title: 'On-Page SEO', text: 'Optimise your website to improve relevance and performance.', target: 'On-Page SEO' },
  ],
  ctaTitle: 'Start with a story worth sharing.',
  ctaText: 'Let’s discuss how digital PR can support your wider search growth.',
  ctaButton: 'Let’s Talk Digital PR',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.to('.of-path path', { strokeDashoffset: -24, duration: 1.6, ease: 'none', repeat: -1 });
    gsap.to('.of-badge', { boxShadow: '0 0 1.8em .4em #3fd0e0aa', scale: 1.08, duration: 0.8, stagger: { each: 0.5, repeat: -1, yoyo: true }, ease: 'sine.inOut' });
    gsap.to('.of-activity i', { scale: 1.3, backgroundColor: '#0aa5a3', duration: 0.4, stagger: { each: 0.5, repeat: -1, yoyo: true, repeatDelay: 1 } });
  },
};

export const OffPageSeoPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default OffPageSeoPage;
