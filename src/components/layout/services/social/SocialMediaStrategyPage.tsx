import React from 'react';
import { ArrowRight, Check, ChevronRight, Layers, Target, TrendingUp, Users } from 'lucide-react';
import heroImg from '../../../../assets/social-strategy-hero.png';
import overviewImg from '../../../../assets/social-strategy-overview.png';
import whyImg from '../../../../assets/social-strategy-why.png';
import './SocialMediaStrategyPage.css';

export interface SocialMediaStrategyPageProps {
  onHomeClick?: () => void;
  onServicesClick?: () => void;
  onSocialClick?: () => void;
  onContactClick?: () => void;
}

const STATS = [
  { value: '98+', label: 'Happy Clients' },
  { value: '3x', label: 'Average Engagement' },
  { value: '5+', label: 'Years of Experience' },
];

const FEATURES = [
  {
    icon: Target,
    title: 'Platform Strategy',
    description: 'Choose the right platforms for your audience.',
  },
  {
    icon: Layers,
    title: 'Content Strategy',
    description: 'Plan content that educates, entertains and converts.',
  },
  {
    icon: Users,
    title: 'Audience Targeting',
    description: 'Reach the right people, at the right time.',
  },
  {
    icon: TrendingUp,
    title: 'Performance Tracking',
    description: 'Measure, learn and scale with real data.',
  },
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Discovery',
    description: 'Understand your brand, audience and goals.',
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'Plan the right platforms, content and campaigns.',
  },
  {
    step: '03',
    title: 'Create',
    description: 'Develop engaging content & creatives.',
  },
  {
    step: '04',
    title: 'Launch',
    description: 'Execute and manage across channels.',
  },
  {
    step: '05',
    title: 'Analyze',
    description: 'Track performance and optimize.',
  },
];

const WHY_POINTS = [
  'Tailored strategies for your unique brand',
  'Creative and consistent content planning',
  'Data-backed decisions and performance tracking',
  'Dedicated team and transparent communication',
];

