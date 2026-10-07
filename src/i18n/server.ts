import 'server-only';

import { cache } from 'react';
import { cookies } from 'next/headers';

import { DEFAULT_LOCALE, DIRECTIONS, LOCALE_COOKIE, isLocale } from './config';
import type { Direction, Locale } from './config';
import { getDictionary } from './dictionaries';
import type { Dictionary } from './en';

/** Active language, read from the locale cookie (falls back to English). */
export const getLocale = cache(async (): Promise<Locale> => {
  const value = (await cookies()).get(LOCALE_COOKIE)?.value;

  return isLocale(value) ? value : DEFAULT_LOCALE;
});

export const getDirection = async (): Promise<Direction> => DIRECTIONS[await getLocale()];

/** Translations for Server Components: `const t = await getTranslations(); t.hero.title`. */
export const getTranslations = async (): Promise<Dictionary> => getDictionary(await getLocale());
