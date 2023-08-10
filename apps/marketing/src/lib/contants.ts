import getOrThrow from './utils/get-or-throw'

const companyName = getOrThrow(
  process.env.NEXT_PUBLIC_COMPANY_NAME,
  'NEXT_PUBLIC_COMPANY_NAME',
)

export const constants = {
  companyName,
}
