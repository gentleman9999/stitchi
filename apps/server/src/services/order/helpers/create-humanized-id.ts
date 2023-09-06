import { OrderTable } from '../db/order-table'

function generateRandomId(length: number): string {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)]
  }
  return result
}

const createHumanizedId = async (
  {
    membershipId,
    organizationId,
  }: {
    membershipId: string | null
    organizationId: string | null
  },
  { orderTable }: { orderTable: OrderTable },
): Promise<string> => {
  const humanizedId = generateRandomId(6).toUpperCase()

  const existingOrder = await orderTable.findFirst({
    where: {
      membershipId,
      organizationId,
      humanReadableId: humanizedId,
    },
    select: {
      id: true,
    },
  })

  if (existingOrder?.id) {
    return createHumanizedId({ membershipId, organizationId }, { orderTable })
  }

  return humanizedId
}

export default createHumanizedId
