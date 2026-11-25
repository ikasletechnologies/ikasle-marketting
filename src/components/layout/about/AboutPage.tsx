import React from 'react';
import { AboutHero } from './AboutHero';
import { AboutStory } from './AboutStory';
import { AboutPurpose } from './AboutPurpose';
import { AboutProcess } from './AboutProcess';
import { AboutValues } from './AboutValues';
import { AboutCta } from './AboutCta';

export const AboutPage: React.FC<{ onNavigate: (section: string) => void }> = ({ onNavigate }) => {
  return (
    <main>
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
