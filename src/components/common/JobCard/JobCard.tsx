import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import Badge from '@/components/common/Badge/Badge';
import Button from '@/components/common/Button/Button';
import ButtonLink from '@/components/common/Button/ButtonLink';
import type { Job } from '@/types';
import { getApplyTarget } from '@/utils/careers';

import styles from './JobCard.module.scss';

interface JobCardProps {
  job: Job;
  /** Translated texts, passed in so the card works from both Server and Client parents. */
  labels: {
    type: string;
    applyNow: string;
    applyUnavailable: string;
  };
}

/** Single open opportunity row: type, location, title and apply action (internal page or external form). */
const JobCard = ({ job, labels }: JobCardProps) => {
  const target = getApplyTarget(job);

  return (
    <li className={styles.card}>
      <div className={styles.details}>
        <p className={styles.meta}>
          <Badge>{labels.type}</Badge>

          <span className={styles.location}>
            <LocationOnOutlinedIcon className={styles.locationIcon} fontSize="inherit" />
            {job.location}
          </span>
        </p>

        <h2 className={styles.title}>{job.title}</h2>
      </div>

      {target.kind === 'unavailable' ? (
        <Button variant="accent" disabled>
          {labels.applyUnavailable}
        </Button>
      ) : (
        <ButtonLink variant="accent" href={target.href}>
          {labels.applyNow}
        </ButtonLink>
      )}
    </li>
  );
};

export default JobCard;
