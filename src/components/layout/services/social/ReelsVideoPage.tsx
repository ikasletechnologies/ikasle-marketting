import React from 'react';
import { gsap } from 'gsap';
import { BarChart3, CalendarDays, Captions, Check, FileText, Lightbulb, Music, Play, Target, UsersRound, Video } from 'lucide-react';
import { Layer, ServiceDetailTemplate, type ServiceTemplateData, type ServicePageProps } from '../template/ServiceDetailTemplate';
import { Lines, Phone, ProductScene, Sprig } from '../template/ServiceArt';
import { swaySprigs } from '../template/artMotion';
import './ReelsVideoPage.css';

const PhoneVideo: React.FC<{ variant?: 0 | 1 | 2 }> = ({ variant = 0 }) => (
  <>
    <ProductScene variant={variant} />
    <span className="rl-status">9:41</span>
    <span className="rl-play"><i className="rl-ring" /><Play /></span>
    <span className="rl-controls"><span className="rl-progress"><i /></span></span>
  </>
);

const HeroVisual = (
  <div className="ss-stage rl-hero-stage">
    <Layer className="rl-l-editor" depth={6} float={false}>
      <div className="rl-editor">
        <div className="rl-editor-bar"><i /><i /><i /></div>
        <div className="rl-editor-body">
          <div className="rl-editor-side"><Lines n={6} light /></div>
          <div className="rl-editor-preview">{[0, 1, 2].map((v) => <span key={v}><ProductScene variant={v as 0 | 1 | 2} /></span>)}</div>
        </div>
        <div className="rl-timeline">
          {[[4, 30, 'a'], [38, 22, 'b'], [64, 30, 'a'], [8, 42, 'c'], [54, 36, 'd'], [2, 64, 'e'], [70, 26, 'c']].map(([l, w, c], i) => (
            <i key={i} className={`rl-clip rl-clip-${c}`} style={{ left: `${l}%`, width: `${w}%`, top: `${[0, 0, 0, 1, 1, 2, 2][i] * 1.25 + 0.4}em` }} />
          ))}
          <span className="rl-playhead" />
        </div>
      </div>
    </Layer>
    <Layer className="rl-l-phone" depth={16}><Phone className="rl-phone"><PhoneVideo /></Phone></Layer>
    <Layer className="rl-l-camera" depth={24}>
      <div className="rl-camera"><span className="rl-cam-top" /><span className="rl-lens"><i className="rl-glint" /></span></div>
    </Layer>
  </div>
);

const DeliverVisual = (
  <div className="ss-deliver-stage rl-deliver-stage">
    <Layer className="rl-l-sprig" depth={0}>
      <svg viewBox="0 0 120 90" className="rl-sprig"><Sprig x={60} y={90} s={1.2} /><Sprig x={62} y={90} s={1} flip /><Sprig x={58} y={90} s={0.8} /></svg>
    </Layer>
    <Layer className="rl-l-spread" depth={0} float={false}>
      <div className="rl-spread">
        <div className="rl-page rl-page-l">
          <h4>Video<br />Creative<br />Plan</h4>
          <span className="sa-book-rule" />
        </div>
        <div className="rl-page rl-page-r">
          <small>Concept</small>
          <Lines n={3} />
          <small>Storyboard</small>
          {[0, 1, 2].map((v) => (
            <div className="rl-board-row" key={v}>
              <b>0{v + 1}</b>
              <span className="rl-frame"><ProductScene variant={v as 0 | 1 | 2} /></span>
            </div>
          ))}
        </div>
      </div>
    </Layer>
    <Layer className="rl-l-mini-phone" depth={0}><Phone className="rl-mini-phone"><PhoneVideo variant={1} /></Phone></Layer>
  </div>
);

