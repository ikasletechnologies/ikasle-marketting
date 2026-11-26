import React, { useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, FileText, Loader2, Send, UploadCloud, X } from 'lucide-react';
import type { Job } from '../../../content/careers/jobs';
import { RESUME_EXTENSIONS, RESUME_MAX_BYTES, sendCareerApplication } from '../../../services/careerService';

const EXPERIENCE = ['Fresher', 'Less than 1 year', '1–2 years', '2–3 years', '3–5 years', '5–8 years', '8+ years'];
const NOTICE = ['Immediate', '15 days', '30 days', '45 days', '60 days', '90 days'];

interface Values {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  experience: string;
  currentCompany: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
  linkedin: string;
  portfolio: string;
  coverLetter: string;
  additionalInfo: string;
  consent: boolean;
}

type Field = keyof Values | 'resume';
type Errors = Partial<Record<Field, string>>;

const INITIAL: Values = {
  fullName: '', email: '', phone: '', location: '', experience: '', currentCompany: '', currentSalary: '', expectedSalary: '',
  noticePeriod: '', linkedin: '', portfolio: '', coverLetter: '', additionalInfo: '', consent: false,
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Indian mobile: optional +91 / 91 prefix, then 10 digits starting with 6–9. */
const isIndianMobile = (value: string) => {
  const digits = value.replace(/[\s-]/g, '').replace(/^(\+91|91)(?=\d{10}$)/, '');
  return /^[6-9]\d{9}$/.test(digits);
};
const isUrl = (value: string) => {
  try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; }
};
const formatSize = (bytes: number) => (bytes < 1024 * 1024 ? `${Math.max(1, Math.round(bytes / 1024))} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`);

const checkResume = (file: File | null): string | undefined => {
  if (!file) return 'Please upload your resume.';
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (!RESUME_EXTENSIONS.includes(extension)) return 'Upload a PDF, DOC or DOCX file.';
  if (file.size > RESUME_MAX_BYTES) return 'Your resume must be 5 MB or smaller.';
  if (file.size === 0) return 'This file is empty. Please choose another.';
  return undefined;
};

function validate(values: Values, resume: File | null): Errors {
  const errors: Errors = {};
  const name = values.fullName.trim();
  if (!name) errors.fullName = 'Please enter your full name.';
  else if (!/^[A-Za-z\s]{2,120}$/.test(name)) errors.fullName = 'Use letters and spaces only.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL.test(values.email.trim())) errors.email = 'Enter a valid email address, like name@example.com.';
  if (!values.phone.trim()) errors.phone = 'Please enter your mobile number.';
  else if (!isIndianMobile(values.phone)) errors.phone = 'Enter a valid 10-digit Indian mobile number.';
  if (!values.location.trim()) errors.location = 'Please enter your current location.';
  if (!values.experience) errors.experience = 'Please select your total experience.';
  if (!values.noticePeriod) errors.noticePeriod = 'Please select your notice period.';
  if (values.linkedin.trim() && (!isUrl(values.linkedin.trim()) || !/linkedin\.com/i.test(values.linkedin))) errors.linkedin = 'Enter your LinkedIn profile URL, starting with https://';
  if (values.portfolio.trim() && !isUrl(values.portfolio.trim())) errors.portfolio = 'Enter a valid URL, starting with https://';
  const letter = values.coverLetter.trim();
  if (!letter) errors.coverLetter = 'Please tell us why you are a good fit for this role.';
  else if (letter.length < 50) errors.coverLetter = `Please write at least 50 characters (${50 - letter.length} more).`;
  const resumeError = checkResume(resume);
  if (resumeError) errors.resume = resumeError;
  if (!values.consent) errors.consent = 'Please accept the privacy policy to continue.';
  return errors;
}

const ORDER: Field[] = ['fullName', 'email', 'phone', 'location', 'experience', 'noticePeriod', 'linkedin', 'portfolio', 'resume', 'coverLetter', 'consent'];

