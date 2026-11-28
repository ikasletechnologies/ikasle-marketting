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

  // Only open roles get JobPosting data (getJobMeta leaves `job` unset for closed ones).
  if (meta.job && !meta.noindex) {
    const job = meta.job;
    const list = (items: string[]) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
    const [city, region] = job.location.split(',').map((part) => part.trim());
    graph.push({
      '@type': 'JobPosting',
      title: job.title,
      description: [
        ...job.about.map((paragraph) => `<p>${paragraph}</p>`),
        '<p><strong>Key responsibilities</strong></p>', list(job.responsibilities),
        '<p><strong>Qualifications</strong></p>', list(job.qualifications),
      ].join(''),
      identifier: { '@type': 'PropertyValue', name: SITE_NAME, value: job.id },
      datePosted: job.postedAt,
      ...(job.deadline ? { validThrough: `${job.deadline}T23:59:59+05:30` } : {}),
      employmentType: { 'Full-time': 'FULL_TIME', 'Part-time': 'PART_TIME', Internship: 'INTERN', Contract: 'CONTRACTOR' }[job.employmentType],
      hiringOrganization: { '@type': 'Organization', name: SITE_NAME, sameAs: origin, logo: `${origin}/logo-clean.png` },
      jobLocation: {
        '@type': 'Place',
        address: { '@type': 'PostalAddress', addressLocality: city, addressRegion: region, addressCountry: 'IN' },
      },
      ...(job.workMode === 'Remote' ? { jobLocationType: 'TELECOMMUTE', applicantLocationRequirements: { '@type': 'Country', name: 'India' } } : {}),
      skills: job.skills.join(', '),
      experienceRequirements: job.experience,
      directApply: true,
      url,
    });
  }

  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': graph,
  });
}

