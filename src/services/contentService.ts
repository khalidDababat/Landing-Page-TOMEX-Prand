import type {
  AboutContent,
  ContactContent,
  FooterContent,
  HeroContent,
  HomeContent,
  Job,
  PageMeta,
  Project,
  ServicesContent,
} from '@/types';

import { getResource } from './apiClient';

/** Home page copy, fetched in parallel from the individual endpoints. */
export const fetchHomeContent = async (signal?: AbortSignal): Promise<HomeContent> => {
  const [hero, about, services, contact] = await Promise.all([
    getResource<HeroContent>('hero', signal),
    getResource<AboutContent>('about', signal),
    getResource<ServicesContent>('services', signal),
    getResource<ContactContent>('contact', signal),
  ]);

  return { hero, about, services, contact };
};

export const fetchFooterContent = (signal?: AbortSignal): Promise<FooterContent> =>
  getResource<FooterContent>('footer', signal);

/** Portfolio page heading plus its project collection. */
export const fetchPortfolio = async (
  signal?: AbortSignal
): Promise<{ meta: PageMeta; projects: Project[] }> => {
  const [meta, projects] = await Promise.all([
    getResource<PageMeta>('portfolio', signal),
    getResource<Project[]>('projects', signal),
  ]);

  return { meta, projects };
};

/** Careers page heading plus its job collection. */
export const fetchCareers = async (
  signal?: AbortSignal
): Promise<{ meta: PageMeta; jobs: Job[] }> => {
  const [meta, jobs] = await Promise.all([
    getResource<PageMeta>('careers', signal),
    getResource<Job[]>('jobs', signal),
  ]);

  return { meta, jobs };
};
