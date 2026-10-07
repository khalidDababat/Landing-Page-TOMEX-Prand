import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Image from 'next/image';

import Badge from '@/components/common/Badge/Badge';
import { format } from '@/i18n/format';
import { getTranslations } from '@/i18n/server';
import type { TeamMember } from '@/types';

import styles from './TeamMemberCard.module.scss';

interface TeamMemberCardProps {
  member: TeamMember;
}

/** Profile card for one team member; the LinkedIn button only shows when a URL is provided. */
const TeamMemberCard = async ({ member }: TeamMemberCardProps) => {
  const t = await getTranslations();

  return (
    <article className={styles.card}>
      <Image
        className={styles.photo}
        src={member.image}
        alt={format(t.team.memberAlt, { name: member.name, position: member.position })}
        width={112}
        height={112}
      />

      <h3 className={styles.name}>{member.name}</h3>
      <Badge size="sm">{member.position}</Badge>
      <p className={styles.description}>{member.description}</p>

      {member.linkedin && (
        <a
          className={styles.linkedin}
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={format(t.team.linkedinLabel, { name: member.name })}
        >
          <LinkedInIcon className={styles.icon} fontSize="inherit" />
          {t.team.linkedin}
        </a>
      )}
    </article>
  );
};

export default TeamMemberCard;
