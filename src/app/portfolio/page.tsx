import type { Metadata } from 'next';

import { getTranslations } from '@/i18n/server';
import Portfolio from '@/views/Portfolio/Portfolio';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t.meta.portfolioTitle,
    description: t.meta.portfolioDescription,
  };
};

export default Portfolio;
