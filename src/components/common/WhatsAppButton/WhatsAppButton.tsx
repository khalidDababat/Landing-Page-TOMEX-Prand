import WhatsAppIcon from '@mui/icons-material/WhatsApp';

import styles from './WhatsAppButton.module.scss';

/** WhatsApp number in international format, digits only (no "+", spaces or dashes). */
const WHATSAPP_PHONE_NUMBER = '972597088178';

const WHATSAPP_MESSAGE = "Hello TOMEX, I'd like to enquire about your services.";

const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

/** Floating WhatsApp contact button, fixed to the bottom-right corner. */
const WhatsAppButton = () => (
  <a
    className={styles.button}
    href={WHATSAPP_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with TOMEX on WhatsApp"
  >
    <WhatsAppIcon className={styles.icon} fontSize="inherit" aria-hidden="true" />
  </a>
);

export default WhatsAppButton;
