import { StrictMode, createElement } from 'react';
import { createRoot } from 'react-dom/client';

import App from '@/App';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/main.scss';

const container = document.getElementById('root');

if (!container) {
  throw new Error('Root element "#root" was not found.');
}

// `createElement` is used instead of JSX so the application entry point can
// remain a plain `.ts` module.
createRoot(container).render(createElement(StrictMode, null, createElement(App)));
