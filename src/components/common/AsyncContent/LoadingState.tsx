import styles from './AsyncContent.module.scss';

interface LoadingStateProps {
  label?: string;
}

/** Shared loading indicator (spinner + message). */
const LoadingState = ({ label = 'Loading' }: LoadingStateProps) => (
  <div className={styles.state} role="status" aria-live="polite">
    <span className={styles.spinner} aria-hidden="true" />
    <p className={styles.message}>{label}…</p>
  </div>
);

export default LoadingState;
