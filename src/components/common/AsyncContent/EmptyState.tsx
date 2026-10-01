import styles from './AsyncContent.module.scss';

interface EmptyStateProps {
  message?: string;
}

/** Shared "nothing to show" state. */
const EmptyState = ({ message = 'Nothing to show yet.' }: EmptyStateProps) => (
  <div className={styles.state}>
    <p className={styles.message}>{message}</p>
  </div>
);

export default EmptyState;
