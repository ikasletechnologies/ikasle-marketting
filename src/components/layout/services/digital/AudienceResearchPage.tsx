import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, BarChart3, BrainCircuit, ChevronDown, CircleCheck,
  FileText, Lightbulb, Map, MessageSquareText, Search, Target, TrendingUp, Users
} from 'lucide-react';
import './DigitalStrategyPage.css';
import './AudienceResearchPage.css';

const INVESTIGATIONS = [
  { icon: Users, title: 'Audience Segments', text: 'Identify useful customer groups and their needs.' },
  { icon: BrainCircuit, title: 'Customer Needs & Motivations', text: 'Explore challenges, priorities and buying considerations.' },
  { icon: Map, title: 'Customer Journey', text: 'Map discovery, evaluation and enquiry touchpoints.' },
  { icon: BarChart3, title: 'Competitor Landscape', text: 'Review relevant direct and indirect competitors.' },
  { icon: MessageSquareText, title: 'Messaging & Channel Review', text: 'Compare positioning, content and digital presence.' },
  { icon: Target, title: 'Opportunities & Gaps', text: 'Identify practical areas for differentiation.' },
];

const INSIGHTS = [
  'Audience segment profiles', 'Messaging and channel observations', 'Customer journey overview',
  'Opportunity and gap summary', 'Competitor comparison matrix', 'Prioritised recommendations',
];

const PROCESS = [
  { icon: MessageSquareText, title: 'Define the Questions', text: 'We clarify your goals and key areas to explore.' },
  { icon: FileText, title: 'Gather Evidence', text: 'We use relevant research methods to collect information.' },
  { icon: TrendingUp, title: 'Analyse Patterns', text: 'We identify themes, compare findings and look for opportunities.' },
  { icon: Lightbulb, title: 'Share Recommendations', text: 'We present clear, practical insights to inform your next steps.' },
];

const FAQS = [
  { q: 'Which research methods do you use?', a: 'Methods are selected around your goals, available data and agreed scope. They may include desk research, analytics reviews and customer interviews.' },
  { q: 'Can you research a specific market?', a: 'Yes. We can focus the work on a defined market, location, audience segment or competitive category.' },
  { q: 'How will the findings support our marketing?', a: 'The research turns evidence into practical guidance for positioning, messaging, channels, content and campaign planning.' },
];

const RELATED = [
  { icon: Target, title: 'Digital Marketing Strategy', text: 'Create a clear plan to reach your audience and grow.', id: 'strategy' },
  { icon: FileText, title: 'Content Marketing', text: 'Turn insights into content that resonates.', id: 'content' },
  { icon: BarChart3, title: 'Landing Pages & CRO', text: 'Create high-converting experiences for your audience.', id: 'landing' },
];

export interface AudienceResearchPageProps {
  onHomeClick?: () => void;
  onServicesClick?: () => void;
  onDigitalClick?: () => void;
  onContactClick?: () => void;
  onRelatedClick?: (serviceId: string) => void;
}

