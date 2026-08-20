import { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import logo from '@/assets/icons/logo.svg';
import SmartLink from '@/components/common/SmartLink/SmartLink';
import { useBodyScrollLock } from '@/hooks/useBodyScrollLock';
import { HEADER_NAV_LINKS, ROUTES } from '@/utils/navigation';

import styles from './Header.module.scss';

/** Sticky site header with desktop navigation and a mobile menu. */
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useBodyScrollLock(isMenuOpen);

  const closeMenu = useCallback((): void => setIsMenuOpen(false), []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.logo} to={ROUTES.home} aria-label="TOMEX home">
          <img className={styles.logoMark} src={logo} alt="" width={24} height={24} />
          <span className={styles.logoText}>TOMEX</span>
        </Link>

        <nav className={styles.desktopNav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {HEADER_NAV_LINKS.map((link) => (
              <li key={link.id}>
                <SmartLink className={styles.navLink} link={link} onNavigate={closeMenu} />
              </li>
            ))}
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
          {HEADER_NAV_LINKS.map((link) => (
            <li key={link.id}>
              <SmartLink className={styles.mobileNavLink} link={link} onNavigate={closeMenu} />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
