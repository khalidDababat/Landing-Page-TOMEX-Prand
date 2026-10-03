'use client';

import type { ReactNode } from 'react';

import { useHashScroll } from '@/hooks/useHashScroll';

interface ScrollManagerProps {
  children: ReactNode;
}


const ScrollManager = ({ children }: ScrollManagerProps) => {
  useHashScroll();

  return <>{children}</>;
};

export default ScrollManager;
