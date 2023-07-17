import { PrismaClient, OrderItem as OrderItemSchema } from '@prisma/client'
import * as yup from 'yup'

export enum OrderItemRecordFulfillmentStatus {
  NOT_FULFILLED = 'NOT_FULFILLED',
  PARTIALLY_FULFILLED = 'PARTIALLY_FULFILLED',
  FULFILLED = 'FULFILLED',
}

export enum OrderItemRecordType {
  BIG_C_PRODUCT = 'BIG_C_PRODUCT',
  CUSTOM = 'CUSTOM',
}

export const OrderItem: yup.ObjectSchema<OrderItemSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    orderId: yup.string().uuid().required(),
    title: yup.string().required(),
    quantity: yup.number().min(1).required(),
    unitPriceCents: yup.number().min(0).required(),
    totalPriceCents: yup.number().min(0).required(),

    productId: yup.string().nullable().defined(),
    productVariantId: yup.string().nullable().defined(),
    designId: yup.string().nullable().defined(),

    type: yup
      .mixed<OrderItemRecordType>()
      .oneOf(Object.values(OrderItemRecordType))
      .required(),

    fulfillmentStatus: yup
      .mixed<OrderItemRecordFulfillmentStatus>()
      .oneOf(Object.values(OrderItemRecordFulfillmentStatus))
      .required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('OrderItem')

export type OrderItemRecord = yup.Asserts<typeof OrderItem>

export const table = (db: PrismaClient) => db.orderItem
export type OrderItemTable = ReturnType<typeof table>
