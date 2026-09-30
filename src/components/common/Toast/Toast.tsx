'use client';

import { ToastContainer } from 'react-toastify';

/** Single app-wide toast outlet; toasts are triggered via `src/utils/toast.ts`. */
const Toast = () => <ToastContainer position="bottom-center" autoClose={3000} limit={1} />;

export default Toast;
