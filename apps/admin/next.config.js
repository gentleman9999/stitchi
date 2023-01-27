/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['config'],
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: false,
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
    ]
  },
}

module.exports = nextConfig
