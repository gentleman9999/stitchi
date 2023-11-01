import getOrThrow from './utils/get-or-throw'

export const SUPPORT_PERSON_NAME = 'Everest'
export const SUPPORT_PERSON_PICTURE = '/everest-guerra.jpg'
export const SUPPORT_EMAIL = getOrThrow(
  process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
  'NEXT_PUBLIC_SUPPORT_EMAIL',
)

export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME

export const COOKIE_DEVICE_ID = getOrThrow(
  process.env.NEXT_PUBLIC_COOKIE_DEVICE_ID,
  'NEXT_PUBLIC_COOKIE_DEVICE_ID',
)

export const TOPBAR_NAV_HEIGTH_PX = 56

export const SITE_URL = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_URL,
  'NEXT_PUBLIC_SITE_URL',
)

export const SEO_DEFAULT_DESCRIPTION =
  'We craft personalized promotional merchandise, perfect for corporate events, startups, and fundraisers. Drive your brand visibility with our unique, high-quality customizable products distributed globally.'
