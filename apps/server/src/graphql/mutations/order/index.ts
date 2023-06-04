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
          customerFullName: null,
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

export const OrderCartUpdateInput = inputObjectType({
  name: 'OrderCartUpdateInput',
  definition(t) {
    t.nonNull.id('orderId')
  },
})

export const OrderCartUpdatePayload = objectType({
  name: 'OrderCartUpdatePayload',
  definition(t) {
    t.field('order', {
      type: 'Order',
    })
  },
})

// export const orderCartUpdate = mutationField('orderCartUpdate', {
//   description: 'Updates an existing order during user Cart',
//   type: 'OrderCartCreatePayload',
//   args: {
//     input: nonNull('OrderCartUpdateInput'),
//   },
//   resolve: async (_, { input }, ctx) => {
//     if (!ctx.userId || !ctx.organizationId) throw new Error('Not authenticated')

//     try {
//       const order = await ctx.prisma.order.update({
//         where: { id: input.orderId },
//         data: {},
//       })

//       return { order }
//     } catch (error) {
//       console.error(error)
//       throw new Error('Failed to update order')
//     }
//   },
// })
