import React from 'react';
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import faviconImg from '../../../assets/favicon.png';
import logoImg from '../../../assets/logo-clean.png';
import './Footer.css';

/* lucide-react v1 dropped brand logos, so the social icons are inline SVGs. */
const SocialIcon: React.FC<{ size?: number; children: React.ReactNode }> = ({ size = 19, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{children}</svg>
);
const Instagram: React.FC<{ size?: number }> = ({ size }) => (
  <SocialIcon size={size}><path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1 0 8.3 0 8.7 0 12s0 3.7.1 4.9c.2 4.4 2.6 6.8 7 7 1.2.1 1.6.1 4.9.1s3.7 0 4.9-.1c4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9s0-3.7-.1-4.9c-.2-4.4-2.6-6.8-7-7C15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9z" /></SocialIcon>
);
const Linkedin: React.FC<{ size?: number }> = ({ size }) => (
  <SocialIcon size={size}><path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2zM7.1 20.5H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" /></SocialIcon>
);
const Facebook: React.FC<{ size?: number }> = ({ size }) => (
  <SocialIcon size={size}><path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1c0 6 4.4 11 10.1 11.9v-8.4h-3v-3.5h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.4l-.5 3.5h-2.8V24C19.6 23.1 24 18.1 24 12.1z" /></SocialIcon>
);
const XLogo: React.FC<{ size?: number }> = ({ size }) => (
  <SocialIcon size={size}><path d="M18.9 1.2h3.7l-8 9.2L24 22.8h-7.4l-5.8-7.6-6.6 7.6H.5l8.6-9.8L0 1.2h7.6l5.2 6.9 6.1-6.9zm-1.3 19.4h2L6.5 3.2H4.3l13.3 17.4z" /></SocialIcon>
);

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
              <button type="button" key={service} onClick={() => onNavigate?.(service)}>
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

        <div className="footer-column footer-contact">
          <h2>Contact</h2>
          <div className="footer-contact-details">
            <a href="tel:+917845132962"><Phone size={18} aria-hidden="true" /><span>Phone: +91 78451 32962</span></a>
            <a href="mailto:business@ikasle.in"><Mail size={18} aria-hidden="true" /><span>Email: business@ikasle.in</span></a>
            <address><MapPin size={18} aria-hidden="true" /><span>1639/A, 2nd Floor, Hopes, Peelamedu,<br />Coimbatore, Tamil Nadu, India – 641004</span></address>
          </div>
          <div className="footer-socials" aria-label="Social media links">
            <a href="#" aria-label="Instagram"><Instagram size={19} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={19} /></a>
            <a href="#" aria-label="Facebook"><Facebook size={19} /></a>
            <a href="#" aria-label="X"><XLogo size={19} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 IKASLĒ Marketing. All rights reserved.</p>
        <p className="footer-crafted">Crafted by <a href="https://www.ikasletechnologies.com/" target="_blank" rel="noreferrer">Ikasle Technologies</a></p>
      </div>
    </footer>
  );
};

export default Footer;
