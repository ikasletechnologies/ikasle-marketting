import React from 'react';
import { gsap } from 'gsap';
import { AppWindow, BarChart3, Check, Code, FileText, Gauge, Layers, Link, Network, Search, Settings, Target } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Laptop, ServerRack } from '../template/ServiceArt';
import { SEO_PAGE_DEFAULTS } from './seoShared';
import './TechnicalSeoPage.css';

const health = [
  [FileText, 'Crawlability', 'Search engines can access your content'],
  [Layers, 'Indexing', 'Important pages can be indexed'],
  [Network, 'Site Structure', 'A clear, logical structure'],
  [Gauge, 'Performance', 'Fast and reliable experience'],
] as const;

const Gear: React.FC = () => (
  <svg viewBox="0 0 100 100" className="sa-fill ts-gear">
    <defs><linearGradient id="ts-gear" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3fe0d0" /><stop offset="1" stopColor="#0a8f9c" /></linearGradient></defs>
    <g fill="url(#ts-gear)">
      {Array.from({ length: 8 }, (_, i) => <rect key={i} x="43" y="4" width="14" height="20" rx="3" transform={`rotate(${i * 45} 50 50)`} />)}
      <circle cx="50" cy="50" r="33" />
    </g>
    <circle cx="50" cy="50" r="14" fill="#e9f7f8" />
  </svg>
);

const Shield: React.FC = () => (
  <svg viewBox="0 0 100 116" className="sa-fill ts-shield">
    <defs><linearGradient id="ts-shield" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#3fe0d0" /><stop offset="1" stopColor="#0a7f8c" /></linearGradient></defs>
    <path d="M50 4 92 20v34c0 28-18 48-42 58C26 102 8 82 8 54V20Z" fill="url(#ts-shield)" />
    <path d="M50 14 82 26v28c0 22-14 38-32 46-18-8-32-24-32-46V26Z" fill="#ffffff22" />
    <path className="ts-check" d="M32 58l12 12 24-26" fill="none" stroke="#fff" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" pathLength={1} />
  </svg>
);

