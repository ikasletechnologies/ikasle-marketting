import React, { useState } from 'react';
import { ArrowRight, Check, ChevronDown, Mail, MapPin, Phone } from 'lucide-react';
import ContactHero from './ContactHero';
import CommunicationArtwork from './CommunicationArtwork';
import { sendContactForm } from '../../../services/contactService';
import './ContactPage.css';

const CONTACT_ITEMS = [
  {
    title: 'Email Us',
    detail: 'ikaslemarketing@gmail.com',
    icon: Mail,
  },
  {
    title: 'Call Us',
    detail: '+91 78451 32962',
    icon: Phone,
  },
  {
    title: 'Visit Us',
    detail: '1639/A, 2nd Floor, Hopes, Coimbatore, India-641004',
    icon: MapPin,
  },
];

interface ContactPageProps {
  onHomeClick?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onHomeClick }) => {
  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setSubmitted(false);
    setSubmitError('');

    try {
      await sendContactForm({
        fullName: String(formData.get('fullName') || ''),
        email: String(formData.get('email') || ''),
        phone: String(formData.get('phone') || ''),
        company: String(formData.get('company') || ''),
        service: String(formData.get('service') || ''),
        budget: String(formData.get('budget') || ''),
        message: String(formData.get('message') || ''),
      });
      setSubmitted(true);
      form.reset();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'We could not send your enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page" id="contact">
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
                  let's talk.
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
                <CommunicationArtwork />
              </div>
            </aside>

            <form
              id="contact-form"
              className="contact-form-card"
              onSubmit={handleSubmit}

            >
              <h2>Tell us what you have in mind.</h2>

              <div className="contact-form-grid">
                <label className="contact-field">
                  <span>Full Name *</span>
                  <input name="fullName" type="text" placeholder="Your name" required minLength={2} maxLength={120} pattern="[A-Za-z][A-Za-z .'-]{1,119}" title="Please enter a valid name using letters and spaces." />
                </label>

                <label className="contact-field">
                  <span>Work Email *</span>
                  <input name="email" type="email" placeholder="you@company.com" required maxLength={254} />
                </label>

                <label className="contact-field">
                  <span>Phone Number *</span>
                  <input name="phone" type="tel" inputMode="tel" placeholder="Your phone number" required maxLength={14} pattern="(?:\+91[\s-]?)?[6-9][0-9]{9}" title="Enter a valid 10-digit Indian phone number." />
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
                  <span>Project Budget *</span>
                  <span className="contact-select-wrap">
                    <select name="budget" defaultValue="" required>
                      <option value="" disabled>Select a budget range</option>
                      <option>&#8377;25,000 - &#8377;50,000</option>
                      <option>&#8377;50,000 - &#8377;1,00,000</option>
                      <option>&#8377;1,00,000 - &#8377;2,50,000</option>
                      <option>&#8377;2,50,000+</option>
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

              <button type="submit" className="contact-submit" disabled={isSubmitting}>
                <span>{submitted ? 'Enquiry Sent' : isSubmitting ? 'Sending...' : 'Send Enquiry'}</span>
                <ArrowRight size={20} className="contact-submit-arrow" />
              </button>

              <p className="contact-error" role="alert" aria-live="polite">{submitError}</p>

              <p className={'contact-success' + (submitted ? ' is-visible' : '')} role="status">
                Thanks - we'll get back to you shortly.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
