import { objectType } from 'nexus'

export const FulfillmentTrackingInfo = objectType({
  name: 'FulfillmentTrackingInfo',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('trackingNumber')
    t.nonNull.string('trackingUrl')
    t.nonNull.string('carrier')

    t.nonNull.DateTime('createdAt')
    t.nonNull.DateTime('updatedAt')
  },
})

export const FulfillmentOrderItem = objectType({
  name: 'FulfillmentOrderItem',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('fulfillmentId')
    t.nonNull.string('orderItemId')
    t.nonNull.int('quantity')

    t.nonNull.DateTime('createdAt')
    t.nonNull.DateTime('updatedAt')
  },
})

export const Fulfillment = objectType({
  name: 'Fulfillment',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('userId')
    t.nonNull.string('organizationId')
    t.nonNull.string('orderId')
    t.nonNull.string('fulfillmentTrackingInfoId')

    t.nonNull.DateTime('createdAt')
    t.nonNull.DateTime('updatedAt')

    t.nonNull.field('trackingInfo', {
      type: 'FulfillmentTrackingInfo',
    })

    t.nonNull.list.nonNull.field('fulfillmentOrderItems', {
      type: 'FulfillmentOrderItem',
    })
  },
})
