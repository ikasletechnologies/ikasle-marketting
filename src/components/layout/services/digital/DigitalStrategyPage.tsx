import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, BarChart3, Check, ChevronDown, CircleCheck, ClipboardCheck,
  Coins, FileSearch, Mail, MessageSquareText, Play,
  Search, Settings2, Target, Users
} from 'lucide-react';
import './DigitalStrategyPage.css';

const SCOPE = [
  { icon: FileSearch, title: 'Business & Marketing Audit', text: 'Review your goals, channels and current activity.' },
  { icon: Users, title: 'Audience & Competitor Insights', text: 'Understand customer needs and market positioning.' },
  { icon: MessageSquareText, title: 'Messaging & Positioning', text: 'Clarify your value and core communication.' },
  { icon: BarChart3, title: 'Channel & Funnel Planning', text: 'Give each channel a role in the customer journey.' },
  { icon: Coins, title: 'Budget & Priority Planning', text: 'Set practical priorities around available resources.' },
  { icon: Target, title: 'KPIs & Measurement Plan', text: 'Define meaningful actions and how to track them.' },
];

const DELIVERABLES = [
  'Marketing audit summary', 'Prioritised campaign roadmap', 'Audience and competitor insights',
  'Budget allocation guidance', 'Messaging and channel recommendations', 'KPI and tracking framework',
];

const PROCESS = [
  { icon: Search, title: 'Discover', text: 'Understand your business goals, challenges and opportunities.' },
  { icon: ClipboardCheck, title: 'Research', text: 'Analyse your audience, market and current marketing activity.' },
  { icon: Settings2, title: 'Build the Plan', text: 'Create a practical strategy with clear priorities and recommendations.' },
  { icon: Users, title: 'Align & Handover', text: 'Walk through the plan and ensure your team is ready to put it into action.' },
];

const FAQS = [
  { q: 'Does this include campaign execution?', a: 'Execution can be scoped separately or combined with an ongoing marketing engagement.' },
  { q: 'Can you work with our existing marketing team?', a: 'Yes. We can build the strategy collaboratively and give your internal team a clear, practical roadmap.' },
  { q: 'How is the scope decided?', a: 'We shape the scope around your goals, current activity, priority channels and the depth of research required.' },
];

export interface DigitalStrategyPageProps {
  onHomeClick?: () => void;
  onServicesClick?: () => void;
  onDigitalClick?: () => void;
  onContactClick?: () => void;
}

export const DigitalStrategyPage: React.FC<DigitalStrategyPageProps> = ({ onHomeClick, onServicesClick, onDigitalClick, onContactClick }) => {
  const root = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const nodes = root.current?.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!nodes || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-shown'); observer.unobserve(entry.target); }
    }), { threshold: 0.13 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main ref={root} className="strategy-page">
      <section className="strategy-hero">
        <div className="strategy-shell strategy-hero-grid">
          <div className="strategy-hero-copy">
            <nav className="strategy-breadcrumb" aria-label="Breadcrumb">
              <button onClick={onHomeClick}>Home</button><span>/</span><button onClick={onServicesClick}>Services</button><span>/</span><button onClick={onDigitalClick}>Digital Marketing</button><span>/</span><span>Strategy</span>
            </nav>
            <p className="strategy-kicker">DIGITAL MARKETING STRATEGY</p>
            <h1>Give every marketing<br /><em>move a clear direction.</em></h1>
            <p className="strategy-lead">Connect your business goals, audience and channels in one practical marketing roadmap.</p>
            <div className="strategy-actions">
              <button className="strategy-primary" onClick={onContactClick}>Book a Strategy Call <ArrowRight /></button>
              <button className="strategy-secondary" onClick={() => document.getElementById('strategy-overview')?.scrollIntoView({ behavior: 'smooth' })}>Explore the Approach</button>
            </div>
          </div>

          <div className="strategy-visual" aria-hidden="true">
            <span className="strategy-orbit orbit-one" /><span className="strategy-orbit orbit-two" />
            <div className="roadmap-sheet"><span>MARKETING</span><strong>ROADMAP</strong><svg viewBox="0 0 180 80"><path d="M8 61 C42 58 43 23 76 42 S124 61 171 12"/><circle cx="8" cy="61" r="5"/><circle cx="76" cy="42" r="5"/><circle cx="171" cy="12" r="5"/></svg></div>
            <div className="strategy-target"><span /><i /><b /></div>
            <div className="visual-tile tile-users"><Users /></div><div className="visual-tile tile-mail"><Mail /></div><div className="visual-tile tile-play"><Play /></div><div className="visual-tile tile-chart"><BarChart3 /></div>
          </div>
        </div>
      </section>

      <section id="strategy-overview" className="strategy-section strategy-overview">
        <div className="strategy-shell overview-grid" data-reveal>
          <div><p className="strategy-eyebrow">OVERVIEW</p><h2>Before the campaign,<br /><em>get the direction right.</em></h2><p>A clear strategy helps you decide who to reach, what to say and where to focus. We review your current marketing and shape a plan around your priorities.</p></div>
          <aside><h3>Is this right for your business?</h3>{['Launching a new brand or offering', 'Bringing disconnected channels together', 'Deciding where to focus your budget'].map((item) => <p key={item}><CircleCheck />{item}</p>)}</aside>
        </div>
      </section>

      <section className="strategy-section strategy-scope">
        <div className="strategy-shell" data-reveal>
          <p className="strategy-eyebrow">SCOPE OF SERVICE</p><h2>What goes into your strategy.</h2>
          <div className="scope-grid">{SCOPE.map(({ icon: Icon, title, text }, i) => <article key={title} style={{ '--i': i } as React.CSSProperties}><span><Icon /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
        </div>
      </section>

      <section className="strategy-section strategy-deliverables">
        <div className="strategy-shell deliverable-card" data-reveal>
          <div className="deliverable-intro"><p className="strategy-eyebrow">DELIVERABLES</p><h2>A plan your team can use.</h2><div className="deliverable-art"><div className="paper-lines"><Check/><Check/><Check/></div><span /></div></div>
          <div className="deliverable-list">{DELIVERABLES.map((item) => <p key={item}><CircleCheck />{item}</p>)}<small>Final deliverables are agreed in your project scope.</small></div>
        </div>
      </section>

      <section className="strategy-section strategy-process">
        <div className="strategy-shell" data-reveal>
          <p className="strategy-eyebrow">OUR PROCESS</p><h2>From understanding to action.</h2>
          <div className="process-track">{PROCESS.map(({ icon: Icon, title, text }, i) => <React.Fragment key={title}><article><span className="process-number">{String(i + 1).padStart(2, '0')}</span><i><Icon /></i><h3>{title}</h3><p>{text}</p></article>{i < PROCESS.length - 1 && <ArrowRight className="process-arrow" />}</React.Fragment>)}</div>
        </div>
      </section>

      <section className="strategy-section strategy-faq">
        <div className="strategy-shell" data-reveal>
          <p className="strategy-eyebrow">FREQUENTLY ASKED QUESTIONS</p><h2>Your strategy questions, answered.</h2>
          <div className="faq-list">{FAQS.map((faq, i) => <article className={openFaq === i ? 'is-open' : ''} key={faq.q}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><span><b>{openFaq === i ? '−' : '+'}</b>{faq.q}</span><ChevronDown /></button><div className="faq-answer"><p>{faq.a}</p></div></article>)}</div>
        </div>
      </section>
    </main>
  );
};

export default DigitalStrategyPage;
