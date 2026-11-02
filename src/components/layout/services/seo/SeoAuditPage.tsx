import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, Check, FileSearch, FileText, Lightbulb, ListChecks, Search, Settings, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Chip, Laptop, Magnifier, Sprig, WaveCover } from '../template/ServiceArt';
import { SEO_PAGE_DEFAULTS } from './seoShared';
import './SeoAuditPage.css';

const AUDIT_LINE = 'M0 46 C16 44 22 30 38 32 S60 40 74 26 S100 10 116 16 S140 6 160 4';

const HeroVisual = (
  <div className="ss-stage au-hero-stage">
    <Layer className="au-l-plant" depth={3} float={false}>
      <svg viewBox="0 0 80 120" className="au-plant"><Sprig x={40} y={86} s={1.3} /><Sprig x={42} y={86} s={1.1} flip /><Sprig x={38} y={86} s={0.9} /><path d="M22 84h36l-4 34H26Z" fill="#f4f6f6" /></svg>
    </Layer>
    <Layer className="au-l-laptop" depth={8} float={false}>
      <Laptop className="au-laptop">
        <div className="au-screen">
          <h5>Website Audit</h5>
          <div className="au-cols">
            <ul>
              {[[Settings, 'Technical Health'], [FileText, 'Content'], [Search, 'Keywords'], [UsersRound, 'Competitors'], [ListChecks, 'Recommendations']].map(([Icon, t]) => {
                const I = Icon as typeof Settings;
                return <li key={t as string}><span className="au-item-icon"><I /></span>{t as string}<span className="au-tick"><Check /></span></li>;
              })}
            </ul>
            <div className="au-right">
              <div className="au-card">
                <svg viewBox="0 0 160 50" preserveAspectRatio="none" className="au-chart">
                  <defs><linearGradient id="au-area" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5fb8f0" stopOpacity=".5" /><stop offset="1" stopColor="#5fb8f0" stopOpacity="0" /></linearGradient></defs>
                  <path d={`${AUDIT_LINE} L160 50 L0 50Z`} fill="url(#au-area)" className="au-area" />
                  <path d={AUDIT_LINE} pathLength={1} fill="none" stroke="#2f8fe0" strokeWidth="2" className="au-line" />
                </svg>
              </div>
              <div className="au-card">
                <small>Search Results Preview</small>
                {[92, 70, 82, 56].map((w, i) => <i key={i} className={`au-bar${i % 2 ? ' alt' : ''}`} style={{ width: `${w}%` }} />)}
              </div>
            </div>
          </div>
        </div>
      </Laptop>
    </Layer>
    <Layer className="au-l-mag" depth={22} float={false}><div className="au-mag"><Magnifier /></div></Layer>
  </div>
);

const chips = [[FileText, 'Audit Summary'], [BarChart3, 'Key Opportunities'], [FileText, 'Content Recommendations'], [Settings, 'Technical Fixes'], [ListChecks, 'Action Plan']] as const;

const DeliverVisual = (
  <div className="ss-deliver-stage au-deliver-stage">
    <Layer className="au-l-book" depth={0}>
      <Book className="au-book">
        <Brand />
        <h4>SEO Audit<br />&amp; Strategy</h4>
        <span className="sa-book-rule" />
        <WaveCover />
      </Book>
    </Layer>
    {chips.map(([Icon, t], i) => (
      <Layer key={t} className={`au-l-chip au-l-chip-${i}`} depth={0}><Chip icon={<Icon />} className="au-chip">{t}</Chip></Layer>
    ))}
  </div>
);

