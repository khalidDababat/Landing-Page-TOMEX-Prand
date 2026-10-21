import type { ReactNode } from 'react';
import Link from 'next/link';

import type { NavLink } from '@/types';

interface SmartLinkProps {
  link: NavLink;
  className?: string;
  /** The translated label. */
  children: ReactNode;
}

/**
 * Renders a navigation entry as a router link (routes and in-page anchors).
 *
 * Header, mobile menu and footer all share it.
 */
const SmartLink = ({ link, className, children }: SmartLinkProps) => (
  <Link className={className} href={link.href}>
    {children}
  </Link>
);

export default SmartLink;
