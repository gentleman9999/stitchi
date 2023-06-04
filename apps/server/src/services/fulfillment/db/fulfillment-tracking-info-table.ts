import {
  PrismaClient,
  FulfillmentTrackingInfo as FulfillmentTrackingInfoSchema,
} from '@prisma/client'
import * as yup from 'yup'

export const FulfillmentTrackingInfo: yup.ObjectSchema<FulfillmentTrackingInfoSchema> =
  yup
    .object()
    .shape({
      id: yup.string().uuid().required(),

      trackingNumber: yup.string().required(),
      trackingUrl: yup.string().required(),
      carrier: yup.string().required(),

      createdAt: yup.date().required(),
      updatedAt: yup.date().required(),
    })
    .label('FulfillmentTrackingInfo')

export type FulfillmentTrackingInfoRecord = yup.Asserts<
  typeof FulfillmentTrackingInfo
>

export const table = (db: PrismaClient) => db.fulfillmentTrackingInfo
export type FulfillmentTrackingInfoTable = ReturnType<typeof table>
