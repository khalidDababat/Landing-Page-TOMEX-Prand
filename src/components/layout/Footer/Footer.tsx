import { Link } from 'react-router-dom';

import logo from '@/assets/icons/logo.svg';
import SmartLink from '@/components/common/SmartLink/SmartLink';
import SocialLinks from '@/components/common/SocialLinks/SocialLinks';
import type { FooterContent } from '@/types';
import { FOOTER_NAV_LINKS, ROUTES } from '@/utils/navigation';

import styles from './Footer.module.scss';

interface FooterProps {
  content: FooterContent;
}

/** Site footer with brand summary, navigation and social links. */
const Footer = ({ content }: FooterProps) => (
  <footer className={styles.footer}>
    <div className={styles.inner}>
      <div className={styles.columns}>
        <div className={styles.brandColumn}>
          <Link className={styles.logo} to={ROUTES.home} aria-label="TOMEX home">
            <img className={styles.logoMark} src={logo} alt="" width={22} height={22} />
            <span className={styles.logoText}>TOMEX</span>
          </Link>
          <p className={styles.description}>{content.description}</p>
        </div>

        <nav className={styles.navColumn} aria-label="Footer navigation">
          <h2 className={styles.columnTitle}>{content.navigationTitle}</h2>
          <ul className={styles.navList}>
            {FOOTER_NAV_LINKS.map((link) => (
              <li key={link.id}>
                <SmartLink className={styles.navLink} link={link} />
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.connectColumn}>
          <h2 className={styles.connectTitle}>{content.connectTitle}</h2>
          <SocialLinks links={content.socialLinks} />
        </div>
      </div>

      <p
        className={styles.copyright}
      >{`${new Date().getFullYear()} TOMEX Tech. All rights reserved.`}</p>
    </div>
  </footer>
);

export default Footer;
