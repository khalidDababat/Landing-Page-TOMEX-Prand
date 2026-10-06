'use client';

import { useState } from 'react';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import LanguageSwitcher from '@/components/common/LanguageSwitcher/LanguageSwitcher';
import SmartLink from '@/components/common/SmartLink/SmartLink';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { useTranslations } from '@/i18n/I18nProvider';
import { HEADER_NAV_LINKS, ROUTES } from '@/utils/navigation';
import { showComingSoon } from '@/utils/toast';

import styles from './Header.module.scss';

/** Shared nav links rendered in both desktop and mobile menus. */
const NavLinks = ({ linkClass }: { linkClass: string }) => {
  const t = useTranslations();

  return (
    <>
      {HEADER_NAV_LINKS.map((link) => (
        <li key={link.id}>
          {link.comingSoon ? (
            <button
              className={`${linkClass} ${styles.navButton}`}
              type="button"
              onClick={() =>
                showComingSoon({
                  title: t.comingSoon.portfolioTitle,
                  message: t.comingSoon.portfolioMessage,
                })
              }
            >
              {t.nav[link.id]}
            </button>
          ) : (
            <SmartLink className={linkClass} link={link}>
              {t.nav[link.id]}
            </SmartLink>
          )}
        </li>
      ))}
    </>
  );
};

/** Sticky site header with desktop navigation, language switcher and a mobile menu. */
const Header = () => {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useBodyScrollLock(isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href={ROUTES.home} aria-label={t.header.homeLabel}>
          <img className={styles.logoMark} src="/favicon.ico" alt={t.header.logoAlt} />
          <span className={styles.logoText}>{t.header.logoText}</span>
        </Link>

        <nav className={styles.desktopNav} aria-label={t.header.mainNav}>
          <ul className={styles.navList}>
            <NavLinks linkClass={styles.navLink} />
          </ul>
        </nav>

        <LanguageSwitcher className={styles.desktopSwitcher} />

        <button
          className={styles.menuToggle}
          type="button"
          aria-label={isMenuOpen ? t.header.closeMenu : t.header.openMenu}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      <nav
        className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}
        id="mobile-navigation"
        aria-label={t.header.mobileNav}
        hidden={!isMenuOpen}
      >
        <ul className={styles.mobileNavList}>
          <NavLinks linkClass={styles.mobileNavLink} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
