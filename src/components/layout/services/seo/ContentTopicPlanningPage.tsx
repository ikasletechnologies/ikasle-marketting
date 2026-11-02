import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, CalendarDays, FileText, KeyRound, LayoutGrid, Layers, Link, Rocket, Search, Send, Settings, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Chip, Lines, Sprig } from '../template/ServiceArt';
import { SEO_PAGE_DEFAULTS } from './seoShared';
import './ContentTopicPlanningPage.css';

const columns = [['Topic', 'ct-c1'], ['Brief', 'ct-c2'], ['Review', 'ct-c3'], ['Publish', 'ct-c4']] as const;

const HeroVisual = (
  <div className="ss-stage ct-hero-stage">
    <Layer className="ct-l-plant" depth={3} float={false}>
      <svg viewBox="0 0 80 110" className="ct-plant"><Sprig x={40} y={78} s={1.2} /><Sprig x={42} y={78} s={1} flip /><path d="M24 76h32l-4 32H28Z" fill="#f2f4f4" /></svg>
    </Layer>
    <Layer className="ct-l-books" depth={8} float={false}><div className="ct-books"><span>Content Strategy</span><span>SEO</span></div></Layer>
    <Layer className="ct-l-notes" depth={10} float={false}>
      <div className="ct-notes">{['Ideas', '→ Topics', '→ Outlines', '→ Publish'].map((t) => <span key={t}>{t}</span>)}</div>
    </Layer>
    <Layer className="ct-l-tablet" depth={12} float={false}>
      <div className="ct-tablet">
        <div className="ct-screen">
          <aside><LayoutGrid /><CalendarDays /><FileText /><Settings /></aside>
          <div className="ct-board">
            <h5>Content Plan</h5>
            <div className="ct-cols">
              {columns.map(([t, c]) => (
                <div key={t} className="ct-col">
                  <span className={`ct-col-head ${c}`}>{t}</span>
                  {[0, 1, 2].map((n) => <i key={n} className={`ct-card ${c}`}><b /><Lines n={2} /></i>)}
                </div>
              ))}
            </div>
            <i className="ct-mover"><b /><Lines n={2} /></i>
          </div>
        </div>
      </div>
    </Layer>
    <Layer className="ct-l-f1" depth={20}><Chip icon={<FileText />} className="ct-float-card">Pillar Content<small>Core topics that build authority</small></Chip></Layer>
    <Layer className="ct-l-f2" depth={24}><Chip icon={<Layers />} className="ct-float-card teal">Supporting Articles<small>Related content that deepens coverage</small></Chip></Layer>
    <Layer className="ct-l-f3" depth={26}><Chip icon={<UsersRound />} className="ct-float-card blue">Audience Questions<small>Real questions from your audience</small></Chip></Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage ct-deliver-stage">
    <Layer className="ct-l-cal" depth={0}>
      <div className="ct-cal">
        <span className="ct-rings" />
        <h5>Editorial Calendar</h5>
        <div className="ct-cal-grid">{Array.from({ length: 28 }, (_, i) => <i key={i} className={[3, 8, 12, 17, 22].includes(i) ? 'on' : ''} />)}</div>
      </div>
    </Layer>
    <Layer className="ct-l-book" depth={0}>
      <Book tone="navy" className="ct-book">
        <Brand light />
        <h4>SEO Content<br />&amp; Topic Plan</h4>
        <p>A practical roadmap<br />for sustainable search growth</p>
      </Book>
    </Layer>
    {[[FileText, 'Pillar Content', 'Core topic', 'blue'], [Layers, 'Supporting Article', 'Related topic', 'teal'], [UsersRound, 'Audience Question', 'Answer a key question', 'violet']].map(([I, t, s, tone], i) => {
      const Icon = I as typeof FileText;
      return <Layer key={t as string} className={`ct-l-tag ct-l-tag-${i}`} depth={0}><Chip icon={<Icon />} className={`ct-tag ${tone as string}`}>{t as string}<small>{s as string}</small></Chip></Layer>;
    })}
  </div>
);

