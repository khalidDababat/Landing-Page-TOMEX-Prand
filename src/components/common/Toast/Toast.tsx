'use client';

import { ToastContainer } from 'react-toastify';

/** Single app-wide toast outlet; toasts are triggered via `src/utils/toast.ts`. */
const Toast = () => <ToastContainer position="top-center" autoClose={10000} limit={1} />;

export default Toast;
