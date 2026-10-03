import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import type { AboutContent } from '@/types';
import { iconRegistry } from '@/utils/iconRegistry';

import styles from './About.module.scss';

const content: AboutContent = {
  title: 'About TOMEX',
  cards: [
    {
      id: 'web-software',
      icon: 'code',
      title: 'Web & Software',
      description:
        'Building scalable, secure, and high-performance digital platforms tailored for enterprise needs.',
    },
    {
      id: 'programming-education',
      icon: 'school',
      title: 'Programming Education',
      description:
        'Empowering the next generation of developers with industry-leading curriculum and mentorship.',
    },
    {
      id: 'ai-powered-video',
      icon: 'video',
      title: 'AI-Powered Video',
      description:
        'Leveraging artificial intelligence to automate and elevate digital content creation workflows.',
    },
  ],
  pillars: [
    {
      id: 'vision',
      icon: 'vision',
      title: 'Our Vision',
      description:
        'To be the leading global partner for enterprises seeking intelligent, design-driven technology solutions that redefine industry standards and drive sustainable innovation.',
    },
    {
      id: 'mission',
      icon: 'rocket',
      title: 'Our Mission',
      description:
        'We deliver precision-engineered software, transformative educational experiences, and advanced AI content solutions, ensuring our clients stay ahead in a rapidly evolving digital landscape.',
    },
  ],
};

/** About section: three focus-area cards plus the vision and mission cards. */
const About = () => (
  <section className={styles.about} id="about" aria-labelledby="about-title">
    <div className={styles.inner}>
      <SectionTitle title={content.title} align="center" withAccent id="about-title" />

      <ul className={styles.cards}>
        {content.cards.map((card) => {
          const Icon = iconRegistry[card.icon];

          return (
            <li className={styles.card} key={card.id}>
              <span className={styles.iconBox} aria-hidden="true">
                <Icon className={styles.icon} fontSize="inherit" />
              </span>

              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardDescription}>{card.description}</p>
            </li>
          );
        })}
      </ul>

      <ul className={styles.pillars}>
        {content.pillars.map((pillar) => {
          const Icon = iconRegistry[pillar.icon];

          return (
            <li className={`${styles.pillar} ${styles[pillar.id]}`} key={pillar.id}>
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

export default About;
