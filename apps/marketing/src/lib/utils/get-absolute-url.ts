import { SITE_URL } from '@lib/constants'

const makeAbsoluteUrl = (url: string) => `${SITE_URL}${url}`

export default makeAbsoluteUrl
