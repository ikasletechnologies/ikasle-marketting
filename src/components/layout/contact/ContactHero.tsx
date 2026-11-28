import React, { useCallback, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRight, CalendarCheck, Check, CheckCheck, MapPin, MessageCircle, Phone, Send } from 'lucide-react';
import logoImg from '../../../assets/logo-clean.png';
import { PageHero } from '../shared/PageHero';
import { useInView, useInterval, usePrefersReducedMotion } from '../../../hooks/motion';
import './ContactHero.css';

interface ContactHeroProps {
  onHomeClick?: () => void;
}

const PHONE_HREF = 'tel:+917845132962';
const WHATSAPP_HREF = 'https://wa.me/917845132962';
const MAP_HREF = 'https://www.google.com/maps/search/?api=1&query=1639%2FA+Hopes+Peelamedu+Coimbatore+641004';

/** Scripted chat: each item appears at its step; the loop restarts after LAST_STEP. */
const CHAT = [
  { step: 1, from: 'them', text: 'Hi! We want more enquiries for our business 👋' },
  { step: 2, from: 'typing' },
  { step: 4, from: 'us', text: 'Hello! Happy to help. Shall we plan a quick strategy call?' },
  { step: 5, from: 'them', text: 'Yes please, tomorrow works 🙌' },
  { step: 6, from: 'typing' },
  { step: 8, from: 'booking' },
] as const;
const LAST_STEP = 12;

const ContactShowcase: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [inView] = useInView(ref);
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  const tick = useCallback(() => setStep((s) => (s >= LAST_STEP ? 0 : s + 1)), []);
  useInterval(tick, inView && !reduced ? 1100 : null);

  // Reduced motion: show the finished conversation without typing indicators.
  const shown = CHAT.filter((m, i) => {
    if (reduced) return m.from !== 'typing';
    if (m.from !== 'typing') return step >= m.step;
    const nextStep = CHAT[i + 1]?.step ?? Infinity;
    return step >= m.step && step < nextStep;
  });

  return (
    <div className={`ph-stage ct-stage${inView ? '' : ' ph-paused'}`} ref={ref}>
      <div className="ph-stage-inner">
        {/* Chat window */}
        <div className="ph-card ct-chat" style={{ '--d': '200ms' } as CSSProperties} aria-hidden="true">
          <div className="ct-chat-head">
            <span className="ct-avatar"><img src={logoImg} alt="" /></span>
            <div>
              <b>IKASLĒ Marketing</b>
              <small><i /> Online</small>
            </div>
            <span className="ct-head-icons"><Phone /><MessageCircle /></span>
          </div>

          <div className={`ct-thread${step === 0 && !reduced ? ' is-reset' : ''}`}>
            {shown.map((m) => {
              if (m.from === 'typing') {
                return (
                  <div key={`t${m.step}`} className="ct-msg ct-msg--us ct-typing">
                    <i /><i /><i />
                  </div>
                );
              }
              if (m.from === 'booking') {
                return (
                  <div key="booking" className="ct-booking">
                    <span className="ct-booking-icon"><CalendarCheck /></span>
                    <div>
                      <b>Strategy call booked</b>
                      <small>Tomorrow · 11:00 AM</small>
                    </div>
                    <span className="ct-booking-ok"><Check /> Confirmed</span>
                  </div>
                );
              }
              return (
                <div key={`m${m.step}`} className={`ct-msg ct-msg--${m.from}`}>
                  {m.text}
                  {m.from === 'them' && <CheckCheck className="ct-seen" />}
                </div>
              );
            })}
          </div>

          <div className="ct-compose">
            <span>Type a message…</span>
            <span className="ct-send"><Send /></span>
          </div>
        </div>

        {/* Real contact channels */}
        <a className="ph-card ct-channel ct-channel--phone" href={PHONE_HREF} style={{ '--d': '420ms' } as CSSProperties}>
          <span className="ct-ch-icon"><Phone aria-hidden="true" /></span>
          <span className="ct-ch-text">
            <small>Call us</small>
            <b>+91 78451 32962</b>
          </span>
          <ArrowUpRight className="ct-ch-go" aria-hidden="true" />
        </a>

        <a
          className="ph-card ct-channel ct-channel--whatsapp"
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noreferrer"
          style={{ '--d': '560ms' } as CSSProperties}
        >
          <span className="ct-ch-icon"><MessageCircle aria-hidden="true" /></span>
          <span className="ct-ch-text">
            <small>WhatsApp</small>
            <b>Chat with us</b>
          </span>
          <ArrowUpRight className="ct-ch-go" aria-hidden="true" />
        </a>

        <a
          className="ph-card ct-channel ct-channel--office"
          href={MAP_HREF}
          target="_blank"
          rel="noreferrer"
          style={{ '--d': '700ms' } as CSSProperties}
        >
          <span className="ct-ch-icon"><MapPin aria-hidden="true" /></span>
          <span className="ct-ch-text">
            <small>Visit our office</small>
            <b>Peelamedu, Coimbatore</b>
          </span>
          <ArrowUpRight className="ct-ch-go" aria-hidden="true" />
        </a>

        <span className="ct-plane" aria-hidden="true"><Send /></span>
      </div>
    </div>
  );
};

export const ContactHero: React.FC<ContactHeroProps> = ({ onHomeClick }) => {
  const scrollToForm = () => {
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <PageHero
      id="contact-hero"
      badge="Let’s connect"
      BadgeIcon={MessageCircle}
      titleTop="Great ideas start"
      titleLead="with a"
      words={['conversation', 'quick call', 'hello', 'coffee chat']}
      description="Have a question or a project in mind? Call, WhatsApp or send an enquiry: whichever suits you."
      pageName="Contact"
      onHomeClick={onHomeClick}
      actions={
        <>
          <a className="ph-btn ph-btn--primary" href={PHONE_HREF}>
            <Phone aria-hidden="true" /> Call Us
          </a>
          <a className="ph-btn ph-btn--whatsapp" href={WHATSAPP_HREF} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" /> WhatsApp
          </a>
          <button type="button" className="ph-btn ph-btn--ghost" onClick={scrollToForm}>
            <Send aria-hidden="true" /> Send Enquiry
          </button>
        </>
      }
      visual={<ContactShowcase />}
    />
  );
};

export default ContactHero;
