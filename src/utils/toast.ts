import { createElement } from 'react';
import { toast } from 'react-toastify';

import ToastContent from '@/components/common/Toast/ToastContent';
import styles from '@/components/common/Toast/ToastContent.module.scss';
import type { ComingSoonNotice } from '@/types';

/** Shows a titled "coming soon" toast. Repeated calls with the same title refresh instead of stacking. */
export const showComingSoon = ({ title, message }: ComingSoonNotice): void => {
  toast(createElement(ToastContent, { title, message }), {
    toastId: title,
    position: 'top-center',
    autoClose: 10000,
    icon: false,
    className: styles.toast,
    progressClassName: styles.progress,
    closeOnClick: true,
    pauseOnHover: true,
  });
};
