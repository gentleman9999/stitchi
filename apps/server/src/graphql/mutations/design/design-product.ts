import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import {
  CatalogFactoryCatalogProduct,
  CatalogFactoryProductVariant,
} from '../../../services/catalog/factory'
import { DesignFactoryDesign } from '../../../services/design/factory'
import { OrderItemRecordType } from '../../../services/order/db/order-item-table'
import { OrderRecordType } from '../../../services/order/db/order-table'
import calculate from '../../../services/quote/calculateQuote'
import { notEmpty } from '../../../utils'
import { orderFactoryOrderToGraphQL } from '../../serializers/order'

export const DesignProductCreateOrderPayload = objectType({
  name: 'DesignProductCreateOrderPayload',
  definition(t) {
    t.nullable.field('order', { type: 'Order' })
  },
})

export const DesignProductCreateOrderItemInput = inputObjectType({
  name: 'DesignProductCreateOrderItemInput',
  definition(t) {
    t.nonNull.id('catalogProductVariantId')
    t.nonNull.int('quantity')
  },
})

export const DesignProductCreateOrderInput = inputObjectType({
  name: 'DesignProductCreateOrderInput',
  definition(t) {
    t.nonNull.id('designProductId')
    t.nullable.id('shippingAddressId')
    t.nonNull.list.nonNull.field('orderItems', {
      type: 'DesignProductCreateOrderItemInput',
    })
  },
})

export const designProductCreateOrder = mutationField(
  'designProductCreateOrder',
  {
    type: 'DesignProductCreateOrderPayload',
    args: {
      input: nonNull('DesignProductCreateOrderInput'),
    },
    resolve: async (_, { input }, ctx) => {
      let designProduct: DesignFactoryDesign

      try {
        designProduct = await ctx.design.getDesign({
          designId: input.designProductId,
        })
      } catch (error) {
        ctx.logger.error(error)
        throw new GraphQLError('Unable to fetch design product')
      }

      let product: CatalogFactoryCatalogProduct

      try {
        product = await ctx.catalog.getCatalogProduct({
          productEntityId: designProduct.catalogProductId,
        })

        if (!product) {
          throw new Error('Product not found')
        }
      } catch (error) {
        ctx.logger
          .child({
            context: { error, designProduct: parent },
          })
          .error('Error getting catalog product')

        throw new GraphQLError('Error getting catalog product')
      }

      let productVariants: CatalogFactoryProductVariant[]

      try {
        productVariants = await ctx.catalog.listCatalogProductVariants({
          productEntityId: designProduct.catalogProductId,
        })
      } catch (error) {
        ctx.logger
          .child({
            context: { error, designProduct: parent },
          })
          .error('Error getting catalog product variants')

        throw new GraphQLError('Error getting catalog product variants')
      }

      let designProof

      try {
        designProof = await ctx.design.getDesignProof({
          designProofId: designProduct.designProofId,
        })
      } catch (error) {
        ctx.logger
          .child({
            context: { error, designProduct: parent },
          })
          .error("Error getting design proof's design")

        throw new GraphQLError('Error getting design proof')
      }

      const quantity = input.orderItems.reduce(
        (acc, item) => acc + item.quantity,
        0,
      )

      // TODO: Add support for Direct to Garment
      const quote = calculate({
        includeFulfillment: false,
        quantity,
        productPriceCents: product.priceCents,
        printLocations: designProof.locations.map(location => ({
          colorCount: location.colorCount || 0,
        })),
      })

      let order
      try {
        order = await ctx.order.createOrder({
          order: {
            customerEmail: null,
            customerFirstName: null,
            customerLastName: null,
            customerPhone: null,
            designRequestId: null,
            organizationId: ctx.organizationId || null,
            shippingAddressId: input.shippingAddressId || null,
            membershipId: ctx.membershipId || null,
            type: OrderRecordType.CART,
            items: input.orderItems
              .map(item => {
                const productVariant = productVariants.find(
                  variant =>
                    variant.id.toString() === item.catalogProductVariantId,
                )

                if (!productVariant) {
                  ctx.logger
                    .child({ context: { item } })
                    .error('Product variant not found')

                  return null
                }

                return {
                  designId: designProduct.id,
                  quantity: item.quantity,
                  // This can represent many things (denoted by TYPE). Therefore we store all ID's as strings in the order line item.
                  productId: designProduct.catalogProductId,
                  productVariantId: item.catalogProductVariantId,
                  unitPriceCents: quote.productUnitCostCents,
                  totalPriceCents: quote.productUnitCostCents * item.quantity,
                  type: OrderItemRecordType.BIG_C_PRODUCT,
                  title: `${
                    designProduct.name
                  } - ${productVariant?.option_values
                    ?.map(v => v.label)
                    .join(', ')} - ${productVariant?.sku}`,
                }
              })
              .filter(notEmpty),
          },
        })
      } catch (error) {
        ctx.logger.error(error)
        throw new GraphQLError('Failed to create order')
      }

      return { order: orderFactoryOrderToGraphQL(order) }
    },
  },
)
