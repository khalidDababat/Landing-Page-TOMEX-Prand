import EmptyState from '@/components/common/AsyncContent/EmptyState';
import ErrorState from '@/components/common/AsyncContent/ErrorState';
import ProjectCard from '@/components/common/ProjectCard/ProjectCard';
import { getTranslations } from '@/i18n/server';
import { fetchPortfolio } from '@/services/contentService';
import type { Project } from '@/types';

import styles from './Portfolio.module.scss';

/** Portfolio page showing the project collection from the API (fetched on the server). */
const Portfolio = async () => {
  const t = await getTranslations();
  let projects: Project[] | null = null;

  try {
    projects = await fetchPortfolio();
  } catch {
    projects = null;
  }

  return (
    <section className={styles.portfolio} aria-labelledby="portfolio-title">
      <div className={styles.inner}>
        {!projects ? (
          <ErrorState />
        ) : projects.length === 0 ? (
          <EmptyState message={t.portfolio.empty} />
        ) : (
          <>
            <header className={styles.header}>
              <h1 className={styles.title} id="portfolio-title">
                {t.portfolio.title}
              </h1>
              <p className={styles.description}>{t.portfolio.description}</p>
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
