import LoadingState from '@/components/common/AsyncContent/LoadingState';

import styles from '@/views/Portfolio/Portfolio.module.scss';

const PortfolioLoading = () => (
  <section className={styles.portfolio} aria-label="Loading projects">
    <div className={styles.inner}>
      <LoadingState label="Loading projects" />
    </div>
  </section>
);

export default PortfolioLoading;
