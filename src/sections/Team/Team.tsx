import EmptyState from '@/components/common/AsyncContent/EmptyState';
import ErrorState from '@/components/common/AsyncContent/ErrorState';
import SectionTitle from '@/components/common/SectionTitle/SectionTitle';
import TeamMemberCard from '@/components/common/TeamMemberCard/TeamMemberCard';
import { fetchTeam } from '@/services/contentService';
import type { TeamMember } from '@/types';

import styles from './Team.module.scss';

/** Team section: static heading, member cards fetched from the API on the server. */
const Team = async () => {
  let members: TeamMember[] | null = null;
  let errorMessage: string | null = null;

  try {
    members = await fetchTeam();
  } catch (cause: unknown) {
    errorMessage = cause instanceof Error ? cause.message : 'Something went wrong.';
  }

  return (
    <section className={styles.team} id="team" aria-labelledby="team-title">
      <div className={styles.inner}>
        <SectionTitle
          title="Meet Our Team"
          description="Meet our outstanding team members."
          align="center"
          id="team-title"
        />

        {!members ? (
          <ErrorState message={errorMessage ?? undefined} />
        ) : members.length === 0 ? (
          <EmptyState message="Our team will be introduced soon." />
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
