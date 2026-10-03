'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button/Button';
import styles from '@/components/common/AsyncContent/AsyncContent.module.scss';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/** Safety net for unexpected render errors; expected API failures are handled inline. */
const GlobalRouteError = ({ reset }: ErrorProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const retry = (): void =>
    startTransition(() => {
      router.refresh();
      reset();
    });

  return (
    <div className={styles.state} role="alert">
      <p className={styles.message}>Something went wrong while loading this page.</p>
      <Button disabled={isPending} onClick={retry}>
        {isPending ? 'Retrying…' : 'Try again'}
      </Button>
    </div>
  );
};

export default GlobalRouteError;
