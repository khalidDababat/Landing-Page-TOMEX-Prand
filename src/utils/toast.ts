import { toast } from 'react-toastify';

/** Shows a standard "coming soon" toast notification. */
export const showComingSoonToast = (): void => {
  toast.info('🚀 Coming soon — stay tuned!', {
    position: 'bottom-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
};
