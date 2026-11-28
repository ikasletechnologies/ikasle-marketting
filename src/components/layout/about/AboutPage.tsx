import React from 'react';
import { AboutHero } from './AboutHero';
import { AboutStory } from './AboutStory';
import { AboutPurpose } from './AboutPurpose';
import { MarqueeStatsSection } from '../home/MarqueeStatsSection';
import { AboutProcess } from './AboutProcess';
import { AboutHowItWorks } from './AboutHowItWorks';
import { AboutCta } from './AboutCta';

export const AboutPage: React.FC<{ onNavigate: (section: string) => void }> = ({ onNavigate }) => {
  return (
    <main>
      <AboutHero onHomeClick={() => onNavigate('Home')} onContactClick={() => onNavigate('Contact')} />
      <AboutStory />
      <AboutPurpose />
      <MarqueeStatsSection />
      <AboutProcess />
      <AboutHowItWorks />
      <AboutCta onCtaClick={() => onNavigate('Contact')} />
    </main>
  );
};

export default AboutPage;
