import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CLIENTS } from '../../../content/clients/clients';
import './ClientLogosSection.css';

const LOOP_LOGOS = [...CLIENTS, ...CLIENTS];

interface ClientLogosSectionProps {
  /** Use 'h1' when this section is the page's main heading (Clients page). */
  headingLevel?: 'h1' | 'h2';
}

export const ClientLogosSection: React.FC<ClientLogosSectionProps> = ({ headingLevel = 'h2' }) => {
  const Heading = headingLevel;
  return (
    <section className="cl-section" aria-label="Trusted client brands">
      <div className="cl-container">
        <header className="cl-header">
          <div>
            <span className="cl-eyebrow">
              <span className="cl-eyebrow-line" aria-hidden="true" />
              TRUSTED PARTNERS
            </span>
            <Heading className="cl-title">
              Brands scaling <span className="cl-title-highlight">with IKASLĒ.</span>
            </Heading>
          </div>

          <p className="cl-sub">
            Partnering with ambitious teams across hospitality, tech, D2C, and B2B growth.
          </p>
        </header>
      </div>

      <div
        className="cl-viewport"
        role="region"
        aria-roledescription="carousel"
        aria-label="Auto-scrolling client logos"
      >
        <div className="cl-track">
          {LOOP_LOGOS.map(({ name, src, url }, idx) => {
            const isDuplicate = idx >= CLIENTS.length;
            return (
              <a
                key={`${name}-${idx}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="cl-logo-link"
                aria-label={`Visit ${name} website`}
                aria-hidden={isDuplicate}
                tabIndex={isDuplicate ? -1 : 0}
              >
                <img
                  src={src}
                  alt={isDuplicate ? '' : `${name} logo`}
                  loading="lazy"
                  decoding="async"
                />
                <span className="cl-logo-name">
                  {name}
                  <ArrowUpRight size={13} strokeWidth={2.3} aria-hidden="true" />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClientLogosSection;
