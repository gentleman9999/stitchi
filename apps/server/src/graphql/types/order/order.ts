import { enumType, objectType } from 'nexus'

export const OrderItemSummary = objectType({
  name: 'OrderItemSummary',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('title')
    t.nonNull.int('quantity')
    t.nonNull.int('totalPriceCents')
  },
})

export const OrderItemType = enumType({
  name: 'OrderItemType',
  members: ['BIG_COMMERCE_PRODUCT', 'CUSTOM'],
})

export const OrderItem = objectType({
  name: 'OrderItem',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('orderId')

    t.nonNull.string('title')

    t.nonNull.int('quantity')
    t.nonNull.int('unitPriceCents')
    t.nonNull.int('totalPriceCents')

    t.nonNull.field('type', { type: 'OrderItemType' })

    t.nullable.string('productId')
    t.nullable.string('productVariantId')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const OrderPaymentStatus = enumType({
  name: 'OrderPaymentStatus',
  members: [
    'NOT_PAID',
    'PAID',
    'PARTIALLY_PAID',
    'REFUNDED',
    'PARTIALLY_REFUNDED',
  ],
})

// export const OrderFulfillmentStatus = enumType({
//   name: 'OrderFulfillmentStatus',
//   members: ['FULFILLED', 'PARTIALLY_FULFILLED', 'NOT_FULFILLED'],
// })

export const OrderType = enumType({
  name: 'OrderType',
  members: ['CART', 'CONFIRMED'],
})

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('humanOrderId')

    t.nullable.string('membershipId')
    t.nullable.string('customerId', {
      resolve: order => order.membershipId || null,
    })

    t.nullable.string('shippingAddressId')
    t.nullable.string('designRequestId')

    t.nullable.string('customerFirstName')
    t.nullable.string('customerLastName')
    t.nullable.string('customerEmail')
    t.nullable.string('customerPhone')

    t.nonNull.int('totalPriceCents')
    t.nonNull.int('subtotalPriceCents')
    t.nonNull.int('totalTaxCents')
    t.nonNull.int('totalShippingCents')
    t.nonNull.int('totalProcessingFeeCents')
    t.nonNull.int('totalAmountPaidCents')
    t.nonNull.int('totalAmountDueCents')
    t.nonNull.int('totalAmountRefundedCents')

    t.nonNull.field('paymentStatus', {
      type: 'OrderPaymentStatus',
    })

    t.nonNull.string('humanPaymentStatus')

    t.nonNull.field('type', {
      type: 'OrderType',
    })

    t.nonNull.list.nonNull.field('items', {
      type: 'OrderItem',
    })

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})
