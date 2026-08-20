import styles from './SectionTitle.module.scss';

export type SectionTitleAlign = 'left' | 'center';

interface SectionTitleProps {
  title: string;
  description?: string;
  align?: SectionTitleAlign;
  /** Shows the mint accent rule beneath the heading. */
  withAccent?: boolean;
  id?: string;
}

/** Section heading with optional mint accent rule and supporting description. */
const SectionTitle = ({
  title,
  description,
  align = 'left',
  withAccent = false,
  id,
}: SectionTitleProps) => (
  <header className={`${styles.wrapper} ${styles[align]}`}>
    <h2 className={styles.title} id={id}>
      {title}
    </h2>

    {withAccent && <span className={styles.accent} aria-hidden="true" />}

    {description && <p className={styles.description}>{description}</p>}
  </header>
);

export default SectionTitle;