export const JobApplicationForm: React.FC<{ job: Job }> = ({ job }) => {
  const [values, setValues] = useState<Values>(INITIAL);
  const [resume, setResume] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [dragging, setDragging] = useState(false);
  const submitting = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const set = (key: keyof Values) => (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const value = event.target.type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value;
    setValues((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };
  const blur = (key: keyof Values) => () => {
    const fieldError = validate(values, resume)[key];
    setErrors((current) => ({ ...current, [key]: values[key] === '' || values[key] === false ? current[key] : fieldError }));
  };

  const pickFile = (file: File | null) => {
    setResume(file);
    setErrors((current) => ({ ...current, resume: file ? checkResume(file) : undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitting.current) return; // guards against double clicks before the state update lands
    const found = validate(values, resume);
    setErrors(found);
    const first = ORDER.find((field) => found[field]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`)?.focus();
      setStatus('idle');
      return;
    }

    submitting.current = true;
    setStatus('submitting');
    setMessage('');
    try {
      await sendCareerApplication({
        ...values,
        fullName: values.fullName.trim(),
        email: values.email.trim(),
        jobId: job.id,
        position: job.title,
        resume: resume as File,
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'We could not submit your application. Please try again.');
      submitting.current = false;
    }
  };

  if (status === 'success') {
    return (
      <div className="cj-success" role="status">
        <CheckCircle2 aria-hidden="true" />
        <h3>Application submitted</h3>
        <p>Thank you, {values.fullName.trim().split(' ')[0]}. Your application for <b>{job.title}</b> has been received. We have sent a confirmation to <b>{values.email.trim()}</b> and our team will review your profile shortly.</p>
      </div>
    );
  }

  const field = (key: keyof Values, label: string, input: React.ReactNode, options: { required?: boolean; wide?: boolean; hint?: string } = {}) => (
    <div className={`cj-field${options.wide ? ' cj-field--wide' : ''}${errors[key] ? ' has-error' : ''}`}>
      <label htmlFor={`cj-${key}`}>{label}{options.required ? <span aria-hidden="true"> *</span> : <small> (optional)</small>}</label>
      {input}
      {errors[key] ? <p className="cj-error" id={`cj-${key}-error`}><AlertCircle aria-hidden="true" />{errors[key]}</p> : options.hint && <p className="cj-hint">{options.hint}</p>}
    </div>
  );
  const a11y = (key: keyof Values, required = false) => ({
    id: `cj-${key}`,
    'data-field': key,
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `cj-${key}-error` : undefined,
    'aria-required': required || undefined,
    value: values[key] as string,
    onChange: set(key),
    onBlur: blur(key),
    disabled: status === 'submitting',
  });

  return (
    <form ref={formRef} className="cj-form" onSubmit={handleSubmit} noValidate aria-labelledby="cj-apply-title">
      <fieldset className="cj-fieldset">
        <legend>Personal details</legend>
        <div className="cj-form-grid">
          {field('fullName', 'Full name', <input type="text" autoComplete="name" maxLength={120} placeholder="Your full name" {...a11y('fullName', true)} />, { required: true })}
          {field('email', 'Email address', <input type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" {...a11y('email', true)} />, { required: true })}
          {field('phone', 'Mobile number', <input type="tel" inputMode="tel" autoComplete="tel" maxLength={16} placeholder="98765 43210" {...a11y('phone', true)} />, { required: true, hint: 'Indian mobile number, with or without +91.' })}
          {field('location', 'Current location', <input type="text" autoComplete="address-level2" maxLength={120} placeholder="City, State" {...a11y('location', true)} />, { required: true })}
          <div className="cj-field cj-field--wide">
            <label htmlFor="cj-position">Applying for</label>
            <input id="cj-position" type="text" value={`${job.title} (${job.id})`} readOnly />
          </div>
        </div>
      </fieldset>

      <fieldset className="cj-fieldset">
        <legend>Experience</legend>
        <div className="cj-form-grid">
          {field('experience', 'Total experience', <select {...a11y('experience', true)}><option value="">Select experience</option>{EXPERIENCE.map((item) => <option key={item}>{item}</option>)}</select>, { required: true })}
          {field('noticePeriod', 'Notice period', <select {...a11y('noticePeriod', true)}><option value="">Select notice period</option>{NOTICE.map((item) => <option key={item}>{item}</option>)}</select>, { required: true })}
          {field('currentCompany', 'Current company', <input type="text" autoComplete="organization" maxLength={160} placeholder="Company name" {...a11y('currentCompany')} />)}
          {field('currentSalary', 'Current salary', <input type="text" maxLength={60} placeholder="e.g. 4.5 LPA" {...a11y('currentSalary')} />)}
          {field('expectedSalary', 'Expected salary', <input type="text" maxLength={60} placeholder="e.g. 6 LPA" {...a11y('expectedSalary')} />)}
          {field('linkedin', 'LinkedIn profile URL', <input type="url" maxLength={300} placeholder="https://www.linkedin.com/in/your-name" {...a11y('linkedin')} />)}
          {field('portfolio', 'Portfolio / GitHub URL', <input type="url" maxLength={300} placeholder="https://" {...a11y('portfolio')} />, { wide: true, hint: 'Behance, Dribbble, YouTube, Drive, GitHub or your own website.' })}
        </div>
      </fieldset>

      <fieldset className="cj-fieldset">
        <legend>Resume & cover letter</legend>
        <div className={`cj-field cj-field--wide${errors.resume ? ' has-error' : ''}`}>
          <span className="cj-label" id="cj-resume-label">Resume<span aria-hidden="true"> *</span></span>
          {resume && !checkResume(resume) ? (
            <div className="cj-file">
              <FileText aria-hidden="true" />
              <div><b>{resume.name}</b><small>{formatSize(resume.size)}</small></div>
              <button type="button" onClick={() => { pickFile(null); if (fileInput.current) fileInput.current.value = ''; }} aria-label="Remove resume" disabled={status === 'submitting'}><X /></button>
            </div>
          ) : (
            <label
              className={`cj-drop${dragging ? ' is-dragging' : ''}`}
              onDragOver={(event) => { event.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => { event.preventDefault(); setDragging(false); pickFile(event.dataTransfer.files[0] ?? null); }}
            >
              <UploadCloud aria-hidden="true" />
              <b>Drag & drop your resume, or <u>browse</u></b>
              <small>PDF, DOC or DOCX · up to 5 MB</small>
              <input
                ref={fileInput}
                type="file"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={(event) => pickFile(event.target.files?.[0] ?? null)}
                data-field="resume"
                aria-labelledby="cj-resume-label"
                aria-invalid={Boolean(errors.resume)}
                aria-describedby={errors.resume ? 'cj-resume-error' : undefined}
                disabled={status === 'submitting'}
              />
            </label>
          )}
          {errors.resume && <p className="cj-error" id="cj-resume-error"><AlertCircle aria-hidden="true" />{errors.resume}</p>}
        </div>
        <div className="cj-form-grid">
          {field('coverLetter', 'Cover letter', (
            <>
              <textarea rows={6} maxLength={5000} placeholder="Tell us about your experience, the work you are proud of and why this role interests you." {...a11y('coverLetter', true)} />
              <span className="cj-count" aria-hidden="true">{values.coverLetter.trim().length} / 5000</span>
            </>
          ), { required: true, wide: true })}
          {field('additionalInfo', 'Additional information', <textarea rows={3} maxLength={3000} placeholder="Anything else you would like us to know?" {...a11y('additionalInfo')} />, { wide: true })}
        </div>
      </fieldset>

      <div className={`cj-consent${errors.consent ? ' has-error' : ''}`}>
        <label>
          <input type="checkbox" checked={values.consent} onChange={set('consent')} data-field="consent" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'cj-consent-error' : undefined} disabled={status === 'submitting'} />
          <span>I agree that IKASLĒ Marketing may store and use my details to process this application, as described in the <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. <span aria-hidden="true">*</span></span>
        </label>
        {errors.consent && <p className="cj-error" id="cj-consent-error"><AlertCircle aria-hidden="true" />{errors.consent}</p>}
      </div>

      {status === 'error' && <p className="cj-form-alert" role="alert"><AlertCircle aria-hidden="true" />{message}</p>}
      {Object.values(errors).some(Boolean) && status !== 'error' && <p className="cj-form-alert" role="alert"><AlertCircle aria-hidden="true" />Please fix the highlighted fields and try again.</p>}

      <button type="submit" className="cj-btn cj-btn--primary cj-submit" disabled={status === 'submitting'} aria-busy={status === 'submitting'}>
        {status === 'submitting' ? <><Loader2 className="cj-spin" aria-hidden="true" />Submitting application…</> : <>Submit Application <Send aria-hidden="true" /></>}
      </button>
    </form>
  );
};

export default JobApplicationForm;
