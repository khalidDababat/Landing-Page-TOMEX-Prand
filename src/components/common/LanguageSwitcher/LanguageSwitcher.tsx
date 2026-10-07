'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { setLocale } from '@/i18n/actions';
import { LOCALES } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { useLocale, useTranslations } from '@/i18n/I18nProvider';

import styles from './LanguageSwitcher.module.scss';

/** EN / AR segmented control. Stores the choice in a cookie, then re-renders the server tree. */
const LanguageSwitcher = ({ className = '' }: { className?: string }) => {
  const t = useTranslations();
  const activeLocale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const select = (locale: Locale): void => {
    if (locale === activeLocale || isPending) {
      return;
    }

    startTransition(async () => {
      await setLocale(locale);
      router.refresh();
    });
  };

  const names: Record<Locale, string> = { en: t.language.englishName, ar: t.language.arabicName };

  return (
    <div
      className={`${styles.switcher} ${className}`}
      role="group"
      aria-label={t.language.label}
      dir="ltr"
    >
      {LOCALES.map((locale) => (
        <button
          key={locale}
          className={`${styles.option} ${locale === activeLocale ? styles.active : ''}`}
          type="button"
          lang={locale}
          aria-pressed={locale === activeLocale}
          aria-label={names[locale]}
          disabled={isPending}
          onClick={() => select(locale)}
        >
          {t.language[locale]}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
