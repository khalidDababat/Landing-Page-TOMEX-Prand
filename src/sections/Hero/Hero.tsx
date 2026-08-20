import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Button from '@/components/common/Button/Button';
import type { HeroContent } from '@/types';

import styles from './Hero.module.scss';

interface HeroProps {
  content: HeroContent;
}

/** Hero section: headline, supporting copy, calls to action and brand visual. */
const Hero = ({ content }: HeroProps) => (
    <section className={styles.hero} id="hero" aria-labelledby="hero-title">
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.title} id="hero-title">
            {content.title}
          </h1>

          <p className={styles.description}>{content.description}</p>

          <div className={styles.actions}>
            <Button href={content.primaryCta.href}>
              {content.primaryCta.label}
              <ArrowForwardIcon className={styles.buttonIcon} fontSize="inherit" />
            </Button>

            <Button href={content.secondaryCta.href} variant="outline">
              {content.secondaryCta.label}
            </Button>
          </div>
        </div>

        <figure className={styles.figure}>
          <img
            className={styles.image}
            src={content.image.src}
            alt={content.image.alt}
            width={560}
            height={600}
          />
        </figure>
      </div>
    </section>
);

export default Hero;
