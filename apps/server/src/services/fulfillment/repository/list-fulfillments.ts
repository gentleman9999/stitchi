import { PrismaClient } from '@prisma/client'
import {
  FulfillmentTable,
  table as makeFulfillmentTable,
} from '../db/fulfillment-table'
import fulfillmentFactory, { FulfillmentFactoryFulfillment } from '../factory'

const prisma = new PrismaClient()

interface ListFulfillmentsConfig {
  fulfillmentTable: FulfillmentTable
}

interface ListFulfillmentsFilter {
  orderId?: string
}

export interface ListFullfillmentsFnInput {
  filter?: ListFulfillmentsFilter
}

type ListFulfillmentsFn = (
  input: ListFullfillmentsFnInput,
) => Promise<FulfillmentFactoryFulfillment[]>

type MakeListFulfillmentsFn = (
  config?: ListFulfillmentsConfig,
) => ListFulfillmentsFn

const makeListFulfillments: MakeListFulfillmentsFn =
  ({ fulfillmentTable } = { fulfillmentTable: makeFulfillmentTable(prisma) }) =>
  async input => {
    let fulfillmentRecords

    try {
      fulfillmentRecords = await fulfillmentTable.findMany({
        where: {
          orderId: input.filter?.orderId,
        },
        include: {
          FulfillmentTrackingInfo: true,
          FulfillmentOrderItems: true,
        },
      })
    } catch (error) {
      console.error(`Failed to get fulfillments`, {
        context: { error },
      })
      throw new Error('Failed to get fulfillments')
    }

    return fulfillmentRecords.map(fulfillment =>
      fulfillmentFactory({
        fulfillmentRecord: fulfillment,
        fulfillmentTrackingInfoRecord: fulfillment.FulfillmentTrackingInfo,
        fulfillmentOrderItemsRecords: fulfillment.FulfillmentOrderItems,
      }),
    )
  }

export default makeListFulfillments
