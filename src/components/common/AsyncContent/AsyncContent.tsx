import type { ReactNode } from 'react';

import Button from '@/components/common/Button/Button';
import type { FetchStatus } from '@/hooks/useFetch';

import styles from './AsyncContent.module.scss';

interface AsyncContentProps<T> {
  status: FetchStatus;
  error: string | null;
  data: T | null;
  onRetry: () => void;
  /** Rendered once the request succeeded and returned usable data. */
  children: (data: T) => ReactNode;
  loadingLabel?: string;
  emptyMessage?: string;
}

const isEmpty = (data: unknown): boolean => Array.isArray(data) && data.length === 0;

/**
 * Renders the shared loading, error and empty states around fetched content,
 * so pages only describe their success case.
 */
const AsyncContent = <T,>({
  status,
  error,
  data,
  onRetry,
  children,
  loadingLabel = 'Loading',
  emptyMessage = 'Nothing to show yet.',
}: AsyncContentProps<T>) => {
  if (status === 'loading') {
    return (
      <div className={styles.state} role="status" aria-live="polite">
        <span className={styles.spinner} aria-hidden="true" />
        <p className={styles.message}>{loadingLabel}…</p>
      </div>
    );
  }

  if (status === 'error' || !data) {
    return (
      <div className={styles.state} role="alert">
        <p className={styles.message}>{error ?? 'We could not load this content.'}</p>
        <p className={styles.hint}>Make sure the API is running: npm run server</p>
        <Button onClick={onRetry}>Try again</Button>
      </div>
    );
  }

  if (isEmpty(data)) {
    return (
      <div className={styles.state}>
        <p className={styles.message}>{emptyMessage}</p>
      </div>
    );
  }

  return <>{children(data)}</>;
};

export default AsyncContent;
