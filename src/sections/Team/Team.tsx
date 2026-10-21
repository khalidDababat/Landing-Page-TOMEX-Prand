import EmptyState from '@/components/common/AsyncContent/EmptyState';
import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import TeamMemberCard from '@/components/common/TeamMemberCard/TeamMemberCard';
import { getTranslations } from '@/i18n/server';
import { fetchTeam } from '@/services/contentService';

import styles from './Team.module.scss';

/** Team section: static heading, member cards from the local content data. */
const Team = async () => {
  const t = await getTranslations();
  const members = await fetchTeam();

  return (
    <section className={styles.team} id="team" aria-labelledby="team-title">
      <div className={styles.inner}>
        <SectionTitle
          title={t.team.title}
          description={t.team.description}
          align="center"
          id="team-title"
        />

        {members.length === 0 ? (
          <EmptyState message={t.team.empty} />
        ) : (
          <ul className={styles.cards}>
            {members.map((member) => (
              <li key={member.id}>
                <TeamMemberCard member={member} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Team;
