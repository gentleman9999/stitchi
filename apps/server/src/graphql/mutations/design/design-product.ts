import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import {
  CatalogFactoryCatalogProduct,
  CatalogFactoryProductVariant,
} from '../../../services/catalog/factory'
import { DesignFactoryDesign } from '../../../services/design/factory'
import { OrderItemRecordType } from '../../../services/order/db/order-item-table'
import { OrderRecordType } from '../../../services/order/db/order-table'
import { notEmpty } from '../../../utils'
import { orderFactoryOrderToGraphQL } from '../../serializers/order'
import { v4 } from 'uuid'

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

      // TODO: Add support for Direct to Garment
      const quote = await ctx.quote.generateQuoteV2({
        includeFulfillment: false,
        printLocations: designProof.locations.map(location => ({
          colorCount: location.colorCount || 0,
        })),
        variants: input.orderItems.map(variant => ({
          quantity: variant.quantity,
          catalogProductId: designProduct.catalogProductId,
          catalogProductVariantId: variant.catalogProductVariantId,
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
            userId: ctx.userId || null,
            type: OrderRecordType.CART,
            items: input.orderItems
              .map(item => {
                const itemQuote = quote.variants.find(
                  variant =>
                    variant.catalogProductVariantId ===
                    item.catalogProductVariantId,
                )

                if (!itemQuote) {
                  ctx.logger
                    .child({ context: { item } })
                    .error('Item quote not found')

                  return null
                }

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
                  quantity: itemQuote.quantity,
                  // This can represent many things (denoted by TYPE). Therefore we store all ID's as strings in the order line item.
                  productId: designProduct.catalogProductId,
                  productVariantId: item.catalogProductVariantId,
                  unitPriceCents: itemQuote.unitRetailPriceCents,
                  totalPriceCents: itemQuote.totalRetailPriceCents,
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

export const DesignProductCreateQuotePayload = objectType({
  name: 'DesignProductCreateQuotePayload',
  definition(t) {
    t.nullable.field('quote', { type: 'Quote' })
  },
})

export const DesignProductCreateQuoteVariantInput = inputObjectType({
  name: 'DesignProductCreateQuoteVariantInput',
  definition(t) {
    t.nonNull.id('catalogProductVariantId')
    t.nonNull.int('quantity')
  },
})

export const DesignProductCreateQuoteInput = inputObjectType({
  name: 'DesignProductCreateQuoteInput',
  definition(t) {
    t.nonNull.id('designProductId')
    t.nonNull.list.nonNull.field('variants', {
      type: 'DesignProductCreateQuoteVariantInput',
    })
  },
})

export const designProductCreateQuote = mutationField(
  'designProductCreateQuote',
  {
    type: 'DesignProductCreateQuotePayload',
    args: {
      input: nonNull('DesignProductCreateQuoteInput'),
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
      } catch (error) {
        ctx.logger
          .child({
            context: { error, designProduct: parent },
          })
          .error('Error getting catalog product')

        return {
          quote: null,
        }
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

      // TODO: Add support for Direct to Garment
      const quote = await ctx.quote.generateQuoteV2({
        includeFulfillment: false,
        printLocations: designProof.locations.map(location => ({
          colorCount: location.colorCount || 0,
        })),
        variants: input.variants.map(variant => ({
          quantity: variant.quantity,
          catalogProductId: designProduct.catalogProductId,
          catalogProductVariantId: variant.catalogProductVariantId,
        })),
      })

      return {
        quote: {
          id: v4(),
          productTotalCostCents: quote.totalRetailPriceCents,
          productUnitCostCents: quote.unitRetailPriceCents,
        },
      }
    },
  },
)
