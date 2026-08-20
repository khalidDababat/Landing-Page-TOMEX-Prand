import type { SocialLink } from '@/types';
import { socialIconRegistry } from '@/utils/iconRegistry';

import styles from './SocialLinks.module.scss';

interface SocialLinksProps {
  links: SocialLink[];
}

/** Row of brand-colored social media links. */
const SocialLinks = ({ links }: SocialLinksProps) => (
  <ul className={styles.list}>
    {links.map((link) => {
      const Icon = socialIconRegistry[link.icon];

      return (
        <li key={link.id}>
          <a
            className={`${styles.link} ${styles[link.icon]}`}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
          >
            <Icon className={styles.icon} fontSize="inherit" />
          </a>
        </li>
      );
    })}
  </ul>
);

export default SocialLinks;
