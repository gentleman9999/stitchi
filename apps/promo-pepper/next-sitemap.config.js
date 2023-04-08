// https://www.npmjs.com/package/next-sitemap

/** @type {import('@next/env')} */

const nextEnv = require('@next/env')

const { loadEnvConfig } = nextEnv
const projectDir = process.cwd()
loadEnvConfig(projectDir)

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.promopepper.com'

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: siteUrl,
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // <= exclude here
  robotsTxtOptions: {
    additionalSitemaps: [
      `${siteUrl}/server-sitemap.xml`, // <==== Add here
    ],
  },
}
