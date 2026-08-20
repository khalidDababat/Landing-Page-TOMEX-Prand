import type { ReactNode } from 'react';

import styles from './Badge.module.scss';

export type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  size?: BadgeSize;
}

/** Pill label used for job types and project technology tags. */
const Badge = ({ children, size = 'md' }: BadgeProps) => (
  <span className={`${styles.badge} ${styles[size]}`}>{children}</span>
);

export default Badge;
