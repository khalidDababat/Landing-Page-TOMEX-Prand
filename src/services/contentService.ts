import type { Job, Project, ServicesContent, TeamMember } from '@/types';

import data from '../../data/data.json';

/** Home page services section copy and cards. */
export const fetchServices = async (): Promise<ServicesContent> => data.services as ServicesContent;

/** Portfolio page project collection. */
export const fetchPortfolio = async (): Promise<Project[]> => data.projects as Project[];

/** Careers page job collection. */
export const fetchCareers = async (): Promise<Job[]> => data.jobs as Job[];

/** A single careers opportunity by id, or null when no job has that id. */
export const fetchJob = async (id: string): Promise<Job | null> =>
  (data.jobs as Job[]).find((job) => String(job.id) === id) ?? null;

/** Home page team member collection. */
export const fetchTeam = async (): Promise<TeamMember[]> => data.team as TeamMember[];
