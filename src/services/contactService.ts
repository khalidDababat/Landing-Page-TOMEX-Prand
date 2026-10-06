import type { Dictionary } from '@/i18n/en';
import type { ContactFormValues, ContactSubmitResult } from '@/types';

export const sendContactMessage = async (
  values: ContactFormValues,
  messages: Dictionary['contact']
): Promise<ContactSubmitResult> => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      return {
        success: false,
        message: messages.sendFailed,
      };
    }

    return {
      success: true,
      message: messages.success,
    };
  } catch (error) {
    console.error('Contact submission error:', error);

    return {
      success: false,
      message: messages.genericError,
    };
  }
};
