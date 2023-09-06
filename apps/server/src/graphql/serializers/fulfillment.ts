import { FulfillmentFactoryFulfillment } from '../../services/fulfillment/factory'
import { NexusGenObjects } from '../generated/nexus'

export const fulfillmentFactoryFulfillmentToGraphQL = (
  fulfillment: FulfillmentFactoryFulfillment,
): NexusGenObjects['Fulfillment'] => {
  return {
    id: fulfillment.id,
    membershipId: fulfillment.membershipId,
    orderId: fulfillment.orderId,
    organizationId: fulfillment.organizationId,
    fulfillmentTrackingInfoId: fulfillment.fulfillmentTrackingInfoId,

    createdAt: fulfillment.createdAt,
    updatedAt: fulfillment.updatedAt,
    trackingInfo: fulfillment.trackingInfo,
    fulfillmentOrderItems: fulfillment.orderItems,
  }
}
