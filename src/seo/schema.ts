import type { PageMeta } from './meta.ts';
import { SITE_NAME } from './meta.ts';

/** Builds Schema.org JSON-LD graph for Organization/LocalBusiness, WebSite, BreadcrumbList, and BlogPosting. */
export function buildPageJsonLd(origin: string, meta: PageMeta): string {
  const url = origin + meta.path;
  const image = meta.image.startsWith('http') ? meta.image : origin + meta.image;
  const orgId = `${origin}/#organization`;
  const siteId = `${origin}/#website`;

  const graph: Record<string, unknown>[] = [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': orgId,
      name: SITE_NAME,
      url: origin,
      logo: `${origin}/logo-clean.png`,
      image: `${origin}/hero-sculpture.png`,
      telephone: '+91-78451-32962',
      email: 'business@ikasle.in',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '1639/A, 2nd Floor, Hopes, Peelamedu',
        addressLocality: 'Coimbatore',
        addressRegion: 'Tamil Nadu',
        postalCode: '641004',
        addressCountry: 'IN',
      },
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      name: SITE_NAME,
      url: origin,
      publisher: { '@id': orgId },
    },
  ];

  if (!meta.noindex) {
    const segments = meta.path.split('/').filter(Boolean);
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${origin}/`,
      },
      ...segments.map((seg, idx) => {
        const itemPath = '/' + segments.slice(0, idx + 1).join('/');
        const label = seg
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        return {
          '@type': 'ListItem',
          position: idx + 2,
          name: idx === segments.length - 1 ? meta.title.replace(` | ${SITE_NAME}`, '') : label,
          item: `${origin}${itemPath}`,
        };
      }),
    ];

    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    });
  }

  if (meta.type === 'article' && !meta.noindex) {
    graph.push({
      '@type': 'BlogPosting',
      headline: meta.title.replace(` | ${SITE_NAME}`, ''),
      description: meta.description,
      image,
      url,
      datePublished: meta.publishedAt,
      author: { '@id': orgId },
      publisher: { '@id': orgId },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
}

