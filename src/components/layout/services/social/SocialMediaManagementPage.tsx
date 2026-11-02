import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, ArrowLeft, ChevronDown, Check, Circle, Clock, FileText, Monitor, Rocket, Share2, Users,
} from 'lucide-react';
import heroArt from '../../../../assets/social-hero-art.png';
import './SocialMediaManagementPage.css';

interface SocialMediaManagementPageProps {
  onHomeClick?: () => void;
  onServicesClick?: () => void;
  onSocialClick?: () => void;
  onContactClick?: () => void;
}

const SCOPE_ITEMS = [
  { icon: Monitor, title: 'Channel & Account Coordination', desc: 'Organise selected channels and agreed account access.' },
  { icon: Clock, title: 'Publishing & Scheduling', desc: 'Schedule approved posts across selected platforms.' },
  { icon: FileText, title: 'Captions & Platform Adaptation', desc: 'Adapt agreed content and copy to each channel.' },
  { icon: Share2, title: 'Comments & Inbox Coordination', desc: 'Handle agreed responses and escalate enquiries.' },
  { icon: Check, title: 'Approvals & Content Workflow', desc: 'Keep reviews and publishing responsibilities clear.' },
  { icon: Rocket, title: 'Performance Reviews & Reporting', desc: 'Review available insights and plan improvements.' },
];

const HELP_ITEMS = ['Maintaining regular publishing.', 'Managing multiple social channels.', 'Coordinating content and audience responses.'];

const DELIVERABLES = [
  'Agreed publishing calendar.',
  'Scheduled and published approved posts.',
  'Platform-ready captions and content adaptations.',
  'Community response and escalation guidelines.',
  'Approval and workflow coordination.',
  'Performance reports and recommendations.',
];

const PROCESS_STEPS = [
  { step: '01', title: 'Align', desc: 'We confirm your goals, channels and scope.' },
  { step: '02', title: 'Prepare', desc: 'We organise content, captions and the publishing schedule.' },
  { step: '03', title: 'Publish & Engage', desc: 'We publish approved posts and manage agreed activity.' },
  { step: '04', title: 'Review', desc: 'We look at available insights and improvements.' },
];

const FAQ_ITEMS = [
  { q: 'Do you create the posts as well?', a: 'Content creation can be included in the agreed scope or we can work with assets supplied by your team.' },
  { q: 'Which platforms can you manage?', a: 'We can support the platforms selected for your business, subject to agreed access and scope.' },
  { q: 'Do you respond to every message?', a: 'Response coverage, escalation rules and working hours are agreed before the service begins.' },
];

const RELATED_SERVICES = [
  { title: 'Content Planning & Calendars', desc: 'A clear plan for consistent and relevant content.' },
  { title: 'Creative Posts & Carousels', desc: 'Branded visual designs tailored for your channels.' },
  { title: 'Reels & Short-Form Video', desc: 'Short-form video content to bring your brand to life.' },
];

