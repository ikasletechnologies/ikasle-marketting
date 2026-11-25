import type { LucideIcon } from 'lucide-react';
import {
  CalendarDays,
  ChartLine,
  ChartNoAxesColumnIncreasing,
  FileText,
  Image as ImageIcon,
  Lightbulb,
  Mail,
  Megaphone,
  MapPin,
  MousePointer2,
  Palette,
  Play,
  Settings,
  Target,
  UsersRound,
} from 'lucide-react';
import digitalArt from '../../../assets/listing-digital.png';
import socialArt from '../../../assets/listing-social.png';
import seoArt from '../../../assets/listing-seo.png';
import brandArt from '../../../assets/listing-brand.png';

export type CoreServiceKind = 'digital' | 'social' | 'seo' | 'brand';

export interface CoreService {
  id: string;
  kind: CoreServiceKind;
  number: string;
  art: string;
  title: string;
  description: string;
  features: { label: string; icon: LucideIcon }[];
  linkText: string;
}

/** The four main service hubs, shared by the Services listing and the home page. */
export const CORE_SERVICES: CoreService[] = [
  {
    id: 'digital-marketing',
    kind: 'digital',
    number: '01',
    art: digitalArt,
    title: 'Digital Marketing',
    description: 'Connect your audience, campaigns and content with a clear plan.',
    features: [
      { label: 'Marketing Strategy', icon: Target },
      { label: 'Google & Meta Ads', icon: ChartNoAxesColumnIncreasing },
      { label: 'Content & Email Marketing', icon: Mail },
      { label: 'Analytics & Reporting', icon: ChartLine },
    ],
    linkText: 'Explore Digital Marketing',
  },
  {
    id: 'social-media',
    kind: 'social',
    number: '02',
    art: socialArt,
    title: 'Social Media Marketing',
    description: 'Build a consistent presence that connects with your audience.',
    features: [
      { label: 'Social Media Strategy', icon: UsersRound },
      { label: 'Account Management', icon: CalendarDays },
      { label: 'Creative Design & Reels', icon: Play },
      { label: 'Social Advertising', icon: Megaphone },
    ],
    linkText: 'Explore Social Media',
  },
  {
    id: 'seo-search',
    kind: 'seo',
    number: '03',
    art: seoArt,
    title: 'SEO & Search Growth',
    description: 'Help the right people discover your business through search.',
    features: [
      { label: 'Technical SEO', icon: Settings },
      { label: 'On-Page Optimisation', icon: FileText },
      { label: 'Local SEO', icon: MapPin },
      { label: 'SEO Content & Reporting', icon: ChartNoAxesColumnIncreasing },
    ],
    linkText: 'Explore SEO',
  },
  {
    id: 'brand-growth',
    kind: 'brand',
    number: '04',
    art: brandArt,
    title: 'Brand Growth & Creative',
    description: 'Create an identity and experience people recognise and remember.',
    features: [
      { label: 'Brand Strategy & Positioning', icon: Lightbulb },
      { label: 'Visual Identity', icon: Palette },
      { label: 'Creative Campaigns', icon: ImageIcon },
      { label: 'Website Design & CRO', icon: MousePointer2 },
    ],
    linkText: 'Explore Branding',
  },
];
