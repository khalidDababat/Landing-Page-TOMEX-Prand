import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { notFound } from 'next/navigation';

import ApplicationForm from '@/components/common/ApplicationForm/ApplicationForm';
import EmptyState from '@/components/common/AsyncContent/EmptyState';
import ErrorState from '@/components/common/AsyncContent/ErrorState';
import Badge from '@/components/common/Badge/Badge';
import Button from '@/components/common/Button/Button';
import ButtonLink from '@/components/common/Button/ButtonLink';
import { getTranslations } from '@/i18n/server';
import { ApiError } from '@/services/apiClient';
import { fetchJob } from '@/services/contentService';
import type { Job } from '@/types';
import { getApplyTarget } from '@/utils/careers';

import styles from './CareerDetails.module.scss';

interface CareerDetailsProps {
  id: string;
}

/** Details of one opportunity (fetched on the server) followed by its application form. */
const CareerDetails = async ({ id }: CareerDetailsProps) => {
  if (!/^\d+$/.test(id)) {
    notFound();
  }

  const t = await getTranslations();
  let job: Job | null = null;
  let failed = false;
  let missing = false;

  try {
    job = await fetchJob(id);
  } catch (cause: unknown) {
    if (cause instanceof ApiError && cause.status === 404) {
      missing = true;
    } else {
      failed = true;
    }
  }

  if (missing) {
    notFound();
  }

  if (failed) {
    return (
      <section className={styles.details} aria-label={t.careerDetails.regionLabel}>
        <div className={styles.inner}>
          <ErrorState />
        </div>
      </section>
    );
  }

  if (!job || !job.title) {
    return (
      <section className={styles.details} aria-label={t.careerDetails.regionLabel}>
        <div className={styles.inner}>
          <EmptyState message={t.careerDetails.notAvailable} />
        </div>
      </section>
    );
  }

  const target = getApplyTarget(job);

  return (
    <section className={styles.details} aria-labelledby="career-title">
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.meta}>
            <Badge>{t.jobTypes[job.type] ?? job.type}</Badge>
            <span className={styles.location}>
              <LocationOnOutlinedIcon className={styles.locationIcon} fontSize="inherit" />
              {job.location}
            </span>
          </p>
          <h1 className={styles.title} id="career-title">
            {job.title}
          </h1>
        </header>

        <div className={styles.content}>
          <section aria-labelledby="career-description">
            <h2 className={styles.sectionTitle} id="career-description">
              {t.careerDetails.jobDescription}
            </h2>
            <p className={styles.text}>{job.description}</p>
          </section>

          <section aria-labelledby="career-about">
            <h2 className={styles.sectionTitle} id="career-about">
              {t.careerDetails.aboutRole}
            </h2>
            <p className={styles.text}>{job.aboutRole}</p>
          </section>

          <section aria-labelledby="career-responsibilities">
            <h2 className={styles.sectionTitle} id="career-responsibilities">
              {t.careerDetails.responsibilities}
            </h2>
            <ul className={styles.list}>
              {job.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        {target.kind === 'internal' ? (
          <ApplicationForm job={job} />
        ) : target.kind === 'external' ? (
          <ButtonLink href={target.href}>{t.careers.applyNow}</ButtonLink>
        ) : (
          <Button disabled>{t.careers.applyUnavailable}</Button>
        )}
      </div>
    </section>
  );
};

export default CareerDetails;
