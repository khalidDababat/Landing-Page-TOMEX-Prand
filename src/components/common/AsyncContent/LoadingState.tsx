import { getTranslations } from '@/i18n/server';

import styles from './AsyncContent.module.scss';

interface LoadingStateProps {
  label?: string;
}

/** Shared loading indicator (spinner + message) (Server Component). */
const LoadingState = async ({ label }: LoadingStateProps) => {
  const t = await getTranslations();

  return (
    <div className={styles.state} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.message}>{label ?? t.states.loading}…</p>
    </div>
  );
};

export default LoadingState;
