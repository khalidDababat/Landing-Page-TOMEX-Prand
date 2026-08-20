import { useCallback, useEffect, useState } from 'react';

export type FetchStatus = 'loading' | 'success' | 'error';

type Fetcher<T> = (signal: AbortSignal) => Promise<T>;

interface UseFetchResult<T> {
  data: T | null;
  status: FetchStatus;
  error: string | null;
  /** Re-runs the request, e.g. from an error state's retry button. */
  retry: () => void;
}

/**
 * Generic data-fetching hook shared by every page.
 *
 * Handles the request lifecycle, aborts in-flight requests on unmount and
 * exposes a retry, so no page implements this logic itself.
 */
export const useFetch = <T>(fetcher: Fetcher<T>): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>('loading');
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback((): void => setAttempt((value) => value + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setStatus('loading');
    setError(null);

    fetcher(controller.signal)
      .then((result) => {
        if (!active) {
          return;
        }

        setData(result);
        setStatus('success');
      })
      .catch((cause: unknown) => {
        if (!active || controller.signal.aborted) {
          return;
        }

        setError(cause instanceof Error ? cause.message : 'Something went wrong.');
        setStatus('error');
      });

    return () => {
      active = false;
      controller.abort();
    };
    // `fetcher` is expected to be a stable module-level function.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  return { data, status, error, retry };
};
