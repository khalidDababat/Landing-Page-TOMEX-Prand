import type { NavLink } from '@/types';

/** Application routes, referenced by the router and the navigation links. */
export const ROUTES = {
  home: '/',
  portfolio: '/portfolio',
  careers: '/careers',
} as const;

/**
 * Header navigation links.
 *
 * In-page anchors are absolute (`/#about`) so they resolve to the home page
 * section even when clicked from another route.
 */
export const HEADER_NAV_LINKS: NavLink[] = [
  { id: 'about', label: 'About', href: '/#about' },
  { id: 'services', label: 'Services', href: '/#services' },
  { id: 'portfolio', label: 'Portfolio', href: ROUTES.portfolio },
  { id: 'careers', label: 'Careers', href: ROUTES.careers },
  { id: 'contact', label: 'Contact', href: '/#contact' },
];

/** Footer navigation links: the header links plus the privacy policy entry. */
export const FOOTER_NAV_LINKS: NavLink[] = [
  ...HEADER_NAV_LINKS,
  { id: 'privacy-policy', label: 'Privacy Policy', href: '#privacy-policy', comingSoon: true },
];
