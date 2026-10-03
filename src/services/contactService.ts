import type { ContactFormValues, ContactSubmitResult } from '@/types';

export const sendContactMessage = async (
  values: ContactFormValues
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
        message: 'Failed to send message. Please try again.',
      };
    }

    return {
      success: true,
      message: 'Your message has been sent successfully!',
    };
  } catch (error) {
    console.error('Contact submission error:', error);

    return {
      success: false,
      message: 'Something went wrong. Please try again.',
    };
  }
};
