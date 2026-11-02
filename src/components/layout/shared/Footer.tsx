import React from 'react';
import { ArrowRight } from 'lucide-react';
import faviconImg from '../../../assets/favicon.png';
import logoImg from '../../../assets/logo-clean.png';
import './Footer.css';

interface FooterProps {
  onNavigate?: (section: string) => void;
}

const QUICK_LINKS = ['Home', 'About', 'Services', 'Blogs', 'Careers', 'Contact'];
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
