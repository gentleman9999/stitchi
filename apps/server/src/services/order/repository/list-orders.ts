import { Prisma, PrismaClient } from '@prisma/client'
import { OrderTable, table as makeOrderTable } from '../db/order-table'
import { orderFactory, OrderFactoryOrder } from '../factory'

const prisma = new PrismaClient()

interface ListOrdersConfig {
  orderTable: OrderTable
}

interface ListOrdersFilter {
  userId?: string
}

export interface ListOrdersFnInput {
  filter?: ListOrdersFilter
}

type ListOrdersFn = (
  input: Omit<Prisma.OrderFindManyArgs, 'include' | 'select'>,
) => Promise<OrderFactoryOrder[]>

type MakeListOrdersFn = (config?: ListOrdersConfig) => ListOrdersFn

const makeListOrders: MakeListOrdersFn =
  ({ orderTable } = { orderTable: makeOrderTable(prisma) }) =>
  async input => {
    let orderRecords

    try {
      orderRecords = await orderTable.findMany({
        ...input,
        include: {
          OrderItems: true,
        },
      })
    } catch (error) {
      console.error(`Failed to get orders`, {
        context: { error },
      })
      throw new Error('Failed to get orders')
    }

    return orderRecords.map(order =>
      orderFactory({
        orderRecord: order,
        orderItemRecords: order.OrderItems,
      }),
    )
  }

export default makeListOrders
