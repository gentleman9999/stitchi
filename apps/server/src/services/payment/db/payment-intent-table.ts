import {
  PrismaClient,
  PaymentIntent as PaymentIntentSchema,
} from '@prisma/client'
import * as yup from 'yup'

export enum PaymentIntentRecordStatus {
  REQUIRES_PAYMENT_METHOD = 'REQUIRES_PAYMENT_METHOD',
  REQUIRES_CAPTURE = 'REQUIRES_CAPTURE',
  REQUIRES_CONFIRMATION = 'REQUIRES_CONFIRMATION',
  REQUIRES_ACTION = 'REQUIRES_ACTION',
  PROCESSING = 'PROCESSING',
  SUCCEEDED = 'SUCCEEDED',
  CANCELED = 'CANCELED',
}

export enum PaymentIntentRecordType {
  CART = 'CART',
}

export const PaymentIntent: yup.ObjectSchema<PaymentIntentSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    orderId: yup.string().uuid().required(),
    stripePaymentIntentId: yup.string().required(),
    stripePaymentIntentClientSecret: yup.string().required(),
    stripePaymentIntentStatus: yup
      .mixed<PaymentIntentRecordStatus>()
      .oneOf(Object.values(PaymentIntentRecordStatus))
      .required(),

    amount: yup.number().min(0).required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('PaymentIntent')

export type PaymentIntentRecord = yup.Asserts<typeof PaymentIntent>

export const table = (db: PrismaClient) => db.paymentIntent
export type PaymentIntentTable = ReturnType<typeof table>
