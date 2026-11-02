import React from 'react';
import { gsap } from 'gsap';
import { CircleCheck, FileText, Heading, ImageIcon, Link, Search, Settings, Sun, Target, UsersRound } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Chip, Lines, Magnifier, Monitor, Mug } from '../template/ServiceArt';
import { SEO_PAGE_DEFAULTS } from './seoShared';
import './OnPageSeoPage.css';

const Cursor: React.FC = () => (
  <svg viewBox="0 0 24 30" className="sa-fill"><path d="M2 2 L2 24 L8 18 L12 28 L16 26 L12 16 L20 16Z" fill="#0b2b4c" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" /></svg>
);

const HeroVisual = (
  <div className="ss-stage op-hero-stage">
    <Layer className="op-l-monitor" depth={8} float={false}>
      <Monitor className="op-monitor">
        <div className="op-screen">
          <div className="op-browser"><i /><i /><i /><span /></div>
          <div className="op-page">
            <h5>Your Website Page</h5>
            <span className="op-line w90" /><span className="op-line w70" />
            <div className="op-hero-img">
              <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="sa-fill"><rect width="100" height="50" fill="#bfe3f0" /><circle cx="72" cy="14" r="6" fill="#fff" opacity=".8" /><path d="M0 50 L28 22 L46 38 L62 26 L100 50Z" fill="#3d9ec4" /></svg>
            </div>
            <span className="op-line w80" /><span className="op-line w60" /><span className="op-line w75" />
          </div>
          <span className="op-mag"><Magnifier /></span>
          <span className="op-cursor"><Cursor /></span>
        </div>
      </Monitor>
    </Layer>
    <Layer className="op-l-c1" depth={18}><Chip icon={<FileText />} className="op-chip">Title &amp; Meta<Lines n={2} /></Chip></Layer>
    <Layer className="op-l-c2" depth={24}><Chip icon={<Heading />} className="op-chip">Heading Structure<Lines n={2} /></Chip></Layer>
    <Layer className="op-l-c3" depth={22}><Chip icon={<FileText />} className="op-chip">Content Relevance<Lines n={2} /></Chip></Layer>
    <Layer className="op-l-c4" depth={26}><Chip icon={<Link />} className="op-chip">Internal Links<Lines n={2} /></Chip></Layer>
    <Layer className="op-l-mug" depth={14} float={false}><div className="op-mug"><Mug /></div></Layer>
  </div>
);

const recs = [[FileText, 'Update title & meta description'], [Heading, 'Improve heading structure'], [Link, 'Strengthen internal links'], [FileText, 'Enhance content relevance']] as const;

