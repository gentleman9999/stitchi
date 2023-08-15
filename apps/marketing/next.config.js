/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  transpilePackages: ['icons', 'config', 'tsconfig', 'hooks', 'lodash-es'],

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
      {
        source: '/blog/:path*',
        destination: 'https://stitchiblog.wpengine.com/blog/:path*',
      },
      {
        source: '/wp-admin/:path*',
        destination: 'https://stitchiblog.wpengine.com/wp-admin/:path*',
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/api/orders/:orderId',
        destination: '/orders/:orderId',
        permanent: false,
      },
      {
        source: '/login',
        destination: '/api/auth/login',
        permanent: true,
      },
      {
        source: '/logout',
        destination: '/api/auth/logout',
        permanent: true,
      },
      {
        source: '/promotional-product-glossary/:path*',
        destination: '/directory/:path*',
        permanent: true,
      },
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
        source: '/overview',
        destination: '/',
        permanent: true,
      },
      {
        source: '/features',
        destination: '/',
        permanent: true,
      },
      {
        source: '/morning-brew-newsletter-referral-program',
        destination:
          '/powering-morning-brew-newsletter-referral-program-with-custom-swag',
        permanent: true,
      },
      {
        source: '/event-promotional-products',
        destination: '/customer-engagement',
        permanent: true,
      },
      {
        source: '/corporate-promotional-products',
        destination: '/employee-engagement',
        permanent: true,
      },
      {
        source: '/newsletter-merchandise-referral-program',
        destination: '/loyalty-referral-programs',
        permanent: true,
      },
    ]
  },
})
