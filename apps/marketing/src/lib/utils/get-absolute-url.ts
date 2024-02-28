import { SITE_URL } from '@lib/constants'

const makeAbsoluteUrl = (url: string) => {
  // Remove the last character if it's a trailing slash
  const sanitizedUrl = url.endsWith('/') ? url.slice(0, -1) : url
  return `${SITE_URL}${sanitizedUrl}`
}

export default makeAbsoluteUrl
