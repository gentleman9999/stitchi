import getOrThrow from './utils/get-or-throw'

export const SUPPORT_PERSON_NAME = 'Everest'
export const SUPPORT_PERSON_PICTURE = '/everest-guerra.jpg'
export const COMPANY_NAME = process.env.NEXT_PUBLIC_COMPANY_NAME
export const COMPANY_SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL
export const COOKIE_DEVICE_ID = getOrThrow(
  process.env.NEXT_PUBLIC_COOKIE_DEVICE_ID,
  'NEXT_PUBLIC_COOKIE_DEVICE_ID',
)

export const TOPBAR_NAV_HEIGTH_PX = 56
