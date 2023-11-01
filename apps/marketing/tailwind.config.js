const colors = require('tailwindcss/colors')
const TOPBAR_NAV_HEIGTH_PX = require('./src/lib/constants').TOPBAR_NAV_HEIGTH_PX

module.exports = {
  presets: [require('../../packages/config/tailwind.config.js')],
  content: [
    'src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
  theme: {
    fontFamily: {
      heading: ['var(--font-outfit)'],
      headingDisplay: ['var(--font-outfit)'],
      default: ['var(--font-outfit)', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      primary: '#bdfd6d',
      secondary: colors.stone[900], // #0f172a
      paper: colors.white,
      gray: colors.stone,
      black: colors.stone[900],
      white: colors.white,
      red: colors.red,
      purple: colors.purple,
      orange: colors.orange,
      green: colors.green,
      blue: colors.blue,
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

      borderColor: {
        DEFAULT: colors.stone[200],
      },

      spacing: {
        'topbar-height': `${TOPBAR_NAV_HEIGTH_PX}px`,
      },
    },
    variants: {
      extend: {
        fill: ['hover'],
      },
    },
  },
}
