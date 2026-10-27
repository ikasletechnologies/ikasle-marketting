import React, { useRef, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import contactArtwork from '../../../assets/hero.png';
import Crosshair from '../../effects/Crosshair';
import ContactHero from './ContactHero';
import './ContactPage.css';

const CONTACT_ITEMS = [
  {
    title: 'Email Us',
    detail: 'Your business email',
    icon: Mail,
  },
  {
    title: 'Call Us',
    detail: 'Your contact number',
    icon: Phone,
  },
  {
    title: 'Visit Us',
    detail: 'Your office address',
    icon: MapPin,
  },
];

interface ContactPageProps {
  onHomeClick?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onHomeClick }) => {
  const [submitted, setSubmitted] = useState(false);
  const contactRef = useRef<HTMLElement>(null);

  return (
    <main ref={contactRef} className="contact-page" id="contact">
      <Crosshair
        containerRef={contactRef}
        color="#00a99d"
        thickness={0.8}
        opacity={0.58}
        lineStyle="solid"
        gap={9}
        fade={0.72}
        smoothing={0.22}
        showCoordinates={false}
        targetEffect="lock"
        targetSelector="button, a, input, select, textarea, .contact-method"
        clickPulse
        hideCursor={false}
        blendMode="normal"
        className="contact-crosshair"
      />
      <ContactHero onHomeClick={onHomeClick} />
      <section className="contact-body">
        <div className="contact-container">
          <div className="contact-layout">
            <aside className="contact-details">
              <div>
                <h2>
                  Good conversations.
                  <span>Great beginnings.</span>
                </h2>
                <p className="contact-details-copy">
                  Whether you need a stronger brand, better visibility or your next campaign,
                  letÃ¢â‚¬â„¢s talk.
                </p>

                <div className="contact-methods">
                  {CONTACT_ITEMS.map(({ title, detail, icon: Icon }) => (
                    <div className="contact-method" key={title}>
                      <span className="contact-method-icon">
                        <Icon size={30} strokeWidth={1.8} aria-hidden="true" />
                      </span>
                      <span>
                        <strong>{title}</strong>
                        <small>{detail}</small>
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="contact-artwork-wrap" aria-hidden="true">
                <div className="contact-artwork-glow" />
                <img src={contactArtwork} alt="" className="contact-artwork" />
              </div>
            </aside>

            <form
              id="contact-form"
              className="contact-form-card"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <h2>Tell us what you have in mind.</h2>

              <div className="contact-form-grid">
                <label className="contact-field">
                  <span>Full Name *</span>
                  <input name="fullName" type="text" placeholder="Your name" required />
                </label>

                <label className="contact-field">
                  <span>Work Email *</span>
                  <input name="email" type="email" placeholder="you@company.com" required />
                </label>

                <label className="contact-field">
                  <span>Phone Number</span>
                  <input name="phone" type="tel" placeholder="Your phone number" />
                </label>

                <label className="contact-field">
                  <span>Company Name</span>
                  <input name="company" type="text" placeholder="Your company" />
                </label>

                <label className="contact-field contact-field--wide">
                  <span>Service Interested In</span>
                  <span className="contact-select-wrap">
                    <select name="service" defaultValue="">
                      <option value="" disabled>Select a service</option>
                      <option>Digital Marketing</option>
                      <option>Social Media Marketing</option>
                      <option>SEO &amp; Search Growth</option>
                      <option>Brand Growth &amp; Creative</option>
                    </select>
                    <ChevronDown size={20} aria-hidden="true" />
                  </span>
                </label>

                <label className="contact-field contact-field--wide">
                  <span>Project Budget</span>
                  <span className="contact-select-wrap">
                    <select name="budget" defaultValue="">
                      <option value="" disabled>Select a budget range</option>
                      <option>Ã¢â€šÂ¹25,000 Ã¢â‚¬â€œ Ã¢â€šÂ¹50,000</option>
                      <option>Ã¢â€šÂ¹50,000 Ã¢â‚¬â€œ Ã¢â€šÂ¹1,00,000</option>
                      <option>Ã¢â€šÂ¹1,00,000 Ã¢â‚¬â€œ Ã¢â€šÂ¹2,50,000</option>
                      <option>Ã¢â€šÂ¹2,50,000+</option>
                    </select>
                    <ChevronDown size={20} aria-hidden="true" />
                  </span>
                </label>

                <label className="contact-field contact-field--wide">
                  <span>How can we help? *</span>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your goals or project"
                    required
                  />
                </label>
              </div>

              <label className="contact-consent">
                <input name="privacy" type="checkbox" required />
                <span className="contact-checkbox">
                  <Check size={15} aria-hidden="true" />
                </span>
                <span>
                  I agree to the <a href="#privacy">Privacy Policy.</a>
                </span>
              </label>

              <button type="submit" className="contact-submit">
                <span>{submitted ? 'Enquiry Sent' : 'Send Enquiry'}</span>
                <ArrowRight size={20} className="contact-submit-arrow" />
              </button>

              <p className={'contact-success' + (submitted ? ' is-visible' : '')} role="status">
                Thanks Ã¢â‚¬â€ weÃ¢â‚¬â„¢ll get back to you shortly.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
