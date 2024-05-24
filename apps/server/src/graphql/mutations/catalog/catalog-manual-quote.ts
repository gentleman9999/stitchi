import { EmbellishmentType } from '@stitchi/quote'
import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { v4 } from 'uuid'

export const CatalogManualQuoteCreateItemsInput = inputObjectType({
  name: 'CatalogManualQuoteCreateItemsInput',
  definition(t) {
    t.nonNull.int('quantity')
    t.nonNull.int('priceCents')
  },
})

export const CatalogManualQuoteCreateAddonsPrintLocationInput = inputObjectType(
  {
    name: 'CatalogManualQuoteCreateAddonsPrintLocationInput',
    definition(t) {
      t.nonNull.int('colorCount')
    },
  },
)

export const CatalogManualQuoteCreateAddonsInput = inputObjectType({
  name: 'CatalogManualQuoteCreateAddonsInput',
  definition(t) {
    t.nullable.field('printLocation', {
      type: 'CatalogManualQuoteCreateAddonsPrintLocationInput',
    })
  },
})

export const CatalogManualQuoteCreateInput = inputObjectType({
  name: 'CatalogManualQuoteCreateInput',
  definition(t) {
    t.nonNull.list.nonNull.field('items', {
      type: 'CatalogManualQuoteCreateItemsInput',
    })
    t.nonNull.list.nonNull.field('addons', {
      type: 'CatalogManualQuoteCreateAddonsInput',
    })
  },
})

export const CatalogManualQuoteCreatePayload = objectType({
  name: 'CatalogManualQuoteCreatePayload',
  definition(t) {
    t.nullable.field('quote', { type: 'Quote' })
  },
})

export const catalogManualQuoteCreate = mutationField(
  'catalogManualQuoteCreate',
  {
    type: 'CatalogManualQuoteCreatePayload',
    args: {
      input: nonNull('CatalogManualQuoteCreateInput'),
    },
    resolve: async (_, { input }, ctx) => {
      const scope = ctx.authorize('CREATE', 'ManualQuote')

      if (!scope || !ctx.membershipId) {
        throw new GraphQLError('Unauthorized')
      }

      const { items, addons } = input

      let quote

      try {
        quote = await ctx.quote.generateQuoteManual({
          includeFulfillment: false,
          printLocations: addons.map(addon => ({
            colorCount: addon.printLocation?.colorCount || 0,
            embellishmentType: EmbellishmentType.SCREENPRINTING,
          })),
          variants: items.map(item => ({
            quantity: item.quantity,
            priceCents: item.priceCents,
          })),
        })
      } catch (error) {
        ctx.logger
          .child({ context: { error, input } })
          .error('Error generating catalog manual quote')

        throw new GraphQLError('Unable to create manual quote')
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
