import AsyncContent from '@/components/common/AsyncContent/AsyncContent';
import JobCard from '@/components/common/JobCard/JobCard';
import { useFetch } from '@/hooks/useFetch';
import { fetchCareers } from '@/services/contentService';
import { showComingSoonToast } from '@/utils/toast';

import styles from './Careers.module.scss';

/** Careers page listing the open opportunities from the API. */
const Careers = () => {
  const { data, status, error, retry } = useFetch(fetchCareers);

  return (
    <section className={styles.careers} aria-labelledby="careers-title">
      <div className={styles.inner}>
        <AsyncContent
          status={status}
          error={error}
          data={data}
          onRetry={retry}
          loadingLabel="Loading opportunities"
          emptyMessage="There are no open roles right now."
        >
          {({ jobs }) => (
            <>
              <header className={styles.header}>
                <h1 className={styles.title} id="careers-title">Open Opportunities</h1>
                <p className={styles.description}>Find your role Or Internship in TOMEX.</p>
              </header>
              <ul className={styles.list}>
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} onApply={showComingSoonToast} />
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
