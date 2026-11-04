import React, { useState } from 'react';
import { ArrowRight, Check, ChevronDown, Mail, MapPin, Phone, AlertCircle } from 'lucide-react';
import ContactHero from './ContactHero';
import CommunicationArtwork from './CommunicationArtwork';
import { sendContactForm } from '../../../services/contactService';
import type {
  ContactFormData,
  ContactFormField,
  ContactFormErrors,
} from '../../../utils/contactValidation';
import {
  validateSingleField,
  validateAllFields,
} from '../../../utils/contactValidation';
import './ContactPage.css';

const CONTACT_ITEMS = [
  {
    title: 'Email Us',
    detail: 'ikaslemarketing@gmail.com',
    href: 'mailto:ikaslemarketing@gmail.com',
    icon: Mail,
  },
  {
    title: 'Call Us',
    detail: '+91 78451 32962',
    href: 'tel:+917845132962',
    icon: Phone,
  },
  {
    title: 'Visit Us',
    detail: '1639/A, 2nd Floor, Hopes, Coimbatore, India-641004',
    href: undefined,
    icon: MapPin,
  },
];

const INITIAL_FORM_DATA: ContactFormData = {
  fullName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: '',
  privacy: false,
};

interface ContactPageProps {
  onHomeClick?: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onHomeClick }) => {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactFormField, boolean>>>({});

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (field: ContactFormField, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // If field was already touched or has an error, re-validate on change for immediate feedback
    if (touched[field] || errors[field]) {
      const error = validateSingleField(field, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) {
          next[field] = error;
        } else {
          delete next[field];
        }
        return next;
      });
    }
  };

  const handleBlur = (field: ContactFormField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateSingleField(field, formData[field]);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Mark all fields as touched
    const allTouched: Partial<Record<ContactFormField, boolean>> = {
      fullName: true,
      email: true,
      phone: true,
      company: true,
      service: true,
      budget: true,
      message: true,
      privacy: true,
    };
    setTouched(allTouched);

    const validationErrors = validateAllFields(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Focus first field with an error
      const firstField = Object.keys(validationErrors)[0] as ContactFormField;
      const el = document.querySelector(`[name="${firstField}"]`) as HTMLElement | null;
      if (el) {
        el.focus();
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitted(false);
    setSubmitError('');

    try {
      await sendContactForm({
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        company: formData.company.trim(),
        service: formData.service.trim(),
        budget: formData.budget.trim(),
        message: formData.message.trim(),
      });
      setSubmitted(true);
      setFormData(INITIAL_FORM_DATA);
      setErrors({});
      setTouched({});
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
                  {CONTACT_ITEMS.map(({ title, detail, href, icon: Icon }) => {
                    const content = (
                      <>
                        <span className="contact-method-icon">
                          <Icon size={30} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span>
                          <strong>{title}</strong>
                          <small>{detail}</small>
                        </span>
                      </>
                    );

                    return href ? (
                      <a className="contact-method" href={href} key={title} aria-label={`${title}: ${detail}`}>
                        {content}
                      </a>
                    ) : (
                      <div className="contact-method" key={title}>
                        {content}
                      </div>
                    );
                  })}
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
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Your name"
                    required
                    minLength={2}
                    maxLength={120}
                    pattern="[A-Za-z][A-Za-z .'\x2d]{1,119}"
                    title="Please enter a valid name using letters and spaces only."
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    onBlur={() => handleBlur('fullName')}
                    className={touched.fullName && errors.fullName ? 'has-error' : ''}
                    aria-invalid={Boolean(touched.fullName && errors.fullName)}
                    aria-describedby={touched.fullName && errors.fullName ? 'fullName-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {touched.fullName && errors.fullName && (
                    <span className="contact-field-error" id="fullName-error" role="alert">
                      <AlertCircle size={14} aria-hidden="true" />
                      {errors.fullName}
                    </span>
                  )}
                </label>

                <label className="contact-field">
                  <span>Work Email *</span>
                  <input
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                    maxLength={254}
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={touched.email && errors.email ? 'has-error' : ''}
                    aria-invalid={Boolean(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {touched.email && errors.email && (
                    <span className="contact-field-error" id="email-error" role="alert">
                      <AlertCircle size={14} aria-hidden="true" />
                      {errors.email}
                    </span>
                  )}
                </label>

                <label className="contact-field">
                  <span>Phone Number *</span>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="Your phone number"
                    required
                    maxLength={16}
                    pattern="(?:\+91[\s\x2d]?)?[6-9][0-9]{9}"
                    title="Enter a valid 10-digit Indian mobile number."
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={touched.phone && errors.phone ? 'has-error' : ''}
                    aria-invalid={Boolean(touched.phone && errors.phone)}
                    aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {touched.phone && errors.phone && (
                    <span className="contact-field-error" id="phone-error" role="alert">
                      <AlertCircle size={14} aria-hidden="true" />
                      {errors.phone}
                    </span>
                  )}
                </label>

                <label className="contact-field">
                  <span>Company Name</span>
                  <input
                    name="company"
                    type="text"
                    placeholder="Your company"
                    maxLength={120}
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    onBlur={() => handleBlur('company')}
                    className={touched.company && errors.company ? 'has-error' : ''}
                    aria-invalid={Boolean(touched.company && errors.company)}
                    aria-describedby={touched.company && errors.company ? 'company-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {touched.company && errors.company && (
                    <span className="contact-field-error" id="company-error" role="alert">
                      <AlertCircle size={14} aria-hidden="true" />
                      {errors.company}
                    </span>
                  )}
                </label>

                <label className="contact-field contact-field--wide">
                  <span>Service Interested In</span>
                  <span className="contact-select-wrap">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={(e) => handleChange('service', e.target.value)}
                      onBlur={() => handleBlur('service')}
                      className={touched.service && errors.service ? 'has-error' : ''}
                      aria-invalid={Boolean(touched.service && errors.service)}
                      aria-describedby={touched.service && errors.service ? 'service-error' : undefined}
                      disabled={isSubmitting}
                    >
                      <option value="">Select a service</option>
                      <option value="Digital Marketing">Digital Marketing</option>
                      <option value="Social Media Marketing">Social Media Marketing</option>
                      <option value="SEO & Search Growth">SEO &amp; Search Growth</option>
                      <option value="Brand Growth & Creative">Brand Growth &amp; Creative</option>
                    </select>
                    <ChevronDown size={20} aria-hidden="true" />
                  </span>
                  {touched.service && errors.service && (
                    <span className="contact-field-error" id="service-error" role="alert">
                      <AlertCircle size={14} aria-hidden="true" />
                      {errors.service}
                    </span>
                  )}
                </label>

                <label className="contact-field contact-field--wide">
                  <span>Project Budget *</span>
                  <span className="contact-select-wrap">
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={(e) => handleChange('budget', e.target.value)}
                      onBlur={() => handleBlur('budget')}
                      required
                      className={touched.budget && errors.budget ? 'has-error' : ''}
                      aria-invalid={Boolean(touched.budget && errors.budget)}
                      aria-describedby={touched.budget && errors.budget ? 'budget-error' : undefined}
                      disabled={isSubmitting}
                    >
                      <option value="">Select a budget range</option>
                      <option value="₹25,000 - ₹50,000">&#8377;25,000 - &#8377;50,000</option>
                      <option value="₹50,000 - ₹1,00,000">&#8377;50,000 - &#8377;1,00,000</option>
                      <option value="₹1,00,000 - ₹2,50,000">&#8377;1,00,000 - &#8377;2,50,000</option>
                      <option value="₹2,50,000+">&#8377;2,50,000+</option>
                    </select>
                    <ChevronDown size={20} aria-hidden="true" />
                  </span>
                  {touched.budget && errors.budget && (
                    <span className="contact-field-error" id="budget-error" role="alert">
                      <AlertCircle size={14} aria-hidden="true" />
                      {errors.budget}
                    </span>
                  )}
                </label>

                <label className="contact-field contact-field--wide">
                  <span>How can we help? *</span>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="Tell us about your goals or project (minimum 20 characters)"
                    required
                    minLength={20}
                    maxLength={5000}
                    value={formData.message}
                    onChange={(e) => handleChange('message', e.target.value)}
                    onBlur={() => handleBlur('message')}
                    className={touched.message && errors.message ? 'has-error' : ''}
                    aria-invalid={Boolean(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? 'message-error' : undefined}
                    disabled={isSubmitting}
                  />
                  {touched.message && errors.message && (
                    <span className="contact-field-error" id="message-error" role="alert">
                      <AlertCircle size={14} aria-hidden="true" />
                      {errors.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="contact-consent-wrap">
                <label className="contact-consent">
                  <input
                    name="privacy"
                    type="checkbox"
                    required
                    checked={formData.privacy}
                    onChange={(e) => handleChange('privacy', e.target.checked)}
                    onBlur={() => handleBlur('privacy')}
                    disabled={isSubmitting}
                  />
                  <span className={'contact-checkbox' + (touched.privacy && errors.privacy ? ' has-error' : '')}>
                    <Check size={15} aria-hidden="true" />
                  </span>
                  <span>
                    I agree to the <a href="#privacy">Privacy Policy.</a>
                  </span>
                </label>
                {touched.privacy && errors.privacy && (
                  <span className="contact-field-error contact-privacy-error" role="alert">
                    <AlertCircle size={14} aria-hidden="true" />
                    {errors.privacy}
                  </span>
                )}
              </div>

              <button
                type="submit"
                className="contact-submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
              >
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
