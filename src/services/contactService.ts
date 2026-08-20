import type { ContactFormValues, ContactSubmitResult } from '@/types';

const CONTACT_API_URL = import.meta.env.VITE_CONTACT_API_URL ?? '';
const SIMULATED_LATENCY_MS = 600;

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Sends a contact request.
 *
 * When `VITE_CONTACT_API_URL` is configured the payload is posted to that
 * endpoint; otherwise the submission resolves locally so the form stays
 * fully functional without a backend.
 */
export const sendContactMessage = async (
  values: ContactFormValues
): Promise<ContactSubmitResult> => {
  if (!CONTACT_API_URL) {
    await delay(SIMULATED_LATENCY_MS);
    return { success: true, message: 'Thanks! Your message has been sent.' };
  }

  try {
    const response = await fetch(CONTACT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return { success: true, message: 'Thanks! Your message has been sent.' };
  } catch {
    return { success: false, message: 'Something went wrong. Please try again.' };
  }
};
