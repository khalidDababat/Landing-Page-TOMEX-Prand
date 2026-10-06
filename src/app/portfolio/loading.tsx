import LoadingState from '@/components/common/AsyncContent/LoadingState';
import { getTranslations } from '@/i18n/server';

import styles from '@/views/Portfolio/Portfolio.module.scss';

const PortfolioLoading = async () => {
  const t = await getTranslations();

  return (
    <section className={styles.portfolio} aria-label={t.portfolio.loading}>
      <div className={styles.inner}>
        <LoadingState label={t.portfolio.loading} />
      </div>
    </section>
  );
};

export default PortfolioLoading;
