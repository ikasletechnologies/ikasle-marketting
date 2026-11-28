import React from 'react';
import { ArrowRight, BriefcaseBusiness, Building2, CalendarDays, Clock3, IndianRupee, Laptop, MapPin, Sparkles } from 'lucide-react';
import { formatJobDate, jobPath, type Job } from '../../../content/careers/jobs';

/** Link that navigates in-app but stays a real <a href> for crawlers and new-tab clicks. */
export const AppLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; onNavigate: (to: string) => void }> = ({ to, onNavigate, children, ...rest }) => (
  <a
    {...rest}
    href={to}
    onClick={(event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      onNavigate(to);
    }}
  >
    {children}
  </a>
);

export const JobMeta: React.FC<{ job: Job }> = ({ job }) => (
  <ul className="cj-meta">
    <li><Clock3 aria-hidden="true" />{job.employmentType}</li>
    <li><BriefcaseBusiness aria-hidden="true" />{job.experience}</li>
    <li><MapPin aria-hidden="true" />{job.location}</li>
    <li><Laptop aria-hidden="true" />{job.workMode}</li>
    {job.salary && <li><IndianRupee aria-hidden="true" />{job.salary}</li>}
  </ul>
);

export const JobCard: React.FC<{ job: Job; onNavigate: (to: string) => void; headingLevel?: 'h2' | 'h3' }> = ({ job, onNavigate, headingLevel: Heading = 'h3' }) => (
  <article className="cj-card">
    <div className="cj-card-top">
      <span className="cj-dept"><Building2 aria-hidden="true" />{job.department}</span>
      {job.featured && <span className="cj-featured"><Sparkles aria-hidden="true" />Featured</span>}
    </div>
    <Heading className="cj-card-title"><AppLink to={jobPath(job.slug)} onNavigate={onNavigate}>{job.title}</AppLink></Heading>
    <p className="cj-card-summary">{job.summary}</p>
    <JobMeta job={job} />
    <div className="cj-card-foot">
      <span className="cj-dates">
        <CalendarDays aria-hidden="true" />
        Posted {formatJobDate(job.postedAt)}
        <i aria-hidden="true">·</i>
        {job.deadline ? `Apply by ${formatJobDate(job.deadline)}` : 'Open until filled'}
      </span>
      <div className="cj-card-actions">
        <AppLink to={jobPath(job.slug)} onNavigate={onNavigate} className="cj-btn cj-btn--ghost" aria-label={`View details for ${job.title}`}>View Details</AppLink>
        <AppLink to={`${jobPath(job.slug)}#apply`} onNavigate={onNavigate} className="cj-btn cj-btn--primary" aria-label={`Apply now for ${job.title}`}>Apply Now <ArrowRight aria-hidden="true" /></AppLink>
      </div>
    </div>
  </article>
);