export const AudienceResearchPage: React.FC<AudienceResearchPageProps> = ({ onHomeClick, onServicesClick, onDigitalClick, onContactClick, onRelatedClick }) => {
  const root = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const nodes = root.current?.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!nodes || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-shown'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={root} className="strategy-page research-page">
      <section className="research-hero">
        <div className="strategy-shell research-hero-grid">
          <div>
            <nav className="strategy-breadcrumb" aria-label="Breadcrumb"><button onClick={onHomeClick}>Home</button><span>/</span><button onClick={onServicesClick}>Services</button><span>/</span><button onClick={onDigitalClick}>Digital Marketing</button><span>/</span><span>Audience Research</span></nav>
            <p className="strategy-kicker">AUDIENCE &amp; COMPETITOR RESEARCH</p>
            <h1>Know your audience.<br /><em>Find your difference.</em></h1>
            <p className="strategy-lead">Understand customer needs, explore your competitive landscape and make better marketing decisions.</p>
            <button className="strategy-primary" onClick={onContactClick}>Book a Research Consultation <ArrowRight /></button>
          </div>
          <div className="research-visual" aria-hidden="true">
            <div className="research-card research-card-left"><Users /><span /><span /><span /></div>
            <div className="research-card research-card-right"><Search /><span /><span /><span /></div>
            <div className="research-lens"><div><Users /></div><i /></div>
            <span className="research-spark spark-a" /><span className="research-spark spark-b" />
          </div>
        </div>
      </section>

      <section className="strategy-section research-overview">
        <div className="strategy-shell overview-grid" data-reveal>
          <div><p className="strategy-eyebrow">OVERVIEW</p><h2>Better decisions begin<br />with <em>better understanding.</em></h2><p>We examine who your customers are, what matters to them and how competing brands communicate. These insights help you make informed choices about positioning, messaging and channels.</p></div>
          <aside><h3>When this service helps</h3>{['Entering a new market', 'Clarifying your ideal audience', 'Reviewing your competitive position'].map((item) => <p key={item}><CircleCheck />{item}</p>)}</aside>
        </div>
      </section>

      <section className="strategy-section research-scope"><div className="strategy-shell" data-reveal><p className="strategy-eyebrow">SCOPE</p><h2>What we <em>investigate.</em></h2><div className="scope-grid">{INVESTIGATIONS.map(({ icon: Icon, title, text }, i) => <article key={title} style={{ '--i': i } as React.CSSProperties}><span><Icon /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

      <section className="strategy-section research-deliverables"><div className="strategy-shell research-deliverable-grid" data-reveal>
        <div><p className="strategy-eyebrow">DELIVERABLES</p><h2>Insights you can <em>put to work.</em></h2><div className="deliverable-list">{INSIGHTS.map((item) => <p key={item}><CircleCheck />{item}</p>)}<small>Research methods and deliverables are agreed in your project scope.</small></div></div>
        <div className="research-report" aria-hidden="true"><div className="report-front"><small>Research</small><strong>Insights</strong><span className="report-wave" /></div><div className="report-back"><BarChart3 /><span /><span /><span /></div></div>
      </div></section>

      <section className="strategy-section research-process"><div className="strategy-shell" data-reveal><p className="strategy-eyebrow">PROCESS</p><h2>From questions to <em>clear insights.</em></h2><div className="process-track">{PROCESS.map(({ icon: Icon, title, text }, i) => <React.Fragment key={title}><article><span className="process-number">{String(i + 1).padStart(2, '0')}</span><i><Icon /></i><h3>{title}</h3><p>{text}</p></article>{i < PROCESS.length - 1 && <ArrowRight className="process-arrow" />}</React.Fragment>)}</div></div></section>

      <section className="strategy-section strategy-faq research-faq"><div className="strategy-shell" data-reveal><p className="strategy-eyebrow">FAQ</p><h2>Your research questions, <em>answered.</em></h2><div className="faq-list">{FAQS.map((faq, i) => <article className={openFaq === i ? 'is-open' : ''} key={faq.q}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><span><b>{openFaq === i ? '−' : '+'}</b>{faq.q}</span><ChevronDown /></button><div className="faq-answer"><p>{faq.a}</p></div></article>)}</div></div></section>

      <section className="strategy-section research-related"><div className="strategy-shell" data-reveal><p className="strategy-eyebrow">RELATED SERVICES</p><h2>Turn insight into <em>your next step.</em></h2><div className="related-grid">{RELATED.map(({ icon: Icon, title, text, id }) => <article key={title} onClick={() => onRelatedClick?.(id)}><Icon /><div><h3>{title}</h3><p>{text}</p><button>View Service <ArrowRight /></button></div></article>)}</div></div></section>
    </main>
  );
};

export default AudienceResearchPage;
