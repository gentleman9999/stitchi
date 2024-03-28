import getOrThrow from './utils/get-or-throw'

const BIGC_STORE_HASH = getOrThrow(
  process.env.BIGC_STORE_HASH,
  'BIGC_STORE_HASH',
)

const BIGC_STOREFRONT_URL = `https://store-${BIGC_STORE_HASH}.mybigcommerce.com`

const env = {
  BIGC_STORE_HASH,
  BIGC_STOREFRONT_URL,
  BIGC_ACCESS_TOKEN: getOrThrow(
    process.env.BIGC_ACCESS_TOKEN,
    'BIGC_ACCESS_TOKEN',
  ),
  BIGC_IMAGES_SS_ACTIVEWEAR_BASE_URL: `https://store-ycjcgspsys.mybigcommerce.com${getOrThrow(
    process.env.BIGC_IMAGES_SS_ACTIVEWEAR_PATH,
    'BIGC_IMAGES_SS_ACTIVEWEAR_PATH',
  )}`,
  // BIGC_IMAGES_SS_ACTIVEWEAR_BASE_URL: `${BIGC_STOREFRONT_URL}${getOrThrow(process.env.BIGC_IMAGES_SS_ACTIVEWEAR_PATH,"BIGC_IMAGES_SS_ACTIVEWEAR_PATH")}`,
  SSA_ACCOUNT_NUMBER: getOrThrow(
    process.env.SSA_ACCOUNT_NUMBER,
    'SSA_ACCOUNT_NUMBER',
  ),
  SSA_API_KEY: getOrThrow(process.env.SSA_API_KEY, 'SSA_API_KEY'),
  OPEN_AI_API_KEY: getOrThrow(process.env.OPEN_AI_API_KEY, 'OPEN_AI_API_KEY'),

  SKIP_UPDATING_EXISTING_AI_DESCRIPTIONS: getOrThrow(
    process.env.SKIP_UPDATING_EXISTING_AI_DESCRIPTIONS,
    'SKIP_UPDATING_EXISTING_AI_DESCRIPTIONS',
  ),
}

export default env
