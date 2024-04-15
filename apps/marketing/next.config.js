/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { withAxiom } = require('next-axiom')

module.exports = withBundleAnalyzer(
  withAxiom({
    reactStrictMode: true,
    transpilePackages: ['icons', 'config', 'tsconfig', 'hooks', 'lodash-es'],

    // i18n: {
    //   locales: ['en'],
    //   defaultLocale: 'en',
    // },
    images: {
      remotePatterns: [
        {
          hostname: 'res.cloudinary.com',
        },
        {
          hostname: 'cdn11.bigcommerce.com',
        },
        {
          hostname: 'mars-images.imgix.net',
        },
      ],
    },

    async rewrites() {
      return {
        beforeFiles: [
          // These rewrites are checked after headers/redirects
          // and before all files including _next/public files which
          // allows overriding page files
          {
            source: '/learn',
            destination: '/learn/page/1',
          },
          {
            source: '/learn/topic/:topicSlug',
            destination: '/learn/topic/:topicSlug/page/1',
          },
          {
            source: '/custom-:slug(.*?)-shirts',
            destination: '/lookbook/categories/:slug',
          },
          {
            source: '/nonprofits',
            destination: '/learn/topic/nonprofits/page/1',
          },
        ],
      }
    },
    async redirects() {
      return [
        {
          // Business card QR code URL
          source: '/qr/everest',
          destination: '/',
          permanent: false,
        },
        {
          source: '/catalog',
          destination: '/products/all',
          permanent: true,
        },
        {
          source: '/compare',
          destination: '/',
          permanent: true,
        },
        {
          source: '/features',
          destination: '/',
          permanent: true,
        },
        {
          source: '/login',
          destination: '/api/auth/login',
          permanent: false,
        },
        {
          source: '/logout',
          destination: '/api/auth/logout',
          permanent: false,
        },
        {
          source: '/signup',
          destination: '/api/auth/signup',
          permanent: false,
        },
        {
          source: '/promotional-product-glossary/:path*',
          destination: '/directory/:path*',
          permanent: true,
        },
        // {
        //   source: '/learn/page/1',
        //   destination: '/learn',
        //   permanent: true,
        // },
        // {
        //   source: '/learn/topic/:topicSlug/page/1',
        //   destination: '/learn/topic/:topicSlug',
        //   permanent: true,
        // },
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
        {
          source: '/promotional-product-customization',
          destination: '/',
          permanent: true,
        },
        {
          source: '/learn/kanye-west-yeezy-vultures-merch',
          destination: '/learn/kanye-yeezy-vultures-merch-official-links',
          permanent: true,
        },
        {
          source: '/products/all',
          destination: '/products',
          permanent: true,
        },
      ]
    },
  }),
)
