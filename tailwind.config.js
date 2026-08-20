/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0B2A4A',
        mint: '#2DD598',
      },
      screens: {
        mobile: '480px',
        tablet: '768px',
        laptop: '992px',
        desktop: '1200px',
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
