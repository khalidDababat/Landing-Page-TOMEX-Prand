import { useCallback, useState } from 'react';

import { sendContactMessage } from '@/services/contactService';
import type { ContactFormErrors, ContactFormStatus, ContactFormValues } from '@/types';
import { validateContactForm } from '@/utils/validation';

const INITIAL_VALUES: ContactFormValues = {
  name: '',
  email: '',
  message: '',
};

interface UseContactFormResult {
  values: ContactFormValues;
  errors: ContactFormErrors;
  status: ContactFormStatus;
  feedback: string;
  handleChange: (field: keyof ContactFormValues, value: string) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

/** Controlled contact form state with client-side validation. */
export const useContactForm = (): UseContactFormResult => {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [status, setStatus] = useState<ContactFormStatus>('idle');
  const [feedback, setFeedback] = useState<string>('');

  const handleChange = useCallback((field: keyof ContactFormValues, value: string): void => {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      if (!previous[field]) {
        return previous;
      }

      const next = { ...previous };
      delete next[field];
      return next;
    });
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault();

      const validationErrors = validateContactForm(values);
      setErrors(validationErrors);

      if (Object.keys(validationErrors).length > 0) {
        setStatus('error');
        setFeedback('Please fix the highlighted fields.');
        return;
      }

      setStatus('submitting');
      setFeedback('');

      const result = await sendContactMessage(values);

      setStatus(result.success ? 'success' : 'error');
      setFeedback(result.message);

      if (result.success) {
        setValues(INITIAL_VALUES);
      }
    },
    [values]
  );

  return { values, errors, status, feedback, handleChange, handleSubmit };
};
