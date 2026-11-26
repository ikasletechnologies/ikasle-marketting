/**
 * Job openings for the Careers pages. This file is the single place to manage jobs:
 * add a role, edit its content, or change `status` to control where it appears.
 *
 *   draft     → hidden everywhere (the URL shows "not found")
 *   published → listed on /careers, has a detail page, accepts applications, in the sitemap
 *   closed    → detail page stays reachable but is marked closed, noindex, no applications
 *
 * `deadline` is optional (omit it for "open until filled"); once it has passed, the role
 * stops accepting applications automatically. `salary` is optional; leave it out to hide it.
 * Pure data with explicit .ts imports so Node build scripts (sitemap, prerender) can read it.
 */
export type JobStatus = 'draft' | 'published' | 'closed';
export type EmploymentType = 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
export type WorkMode = 'On-site' | 'Hybrid' | 'Remote';
export type ExperienceBand = '0-2 years' | '2-5 years' | '5+ years';

export interface Job {
  /** Stable reference shown to applicants and stored with each application. */
  id: string;
  slug: string;
  title: string;
  department: string;
  status: JobStatus;
  featured: boolean;
  employmentType: EmploymentType;
  /** Shown as written, e.g. "3–5 years". */
  experience: string;
  /** Used by the experience filter. */
  experienceBand: ExperienceBand;
  location: string;
  workMode: WorkMode;
  salary?: string;
  /** ISO date (YYYY-MM-DD). */
  postedAt: string;
  /** ISO date (YYYY-MM-DD); omit for "open until filled". */
  deadline?: string;
  summary: string;
  about: string[];
  responsibilities: string[];
  skills: string[];
  qualifications: string[];
  preferred: string[];
}

/** Shared "What we offer" list for every role. */
export const WHAT_WE_OFFER = [
  'Competitive compensation based on your skills and experience',
  'A clear path to grow your role and responsibilities',
  'Time and support to learn new tools, platforms and skills',
  'A collaborative team that shares ideas and feedback openly',
  'Recognition for great work and the results it delivers',
];

const LOCATION = 'Coimbatore, Tamil Nadu';

