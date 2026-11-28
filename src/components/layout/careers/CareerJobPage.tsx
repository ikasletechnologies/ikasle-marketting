import React, { useEffect, useState } from 'react';
import {
  ArrowLeft, ArrowRight, BadgeCheck, Building2, CalendarClock, CalendarDays, Check, CheckCircle2, Clock3, Copy, Hash,
  IndianRupee, Laptop, Link2, Mail, MapPin, SearchX, Share2, BriefcaseBusiness, Lock,
} from 'lucide-react';
import { WHAT_WE_OFFER, formatJobDate, getJob, isAcceptingApplications, jobPath, listedJobs } from '../../../content/careers/jobs';
import { getJobMeta } from '../../../seo/jobs';
import { applyPageMeta } from '../../../seo/applyMeta';
import { AppLink, JobCard, JobMeta } from './CareerParts';
import { JobApplicationForm } from './JobApplicationForm';
import './CareersPage.css';

interface CareerJobPageProps {
  slug: string;
  onNavigate: (to: string) => void;
}

const scrollToApply = () => document.getElementById('apply')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export const CareerJobPage: React.FC<CareerJobPageProps> = ({ slug, onNavigate }) => {
  const job = getJob(slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    applyPageMeta(getJobMeta(slug));
  }, [slug]);

  // "Apply Now" from the listing links to #apply; wait for the app's scroll-to-top to finish first.
  useEffect(() => {
    if (window.location.hash !== '#apply') return;
    const timer = window.setTimeout(scrollToApply, 650);
    return () => window.clearTimeout(timer);
  }, [slug]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  if (!job) {
    return (
      <main className="cj-page">
        <section className="cj-shell cj-notfound">
          <div className="cj-empty" role="status">
            <SearchX aria-hidden="true" />
            <h1>We couldn’t find that job</h1>
            <p>The position may have been filled or the link may be incorrect. Take a look at our current openings instead.</p>
            <AppLink to="/careers" onNavigate={onNavigate} className="cj-btn cj-btn--primary">View all jobs <ArrowRight aria-hidden="true" /></AppLink>
          </div>
        </section>
      </main>
    );
  }

  const open = isAcceptingApplications(job);
  const url = typeof window === 'undefined' ? jobPath(job.slug) : `${window.location.origin}${jobPath(job.slug)}`;
  const shareText = `${job.title} at IKASLĒ Marketing`;
  const related = listedJobs().filter((item) => item.id !== job.id)
    .sort((a, b) => Number(b.department === job.department) - Number(a.department === job.department))
    .slice(0, 3);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      window.prompt('Copy this link:', url);
    }
  };
  const nativeShare = () => navigator.share?.({ title: shareText, url }).catch(() => undefined);

  const overview: [React.ElementType, string, string][] = [
    [Hash, 'Job ID', job.id],
    [Building2, 'Department', job.department],
    [MapPin, 'Location', job.location],
    [Clock3, 'Employment type', job.employmentType],
    [BriefcaseBusiness, 'Experience', job.experience],
    [Laptop, 'Work mode', job.workMode],
    [IndianRupee, 'Salary', job.salary ?? 'Not disclosed'],
    [CalendarDays, 'Posted on', formatJobDate(job.postedAt)],
    [CalendarClock, 'Apply by', job.deadline ? formatJobDate(job.deadline) : 'Open until filled'],
  ];

  return (
    <main className="cj-page cj-detail">
      <section className="cj-hero cj-hero--detail" aria-labelledby="cj-job-title">
        <div className="cj-hero-bg" aria-hidden="true"><span /><span /></div>
        <div className="cj-shell">
          <nav className="cj-breadcrumb" aria-label="Breadcrumb">
            <AppLink to="/" onNavigate={onNavigate}>Home</AppLink><span aria-hidden="true">/</span>
            <AppLink to="/careers" onNavigate={onNavigate}>Careers</AppLink><span aria-hidden="true">/</span>
            <span aria-current="page">{job.title}</span>
          </nav>
          <div className="cj-detail-tags">
            <span className="cj-dept"><Building2 aria-hidden="true" />{job.department}</span>
            <span className={`cj-status ${open ? 'is-open' : 'is-closed'}`}>{open ? <><i aria-hidden="true" />Actively hiring</> : <><Lock aria-hidden="true" />No longer accepting applications</>}</span>
          </div>
          <h1 id="cj-job-title">{job.title}</h1>
          <p className="cj-lead">{job.summary}</p>
          <JobMeta job={job} />
          <div className="cj-hero-actions">
            {open && <button type="button" className="cj-btn cj-btn--primary" onClick={scrollToApply}>Apply for This Position <ArrowRight aria-hidden="true" /></button>}
            <AppLink to="/careers" onNavigate={onNavigate} className="cj-btn cj-btn--ghost"><ArrowLeft aria-hidden="true" />Back to All Jobs</AppLink>
          </div>
        </div>
      </section>

      <div className="cj-shell cj-detail-grid">
        <article className="cj-content">
          <section aria-labelledby="cj-about">
            <h2 id="cj-about">About the role</h2>
            {job.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
          <section aria-labelledby="cj-resp">
            <h2 id="cj-resp">Key responsibilities</h2>
            <ul className="cj-list">{job.responsibilities.map((item) => <li key={item}><CheckCircle2 aria-hidden="true" />{item}</li>)}</ul>
          </section>
          <section aria-labelledby="cj-skills">
            <h2 id="cj-skills">Required skills</h2>
            <ul className="cj-chips">{job.skills.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section aria-labelledby="cj-quals">
            <h2 id="cj-quals">Qualifications</h2>
            <ul className="cj-list">{job.qualifications.map((item) => <li key={item}><BadgeCheck aria-hidden="true" />{item}</li>)}</ul>
          </section>
          <section aria-labelledby="cj-pref">
            <h2 id="cj-pref">Preferred skills</h2>
            <ul className="cj-chips cj-chips--soft">{job.preferred.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>
          <section aria-labelledby="cj-offer" className="cj-offer">
            <h2 id="cj-offer">What we offer</h2>
            <ul>{WHAT_WE_OFFER.map((item) => <li key={item}><Check aria-hidden="true" />{item}</li>)}</ul>
          </section>
        </article>

        <aside className="cj-aside" aria-label="Job overview">
          <div className="cj-overview">
            <h2>Job overview</h2>
            <dl>
              {overview.map(([Icon, label, value]) => (
                <div key={label}><dt><Icon aria-hidden="true" />{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
            <p className={`cj-availability ${open ? 'is-open' : 'is-closed'}`}>
              {open ? <><i aria-hidden="true" />Accepting applications</> : <><Lock aria-hidden="true" />Applications closed</>}
            </p>
            {open && <button type="button" className="cj-btn cj-btn--primary cj-btn--block" onClick={scrollToApply}>Apply for This Position <ArrowRight aria-hidden="true" /></button>}
          </div>

          <div className="cj-share">
            <h2><Share2 aria-hidden="true" />Share this job</h2>
            <div>
              <button type="button" onClick={copyLink} aria-label="Copy job link">{copied ? <Check /> : <Copy />}<span>{copied ? 'Copied' : 'Copy link'}</span></button>
              <a href={`https://wa.me/?text=${encodeURIComponent(`${shareText} ${url}`)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp"><Link2 /><span>WhatsApp</span></a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn"><Link2 /><span>LinkedIn</span></a>
              <a href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(url)}`} aria-label="Share by email"><Mail /><span>Email</span></a>
              {typeof navigator !== 'undefined' && 'share' in navigator && <button type="button" onClick={nativeShare} aria-label="More sharing options"><Share2 /><span>More</span></button>}
            </div>
          </div>
        </aside>
      </div>

      <section id="apply" className="cj-apply" aria-labelledby="cj-apply-title">
        <div className="cj-shell cj-apply-inner">
          <header>
            <p className="cj-eyebrow">Application form</p>
            <h2 id="cj-apply-title">{open ? <>Apply for <em>{job.title}</em></> : 'This position is closed'}</h2>
            <p>{open ? 'Fields marked * are required. It takes about five minutes.' : 'We are no longer accepting applications for this role. Take a look at our other openings below.'}</p>
          </header>
          {open ? <JobApplicationForm job={job} /> : (
            <div className="cj-empty">
              <Lock aria-hidden="true" />
              <h3>Applications closed</h3>
              <AppLink to="/careers" onNavigate={onNavigate} className="cj-btn cj-btn--primary">See open positions <ArrowRight aria-hidden="true" /></AppLink>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="cj-related" aria-labelledby="cj-related-title">
          <div className="cj-shell">
            <div className="cj-results-head">
              <h2 id="cj-related-title">Related openings</h2>
              <AppLink to="/careers" onNavigate={onNavigate} className="cj-link">View all jobs <ArrowRight aria-hidden="true" /></AppLink>
            </div>
            <div className="cj-grid cj-grid--3">{related.map((item) => <JobCard key={item.id} job={item} onNavigate={onNavigate} />)}</div>
          </div>
        </section>
      )}
    </main>
  );
};

export default CareerJobPage;
