import React from 'react';
import { ArrowRight } from 'lucide-react';
import heroArtwork from '../../../assets/home-hero-growth.png';
import GlowCursor from '../../effects/GlowCursor';
import Magnet from '../../effects/Magnet';
import './HeroSection.css';

export interface HeroSectionProps {
  onStartJourney?: () => void;
  onExploreServices?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartJourney,
  onExploreServices,
}) => {
  return (
    <section className="hero-section" id="home" aria-labelledby="home-hero-title">
      <GlowCursor
        className="hero-cursor-glow"
        color="#00a99d"
        secondaryColor="#2178a7"
        intensity={0.82}
        trailWidth={4}
        linger={1.05}
        glow={0.75}
        hotspot={0.5}
        followSpeed={0.72}
        grain={0.02}
        clickBurst
        quality="medium"
        theme="light"
        maxDevicePixelRatio={1.5}
        blendMode="normal"
        style={undefined}
      />

      <img className="hero-background" src={heroArtwork} alt="" aria-hidden="true" />

      <div className="hero-container">
        <div className="hero-content">
          <p className="hero-overline">DIGITAL MARKETING. REAL DIRECTION.</p>

          <h1 className="hero-title" id="home-hero-title">
            Turn digital reach
            <span>into <strong>brand growth.</strong></span>
          </h1>

          <p className="hero-description">
            Strategy, social media, SEO and creative campaigns that move your business forward.
          </p>

          <div className="hero-actions">
            <Magnet
              padding={78}
              magnetStrength={4.8}
              maxOffset={11}
              exclusive
              axis="both"
              tilt={2.2}
              scale={1.015}
              spring={{ stiffness: 190, damping: 18, mass: 0.85 }}
              wrapperClassName="hero-magnet hero-magnet--primary"
              innerClassName="hero-magnet-inner"
              onActiveChange={undefined}
              style={undefined}
            >
              <button type="button" className="hero-btn-primary" onClick={onExploreServices}>
                <span>Explore Services</span>
                <ArrowRight size={19} className="hero-btn-arrow" />
              </button>
            </Magnet>

            <Magnet
              padding={70}
              magnetStrength={6}
              maxOffset={8}
              exclusive
              axis="both"
              tilt={1.5}
              scale={1.01}
              spring={{ stiffness: 180, damping: 19, mass: 0.9 }}
              wrapperClassName="hero-magnet hero-magnet--secondary"
              innerClassName="hero-magnet-inner"
              onActiveChange={undefined}
              style={undefined}
            >
              <button type="button" className="hero-btn-secondary" onClick={onStartJourney}>
                <span>Let’s Talk</span>
              </button>
            </Magnet>
          </div>

          <p className="hero-pillars" aria-label="Strategy, Creativity, Growth">
            <span>Strategy</span><i aria-hidden="true" />
            <span>Creativity</span><i aria-hidden="true" />
            <span>Growth</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
