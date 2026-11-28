import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import './FloatingActions.css';

const WHATSAPP_NUMBER = '917845132962';
const WHATSAPP_MESSAGE = 'Hi IKASLĒ Marketing! I would like to know more about your services.';

/** Sparkle mark used for the AI assistant (launcher and chat header). */
export const AiIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={`ai-icon${className ? ` ${className}` : ''}`} aria-hidden="true">
    <defs>
      <linearGradient id="ai-icon-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffffff" />
        <stop offset="1" stopColor="#b8fff8" />
      </linearGradient>
    </defs>
    <path className="ai-icon-main" fill="url(#ai-icon-grad)" d="M10 5C10.5 9.3 13.7 12.5 18 13C13.7 13.5 10.5 16.7 10 21C9.5 16.7 6.3 13.5 2 13C6.3 12.5 9.5 9.3 10 5Z" />
    <path className="ai-icon-small" fill="#fff" d="M18.5 2C18.7 3.9 20.1 5.3 22 5.5C20.1 5.7 18.7 7.1 18.5 9C18.3 7.1 16.9 5.7 15 5.5C16.9 5.3 18.3 3.9 18.5 2Z" />
    <circle className="ai-icon-dot" cx="19.5" cy="18.5" r="1.4" fill="#fff" />
  </svg>
);

const WhatsAppGlyph: React.FC = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
);

/** Floating WhatsApp shortcut that opens a chat with a prefilled greeting. */
export const WhatsAppButton: React.FC = () => (
  <a
    className="wa-float"
    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with us on WhatsApp"
  >
    <span className="wa-float-ping" aria-hidden="true" />
    <span className="wa-float-badge" aria-hidden="true">1</span>
    <WhatsAppGlyph />
    <span className="wa-float-tip" aria-hidden="true"><b>Chat on WhatsApp</b><small>We usually reply quickly</small></span>
  </a>
);

/** Back-to-top button: appears after scrolling, shows reading progress, and launches the page up. */
export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVisible(window.scrollY > 400);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!launching) return;
    const timer = window.setTimeout(() => setLaunching(false), 900);
    return () => window.clearTimeout(timer);
  }, [launching]);

  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setLaunching(true);
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={`scroll-top${visible ? ' is-visible' : ''}${launching ? ' is-launching' : ''}`}
      onClick={toTop}
      aria-label="Back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
    >
      <svg className="scroll-top-ring" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="21" className="scroll-top-track" />
        <circle cx="24" cy="24" r="21" className="scroll-top-bar" pathLength={1} style={{ strokeDashoffset: 1 - progress }} />
      </svg>
      <span className="scroll-top-arrow" aria-hidden="true"><ArrowUp size={19} strokeWidth={2.4} /></span>
      <span className="scroll-top-trail" aria-hidden="true" />
      <span className="scroll-top-tip" aria-hidden="true">Back to top</span>
    </button>
  );
};
