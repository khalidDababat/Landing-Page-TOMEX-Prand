import Link from 'next/link';

import { getTranslations } from '@/i18n/server';

import styles from './Hero.module.scss';

/** Hero section: headline, calls to action  */
const Hero = async () => {
  const t = await getTranslations();

  return (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.logo}>
            <img src="/images/logo.png" alt="" />
          </div>
          <h1 className={styles.title} id="hero-title">
            {t.hero.title}
          </h1>
          <p className={styles.description}>{t.hero.tagline}</p>

          <div className={styles.actions}>
            <Link href="#services">{t.hero.cta}</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
