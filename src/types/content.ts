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
  | 'location';

export type SocialIconName = 'facebook' | 'instagram' | 'linkedin' | 'youtube';

export interface NavLink {
  id: string;
  label: string;
  href: string;
  /** Renders a "Soon" toast instead of navigating. */
  comingSoon?: boolean;
}

export interface ImageAsset {
  src: string;
  alt: string;
}

export interface CallToAction {
  label: string;
  href: string;
}

export interface HeroContent {
  title: string;
  description: string;
  primaryCta: CallToAction;
  secondaryCta: CallToAction;
  image: ImageAsset;
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

export interface FooterContent {
  description: string;
  navigationTitle: string;
  connectTitle: string;
  socialLinks: SocialLink[];
  copyright: string;
}

/** Copy shown on the home page. */
export interface HomeContent {
  hero: HeroContent;
  about: AboutContent;
  services: ServicesContent;
  contact: ContactContent;
}

/** Heading and supporting line shared by the sub pages. */
export interface PageMeta {
  title: string;
  description: string;
}

export type ProjectVariant = 'overlay' | 'stacked' | 'split';

export interface Project {
  id: string;
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
  id: string;
  /** Opportunity type shown as a badge, e.g. "Job" or "Intern". */
  type: string;
  location: string;
  title: string;
}
