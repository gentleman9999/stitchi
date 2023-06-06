import { Order, OrderTable, table as makeOrderTable } from '../db/order-table'
import * as yup from 'yup'
import { OrderItem } from '../db/order-item-table'
import { PrismaClient } from '@prisma/client'
import { orderFactory, OrderFactoryOrder } from '../factory'

const inputSchema = Order.omit(['createdAt', 'updatedAt']).concat(
  yup
    .object()
    .shape({
      items: yup
        .array()
        .of(
          OrderItem.omit(['id', 'createdAt', 'updatedAt', 'orderId'])
            .concat(
              yup.object().shape({
                id: yup.string().optional(),
              }),
            )
            .required(),
        )
        .required(),
    })
    .required(),
)

const prisma = new PrismaClient()

interface UpdateOrderConfig {
  orderTable: OrderTable
}

export interface UpdateOrderFnInput {
  order: yup.InferType<typeof inputSchema>
}

type UpdateOrderFn = (input: UpdateOrderFnInput) => Promise<OrderFactoryOrder>
type MakeUpdateOrderFn = (config?: UpdateOrderConfig) => UpdateOrderFn

const makeUpdateOrder: MakeUpdateOrderFn =
  ({ orderTable } = { orderTable: makeOrderTable(prisma) }) =>
  async input => {
    let validInput
    try {
      validInput = await inputSchema.validate(input.order)
    } catch (error) {
      console.error(error)
      throw new Error('Invalid input')
    }

    let existingOrder

    try {
      existingOrder = await orderTable.findUnique({
        where: { id: validInput.id },
        include: { OrderItems: true },
      })

      if (!existingOrder) {
        throw new Error('Order not found')
      }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to get order')
    }

    const { items } = validInput

    const itemsToUpdate = items.filter(item => item.id)
    const itemsToCreate = items.filter(item => !item.id)
    const itemsToDelete = existingOrder.OrderItems.filter(
      item => !itemsToUpdate.find(update => update.id === item.id),
    )

    let updatedOrder
    try {
      updatedOrder = await orderTable.update({
        where: { id: validInput.id },
        include: { OrderItems: true },
        data: {
          updatedAt: new Date(),
          customerEmail: validInput.customerEmail,
          customerFirstName: validInput.customerFirstName,
          customerLastName: validInput.customerLastName,
          customerPhone: validInput.customerPhone,
          shippingAddressId: validInput.shippingAddressId,
          totalAmountDueCents: validInput.totalAmountDueCents,
          totalAmountPaidCents: validInput.totalAmountPaidCents,
          totalAmountRefundedCents: validInput.totalAmountRefundedCents,
          totalProcessingFeeCents: validInput.totalProcessingFeeCents,
          totalShippingCents: validInput.totalShippingCents,
          totalTaxCents: validInput.totalTaxCents,
          totalPriceCents: validInput.totalPriceCents,
          subtotalPriceCents: validInput.subtotalPriceCents,
          paymentStatus: validInput.paymentStatus,
          OrderItems: {
            update: itemsToUpdate.map(({ id, ...item }) => ({
              where: { id },
              data: {
                designId: item.designId,
                title: item.title,
                quantity: item.quantity,
                unitPriceCents: item.unitPriceCents,
                totalPriceCents: item.totalPriceCents,
                productId: item.productId,
                productVariantId: item.productVariantId,
                type: item.type,
                fulfillmentStatus: item.fulfillmentStatus,
              },
            })),
            create: itemsToCreate.map(({ ...item }) => ({
              ...item,
            })),
            deleteMany: itemsToDelete.map(item => ({ id: item.id })),
          },
        },
      })
    } catch (error) {
      console.error(error)
      throw new Error('Failed to update order')
    }

    return orderFactory({
      orderRecord: updatedOrder,
      orderItemRecords: updatedOrder.OrderItems,
    })
  }

export default makeUpdateOrder