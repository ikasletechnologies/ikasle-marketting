import React from 'react';
import { Mail, MessageCircle, PhoneCall, Send } from 'lucide-react';
import './CommunicationArtwork.css';

export const CommunicationArtwork: React.FC = () => (
  <div className="communication-artwork" aria-hidden="true">
    <span className="communication-artwork__orbit communication-artwork__orbit--outer" />
    <span className="communication-artwork__orbit communication-artwork__orbit--inner" />

    <span className="communication-artwork__link communication-artwork__link--email" />
    <span className="communication-artwork__link communication-artwork__link--phone" />
    <span className="communication-artwork__link communication-artwork__link--send" />

    <span className="communication-artwork__bubble communication-artwork__bubble--email"><Mail /></span>
    <span className="communication-artwork__bubble communication-artwork__bubble--phone"><PhoneCall /></span>
    <span className="communication-artwork__bubble communication-artwork__bubble--send"><Send /></span>

    <span className="communication-artwork__core">
      <MessageCircle />
      <i />
    </span>

    <span className="communication-artwork__dot communication-artwork__dot--one" />
    <span className="communication-artwork__dot communication-artwork__dot--two" />
    <span className="communication-artwork__dot communication-artwork__dot--three" />
  </div>
);

export default CommunicationArtwork;