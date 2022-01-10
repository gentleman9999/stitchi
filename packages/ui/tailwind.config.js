module.exports = {
  content: ['./**/*.{js,ts,jsx,tsx}'],
  mode: 'jit',
  future: {
    purgeLayersByDefault: true,
    applyComplexClasses: true,
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
