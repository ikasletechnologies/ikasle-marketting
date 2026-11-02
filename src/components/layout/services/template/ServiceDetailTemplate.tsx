import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronRight, Info, Minus, Plus, type LucideIcon } from 'lucide-react';
import './ServiceDetailTemplate.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export interface RelatedItem {
  title: string;
  text: string;
  /** App section name to open. */
  target: string;
  icon?: LucideIcon;
  thumb?: React.ReactNode;
}

type SectionKey = 'overview' | 'scope' | 'deliver' | 'process' | 'faq' | 'related';

const DEFAULT_LABELS: Record<SectionKey, string> = {
  overview: 'OVERVIEW', scope: 'SCOPE', deliver: 'DELIVERABLES', process: 'PROCESS', faq: 'FAQ', related: 'RELATED SERVICES',
};

export interface ServiceTemplateData {
  /** Modifier class for page-specific visual styles. */
  key: string;
  /** Parent service shown in the breadcrumb and the CTA back link. Defaults to Social Media Marketing. */
  parent?: { crumb: string; section: string };
  crumb: string;
  eyebrow: string;
  title: [string, string];
  /** accent: second title line in teal (default). plain: both lines navy. */
  titleTone?: 'accent' | 'plain';
  /** Gives the hero copy more width for longer headlines. */
  heroWide?: boolean;
  intro: string;
  primaryCta: string;
  heroVisual: React.ReactNode;
  /** Section eyebrows; an empty string hides one. */
  labels?: Partial<Record<SectionKey, string>>;

  /** Three key benefits shown in a strip under the hero. */
  highlights?: [LucideIcon, string, string][];
  highlightStyle?: 'circle' | 'plain';
  highlightsTinted?: boolean;
  /** Shows the highlights inside a rounded tinted card instead of a full-width strip. */
  highlightsCard?: boolean;

  overviewTitle: React.ReactNode;
  overviewText: string;
  helpIcon?: LucideIcon;
  helpIntro?: string;
  helps: string[];
  /** Icon + title + description rows; replaces the plain `helps` list when set. */
  helpItems?: [LucideIcon, string, string][];

  scopeTitle?: string;
  scopeIntro?: string;
  scopeIconStyle: 'circle' | 'plain' | 'top';
  scope: [LucideIcon, string, string][];

  deliverTitle: React.ReactNode;
  deliverIntro?: string;
  /** Plain items, or [title, description] pairs. */
  deliverables: (string | [string, string])[];
  deliverColumns?: 1 | 2;
  deliverNote: string;
  deliverVisual: React.ReactNode;
  deliverStyle?: 'panel' | 'full';

  processTitle?: string;
  processIntro?: string;
  processStyle: 'inline' | 'line' | 'centered' | 'cards' | 'badge';
  stepIcons?: LucideIcon[];
  steps: [string, string][];

  faqTitle?: React.ReactNode;
  faqStyle: 'plus-left' | 'plus-right' | 'chevron' | 'chevron-left';
  /** split: heading beside the list. paired: FAQ and related services side by side. */
  faqLayout?: 'stacked' | 'split' | 'paired';
  faqs: [string, string][];

  relatedTitle?: string;
  relatedIntro?: string;
  relatedStyle?: 'default' | 'arrow';
  related: RelatedItem[];

  ctaEyebrow?: string;
  ctaTitle: React.ReactNode;
  ctaText?: React.ReactNode;
  ctaButton?: string;
  ctaIcon?: LucideIcon;
  ctaTone: 'blue' | 'navy' | 'dark';
  ctaInset?: boolean;

  /** Page-specific looping animations; runs only when reduced motion is off. */
  animate?: () => void;
}

export interface ServicePageProps {
  onNavigate: (section: string) => void;
}

/**
 * Absolutely-positioned artwork piece. The three nested layers keep GSAP
 * transforms apart: parallax (outer), entrance (middle) and floating (inner).
 */
export const Layer: React.FC<{ className: string; depth?: number; float?: boolean; children: React.ReactNode }> = ({ className, depth = 0, float = true, children }) => (
  <div className={`ss-layer ${className}`} data-depth={depth}>
    <div className="ss-in"><div className={float ? 'ss-float' : 'ss-still'}>{children}</div></div>
  </div>
);

