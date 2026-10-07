'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import LanguageSwitcher from '@/components/common/LanguageSwitcher/LanguageSwitcher';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { scrollToHash } from '@/hooks/useHashScroll';
import { useTranslations } from '@/i18n/I18nProvider';
import { HEADER_NAV_LINKS, ROUTES } from '@/utils/navigation';
import { showComingSoon } from '@/utils/toast';

import styles from './Header.module.scss';

interface NavLinksProps {
  linkClass: string;
  /** Called after a nav link is clicked (the mobile menu closes itself). */
  onNavigate?: () => void;
}

/** Shared nav links rendered in both desktop and mobile menus. */
const NavLinks = ({ linkClass, onNavigate }: NavLinksProps) => {
  const t = useTranslations();
  const pathname = usePathname();

  /**
   * Next.js does nothing when a `/#section` link points at the current URL, and
   * its pushState never fires `hashchange`, so on the home page we scroll
   * ourselves — every click, even when the hash is already in the URL.
   */
  const handleLinkClick = (event: MouseEvent<HTMLAnchorElement>, href: string): void => {
    onNavigate?.();

    const { hash } = new URL(href, window.location.href);

    if (!hash || pathname !== ROUTES.home) {
      return;
    }

    event.preventDefault();

    if (window.location.hash !== hash) {
      window.history.pushState(null, '', href);
    }

    scrollToHash(hash);
  };

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
            <Link
              className={linkClass}
              href={link.href}
              onClick={(event) => handleLinkClick(event, link.href)}
            >
              {t.nav[link.id]}
            </Link>
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
          <NavLinks linkClass={styles.mobileNavLink} onNavigate={() => setIsMenuOpen(false)} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
