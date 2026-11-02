import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronDown } from 'lucide-react';
import heroArt from '../../../../assets/social-hero-art.png';
import './ProfileSetupPage.css';

interface ProfileSetupPageProps {
  onHomeClick?: () => void;
  onServicesClick?: () => void;
  onSocialClick?: () => void;
  onContactClick?: () => void;
}

const SCOPE_ITEMS = [
  {
    title: 'Profile Audit & Platform Review',
    desc: 'Review current profiles and agree what to improve.',
  },
  {
    title: 'Account & Page Setup',
    desc: 'Create and configure business profiles and page settings.',
  },
  {
    title: 'Profile Image & Cover Design',
    desc: 'Add your logo, brand colours and assets across selected platforms.',
  },
  {
    title: 'Bio & About Copy',
    desc: 'Write clear messaging with clear purpose and contact links.',
  },
  {
    title: 'Expert Profile Writing',
    desc: 'Draft crisp copy with clear purpose and contact links.',
  },
  {
    title: 'Highlights & Profile Consistency',
    desc: 'Align names, handles, bios and visual identity across platforms.',
  },
];

const DELIVERABLES_LEFT = [
  'Audits findings and setup checklist',
  'Agreed profile page configuration',
  'Profile and cover image assets',
  'Account access and verified assets',
];

const DELIVERABLES_RIGHT = [
  'Bio and section copy',
  'Contact and bio configuration',
  'Profile review and handover guide',
];

const PROCESS_STEPS = [
  { step: '01', title: 'Review', desc: 'We assess your current profiles and brand guidelines.' },
  { step: '02', title: 'Prepare', desc: 'We organise assets and plan the profile setup.' },
  { step: '03', title: 'Configure', desc: 'We set up and apply branding across platforms.' },
  { step: '04', title: 'Handover', desc: 'We deliver a guide for ongoing management.' },
];

const FAQ_ITEMS = [
  {
    q: 'Can you optimise existing profiles?',
    a: 'Yes. We review your current profiles and apply updates to branding, information and available settings.',
  },
  {
    q: 'Which platforms can you work on?',
    a: 'Instagram, Facebook, LinkedIn and other major social platforms where your brand needs presence.',
  },
  {
    q: 'Do you provide login credentials?',
    a: 'We work with account access you provide and hand over a full setup guide at the end.',
  },
];

const RELATED_SERVICES = [
  {
    title: 'Social Media Strategy',
    desc: 'Clear direction across your social presence.',
  },
  {
    title: 'Social Media Management',
    desc: 'Consistent, on-brand content every week.',
  },
  {
    title: 'Content Planning & Calendars',
    desc: 'Plan relevant content that connects.',
  },
];

