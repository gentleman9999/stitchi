import { OrderTable, Order } from '../db/order-table'
import { PrismaClient } from '@prisma/client'
import { OrderFactoryOrder, orderFactory } from '../factory'
import { table as makeOrderTable } from '../db/order-table'
import * as yup from 'yup'
import { OrderItem } from '../db/order-item-table'
import createHumanizedId from '../helpers/create-humanized-id'
import { calculateOrderAmounts } from './helpers/calculate-order-amounts'
import { logger } from '../../../telemetry'

const inputSchema = Order.omit([
  'id',
  'createdAt',
  'updatedAt',
  'humanReadableId',
  'paymentStatus',
  'totalPriceCents',
  'totalTaxCents',
  'subtotalPriceCents',
  'totalShippingCents',
  'totalProcessingFeeCents',
  'totalAmountPaidCents',
  'totalAmountDueCents',
  'totalAmountRefundedCents',
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

    const {
      totalPriceCents,
      totalTaxCents,
      totalProcessingFeeCents,
      totalShippingCents,
      subtotalPriceCents,
    } = calculateOrderAmounts({ items })

    const humanReadableId = await createHumanizedId(
      {
        organizationId: validInput.organizationId,
        userId: validInput.userId,
      },
      { orderTable },
    )

    let newOrder

    try {
      newOrder = await orderTable.create({
        data: {
          ...restValidInput,
          humanReadableId,
          totalPriceCents,
          totalTaxCents,
          totalProcessingFeeCents,
          totalShippingCents,
          subtotalPriceCents,
          totalAmountDueCents: totalPriceCents,
          totalAmountPaidCents: 0,
          totalAmountRefundedCents: 0,
          paymentStatus: 'NOT_PAID',
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
    } catch (error) {
      logger.error(error)
      throw new Error('Failed to create order')
    }

    return orderFactory({
      orderRecord: newOrder,
      orderItemRecords: newOrder.OrderItems,
    })
  }

export default makeCreateOrder
