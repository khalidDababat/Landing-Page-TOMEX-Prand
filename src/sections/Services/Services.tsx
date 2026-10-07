'use client';

import AsyncContent from '@/components/common/AsyncContent/AsyncContent';
import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import { useFetch } from '@/hooks/useFetch';
import { useLocale, useTranslations } from '@/i18n/I18nProvider';
import { fetchServices } from '@/services/contentService';
import { iconRegistry } from '@/utils/iconRegistry';

import styles from './Services.module.scss';

/** Services section: image-led service cards fetched from the API. */
const Services = () => {
  const t = useTranslations();
  const locale = useLocale();
  const { data, status, retry } = useFetch(fetchServices);

  return (
    <section className={styles.services} id="services" aria-labelledby="services-title">
      <div className={styles.inner}>
        <AsyncContent status={status} data={data} onRetry={retry} loadingLabel={t.services.loading}>
          {(content) => (
            <>
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
            </>
          )}
        </AsyncContent>
      </div>
    </section>
  );
};

export default Services;
