import getOrThrow from './get-or-throw'

const siteUrl = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_URL,
  'NEXT_PUBLIC_SITE_URL',
)

const makeAbsoluteUrl = (url: string) => `${siteUrl}${url}`

export default makeAbsoluteUrl
