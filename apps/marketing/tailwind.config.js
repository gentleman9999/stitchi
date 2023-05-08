const colors = require('tailwindcss/colors')

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
      heading: ['Degular'],
      headingDisplay: ['Degular-Display'],
      default: ['var(--font-inter)'],
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
