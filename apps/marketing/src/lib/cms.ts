import { buildClient } from '@datocms/cma-client-browser'
import getOrThrow from '@utils/get-or-throw'

const NEXT_PUBLIC_DATO_CMS_API_KEY = getOrThrow(
  process.env.NEXT_PUBLIC_DATO_CMS_API_KEY,
  'NEXT_PUBLIC_DATO_CMS_API_KEY',
)

const makeClient = () => buildClient({ apiToken: NEXT_PUBLIC_DATO_CMS_API_KEY })

const cms = {
  client: makeClient(),
}

export default cms
