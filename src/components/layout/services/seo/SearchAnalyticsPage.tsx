import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, FileText, Lightbulb, Monitor as MonitorIcon, PieChart, Search, Settings, Target, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Laptop, Magnifier, MiniBars, MiniLine, WaveCover } from '../template/ServiceArt';
import { SEO_PAGE_DEFAULTS } from './seoShared';
import './SearchAnalyticsPage.css';

const HeroVisual = (
  <div className="ss-stage sr-hero-stage">
    <Layer className="sr-l-laptop" depth={8} float={false}>
      <Laptop className="sr-laptop">
        <div className="sr-screen">
          <aside>
            <Brand light />
            {['Search Performance', 'Queries', 'Landing Pages', 'Content', 'Conversions', 'Reports'].map((t, i) => <span key={t} className={i === 0 ? 'on' : ''}>{t}</span>)}
          </aside>
          <div className="sr-main">
            <h5>Search Analytics &amp; Reporting</h5>
            <div className="sr-cards">
              <div className="sr-card"><small>Queries</small><span className="sr-chart"><MiniLine /></span></div>
              <div className="sr-card"><small>Landing Pages</small><span className="sr-chart"><MiniBars /></span></div>
              <div className="sr-card"><small>Organic Traffic</small><span className="sr-chart"><MiniLine color="#1aa6b7" /></span></div>
              <div className="sr-card"><small>Conversions</small><span className="sr-chart"><MiniBars values={[40, 55, 35, 70, 62, 80, 74, 95]} /></span></div>
            </div>
          </div>
        </div>
      </Laptop>
    </Layer>
    <Layer className="sr-l-mag" depth={22} float={false}><div className="sr-mag"><Magnifier /></div></Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage sr-deliver-stage">
    <Layer className="sr-l-sheet2" depth={0}><div className="sr-sheet back"><span className="sr-sheet-chart"><MiniLine area={false} /></span></div></Layer>
    <Layer className="sr-l-sheet" depth={0}>
      <div className="sr-sheet">
        <span className="sr-sheet-chart"><MiniLine /></span>
        <span className="sr-sheet-bars"><MiniBars /></span>
        <svg viewBox="0 0 42 42" className="sr-donut"><circle cx="21" cy="21" r="15.9" fill="none" stroke="#dbe7ee" strokeWidth="6" /><circle className="sr-donut-arc" cx="21" cy="21" r="15.9" fill="none" stroke="#1aa6b7" strokeWidth="6" pathLength={100} strokeDasharray="68 100" transform="rotate(-90 21 21)" /></svg>
      </div>
    </Layer>
    <Layer className="sr-l-book" depth={0}>
      <Book className="sr-book">
        <Brand />
        <h4>Search<br />Analytics &amp;<br />Reporting</h4>
        <span className="sa-book-rule" />
        <WaveCover />
        <p className="sr-book-foot">Clear insights<br />Practical recommendations<br />Stronger search growth</p>
      </Book>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'searchanalytics',
  ...SEO_PAGE_DEFAULTS,
  crumb: 'Search Analytics & Reporting',
  eyebrow: 'SEARCH ANALYTICS & REPORTING',
  title: ['Understand your search performance.', 'Plan your next move.'],
  intro: 'Turn search and website data into clear observations, useful reports and practical SEO priorities.',
  primaryCta: 'Discuss Your Reporting Needs',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE REVIEW', process: 'OUR REPORTING PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [BarChart3, 'Clear Search Insights', 'See what is working and where to focus.'],
    [PieChart, 'Useful Performance Context', 'Understand changes in context.'],
    [Lightbulb, 'Practical Next Steps', 'Turn observations into actions.'],
  ],
  highlightStyle: 'circle',
  highlightsTinted: false,
  overviewTitle: <>See what is changing.<br />Understand what to do next.</>,
  overviewText: 'We review your search visibility, website engagement and agreed business outcomes in context, so you can see what is happening and decide on the most useful next steps for your SEO.',
  helpIcon: Target,
  helps: ['Reviewing ongoing SEO activity', 'Understanding page and query trends', 'Prioritising your next improvements'],
  scopeIconStyle: 'circle',
  scope: [
    [Target, 'Goals & Measurement Alignment', 'Check your goals and key measures are aligned with your SEO activity.'],
    [Search, 'Search Query & Visibility Trends', 'Review query performance and changes in search visibility.'],
    [FileText, 'Organic Landing Page Analysis', 'Understand how your key landing pages are performing in search.'],
    [BarChart3, 'Engagement & Conversion Review', 'Look at user engagement and conversion activity in context.'],
    [MonitorIcon, 'Reports & Dashboard Summaries', 'Provide clear reports and dashboard overviews of key insights.'],
    [UsersRound, 'Recommendations & Review Sessions', 'Share practical recommendations and discuss next steps.'],
  ],
  deliverTitle: 'Clear reporting. Better-informed SEO decisions.',
  deliverables: ['Agreed measurement framework', 'Search performance summary', 'Query and landing page observations', 'Organic engagement insights', 'Prioritised recommendations', 'Reporting review and discussion notes'],
  deliverNote: 'Data sources, reporting period, access and conversion tracking scope are agreed for your website.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processStyle: 'cards',
  steps: [
    ['Align', 'Define goals and relevant measures.'],
    ['Gather', 'Review agreed search and website data.'],
    ['Analyse', 'Identify patterns and explain context.'],
    ['Recommend', 'Prioritise practical next actions.'],
  ],
  faqLayout: 'paired',
  faqStyle: 'plus-right',
  faqs: [
    ['What data sources can you report on?', 'We agree the available search and website analytics sources, then explain findings alongside access and data limitations.'],
    ['How often will we receive reports?', 'Reporting frequency is agreed in scope, typically monthly or quarterly, with a review session to discuss the findings.'],
    ['Does this include setting up conversion tracking?', 'We review existing tracking. Setting up or fixing conversion tracking can be added to the agreed scope.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { icon: Search, title: 'SEO Audit & Strategy', text: 'A complete review of your SEO and a clear plan for growth.', target: 'SEO Audit & Strategy' },
    { icon: Settings, title: 'Technical SEO', text: 'Improve your technical foundation for better search performance.', target: 'Technical SEO' },
    { icon: FileText, title: 'SEO Content & Topic Planning', text: 'Plan and create content that supports your search growth.', target: 'SEO Content & Topic Planning' },
  ],
  ctaIcon: BarChart3,
  ctaTitle: 'Give your next SEO decision a clearer direction.',
  ctaText: 'Talk to us about your search analytics and reporting needs.',
  ctaButton: 'Let’s Talk Search Reporting',
  ctaTone: 'blue',
  animate: () => {
    gsap.timeline({ repeat: -1, repeatDelay: 1.4, delay: 0.6 })
      .fromTo('.sa-mini-line', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2, stagger: 0.3, ease: 'power2.inOut' })
      .fromTo('.sa-mini-area', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=1')
      .to('.sa-mini-area', { opacity: 0, duration: 0.5 }, '+=2.4');
    gsap.fromTo('.sa-mini-bars i', { scaleY: 0.2 }, { scaleY: 1, duration: 1, stagger: { each: 0.06, repeat: -1, yoyo: true, repeatDelay: 1.6 }, ease: 'power3.inOut' });
    gsap.fromTo('.sr-donut-arc', { strokeDasharray: '0 100' }, { strokeDasharray: '68 100', duration: 2, repeat: -1, yoyo: true, repeatDelay: 1.5, ease: 'power2.inOut' });
    gsap.to('.sr-mag', { x: '-2em', y: '-1em', rotation: -6, duration: 2.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const SearchAnalyticsPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default SearchAnalyticsPage;
