import { GraphQLError } from 'graphql'
import { extendType, inputObjectType, list, nonNull, queryField } from 'nexus'
import catalogData from '../../../generated/catalog.json'

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
              t.nonNull.id('name')
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

export const ProductPriceMetadataExtendsProduct = extendType({
  type: 'Product',
  definition(t) {
    t.nonNull.string('name', {
      resolve: parent => {
        let manipulatedValue = (parent as any).name

        if (typeof manipulatedValue === 'string') {
          // BigCommerce product names are stored with SKU at end to make them unique
          const skuRegex = /\s*\[[a-zA-Z0-9]+\]$/
          manipulatedValue = manipulatedValue.replace(skuRegex, '')

          const brandInName = catalogData.brands
            .map(brand => brand.name)
            .find(brand => manipulatedValue.includes(brand))

          if (brandInName) {
            manipulatedValue = manipulatedValue.replace(brandInName, '')
          }
        }
        return manipulatedValue.trim()
      },
    })

    t.nonNull.field('priceMetadata', {
      type: 'ProductPriceMetadata',
      resolve: async (parent, _, ctx) => {
        console.log('PRICES', parent as any)

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