const data: ServiceTemplateData = {
  key: 'seo-audit',
  ...SEO_PAGE_DEFAULTS,
  crumb: 'SEO Audit & Strategy',
  eyebrow: 'SEO AUDIT & STRATEGY',
  title: ['Find the gaps. Build', 'your search growth plan.'],
  intro: 'Understand your website’s search performance and turn audit findings into clear, prioritised actions.',
  primaryCta: 'Discuss Your SEO Goals',
  heroVisual: HeroVisual,
  labels: { overview: '', scope: '', deliver: '', process: '', faq: '', related: '' },
  highlights: [
    [Settings, 'Technical Health', 'Identify and fix issues that hold your site back.'],
    [FileText, 'Content Opportunities', 'Uncover new topics and optimise existing content.'],
    [BarChart3, 'Clear Priorities', 'Turn findings into a focused, practical plan.'],
  ],
  highlightStyle: 'circle',
  overviewTitle: <>A clearer starting point<br />for search growth.</>,
  overviewText: 'An SEO audit gives you a clear view of how your website performs in search, what’s holding it back and where the biggest opportunities are. We turn complex data into straightforward recommendations, so you can prioritise the right actions and build a stronger foundation for growth.',
  helpIcon: Lightbulb,
  helps: ['Planning a new SEO programme', 'Investigating visibility issues', 'Prioritising website improvements'],
  scopeTitle: 'What we review',
  scopeIntro: 'We take a holistic look at your website, content and competitive landscape to identify the biggest opportunities.',
  scopeIconStyle: 'circle',
  scope: [
    [Settings, 'Technical SEO Review', 'Assess site structure, crawlability, indexation, page speed and technical best practices.'],
    [FileText, 'On-Page SEO Analysis', 'Review titles, meta data, headings, internal linking and on-page optimisation.'],
    [Search, 'Keyword & Search Intent Research', 'Identify relevant search terms and understand user intent across your key topics.'],
    [FileSearch, 'Content Gaps & Opportunities', 'Find new content ideas and areas to improve existing content.'],
    [UsersRound, 'Competitor Search Review', 'Analyse key competitors to uncover opportunities and inform your strategy.'],
    [BarChart3, 'SEO Roadmap & Priorities', 'Bring everything together into a clear, prioritised plan for growth.'],
  ],
  deliverTitle: <>From audit findings to<br />an actionable roadmap.</>,
  deliverIntro: 'You’ll receive a clear, practical set of deliverables that help you understand the findings and take the next steps with confidence.',
  deliverables: ['Website audit summary', 'Prioritised issue register', 'Keyword and intent opportunities', 'Content recommendations', 'Technical implementation guidance', 'Phased SEO action plan'],
  deliverNote: 'Audit depth, tools, access and implementation support are agreed for your website.',
  deliverVisual: DeliverVisual,
  deliverStyle: 'full',
  processTitle: 'How we build your strategy',
  processIntro: 'A structured, collaborative process from audit to actionable plan.',
  processStyle: 'cards',
  steps: [
    ['Discover', 'We learn about your business, website, goals and current search performance.'],
    ['Audit', 'We analyse your site, content, keywords and competitors to identify key findings.'],
    ['Prioritise', 'We assess the opportunities and issues, and agree what to focus on.'],
    ['Plan', 'We create a clear, prioritised roadmap with recommendations you can take forward.'],
  ],
  faqTitle: 'Frequently asked questions',
  faqStyle: 'plus-right',
  faqs: [
    ['What does the SEO audit cover?', 'We review agreed technical, on-page, content and search opportunity areas, then organise findings by priority.'],
    ['Will you implement the recommendations?', 'Implementation can be included in the agreed scope, or we can hand over clear guidance for your team or developers.'],
    ['Can you audit an existing website?', 'Yes. Most audits are for existing websites, and we can also review a site before or after a redesign.'],
  ],
  relatedTitle: 'Related services',
  relatedIntro: 'Explore more services within SEO & Search Growth.',
  relatedStyle: 'arrow',
  related: [
    { icon: Settings, title: 'Technical SEO', text: 'Fix technical issues and strengthen your site’s foundation for search growth.', target: 'Technical SEO' },
    { icon: FileText, title: 'On-Page SEO', text: 'Optimise your website’s content and structure for greater visibility.', target: 'On-Page SEO' },
    { icon: Search, title: 'Keyword Research', text: 'Find the right search opportunities to reach and engage your audience.', target: 'Keyword & Search Intent Research' },
  ],
  ctaTitle: 'Give your search growth a clear direction.',
  ctaText: 'Turn your audit findings into a focused plan and take the next step with confidence.',
  ctaButton: 'Let’s Talk SEO',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.timeline({ repeat: -1, defaults: { duration: 1.4, ease: 'sine.inOut' } })
      .to('.au-mag', { x: '-9em', y: '1em' })
      .to('.au-mag', { x: '-5em', y: '6em' })
      .to('.au-mag', { x: '-11em', y: '9em' })
      .to('.au-mag', { x: 0, y: 0 });
    gsap.timeline({ repeat: -1, repeatDelay: 1, delay: 0.6 })
      .fromTo('.au-line', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 2.2, ease: 'power2.inOut' })
      .fromTo('.au-area', { opacity: 0 }, { opacity: 1, duration: 0.8 }, '-=1')
      .fromTo('.au-tick', { scale: 0 }, { scale: 1, duration: 0.35, stagger: 0.3, ease: 'back.out(3)' }, 0.4)
      .to('.au-tick, .au-area', { opacity: 0, duration: 0.5 }, '+=2.2')
      .set('.au-tick, .au-area', { opacity: 1 });
    gsap.fromTo('.au-bar', { scaleX: 0.3, transformOrigin: '0% 50%' }, { scaleX: 1, duration: 1.2, stagger: 0.15, repeat: -1, yoyo: true, repeatDelay: 1.5, ease: 'power3.inOut' });
    gsap.to('.au-chip .sa-chip-icon', { scale: 1.15, duration: 0.5, stagger: { each: 0.35, repeat: -1, yoyo: true, repeatDelay: 1.4 }, ease: 'sine.inOut' });
    gsap.to('.au-book .sa-wave-a', { x: -6, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const SeoAuditPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default SeoAuditPage;
