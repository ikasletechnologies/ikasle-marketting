import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import './ClientLogosSection.css';

interface ClientLogo {
  name: string;
  src: string;
  url: string;
}

const CLIENT_LOGOS: ClientLogo[] = [
  {
    name: 'Aadhan Caterers',
    src: '/clientlogo/aadhancaterers.jpeg',
    url: 'https://www.google.com/search?q=Aadhan+Caterers+Coimbatore',
  },
  {
    name: 'Acme Bricks',
    src: '/clientlogo/acme-bricks.webp',
    url: 'https://acmebricks.in',
  },
  {
    name: 'Akvinz',
    src: '/clientlogo/akvinz.png',
    url: 'https://akvinz.com',
  },
  {
    name: 'Get Events',
    src: '/clientlogo/get-events.png',
    url: 'https://www.getcorporateevents.com',
  },
  {
    name: 'Giftery',
    src: '/clientlogo/giftery.png',
    url: 'https://gifterys.com',
  },
  {
    name: 'Rent-O-Mate',
    src: '/clientlogo/rent-o-mate.png',
    url: 'https://rentomate.life',
  },
  {
    name: 'Uzhavar Connect',
    src: '/clientlogo/uzhavar-connect.webp',
    url: 'https://uzhavarconnect.com',
  },
];

const LOOP_LOGOS = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

export const ClientLogosSection: React.FC = () => {
  return (
    <section className="cl-section" aria-label="Trusted client brands">
      <div className="cl-container">
        <header className="cl-header">
          <div>
            <span className="cl-eyebrow">
              <span className="cl-eyebrow-line" aria-hidden="true" />
              TRUSTED PARTNERS
            </span>
            <h2 className="cl-title">
              Brands scaling <span className="cl-title-highlight">with IKASLĒ.</span>
            </h2>
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
            const isDuplicate = idx >= CLIENT_LOGOS.length;
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