export const SocialMediaStrategyPage: React.FC<SocialMediaStrategyPageProps> = ({
  onHomeClick,
  onServicesClick,
  onSocialClick,
  onContactClick,
}) => {
  void onHomeClick;
  void onSocialClick;
  return (
    <main className="sms-page" id="sms-page-content">
      {/* 1. HERO SECTION */}
      <section className="sms-hero-section" aria-labelledby="sms-hero-heading">
        <div className="sms-container sms-hero-container">
          <div className="sms-hero-content">
            <nav className="sms-breadcrumbs" aria-label="Breadcrumb">
              <button type="button" onClick={onServicesClick} className="sms-breadcrumb-link">
                Services
              </button>
              <ChevronRight size={13} className="sms-breadcrumb-sep" aria-hidden="true" />
              <span className="sms-breadcrumb-current" aria-current="page">
                Social Media Strategy
              </span>
            </nav>

            <h1 id="sms-hero-heading" className="sms-hero-title">
              Social Media <br />
              <span className="sms-teal-text">Strategy</span>
            </h1>

            <p className="sms-hero-description">
              Turn your social media into a growth engine. We craft data-driven strategies
              that build brand awareness, spark engagement and drive real business results.
            </p>

            <div className="sms-hero-benefits" aria-label="Key Benefits">
              <div className="sms-benefit-pill">
                <span className="sms-check-circle" aria-hidden="true">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>More Engagement</span>
              </div>
              <div className="sms-benefit-pill">
                <span className="sms-check-circle" aria-hidden="true">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>Stronger Brand</span>
              </div>
              <div className="sms-benefit-pill">
                <span className="sms-check-circle" aria-hidden="true">
                  <Check size={13} strokeWidth={3} />
                </span>
                <span>Better ROI</span>
              </div>
            </div>

            <div className="sms-hero-cta">
              <button type="button" className="sms-primary-btn" onClick={onContactClick}>
                <span>Get a Free Strategy Call</span>
                <ArrowRight size={16} strokeWidth={2.2} className="sms-btn-arrow" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="sms-hero-visual" aria-hidden="true">
            <div className="sms-hero-glow" />
            <div className="sms-hero-img-wrap">
              <img
                src={heroImg}
                alt="Social Media Strategy smartphone and connected social media channels"
                className="sms-hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERVIEW SECTION */}
      <section className="sms-overview-section" aria-labelledby="sms-overview-heading">
        <div className="sms-container sms-overview-container">
          <div className="sms-overview-copy">
            <span className="sms-eyebrow">OVERVIEW</span>
            <h2 id="sms-overview-heading" className="sms-overview-title">
              Strategy That <br />
              Turns Followers into <br />
              <span className="sms-teal-text">Customers</span>
            </h2>
            <p className="sms-overview-description">
              We don't just post content — we build a purposeful social media strategy
              tailored to your brand, audience and goals. From platform selection to content
              planning, we help you show up, stand out and grow consistently.
            </p>

            <div className="sms-stats-row">
              {STATS.map((stat, i) => (
                <React.Fragment key={stat.label}>
                  {i > 0 && <div className="sms-stat-divider" aria-hidden="true" />}
                  <div className="sms-stat-col">
                    <span className="sms-stat-value">{stat.value}</span>
                    <span className="sms-stat-label">{stat.label}</span>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="sms-overview-card-container">
            <div className="sms-overview-card">
              <div className="sms-features-list">
                {FEATURES.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div className="sms-feature-item" key={item.title}>
                      <div className="sms-feature-icon-badge" aria-hidden="true">
                        <Icon size={18} strokeWidth={2.2} />
                      </div>
                      <div className="sms-feature-body">
                        <h3 className="sms-feature-title">{item.title}</h3>
                        <p className="sms-feature-desc">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="sms-overview-visual" aria-hidden="true">
                <img
                  src={overviewImg}
                  alt="Analytics and social growth metrics on laptop"
                  className="sms-overview-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PROCESS SECTION */}
      <section className="sms-process-section" aria-labelledby="sms-process-heading">
        <div className="sms-container sms-process-container">
          <div className="sms-process-header">
            <span className="sms-eyebrow">OUR PROCESS</span>
            <h2 id="sms-process-heading" className="sms-process-title">
              A Clear Process for <br />
              Social Media <span className="sms-teal-text">Success</span>
            </h2>
            <p className="sms-process-description">
              We follow a proven 5-step process to build a strategy that
              fits your brand and delivers measurable results.
            </p>
          </div>

          <div className="sms-process-timeline" role="list">
            <div className="sms-timeline-track" aria-hidden="true" />
            {PROCESS_STEPS.map((step) => (
              <div className="sms-process-step" key={step.step} role="listitem">
                <div className="sms-step-badge-wrap">
                  <span className="sms-step-number">{step.step}</span>
                </div>
                <h3 className="sms-step-title">{step.title}</h3>
                <p className="sms-step-desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section className="sms-why-section" aria-labelledby="sms-why-heading">
        <div className="sms-container sms-why-container">
          <div className="sms-why-content">
            <span className="sms-eyebrow">WHY CHOOSE US</span>
            <h2 id="sms-why-heading" className="sms-why-title">
              Why Ikasle for <br />
              Social Media Strategy?
            </h2>
            <p className="sms-why-description">
              We combine creativity, data and industry expertise to
              create strategies that actually work — not just look good.
            </p>

            <ul className="sms-why-list" aria-label="Why choose Ikasle">
              {WHY_POINTS.map((point) => (
                <li className="sms-why-item" key={point}>
                  <span className="sms-check-circle" aria-hidden="true">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="sms-why-cta">
              <button type="button" className="sms-primary-btn" onClick={onContactClick}>
                <span>Let's Build Your Social Presence</span>
                <ArrowRight size={16} strokeWidth={2.2} className="sms-btn-arrow" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="sms-why-visual" aria-hidden="true">
            <div className="sms-why-glow" />
            <div className="sms-why-img-wrap">
              <img
                src={whyImg}
                alt="Social media engagement growth and community interactions"
                className="sms-why-img"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SocialMediaStrategyPage;
