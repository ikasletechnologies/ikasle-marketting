import React, { useId, useState } from 'react';
import { ArrowRight, CheckCircle2, Loader2, Mail } from 'lucide-react';
import { subscribeToNewsletter } from '../../services/newsletterService';
import './NewsletterSignup.css';

interface NewsletterSignupProps {
  /** Where the form is shown; stored with the subscriber (e.g. "blog-post", "home"). */
  source: string;
  title?: string;
  text?: string;
  tone?: 'light' | 'dark';
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  source,
  title = 'Growth notes, once a month.',
  text = 'Practical marketing ideas for brands and education providers. No spam, unsubscribe any time.',
  tone = 'light',
}) => {
  const id = useId();
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;
    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '').trim();
    if (!EMAIL_PATTERN.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    setStatus('sending');
    setMessage('');
    try {
      setMessage(await subscribeToNewsletter(email, source, String(form.get('website') || '')));
      setStatus('done');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'We could not subscribe you right now.');
    }
  };

  return (
    <section className={`newsletter newsletter-${tone}`} aria-labelledby={`${id}-title`}>
      <div className="newsletter-copy">
        <span className="newsletter-icon" aria-hidden="true"><Mail size={22} /></span>
        <div>
          <h2 id={`${id}-title`}>{title}</h2>
          <p>{text}</p>
        </div>
      </div>
      {status === 'done' ? (
        <p className="newsletter-success" role="status"><CheckCircle2 size={20} aria-hidden="true" /> {message}</p>
      ) : (
        <form className="newsletter-form" onSubmit={handleSubmit} noValidate>
          <label htmlFor={`${id}-email`} className="newsletter-sr">Email address</label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            required
            maxLength={254}
            aria-invalid={status === 'error'}
            aria-describedby={message ? `${id}-msg` : undefined}
          />
          {/* Honeypot: hidden from people and assistive tech, filled in by naive bots. */}
          <input className="newsletter-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button type="submit" disabled={status === 'sending'}>
            {status === 'sending' ? <><Loader2 size={18} className="newsletter-spin" aria-hidden="true" /> Subscribing…</> : <>Subscribe <ArrowRight size={18} aria-hidden="true" /></>}
          </button>
          {message && <p id={`${id}-msg`} className="newsletter-error" role="alert">{message}</p>}
        </form>
      )}
    </section>
  );
};

export default NewsletterSignup;
