const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

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
  },
  plugins: [require('@tailwindcss/forms')],
};
