import type { Metadata } from 'next';

import CareerDetails from '@/views/CareerDetails/CareerDetails';

export const metadata: Metadata = {
  title: 'Careers | TOMEX Technology',
  description: 'Opportunity details and application at TOMEX Technology.',
};

interface CareerDetailsPageProps {
  params: Promise<{ id: string }>;
}

const CareerDetailsPage = async ({ params }: CareerDetailsPageProps) => {
  const { id } = await params;

  return <CareerDetails id={id} />;
};

export default CareerDetailsPage;
