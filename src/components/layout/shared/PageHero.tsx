import React, { useCallback, useRef, useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import { useInView, useInterval, usePrefersReducedMotion } from '../../../hooks/motion';
import './PageHero.css';

export interface PageHeroProps {
  /** Used for the heading id (`${id}-title`). */
  id: string;
  badge: string;
  BadgeIcon: LucideIcon;
  /** First title line. */
  titleTop: string;
  /** Text before the rotating word on the second line (may be empty). */
  titleLead?: string;
  /** Rotating words; the first one is what screen readers hear. */
  words: string[];
  description: ReactNode;
  actions?: ReactNode;
  /** Current page name for the breadcrumb. */
  pageName: string;
  onHomeClick?: () => void;
  visual: ReactNode;
}

/** Shared animated hero for inner pages (About, Services, Contact). */
export const PageHero: React.FC<PageHeroProps> = ({
  id,
  badge,
  BadgeIcon,
  titleTop,
  titleLead,
  words,
  description,
  actions,
  pageName,
  onHomeClick,
  visual,
}) => {
  const ref = useRef<HTMLElement>(null);
  const [inView] = useInView(ref);
  const reduced = usePrefersReducedMotion();
  const [wordIndex, setWordIndex] = useState(0);

  const next = useCallback(() => setWordIndex((i) => (i + 1) % words.length), [words.length]);
  useInterval(next, inView && !reduced && words.length > 1 ? 2600 : null);

  const titleId = `${id}-title`;

  return (
    <section className={`ph-section ph-section--${id}`} aria-labelledby={titleId} ref={ref}>
      <div className="ph-bg" aria-hidden="true">
        <span className="ph-blob ph-blob--teal" />
        <span className="ph-blob ph-blob--blue" />
        <span className="ph-blob ph-blob--sky" />
        <span className="ph-grid" />
      </div>

      <div className="ph-container">
        <div className="ph-content">
          <nav className="ph-breadcrumb" aria-label="Breadcrumb" style={{ '--i': 0 } as CSSProperties}>
            <button type="button" onClick={onHomeClick}>Home</button>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{pageName}</span>
          </nav>

          <p className="ph-badge" style={{ '--i': 1 } as CSSProperties}>
            <span className="ph-badge-icon"><BadgeIcon aria-hidden="true" /></span>
            {badge}
          </p>

          <h1 className="ph-title" id={titleId} style={{ '--i': 2 } as CSSProperties}>
            <span className="ph-title-line">{titleTop}</span>
            <span className="ph-title-line">
              {titleLead ? `${titleLead} ` : ''}
              <span className="ph-rotator" aria-hidden="true">
                {words.map((word, i) => (
                  <span key={word} className={`ph-word${i === wordIndex ? ' is-active' : ''}`}>
                    {word}.
                    {i === wordIndex && (
                      <svg className="ph-swoosh" viewBox="0 0 300 16" preserveAspectRatio="none">
                        <path d="M3 11 C70 3 150 2 297 8" pathLength={1} />
                      </svg>
                    )}
                  </span>
                ))}
              </span>
              <span className="ph-sr-only">{words[0]}.</span>
            </span>
          </h1>

          <p className="ph-description" style={{ '--i': 3 } as CSSProperties}>{description}</p>

          {actions && (
            <div className="ph-actions" style={{ '--i': 4 } as CSSProperties}>{actions}</div>
          )}
        </div>

        <div className="ph-visual">{visual}</div>
      </div>
    </section>
  );
};

export default PageHero;
