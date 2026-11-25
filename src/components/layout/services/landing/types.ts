import type { LucideIcon } from 'lucide-react';

/** [plain text, emphasised text, optional trailing text] rendered as `plain <em>emphasised</em> trailing`. */
export type Heading = [string, string, string?];

export type ServiceCategory = 'Digital Marketing' | 'Social Media Marketing' | 'SEO & Search Growth' | 'Brand Growth & Creative';

/** Hero illustration, chosen to show the work behind each service (see HeroBoards.tsx). */
export type HeroVariant =
  | 'roadmap' | 'social' | 'search' | 'brand'
  | 'persona' | 'ads' | 'video' | 'leadform' | 'article' | 'inbox' | 'pipeline' | 'abtest' | 'analytics' | 'tracking'
  | 'pillars' | 'profile' | 'queue' | 'calendar' | 'carousel' | 'reel' | 'chat' | 'creators'
  | 'audit' | 'keywords' | 'vitals' | 'snippet' | 'map' | 'listing' | 'cluster' | 'backlinks' | 'products'
  | 'notes' | 'quadrant' | 'house' | 'book' | 'print' | 'browser' | 'storyboard' | 'touchpoints' | 'launch';

interface Block {
  /** Small label above the heading; each block has a sensible default. */
  eyebrow?: string;
  title: Heading;
  intro: string;
}

export interface LandingContent {
  /** App section name, as used in ROUTES. */
  section: string;
  category: ServiceCategory;
  /** Last breadcrumb item. */
  crumb: string;
  kicker: string;
  /** Three H1 lines; the last one is emphasised. Include the main keyword. */
  h1: [string, string, string];
  lead: string;
  cta: string;
  visual: {
    variant: HeroVariant;
    /** Board heading (for "search", the typed query). */
    title: string;
    /** Four labels shown on the board. */
    items: [string, string, string, string];
    /** Four floating chips around the board. */
    chips: [LucideIcon, string][];
    /** Small dark card: [label, status]. */
    mini: [string, string];
  };
  /** `sides` overrides the two column headings. */
  why: Block & { without: string[]; with: string[]; sides?: [string, string] };
  pillars: Block & { items: [icon: LucideIcon, title: string, text: string, review: string[], get: string][] };
  journey: Block & { stages: [stage: string, goal: string, tags: string[], kpi: string][] };
  who: Block & { items: [icon: LucideIcon, title: string, text: string][] };
  deliverables: Block & { items: [title: string, text: string][]; note?: string };
  process: Block & { steps: [title: string, text: string, output: string][] };
  measure: Block & {
    points: string[];
    /** Dashboard labels: rising line, falling line, goal ring, channel donut + legend. */
    dash: { up: [string, string]; down: [string, string]; ring: string; donut: [string, string, string, string] };
  };
  /** [app section name, one-line description] */
  related: [string, string][];
  faqs: [question: string, answer: string][];
}

export interface LandingPageProps {
  section: string;
  onNavigate: (section: string) => void;
}