export const SocialMediaManagementPage: React.FC<SocialMediaManagementPageProps> = ({
  onHomeClick,
  onServicesClick,
  onSocialClick,
  onContactClick,
}) => {
  const root = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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
    <main ref={root} className="smm-page">
      <section className="smm-hero" data-reveal>
        <div className="smm-shell smm-hero-grid">
          <div className="smm-hero-copy">
            <nav className="smm-breadcrumb" aria-label="Breadcrumb">
              <button type="button" onClick={onHomeClick}>Home</button><span>/</span><button type="button" onClick={onServicesClick}>Services</button><span>/</span><button type="button" onClick={onSocialClick}>Social Media Marketing</button><span>/</span><span>Social Media Management</span>
            </nav>
            <p className="smm-eyebrow">SOCIAL MEDIA MANAGEMENT</p>
            <h1>Stay consistent. <em>Stay connected.</em></h1>
            <p className="smm-lead">Keep your social channels organised, active and aligned with your brand through planned publishing and thoughtful audience engagement.</p>
            <div className="smm-actions">
              <button type="button" className="smm-primary" onClick={onContactClick}>
                Discuss Your Social Plan <ArrowRight size={16} strokeWidth={2} />
              </button>
              <button type="button" className="smm-secondary" onClick={() => document.getElementById('smm-scope')?.scrollIntoView({ behavior: 'smooth' })}>
                Explore the Service
              </button>
            </div>
          </div>
          <div className="smm-visual" aria-hidden="true">
            <span className="smm-orbit orbit-one" /><span className="smm-orbit orbit-two" />
            <div className="plan-sheet"><span>SOCIAL</span><strong>MANAGEMENT</strong><svg viewBox="0 0 180 80"><path d="M8 61 C42 58 43 23 76 42 S124 61 171 12"/><circle cx="8" cy="61" r="5"/><circle cx="76" cy="42" r="5"/><circle cx="171" cy="12" r="5"/></svg></div>
            <div className="smm-target"><span /></div>
            <div className="visual-tile tile-users"><Users /></div><div className="visual-tile tile-chart"><FileText /></div><div className="visual-tile tile-play"><Rocket /></div><div className="visual-tile tile-mail"><Check /></div>
          </div>
        </div>
      </section>

      <section id="smm-overview" className="smm-section smm-overview" data-reveal>
        <div className="smm-shell overview-grid">
          <div>
            <p className="smm-eyebrow">OVERVIEW</p>
            <h2>Give your social presence <em>a dependable rhythm.</em></h2>
            <p>We coordinate your agreed content, publishing schedule and community activity so your channels stay consistent. Clear approvals and regular reviews keep the work connected to your business goals.</p>
          </div>
          <aside>
            <h3>When this service helps</h3>
            {HELP_ITEMS.map((item, i) => <p key={i}><Circle className="smm-check" />{item}</p>)}
          </aside>
        </div>
      </section>

      <section id="smm-scope" className="smm-section smm-scope" data-reveal>
        <div className="smm-shell">
          <p className="smm-eyebrow">SCOPE</p>
          <h2>What we manage for your brand.</h2>
          <div className="scope-grid">
            {SCOPE_ITEMS.map(({ icon: Icon, title, desc }, i) => (
              <article key={title} style={{ '--i': i } as React.CSSProperties}>
                <span><Icon /></span>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smm-section smm-deliverables" data-reveal>
          <div className="smm-shell deliverable-card">
          <div className="deliverable-intro">
            <p className="smm-eyebrow">DELIVERABLES</p>
            <h2>A clearer system <em>for your social channels.</em></h2>
            <div className="deliverable-art"><div className="paper-lines"><Check /><Check /><Check /></div><span /></div>
            <div className="smm-deliverables-art" aria-hidden="true"><img src={heroArt} alt="" /></div>
          </div>
          <div className="deliverable-list">{DELIVERABLES.map((item) => <p key={item}><Circle className="smm-check" />{item}</p>)}<small>Platforms, posting volume, response coverage, asset creation and paid advertising are agreed separately in scope.</small></div>
        </div>
      </section>

      <section className="smm-section smm-process" data-reveal>
        <div className="smm-shell">
          <p className="smm-eyebrow">PROCESS</p>
          <h2>From planning to everyday consistency.</h2>
          <div className="process-track">
            {PROCESS_STEPS.map(({ step, title, desc }, i) => (
              <React.Fragment key={step}>
                <article style={{ '--i': i } as React.CSSProperties}>
                  <span className="process-number">{step}</span>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </article>
                {i < PROCESS_STEPS.length - 1 && <ArrowRight className="process-arrow" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="smm-section smm-faq" data-reveal>
        <div className="smm-shell">
          <p className="smm-eyebrow">FAQ</p>
          <h2>Your management questions, answered.</h2>
          <div className="faq-list">
            {FAQ_ITEMS.map((faq, i) => (
              <article className={openFaq === i ? 'is-open' : ''} key={faq.q}>
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}>
                  <span><b>{openFaq === i ? '−' : '+'}</b>{faq.q}</span><ChevronDown size={17} strokeWidth={2} />
                </button>
                <div className="faq-answer"><p>{faq.a}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="smm-section smm-related" data-reveal>
        <div className="smm-shell">
          <p className="smm-eyebrow">RELATED SERVICES</p>
          <h2>Support your social presence.</h2>
          <div className="related-grid">
            {RELATED_SERVICES.map((service) => (
              <article key={service.title} className="related-card">
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <button type="button" className="related-link" onClick={onSocialClick}>
                  View Service <ArrowRight size={14} strokeWidth={2} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="smm-back">
        <button type="button" className="smm-back-button" onClick={onSocialClick}>
          <ArrowLeft size={16} strokeWidth={2} /> <span>Back to Social Media Services</span>
        </button>
      </div>
    </main>
  );
};

export default SocialMediaManagementPage;
