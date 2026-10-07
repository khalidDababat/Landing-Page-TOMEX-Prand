'use client';

import type { ReactNode } from 'react';

import Button from '@/components/common/Button/Button';
import type { FetchStatus } from '@/hooks/useFetch';
import { useTranslations } from '@/i18n/I18nProvider';

import styles from './AsyncContent.module.scss';

interface AsyncContentProps<T> {
  status: FetchStatus;
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
 * so pages only describe their success case. Texts default to the active language.
 */
const AsyncContent = <T,>({
  status,
  data,
  onRetry,
  children,
  loadingLabel,
  emptyMessage,
}: AsyncContentProps<T>) => {
  const t = useTranslations();

  if (status === 'loading') {
    return (
      <div className={styles.state} role="status" aria-live="polite">
        <span className={styles.spinner} aria-hidden="true" />
        <p className={styles.message}>{loadingLabel ?? t.states.loading}…</p>
      </div>
    );
  }

  if (status === 'error' || !data) {
    return (
      <div className={styles.state} role="alert">
        <p className={styles.message}>{t.states.loadError}</p>
        <p className={styles.hint}>{t.states.apiHint}</p>
        <Button onClick={onRetry}>{t.states.retry}</Button>
      </div>
    );
  }

  if (isEmpty(data)) {
    return (
      <div className={styles.state}>
        <p className={styles.message}>{emptyMessage ?? t.states.nothing}</p>
      </div>
    );
  }

  return <>{children(data)}</>;
};

export default AsyncContent;
