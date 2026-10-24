import React from 'react';
import { ArrowRight } from 'lucide-react';
import faviconImg from '../../../assets/favicon.png';
import logoImg from '../../../assets/logo-clean.png';
import './Footer.css';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

const QUICK_LINKS = ['Home', 'About', 'Services', 'Blogs', 'Contact'];
const SERVICES = [
  'Digital Marketing',
  'Social Media Marketing',
  'SEO & Search Growth',
  'Brand Growth & Creative',
];

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <button
            type="button"
            className="footer-logo-button"
            onClick={() => onNavigate?.('Home')}
            aria-label="Go to home"
          >
            <img src={logoImg} alt="Ikasle Marketing" />
          </button>
          <p>Strategy, creativity and digital marketing for brands ready to grow.</p>

          <svg
            className="footer-ribbon"
            viewBox="0 0 420 105"
            role="img"
            aria-label="Ikasle brand ribbon"
          >
            <defs>
              <linearGradient id="footerRibbonFront" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#35d7d0" />
                <stop offset="0.42" stopColor="#006eaa" />
                <stop offset="0.72" stopColor="#052d68" />
                <stop offset="1" stopColor="#55dfd4" />
              </linearGradient>
              <linearGradient id="footerRibbonBack" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" stopColor="#c8fbf6" stopOpacity="0.9" />
                <stop offset="0.48" stopColor="#00a99d" />
                <stop offset="1" stopColor="#75e7de" stopOpacity="0.55" />
              </linearGradient>
              <filter id="footerRibbonShadow" x="-20%" y="-40%" width="140%" height="180%">
                <feDropShadow dx="0" dy="7" stdDeviation="6" floodColor="#2178a7" floodOpacity="0.12" />
              </filter>
            </defs>
            <path
              d="M8 68 C74 67, 98 6, 167 22 C225 35, 244 82, 306 75 C351 70, 373 26, 414 24 C373 46, 347 88, 299 91 C229 95, 207 49, 155 38 C96 25, 67 88, 8 68 Z"
              fill="url(#footerRibbonBack)"
              opacity="0.92"
            />
            <path
              d="M8 67 C77 55, 91 12, 158 16 C220 20, 237 84, 303 84 C354 84, 375 36, 414 23 C380 57, 350 101, 292 96 C220 90, 205 39, 152 31 C94 22, 66 83, 8 67 Z"
              fill="url(#footerRibbonFront)"
              filter="url(#footerRibbonShadow)"
            />
            <path
              d="M91 40 C115 18, 137 13, 160 17 C207 25, 231 72, 275 82"
              fill="none"
              stroke="rgba(255,255,255,0.52)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="footer-column">
          <h2>Quick Links</h2>
          <nav aria-label="Footer quick links">
            {QUICK_LINKS.map((link) => (
              <button type="button" key={link} onClick={() => onNavigate?.(link)}>
                <img src={faviconImg} alt="" aria-hidden="true" />{link}
              </button>
            ))}
          </nav>
        </div>

        <div className="footer-column footer-services">
          <h2>Our Services</h2>
          <nav aria-label="Our services">
            {SERVICES.map((service) => (
              <button type="button" key={service} onClick={() => onNavigate?.('Services')}>
                <img src={faviconImg} alt="" aria-hidden="true" />{service}
              </button>
            ))}
          </nav>
        </div>

        <div className="footer-column footer-legal">
          <h2>Help &amp; Legal</h2>
          <nav aria-label="Help and legal">
            <button type="button" onClick={() => onNavigate?.('Privacy Policy')}><img src={faviconImg} alt="" aria-hidden="true" />Privacy Policy</button>
            <button type="button" onClick={() => onNavigate?.('Terms & Conditions')}><img src={faviconImg} alt="" aria-hidden="true" />Terms &amp; Conditions</button>
            <button type="button" onClick={() => onNavigate?.('FAQ')}><img src={faviconImg} alt="" aria-hidden="true" />FAQ</button>
          </nav>

          <div className="footer-conversation">
            <p>Have a project in mind?</p>
            <button type="button" onClick={() => onNavigate?.('Contact')}>
              <span>Start a Conversation</span>
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 IKASLĒ Marketing. All rights reserved.</p>
        <p>Strategy. Creativity. Growth.</p>
      </div>
    </footer>
  );
};

export default Footer;
