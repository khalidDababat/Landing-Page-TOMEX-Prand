import styles from './Hero.module.scss';
import Link from 'next/link';

/** Hero section: headline, calls to action  */
const Hero = () => (
  <section className={styles.hero} id="hero" aria-labelledby="hero-title">
    <div className={styles.inner}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <img src="/images/logo.png" alt="" />
        </div>
        <h1 className={styles.title} id="hero-title">
          TOMEX Technology.
        </h1>
        <p className={styles.description}>
          Modern Software Engineering · Practical Programming · AI-Powered Creativity
        </p>

        <div className={styles.actions}>
          <Link href="#services">Explore Our Services</Link>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
