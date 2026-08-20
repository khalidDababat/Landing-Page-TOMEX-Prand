import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Badge from '@/components/common/Badge/Badge';
import type { Project } from '@/types';

import styles from './ProjectCard.module.scss';

interface ProjectCardProps {
  project: Project;
  /** Invoked by the optional case-study link. */
  onOpenLink: () => void;
}

/**
 * Portfolio card. One component covers all three bento shapes — the layout is
 * chosen by `project.variant` rather than by duplicating the markup.
 */
const ProjectCard = ({ project, onOpenLink }: ProjectCardProps) => {
  const media = (
    <div className={styles.media}>
      <img
        className={styles.image}
        src={project.image.src}
        alt={project.image.alt}
        loading="lazy"
      />

      {project.variant === 'overlay' && <span className={styles.scrim} aria-hidden="true" />}
    </div>
  );

  const body = (
    <div className={styles.body}>
      <p className={styles.category}>{project.category}</p>
      <h2 className={styles.title}>{project.title}</h2>
      <p className={styles.description}>{project.description}</p>

      {project.tags.length > 0 && (
        <ul className={styles.tags}>
          {project.tags.map((tag) => (
            <li key={tag}>
              <Badge size="sm">{tag}</Badge>
            </li>
          ))}
        </ul>
      )}

      {project.linkLabel && (
        <button className={styles.link} type="button" onClick={onOpenLink}>
          {project.linkLabel}
          <ArrowForwardIcon className={styles.linkIcon} fontSize="inherit" />
        </button>
      )}
    </div>
  );

  if (project.variant === 'overlay') {
    return (
      <article className={`${styles.card} ${styles.overlay}`}>
        <div className={styles.overlayMedia}>
          {media}
          {body}
        </div>

        <div className={styles.overlayFooter} aria-hidden="true" />
      </article>
    );
  }

  if (project.variant === 'split') {
    return (
      <article className={`${styles.card} ${styles.split}`}>
        {body}
        {media}
      </article>
    );
  }

  return (
    <article className={`${styles.card} ${styles.stacked}`}>
      {media}
      {body}
    </article>
  );
};

export default ProjectCard;
