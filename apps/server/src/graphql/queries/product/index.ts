import { GraphQLError } from 'graphql'
import { extendType, inputObjectType, list, nonNull, queryField } from 'nexus'

export const products = queryField('_products', {
  type: list('Product'),
  args: {
    products: nonNull(
      list(
        nonNull(
          inputObjectType({
            name: 'ProductKey',
            definition: t => {
              t.nonNull.id('id')
              t.nonNull.field('prices', {
                type: nonNull(
                  inputObjectType({
                    name: 'ProductPrice',
                    definition: t => {
                      t.nonNull.field('price', {
                        type: nonNull(
                          inputObjectType({
                            name: 'ProductPriceValue',
                            definition: t => {
                              t.nonNull.float('value')
                            },
                          }),
                        ),
                      })
                    },
                  }),
                ),
              })
            },
          }),
        ),
      ),
    ),
  },
  resolve: async (_, { products }) => {
    return products
  },
})

export const ProductExtendsProduct = extendType({
  type: 'Product',
  definition(t) {
    t.nonNull.int('priceCents', {
      resolve: async (parent, _, ctx) => {
        try {
          const { productUnitCostCents } = await ctx.quote.generateEstimate({
            productPriceCents: (parent as any).prices.price.value * 100,
            includeFulfillment: false,
            quantity: 10_000,
            printLocations: [{ colorCount: 1 }],
          })

          return productUnitCostCents
        } catch (error) {
          ctx.logger
            .child({
              context: {
                error,
              },
            })
            .error("Error calculating product's price")

          throw new GraphQLError(
            `Unable to calculate product's price: ${parent.id}`,
          )
        }
      },
    })
  },
})

export const ProductPriceMetadataExtendsProduct = extendType({
  type: 'Product',
  definition(t) {
    t.nonNull.field('priceMetadata', {
      type: 'ProductPriceMetadata',
      resolve: async (parent, _, ctx) => {
        const productPriceCents = (parent as any).prices.price.value * 100
        const includeFulfillment = false

        try {
          const { productUnitCostCents: minPriceCents } =
            await ctx.quote.generateEstimate({
              productPriceCents,
              includeFulfillment,
              quantity: 20_000,
              printLocations: [{ colorCount: 1 }],
            })

          const { productUnitCostCents: maxPriceCents } =
            await ctx.quote.generateEstimate({
              productPriceCents,
              includeFulfillment,
              quantity: 24,
              printLocations: [{ colorCount: 3 }],
            })

          return {
            minPriceCents,
            maxPriceCents,
          }
        } catch (error) {
          ctx.logger
            .child({
              context: {
                error,
              },
            })
            .error("Error calculating product's price")

          throw new GraphQLError(`Unable to calculate product price`)
        }
      },
    })
  },
})
