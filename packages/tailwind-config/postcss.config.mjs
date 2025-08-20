// import { join } from 'path';

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {
      //     '@tailwindcss/postcss': {
      //   base: join(import.meta.url, '../../'),
      // },
    },
  },
};

export default config;