const DeliverVisual = (
  <div className="ss-deliver-stage op-deliver-stage">
    <Layer className="op-l-sheet" depth={0}>
      <div className="op-sheet">
        <h5>Page Recommendations</h5>
        {recs.map(([Icon, t]) => <div className="op-rec" key={t}><Icon /><span>{t}</span></div>)}
      </div>
    </Layer>
    <Layer className="op-l-book" depth={0}>
      <Book tone="navy" className="op-book">
        <Brand light />
        <h4>On-Page SEO<br />Report</h4>
        <span className="sa-book-rule" />
      </Book>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'onpage',
  ...SEO_PAGE_DEFAULTS,
  crumb: 'On-Page SEO',
  eyebrow: 'ON-PAGE SEO',
  title: ['Make every page clearer.', 'More relevant. Easier to find.'],
  intro: 'Align your page content, headings and key elements with audience needs and relevant search intent.',
  primaryCta: 'Discuss Your Website',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE OPTIMISE', process: 'OUR PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [FileText, 'Clear Page Structure', 'Well structured pages are easier to understand and navigate.'],
    [UsersRound, 'Relevant Content', 'Content that matches what your audience is looking for.'],
    [Link, 'Connected User Journeys', 'Stronger internal links help people discover more of your content.'],
  ],
  highlightStyle: 'plain',
  highlightsTinted: true,
  overviewTitle: <>Help people and search<br />engines understand your pages.</>,
  overviewText: 'On-page SEO makes your content, structure and page elements clearer for both your audience and search engines, so the right pages can be found more easily and perform better over time.',
  helpIcon: Sun,
  helps: ['Optimising service or product pages', 'Refreshing existing website content', 'Matching pages to search intent'],
  scopeTitle: 'Key on-page elements for stronger, clearer pages.',
  scopeIconStyle: 'plain',
  scope: [
    [FileText, 'Page Titles & Meta Descriptions', 'Clear, compelling titles and meta descriptions that match search intent and encourage clicks.'],
    [Heading, 'Headings & Content Structure', 'A logical structure with clear headings that make your content easier to read and understand.'],
    [Target, 'Search Intent & Content Relevance', 'Content aligned with what your audience is searching for and the purpose of each page.'],
    [Link, 'Internal Linking', 'Relevant internal links to help users explore more content and strengthen your site structure.'],
    [ImageIcon, 'Image Alt Text & Context', 'Descriptive alt text and surrounding context to help search engines understand your images.'],
    [Settings, 'URL & Page Element Review', 'A review of URLs and key on-page elements to ensure they are clear, consistent and optimised.'],
  ],
  deliverTitle: 'Focused improvements for your key pages.',
  deliverColumns: 2,
  deliverables: ['Page-level optimisation plan', 'Title and meta recommendations', 'Heading structure refinements', 'Content improvement guidance', 'Internal link recommendations', 'Implementation and review notes'],
  deliverNote: 'Page count, content changes and implementation responsibilities are agreed for your project.',
  deliverVisual: DeliverVisual,
  processTitle: 'Our on-page SEO process.',
  processStyle: 'badge',
  stepIcons: [Search, FileText, Settings, CircleCheck],
  steps: [
    ['Review', 'Understand your pages and priorities.'],
    ['Align', 'Match each page to its purpose and search intent.'],
    ['Optimise', 'Refine agreed content and page elements.'],
    ['Check', 'Review updates and document next steps.'],
  ],
  faqTitle: 'Your questions, answered.',
  faqLayout: 'split',
  faqStyle: 'plus-right',
  faqs: [
    ['Does this include rewriting all website content?', 'We agree whether your project needs targeted edits, content recommendations or full page rewrites.'],
    ['Can you optimise an existing website?', 'Yes. Most on-page work improves pages you already have, starting with the ones that matter most.'],
    ['How do you choose which pages to work on?', 'We prioritise pages by business value, current visibility and search opportunity, and agree the list with you.'],
  ],
  relatedTitle: 'Explore more ways to grow your search presence.',
  relatedStyle: 'arrow',
  related: [
    { icon: Search, title: 'Keyword & Search Intent Research', text: 'Understand what your audience is searching for and find the right opportunities.', target: 'Keyword & Search Intent Research' },
    { icon: Settings, title: 'Technical SEO', text: 'Build a stronger technical foundation for better visibility.', target: 'Technical SEO' },
    { icon: Target, title: 'SEO Audit & Strategy', text: 'Get a clear plan to improve and grow your search performance.', target: 'SEO Audit & Strategy' },
  ],
  ctaTitle: 'Give your key pages a clearer purpose.',
  ctaText: 'Let’s discuss how on-page SEO can help your website perform better.',
  ctaButton: 'Let’s Talk SEO',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.timeline({ repeat: -1, defaults: { duration: 1.3, ease: 'sine.inOut' } })
      .to('.op-mag', { x: '-6em', y: '-1.5em' })
      .to('.op-mag', { x: '-3em', y: '3em' })
      .to('.op-mag', { x: 0, y: 0 });
    gsap.timeline({ repeat: -1, repeatDelay: 0.6 })
      .to('.op-cursor', { x: '-2.5em', y: '-1.5em', duration: 1.1, ease: 'power2.inOut' })
      .to('.op-cursor', { scale: 0.8, duration: 0.12, yoyo: true, repeat: 1 })
      .to('.op-cursor', { x: 0, y: 0, duration: 1.1, ease: 'power2.inOut' }, '+=0.6');
    gsap.to('.op-line', { backgroundColor: '#7fd3e6', duration: 0.5, stagger: { each: 0.35, repeat: -1, yoyo: true, repeatDelay: 1.6 } });
    gsap.to('.op-rec svg', { scale: 1.2, duration: 0.5, stagger: { each: 0.4, repeat: -1, yoyo: true, repeatDelay: 1.2 }, ease: 'sine.inOut' });
  },
};

export const OnPageSeoPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default OnPageSeoPage;
