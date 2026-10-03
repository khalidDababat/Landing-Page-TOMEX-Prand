import type { Job, Project, ServicesContent } from '@/types';

import { getResource } from './apiClient';

/** Home page services section copy and cards. */
export const fetchServices = (signal?: AbortSignal): Promise<ServicesContent> =>
  getResource<ServicesContent>('services', signal);

/** Portfolio page project collection. */
export const fetchPortfolio = (signal?: AbortSignal): Promise<Project[]> =>
  getResource<Project[]>('projects', signal);

/** Careers page job collection. */
export const fetchCareers = (signal?: AbortSignal): Promise<Job[]> =>
  getResource<Job[]>('jobs', signal);
