import EmptyState from '@/components/common/AsyncContent/EmptyState';
import JobCard from '@/components/common/JobCard/JobCard';
import { getTranslations } from '@/i18n/server';
import { fetchCareers } from '@/services/contentService';

import styles from './Careers.module.scss';

/** Careers page listing the open opportunities from the local content data. */
const Careers = async () => {
  const t = await getTranslations();
  const jobs = await fetchCareers();

  return (
    <section className={styles.careers} aria-labelledby="careers-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <h1 className={styles.title} id="careers-title">
            {t.careers.title}
          </h1>
          <p className={styles.description}>{t.careers.description}</p>
        </header>
        {jobs.length === 0 ? (
          <EmptyState message={t.careers.empty} />
        ) : (
          <>
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
      </div>
    </section>
  );
};

export default Careers;
