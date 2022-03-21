const colors = require('tailwindcss/colors')

module.exports = {
  presets: [require('../../packages/config/tailwind.config.js')],
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: colors.lime[400], // #a3e635

      primaryAlt: colors.lime,
      secondary: colors.slate[900], // #0f172a
      secondaryAlt: colors.slate,
      paper: colors.white,
      gray: colors.zinc,
      black: colors.black,
      white: colors.white,
    },

    extend: {
      maxWidth: {
        '8xl': '1920px',
      },
      boxShadow: {
        'outline-normal': '0 0 0 2px var(--gray-200)',
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
      },
    },
    variants: {
      extend: {
        fill: ['hover'],
      },
    },
  },
}
