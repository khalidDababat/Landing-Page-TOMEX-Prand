'use client';

import { ToastContainer } from 'react-toastify';

import { DIRECTIONS } from '@/i18n/config';
import { useLocale } from '@/i18n/I18nProvider';

/** Single app-wide toast outlet; toasts are triggered via `src/utils/toast.ts`. */
const Toast = () => (
  <ToastContainer
    position="top-center"
    autoClose={10000}
    limit={1}
    rtl={DIRECTIONS[useLocale()] === 'rtl'}
  />
);

export default Toast;
