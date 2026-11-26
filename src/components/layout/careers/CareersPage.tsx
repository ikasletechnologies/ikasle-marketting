import React, { useMemo, useState } from 'react';
import { ArrowRight, MapPin, Search, SearchX, X } from 'lucide-react';
import { listedJobs } from '../../../content/careers/jobs';
import { AppLink, JobCard } from './CareerParts';
import './CareersPage.css';

const PAGE_SIZE = 6;

interface Filters {
  query: string;
  department: string;
  experience: string;
  type: string;
  location: string;
  workMode: string;
}

const EMPTY: Filters = { query: '', department: '', experience: '', type: '', location: '', workMode: '' };
const unique = (values: string[]) => [...new Set(values)].sort();

interface CareersPageProps {
  onNavigate: (to: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const jobs = useMemo(() => listedJobs(), []);
  const [filters, setFilters] = useState<Filters>(EMPTY);
  const [visible, setVisible] = useState(PAGE_SIZE);

  const options = useMemo(() => ({
    department: unique(jobs.map((job) => job.department)),
    experience: ['0-2 years', '2-5 years', '5+ years'].filter((band) => jobs.some((job) => job.experienceBand === band)),
    type: unique(jobs.map((job) => job.employmentType)),
    location: unique(jobs.map((job) => job.location)),
    workMode: unique(jobs.map((job) => job.workMode)),
  }), [jobs]);

  const results = useMemo(() => {
    const words = filters.query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    return jobs.filter((job) => {
      const haystack = [job.title, job.department, job.summary, ...job.skills].join(' ').toLowerCase();
      return words.every((word) => haystack.includes(word))
        && (!filters.department || job.department === filters.department)
        && (!filters.experience || job.experienceBand === filters.experience)
        && (!filters.type || job.employmentType === filters.type)
        && (!filters.location || job.location === filters.location)
        && (!filters.workMode || job.workMode === filters.workMode);
    });
  }, [jobs, filters]);

  const update = (key: keyof Filters) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters((current) => ({ ...current, [key]: event.target.value }));
    setVisible(PAGE_SIZE);
  };
  const clear = () => { setFilters(EMPTY); setVisible(PAGE_SIZE); };
  const active = Object.values(filters).some(Boolean);
  const departments = options.department.length;

  const select = (key: Exclude<keyof Filters, 'query'>, label: string, values: string[]) => (
    <label className="cj-filter">
      <span>{label}</span>
      <select value={filters[key]} onChange={update(key)} aria-label={`Filter by ${label.toLowerCase()}`}>
        <option value="">All</option>
        {values.map((value) => <option key={value} value={value}>{value}</option>)}
      </select>
    </label>
  );

  return (
    <main className="cj-page">
      <section className="cj-hero" aria-labelledby="cj-title">
        <div className="cj-hero-bg" aria-hidden="true"><span /><span /></div>
        <div className="cj-shell">
          <nav className="cj-breadcrumb" aria-label="Breadcrumb">
            <AppLink to="/" onNavigate={onNavigate}>Home</AppLink><span aria-hidden="true">/</span>
            <span aria-current="page">Careers</span>
          </nav>
          <p className="cj-eyebrow">Careers at IKASLĒ</p>
          <h1 id="cj-title">Build your future <em>with IKASLE.</em></h1>
          <p className="cj-lead">Join a team of designers, editors and marketers in Coimbatore who help brands grow through strategy, creativity and technology.</p>

          <div className="cj-search">
            <Search aria-hidden="true" />
            <input type="search" value={filters.query} onChange={update('query')} placeholder="Search by job title, skill or keyword" aria-label="Search jobs" />
            {filters.query && <button type="button" onClick={() => setFilters((current) => ({ ...current, query: '' }))} aria-label="Clear search"><X /></button>}
          </div>

          <ul className="cj-stats" aria-label="Hiring overview">
            <li><b>{jobs.length}</b>open {jobs.length === 1 ? 'position' : 'positions'}</li>
            <li><b>{departments}</b>{departments === 1 ? 'team' : 'teams'} hiring</li>
            <li><b><MapPin aria-hidden="true" /></b>Coimbatore, Tamil Nadu</li>
          </ul>
        </div>
      </section>

      <section className="cj-jobs" aria-labelledby="cj-jobs-title">
        <div className="cj-shell">
          <div className="cj-toolbar">
            <div className="cj-filters">
              {select('department', 'Department', options.department)}
              {select('experience', 'Experience', options.experience)}
              {select('type', 'Employment type', options.type)}
              {select('location', 'Location', options.location)}
              {select('workMode', 'Work mode', options.workMode)}
            </div>
            <button type="button" className="cj-clear" onClick={clear} disabled={!active}><X aria-hidden="true" />Clear filters</button>
          </div>

          <div className="cj-results-head">
            <h2 id="cj-jobs-title">Open positions</h2>
            <p aria-live="polite">{active ? `${results.length} of ${jobs.length} positions match your filters` : `${jobs.length} open ${jobs.length === 1 ? 'position' : 'positions'}`}</p>
          </div>

          {results.length > 0 ? (
            <>
              <div className="cj-grid">
                {results.slice(0, visible).map((job) => <JobCard key={job.id} job={job} onNavigate={onNavigate} />)}
              </div>
              {visible < results.length && (
                <div className="cj-more">
                  <button type="button" className="cj-btn cj-btn--ghost" onClick={() => setVisible((count) => count + PAGE_SIZE)}>
                    Load more positions ({results.length - visible} more)
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="cj-empty" role="status">
              <SearchX aria-hidden="true" />
              {jobs.length === 0 ? (
                <>
                  <h3>No open positions right now</h3>
                  <p>We are not hiring for any role at the moment. You can still introduce yourself and we will keep your details for future openings.</p>
                  <AppLink to="/contact" onNavigate={onNavigate} className="cj-btn cj-btn--primary">Get in touch <ArrowRight aria-hidden="true" /></AppLink>
                </>
              ) : (
                <>
                  <h3>No jobs match your search</h3>
                  <p>Try a different keyword or remove some filters to see more positions.</p>
                  <button type="button" className="cj-btn cj-btn--primary" onClick={clear}>Clear all filters</button>
                </>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CareersPage;
