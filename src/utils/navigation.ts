import type { NavLink } from '@/types';

/** Application routes, referenced by the router and the navigation links. */
export const ROUTES = {
  home: '/',
  portfolio: '/portfolio',
  careers: '/careers',
} as const;

/** Link labels live in the dictionary (`t.nav[id]`), so they follow the active language. */
export const HEADER_NAV_LINKS: NavLink[] = [
  { id: 'about', href: '/#about' },
  { id: 'services', href: '/#services' },
  // The portfolio is not public yet: the header shows a "coming soon" toast instead of navigating.
  { id: 'portfolio', href: ROUTES.portfolio, comingSoon: true },
  { id: 'careers', href: ROUTES.careers },
  { id: 'contact', href: '/#contact' },
];

/** Footer navigation links (same entries as the header, but always navigating). */
export const FOOTER_NAV_LINKS: NavLink[] = HEADER_NAV_LINKS.map(
  ({ comingSoon: _comingSoon, ...link }) => link
);
