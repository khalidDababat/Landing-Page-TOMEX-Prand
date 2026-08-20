export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export type ContactFormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface ContactSubmitResult {
  success: boolean;
  message: string;
}
