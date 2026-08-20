import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import type { NavLink } from '@/types';
import { showComingSoonToast } from '@/utils/toast';

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
const SmartLink = ({ link, className, onNavigate, children }: SmartLinkProps) => {
  const label = children ?? link.label;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    if (link.comingSoon) {
      event.preventDefault();
      showComingSoonToast();
    }

    onNavigate?.();
  };

  if (link.comingSoon) {
    return (
      <a className={className} href={link.href} onClick={handleClick}>
        {label}
      </a>
    );
  }

  return (
    <Link className={className} to={link.href} onClick={handleClick}>
      {label}
    </Link>
  );
};

export default SmartLink;
