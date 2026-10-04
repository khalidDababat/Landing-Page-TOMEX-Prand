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

export interface ComingSoonNotice {
  title: string;
  message: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
  /** When set, the header shows this toast instead of navigating. */
  comingSoon?: ComingSoonNotice;
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

/** Opportunity types; Education opportunities may apply through an external form. */
export type JobType = 'Education' | 'Internship' | 'Role';

export interface JobApplication {
  /** "internal" opens the TOMEX application form; "external" opens `externalUrl` (Education only). */
  method: 'internal' | 'external';
  /** HTTPS link of the external form, or null when the method is "internal". */
  externalUrl: string | null;
}

export interface Job {
  id: number | string;
  type: JobType;
  location: string;
  title: string;
  description: string;
  aboutRole: string;
  responsibilities: string[];
  application: JobApplication;
}

export interface TeamMember {
  id: number | string;
  name: string;
  position: string;
  description: string;
  /** Path of the profile picture under `public/`. */
  image: string;
  /** LinkedIn profile URL; an empty string hides the LinkedIn button. */
  linkedin: string;
}
