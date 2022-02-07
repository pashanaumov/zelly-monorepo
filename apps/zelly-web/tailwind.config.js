const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    'apps/zelly-web/src/**/*.{js,jsx,ts,tsx}',
    'apps/zelly-web/src/*',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        sky: colors.sky,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
  ],
};
