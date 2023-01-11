/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  transpilePackages: [
    'icons',
    'config',
    'tsconfig',
    'hooks',
  ],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['res.cloudinary.com', 'cdn11.bigcommerce.com'],
  },

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
      {
        source: '/start/success',
        destination: '/learn?standout=contact_success',
        permanent: false,
      },
      {
        source: "/overview",
        destination: "/",
        permanent: true
      },
      {
        source: "/features",
        destination: "/",
        permanent: true
      },
      {
        source: "/morning-brew-newsletter-referral-program",
        destination: "/powering-morning-brew-newsletter-referral-program-with-custom-swag",
        permanent: true
      },
      {
        source: "/event-promotional-products",
        destination: "/customer-engagement",
        permanent: true
      },
      {
        source: "/corporate-promotional-products",
        destination: "/employee-engagement",
        permanent: true
      }
    ]
  },
}
