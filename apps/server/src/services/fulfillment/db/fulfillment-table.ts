import { PrismaClient, Fulfillment as FulfillmentSchema } from '@prisma/client'
import * as yup from 'yup'

export const Fulfillment: yup.ObjectSchema<FulfillmentSchema> = yup
  .object()
  .shape({
    id: yup.string().uuid().required(),
    membershipId: yup.string().nullable().defined(),
    organizationId: yup.string().uuid().nullable().defined(),
    orderId: yup.string().uuid().required(),
    fulfillmentTrackingInfoId: yup.string().uuid().required(),

    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
  })
  .label('Fulfillment')

export type FulfillmentRecord = yup.Asserts<typeof Fulfillment>

export const table = (db: PrismaClient) => db.fulfillment
export type FulfillmentTable = ReturnType<typeof table>
