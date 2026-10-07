export const LOCALES = ['en', 'ar'] as const;

export type Locale = (typeof LOCALES)[number];
export type Direction = 'ltr' | 'rtl';

export const DEFAULT_LOCALE: Locale = 'en';

/** Cookie that stores the visitor's language; read on the server for every request. */
export const LOCALE_COOKIE = 'tomex-locale';
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const DIRECTIONS: Record<Locale, Direction> = {
  en: 'ltr',
  ar: 'rtl',
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
