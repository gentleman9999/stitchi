import { GraphQLError } from 'graphql'
import {
  enumType,
  inputObjectType,
  mutationField,
  nonNull,
  objectType,
} from 'nexus'
import {
  CatalogFactoryCatalogProduct,
  CatalogFactoryProductVariant,
} from '../../../services/catalog/factory'
import { OrderItemRecordType } from '../../../services/order/db/order-item-table'
import { OrderRecordType } from '../../../services/order/db/order-table'
import calculate from '../../../services/quote/calculateQuote'
import { notEmpty } from '../../../utils'

export const CatalogProductCustomizeItemsInput = inputObjectType({
  name: 'CatalogProductCustomizeItemsInput',
  definition(t) {
    t.nonNull.id('catalogProductVariantId')
    t.nonNull.int('quantity')
  },
})

export const CatalogProductCustomizationAddonType = enumType({
  name: 'CatalogProductCustomizationAddonType',
  members: ['PRINT_LOCATION'],
})

export const CatalogProductCustomizeAddonsInput = inputObjectType({
  name: 'CatalogProductCustomizeAddonsInput',
  definition(t) {
    t.nonNull.field('type', { type: 'CatalogProductCustomizationAddonType' })
    t.nonNull.string('name')
  },
})

export const CatalogProductCustomizeInput = inputObjectType({
  name: 'CatalogProductCustomizeInput',
  definition(t) {
    t.nonNull.id('catalogProductId')
    t.nullable.string('name')
    t.nullable.string('description')
    t.nullable.list.nonNull.id('fileIds')
    t.nonNull.list.nonNull.field('items', {
      type: 'CatalogProductCustomizeItemsInput',
    })
    t.nonNull.list.nonNull.field('addons', {
      type: 'CatalogProductCustomizeAddonsInput',
    })
  },
})

export const CatalogProductCustomizePayload = objectType({
  name: 'CatalogProductCustomizePayload',
  definition(t) {
    t.nullable.field('designRequest', { type: 'DesignRequest' })
    t.nullable.field('order', { type: 'Order' })
  },
})

export const catalogProductCustomize = mutationField(
  'catalogProductCustomize',
  {
    type: 'CatalogProductCustomizePayload',
    args: {
      input: nonNull(CatalogProductCustomizeInput),
    },
    resolve: async (_, { input }, ctx) => {
      const designRequestName = input.name || 'No name'

      let productVariants: CatalogFactoryProductVariant[]

      try {
        productVariants = await ctx.catalog.listCatalogProductVariants({
          productEntityId: input.catalogProductId,
        })
      } catch (error) {
        ctx.logger
          .child({
            context: { error, designProduct: parent },
          })
          .error('Error getting catalog product variants')

        throw new GraphQLError('Error getting catalog product variants')
      }

      // For every item, find the corresponding product variant and merge the quantity
      const pickedProductVariants = input.items
        .map(item => {
          const productVariant = productVariants.find(
            variant => variant.id.toString() === item.catalogProductVariantId,
          )

          if (!productVariant) {
            ctx.logger
              .child({
                item,
              })
              .error('Unable to find product variant')

            return null
          }

          return {
            ...productVariant,
            ...item,
          }
        })
        .filter(notEmpty)

      let product: CatalogFactoryCatalogProduct

      // Get the catalog product
      try {
        product = await ctx.catalog.getCatalogProduct(
          {
            productEntityId: input.catalogProductId,
          },
          { includeOptions: true },
        )

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

      const pickedColorIdSet = new Set(
        pickedProductVariants.map(
          variant =>
            variant.option_values
              ?.find(value => value.option_display_name === 'Color')
              ?.id.toString() || null,
        ),
      )

      const colorOptionValue = product.options.find(
        option => option.displayName === 'Color',
      )

      const pickedColors = colorOptionValue?.optionValues.filter(value =>
        pickedColorIdSet.has(value.bigCommerceOptionValueId),
      )

      let designRequest

      try {
        designRequest = await ctx.design.createDesignRequest({
          designRequest: {
            organizationId: ctx.organizationId || null,
            approvedDesignProofId: null,
            membershipId: ctx.membershipId || null,
            status: 'SUBMITTED',
            name: designRequestName,
            description: input.description || null,
            metadata: {},
            files:
              input.fileIds?.map(fileId => ({
                fileId,
              })) || [],

            designLocations: input.addons
              .map(addon => {
                if (addon.type === 'PRINT_LOCATION') {
                  return {
                    description: '',
                    placement: addon.name,
                    files: [],
                  }
                }
                return null
              })
              .filter(notEmpty),
            artists: [],
            product: {
              catalogProductId: input.catalogProductId,
              colors:
                pickedColors?.map(color => ({
                  catalogProductColorId: color.bigCommerceOptionValueId,
                  hexCode: color.colorHexCodes?.[0] || null,
                  name: color.label || null,
                })) || [],
            },
          },
        })
      } catch (error) {
        ctx.logger.error(error)
        throw new GraphQLError('Unable to create design request')
      }

      const quantity = input.items.reduce((acc, item) => acc + item.quantity, 0)

      // TODO: Add support for Direct to Garment
      const quote = calculate({
        includeFulfillment: false,
        quantity,
        productPriceCents: product.priceCents,
        printLocations: input.addons
          .map(addon => {
            if (addon.type !== 'PRINT_LOCATION') {
              return null
            }

            return {
              // We quote at 1 color until we have a final design, where we then update the order
              colorCount: 1,
            }
          })
          .filter(notEmpty),
      })

      let order

      try {
        order = await ctx.order.createOrder({
          order: {
            customerEmail: null,
            customerFirstName: null,
            customerLastName: null,
            customerPhone: null,
            organizationId: ctx.organizationId || null,
            shippingAddressId: null,
            membershipId: ctx.membershipId || null,
            designRequestId: designRequest.id,
            type: OrderRecordType.CART,
            items: pickedProductVariants
              .map(item => {
                return {
                  // We haven't create a design product yet
                  designId: null,
                  quantity: item.quantity,
                  // This can represent many things (denoted by TYPE). Therefore we store all ID's as strings in the order line item.
                  productId: input.catalogProductId,
                  productVariantId: item.catalogProductVariantId,
                  unitPriceCents: quote.productUnitCostCents,
                  totalPriceCents: quote.productUnitCostCents * item.quantity,
                  type: OrderItemRecordType.BIG_C_PRODUCT,
                  title: `${designRequestName} - ${item?.option_values
                    ?.map(v => v.label)
                    .join(', ')} - ${item?.sku}`,
                }
              })
              .filter(notEmpty),
          },
        })
      } catch (error) {
        ctx.logger.error(error)
        throw new GraphQLError('Failed to create order')
      }

      return {
        designRequest: null,
        order: null,
      }
    },
  },
)
