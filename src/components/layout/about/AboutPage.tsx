import React from 'react';
import { AboutHero } from './AboutHero';
import { AboutStory } from './AboutStory';
import { AboutPurpose } from './AboutPurpose';
import { AboutProcess } from './AboutProcess';
import { AboutHowItWorks } from './AboutHowItWorks';
import { AboutCta } from './AboutCta';

export const AboutPage: React.FC<{ onNavigate: (section: string) => void }> = ({ onNavigate }) => {
  return (
    <main>
      <AboutHero onHomeClick={() => onNavigate('Home')} />
      <AboutStory />
      <AboutPurpose />
      <AboutProcess />
      <AboutHowItWorks onContactClick={() => onNavigate('Contact')} />
      <AboutCta onCtaClick={() => onNavigate('Contact')} />
    </main>
  );
};

export default AboutPage;
