import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { OrderRecordType } from '../../../services/order/db/order-table'
import { orderFactoryOrderToGraphQL } from '../../serializers/order'

export * from './mailing-address'

export const OrderCartCreatePrintLocationInput = inputObjectType({
  name: 'OrderCartCreatePrintLocationInput',
  definition(t) {
    t.nonNull.int('colorCount')
  },
})

export const OrderCartCreateItemsInput = inputObjectType({
  name: 'OrderCartCreateItemsInput',
  definition(t) {
    t.nonNull.int('productVariantEntityId')
    t.nonNull.int('quantity')
  },
})

export const OrderConfirmMailingAddressInput = inputObjectType({
  name: 'OrderConfirmMailingAddressInput',
  definition(t) {
    t.nullable.string('name')
    t.nullable.string('phone')
    t.nullable.string('company')
    t.nullable.string('firstName')
    t.nullable.string('lastName')
    t.nullable.string('address1')
    t.nullable.string('address2')
    t.nullable.string('city')
    t.nullable.string('country')
    t.nullable.string('province')
    t.nullable.string('provinceCode')
    t.nullable.string('zip')
  },
})

export const OrderConfirmInput = inputObjectType({
  name: 'OrderConfirmInput',
  definition(t) {
    t.nonNull.id('orderId')
    t.nonNull.string('customerEmail')
    t.nonNull.string('customerFirstName')
    t.nonNull.string('customerLastName')
    t.nonNull.string('customerPhone')
    t.nonNull.field('shippingAddress', {
      type: 'OrderConfirmMailingAddressInput',
    })
  },
})

export const OrderConfirmPayload = objectType({
  name: 'OrderConfirmPayload',
  definition(t) {
    t.field('order', {
      type: 'Order',
    })
  },
})

export const orderConfirm = mutationField('orderConfirm', {
  description: 'Confirms an order with a customers details',
  type: 'OrderConfirmPayload',
  args: {
    input: nonNull('OrderConfirmInput'),
  },
  resolve: async (_, { input }, ctx) => {
    let order

    try {
      order = await ctx.order.getOrder({
        orderId: input.orderId,
      })
    } catch (error) {
      ctx.logger
        .child({
          context: { error },
        })
        .error(`Failed to get order: ${input.orderId}`)
      throw new GraphQLError('Failed to get order')
    }

    let shippingAddress

    try {
      shippingAddress = await ctx.order.createMailingAddress({
        // mailingAddress: {} as any,
        mailingAddress: {
          address1: input.shippingAddress.address1 || null,
          address2: input.shippingAddress.address2 || null,
          city: input.shippingAddress.city || null,
          company: input.shippingAddress.company || null,
          country: input.shippingAddress.country || null,
          firstName: input.shippingAddress.firstName || null,
          lastName: input.shippingAddress.lastName || null,
          name: input.shippingAddress.name || null,
          phone: input.shippingAddress.phone || null,
          province: input.shippingAddress.province || null,
          provinceCode: input.shippingAddress.provinceCode || null,
          zip: input.shippingAddress.zip || null,
          organizationId: ctx.organizationId || null,
          membershipId: ctx.membershipId || null,
          latitude: null,
          longitude: null,
        },
      })
    } catch (error) {
      ctx.logger
        .child({
          context: { error },
        })
        .error(`Failed to create mailing address`)
      throw new GraphQLError('Failed to create mailing address')
    }

    try {
      order = await ctx.order.updateOrder({
        order: {
          ...order,
          type: OrderRecordType.CONFIRMED,
          customerEmail: input.customerEmail || null,
          customerFirstName: input.customerFirstName || null,
          customerLastName: input.customerLastName || null,
          customerPhone: input.customerPhone || null,
          shippingAddressId: shippingAddress.id,

          // Update these values if the don't already exist
          membershipId: order.membershipId || ctx.membershipId || null,
          organizationId: order.organizationId || ctx.organizationId || null,
        },
      })
    } catch (error) {
      ctx.logger
        .child({
          context: { error },
        })
        .error(`Failed to update order: ${input.orderId}`)
      throw new GraphQLError('Failed to update order')
    }

    return { order: orderFactoryOrderToGraphQL(order) }
  },
})
