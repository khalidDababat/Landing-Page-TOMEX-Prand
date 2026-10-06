'use client';

import type { ReactNode } from 'react';

import { useTranslations } from '@/i18n/I18nProvider';
import { showComingSoon } from '@/utils/toast';

interface ComingSoonButtonProps {
  children: ReactNode;
  className?: string;
}

/** Client-side button that shows the "coming soon" toast, usable from Server Components. */
const ComingSoonButton = ({ children, className }: ComingSoonButtonProps) => {
  const t = useTranslations();

  return (
    <button
      className={className}
      type="button"
      onClick={() =>
        showComingSoon({
          title: t.comingSoon.caseStudyTitle,
          message: t.comingSoon.caseStudyMessage,
        })
      }
    >
      {children}
    </button>
  );
};

export default ComingSoonButton;
