import React from 'react';
import { MessageCircle, Phone, Send } from 'lucide-react';
import contactHeroArtwork from '../../../assets/contact-hero-connect.png';
import './ContactHero.css';

interface ContactHeroProps {
  onHomeClick?: () => void;
}

export const ContactHero: React.FC<ContactHeroProps> = ({ onHomeClick }) => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="contact-page-hero" aria-labelledby="contact-hero-title">
      <img className="contact-page-hero__art" src={contactHeroArtwork} alt="" aria-hidden="true" />
      <div className="contact-page-hero__inner">
        <div className="contact-page-hero__content">
          <p className="contact-page-hero__eyebrow">LET’S CONNECT</p>
          <h1 id="contact-hero-title">
            Great ideas start
            <span>with a conversation.</span>
          </h1>
          <p className="contact-page-hero__copy">
            Have a question or a project in mind? Choose how you’d like to reach us.
          </p>

          <div className="contact-page-hero__actions" aria-label="Contact options">
            <a className="contact-page-hero__button contact-page-hero__button--primary" href="tel:+910000000000">
              <Phone size={21} aria-hidden="true" />
              <span>Call Us</span>
            </a>
            <a className="contact-page-hero__button contact-page-hero__button--whatsapp" href="https://wa.me/" target="_blank" rel="noreferrer">
              <MessageCircle size={22} aria-hidden="true" />
              <span>WhatsApp</span>
            </a>
            <button className="contact-page-hero__button contact-page-hero__button--secondary" type="button" onClick={scrollToForm}>
              <Send size={21} aria-hidden="true" />
              <span>Send Enquiry</span>
            </button>
          </div>

          <nav className="contact-page-hero__breadcrumb" aria-label="Breadcrumb">
            <button type="button" onClick={onHomeClick}>Home</button>
            <span aria-hidden="true">/</span>
            <strong>Contact</strong>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
