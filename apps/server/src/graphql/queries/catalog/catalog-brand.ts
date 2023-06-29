import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { catalogBrandFactoryToGraphQl } from '../../serializers/catalog'

export const CatalogBrandExtendsCatalogProduct = extendType({
  type: 'CatalogProduct',
  definition(t) {
    t.nullable.field('brand', {
      type: 'CatalogBrand',
      resolve: async (catalogProduct, _, ctx) => {
        if (!catalogProduct.brandId) return null

        let catalogBrand

        try {
          catalogBrand = await ctx.catalog.getBrand({
            brandEntityId: catalogProduct.brandId,
          })

          if (!catalogBrand) {
            throw new Error('Catalog brand not found')
          }
        } catch (error) {
          console.error(
            `Failed to get catalog brand: ${catalogProduct.brandId}`,
            {
              context: {
                error,
                brandEntityId: catalogProduct.brandId,
              },
            },
          )

          throw new GraphQLError('Failed to get catalog brand')
        }

        return catalogBrandFactoryToGraphQl({ catalogBrand })
      },
    })
  },
})
