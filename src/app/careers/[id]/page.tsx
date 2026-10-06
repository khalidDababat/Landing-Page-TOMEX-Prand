import type { Metadata } from 'next';

import { getTranslations } from '@/i18n/server';
import CareerDetails from '@/views/CareerDetails/CareerDetails';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t.meta.careersTitle,
    description: t.meta.careersDescription,
  };
};

interface CareerDetailsPageProps {
  params: Promise<{ id: string }>;
}

const CareerDetailsPage = async ({ params }: CareerDetailsPageProps) => {
  const { id } = await params;

  return <CareerDetails id={id} />;
};

export default CareerDetailsPage;
