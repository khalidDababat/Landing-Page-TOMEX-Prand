'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';

import type { NavLink } from '@/types';

interface SmartLinkProps {
  link: NavLink;
  className?: string;
  /** Extra behaviour after a successful activation, e.g. closing the mobile menu. */
  onNavigate?: () => void;
  children?: ReactNode;
}

/**
 * Renders the right kind of link for a navigation entry:
 * a router link for routes and in-page anchors, or a toast for
 * destinations that are not live yet.
 *
 * Header, mobile menu and footer all share this behaviour.
 */
const SmartLink = ({ link, className, children }: SmartLinkProps) => {
  const label = children ?? link.label;

  return (
    <Link className={className} href={link.href}>
      {label}
    </Link>
  );
};

export default SmartLink;
