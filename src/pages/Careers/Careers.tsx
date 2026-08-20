import AsyncContent from '@/components/common/AsyncContent/AsyncContent';
import JobCard from '@/components/common/JobCard/JobCard';
import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
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
          {({ meta, jobs }) => (
            <>
              <SectionTitle title={meta.title} description={meta.description} id="careers-title" />

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
