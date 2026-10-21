import Link from 'next/link';

import SmartLink from '@/components/common/SmartLink/SmartLink';
import SocialLinks from '@/components/common/SocialLinks/SocialLinks';
import { format } from '@/i18n/format';
import { getTranslations } from '@/i18n/server';
import { FOOTER_NAV_LINKS, ROUTES } from '@/utils/navigation';

import styles from './Footer.module.scss';

const SOCIAL_LINKS = [
  {
    id: 'facebook',
    icon: 'facebook' as const,
    href: 'https://www.facebook.com/profile.php?id=61582613019990',
  },
  {
    id: 'instagram',
    icon: 'instagram' as const,
    href: 'https://www.instagram.com/tomexcompany/?hl=en',
  },
  {
    id: 'youtube',
    icon: 'youtube' as const,
    href: 'https://www.youtube.com/@TOMEXAcademy-j9u',
  },
  {
    id: 'email',
    icon: 'email' as const,
    href: 'mailto:khaliddababat@gmail.com',
  },
];

/** Site footer with brand summary, navigation and social links. */
const Footer = async () => {
  const t = await getTranslations();
  const socialLinks = SOCIAL_LINKS.map((link) => ({ ...link, label: t.footer[link.icon] }));

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div className={styles.brandColumn}>
            <Link className={styles.logo} href={ROUTES.home} aria-label={t.footer.homeLabel}>
              <img
                className={styles.logoMark}
                src="/images/logo.png"
                alt=""
                width={22}
                height={22}
              />
              <span className={styles.logoText}>TOMEX</span>
            </Link>
            <p className={styles.description}>{t.footer.description}</p>
          </div>

          <nav className={styles.navColumn} aria-label={t.footer.navigationLabel}>
            <h2 className={styles.columnTitle}>{t.footer.navigationTitle}</h2>
            <ul className={styles.navList}>
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.id} className={styles.navLink}>
                  <SmartLink className={styles.navLink} link={link}>
                    {t.nav[link.id]}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.connectColumn}>
            <h2 className={styles.connectTitle}>{t.footer.connectTitle}</h2>
            <SocialLinks links={socialLinks} />
          </div>
        </div>

        <p className={styles.copyright}>
          {format(t.footer.copyright, { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
