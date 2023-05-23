import { enumType, objectType } from 'nexus'

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
  members: ['CART'],
})

export const Order = objectType({
  name: 'Order',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('humanOrderId')

    t.nullable.string('userId')
    t.nullable.string('customerId', {
      resolve: order => order.userId || null,
    })

    t.nullable.string('customerFullName')
    t.nullable.string('customerEmail')
    t.nullable.string('customerPhone')

    t.nonNull.int('totalPriceCents')
    t.nonNull.int('subtotalPriceCents')
    t.nonNull.int('totalTaxCents')
    t.nonNull.int('totalShippingCents')
    t.nonNull.int('totalProcessingFeeCents')

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

    t.nullable.field('customer', {
      type: 'User',
      resolve: async (order, _, ctx) => {
        if (!order.userId) {
          return null
        }

        const user = await ctx.auth0.getUser({ id: order.userId })
        return { ...user, id: user.user_id }
      },
    })
  },
})
