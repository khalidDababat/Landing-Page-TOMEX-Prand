import AsyncContent from '@/components/common/AsyncContent/AsyncContent';
import ProjectCard from '@/components/common/ProjectCard/ProjectCard';
import { useFetch } from '@/hooks/useFetch';
import { fetchPortfolio } from '@/services/contentService';
import { showComingSoonToast } from '@/utils/toast';

import styles from './Portfolio.module.scss';

/** Portfolio page showing the project collection from the API. */
const Portfolio = () => {
  const { data, status, error, retry } = useFetch(fetchPortfolio);

  return (
    <section className={styles.portfolio} aria-labelledby="portfolio-title">
      <div className={styles.inner}>
        <AsyncContent
          status={status}
          error={error}
          data={data}
          onRetry={retry}
          loadingLabel="Loading projects"
          emptyMessage="No projects have been published yet."
        >
          {({ meta, projects }) => (
            <>
              <header className={styles.header}>
                <h1 className={styles.title} id="portfolio-title">
                  {meta.title}
                </h1>
                <p className={styles.description}>{meta.description}</p>
              </header>

              <div className={styles.grid}>
                {projects.map((project) => (
                  <div className={styles[project.variant]} key={project.id}>
                    <ProjectCard project={project} onOpenLink={showComingSoonToast} />
                  </div>
                ))}
              </div>
            </>
          )}
        </AsyncContent>
      </div>
    </section>
  );
};

export default Portfolio;