const data: ServiceTemplateData = {
  key: 'reels',
  crumb: 'Reels & Video',
  eyebrow: 'REELS & SHORT-FORM VIDEO',
  title: ['Short videos.', 'A clear brand story.'],
  intro: 'Bring your message to life through focused concepts, thoughtful editing and platform-ready vertical video.',
  primaryCta: 'Discuss Your Video Brief',
  heroVisual: HeroVisual,
  overviewTitle: <>Make every second<br />serve the story.</>,
  overviewText: 'We shape short-form video around your audience, message and platform. From an opening hook to the final call to action, each edit is built to communicate clearly and feel consistent with your brand.',
  helpIcon: Lightbulb,
  helps: ['Explaining a product or service', 'Turning existing footage into useful content', 'Building a consistent short-video presence.'],
  scopeTitle: 'What goes into your video.',
  scopeIconStyle: 'circle',
  scope: [
    [Target, 'Concepts & Creative Direction', 'Define the message, format and visual approach.'],
    [FileText, 'Hooks, Scripts & Storyboards', 'Plan a clear opening and sequence.'],
    [Video, 'Footage Review & Editing', 'Select and shape agreed footage into focused edits.'],
    [Captions, 'Captions & Motion Graphics', 'Add readable captions and purposeful branded elements.'],
    [Music, 'Audio & Format Adaptation', 'Prepare agreed audio and platform-ready versions.'],
    [Check, 'Review & Final Exports', 'Refine edits through agreed feedback rounds.'],
  ],
  deliverTitle: <>From the first concept<br />to the final cut.</>,
  deliverables: ['Agreed concepts and creative briefs', 'Scripts or storyboards where included', 'Edited vertical video assets', 'Agreed captions and graphic elements', 'Platform-ready final exports', 'Agreed revision rounds and handover'],
  deliverNote: 'Filming, talent, locations, music licensing, source files and publishing are agreed in scope.',
  deliverVisual: DeliverVisual,
  processTitle: 'A clear workflow for short-form storytelling.',
  processStyle: 'inline',
  steps: [
    ['Brief', 'We learn about your goals, audience and available material.'],
    ['Plan', 'We shape the concept, format and key messages.'],
    ['Edit', 'We create and refine your video edits.'],
    ['Refine', 'We incorporate feedback and prepare final exports.'],
  ],
  faqTitle: 'Your video questions, answered.',
  faqStyle: 'plus-right',
  faqs: [
    ['Can you work with our existing footage?', 'Yes. We review your footage and agree what can be created based on its quality, format and available material.'],
    ['Is filming included?', 'Filming can be included when agreed in scope. We can also work entirely from footage your team already has.'],
    ['Which platforms can the videos be prepared for?', 'We prepare vertical edits for platforms such as Instagram Reels, TikTok, YouTube Shorts and Facebook, with formats agreed in scope.'],
  ],
  relatedTitle: 'Give your videos a connected plan.',
  related: [
    { icon: CalendarDays, title: 'Content Planning & Calendars', text: 'Plan your video content alongside your wider social media activity.', target: 'Content Planning' },
    { icon: UsersRound, title: 'Social Media Management', text: 'Keep your videos and content consistent across your channels.', target: 'Social Media Management' },
    { icon: BarChart3, title: 'Meta Advertising', text: 'Extend your video reach with targeted advertising campaigns.', target: 'Meta Advertising' },
  ],
  ctaTitle: 'Bring your next story into motion.',
  ctaText: 'Let’s discuss your footage, message and video needs.',
  ctaTone: 'blue',
  animate: () => {
    swaySprigs();
    gsap.fromTo('.rl-playhead', { left: '3%' }, { left: '97%', duration: 6, ease: 'none', repeat: -1 });
    gsap.fromTo('.rl-progress i', { scaleX: 0 }, { scaleX: 1, transformOrigin: '0% 50%', duration: 6, ease: 'none', repeat: -1 });
    gsap.fromTo('.rl-ring', { scale: 1, opacity: 0.7 }, { scale: 1.9, opacity: 0, duration: 1.6, ease: 'power2.out', repeat: -1 });
    gsap.to('.rl-clip', { opacity: 0.55, duration: 0.9, stagger: { each: 0.3, from: 'random', repeat: -1, yoyo: true } });
    gsap.to('.rl-glint', { rotation: 360, duration: 8, ease: 'none', repeat: -1 });
    const frames = gsap.utils.toArray<HTMLElement>('.rl-frame');
    const tl = gsap.timeline({ repeat: -1, delay: 1.5 });
    frames.forEach((f) => tl.to(f, { scale: 1.08, boxShadow: '0 0.6em 1.4em #0b2b4c40', duration: 0.45, yoyo: true, repeat: 1, ease: 'power2.inOut' }).to({}, { duration: 0.6 }));
  },
};

export const ReelsVideoPage: React.FC<ServicePageProps> = ({ onNavigate }) => <ServiceDetailTemplate data={data} onNavigate={onNavigate} />;
export default ReelsVideoPage;
