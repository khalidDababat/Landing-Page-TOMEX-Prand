import { useState } from 'react';

import { useTranslations } from '@/i18n/I18nProvider';
import { sendContactMessage } from '@/services/contactService';
import type { ContactFormErrors, ContactFormStatus, ContactFormValues } from '@/types';
import { validateContactForm } from '@/utils/validation';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  message: '',
};

const isFormField = (name: string): name is keyof ContactFormValues => name in INITIAL_VALUES;

/** Controlled contact form state with client-side validation. */
export const useContactForm = () => {
  const t = useTranslations();
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>('idle');
  const [feedback, setFeedback] = useState('');

  /** Updates the field named by the input's `name` and clears that field's error. */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (!isFormField(name)) {
      return;
    }

    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateContactForm(values, t.validation);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setStatus('error');
      setFeedback(t.contact.fixFields);
      return;
    }

    setStatus('submitting');
    setFeedback('');

    const result = await sendContactMessage(values, t.contact);

    setStatus(result.success ? 'success' : 'error');
    setFeedback(result.message);

    if (result.success) {
      setValues(INITIAL_VALUES);
    }
  };

  return { values, errors, status, feedback, handleChange, handleSubmit };
};
