'use client';

import AsyncContent from '@/components/common/AsyncContent/AsyncContent';
import JobCard from '@/components/common/JobCard/JobCard';
import { useFetch } from '@/hooks/useFetch';
import { useTranslations } from '@/i18n/I18nProvider';
import { fetchCareers } from '@/services/contentService';

import styles from './Careers.module.scss';

/** Careers page listing the open opportunities from the API. */
const Careers = () => {
  const t = useTranslations();
  const { data, status, retry } = useFetch(fetchCareers);

  return (
    <section className={styles.careers} aria-labelledby="careers-title">
      <div className={styles.inner}>
        <AsyncContent
          status={status}
          data={data}
          onRetry={retry}
          loadingLabel={t.careers.loading}
          emptyMessage={t.careers.empty}
        >
          {(jobs) => (
            <>
              <header className={styles.header}>
                <h1 className={styles.title} id="careers-title">
                  {t.careers.title}
                </h1>
                <p className={styles.description}>{t.careers.description}</p>
              </header>
              <ul className={styles.list}>
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    labels={{
                      type: t.jobTypes[job.type] ?? job.type,
                      applyNow: t.careers.applyNow,
                      applyUnavailable: t.careers.applyUnavailable,
                    }}
                  />
                ))}
              </ul>
            </>
          )}
        </AsyncContent>
      </div>
    </section>
  );
};

export default Careers;
