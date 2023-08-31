import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { catalogProductFactoryToGraphQl } from '../../serializers/catalog'

export const CatalogProductExtendsDesignRequestProduct = extendType({
  type: 'DesignRequestProduct',
  definition(t) {
    t.field('catalogProduct', {
      type: 'CatalogProduct',
      resolve: async (designRequestProduct, _, ctx) => {
        let catalogProduct

        try {
          catalogProduct = await ctx.catalog.getCatalogProduct({
            productEntityId: designRequestProduct.catalogProductId,
          })

          if (!catalogProduct) {
            throw new Error('Catalog product not found')
          }
        } catch (error) {
          ctx.logger.error(
            `Failed to get catalog product: ${designRequestProduct.catalogProductId}`,
            {
              context: {
                error,
                productEntityId: designRequestProduct.catalogProductId,
              },
            },
          )
          throw new GraphQLError('Failed to get catalog product')
        }

        return catalogProductFactoryToGraphQl({
          catalogProduct: catalogProduct,
        })
      },
    })
  },
})
