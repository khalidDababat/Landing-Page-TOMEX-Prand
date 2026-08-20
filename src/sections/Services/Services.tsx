import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import type { ServicesContent } from '@/types';
import { iconRegistry } from '@/utils/iconRegistry';

import styles from './Services.module.scss';

interface ServicesProps {
  content: ServicesContent;
}

/** Services section: three image-led service cards. */
const Services = ({ content }: ServicesProps) => (
  <section className={styles.services} id="services" aria-labelledby="services-title">
    <div className={styles.inner}>
      <SectionTitle
        title={content.title}
        description={content.description}
        align="left"
        id="services-title"
      />

      <ul className={styles.cards}>
        {content.items.map((service) => {
          const Icon = iconRegistry[service.icon];

          return (
            <li className={styles.card} key={service.id}>
              <div className={styles.media}>
                <img
                  className={styles.image}
                  src={service.image.src}
                  alt={service.image.alt}
                  loading="lazy"
                  width={368}
                  height={170}
                />
                <span className={styles.overlay} aria-hidden="true" />
              </div>

              <div className={styles.body}>
                <span className={styles.iconBox} aria-hidden="true">
                  <Icon className={styles.icon} fontSize="inherit" />
                </span>

                <h3 className={styles.cardTitle}>{service.title}</h3>
                <p className={styles.cardDescription}>{service.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  </section>
);

export default Services;
