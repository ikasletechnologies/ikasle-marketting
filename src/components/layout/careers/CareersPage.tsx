import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import './CareersPage.css';

interface CareersPageProps {
  onHomeClick?: () => void;
  onContactClick?: () => void;
}

const OPEN_ROLES = [
  {
    title: 'Senior Digital Marketing Strategist',
    team: 'Strategy',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'SEO Specialist',
    team: 'Search',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Social Media Manager',
    team: 'Social',
    location: 'Remote',
    type: 'Full-time',
  },
  {
    title: 'Content Writer',
    team: 'Content',
    location: 'Remote',
    type: 'Contract',
  },
  {
    title: 'Paid Media Associate',
    team: 'Performance',
    location: 'Remote',
    type: 'Full-time',
  },
];

export const CareersPage: React.FC<CareersPageProps> = ({ onHomeClick, onContactClick }) => (
  <main className="careers-page">
    <section className="careers-hero" aria-labelledby="careers-hero-title">
      <div className="careers-hero-inner">
        <div className="careers-hero-badge" aria-hidden="true"><Sparkles size={20} /></div>
        <span className="careers-hero-overline">Join the team</span>
        <h1 id="careers-hero-title">We’re hiring<span> passionate marketers.</span></h1>
        <p className="careers-hero-copy">
          Help ambitious brands grow with strategy, creativity, and performance marketing.
          We’re a remote-first team looking for people who care about craft and results.
        </p>
        <nav className="careers-breadcrumb" aria-label="Breadcrumb">
          <button type="button" onClick={onHomeClick}>Home</button>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Careers</span>
        </nav>
      </div>
    </section>

    <section className="careers-list" aria-labelledby="careers-list-title">
      <h2 id="careers-list-title">Open roles</h2>
      <div className="careers-grid">
        {OPEN_ROLES.map((role) => (
          <article key={role.title} className="careers-card">
            <div className="careers-card-info">
              <h3>{role.title}</h3>
              <div className="careers-card-meta">
                <span>{role.team}</span>
                <span>{role.location}</span>
                <span>{role.type}</span>
              </div>
            </div>
            <button type="button" className="careers-card-apply" onClick={onContactClick}>
              Apply <ArrowRight size={18} aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>
    </section>

    <section className="careers-cta" aria-labelledby="careers-cta-title">
      <div className="careers-cta-inner">
        <h2 id="careers-cta-title">No role that fits?</h2>
        <p>We’re always interested in meeting talented marketers, designers, and strategists.</p>
        <button type="button" className="careers-cta-btn" onClick={onContactClick}>
          <span>Send us your portfolio</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  </main>
);

export default CareersPage;
