// Not sure why we need 'config' here.. might just be in development mode because of HMR and shared postcss config?
const withTM = require('next-transpile-modules')(['ui', 'config'])

/** @type {import('next').NextConfig} */
const nextConfig = withTM({
  reactStrictMode: true,
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
})

module.exports = nextConfig
