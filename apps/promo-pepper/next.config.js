/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['icons', 'config', 'tsconfig', 'hooks'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['picsum.photos'],
  },
}

module.exports = nextConfig
