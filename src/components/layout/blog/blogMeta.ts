import { ChartColumn, GraduationCap, Megaphone, Search, Target, type LucideIcon } from 'lucide-react';
import type { BlogCategory } from '../../../content/blog/posts';

export const CATEGORY_ICONS: Record<BlogCategory, LucideIcon> = {
  'Digital Marketing': Target,
  'Social Media': Megaphone,
  'SEO & Search': Search,
  'Education Growth': GraduationCap,
  'Case Studies': ChartColumn,
};

export const CATEGORY_TONES: Record<BlogCategory, string> = {
  'Digital Marketing': 'blue',
  'Social Media': 'teal',
  'SEO & Search': 'navy',
  'Education Growth': 'aqua',
  'Case Studies': 'navy',
};

// Dates are calendar dates (YYYY-MM-DD); format in UTC so no timezone shifts them by a day.
const DATE_FORMAT = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
export const formatPostDate = (isoDate: string) => DATE_FORMAT.format(new Date(`${isoDate}T00:00:00Z`));
