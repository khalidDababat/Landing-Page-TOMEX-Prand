import { format } from '@/i18n/format';
import type { Dictionary } from '@/i18n/en';
import type {
  ApplicationFormErrors,
  ApplicationFormValues,
  ContactFormErrors,
  ContactFormValues,
  JobType,
} from '@/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 10;

/** Validation messages of the active language (`t.validation`). */
type Messages = Dictionary['validation'];

/** Validates the contact form and returns one message per invalid field. */
export const validateContactForm = (
  values: ContactFormValues,
  messages: Messages
): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = messages.nameRequired;
  } else if (name.length < MIN_NAME_LENGTH) {
    errors.name = format(messages.nameMin, { min: MIN_NAME_LENGTH });
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = messages.emailRequired;
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = messages.emailInvalid;
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = messages.messageRequired;
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = format(messages.messageMin, { min: MIN_MESSAGE_LENGTH });
  }

  return errors;
};

export const MAX_FILE_SIZE_MB = 5;
/** Value for the file input's `accept` attribute. */
export const FILE_ACCEPT = '.pdf,.doc,.docx';

const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const MIN_PHONE_DIGITS = 7;
const MAX_PHONE_DIGITS = 15;

const validateFile = (file: File, messages: Messages): string | undefined => {
  const name = file.name.toLowerCase();

  if (!ALLOWED_FILE_EXTENSIONS.some((extension) => name.endsWith(extension))) {
    return messages.cvType;
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return format(messages.cvSize, { size: MAX_FILE_SIZE_MB });
  }

  return undefined;
};

/** Validates the application form; Education asks for different fields than Role and Internship. */
export const validateApplication = (
  type: JobType,
  values: ApplicationFormValues,
  messages: Messages
): ApplicationFormErrors => {
  const errors: ApplicationFormErrors = {};
  const isEducation = type === 'Education';

  const fullName = values.fullName.trim();
  if (!fullName) {
    errors.fullName = messages.fullNameRequired;
  } else if (isEducation && fullName.split(/\s+/).length < 2) {
    errors.fullName = messages.fullNameParts;
  } else if (fullName.length < MIN_NAME_LENGTH) {
    errors.fullName = format(messages.nameMin, { min: MIN_NAME_LENGTH });
  }

  const phoneDigits = values.phone.replace(/\D/g, '').length;
  if (!values.phone.trim()) {
    errors.phone = isEducation ? messages.whatsappRequired : messages.phoneRequired;
  } else if (
    phoneDigits < MIN_PHONE_DIGITS ||
    phoneDigits > MAX_PHONE_DIGITS ||
    !/^[\d\s()+-]+$/.test(values.phone)
  ) {
    errors.phone = messages.phoneInvalid;
  }

  if (values.cv) {
    errors.cv = validateFile(values.cv, messages);
  } else if (!isEducation) {
    errors.cv = messages.cvRequired;
  }

  if (isEducation) {
    if (!values.level) {
      errors.level = messages.levelRequired;
    }

    if (!values.about.trim()) {
      errors.about = messages.aboutRequired;
    }
  } else {
    const email = values.email.trim();
    if (!email) {
      errors.email = messages.emailRequired;
    } else if (!EMAIL_PATTERN.test(email)) {
      errors.email = messages.emailInvalid;
    }
  }

  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => message)
  ) as ApplicationFormErrors;
};
