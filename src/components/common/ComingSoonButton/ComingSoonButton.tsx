'use client';

import type { ReactNode } from 'react';

import Button, { type ButtonVariant } from '@/components/common/Button/Button';
import { showComingSoonToast } from '@/utils/toast';

interface ComingSoonButtonProps {
  children: ReactNode;
  className?: string;
  /** When set, renders the brand `Button`; otherwise a plain `<button>` for custom styling. */
  variant?: ButtonVariant;
}

/** Client-side button that shows the "coming soon" toast, usable from Server Components. */
const ComingSoonButton = ({ children, className, variant }: ComingSoonButtonProps) => {
  if (variant) {
    return (
      <Button variant={variant} className={className} onClick={showComingSoonToast}>
        {children}
      </Button>
    );
  }

  return (
    <button className={className} type="button" onClick={showComingSoonToast}>
      {children}
    </button>
  );
};

export default ComingSoonButton;
