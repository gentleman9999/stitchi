/** @type {import('next').NextConfig} */

const staticWebsiteData = require('./src/generated/static.json')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const { withAxiom } = require('next-axiom')

const allBrandSlugs = staticWebsiteData.brands.map(brand =>
  brand.custom_url?.url.replace(/\//g, ''),
)

const allCategorySlugs = staticWebsiteData.categories.map(
  // Remove leading and trailing slashes
  category => category.custom_url.url.replace(/^\/|\/$/g, ''),
)

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
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        },
        {
          protocol: 'https',
          hostname: 'cdn11.bigcommerce.com',
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
          // Brand rewrites
          ...allBrandSlugs.map(slug => ({
            source: `/${slug}`,
            destination: `/catalog/brands/${slug}`,
          })),
          // Product rewrites
          ...allBrandSlugs.map(slug => ({
            source: `/${slug}-:rest`,
            destination: `/catalog/brands/${slug}/products/:rest`,
          })),
          // Product "Share" rewrites
          ...allBrandSlugs.map(slug => ({
            source: `/${slug}-:rest/share`,
            destination: `/catalog/brands/${slug}/products/:rest/share`,
          })),
          // Category rewrites
          ...allCategorySlugs.map(slug => ({
            source: `/${slug}`,
            destination: `/catalog/categories/${slug}`,
          })),
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
      ]
    },
  }),
)
