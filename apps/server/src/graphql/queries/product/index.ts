import { extendType, inputObjectType, list, nonNull, queryField } from 'nexus'
import { catalogProductFactoryProductImageToGraphQl } from '../../serializers/catalog'
import { CatalogFactoryProductImage } from '../../../services/catalog/factory'
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
              t.nonNull.id('entityId')
              t.nonNull.id('name')
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
    t.nonNull.string('humanizedName', {
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
