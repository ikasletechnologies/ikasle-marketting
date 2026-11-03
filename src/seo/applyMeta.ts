import { SITE_NAME, type PageMeta } from './meta.ts';

/** Updates (or creates) a <meta> tag identified by name= or property=. */
function setMeta(attr: 'name' | 'property', key: string, content: string | undefined) {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content === undefined) {
    element?.remove();
    return;
  }
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

function setCanonical(href: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = href;
}

/** Lightweight document-head updater: no dependency, idempotent across navigations. */
export function applyPageMeta(meta: PageMeta) {
  const origin = window.location.origin;
  const url = origin + meta.path;
  const image = meta.image.startsWith('http') ? meta.image : origin + meta.image;

  document.title = meta.title;
  setMeta('name', 'description', meta.description);
  setMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : undefined);
  setCanonical(url);

  setMeta('property', 'og:site_name', SITE_NAME);
  setMeta('property', 'og:type', meta.type);
  setMeta('property', 'og:title', meta.title);
  setMeta('property', 'og:description', meta.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', image);
  setMeta('property', 'article:published_time', meta.publishedAt);

  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', meta.title);
  setMeta('name', 'twitter:description', meta.description);
  setMeta('name', 'twitter:image', image);
}
