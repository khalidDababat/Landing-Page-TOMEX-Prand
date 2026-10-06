import { getTranslations } from '@/i18n/server';

import styles from './AsyncContent.module.scss';
import RetryButton from './RetryButton';

/** Shared error state with a retry that re-requests the data on the server (Server Component). */
const ErrorState = async () => {
  const t = await getTranslations();

  return (
    <div className={styles.state} role="alert">
      <p className={styles.message}>{t.states.loadError}</p>
      <p className={styles.hint}>{t.states.apiHint}</p>
      <RetryButton />
    </div>
  );
};

export default ErrorState;
