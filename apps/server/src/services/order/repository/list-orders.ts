import { Prisma, PrismaClient } from '@prisma/client'
import { OrderTable, table as makeOrderTable } from '../db/order-table'
import { orderFactory, OrderFactoryOrder } from '../factory'

const prisma = new PrismaClient()

interface ListOrdersConfig {
  orderTable: OrderTable
}

export interface ListOrdersFnInput
  extends Omit<Prisma.OrderFindManyArgs, 'include' | 'select'> {}

type ListOrdersFn = (input: ListOrdersFnInput) => Promise<OrderFactoryOrder[]>

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
        orderBy: {
          createdAt: 'desc',
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
