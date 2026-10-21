import Link from 'next/link';

import { getTranslations } from '@/i18n/server';

import './globals.scss';

const NotFound = async () => {
  const t = await getTranslations();

  return (
    <div className="notFound">
      <h1>404</h1>
      <h2>{t.notFound.heading}</h2>
      <div>
        <Link href="/">{t.notFound.home}</Link>
      </div>
    </div>
  );
};

export default NotFound;
