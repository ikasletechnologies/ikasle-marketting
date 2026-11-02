import React from 'react';
import { gsap } from 'gsap';
import { AppWindow, BarChart3, CircleCheck, FileText, Network, Search, Settings, Target, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Chip, Monitor, Mug, Sprig, WaveCover } from '../template/ServiceArt';
import { SEO_PAGE_DEFAULTS } from './seoShared';
import './KeywordResearchPage.css';

const results = [
  ['website design', 'Informational', 'info'],
  ['digital marketing services', 'Commercial', 'comm'],
  ['seo for small business', 'Navigational', 'nav'],
  ['hire marketing agency', 'Transactional', 'trans'],
] as const;

const HeroVisual = (
  <div className="ss-stage kw-hero-stage">
    <Layer className="kw-l-monitor" depth={8} float={false}>
      <Monitor className="kw-monitor">
        <div className="kw-screen">
          <div className="kw-search"><Search /><span className="kw-typed">keyword research</span><i className="kw-caret" /><b><Search /></b></div>
          {results.map(([q, tag, cls]) => (
            <div className="kw-row" key={q}><Search /><span>{q}</span><em className={`kw-tag kw-${cls}`}>{tag}</em></div>
          ))}
        </div>
      </Monitor>
    </Layer>
    <Layer className="kw-l-links" depth={12} float={false}>
      <svg viewBox="0 0 60 160" className="kw-links" preserveAspectRatio="none">
        {[18, 58, 98, 138].map((y, i) => <path key={y} className="kw-link" d={`M0 ${50 + i * 20} C30 ${50 + i * 20} 26 ${y} 60 ${y}`} />)}
      </svg>
    </Layer>
    {results.map(([, tag, cls], i) => (
      <Layer key={tag} className={`kw-l-pill kw-l-pill-${i}`} depth={18 + i * 2}><span className={`kw-pill kw-${cls}`}>{tag}</span></Layer>
    ))}
    <Layer className="kw-l-books" depth={14} float={false}>
      <div className="kw-books"><span>Keywords</span><span>Search Intent</span><span>Content Strategy</span></div>
    </Layer>
    <Layer className="kw-l-mug" depth={16} float={false}><div className="kw-mug"><Mug pens /></div></Layer>
  </div>
);

const chips = [[Network, 'Core Topics and Clusters'], [FileText, 'Search Intent Mapping'], [BarChart3, 'Content Gaps and Opportunities'], [CircleCheck, 'Recommended Next Steps']] as const;

const DeliverVisual = (
  <div className="ss-deliver-stage kw-deliver-stage">
    <Layer className="kw-l-sprig" depth={0}>
      <svg viewBox="0 0 120 90" className="kw-sprig"><Sprig x={70} y={90} s={1.3} /><Sprig x={72} y={90} s={1.1} flip /><Sprig x={68} y={90} s={0.9} /></svg>
    </Layer>
    <Layer className="kw-l-book" depth={0}>
      <Book className="kw-book">
        <Brand />
        <h4>Keyword &amp;<br />Intent Research</h4>
        <p>From search insights<br />to a clearer content plan.</p>
        <WaveCover />
      </Book>
    </Layer>
    {chips.map(([Icon, t], i) => (
      <Layer key={t} className={`kw-l-chip kw-l-chip-${i}`} depth={0}><Chip icon={<Icon />} className="kw-chip">{t}</Chip></Layer>
    ))}
  </div>
);

