import LoadingState from '@/components/common/AsyncContent/LoadingState';
import { getTranslations } from '@/i18n/server';

import styles from '@/views/CareerDetails/CareerDetails.module.scss';

const CareerDetailsLoading = async () => {
  const t = await getTranslations();

  return (
    <section className={styles.details} aria-label={t.careerDetails.loading}>
      <div className={styles.inner}>
        <LoadingState label={t.careerDetails.loading} />
      </div>
    </section>
  );
};

export default CareerDetailsLoading;
