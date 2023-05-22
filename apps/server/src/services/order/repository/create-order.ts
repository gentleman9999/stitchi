import { OrderTable, Order } from '../db/order-table'
import { PrismaClient } from '@prisma/client'
import { OrderFactoryOrder, orderFactory } from '../factory'
import { table as makeOrderTable } from '../db/order-table'
import * as yup from 'yup'
import { OrderItem } from '../db/order-item-table'
import createHumanizedId from '../helpers/create-humanized-id'

const inputSchema = Order.omit([
  'id',
  'createdAt',
  'updatedAt',
  'humanReadableId',
  'paymentStatus',
  'totalPriceCents',
]).concat(
  yup.object().shape({
    items: yup
      .array()
      .of(
        OrderItem.omit([
          'id',
          'createdAt',
          'updatedAt',
          'orderId',
          'fulfillmentStatus',
        ]).required(),
      )
      .required(),
  }),
)

const prisma = new PrismaClient()

interface CreateOrderConfig {
  orderTable: OrderTable
}

export interface CreateOrderFnInput {
  order: yup.InferType<typeof inputSchema>
}

type CreateOrderFn = (input: CreateOrderFnInput) => Promise<OrderFactoryOrder>
type MakeCreateOrderFn = (config?: CreateOrderConfig) => CreateOrderFn

const makeCreateOrder: MakeCreateOrderFn =
  ({ orderTable } = { orderTable: makeOrderTable(prisma) }) =>
  async input => {
    const validInput = await inputSchema.validate(input.order)

    const { items, ...restValidInput } = validInput

    const newOrder = await orderTable.create({
      data: {
        ...restValidInput,
        humanReadableId: await createHumanizedId(
          {
            organizationId: validInput.organizationId,
            userId: validInput.userId,
          },
          { orderTable },
        ),
        paymentStatus: 'NOT_PAID',
        totalPriceCents: 0,
        OrderItems: {
          createMany: {
            data: validInput.items,
          },
        },
      },
      include: {
        OrderItems: true,
      },
    })

    return orderFactory({
      orderRecord: newOrder,
      orderItemRecords: newOrder.OrderItems,
    })
  }

export default makeCreateOrder
