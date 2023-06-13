import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { ProductFactoryProduct } from '../../../services/catalog/factory'
import { DesignFactoryDesign } from '../../../services/design/factory'
import { OrderItemRecordType } from '../../../services/order/db/order-item-table'
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

export const OrderCartCreateInput = inputObjectType({
  name: 'OrderCartCreateInput',
  definition(t) {
    t.nonNull.int('productEntityId')
    t.nonNull.boolean('includeFulfillment')
    t.nonNull.list.nonNull.field('printLocations', {
      type: 'OrderCartCreatePrintLocationInput',
    })
    t.nonNull.list.nonNull.field('items', {
      type: 'OrderCartCreateItemsInput',
    })
    t.nullable.string('shippingAddressId')
  },
})

export const OrderCartCreatePayload = objectType({
  name: 'OrderCartCreatePayload',
  definition(t) {
    t.field('order', {
      type: 'Order',
    })
  },
})

export const orderCartCreate = mutationField('orderCartCreate', {
  description: 'Creates a new order during user Cart',
  type: 'OrderCartCreatePayload',
  args: {
    input: nonNull('OrderCartCreateInput'),
  },
  resolve: async (_, { input }, ctx) => {
    // We want to calculate the line item printing cost using the total order quantity of prints
    const totalPrintQuantity = input.items.reduce(
      (acc, curr) => acc + curr.quantity,
      0,
    )

    let product: ProductFactoryProduct
    try {
      product = await ctx.catalog.getBigCommerceProduct({
        productEntityId: input.productEntityId,
      })
    } catch (error) {
      console.error(`Failed to get product: ${input.productEntityId}`, {
        context: { error },
      })
      throw new GraphQLError('Failed to get product')
    }

    // Start by creating design

    let design: DesignFactoryDesign
    try {
      design = await ctx.design.createDesign({
        name: product.name,
        description: null,
        organizationId: ctx.organizationId || null,
        userId: ctx.userId || null,
        designLocations: input.printLocations.map(printLocation => ({
          name: `Print Location ${input.printLocations.length + 1}`,
          colorCount: printLocation.colorCount,
        })),
      })
    } catch (error) {
      console.error(`Failed to create design`, { context: { error } })
      throw new GraphQLError('Failed to create design')
    }

    const orderItems = []

    for (const item of input.items) {
      let productVariant

      try {
        productVariant = await ctx.catalog.getBigCommerceProductVariant({
          productEntityId: input.productEntityId,
          variantEntityId: item.productVariantEntityId,
        })
      } catch (error) {
        console.error(
          `Failed to get product variant: ${item.productVariantEntityId}`,
          { context: { error } },
        )
        throw new GraphQLError('Failed to get product variant')
      }

      let productQuote

      try {
        productQuote = await ctx.quote.generateQuote({
          includeFulfillment: input.includeFulfillment,
          productPriceCents: productVariant.priceCents,
          quantity: totalPrintQuantity,
          printLocations: design.locations.map(location => ({
            colorCount: location.colorCount,
          })),
        })
      } catch (error) {
        console.error(
          `Failed to generate quote for product variant: ${item.productVariantEntityId}`,
          {
            context: { error },
          },
        )
        throw new GraphQLError('Failed to generate quote for product')
      }

      orderItems.push({ item, productVariant, productQuote })
    }

    try {
      const order = await ctx.order.createOrder({
        order: {
          customerEmail: null,
          customerFirstName: null,
          customerLastName: null,
          customerPhone: null,
          organizationId: ctx.organizationId || null,
          shippingAddressId: input.shippingAddressId || null,
          userId: ctx.userId || null,
          type: OrderRecordType.CART,
          items: orderItems.map(({ item, productVariant, productQuote }) => {
            return {
              quantity: item.quantity,
              designId: design.id,
              // This can represent many things (denoted by TYPE). Therefore we store all ID's as strings in the order line item.
              productId: input.productEntityId.toString(),
              productVariantId: item.productVariantEntityId.toString(),
              unitPriceCents: productQuote.productUnitCostCents,
              totalPriceCents:
                productQuote.productUnitCostCents * item.quantity,

              type: OrderItemRecordType.BIG_C_PRODUCT,
              title: `${product.name} - ${productVariant.option_values
                ?.map(v => v.label)
                .join(', ')} - ${productVariant.sku}`,
            }
          }),
        },
      })

      return { order: orderFactoryOrderToGraphQL(order) }
    } catch (error) {
      console.error(error)
      throw new GraphQLError('Failed to create order')
    }
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
      console.error(`Failed to get order: ${input.orderId}`, {
        context: { error },
      })
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
          userId: ctx.userId || null,
          latitude: null,
          longitude: null,
        },
      })
    } catch (error) {
      console.error(`Failed to create mailing address`, {
        context: { error },
      })
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
          userId: order.userId || ctx.userId || null,
          organizationId: order.organizationId || ctx.organizationId || null,
        },
      })
    } catch (error) {
      console.error(`Failed to update order: ${input.orderId}`, {
        context: { error },
      })
      throw new GraphQLError('Failed to update order')
    }

    return { order: orderFactoryOrderToGraphQL(order) }
  },
})
