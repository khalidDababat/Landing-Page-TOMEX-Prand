import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import { getTranslations } from '@/i18n/server';
import type { Dictionary } from '@/i18n/en';
import type { IconName } from '@/types';
import { iconRegistry } from '@/utils/iconRegistry';

import styles from './About.module.scss';

type PillarKey = keyof Dictionary['about']['pillars'];

const PILLARS: { id: PillarKey; icon: IconName }[] = [
  { id: 'vision', icon: 'vision' },
  { id: 'mission', icon: 'rocket' },
];

/** About section: three focus-area cards plus the vision and mission cards. */
const About = async () => {
  const t = await getTranslations();

  return (
    <section className={styles.about} id="about" aria-labelledby="about-title">
      <div className={styles.inner}>
        <SectionTitle title={t.about.title} align="center" withAccent id="about-title" />

        <div className={styles.intro}>
          <p className={styles.introText}>{t.about.intro}</p>
        </div>

        <ul className={styles.pillars}>
          {PILLARS.map(({ id, icon }) => {
            const Icon = iconRegistry[icon];
            const pillar = t.about.pillars[id];

            return (
              <li className={`${styles.pillar} ${styles[id]}`} key={id}>
                <h3 className={styles.pillarTitle}>
                  <Icon className={styles.pillarIcon} fontSize="inherit" aria-hidden="true" />
                  {pillar.title}
                </h3>

                <p className={styles.pillarDescription}>{pillar.description}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default About;
