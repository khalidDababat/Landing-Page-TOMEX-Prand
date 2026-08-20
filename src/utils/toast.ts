import { toast } from 'react-toastify';

/** Message shown for navigation links that are not live yet. */
export const COMING_SOON_MESSAGE = 'Soon';

/** Shared id so repeated clicks refresh the toast instead of stacking copies. */
const COMING_SOON_TOAST_ID = 'coming-soon';

/** Notifies the visitor that a destination is not available yet. */
export const showComingSoonToast = (): void => {
  toast(COMING_SOON_MESSAGE, { toastId: COMING_SOON_TOAST_ID });
};