const data: ServiceTemplateData = {
  key: 'content',
  ...SEO_PAGE_DEFAULTS,
  crumb: 'SEO Content & Topic Planning',
  eyebrow: 'SEO CONTENT & TOPIC PLANNING',
  title: ['Plan purposeful content.', 'Answer the right questions.'],
  intro: 'Connect audience needs, search intent and business priorities with a practical content roadmap.',
  primaryCta: 'Plan Your Content',
  heroVisual: HeroVisual,
  labels: { scope: '', deliver: 'Our deliverables', process: '', faq: '', related: '' },
  highlights: [
    [UsersRound, 'Audience-Led Topics', 'Focus on the questions and topics your audience actually cares about.'],
    [Link, 'Connected Content', 'Build a structured plan that links topics, intent and business goals.'],
    [BarChart3, 'Clear Priorities', 'Know what to create, update and publish for the biggest impact.'],
  ],
  highlightStyle: 'circle',
  overviewTitle: <>A clear direction for<br />every piece of content.</>,
  overviewText: 'We create a practical content and topic plan that aligns your audience needs, search intent and business priorities so you can publish with confidence and consistency.',
  helps: [],
  helpItems: [
    [Rocket, 'Launching a blog or resource hub', 'Get a strong foundation with the right topics.'],
    [FileText, 'Refreshing existing website content', 'Find new opportunities and close content gaps.'],
    [CalendarDays, 'Planning a consistent publishing schedule', 'Build a sustainable plan that supports your goals.'],
  ],
  scopeTitle: 'What we plan',
  scopeIntro: 'A complete, structured approach to content planning and topic development.',
  scopeIconStyle: 'plain',
  scope: [
    [UsersRound, 'Audience & Intent Review', 'Understand your audience, their questions and search intent across the customer journey.'],
    [Search, 'Content Audit & Gap Analysis', 'Review existing content to identify what to keep, improve and new opportunities.'],
    [Layers, 'Topic Clusters & Pillar Planning', 'Build a structured topic framework with pillar content and supporting articles.'],
    [KeyRound, 'Keyword-to-Content Mapping', 'Map relevant keywords and search intent to the right content topics.'],
    [FileText, 'Content Briefs & Outlines', 'Create clear briefs and outlines to guide consistent, high-quality content.'],
    [CalendarDays, 'Editorial Calendar & Priorities', 'Plan a realistic publishing schedule with clear priorities and next steps.'],
  ],
  deliverTitle: 'A content roadmap your team can use.',
  deliverIntro: 'A clear, actionable plan with everything you need to move from idea to execution.',
  deliverColumns: 2,
  deliverables: ['Prioritised topic opportunities', 'Topic cluster structure', 'Content format recommendations', 'Keyword and intent mapping', 'Agreed briefs and outlines', 'Editorial publishing roadmap'],
  deliverNote: 'Scope note: research scope, brief count, writing and publishing responsibilities are agreed for your project.',
  deliverVisual: DeliverVisual,
  processTitle: 'Our process',
  processIntro: 'A collaborative and transparent process from research to a ready-to-use plan.',
  processStyle: 'cards',
  steps: [
    ['Discover', 'Learn about your business, audience and goals.'],
    ['Research', 'Analyse your audience, existing content and keyword opportunities.'],
    ['Structure', 'Build topic clusters, map intent and create content briefs.'],
    ['Plan', 'Deliver a clear editorial roadmap with priorities and next steps.'],
  ],
  faqTitle: 'Frequently asked questions',
  faqLayout: 'split',
  faqStyle: 'plus-right',
  faqs: [
    ['Does this include writing the content?', 'Planning is the core service. Writing and editing can be included when agreed in your project scope.'],
    ['Can you work with our existing content?', 'Yes. We audit what you already have and decide what to keep, improve, combine or retire.'],
    ['How are topics prioritised?', 'We weigh audience demand, search intent, business value and the effort needed, then agree the order with you.'],
  ],
  relatedTitle: 'Related services',
  relatedStyle: 'arrow',
  related: [
    { icon: Search, title: 'Keyword & Search Intent Research', text: 'Understand what your audience is searching for.', target: 'Keyword & Search Intent Research' },
    { icon: FileText, title: 'On-Page SEO', text: 'Optimise your content for greater visibility.', target: 'On-Page SEO' },
    { icon: BarChart3, title: 'SEO Audit & Strategy', text: 'Find opportunities and build a clear plan.', target: 'SEO Audit & Strategy' },
  ],
  ctaIcon: Send,
  ctaTitle: 'Give your next content idea a clear direction.',
  ctaText: 'Turn audience insights into a practical content plan that drives search growth.',
  ctaButton: 'Let’s Talk Content',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.timeline({ repeat: -1, repeatDelay: 0.8, defaults: { duration: 0.9, ease: 'power2.inOut' } })
      .fromTo('.ct-mover', { x: 0, opacity: 0 }, { opacity: 1, duration: 0.3 })
      .to('.ct-mover', { x: '4.6em' }, '+=0.5')
      .to('.ct-mover', { x: '9.2em' }, '+=0.5')
      .to('.ct-mover', { x: '13.8em' }, '+=0.5')
      .to('.ct-mover', { opacity: 0, duration: 0.3 }, '+=0.6');
    gsap.to('.ct-card b', { opacity: 0.4, duration: 0.6, stagger: { each: 0.2, from: 'random', repeat: -1, yoyo: true } });
    gsap.to('.ct-cal-grid .on', { scale: 1.25, duration: 0.5, stagger: { each: 0.3, repeat: -1, yoyo: true, repeatDelay: 1.2 } });
    gsap.to('.ct-plant .sa-sprig', { rotation: 4, svgOrigin: '40 78', duration: 2.6, stagger: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const ContentTopicPlanningPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default ContentTopicPlanningPage;
