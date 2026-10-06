import EmptyState from '@/components/common/AsyncContent/EmptyState';
import ErrorState from '@/components/common/AsyncContent/ErrorState';
import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import TeamMemberCard from '@/components/common/TeamMemberCard/TeamMemberCard';
import { getTranslations } from '@/i18n/server';
import { fetchTeam } from '@/services/contentService';
import type { TeamMember } from '@/types';

import styles from './Team.module.scss';

/** Team section: static heading, member cards fetched from the API on the server. */
const Team = async () => {
  const t = await getTranslations();
  let members: TeamMember[] | null = null;

  try {
    members = await fetchTeam();
  } catch {
    members = null;
  }

  return (
    <section className={styles.team} id="team" aria-labelledby="team-title">
      <div className={styles.inner}>
        <SectionTitle
          title={t.team.title}
          description={t.team.description}
          align="center"
          id="team-title"
        />

        {!members ? (
          <ErrorState />
        ) : members.length === 0 ? (
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
