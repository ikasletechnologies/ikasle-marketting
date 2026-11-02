import React from 'react';
import { gsap } from 'gsap';
import { Backpack, BarChart3, Code, FileText, Folder, Footprints, Glasses, Headphones, Layers, Link, Search, Settings, Shirt, ShoppingBag, SlidersHorizontal, Sprout, Watch } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServicePageProps, type ServiceTemplateData } from '../template/ServiceDetailTemplate';
import { Book, Brand, Chip, Lines, Magnifier, Monitor } from '../template/ServiceArt';
import { SEO_PAGE_DEFAULTS } from './seoShared';
import './EcommerceSeoPage.css';

const products = [Footprints, Headphones, Sprout, Glasses, Backpack, Shirt, Watch, ShoppingBag] as const;

const HeroVisual = (
  <div className="ss-stage ec-hero-stage">
    <Layer className="ec-l-monitor" depth={8} float={false}>
      <Monitor className="ec-monitor">
        <div className="ec-store">
          <div className="ec-nav"><b>Lifestyle Store</b>{['Women', 'Men', 'Accessories', 'Home'].map((t) => <span key={t}>{t}</span>)}</div>
          <div className="ec-grid">{products.map((Icon, i) => <span key={i} className="ec-product"><Icon /></span>)}</div>
        </div>
      </Monitor>
    </Layer>
    <Layer className="ec-l-c1" depth={18}><Chip icon={<Footprints />} className="ec-chip">Product Pages<Lines n={2} /></Chip></Layer>
    <Layer className="ec-l-c2" depth={22}><Chip icon={<Folder />} className="ec-chip">Category Structure<Lines n={2} /></Chip></Layer>
    <Layer className="ec-l-c3" depth={24}><Chip icon={<Search />} className="ec-chip">Search Intent<Lines n={2} /></Chip></Layer>
    <Layer className="ec-l-bag" depth={20} float={false}>
      <svg viewBox="0 0 60 70" className="ec-bag"><path d="M20 22v-6a10 10 0 0 1 20 0v6" fill="none" stroke="#0a7f8c" strokeWidth="3" /><path d="M8 22h44l4 46H4Z" fill="#14b3ad" /><path d="M8 22h44l1 8H7Z" fill="#0a8f9c" /></svg>
    </Layer>
    <Layer className="ec-l-mag" depth={26} float={false}><div className="ec-mag"><Magnifier /></div></Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage ec-deliver-stage">
    <Layer className="ec-l-book" depth={0}>
      <Book className="ec-book">
        <Brand />
        <h4>E-Commerce SEO<br /><span>Report</span></h4>
        <p>Product and category recommendations for a healthier, more discoverable store.</p>
        <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="ec-book-shapes"><path d="M0 60 L40 10 L70 60Z" fill="#0aa5a3" opacity=".8" /><path d="M30 60 L70 20 L100 50 V60Z" fill="#0b4f8a" opacity=".85" /><path d="M60 60 L85 35 L100 60Z" fill="#5fd4e0" /></svg>
      </Book>
    </Layer>
    <Layer className="ec-l-r1" depth={0}>
      <div className="ec-rec"><h5>Product Recommendations</h5><div className="ec-rec-row"><span className="ec-product"><Footprints /></span><Lines n={3} /></div></div>
    </Layer>
    <Layer className="ec-l-r2" depth={0}>
      <div className="ec-rec"><h5>Category Recommendations</h5><div className="ec-rec-tiles">{[Shirt, Watch, Backpack].map((Icon, i) => <span key={i} className="ec-product"><Icon /></span>)}</div><Lines n={2} /></div>
    </Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'ecommerce',
  ...SEO_PAGE_DEFAULTS,
  crumb: 'E-Commerce SEO',
  eyebrow: 'E-COMMERCE SEO',
  title: ['Help shoppers discover', 'the right products.'],
  intro: 'Strengthen your store’s search foundations with clearer categories, useful product content and practical technical improvements.',
  primaryCta: 'Discuss Your Online Store',
  heroVisual: HeroVisual,
  labels: { scope: 'WHAT WE WORK ON', process: 'OUR PROCESS', faq: 'FREQUENTLY ASKED QUESTIONS' },
  highlights: [
    [ShoppingBag, 'Discoverable Products', 'Help the right products appear in search results.'],
    [Layers, 'Clearer Categories', 'Make it easier for shoppers to find what they need.'],
    [BarChart3, 'Stronger Store Structure', 'A well organised store is easier for both users and search engines.'],
  ],
  highlightStyle: 'plain',
  highlightsCard: true,
  overviewTitle: <>Build a store that is easier<br />to explore and understand.</>,
  overviewText: 'We connect search intent, catalogue structure and useful product information to help more relevant shoppers find the right products across your store.',
  helps: ['Launching or migrating an online store', 'Improving category and product pages', 'Managing a growing product catalogue'],
  scopeIconStyle: 'circle',
  scope: [
    [Search, 'E-Commerce SEO Audit', 'Review your store’s structure, content and technical setup to identify opportunities.'],
    [Folder, 'Category & Collection Optimisation', 'Improve category structure, content and internal linking to better match search intent.'],
    [FileText, 'Product Page Content', 'Optimise product titles, descriptions and supporting content to be clearer and more helpful.'],
    [Link, 'Catalogue & Internal Linking', 'Strengthen internal linking across categories, collections and product pages.'],
    [SlidersHorizontal, 'Filters, Variants & Indexation', 'Review filters, product variants and indexation to keep your store search-friendly.'],
    [Code, 'Product Structured Data Review', 'Check and improve structured data for products, categories and relevant elements.'],
  ],
  deliverTitle: 'A focused SEO plan for your online store.',
  deliverables: ['Store audit and priorities', 'Category keyword mapping', 'Product page recommendations', 'Navigation and internal link guidance', 'Technical catalogue recommendations', 'Implementation and validation notes'],
  deliverNote: 'Platform, catalogue size, page count and implementation responsibilities are agreed for your store.',
  deliverVisual: DeliverVisual,
  processTitle: 'Our e-commerce SEO process.',
  processStyle: 'cards',
  stepIcons: [Search, FileText, Settings, BarChart3],
  steps: [
    ['Discover', 'Understand your store and catalogue.'],
    ['Review', 'Assess content, structure and technical barriers.'],
    ['Optimise', 'Refine agreed categories and product elements.'],
    ['Validate', 'Review updates and prioritise next steps.'],
  ],
  faqStyle: 'chevron',
  faqs: [
    ['Can you optimise an existing online store?', 'Yes. We review your platform, catalogue and priorities to agree practical improvements for your existing store.'],
    ['Does this include every product in the catalogue?', 'Not by default. We prioritise key categories and products, and agree how wider catalogue updates will be handled.'],
    ['Can you help during a store migration?', 'Yes. We help plan URL mapping, redirects and checks so categories and products keep their visibility.'],
  ],
  relatedStyle: 'arrow',
  related: [
    { icon: Settings, title: 'Technical SEO', text: 'Improve the technical foundations of your website.', target: 'Technical SEO' },
    { icon: FileText, title: 'On-Page SEO', text: 'Optimise your content and pages for search.', target: 'On-Page SEO' },
    { icon: Search, title: 'Keyword & Search Intent Research', text: 'Understand what your audience is searching for.', target: 'Keyword & Search Intent Research' },
  ],
  ctaIcon: ShoppingBag,
  ctaTitle: 'Give your products a clearer path to discovery.',
  ctaText: 'Let’s improve your store’s search foundations and make it easier for shoppers to find what they need.',
  ctaButton: 'Let’s Talk E-Commerce SEO',
  ctaTone: 'blue',
  ctaInset: true,
  animate: () => {
    gsap.to('.ec-grid .ec-product', { backgroundColor: '#d6f1f4', scale: 1.06, duration: 0.35, stagger: { each: 0.3, repeat: -1, yoyo: true, repeatDelay: 2.2 } });
    gsap.to('.ec-bag', { rotation: 6, transformOrigin: '50% 0%', duration: 1.6, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.ec-mag', { x: '-1.2em', y: '-0.6em', rotation: -8, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    gsap.to('.ec-rec .ec-product', { scale: 1.1, duration: 0.5, stagger: { each: 0.4, repeat: -1, yoyo: true, repeatDelay: 1.2 } });
  },
};

export const EcommerceSeoPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default EcommerceSeoPage;
