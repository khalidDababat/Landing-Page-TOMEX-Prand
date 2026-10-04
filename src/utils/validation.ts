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

/** Validates the contact form and returns one message per invalid field. */
export const validateContactForm = (values: ContactFormValues): ContactFormErrors => {
  const errors: ContactFormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < MIN_NAME_LENGTH) {
    errors.name = `Name must be at least ${MIN_NAME_LENGTH} characters.`;
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = 'Please tell us about your project.';
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters.`;
  }

  return errors;
};

export const MAX_FILE_SIZE_MB = 5;
/** Value for the file input's `accept` attribute. */
export const FILE_ACCEPT = '.pdf,.doc,.docx';

const ALLOWED_FILE_EXTENSIONS = ['.pdf', '.doc', '.docx'];
const MIN_PHONE_DIGITS = 7;
const MAX_PHONE_DIGITS = 15;

const validateFile = (file: File): string | undefined => {
  const name = file.name.toLowerCase();

  if (!ALLOWED_FILE_EXTENSIONS.some((extension) => name.endsWith(extension))) {
    return 'Please upload a PDF, DOC or DOCX file.';
  }

  if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
    return `File must be ${MAX_FILE_SIZE_MB} MB or smaller.`;
  }

  return undefined;
};

/** Validates the application form; Education asks for different fields than Role and Internship. */
export const validateApplication = (
  type: JobType,
  values: ApplicationFormValues
): ApplicationFormErrors => {
  const errors: ApplicationFormErrors = {};
  const isEducation = type === 'Education';

  const fullName = values.fullName.trim();
  if (!fullName) {
    errors.fullName = 'Please enter your full name.';
  } else if (isEducation && fullName.split(/\s+/).length < 2) {
    errors.fullName = 'Please enter your first and last name.';
  } else if (fullName.length < MIN_NAME_LENGTH) {
    errors.fullName = `Name must be at least ${MIN_NAME_LENGTH} characters.`;
  }

  const phoneDigits = values.phone.replace(/\D/g, '').length;
  if (!values.phone.trim()) {
    errors.phone = isEducation
      ? 'Please enter your WhatsApp number.'
      : 'Please enter your phone number.';
  } else if (
    phoneDigits < MIN_PHONE_DIGITS ||
    phoneDigits > MAX_PHONE_DIGITS ||
    !/^[\d\s()+-]+$/.test(values.phone)
  ) {
    errors.phone = 'Please enter a valid phone number.';
  }

  if (values.cv) {
    errors.cv = validateFile(values.cv);
  } else if (!isEducation) {
    errors.cv = 'Please upload your CV / resume.';
  }

  if (isEducation) {
    if (!values.level) {
      errors.level = 'Please choose your current level.';
    }

    if (!values.about.trim()) {
      errors.about = 'Please tell us about yourself.';
    }
  } else {
    const email = values.email.trim();
    if (!email) {
      errors.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(email)) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  return Object.fromEntries(
    Object.entries(errors).filter(([, message]) => message)
  ) as ApplicationFormErrors;
};
