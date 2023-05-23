import {
  PrismaClient,
  FulfillmentOrderItem as FulfillmentOrderItemSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const FulfillmentOrderItem: yup.ObjectSchema<FulfillmentOrderItemSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),
      orderItemId: yup.string().uuid().required(),
      fulfillmentId: yup.string().uuid().required(),

      quantity: yup.number().required(),

      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    })
    .label('FulfillmentOrderItem')

export type FulfillmentOrderItemRecord = yup.Asserts<
  typeof FulfillmentOrderItem
>

export const table = (db: PrismaClient) => db.fulfillmentOrderItem
export type FulfillmentOrderItemTable = ReturnType<typeof table>
