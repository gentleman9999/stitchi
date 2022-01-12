// Not sure why we need 'config' here.. might just be in development mode because of HMR and shared postcss config?
const withTM = require('next-transpile-modules')(['ui', 'icons', 'config'])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
})
