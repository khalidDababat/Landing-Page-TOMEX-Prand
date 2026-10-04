import Link from 'next/link';

import SmartLink from '@/components/common/SmartLink/SmartLink';
import SocialLinks from '@/components/common/SocialLinks/SocialLinks';
import { FOOTER_NAV_LINKS, ROUTES } from '@/utils/navigation';

import styles from './Footer.module.scss';

const DESCRIPTION = 'Technology, Design, and AI solutions for the individuals and businesses.';
const NAVIGATION_TITLE = 'Navigation';
const CONNECT_TITLE = 'Connect';
const SOCIAL_LINKS = [
  {
    id: 'facebook',
    icon: 'facebook' as const,
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61582613019990',
  },
  {
    id: 'instagram',
    icon: 'instagram' as const,
    label: 'Instagram',
    href: 'https://www.instagram.com/tomexcompany/?hl=en',
  },
  {
    id: 'youtube',
    icon: 'youtube' as const,
    label: 'YouTube',
    href: 'https://www.youtube.com/@TOMEXAcademy-j9u',
  },
  {
    id: 'email',
    icon: 'email' as const,
    label: 'Email',
    href: 'mailto:khaliddababat@gmail.com',
  },
];

/** Site footer with brand summary, navigation and social links. */
const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.columns}>
        <div className={styles.brandColumn}>
          <Link className={styles.logo} href={ROUTES.home} aria-label="TOMEX home">
            <img className={styles.logoMark} src="/images/logo.png" alt="" width={22} height={22} />
            <span className={styles.logoText}>TOMEX</span>
          </Link>
          <p className={styles.description}>{DESCRIPTION}</p>
        </div>

        <nav className={styles.navColumn} aria-label="Footer navigation">
          <h2 className={styles.columnTitle}>{NAVIGATION_TITLE}</h2>
          <ul className={styles.navList}>
            {FOOTER_NAV_LINKS.map((link) => (
              <li key={link.id} className={styles.navLink}>
                <SmartLink className={styles.navLink} link={link} />
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.connectColumn}>
          <h2 className={styles.connectTitle}>{CONNECT_TITLE}</h2>
          <SocialLinks links={SOCIAL_LINKS} />
        </div>
      </div>

      <p className={styles.copyright}>
        {`© ${new Date().getFullYear()} TOMEX Tech. All rights reserved.`}
      </p>
    </div>
  </footer>
);

export default Footer;
