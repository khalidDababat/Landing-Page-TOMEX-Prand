import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import type { AboutContent } from '@/types';
import { iconRegistry } from '@/utils/iconRegistry';

import styles from './About.module.scss';

const content: AboutContent = {
  title: 'About TOMEX',
  cards: [
    {
      id: 'Web-Software-Development',
      icon: 'code',
      title: 'Web & Software Development',
      description:
        'We build modern, secure, and scalable websites and software solutions that help businesses grow and succeed in the digital world.',
    },
    {
      id: 'tech-education',
      icon: 'school',
      title: 'Tech Education',
      description:
        'We empower aspiring developers and professionals through practical courses, hands-on training, and real-world technical knowledge.',
    },
    {
      id: 'ai-powered-video',
      icon: 'video',
      title: 'AI Content Creation',
      description:
        'We transform ideas into engaging visual content using AI-powered tools for video generation, creative production, and digital storytelling.',
    },
  ],
  pillars: [
    {
      id: 'vision',
      icon: 'vision',
      title: 'Our Vision',
      description:
        'To become a trusted technology and creative partner, empowering individuals and businesses through innovative digital solutions, education, and artificial intelligence.',
    },
    {
      id: 'mission',
      icon: 'rocket',
      title: 'Our Mission',
      description:
        'To turn ideas into meaningful digital experiences by combining modern software development, practical technology education, and AI-powered creativity.',
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
