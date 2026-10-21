import { ar } from './ar';
import type { Locale } from './config';
import { en } from './en';
import type { Dictionary } from './en';

const DICTIONARIES: Record<Locale, Dictionary> = { en, ar };

export const getDictionary = (locale: Locale): Dictionary => DICTIONARIES[locale];
