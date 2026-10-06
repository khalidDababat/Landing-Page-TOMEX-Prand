import { getTranslations } from '@/i18n/server';

import styles from './AsyncContent.module.scss';

interface EmptyStateProps {
  message?: string;
}

/** Shared "nothing to show" state (Server Component). */
const EmptyState = async ({ message }: EmptyStateProps) => {
  const t = await getTranslations();

  return (
    <div className={styles.state}>
      <p className={styles.message}>{message ?? t.states.nothing}</p>
    </div>
  );
};

export default EmptyState;
