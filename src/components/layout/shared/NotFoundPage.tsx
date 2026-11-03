import React from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import './NotFoundPage.css';

interface NotFoundPageProps {
  onHomeClick: () => void;
  onServicesClick: () => void;
  onContactClick: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onHomeClick, onServicesClick, onContactClick }) => (
  <main className="not-found">
    <div className="not-found-card">
      <span className="not-found-icon" aria-hidden="true"><Compass size={30} /></span>
      <p className="not-found-code">404</p>
      <h1>This page took a different route.</h1>
      <p>The link may be outdated or mistyped. Let’s get you back on track.</p>
      <div className="not-found-actions">
        <button type="button" className="primary" onClick={onHomeClick}>Go to home <ArrowRight size={18} aria-hidden="true" /></button>
        <button type="button" onClick={onServicesClick}>Explore services</button>
        <button type="button" onClick={onContactClick}>Contact us</button>
      </div>
    </div>
  </main>
);

export default NotFoundPage;
