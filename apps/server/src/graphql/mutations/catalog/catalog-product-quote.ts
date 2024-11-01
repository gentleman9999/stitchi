import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { v4 } from 'uuid'

export const CatalogProductQuoteCreateItemsInput = inputObjectType({
  name: 'CatalogProductQuoteCreateItemsInput',
  definition(t) {
    t.nonNull.id('catalogProductVariantId')
    t.nonNull.int('quantity')
  },
})

export const CatalogProductQuoteCreatePrintLocationInput = inputObjectType({
  name: 'CatalogProductQuoteCreatePrintLocationInput',
  definition(t) {
    t.nonNull.int('colorCount')
  },
})

export const CatalogProductQuoteCreateAddonInput = inputObjectType({
  name: 'CatalogProductQuoteCreateAddonInput',
  definition(t) {
    t.nullable.field('printLocation', {
      type: 'CatalogProductQuoteCreatePrintLocationInput',
    })
  },
})

export const CatalogProductQuoteCreateInput = inputObjectType({
  name: 'CatalogProductQuoteCreateInput',
  definition(t) {
    t.nonNull.id('catalogProductId')
    t.nonNull.list.nonNull.field('items', {
      type: 'CatalogProductQuoteCreateItemsInput',
    })
    t.nonNull.list.nonNull.field('addons', {
      type: 'CatalogProductQuoteCreateAddonInput',
    })
  },
})

export const CatalogProductQuoteCreatePayload = objectType({
  name: 'CatalogProductQuoteCreatePayload',
  definition(t) {
    t.nullable.field('quote', { type: 'Quote' })
  },
})

export const catalogProductQuoteCreate = mutationField(
  'catalogProductQuoteCreate',
  {
    type: 'CatalogProductQuoteCreatePayload',
    args: {
      input: nonNull('CatalogProductQuoteCreateInput'),
    },
    resolve: async (_, { input }, ctx) => {
      const { catalogProductId, items, addons } = input

      let quote

      try {
        quote = await ctx.quote.generateQuoteV2({
          includeFulfillment: false,
          printLocations:
            addons
              .filter(addon => addon.printLocation)
              .map(addon => ({
                colorCount: addon.printLocation?.colorCount || 0,
              })) || [],
          variants: items.map(item => ({
            catalogProductId: catalogProductId,
            catalogProductVariantId: item.catalogProductVariantId,
            quantity: item.quantity,
          })),
        })
      } catch (error) {
        ctx.logger
          .child({ context: { error, input } })
          .error('Error generating catalog product quote')

        throw new GraphQLError('Error generating catalog product quote')
      }

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
