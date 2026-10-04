/** Keys of the MUI icons registered in `src/utils/iconRegistry.ts`. */
export type IconName =
  | 'code'
  | 'school'
  | 'video'
  | 'vision'
  | 'rocket'
  | 'laptop'
  | 'book'
  | 'ai'
  | 'email'
  | 'phone'
  | 'location';

export type SocialIconName = 'facebook' | 'instagram' | 'linkedin' | 'youtube' | 'email';

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface FeatureCard {
  id: string;
  icon: IconName;
  title: string;
  description: string;
}

export interface ServiceCard extends FeatureCard {
  image: ImageAsset;
}

export interface AboutContent {
  title: string;
  cards: FeatureCard[];
  pillars: FeatureCard[];
}

export interface ServicesContent {
  title: string;
  description: string;
  items: ServiceCard[];
}

export interface ContactDetail {
  id: string;
  icon: IconName;
  value: string;
  href?: string;
}

export interface ContactContent {
  title: string;
  description: string;
  details: ContactDetail[];
}

export interface SocialLink {
  id: string;
  icon: SocialIconName;
  label: string;
  href: string;
}

export type ProjectVariant = 'overlay' | 'stacked' | 'split';

export interface Project {
  id: number | string;
  /** Drives which bento layout the card renders. */
  variant: ProjectVariant;
  category: string;
  title: string;
  description: string;
  image: ImageAsset;
  tags: string[];
  linkLabel: string | null;
}

export interface Job {
  id: number | string;
  /** Opportunity type shown as a badge, e.g. "Job" or "Intern". */
  type: string;
  location: string;
  title: string;
}
