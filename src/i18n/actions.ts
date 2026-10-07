'use server';

import { cookies } from 'next/headers';

import { LOCALE_COOKIE, LOCALE_COOKIE_MAX_AGE, isLocale } from './config';

/** Persists the chosen language; the caller refreshes the route so the server re-renders with it. */
export const setLocale = async (locale: string): Promise<void> => {
  if (!isLocale(locale)) {
    return;
  }

  (await cookies()).set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: 'lax',
  });
};
