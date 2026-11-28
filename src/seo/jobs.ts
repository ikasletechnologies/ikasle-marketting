/**
 * Meta for /careers/jobs/<slug>. Kept apart from pages.ts so the careers chunk does not
 * bundle the blog content. Open roles carry `job`, which adds JobPosting structured data;
 * closed roles are noindex and never described as active vacancies.
 */
import { JOBS, getJob, isAcceptingApplications, jobPath, type Job } from '../content/careers/jobs.ts';
import { NOT_FOUND_SECTION } from '../routes.ts';
import { DEFAULT_OG_IMAGE, SITE_NAME, getSectionMeta, titleFor, type PageMeta } from './meta.ts';

export const getJobMeta = (slug: string): PageMeta => buildJobMeta(getJob(slug));

/** Meta for a job; undefined → "not found". */
export function buildJobMeta(job: Job | undefined): PageMeta {
  if (!job) return { ...getSectionMeta(NOT_FOUND_SECTION), title: titleFor('Job not found') };
  const open = isAcceptingApplications(job);
  return {
    title: `${job.title}${open ? '' : ' (Closed)'} – ${job.location.split(',')[0]} | Careers at ${SITE_NAME}`,
    description: open
      ? `${job.title} (${job.employmentType}, ${job.workMode}, ${job.experience}) at ${SITE_NAME}. ${job.summary}`
      : `This ${job.title} position at ${SITE_NAME} is no longer accepting applications. See our current openings.`,
    path: jobPath(job.slug),
    image: DEFAULT_OG_IMAGE,
    type: 'website',
    noindex: !open,
    publishedAt: job.postedAt,
    job: open ? job : undefined,
  };
}

/** Every public job page: open roles are indexable, closed roles are noindex. */
export const getJobPages = (): PageMeta[] => JOBS.filter((job) => job.status !== 'draft').map((job) => buildJobMeta(job));