const HeroVisual = (
  <div className="ss-stage ts-hero-stage">
    <Layer className="ts-l-rack-a" depth={3} float={false}><ServerRack units={5} /></Layer>
    <Layer className="ts-l-rack-b" depth={3} float={false}><ServerRack units={6} /></Layer>
    <Layer className="ts-l-laptop" depth={8} float={false}>
      <Laptop className="ts-laptop">
        <div className="ts-screen">
          <aside><Brand light />{['SEO', 'Crawl', 'Indexing', 'Performance', 'Settings'].map((t) => <span key={t}>{t}</span>)}</aside>
          <div className="ts-main">
            <h5>Website Health</h5>
            <div className="ts-cards">
              {health.map(([Icon, t, d]) => (
                <div className="ts-card" key={t}><Icon /><div><b>{t}</b><small>{d}</small></div><i className="ts-status" /></div>
              ))}
            </div>
          </div>
        </div>
      </Laptop>
    </Layer>
    <Layer className="ts-l-shield" depth={20}><div className="ts-shield-wrap"><Shield /></div></Layer>
    <Layer className="ts-l-gear" depth={26} float={false}><div className="ts-gear-wrap"><Gear /></div></Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage ts-deliver-stage">
    <Layer className="ts-l-check" depth={0}>
      <div className="ts-checklist">
        <h5>Technical Checklist</h5>
        {['Crawlability', 'Indexing', 'Site Structure', 'Redirects', 'Performance', 'Structured Data'].map((t) => (
          <div key={t}><span className="ts-box"><Check /></span>{t}</div>
        ))}
      </div>
    </Layer>
    <Layer className="ts-l-book" depth={0}>
      <Book tone="navy" className="ts-book">
        <Brand light />
        <h4>Technical SEO<br /><span>Report</span></h4>
        <span className="sa-book-rule" />
        <p>Technical Audit<br />Recommendations<br />Next Steps</p>
      </Book>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'technical',
  ...SEO_PAGE_DEFAULTS,
  crumb: 'Technical SEO',
  eyebrow: 'TECHNICAL SEO',
  title: ['Build a stronger', 'foundation for search.'],
  intro: 'Help search engines access and understand your website with clear technical priorities and practical improvements.',
  primaryCta: 'Discuss Your Website',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE WORK ON', process: 'OUR PROCESS' },
  highlights: [
    [Search, 'Crawl & Index Access', 'Help search engines find and access your content.'],
    [Network, 'Clear Site Structure', 'A logical structure helps search engines understand your website.'],
    [AppWindow, 'Better Page Experience', 'Address technical issues that can affect how your site performs in search.'],
  ],
  highlightStyle: 'circle',
  overviewTitle: <>Make your website easier<br />to discover and understand.</>,
  overviewText: 'Technical SEO focuses on the foundation of your website, helping search engines crawl, index and understand your content. We identify and fix technical issues, improve site structure and make practical recommendations so your website can perform more effectively in organic search.',
  helpIcon: FileText,
  helpIntro: 'This service is especially useful if you are experiencing:',
  helps: ['Pages missing from search', 'Website redesign or migration', 'Technical issues across your site'],
  scopeTitle: 'Key areas of technical SEO.',
  scopeIconStyle: 'circle',
  scope: [
    [Search, 'Crawlability & Indexation', 'Ensure search engines can access and index your important pages.'],
    [Network, 'Site Architecture & Internal Links', 'Improve your site structure and internal linking to help search engines understand your content.'],
    [FileText, 'Canonicals & Duplicate URLs', 'Manage duplicate content and implement canonical tags where appropriate.'],
    [Link, 'Redirects & Broken Links', 'Identify and fix broken links and implement appropriate redirects.'],
    [Gauge, 'Performance & Core Web Vitals', 'Address technical performance issues that can affect user experience and search visibility.'],
    [Code, 'Structured Data & Sitemaps', 'Implement and optimise structured data and XML sitemaps to provide clearer signals to search engines.'],
  ],
  deliverTitle: 'Clear fixes. A healthier technical foundation.',
  deliverColumns: 2,
  deliverables: [
    ['Technical audit findings', 'A clear summary of key technical issues.'],
    ['Prioritised issue register', 'An ordered list of issues to address.'],
    ['Crawl and indexing recommendations', 'Practical guidance to improve access and indexation.'],
    ['URL and redirect guidance', 'Recommendations for redirects and URL handling.'],
    ['Performance improvement recommendations', 'Actionable suggestions to improve technical performance.'],
    ['Validation and implementation notes', 'Guidance to confirm fixes and next steps.'],
  ],
  deliverNote: 'Access, platform limitations and implementation responsibilities are agreed before work begins.',
  deliverVisual: DeliverVisual,
  processTitle: 'Our technical SEO process.',
  processStyle: 'cards',
  stepIcons: [FileText, Search, Settings, BarChart3],
  steps: [
    ['Review', 'Understand your platform and priorities.'],
    ['Diagnose', 'Investigate technical barriers.'],
    ['Improve', 'Implement or guide agreed changes.'],
    ['Validate', 'Check fixes and document next steps.'],
  ],
  faqTitle: 'Common questions.',
  faqStyle: 'plus-right',
  faqs: [
    ['Does technical SEO include website development?', 'We agree which fixes we implement directly and which require support from your development team.'],
    ['Can you support a website migration?', 'Yes. We help plan redirects, check crawlability and monitor indexing before and after a migration.'],
    ['Will technical fixes guarantee higher rankings?', 'No one can guarantee rankings. Technical fixes remove barriers so your content has a better chance to perform.'],
  ],
  relatedTitle: 'Explore related services.',
  relatedStyle: 'arrow',
  related: [
    { icon: Target, title: 'SEO Audit & Strategy', text: 'A complete review of your SEO opportunities with a clear plan.', target: 'SEO Audit & Strategy' },
    { icon: FileText, title: 'On-Page SEO', text: 'Optimise your content and on-page elements for search.', target: 'On-Page SEO' },
    { icon: Search, title: 'Keyword & Search Intent Research', text: 'Understand what your audience is searching for.', target: 'Keyword & Search Intent Research' },
  ],
  ctaTitle: 'Give your website a stronger search foundation.',
  ctaText: 'Let’s discuss your website and how technical SEO can help.',
  ctaButton: 'Let’s Talk SEO',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.to('.ts-gear', { rotation: 360, transformOrigin: '50% 50%', duration: 9, ease: 'none', repeat: -1 });
    gsap.to('.sa-led', { opacity: 0.25, duration: 0.4, stagger: { each: 0.12, from: 'random', repeat: -1, yoyo: true }, ease: 'steps(1)' });
    gsap.to('.ts-shield', { filter: 'drop-shadow(0 0 1.4em #3fe0d0aa)', duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.timeline({ repeat: -1, repeatDelay: 1.4, delay: 0.8 })
      .fromTo('.ts-check', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.8, ease: 'power2.out' })
      .fromTo('.ts-status', { scale: 0 }, { scale: 1, duration: 0.35, stagger: 0.35, ease: 'back.out(3)' }, 0)
      .fromTo('.ts-box svg', { scale: 0 }, { scale: 1, duration: 0.3, stagger: 0.25, ease: 'back.out(3)' }, 0)
      .to('.ts-status, .ts-box svg', { scale: 0, duration: 0.3 }, '+=2.6');
  },
};

export const TechnicalSeoPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default TechnicalSeoPage;
