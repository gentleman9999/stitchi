const withTM = require('next-transpile-modules')(['ui', 'icons'])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,
})
