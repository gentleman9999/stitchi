// Not sure why we need 'config' here.. might just be in development mode because of HMR and shared postcss config?
const withTM = require('next-transpile-modules')(['ui', 'icons', 'config'])

/** @type {import('next').NextConfig} */
module.exports = withTM({
  reactStrictMode: true,

  async rewrites() {
    return [
      {
        source: '/learn',
        destination: '/learn/page/1',
      },
      {
        source: '/learn/topic/:topicSlug',
        destination: '/learn/topic/:topicSlug/page/1',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/learn/page/1',
        destination: '/learn',
        permanent: true,
      },
      {
        source: '/learn/topic/:topicSlug/page/1',
        destination: '/learn/topic/:topicSlug',
        permanent: true,
      },
    ]
  },
})