const pad = (n: number) => String(n).padStart(2, '0');

export const ServiceDetailTemplate: React.FC<{ data: ServiceTemplateData; onNavigate: (section: string) => void }> = ({ data: d, onNavigate }) => {
  const root = useRef<HTMLElement>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const HelpIcon = d.helpIcon;
  const CtaIcon = d.ctaIcon;
  const toggleLeft = d.faqStyle === 'plus-left' || d.faqStyle === 'chevron-left';
  const parent = d.parent ?? { crumb: 'Social Media', section: 'Social Media Marketing' };
  const label = (k: SectionKey) => d.labels?.[k] ?? DEFAULT_LABELS[k];
  const eyebrow = (k: SectionKey) => (label(k) ? <span className="ss-eyebrow">{label(k)}</span> : null);
  const relatedStyle = d.relatedStyle ?? 'default';
  const faqLayout = d.faqLayout ?? 'stacked';

  useGSAP(() => {
    const mm = gsap.matchMedia();
    const loop = { repeat: -1, yoyo: true, ease: 'sine.inOut' } as const;
    const once = (trigger: string, start = 'top 82%') => ({ trigger, start, once: true });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.timeline({ defaults: { ease: 'expo.out' } })
        .from('.ss-hero-copy > *', { y: 28, opacity: 0, duration: 1, stagger: 0.08 })
        .from('.ss-hero-glow', { scale: 0.6, opacity: 0, duration: 1.6 }, 0.1)
        .from('.ss-hero .ss-in', { y: 60, opacity: 0, scale: 0.88, duration: 1.3, stagger: 0.12, ease: 'back.out(1.3)' }, 0.2);

      gsap.to('.ss-float', { y: -10, duration: 2.8, stagger: { each: 0.55, from: 'start' }, ...loop });
      gsap.to('.ss-hero-glow', { scale: 1.08, duration: 5, ...loop });

      const reveal = (targets: string, trigger: string, vars: gsap.TweenVars = {}) => {
        if (!root.current?.querySelector(trigger)) return;
        gsap.from(targets, { y: 34, opacity: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, ...vars, scrollTrigger: once(trigger) });
      };

      reveal('.ss-highlights article', '.ss-highlights', { stagger: 0.12 });
      reveal('.ss-highlight-icon', '.ss-highlights', { y: 0, scale: 0, rotation: -60, ease: 'back.out(2.2)', delay: 0.2, stagger: 0.12 });
      reveal('.ss-overview-copy > *', '.ss-overview');
      reveal('.ss-help', '.ss-overview', { x: 30, y: 0, delay: 0.15 });
      reveal('.ss-help li', '.ss-help', { x: -14, y: 0, stagger: 0.12, duration: 0.6, delay: 0.45 });
      reveal('.ss-help li svg', '.ss-help', { y: 0, scale: 0, stagger: 0.12, duration: 0.5, delay: 0.55, ease: 'back.out(3)' });

      reveal('.ss-scope > .ss-eyebrow, .ss-scope > h2, .ss-scope > .ss-section-intro', '.ss-scope');
      reveal('.ss-scope-grid article', '.ss-scope-grid', { stagger: 0.09 });
      gsap.to('.ss-scope-icon', { y: -4, duration: 1.8, stagger: { each: 0.25, from: 'random' }, ...loop });

      gsap.timeline({ defaults: { ease: 'expo.out' }, scrollTrigger: once('.ss-deliver', 'top 72%') })
        .from('.ss-deliver-copy > :not(ul)', { y: 30, opacity: 0, duration: 1, stagger: 0.1 })
        .from('.ss-deliver li', { x: -24, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.25)
        .from('.ss-deliver li > svg', { scale: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(3)' }, 0.35)
        .from('.ss-deliver .ss-in', { y: 70, opacity: 0, rotation: (i) => (i % 2 ? 6 : -6), scale: 0.9, duration: 1.3, stagger: 0.14, ease: 'back.out(1.2)' }, 0.1);
      gsap.fromTo('.ss-deliver-stage', { yPercent: 4 }, { yPercent: -4, ease: 'none', scrollTrigger: { trigger: '.ss-deliver', start: 'top bottom', end: 'bottom top', scrub: true } });

      reveal('.ss-process > .ss-container > :not(.ss-steps)', '.ss-process');
      // Step layouts differ, so only animate the pieces this layout renders.
      const has = (sel: string) => Boolean(root.current?.querySelector(sel));
      const steps = gsap.timeline({ scrollTrigger: once('.ss-steps') })
        .from('.ss-steps article', { y: 26, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power3.out' })
        .from('.ss-steps b', { scale: 0, duration: 0.6, stagger: 0.18, ease: 'back.out(3)' }, 0.1);
      if (has('.ss-step-icon')) steps.from('.ss-step-icon', { scale: 0, rotation: -45, duration: 0.6, stagger: 0.18, ease: 'back.out(2.5)' }, 0.25);
      if (has('.ss-connector')) steps.from('.ss-connector', { scaleX: 0, transformOrigin: '0% 50%', duration: 0.7, stagger: 0.18, ease: 'power2.inOut' }, 0.35);
      if (has('.ss-next')) steps.from('.ss-next', { x: -14, opacity: 0, duration: 0.5, stagger: 0.18 }, 0.35);

      reveal('.ss-faq-head > *, .ss-faq-item', '.ss-faq');
      reveal('.ss-related-head > *', '.ss-related');
      reveal('.ss-related-grid article', '.ss-related-grid', { stagger: 0.12 });
      reveal('.ss-cta-copy > *, .ss-cta-actions > *', '.ss-cta', { stagger: 0.1 });
      gsap.to('.ss-cta-wave path', { x: '-=120', duration: 9, ease: 'none', repeat: -1, stagger: 1.5 });

      d.animate?.();
    });

    mm.add('(prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
      const hero = root.current?.querySelector<HTMLElement>('.ss-hero');
      if (!hero) return;
      const movers = gsap.utils.toArray<HTMLElement>('.ss-hero .ss-layer').map((el) => ({
        depth: Number(el.dataset.depth) || 0,
        x: gsap.quickTo(el, 'x', { duration: 0.9, ease: 'power3.out' }),
        y: gsap.quickTo(el, 'y', { duration: 0.9, ease: 'power3.out' }),
      }));
      const move = (e: PointerEvent) => {
        const r = hero.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width - 0.5;
        const ny = (e.clientY - r.top) / r.height - 0.5;
        movers.forEach((m) => { m.x(nx * m.depth); m.y(ny * m.depth * 0.6); });
      };
      const leave = () => movers.forEach((m) => { m.x(0); m.y(0); });
      hero.addEventListener('pointermove', move);
      hero.addEventListener('pointerleave', leave);
      return () => { hero.removeEventListener('pointermove', move); hero.removeEventListener('pointerleave', leave); };
    });
  }, { scope: root });

  const scrollToScope = () => root.current?.querySelector('.ss-scope')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const faqList = (
    <div className={`ss-faq-list ss-faq-${d.faqStyle}`}>
      {d.faqs.map(([q, a], i) => {
        const open = openFaq === i;
        const toggle = d.faqStyle === 'chevron' || d.faqStyle === 'chevron-left' ? <ChevronDown className="ss-faq-chev" /> : <span className="ss-faq-toggle">{open ? <Minus /> : <Plus />}</span>;
        return (
          <div className={`ss-faq-item${open ? ' open' : ''}`} key={q}>
            <button aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : i)}>
              {toggleLeft && toggle}
              <span className="ss-faq-q">{q}</span>
              {!toggleLeft && toggle}
            </button>
            <div className="ss-faq-answer"><div><p>{a}</p></div></div>
          </div>
        );
      })}
    </div>
  );

  const relatedHead = (
    <div className="ss-related-head">
      {eyebrow('related')}
      {d.relatedTitle && <h2>{d.relatedTitle}</h2>}
      {d.relatedIntro && <p className="ss-section-intro">{d.relatedIntro}</p>}
    </div>
  );

  const relatedGrid = (
    <div className={`ss-related-grid ss-related-${relatedStyle}`}>
      {d.related.map(({ icon: Icon, thumb, title, text, target }) => (
        <article key={title} className={thumb ? 'has-thumb' : ''} onClick={relatedStyle === 'arrow' ? () => onNavigate(target) : undefined}>
          {thumb ? <span className="ss-related-thumb">{thumb}</span> : Icon && <span className="ss-related-icon"><Icon /></span>}
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
            {relatedStyle === 'default' && <button onClick={() => onNavigate(target)}>View Service <ArrowRight /></button>}
          </div>
          {relatedStyle === 'arrow' && (
            <button className="ss-related-go" aria-label={`View ${title}`} onClick={(e) => { e.stopPropagation(); onNavigate(target); }}>
              {faqLayout === 'paired' ? <ChevronRight /> : <ArrowRight />}
            </button>
          )}
        </article>
      ))}
    </div>
  );

  return (
    <main className={`ss-page ss-${d.key}`} ref={root}>
      {/* HERO */}
      <section className={`ss-hero${d.heroWide ? ' ss-hero-wide' : ''}${d.titleTone === 'plain' ? ' ss-title-plain' : ''}`}>
        <div className="ss-container ss-hero-inner">
          <div className="ss-hero-copy">
            <nav className="ss-breadcrumb" aria-label="Breadcrumb">
              <button onClick={() => onNavigate('Home')}>Home</button><span>/</span>
              <button onClick={() => onNavigate('Services')}>Services</button><span>/</span>
              <button onClick={() => onNavigate(parent.section)}>{parent.crumb}</button><span>/</span>
              <span className="ss-current">{d.crumb}</span>
            </nav>
            <span className="ss-eyebrow">{d.eyebrow}</span>
            <h1>{d.title[0]}<br /><em>{d.title[1]}</em></h1>
            <p>{d.intro}</p>
            <div className="ss-actions">
              <button className="ss-button primary" onClick={() => onNavigate('Contact')}>{d.primaryCta} <ArrowRight /></button>
              <button className="ss-button ghost" onClick={scrollToScope}>Explore the Service</button>
            </div>
          </div>
          <div className="ss-hero-visual" aria-hidden="true">
            <div className="ss-hero-glow" />
            {d.heroVisual}
          </div>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      {d.highlights && (
        <section className={`ss-highlights ss-hl-${d.highlightStyle ?? 'circle'}${d.highlightsTinted ? ' tinted' : ''}${d.highlightsCard ? ' card' : ''}`}>
          <div className="ss-container ss-highlights-inner">
            {d.highlights.map(([Icon, title, text]) => (
              <article key={title}>
                <span className="ss-highlight-icon"><Icon /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* OVERVIEW + SCOPE */}
      <section className="ss-section">
        <div className="ss-container ss-overview">
          <div className="ss-overview-copy">
            {eyebrow('overview')}
            <h2>{d.overviewTitle}</h2>
            <p>{d.overviewText}</p>
          </div>
          <aside className="ss-help">
            {HelpIcon && <span className="ss-help-icon"><HelpIcon /></span>}
            <div>
              <h3>When this service helps</h3>
              {d.helpIntro && <p className="ss-help-intro">{d.helpIntro}</p>}
              {d.helpItems ? (
                <ul className="ss-help-items">
                  {d.helpItems.map(([Icon, title, text]) => <li key={title}><Icon /><span><b>{title}</b><small>{text}</small></span></li>)}
                </ul>
              ) : (
                <ul>{d.helps.map((h) => <li key={h}><Check />{h}</li>)}</ul>
              )}
            </div>
          </aside>
        </div>

        <div className="ss-container ss-scope">
          {eyebrow('scope')}
          {d.scopeTitle && <h2>{d.scopeTitle}</h2>}
          {d.scopeIntro && <p className="ss-section-intro">{d.scopeIntro}</p>}
          <div className={`ss-scope-grid ss-icons-${d.scopeIconStyle}`}>
            {d.scope.map(([Icon, title, text]) => (
              <article key={title}>
                <span className="ss-scope-icon"><Icon /></span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className={`ss-deliver ss-deliver-${d.deliverStyle ?? 'panel'} ss-deliver-cols${d.deliverColumns ?? 1}`}>
        <div className="ss-container ss-deliver-inner">
          <div className="ss-deliver-copy">
            {eyebrow('deliver')}
            <h2>{d.deliverTitle}</h2>
            {d.deliverIntro && <p className="ss-deliver-intro">{d.deliverIntro}</p>}
            <ul>
              {d.deliverables.map((x) => {
                const [title, desc] = Array.isArray(x) ? x : [x, undefined];
                return <li key={title} className={desc ? 'has-desc' : ''}><Check /><span><b>{title}</b>{desc && <small>{desc}</small>}</span></li>;
              })}
            </ul>
            <p className="ss-deliver-note"><Info />{d.deliverNote}</p>
          </div>
          <div className="ss-deliver-visual" aria-hidden="true">{d.deliverVisual}</div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="ss-section ss-process">
        <div className="ss-container">
          {eyebrow('process')}
          {d.processTitle && <h2>{d.processTitle}</h2>}
          {d.processIntro && <p className="ss-section-intro">{d.processIntro}</p>}
          <div className={`ss-steps ss-steps-${d.processStyle}`}>
            {d.steps.map(([title, text], i) => {
              const last = i === d.steps.length - 1;
              const StepIcon = d.stepIcons?.[i];
              if (d.processStyle === 'line' || d.processStyle === 'centered') {
                return (
                  <article key={title}>
                    <div className="ss-step-top"><b>{i + 1}</b>{!last && <i className="ss-connector" />}</div>
                    <h3>{title}</h3><p>{text}</p>
                  </article>
                );
              }
              const numbered = d.processStyle === 'inline' ? i + 1 : pad(i + 1);
              return (
                <React.Fragment key={title}>
                  <article>
                    <b>{numbered}</b>
                    <div>
                      {StepIcon && <span className="ss-step-icon"><StepIcon /></span>}
                      <h3>{title}</h3><p>{text}</p>
                    </div>
                  </article>
                  {!last && (d.processStyle === 'badge' ? <ChevronRight className="ss-next" /> : <ArrowRight className="ss-next" />)}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ + RELATED */}
      {faqLayout === 'paired' ? (
        <section className="ss-section ss-faq ss-related ss-paired">
          <div className="ss-container ss-paired-inner">
            <div>
              <div className="ss-faq-head">{eyebrow('faq')}{d.faqTitle && <h2>{d.faqTitle}</h2>}</div>
              {faqList}
            </div>
            <div>{relatedHead}{relatedGrid}</div>
          </div>
        </section>
      ) : (
        <>
          <section className={`ss-section ss-faq ss-faq-layout-${faqLayout}`}>
            <div className="ss-container ss-faq-inner">
              <div className="ss-faq-head">{eyebrow('faq')}{d.faqTitle && <h2>{d.faqTitle}</h2>}</div>
              {faqList}
            </div>
          </section>
          <section className="ss-section ss-related">
            <div className="ss-container">{relatedHead}{relatedGrid}</div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className={`ss-cta ss-cta-${d.ctaTone}${d.ctaInset ? ' ss-cta-inset' : ''}`}>
        <div className="ss-cta-band">
          <svg className="ss-cta-wave" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
            {[0, 1, 2].map((n) => {
              let p = `M-240 ${120 + n * 18}`;
              for (let x = -240; x < 1440; x += 240) p += ` q60 ${-40 + n * 6} 120 0 t120 0`;
              return <path key={n} d={p} fill="none" stroke="#fff" strokeOpacity={0.12 - n * 0.03} strokeWidth="2" />;
            })}
          </svg>
          <div className="ss-container ss-cta-inner">
            {CtaIcon && <span className="ss-cta-icon"><CtaIcon /></span>}
            <div className="ss-cta-copy">
              {d.ctaEyebrow && <span className="ss-cta-eyebrow">{d.ctaEyebrow}</span>}
              <h2>{d.ctaTitle}</h2>
              {d.ctaText && <p>{d.ctaText}</p>}
            </div>
            <div className="ss-cta-actions">
              <button className="ss-cta-button" onClick={() => onNavigate('Contact')}>{d.ctaButton ?? d.primaryCta} <ArrowRight /></button>
              <button className="ss-cta-back" onClick={() => onNavigate(parent.section)}><ArrowLeft /> Back to {parent.section}</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
