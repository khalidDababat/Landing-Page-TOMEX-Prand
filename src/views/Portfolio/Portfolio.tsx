import EmptyState from '@/components/common/AsyncContent/EmptyState';
import ErrorState from '@/components/common/AsyncContent/ErrorState';
import ProjectCard from '@/components/common/ProjectCard/ProjectCard';
import { fetchPortfolio } from '@/services/contentService';
import type { Project } from '@/types';

import styles from './Portfolio.module.scss';

/** Portfolio page showing the project collection from the API (fetched on the server). */
const Portfolio = async () => {
  let projects: Project[] | null = null;
  let errorMessage: string | null = null;

  try {
    projects = await fetchPortfolio();
  } catch (cause: unknown) {
    errorMessage = cause instanceof Error ? cause.message : 'Something went wrong.';
  }

  return (
    <section className={styles.portfolio} aria-labelledby="portfolio-title">
      <div className={styles.inner}>
        {errorMessage !== null || !projects ? (
          <ErrorState message={errorMessage ?? undefined} />
        ) : projects.length === 0 ? (
          <EmptyState message="No projects have been published yet." />
        ) : (
          <>
            <header className={styles.header}>
              <h1 className={styles.title} id="portfolio-title">
                Our Portfolio
              </h1>
              <p className={styles.description}>
                Showcasing our precision in technology and creative design.
              </p>
            </header>

            <div className={styles.grid}>
              {projects.map((project) => (
                <div className={styles[project.variant]} key={project.id}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
