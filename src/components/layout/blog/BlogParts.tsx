import React from 'react';
import type { BlogCategory } from '../../../content/blog/posts';
import { CATEGORY_ICONS, CATEGORY_TONES } from './blogMeta';

/** Anchor that navigates in-app on a plain click but still works with ctrl/cmd-click and for crawlers. */
export const AppLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; onNavigate: (path: string) => void }> = ({
  href,
  onNavigate,
  onClick,
  children,
  ...rest
}) => (
  <a
    href={href}
    onClick={(event) => {
      onClick?.(event);
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      onNavigate(href);
    }}
    {...rest}
  >
    {children}
  </a>
);

export const PostCover: React.FC<{ category: BlogCategory; large?: boolean }> = ({ category, large }) => {
  const Icon = CATEGORY_ICONS[category];
  return (
    <div className={`blog-cover blog-cover-${CATEGORY_TONES[category]}${large ? ' blog-cover-large' : ''}`} aria-hidden="true">
      <span className="blog-cover-ring" />
      <span className="blog-cover-ring blog-cover-ring-2" />
      <Icon size={large ? 56 : 40} strokeWidth={1.6} />
    </div>
  );
};
