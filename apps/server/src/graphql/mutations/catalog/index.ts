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
import { KeyValueRecordKey } from '../../../services/key-value-store'
import { OrderItemRecordType } from '../../../services/order/db/order-item-table'
import { OrderRecordType } from '../../../services/order/db/order-table'
import { notEmpty } from '../../../utils'
import { designRequestFactoryToGrahpql } from '../../serializers/design'
import { orderFactoryOrderToGraphQL } from '../../serializers/order'

export * from './catalog-product-quote'
export * from './catalog-manual-quote'

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

export const CatalogProductCustomizeAddonInput = inputObjectType({
  name: 'CatalogProductCustomizeAddonInput',
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
      type: 'CatalogProductCustomizeAddonInput',
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
      const quantity = input.items.reduce((acc, item) => acc + item.quantity, 0)

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

            // If the user is anonymous, we don't yet want to submit this design request
            // Notifications are sent out when a design request is submitted, and we want a user for this
            status: ctx.organizationId ? 'SUBMITTED' : 'DRAFT',
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

      let order

      if (quantity > 0) {
        let printLocations = input.addons
          .map(addon => {
            if (addon.type !== 'PRINT_LOCATION') {
              return null
            }

            return {
              // We quote at 1 color until we have a final design, where we then update the order
              colorCount: 1,
            }
          })
          .filter(notEmpty)

        if (printLocations.length === 0) {
          // If no print locations are specified, we quote at 1 location, 1 color
          printLocations = [
            {
              colorCount: 1,
            },
          ]
        }

        // TODO: Add support for Direct to Garment
        const quote = await ctx.quote.generateQuoteV2({
          // quantity,
          printLocations,
          includeFulfillment: false,
          // productPriceCents: product.priceCents,
          variants: pickedProductVariants
            .filter(v => v.quantity > 0)
            .map(variant => ({
              catalogProductId: input.catalogProductId,
              catalogProductVariantId: variant.id.toString(),
              quantity: variant.quantity,
            })),
        })

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
                  const itemQuote = quote.variants.find(
                    v => v.catalogProductVariantId === item.id.toString(),
                  )

                  if (!itemQuote) {
                    return null
                  }

                  const {
                    quantity,
                    unitRetailPriceCents,
                    totalRetailPriceCents,
                    catalogProductId,
                    catalogProductVariantId,
                  } = itemQuote

                  return {
                    // We haven't create a design product yet
                    designId: null,
                    quantity: quantity,
                    // This can represent many things (denoted by TYPE). Therefore we store all ID's as strings in the order line item.
                    productId: catalogProductId,
                    productVariantId: catalogProductVariantId,
                    unitPriceCents: unitRetailPriceCents,
                    totalPriceCents: totalRetailPriceCents,
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
      }

      if (!ctx.membershipId) {
        // If the user is not logged in, we need to store the design request and order id's so that they can be assigned to an authenticated user later

        if (!ctx.deviceId) {
          ctx.logger
            .child({
              context: {
                designRequest,
                order,
              },
            })
            .error(
              'User tried to customize without a membership or device id. This should be fixed ASAP.',
            )

          throw new GraphQLError('No device id')
        }

        try {
          const existingDeviceStore = await ctx.keyValueStore.getValue(
            KeyValueRecordKey.UNAUTHENTICATED_USER_STORE,
            ctx.deviceId,
          )

          await ctx.keyValueStore.setValue(
            KeyValueRecordKey.UNAUTHENTICATED_USER_STORE,
            ctx.deviceId,
            {
              ...existingDeviceStore,
              designRequestIds: [
                ...(existingDeviceStore?.designRequestIds || []),
                designRequest.id,
              ],
              orderIds: [
                ...(existingDeviceStore?.orderIds || []),
                ...(order ? [order.id] : []),
              ],
            },
          )
        } catch (error) {
          ctx.logger
            .child({
              context: {
                error,
                designRequest,
                order,
              },
            })
            .error('Failed to update device store')
        }
      }

      return {
        designRequest: designRequestFactoryToGrahpql(designRequest),
        order: order ? orderFactoryOrderToGraphQL(order) : null,
      }
    },
  },
)
