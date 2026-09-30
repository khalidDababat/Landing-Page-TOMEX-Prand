import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

import 'react-toastify/dist/ReactToastify.css';
import '@/styles/main.scss';

import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import ScrollManager from '@/components/layout/ScrollManager/ScrollManager';
import Toast from '@/components/common/Toast/Toast';

const SITE_TITLE = 'TOMEX Technology';

const SITE_DESCRIPTION =
  'TOMEX turns ideas into technology  software development, programming education, and AI-powered video solutions.';

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <html lang="en" data-scroll-behavior="smooth">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&family=Carlito:ital,wght@0,400;0,700;1,400;1,700&family=Quicksand:wght@300..700&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
    </head>
    <body>
      <Header />

      <ScrollManager>
        <main>{children}</main>
      </ScrollManager>

      <Footer />
      <Toast />
    </body>
  </html>
);

export default RootLayout;
