import type { Job, PageMeta, Project, ServicesContent } from '@/types';

import { getResource } from './apiClient';

/** Home page services section copy and cards. */
export const fetchServices = (signal?: AbortSignal): Promise<ServicesContent> =>
  getResource<ServicesContent>('services', signal);

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
