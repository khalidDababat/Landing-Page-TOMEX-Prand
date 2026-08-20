import { Outlet } from 'react-router-dom';

import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import { footerData } from '@/data/content';
import { useHashScroll } from '@/hooks/useHashScroll';

import styles from './Layout.module.scss';

/** Shared chrome for every route: header, page outlet, footer and toasts. */
const Layout = () => {
  useHashScroll();

  return (
    <>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer content={footerData} />
    </>
  );
};

export default Layout;
