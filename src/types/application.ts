export type ApplicationLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface ApplicationFormValues {
  fullName: string;
  email: string;
  /** Dial code such as "+970"; only used by the Education form. */
  countryCode: string;
  phone: string;
  level: ApplicationLevel | '';
  about: string;
  coverLetter: string;
  cv: File | null;
}

export type ApplicationFormErrors = Partial<Record<keyof ApplicationFormValues, string>>;
