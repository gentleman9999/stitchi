import { PrismaClient } from '@prisma/client'
import * as yup from 'yup'
import { FulfillmentOrderItem } from '../db/fulfillment-order-item'
import {
  Fulfillment,
  FulfillmentTable,
  table as makeFulfillmentTable,
} from '../db/fulfillment-table'
import { FulfillmentTrackingInfo } from '../db/fulfillment-tracking-info-table'
import fulfillmentFactory, { FulfillmentFactoryFulfillment } from '../factory'

const inputSchema = Fulfillment.omit([
  'id',
  'createdAt',
  'updatedAt',
  'fulfillmentTrackingInfoId',
]).concat(
  yup.object().shape({
    fulfillmentTrackingInfo: FulfillmentTrackingInfo.omit([
      'id',
      'createdAt',
      'updatedAt',
    ]).required(),
    fulfillmentOrderItems: yup
      .array()
      .of(
        FulfillmentOrderItem.omit(['id', 'createdAt', 'updatedAt']).required(),
      )
      .min(0)
      .required(),
  }),
)

const prisma = new PrismaClient()

interface CreateFulfillmentConfig {
  fulfillmentTable: FulfillmentTable
}

export interface CreateFulfillmentFnInput {
  fulfillment: yup.InferType<typeof inputSchema>
}

type CreateFulfillmentFn = (
  input: CreateFulfillmentFnInput,
) => Promise<FulfillmentFactoryFulfillment>
type MakeCreateFulfillmentFn = (
  config?: CreateFulfillmentConfig,
) => CreateFulfillmentFn

const makeCreateFulfillment: MakeCreateFulfillmentFn =
  ({ fulfillmentTable } = { fulfillmentTable: makeFulfillmentTable(prisma) }) =>
  async input => {
    const validInput = await inputSchema.validate(input.fulfillment)

    const {
      fulfillmentOrderItems,
      fulfillmentTrackingInfo,
      ...fulfillmentInput
    } = validInput

    const fulfillment = await fulfillmentTable.create({
      data: {
        userId: fulfillmentInput.userId,
        organizationId: fulfillmentInput.organizationId,

        Order: {
          connect: {
            id: fulfillmentInput.orderId,
          },
        },

        FulfillmentTrackingInfo: {
          create: {
            carrier: fulfillmentTrackingInfo.carrier,
            trackingNumber: fulfillmentTrackingInfo.trackingNumber,
            trackingUrl: fulfillmentTrackingInfo.trackingUrl,
          },
        },
        FulfillmentOrderItems: {
          createMany: {
            data: fulfillmentOrderItems,
          },
        },
      },
      include: {
        FulfillmentOrderItems: true,
        FulfillmentTrackingInfo: true,
      },
    })

    return fulfillmentFactory({
      fulfillmentRecord: fulfillment,
      fulfillmentOrderItemsRecords: fulfillment.FulfillmentOrderItems,
      fulfillmentTrackingInfoRecord: fulfillment.FulfillmentTrackingInfo,
    })
  }

export default makeCreateFulfillment
