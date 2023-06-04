import { FulfillmentFactoryFulfillment } from '../../services/fulfillment/factory'
import { NexusGenObjects } from '../generated/nexus'

export const fulfillmentFactoryFulfillmentToGraphQL = (
  fulfillment: FulfillmentFactoryFulfillment,
): NexusGenObjects['Fulfillment'] => {
  return {
    ...fulfillment,
    trackingInfo: fulfillment.trackingInfo,
    fulfillmentOrderItems: fulfillment.orderItems,
  }
}
