import React, { useRef } from 'react';
import TargetCursor from '../../effects/TargetCursor';
import { AboutHero } from './AboutHero';
import { AboutStory } from './AboutStory';
import { AboutPurpose } from './AboutPurpose';
import { AboutProcess } from './AboutProcess';
import { AboutValues } from './AboutValues';
import { AboutCta } from './AboutCta';

export const AboutPage: React.FC<{ onNavigate: (section: string) => void }> = ({ onNavigate }) => {
  const mainRef = useRef<HTMLElement>(null);
  return (
    <main ref={mainRef}>
      <TargetCursor spinDuration={2} hideDefaultCursor parallaxOn container={mainRef} />
      <AboutHero onHomeClick={() => onNavigate('Home')} />
      <AboutStory />
      <AboutPurpose />
      <AboutProcess />
      <AboutValues />
      <AboutCta onCtaClick={() => onNavigate('Contact')} />
    </main>
  );
};

export default AboutPage;
