const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');

module.exports = {
  content: [
    'apps/zelly-web/src/**/*.{js,jsx,ts,tsx}',
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [],
  important: true,
  // Active dark mode on class basis
  darkMode: 'class',
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        check: "url('/icons/check.svg')",
        landscape: "url('/images/landscape/2.jpg')",
      }),
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      inset: ['checked'],
      zIndex: ['hover', 'active'],
    },
  },
  future: {
    purgeLayersByDefault: true,
  },
};
