import { extendType, inputObjectType, list, nonNull, queryField } from 'nexus'
import { catalogProductFactoryProductImageToGraphQl } from '../../serializers/catalog'
import { CatalogFactoryProductImage } from '../../../services/catalog/factory'

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
              t.nonNull.id('entityId')
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

export const ExtendsProduct = extendType({
  type: 'Product',
  definition(t) {
    t.nonNull.list.nonNull.field('allImages', {
      type: 'CatalogProductImage',
      resolve: async (parent, _, ctx) => {
        let images: CatalogFactoryProductImage[] = []

        try {
          images = (
            await ctx.catalog.listProductImages({
              productEntityId: (parent as any).entityId,
            })
          ).images
        } catch (error) {
          ctx.logger.child({
            context: {
              error,
              productEntityId: (parent as any).entityId,
            },
          })
        }

        return images.map(productImage =>
          catalogProductFactoryProductImageToGraphQl({ productImage }),
        )
      },
    })
  },
})
