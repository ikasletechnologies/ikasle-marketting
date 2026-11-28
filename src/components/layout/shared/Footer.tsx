import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import faviconImg from '../../../assets/favicon.png';
import logoImg from '../../../assets/logo-clean.png';
import './Footer.css';
import { COUNTRY_NAMES, CountryFlag } from '../../ui/CountryFlag';

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

const GOOGLE_PROFILE_URL =
  'https://www.google.com/maps/place/Ikasle+Business+Group/@11.0266048,77.0175292,1076m/data=!3m2!1e3!5s0x3ba85784ff312249:0xcdbbd4f2722d8c8!4m14!1m7!3m6!1s0x3ba857124f786eb7:0x54b639fa94ae6c7c!2sIkasle+Business+Group!8m2!3d11.0265995!4d77.0201041!16s%2Fg%2F11xghp381c!3m5!1s0x3ba857124f786eb7:0x54b639fa94ae6c7c!8m2!3d11.0265995!4d77.0201041!16s%2Fg%2F11xghp381c?entry=ttu&g_ep=EgoyMDI2MTEyMi4wIKXMDSoASAFQAw%3D%3D';

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

        <div className="footer-column footer-contact">
          <h2>Contact</h2>
          <div className="footer-contact-details">
            <a href="tel:+917845132962"><Phone size={18} aria-hidden="true" /><span>Phone: +91 78451 32962</span></a>
            <a href="mailto:business@ikasle.in"><Mail size={18} aria-hidden="true" /><span>Email: business@ikasle.in</span></a>
            <address><MapPin size={18} aria-hidden="true" /><span>1639/A, 2nd Floor, Hopes, Peelamedu,<br />Coimbatore, Tamil Nadu, India – 641004</span></address>
          </div>
          <div className="footer-socials" aria-label="Social media channels">
            <span className="footer-social-placeholder" role="img" aria-label="Instagram (coming soon)" title="Coming soon"><Instagram size={19} /></span>
            <span className="footer-social-placeholder" role="img" aria-label="LinkedIn (coming soon)" title="Coming soon"><Linkedin size={19} /></span>
            <span className="footer-social-placeholder" role="img" aria-label="Facebook (coming soon)" title="Coming soon"><Facebook size={19} /></span>
            <span className="footer-social-placeholder" role="img" aria-label="X (coming soon)" title="Coming soon"><XLogo size={19} /></span>
          </div>
        </div>

        <div className="footer-column footer-profile">
          <h2>Google Profile</h2>
          <a
            className="footer-google-badge"
            href={GOOGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Ikasle Business Group 5.0 Google Reviews profile"
          >
            <span className="footer-google-icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.8z" />
                <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.2 0-5.9-2.1-6.8-5H1.2v3.1C3.2 21.3 7.3 24 12 24z" />
                <path fill="#FBBC05" d="M5.2 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.2C.4 8.2 0 10.1 0 12s.4 3.8 1.2 5.4l4-3.1z" />
                <path fill="#EA4335" d="M12 4.8c1.8 0 3.4.6 4.6 1.8l3.5-3.5C18 1.1 15.2 0 12 0 7.3 0 3.2 2.7 1.2 6.6l4 3.1c.9-2.9 3.6-4.9 6.8-4.9z" />
              </svg>
            </span>
            <span className="footer-google-copy">
              <span className="footer-google-label">GOOGLE REVIEWS</span>
              <span className="footer-google-rating">
                <span className="footer-google-stars" aria-hidden="true">★★★★★</span>
                <strong>5.0 · View profile</strong>
              </span>
            </span>
          </a>

          <div className="footer-countries" aria-label="Countries we serve">
            <span className="footer-countries-label">COUNTRIES WE SERVE</span>
            <ul className="footer-countries-list">
              {(['india', 'usa', 'uk', 'canada', 'australia', 'europe'] as const).map((id) => (
                <li key={id} title={COUNTRY_NAMES[id]}>
                  <CountryFlag id={id} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 IKASLĒ Marketing. All rights reserved.</p>
        <p className="footer-crafted">Crafted by <a href="https://www.ikasletechnologies.com/" target="_blank" rel="noreferrer">Ikasle Technologies</a></p>
        <nav className="footer-bottom-legal" aria-label="Help and legal">
          <button type="button" onClick={() => onNavigate?.('Privacy Policy')}>Privacy Policy</button>
          <button type="button" onClick={() => onNavigate?.('Terms & Conditions')}>Terms &amp; Conditions</button>
          <button type="button" onClick={() => onNavigate?.('Cookie Policy')}>Cookie Policy</button>
          <button type="button" onClick={() => onNavigate?.('FAQ')}>FAQ</button>
          <button type="button" onClick={() => onNavigate?.('Sitemap')}>Sitemap</button>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
