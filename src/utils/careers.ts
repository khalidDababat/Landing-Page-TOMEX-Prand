import type { Job } from '@/types';

/** Where a job's "Apply" action leads. */
export type ApplyTarget =
  { kind: 'internal'; href: string } | { kind: 'external'; href: string } | { kind: 'unavailable' };

/** Returns the configured external form URL only when it is a valid HTTPS link. */
const getHttpsUrl = (value: string | null): string | null => {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url.href : null;
  } catch {
    return null;
  }
};

/**
 * Resolves the apply action for a job. External forms are honoured for
 * Education opportunities only; everything else uses the internal details page.
 */
export const getApplyTarget = (job: Job): ApplyTarget => {
  if (job.type !== 'Education' || job.application?.method !== 'external') {
    return { kind: 'internal', href: `/careers/${job.id}` };
  }

  const href = getHttpsUrl(job.application.externalUrl);
  return href ? { kind: 'external', href } : { kind: 'unavailable' };
};
