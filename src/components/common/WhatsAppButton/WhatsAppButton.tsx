import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import { getTranslations } from '@/i18n/server';

import styles from './WhatsAppButton.module.scss';

/** WhatsApp number in international format, digits only (no "+", spaces or dashes). */
const WHATSAPP_PHONE_NUMBER = '972597088178';

/** Floating WhatsApp contact button, fixed to the bottom corner at the end of the reading direction. */
const WhatsAppButton = async () => {
  const t = await getTranslations();
  const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(t.whatsapp.message)}`;

  return (
    <a
      className={styles.button}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t.whatsapp.label}
    >
      <WhatsAppIcon className={styles.icon} fontSize="inherit" aria-hidden="true" />
    </a>
  );
};

export default WhatsAppButton;
