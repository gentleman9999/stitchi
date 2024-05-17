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

export const SITE_URL = getOrThrow(
  process.env.NEXT_PUBLIC_SITE_URL,
  'NEXT_PUBLIC_SITE_URL',
)

export const SEO_DEFAULT_TITLE =
  'Stitchi - Premium Custom Merchandise for Global Brands'

export const SEO_DEFAULT_DESCRIPTION =
  'Stitchi is your swag headquarters! Effortlessly shop, store, and ship premium merchandise worldwide.'

export const MIN_ORDER_QTY = parseInt(
  getOrThrow(
    process.env.NEXT_PUBLIC_MIN_ORDER_QTY,
    'NEXT_PUBLIC_MIN_ORDER_QTY',
  ),
)

export const HIDDEN_BIGCOMMERCE_PRODUCT_IDS = getOrThrow(
  process.env.NEXT_PUBLIC_BIG_COMMERCE_HIDDEN_CATEGORY_IDS,
  'NEXT_PUBLIC_BIG_COMMERCE_HIDDEN_CATEGORY_IDS',
)
  .replace(' ', '')
  .split(',')

export const INTERCOM_SURVEY_ID__PARTNER_REQUEST = 37919081
