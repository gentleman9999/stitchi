import { OrderTable, Order } from '../db/order-table'
import { PrismaClient } from '@prisma/client'
import { OrderFactoryOrder, orderFactory } from '../factory'
import { table as makeOrderTable } from '../db/order-table'

const prisma = new PrismaClient()

interface GetOrderConfig {
  orderTable: OrderTable
}

export interface GetOrderFnInput {
  orderId: string
}

type GetOrderFn = (input: GetOrderFnInput) => Promise<OrderFactoryOrder>
type MakeGetOrderFn = (config?: GetOrderConfig) => GetOrderFn

const makeGetOrder: MakeGetOrderFn =
  ({ orderTable } = { orderTable: makeOrderTable(prisma) }) =>
  async input => {
    let orderRecord

    try {
      orderRecord = await orderTable.findUnique({
        where: {
          id: input.orderId,
        },
        include: {
          OrderItems: true,
        },
      })

      if (!orderRecord) {
        throw new Error('Order not found')
      }
    } catch (error) {
      console.error(`Failed to get order: ${input.orderId}`, {
        context: { error },
      })
      throw new Error('Failed to get order')
    }

    return orderFactory({
      orderRecord,
      orderItemRecords: orderRecord.OrderItems,
    })
  }

export default makeGetOrder
