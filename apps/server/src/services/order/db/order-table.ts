import { PrismaClient, Order as OrderSchema } from '@prisma/client'
import * as yup from 'yup'

export enum OrderRecordPaymentStatus {
  NOT_PAID = 'NOT_PAID',
  PARTIALLY_PAID = 'PARTIALLY_PAID',
  PAID = 'PAID',
  PARTIALLY_REFUNDED = 'PARTIALLY_REFUNDED',
  REFUNDED = 'REFUNDED',
}

export enum OrderRecordType {
  CART = 'CART',
}

export const Order: yup.ObjectSchema<OrderSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    humanReadableId: yup.string().required(),
    userId: yup.string().nullable().defined(),
    organizationId: yup.string().uuid().nullable().defined(),
    shippingAddressId: yup.string().uuid().nullable().defined(),
    customerFullName: yup.string().nullable().defined(),
    customerEmail: yup.string().email().nullable().defined(),
    customerPhone: yup.string().nullable().defined(),
    totalPriceCents: yup.number().integer().min(0).required(),
    subtotalPriceCents: yup.number().integer().min(0).required(),
    totalAmountPaidCents: yup.number().integer().min(0).required(),
    totalAmountRefundedCents: yup.number().integer().min(0).required(),
    // If somehow the customer overpays this could become negative
    totalAmountDueCents: yup.number().integer().required(),
    totalTaxCents: yup.number().integer().min(0).required(),
    totalShippingCents: yup.number().integer().min(0).required(),
    totalProcessingFeeCents: yup.number().integer().min(0).required(),
    paymentStatus: yup
      .mixed<OrderRecordPaymentStatus>()
      .oneOf(Object.values(OrderRecordPaymentStatus))
      .required(),

    type: yup
      .mixed<OrderRecordType>()
      .oneOf(Object.values(OrderRecordType))
      .required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('Order')

export type OrderRecord = yup.Asserts<typeof Order>

export const table = (db: PrismaClient) => db.order
export type OrderTable = ReturnType<typeof table>
