import type { ReactNode } from 'react';
import Link from 'next/link';

import styles from './Button.module.scss';

interface ButtonLinkProps {
  href: string;
  variant?: 'primary' | 'accent';
  children: ReactNode;
}

/** Link that shares the button styling. Site paths use the router; other URLs open in a new tab. */
const ButtonLink = ({ href, variant = 'primary', children }: ButtonLinkProps) => {
  const className = `${styles.button} ${styles[variant]}`;

  return href.startsWith('/') ? (
    <Link className={className} href={href}>
      {children}
    </Link>
  ) : (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

export default ButtonLink;
