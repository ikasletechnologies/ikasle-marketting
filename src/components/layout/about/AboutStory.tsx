import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import storyImage from '../../../assets/about-story-workspace.png';
import './AboutStory.css';

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const strengths = ['Strategy', 'Social Media', 'SEO', 'Branding'];

export const AboutStory: React.FC = () => {
  const root = useRef<HTMLElement>(null);

  // Image unveils with a clip-path wipe and drifts in parallax; copy follows line by line.
  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.about-story-image-wrap', { clipPath: 'inset(0 100% 0 0 round 13px)' }, {
        clipPath: 'inset(0 0% 0 0 round 13px)', duration: 1.4, ease: 'expo.out',
        scrollTrigger: { trigger: '.about-story-inner', start: 'top 75%', once: true },
      });
      gsap.fromTo('.about-story-image', { scale: 1.3, yPercent: -6 }, {
        scale: 1.3, yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: '.about-story-image-wrap', start: 'top bottom', end: 'bottom top', scrub: true },
      });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.about-story-copy', start: 'top 80%', once: true },
      });
      tl.from('.about-story-eyebrow', { opacity: 0, x: -24, duration: 0.8 });
      SplitText.create('.about-story-copy h2', {
        type: 'lines',
        mask: 'lines',
        autoSplit: true,
        onSplit: (self) => tl.from(self.lines, { yPercent: 110, duration: 1, stagger: 0.12, ease: 'expo.out' }, 0.1),
      });
      tl.from('.about-story-copy p', { opacity: 0, y: 24, duration: 0.9, stagger: 0.15 }, 0.5)
        .from('.about-story-tags li', { opacity: 0, scale: 0.6, y: 12, duration: 0.7, stagger: 0.09, ease: 'back.out(2)' }, 0.9);
    });
  }, { scope: root });

  return (
    <section ref={root} className="about-story" aria-labelledby="about-story-title">
      <div className="about-story-inner">
        <figure className="about-story-image-wrap cursor-target" data-cursor-label="Our story">
          <img className="about-story-image" src={storyImage} alt="A brand strategist developing campaign ideas at a desk" />
        </figure>
        <div className="about-story-copy">
          <span className="about-story-eyebrow">OUR STORY</span>
          <h2 id="about-story-title">Built around your brand.<br />Focused on what comes next.</h2>
          <p>IKASLÉ Marketing brings together digital strategy, social media, SEO and branding. We connect your business goals with clear ideas and thoughtful execution.</p>
          <p>From defining your message to shaping your campaigns, our approach starts with understanding your business.</p>
          <ul className="about-story-tags" aria-label="Our core strengths">
            {strengths.map((strength) => <li className="cursor-target" key={strength}>{strength}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
