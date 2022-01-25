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
      current: 'currentColor',
      primary: 'var(--primary)',
      'primary-light': 'var(--primary-light)',
      'primary-dark': 'var(--primary-dark)',
      secondary: 'var(--secondary)',
      'secondary-2': 'var(--secondary-2)',
      tertiary: 'var(--tertiary)',
      hover: 'var(--hover)',
      'hover-1': 'var(--hover-1)',
      'hover-2': 'var(--hover-2)',

      paper: 'var(--paper)',
      'paper-dark': 'var(--paper-dark)',

      white: colors.white,
      gray: colors.slate,
      green: colors.emerald,
      purple: colors.violet,
      yellow: colors.amber,
      pink: colors.fuchsia,
    },

    extend: {
      maxWidth: {
        '8xl': '1920px',
      },
      boxShadow: {
        'outline-normal': '0 0 0 2px var(--accent-2)',
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