export const ProfileSetupPage: React.FC<ProfileSetupPageProps> = ({
  onHomeClick,
  onServicesClick,
  onSocialClick,
  onContactClick,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="ps-page">
      {/* ============ HERO ============ */}
      <section className="ps-hero" aria-labelledby="ps-hero-title">
        <div className="ps-container ps-hero-container">
          <div className="ps-hero-row">
            <div className="ps-hero-copy">
              <nav className="ps-breadcrumb" aria-label="Breadcrumb">
                <button type="button" onClick={onHomeClick}>Home</button>
                <span aria-hidden="true">/</span>
                <button type="button" onClick={onServicesClick}>Services</button>
                <span aria-hidden="true">/</span>
                <button type="button" onClick={onSocialClick}>Social Media</button>
                <span aria-hidden="true">/</span>
                <span aria-current="page">Profile Setup</span>
              </nav>

              <span className="ps-eyebrow">PROFILE SETUP & OPTIMISATION</span>
              <h1 id="ps-hero-title" className="ps-hero-title">
                Profile Setup &<br />
                Optimisation
              </h1>
              <p className="ps-hero-description">
                Make your first impression clear and consistent.
              </p>
              <p className="ps-hero-body">
                Give your social profiles a recognisable identity. Your handle, bio and links are often
                the first thing people see, so we’ll shape them into a clear, useful introduction to
                your brand.
              </p>

              <div className="ps-hero-actions">
                <button type="button" className="ps-btn-primary" onClick={onContactClick}>
                  Discuss Your Social Profile
                  <ArrowRight size={16} strokeWidth={2} aria-hidden="true" />
                </button>
                <button type="button" className="ps-btn-outline" onClick={onServicesClick}>
                  Explore the Service
                </button>
              </div>

              <div className="ps-social-badges">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="ps-social-badge ps-social-instagram">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="16.5" cy="7.5" r="1.5" fill="currentColor"/>
                </svg>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="ps-social-badge ps-social-facebook">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H5.916v-2.838h2.417v-1.978c0-1.397.125-2.347 1.138-2.347 1.05 0 1.261.722 1.261 1.309v1.846h3.357l-.546 2.838H13.13v6.987C17.542 21.128 21 16.991 21 12c0-5.523-4.477-10-10-10z"/>
                </svg>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="ps-social-badge ps-social-linkedin">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.06 2.06 0 0 1 2.062-2.062c1.137 0 2.062.925 2.062 2.062 0 1.136-.925 2.063-2.062 2.063a2.063 2.063 0 0 1-2.062-2.063zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .777 0 1.75v20.5c0 .974.792 1.75 1.771 1.75h20.451C23.2 24 24 23.223 24 22.25v-20.5C24 .777 23.2 0 22.225 0z"/>
                </svg>
              </div>
            </div>
            <div className="ps-hero-art" aria-hidden="true">
              <img src={heroArt} alt="" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ UNDERSTAND ============ */}
      <section className="ps-understand" aria-labelledby="ps-understand-title">
        <div className="ps-container ps-understand-container">
          <div className="ps-understand-copy">
            <span className="ps-section-label">UNDERSTAND</span>
            <h2 id="ps-understand-title" className="ps-understand-heading">
              Help visitors understand your brand at a glance.
            </h2>
            <p className="ps-understand-body">
              We set up and refine your social profiles to match your branding, business information
              and messaging work together. Each profile carries the right look and feel around your
              audience and the platforms available.
            </p>
          </div>
          <div className="ps-understand-help">
            <div className="ps-help-card">
              <h3>When this service helps</h3>
              <ul className="ps-help-list">
                <li>
                  <span className="ps-check">✓</span>Launching a new social presence
                </li>
                <li>
                  <span className="ps-check">✓</span>Refreshing inconsistent profiles
                </li>
                <li>
                  <span className="ps-check">✓</span>Making contact options easier to find
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SCOPE ============ */}
      <section className="ps-scope" aria-labelledby="ps-scope-title">
        <div className="ps-container ps-scope-container">
          <div className="ps-scope-header">
            <span className="ps-section-label">SCOPE</span>
            <h2 id="ps-scope-title" className="ps-scope-heading">What we set up and refine.</h2>
          </div>
          <div className="ps-scope-grid">
            {SCOPE_ITEMS.map((item, index) => (
              <article key={item.title} className="ps-scope-card">
                <div className="ps-scope-icon" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
                <h3 className="ps-scope-title">{item.title}</h3>
                <p className="ps-scope-desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ DELIVERABLES ============ */}
      <section className="ps-deliverables" aria-labelledby="ps-deliverables-title">
        <div className="ps-container ps-deliverables-container">
          <div className="ps-deliverables-copy">
            <span className="ps-section-label">DELIVERABLES</span>
            <h2 id="ps-deliverables-title" className="ps-deliverables-heading">
              A stronger foundation for your social presence.
            </h2>
          </div>
          <div className="ps-deliverables-columns">
            <div className="ps-deliverable-col">
              <h3>Setup foundation</h3>
              <ul className="ps-checklist">
                {DELIVERABLES_LEFT.map((item) => (
                  <li key={item} className="ps-checklist-item">
                    <span className="ps-check">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ps-deliverable-col">
              <h3>Content & handover</h3>
              <ul className="ps-checklist">
                {DELIVERABLES_RIGHT.map((item) => (
                  <li key={item} className="ps-checklist-item">
                    <span className="ps-check">✓</span>{item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section className="ps-process" aria-labelledby="ps-process-title">
        <div className="ps-container ps-process-container">
          <div className="ps-process-header">
            <span className="ps-section-label">PROCESS</span>
            <h2 id="ps-process-title" className="ps-process-heading">
              From your brand assets to a clearer profile.
            </h2>
          </div>
          <div className="ps-process-grid">
            {PROCESS_STEPS.map((step) => (
              <article key={step.step} className="ps-process-card">
                <div className="ps-step-number">{step.step}</div>
                <h3 className="ps-process-step-title">{step.title}</h3>
                <p className="ps-process-step-desc">{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="ps-faq" aria-labelledby="ps-faq-title">
        <div className="ps-container ps-faq-container">
          <div className="ps-faq-header">
            <span className="ps-section-label">FAQ</span>
            <h2 id="ps-faq-title" className="ps-faq-heading">
              Your profile setup questions, answered.
            </h2>
          </div>
          <div className="ps-faq-list">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={item.q} className="ps-faq-item">
                  <button
                    type="button"
                    className="ps-faq-button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                  >
                    <span className="ps-faq-question">{item.q}</span>
                    <ChevronDown size={16} strokeWidth={2} className="ps-faq-arrow" aria-hidden="true" />
                  </button>
                  {isOpen && (
                    <div className="ps-faq-answer" role="region" aria-labelledby={`faq-${index}`}>
                      <p>{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ RELATED SERVICES ============ */}
      <section className="ps-related" aria-labelledby="ps-related-title">
        <div className="ps-container ps-related-container">
          <div className="ps-related-header">
            <span className="ps-section-label">RELATED SERVICES</span>
            <h2 id="ps-related-title" className="ps-related-heading">
              Build on your social foundations.
            </h2>
          </div>
          <div className="ps-related-grid">
            {RELATED_SERVICES.map((service) => (
              <article key={service.title} className="ps-related-card">
                <h3 className="ps-related-title">{service.title}</h3>
                <p className="ps-related-desc">{service.desc}</p>
                <button type="button" className="ps-related-link" onClick={onContactClick}>
                  View Service
                  <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BACK ============ */}
      <div className="ps-back">
        <button type="button" className="ps-back-button" onClick={onServicesClick}>
          <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
          <span>Back to Social Media Services</span>
        </button>
      </div>
    </main>
  );
};

export default ProfileSetupPage;
