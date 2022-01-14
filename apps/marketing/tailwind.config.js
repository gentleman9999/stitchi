const colors = require('tailwindcss/colors')

/**
 * https://tailwindcss.com/docs/customizing-colors#using-css-variables
 */
function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
}

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

      primary: withOpacityValue('var(--primary)'),
      'primary-light': withOpacityValue('var(--primary-light)'),
      'primary-dark': withOpacityValue('var(--primary-dark)'),
      secondary: withOpacityValue('var(--secondary)'),
      'secondary-2': withOpacityValue('var(--secondary-2)'),
      hover: withOpacityValue('var(--hover)'),
      'hover-1': withOpacityValue('var(--hover-1)'),
      'hover-2': withOpacityValue('var(--hover-2)'),

      paper: withOpacityValue('var(--paper)'),
      'paper-dark': withOpacityValue('var(--paper-dark)'),

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
