'use client';

import { createContext, useContext } from 'react';
import type { ReactNode } from 'react';

import type { Locale } from './config';
import type { Dictionary } from './en';

interface I18nContextValue {
  locale: Locale;
  dictionary: Dictionary;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps extends I18nContextValue {
  children: ReactNode;
}

/** Hands the active language's dictionary to Client Components (rendered once by the root layout). */
export const I18nProvider = ({ locale, dictionary, children }: I18nProviderProps) => (
  <I18nContext.Provider value={{ locale, dictionary }}>{children}</I18nContext.Provider>
);

const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error('useTranslations/useLocale must be used inside <I18nProvider>.');
  }

  return context;
};

/** Translations for Client Components. */
export const useTranslations = (): Dictionary => useI18n().dictionary;

export const useLocale = (): Locale => useI18n().locale;