const data: ServiceTemplateData = {
  key: 'keyword',
  ...SEO_PAGE_DEFAULTS,
  crumb: 'Keyword Research',
  eyebrow: 'KEYWORD & SEARCH INTENT RESEARCH',
  title: ['Understand the search.', 'Reach the right audience.'],
  intro: 'Discover relevant keywords, understand what people need, and map search intent to useful website content.',
  primaryCta: 'Discuss Your Search Goals',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE RESEARCH', process: 'OUR PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [Search, 'Relevant Search Topics', 'Find the topics your audience is searching for.'],
    [FileText, 'Clear Intent Mapping', 'Understand what people want to achieve.'],
    [Target, 'Focused Content Direction', 'Turn insights into a clear content plan.'],
  ],
  highlightStyle: 'plain',
  overviewTitle: <>Build your content around<br />what people are looking for.</>,
  overviewText: 'Keyword and search intent research helps you understand what your audience is searching for, how they want to find information, and what type of content will best meet their needs. It gives you a clear foundation to organise your website topics and match each page to the right audience intent.',
  helps: ['Planning new website content', 'Refining service or product pages', 'Finding gaps in existing content'],
  scopeIconStyle: 'top',
  scope: [
    [UsersRound, 'Business & Audience Discovery', 'We learn about your business, audience and goals to find relevant search topics.'],
    [Search, 'Keyword Opportunity Research', 'We identify relevant keyword opportunities based on your audience and market.'],
    [FileText, 'Search Intent Analysis', 'We analyse the intent behind searches to understand what users want to achieve.'],
    [AppWindow, 'Search Results Review', 'We review top ranking content to understand what works well and identify opportunities.'],
    [Network, 'Topic Clusters & Page Mapping', 'We group related keywords into topic clusters and map them to your website structure.'],
    [BarChart3, 'Priorities & Content Direction', 'We highlight the most valuable opportunities and provide clear direction for your content plan.'],
  ],
  deliverTitle: <>A practical keyword plan<br />for your website.</>,
  deliverables: ['Relevant keyword opportunities', 'Intent classification', 'Topic cluster structure', 'Keyword-to-page mapping', 'Content gap recommendations', 'Prioritised next steps'],
  deliverNote: 'Research scope, markets, languages and data sources are agreed for your project.',
  deliverVisual: DeliverVisual,
  processTitle: 'From search questions to content direction.',
  processStyle: 'badge',
  steps: [
    ['Discover', 'We learn about your business, audience, goals and existing content.'],
    ['Research', 'We find relevant keyword opportunities and analyse the search landscape.'],
    ['Map', 'We group keywords, analyse intent and map them to your website structure.'],
    ['Prioritise', 'We recommend the most valuable opportunities and clear next steps.'],
  ],
  faqTitle: <>Your questions,<br />answered.</>,
  faqLayout: 'split',
  faqStyle: 'chevron',
  faqs: [
    ['What is search intent?', 'Search intent is the purpose behind a query, such as learning about a topic, comparing options or finding a product or service.'],
    ['Can you research keywords for an existing website?', 'Yes. We review the pages you already have and what they rank for, then map new opportunities around them.'],
    ['Does this include writing the content?', 'Content writing isn’t included by default, but it can be added to the agreed scope.'],
  ],
  relatedTitle: 'Explore more SEO & Search Growth services.',
  relatedStyle: 'arrow',
  related: [
    { icon: Search, title: 'SEO Audit & Strategy', text: 'Find opportunities and create a clear plan to improve your search visibility.', target: 'SEO Audit & Strategy' },
    { icon: Settings, title: 'On-Page SEO', text: 'Optimise your website pages to better match search intent and improve relevance.', target: 'On-Page SEO' },
    { icon: FileText, title: 'SEO Content Strategy', text: 'Plan and create useful, search-focused content that supports your business goals.', target: 'SEO Content & Topic Planning' },
  ],
  ctaTitle: 'Turn relevant searches into a clearer content plan.',
  ctaButton: 'Let’s Talk SEO',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.timeline({ repeat: -1, repeatDelay: 1.2 })
      .fromTo('.kw-typed', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'steps(16)' })
      .fromTo('.kw-row', { opacity: 0, x: -10 }, { opacity: 1, x: 0, duration: 0.4, stagger: 0.25, ease: 'power2.out' })
      .fromTo('.kw-tag', { scale: 0 }, { scale: 1, duration: 0.35, stagger: 0.25, ease: 'back.out(3)' }, '<0.15')
      .fromTo('.kw-pill', { scale: 1, filter: 'brightness(1)' }, { scale: 1.08, filter: 'brightness(1.15)', duration: 0.3, stagger: 0.3, yoyo: true, repeat: 1 }, '<')
      .to('.kw-row', { opacity: 0, duration: 0.4 }, '+=2.4')
      .set('.kw-typed', { clipPath: 'inset(0 100% 0 0)' });
    gsap.to('.kw-caret', { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: 'steps(1)' });
    gsap.to('.kw-link', { strokeDashoffset: -20, duration: 1.4, ease: 'none', repeat: -1 });
    gsap.to('.kw-chip .sa-chip-icon', { scale: 1.15, duration: 0.5, stagger: { each: 0.35, repeat: -1, yoyo: true, repeatDelay: 1.2 }, ease: 'sine.inOut' });
    gsap.to('.kw-book .sa-wave-a', { x: -6, duration: 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.kw-sprig .sa-sprig', { rotation: 4, svgOrigin: '70 90', duration: 2.6, stagger: 0.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  },
};

export const KeywordResearchPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default KeywordResearchPage;
