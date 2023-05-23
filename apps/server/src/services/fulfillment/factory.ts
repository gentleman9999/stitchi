import { FulfillmentOrderItemRecord } from './db/fulfillment-order-item'
import { FulfillmentRecord } from './db/fulfillment-table'
import { FulfillmentTrackingInfoRecord } from './db/fulfillment-tracking-info-table'

export interface FulfillmentFactoryFulfillmentOrderItem
  extends FulfillmentOrderItemRecord {}

export interface FulfillmentFactoryFulfillmentTrackingInfo
  extends FulfillmentTrackingInfoRecord {}

export interface FulfillmentFactoryFulfillment extends FulfillmentRecord {
  trackingInfo: FulfillmentFactoryFulfillmentTrackingInfo
  orderItems: FulfillmentFactoryFulfillmentOrderItem[]
}

interface FulfillmentFactoryConfig {
  fulfillmentRecord: FulfillmentRecord
  fulfillmentTrackingInfoRecord: FulfillmentTrackingInfoRecord
  fulfillmentOrderItemsRecords: FulfillmentOrderItemRecord[]
}

const fulfillmentFactory = ({
  fulfillmentRecord,
  fulfillmentOrderItemsRecords,
  fulfillmentTrackingInfoRecord,
}: FulfillmentFactoryConfig): FulfillmentFactoryFulfillment => {
  return {
    ...fulfillmentRecord,
    trackingInfo: fulfillmentTrackingInfoRecord,
    orderItems: fulfillmentOrderItemsRecords,
  }
}

export default fulfillmentFactory
