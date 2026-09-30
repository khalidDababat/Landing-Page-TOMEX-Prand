'use client';

import { useState } from 'react';
import Link from 'next/link';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { ROUTES } from '@/utils/navigation';

import styles from './Header.module.scss';

/** Shared nav links rendered in both desktop and mobile menus. */
const NavLinks = ({ linkClass }: { linkClass: string }) => (
  <>
    <li>
      <Link className={linkClass} href="/#about">
        About
      </Link>
    </li>
    <li>
      <Link className={linkClass} href="/#services">
        Services
      </Link>
    </li>
    <li>
      <Link className={linkClass} href="/portfolio">
        Portfolio
      </Link>
    </li>
    <li>
      <Link className={linkClass} href="/careers">
        Careers
      </Link>
    </li>
    <li>
      <Link className={linkClass} href="/#contact">
        Contact
      </Link>
    </li>
  </>
);

/** Sticky site header with desktop navigation and a mobile menu. */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useBodyScrollLock(isMenuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} href={ROUTES.home} aria-label="TOMEX home">
          <img className={styles.logoMark} src="/favicon.ico" alt="logo TOMEX" />
          <span className={styles.logoText}>TOMEX Technologies</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            <NavLinks linkClass={styles.navLink} />
          </ul>
        </nav>

        <button
          className={styles.menuToggle}
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
        aria-label="Mobile navigation"
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
