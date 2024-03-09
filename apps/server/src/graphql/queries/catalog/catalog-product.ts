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

          return null
        }

        return catalogProductFactoryToGraphQl({
          catalogProduct: catalogProduct,
        })
      },
    })
  },
})
