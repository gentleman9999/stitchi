const colors = require('tailwindcss/colors')
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} \*/
module.exports = {
  presets: [require('../../packages/config/tailwind.config.js')],
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
  theme: {
    fontFamily: {
      heading: ['Degular'],
      headingDisplay: ['Degular-Display'],
      default: ['Inter'],
    },
    colors: {
      transparent: 'transparent',
      primary: '#e52c2c',
      secondary: colors.stone[900], // #0f172a
      paper: colors.white,
      gray: colors.stone,
      black: colors.stone[900],
      white: colors.white,
      red: colors.red,
      purple: colors.purple,
      orange: colors.orange,
    },

    extend: {
      extend: {
        fontFamily: {
          sans: ['var(--font-inter)', ...fontFamily.sans],
        },
      },
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
