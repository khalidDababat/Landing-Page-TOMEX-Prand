'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/common/Button/Button';
import { useTranslations } from '@/i18n/I18nProvider';

/** Re-runs the current route's server fetches (a real new request). */
const RetryButton = () => {
  const t = useTranslations();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <Button disabled={isPending} onClick={() => startTransition(() => router.refresh())}>
      {isPending ? t.states.retrying : t.states.retry}
    </Button>
  );
};

export default RetryButton;
