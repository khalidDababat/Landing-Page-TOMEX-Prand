'use client';

import type { ReactNode } from 'react';

import { showComingSoonToast } from '@/utils/toast';

interface ComingSoonButtonProps {
  children: ReactNode;
  className?: string;
}

/** Client-side button that shows the "coming soon" toast, usable from Server Components. */
const ComingSoonButton = ({ children, className }: ComingSoonButtonProps) => (
  <button className={className} type="button" onClick={showComingSoonToast}>
    {children}
  </button>
);

export default ComingSoonButton;
