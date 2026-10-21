import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import { getLocale, getTranslations } from '@/i18n/server';
import { fetchServices } from '@/services/contentService';
import { iconRegistry } from '@/utils/iconRegistry';

import styles from './Services.module.scss';

/** Services section: image-led service cards from the local content data. */
const Services = async () => {
  const t = await getTranslations();
  const locale = await getLocale();
  const content = await fetchServices();

  return (
    <section className={styles.services} id="services" aria-labelledby="services-title">
      <div className={styles.inner}>
        <SectionTitle
          title={t.services.title}
          description={t.services.description}
          align="center"
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
                    alt={service.image.alt[locale]}
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

                  <h3 className={styles.cardTitle}>{service.title[locale]}</h3>
                  <p className={styles.cardDescription}>{service.description[locale]}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Services;
