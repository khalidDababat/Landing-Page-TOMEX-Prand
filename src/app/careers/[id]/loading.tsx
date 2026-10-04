import LoadingState from '@/components/common/AsyncContent/LoadingState';

import styles from '@/views/CareerDetails/CareerDetails.module.scss';

const CareerDetailsLoading = () => (
  <section className={styles.details} aria-label="Loading opportunity">
    <div className={styles.inner}>
      <LoadingState label="Loading opportunity" />
    </div>
  </section>
);

export default CareerDetailsLoading;
