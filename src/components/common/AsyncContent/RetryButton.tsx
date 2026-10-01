'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button/Button';

/** Re-runs the current route's server fetches (a real new request). */
const RetryButton = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button disabled={isPending} onClick={() => startTransition(() => router.refresh())}>
      {isPending ? 'Retrying…' : 'Try again'}
    </Button>
  );
};

export default RetryButton;