export const JOBS: Job[] = [
  {
    id: 'IKS-DES-001',
    slug: 'ui-ux-lead-designer',
    title: 'UI/UX Lead Designer',
    department: 'Design',
    status: 'published',
    featured: true,
    employmentType: 'Full-time',
    experience: '5+ years',
    experienceBand: '5+ years',
    location: LOCATION,
    workMode: 'Hybrid',
    postedAt: '2026-11-26',
    summary: 'Lead the user experience and interface design of websites, landing pages and digital products for our clients and our own brand.',
    about: [
      'As our UI/UX Lead Designer, you will shape how people experience the brands we work with, from the first wireframe to a polished, high-converting website or landing page.',
      'You will work closely with strategists, marketers and developers, turn business goals into clear user journeys, and set the design standards the rest of the creative team follows.',
    ],
    responsibilities: [
      'Lead UX research, user journeys, information architecture and wireframes for client websites and landing pages',
      'Design high-fidelity, responsive interfaces and interactive prototypes in Figma',
      'Build and maintain design systems, component libraries and UI guidelines',
      'Work with developers to make sure designs are implemented accurately and accessibly',
      'Use analytics, heatmaps and testing to improve conversion and usability',
      'Present design rationale to clients and incorporate feedback',
      'Mentor designers and review their work for quality and consistency',
    ],
    skills: ['Figma', 'Wireframing & prototyping', 'Design systems', 'Responsive web design', 'User research', 'Usability testing', 'Accessibility (WCAG)', 'Conversion-focused design'],
    qualifications: [
      'Degree or diploma in design, HCI or a related field, or equivalent practical experience',
      '5+ years of UI/UX design experience, including leading projects end to end',
      'A strong portfolio of websites, landing pages or digital products',
    ],
    preferred: ['Experience designing for marketing and lead generation', 'Basic understanding of HTML, CSS and front-end frameworks', 'Motion and micro-interaction design', 'Experience working with agencies or multiple clients'],
  },
  {
    id: 'IKS-DES-002',
    slug: 'graphic-designer',
    title: 'Graphic Designer',
    department: 'Design',
    status: 'published',
    featured: false,
    employmentType: 'Full-time',
    experience: '1–3 years',
    experienceBand: '0-2 years',
    location: LOCATION,
    workMode: 'On-site',
    postedAt: '2026-11-26',
    summary: 'Create social media creatives, ad designs, brand assets and marketing collateral that look great and communicate clearly.',
    about: [
      'As a Graphic Designer, you will create the visuals that bring our clients’ brands to life across social media, digital ads, print and presentations.',
      'You will turn briefs into clear, on-brand designs, work quickly across many formats and collaborate with copywriters, social media and performance marketing teams.',
    ],
    responsibilities: [
      'Design social media posts, carousels, stories and ad creatives',
      'Create brochures, flyers, banners, presentations and other marketing collateral',
      'Follow and extend brand guidelines for multiple clients',
      'Prepare design variations for ad testing',
      'Deliver print-ready and web-optimised files',
      'Take feedback and revise designs within agreed timelines',
    ],
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva', 'Typography', 'Layout & composition', 'Social media formats', 'Brand consistency'],
    qualifications: [
      'Degree or diploma in graphic design, visual communication or a related field, or equivalent experience',
      '1–3 years of graphic design experience',
      'A portfolio showing social media and marketing design work',
    ],
    preferred: ['Figma', 'Basic motion graphics or After Effects', 'Experience with agency or multi-client work', 'Photo editing and retouching'],
  },
  {
    id: 'IKS-VID-001',
    slug: 'video-editor',
    title: 'Video Editor',
    department: 'Video Production',
    status: 'published',
    featured: false,
    employmentType: 'Full-time',
    experience: '1–3 years',
    experienceBand: '0-2 years',
    location: LOCATION,
    workMode: 'On-site',
    postedAt: '2026-11-26',
    summary: 'Edit reels, short-form videos, ads and brand films with strong hooks, clean cuts, captions and motion graphics.',
    about: [
      'As a Video Editor, you will turn raw footage into engaging reels, YouTube Shorts, ads and brand videos for our clients.',
      'You understand how short-form video works on each platform, and you know how to hold attention in the first few seconds and guide viewers to act.',
    ],
    responsibilities: [
      'Edit Instagram Reels, YouTube Shorts and short-form video content',
      'Create video ads for Meta and YouTube campaigns in multiple formats',
      'Add captions, music, sound design, transitions and basic motion graphics',
      'Colour-correct footage and keep a consistent look across videos',
      'Organise footage and project files for fast turnaround',
      'Stay up to date with platform trends and video best practices',
    ],
    skills: ['Adobe Premiere Pro', 'After Effects', 'CapCut', 'Short-form video editing', 'Captions & subtitles', 'Colour correction', 'Sound editing'],
    qualifications: [
      'Degree or diploma in film, media or a related field, or equivalent experience',
      '1–3 years of video editing experience',
      'A showreel or portfolio including short-form social video',
    ],
    preferred: ['DaVinci Resolve', 'Shooting experience with phones or cameras', 'Motion graphics and kinetic typography', 'Thumbnail design'],
  },
  {
    id: 'IKS-SOC-001',
    slug: 'social-media-manager',
    title: 'Social Media Manager',
    department: 'Social Media',
    status: 'published',
    featured: true,
    employmentType: 'Full-time',
    experience: '2–4 years',
    experienceBand: '2-5 years',
    location: LOCATION,
    workMode: 'Hybrid',
    postedAt: '2026-11-26',
    summary: 'Plan, create and grow social channels through thoughtful content, community and measurable campaigns.',
    about: [
      'As our Social Media Manager, you will own the social media strategy and delivery for a portfolio of client brands.',
      'You notice what makes people stop, feel and respond. You can turn a brief into clear, platform-ready content and explain why it should work, then use the results to make the next month better.',
    ],
    responsibilities: [
      'Plan social media strategies, content pillars and monthly calendars',
      'Brief and coordinate designers and video editors on posts, carousels and reels',
      'Write captions and manage publishing across Instagram, Facebook, LinkedIn and YouTube',
      'Manage community engagement, comments and messages',
      'Track performance and prepare clear monthly reports with insights',
      'Present plans and results to clients',
    ],
    skills: ['Social media strategy', 'Content planning', 'Copywriting', 'Meta Business Suite', 'Instagram & LinkedIn', 'Analytics & reporting', 'Community management'],
    qualifications: [
      'Degree in marketing, communications or a related field, or equivalent experience',
      '2–4 years managing social media for brands or clients',
      'Examples of accounts or campaigns you have managed',
    ],
    preferred: ['Experience with Meta Ads', 'Influencer or creator collaborations', 'Basic design or video skills', 'Experience in education or local business marketing'],
  },
  {
    id: 'IKS-PER-001',
    slug: 'google-ads-expert',
    title: 'Google Ads Expert',
    department: 'Performance Marketing',
    status: 'published',
    featured: true,
    employmentType: 'Full-time',
    experience: '3–5 years',
    experienceBand: '2-5 years',
    location: LOCATION,
    workMode: 'Hybrid',
    postedAt: '2026-11-26',
    summary: 'Plan, launch and optimise Google Search, Performance Max and YouTube campaigns that bring measurable leads and sales.',
    about: [
      'As our Google Ads Expert, you will manage paid search and Google advertising for clients across industries, with a clear focus on qualified leads and return on ad spend.',
      'You are comfortable in the data, careful with budgets and able to explain results simply to clients and the wider team.',
    ],
    responsibilities: [
      'Plan and build Search, Performance Max, Display and YouTube campaigns',
      'Do keyword research, write ad copy and set up extensions',
      'Set up and verify conversion tracking with GA4 and Google Tag Manager',
      'Manage bids, budgets and search terms to reduce wasted spend',
      'Work with designers and writers on landing pages and creatives',
      'Prepare performance reports and recommendations',
    ],
    skills: ['Google Ads', 'Keyword research', 'Performance Max', 'GA4', 'Google Tag Manager', 'Conversion tracking', 'Budget management', 'Excel / Google Sheets'],
    qualifications: [
      'Degree in marketing, business or a related field, or equivalent experience',
      '3–5 years of hands-on Google Ads management',
      'Google Ads certification is an advantage',
    ],
    preferred: ['Meta Ads experience', 'Looker Studio reporting', 'Landing page and CRO knowledge', 'E-commerce or lead generation campaign experience'],
  },
  {
    id: 'IKS-SOC-002',
    slug: 'social-media-marketing-executive',
    title: 'Social Media Marketing Executive',
    department: 'Social Media',
    status: 'published',
    featured: false,
    employmentType: 'Full-time',
    experience: '0–2 years',
    experienceBand: '0-2 years',
    location: LOCATION,
    workMode: 'On-site',
    postedAt: '2026-11-26',
    summary: 'Support day-to-day social media activity: scheduling posts, writing captions, engaging with communities and tracking results.',
    about: [
      'As a Social Media Marketing Executive, you will support our social media team in creating, publishing and managing content for client brands.',
      'This is a great role for someone early in their career who loves social media and wants to learn how professional brand accounts are planned and grown.',
    ],
    responsibilities: [
      'Schedule and publish posts, stories and reels',
      'Write captions and research hashtags',
      'Respond to comments and messages using agreed guidelines',
      'Research trends, competitors and content ideas',
      'Collect data for monthly performance reports',
      'Coordinate with designers on content requirements',
    ],
    skills: ['Instagram & Facebook', 'Caption writing', 'Content scheduling tools', 'Trend research', 'Basic Canva', 'Communication'],
    qualifications: [
      'Degree in marketing, media, communications or a related field',
      '0–2 years of experience; internships and personal projects count',
      'Good written English',
    ],
    preferred: ['Experience running a page or personal brand', 'Basic video editing', 'Knowledge of Meta Business Suite', 'Tamil language skills for regional content'],
  },
  {
    id: 'IKS-DES-003',
    slug: 'senior-graphic-designer-video-editor',
    title: 'Senior Graphic Designer & Video Editor',
    department: 'Design',
    status: 'published',
    featured: true,
    employmentType: 'Full-time',
    experience: '4+ years',
    experienceBand: '5+ years',
    location: LOCATION,
    workMode: 'On-site',
    postedAt: '2026-11-26',
    summary: 'Lead creative execution across design and video, from campaign key visuals to reels and ads, and guide the creative team on quality.',
    about: [
      'As our Senior Graphic Designer & Video Editor, you will combine strong design and video skills to lead creative output for campaigns and brand content.',
      'You will set the visual standard, guide junior designers and editors, and work with strategists to turn ideas into creatives that perform.',
    ],
    responsibilities: [
      'Create campaign key visuals, brand assets and marketing collateral',
      'Edit reels, ads and brand videos with motion graphics',
      'Develop creative concepts with the strategy and social media teams',
      'Review and improve the work of junior designers and editors',
      'Maintain brand consistency across client accounts',
      'Manage multiple projects and deadlines',
    ],
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Premiere Pro', 'After Effects', 'Brand identity', 'Motion graphics', 'Creative direction'],
    qualifications: [
      'Degree or diploma in design, media or a related field, or equivalent experience',
      '4+ years of combined graphic design and video editing experience',
      'A portfolio and showreel covering both design and video',
    ],
    preferred: ['Figma', '3D or advanced motion design', 'Photography or videography', 'Experience mentoring a creative team'],
  },
];

export const jobPath = (slug: string) => `/careers/jobs/${slug}`;

/** Today's date as YYYY-MM-DD (local time), for deadline checks. */
export const todayIso = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

/** Published and not past its deadline. */
export const isAcceptingApplications = (job: Job, today = todayIso()) =>
  job.status === 'published' && (!job.deadline || job.deadline >= today);

/** Jobs shown on the listing page: open roles, featured first, newest first. */
export const listedJobs = (today = todayIso()) =>
  JOBS.filter((job) => isAcceptingApplications(job, today)).sort(
    (a, b) => Number(b.featured) - Number(a.featured) || b.postedAt.localeCompare(a.postedAt),
  );

/** A job with a public page (published or closed); drafts are treated as not found. */
export const getJob = (slug: string) => JOBS.find((job) => job.slug === slug && job.status !== 'draft');

export const formatJobDate = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
