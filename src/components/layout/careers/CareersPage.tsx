import React, { useState } from 'react';
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MapPin,
  MessageCircle,
  Send,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import { sendCareerApplication } from '../../../services/careerService';
import './CareersPage.css';

interface CareersPageProps {
  onHomeClick?: () => void;
  onContactClick?: () => void;
}

const OPEN_ROLES = [
  {
    title: 'Social Media Manager',
    team: 'Social Media',
    location: 'Remote / Coimbatore',
    type: 'Full-time',
    summary: 'Plan, create and grow social channels through thoughtful content, community and measurable campaigns.',
  },
];

const ROLE_DETAILS = {
  responsibilities: ['Plan monthly content themes and platform calendars.', 'Create and coordinate posts, reels and community responses.', 'Review performance and turn insights into better ideas.'],
  ideal: 'You notice what makes people stop, feel and respond. You can turn a brief into clear, platform-ready content and explain why it should work.',
};

export const CareersPage: React.FC<CareersPageProps> = ({ onHomeClick, onContactClick }) => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isRoleDetailsOpen, setIsRoleDetailsOpen] = useState(false);
  const [isApplicationOpen, setIsApplicationOpen] = useState(false);

  const openApplication = () => {
    setIsApplicationOpen(true);
    window.setTimeout(() => document.getElementById('career-application')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 0);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setSubmitted(false);
    setSubmitError('');

    try {
      await sendCareerApplication({
        fullName: String(formData.get('fullName') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        experience: String(formData.get('experience') || ''),
        portfolio: String(formData.get('portfolio') || ''),
        availability: String(formData.get('availability') || ''),
        message: String(formData.get('message') || ''),
      });
      setSubmitted(true);
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not send your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="careers-page">
      <section className="careers-hero" aria-labelledby="careers-hero-title">
        <div className="careers-shell careers-hero-grid">
          <div className="careers-hero-content">
            <div className="careers-hero-badge" aria-hidden="true"><Sparkles size={18} /></div>
            <span className="careers-hero-overline">JOIN THE TEAM</span>
            <h1 id="careers-hero-title">Make every <em>conversation</em> count.</h1>
            <p className="careers-hero-copy">
              Help ambitious brands show up with clarity, creativity and consistency across social media.
              We are building a thoughtful team for what comes next.
            </p>
            <nav className="careers-breadcrumb" aria-label="Breadcrumb">
              <button type="button" onClick={onHomeClick}>Home</button>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Careers</span>
            </nav>
          </div>

          <div className="careers-hero-visual" aria-hidden="true">
            <span className="careers-visual-glow" />
            <div className="careers-visual-card careers-visual-card--main">
              <MessageCircle />
              <strong>Ideas into impact.</strong>
              <span>Social, strategic and human.</span>
            </div>
            <div className="careers-visual-card careers-visual-card--small"><Send /><span>Ready to connect</span></div>
            <i className="careers-visual-dot careers-visual-dot--one" />
            <i className="careers-visual-dot careers-visual-dot--two" />
          </div>
        </div>
      </section>

      <section className="careers-openings careers-shell" aria-labelledby="careers-list-title">
        <div className="careers-section-heading">
          <div>
            <span className="careers-eyebrow">CURRENT OPENING</span>
            <h2 id="careers-list-title">Build better brand conversations.</h2>
          </div>
          <p>One focused opening for someone who understands people, platforms and the power of a useful idea.</p>
        </div>

        <div className="careers-role-list">
          {OPEN_ROLES.map((role) => (
            <article key={role.title} className="careers-role-card">
              <div className="careers-role-icon" aria-hidden="true"><UsersRound /></div>
              <div className="careers-role-info">
                <div className="careers-role-kicker">{role.team}</div>
                <h3>{role.title}</h3>
                <p>{role.summary}</p>
                <div className="careers-role-meta">
                  <span><MapPin size={16} />{role.location}</span>
                  <span><Clock3 size={16} />{role.type}</span>
                  <span><BriefcaseBusiness size={16} />1+ year experience</span>
                </div>
              </div>
              <div className="careers-role-actions">
                <button type="button" className="careers-view-btn" onClick={() => setIsRoleDetailsOpen((open) => !open)} aria-expanded={isRoleDetailsOpen} aria-controls="social-media-role-details">
                  {isRoleDetailsOpen ? 'Hide' : 'View'} <ChevronDown size={17} aria-hidden="true" />
                </button>
                <button type="button" className="careers-primary-btn" onClick={openApplication}>
                  Apply now <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
              {isRoleDetailsOpen && (
                <div id="social-media-role-details" className="careers-role-detail">
                  <div>
                    <span className="careers-role-detail-label">What you will do</span>
                    <ul>{ROLE_DETAILS.responsibilities.map((item) => <li key={item}><CheckCircle2 size={16} />{item}</li>)}</ul>
                  </div>
                  <div>
                    <span className="careers-role-detail-label">What we are looking for</span>
                    <p>{ROLE_DETAILS.ideal}</p>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      {isApplicationOpen && (
        <section id="career-application" className="careers-application-section" aria-labelledby="career-application-title">
        <div className="careers-shell careers-application-grid">
          <div className="careers-application-intro">
            <span className="careers-eyebrow">YOUR NEXT MOVE</span>
            <h2 id="career-application-title">Tell us how you think, create and grow.</h2>
            <p>Share a few details about your social media experience. If the approach feels right, we will start the conversation by email.</p>
            <ul>
              <li><CheckCircle2 /> Real work and thoughtful ideas</li>
              <li><CheckCircle2 /> A collaborative, remote-first team</li>
              <li><CheckCircle2 /> Space to learn and take ownership</li>
            </ul>
          </div>

          <form className="careers-application-form" onSubmit={handleSubmit}>
            <div className="careers-form-heading">
              <h3>Apply for Social Media Manager</h3>
              <p>All fields marked * are required.</p>
            </div>

            <div className="careers-form-grid">
              <label className="careers-field">
                <span>Full Name *</span>
                <input name="fullName" type="text" placeholder="Your name" required minLength={2} maxLength={120} pattern="[A-Za-z][A-Za-z .'-]{1,119}" title="Please enter a valid name using letters and spaces." />
              </label>
              <label className="careers-field">
                <span>Email Address *</span>
                <input name="email" type="email" placeholder="you@example.com" required maxLength={254} />
              </label>
              <label className="careers-field">
                <span>Phone Number *</span>
                <input name="phone" type="tel" inputMode="tel" placeholder="Your phone number" required maxLength={14} pattern="(?:\+91[\s-]?)?[6-9][0-9]{9}" title="Enter a valid 10-digit Indian phone number." />
              </label>
              <label className="careers-field">
                <span>Experience *</span>
                <select name="experience" defaultValue="" required>
                  <option value="" disabled>Select experience</option>
                  <option value="1-2 years">1–2 years</option>
                  <option value="3-5 years">3–5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </label>
              <label className="careers-field careers-field--wide">
                <span>Portfolio or LinkedIn</span>
                <input name="portfolio" type="url" placeholder="https://..." maxLength={300} />
              </label>
              <label className="careers-field">
                <span>Availability *</span>
                <select name="availability" defaultValue="" required>
                  <option value="" disabled>When can you start?</option>
                  <option value="Immediately">Immediately</option>
                  <option value="Within 2 weeks">Within 2 weeks</option>
                  <option value="Within 1 month">Within 1 month</option>
                  <option value="More than 1 month">More than 1 month</option>
                </select>
              </label>
              <label className="careers-field careers-field--wide">
                <span>Tell us about your social media experience *</span>
                <textarea name="message" placeholder="Share the kind of work you enjoy and a campaign or account you are proud of." required minLength={20} maxLength={5000} />
              </label>
            </div>

            <button type="submit" className="careers-submit-btn" disabled={isSubmitting}>
              <span>{isSubmitting ? 'Sending application...' : 'Send application'}</span>
              <Send size={18} aria-hidden="true" />
            </button>
            {submitError && <p className="careers-form-error" role="alert">{submitError}</p>}
            {submitted && <p className="careers-form-success" role="status">Application sent. Please check your email for confirmation.</p>}
          </form>
        </div>
      </section>
      )}

      <section className="careers-cta" aria-labelledby="careers-cta-title">
        <div className="careers-shell careers-cta-inner">
          <div><span className="careers-eyebrow">HAVE A QUESTION?</span><h2 id="careers-cta-title">Good work starts with a good conversation.</h2></div>
          <button type="button" className="careers-secondary-btn" onClick={onContactClick}>Talk to us <ArrowRight size={18} /></button>
        </div>
      </section>
    </main>
  );
};

export default CareersPage;