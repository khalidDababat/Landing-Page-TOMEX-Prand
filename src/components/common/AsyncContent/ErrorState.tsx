import styles from './AsyncContent.module.scss';
import RetryButton from './RetryButton';

interface ErrorStateProps {
  message?: string;
}

/** Shared error state with a retry that re-requests the data on the server. */
const ErrorState = ({ message = 'We could not load this content.' }: ErrorStateProps) => (
  <div className={styles.state} role="alert">
    <p className={styles.message}>{message}</p>
    <p className={styles.hint}>Make sure the API is running: npm run server</p>
    <RetryButton />
  </div>
);

export default ErrorState;
