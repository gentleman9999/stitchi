import { Prisma, PrismaClient } from '@prisma/client'
import { logger } from '../../../telemetry'
import { OrderTable } from '../db/order-table'

const prisma = new PrismaClient()

interface ListOrdersCountConfig {
  orderTable: OrderTable
}

export interface ListOrdersCountFnInput extends Prisma.OrderCountArgs {}

type ListOrdersCountFn = (input: ListOrdersCountFnInput) => Promise<number>

type MakeListOrdersCountFn = (
  config?: ListOrdersCountConfig,
) => ListOrdersCountFn

const makeListOrdersCount: MakeListOrdersCountFn =
  (
    { orderTable } = {
      orderTable: prisma.order,
    },
  ) =>
  async input => {
    let orderCount

    try {
      orderCount = await orderTable.count({
        ...input,
      })
    } catch (error) {
      logger
        .child({
          context: { error },
        })
        .error(`Failed to list orders`)
      throw new Error('Failed to list orders')
    }

    return orderCount
  }

export { makeListOrdersCount }
