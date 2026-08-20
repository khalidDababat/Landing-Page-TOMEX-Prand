import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';

import Badge from '@/components/common/Badge/Badge';
import Button from '@/components/common/Button/Button';
import type { Job } from '@/types';

import styles from './JobCard.module.scss';

interface JobCardProps {
  job: Job;
  onApply: () => void;
}

/** Single open opportunity row: type, location, title and apply action. */
const JobCard = ({ job, onApply }: JobCardProps) => (
  <li className={styles.card}>
    <div className={styles.details}>
      <p className={styles.meta}>
        <Badge>{job.type}</Badge>

        <span className={styles.location}>
          <LocationOnOutlinedIcon className={styles.locationIcon} fontSize="inherit" />
          {job.location}
        </span>
      </p>

      <h2 className={styles.title}>{job.title}</h2>
    </div>

    <Button variant="accent" onClick={onApply}>
      Apply Now
    </Button>
  </li>
);

export default JobCard;
