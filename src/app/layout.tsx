import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/main.scss';

import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import ScrollManager from '@/components/layout/ScrollManager/ScrollManager';
import Toast from '@/components/common/Toast/Toast';
import WhatsAppButton from '@/components/common/WhatsAppButton/WhatsAppButton';
import { DIRECTIONS } from '@/i18n/config';
import { getDictionary } from '@/i18n/dictionaries';
import { I18nProvider } from '@/i18n/I18nProvider';
import { getLocale, getTranslations } from '@/i18n/server';

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();

  return {
    title: t.meta.siteTitle,
    description: t.meta.siteDescription,
  };
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const RootLayout = async ({ children }: Readonly<{ children: ReactNode }>) => {
  const locale = await getLocale();

  return (
    <html lang={locale} dir={DIRECTIONS[locale]} data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Carlito:ital,wght@0,400;0,700;1,400;1,700&family=Quicksand:wght@300..700&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <I18nProvider locale={locale} dictionary={getDictionary(locale)}>
          <Header />

          <ScrollManager>
            <main>{children}</main>
          </ScrollManager>

          <Footer />
          <WhatsAppButton />
          <Toast />
        </I18nProvider>
      </body>
    </html>
  );
};

export default RootLayout;
