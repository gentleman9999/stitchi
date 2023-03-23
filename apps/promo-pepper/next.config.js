/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  transpilePackages: ['icons', 'config', 'tsconfig', 'hooks'],
  images: {
    domains: ['picsum.photos', 'beehiiv-images-production.s3.amazonaws.com'],
  },
  async redirects() {
    return [{ source: '/', destination: '/directory', permanent: false }]
  },
}

module.exports = nextConfig
