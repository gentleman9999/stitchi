import { logger } from '../../../telemetry'
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

  let existingOrder

  try {
    existingOrder = await orderTable.findFirst({
      where: {
        membershipId,
        organizationId,
        humanReadableId: humanizedId,
      },
      select: {
        id: true,
      },
    })
  } catch (error) {
    logger.child({ error }).error('Failed to find existing order')
    throw new Error('Failed to find existing order')
  }

  if (existingOrder?.id) {
    return createHumanizedId({ membershipId, organizationId }, { orderTable })
  }

  return humanizedId
}

export default createHumanizedId
