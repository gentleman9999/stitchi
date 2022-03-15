import { idArg, nonNull, objectType } from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { makeCatalogProduct } from '../../serializers/catalog'

export const Catalog = objectType({
  name: 'Catalog',
  definition: t => {
    t.nonNull.id('id')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })

    t.connectionField('products', {
      type: 'CatalogProduct',
      resolve: async (catalog, args, ctx) => {
        const products = (
          await ctx.prisma.catalogProduct.findMany({
            where: {
              catalogId: catalog.id,
            },
          })
        ).map(makeCatalogProduct)

        return connectionFromArray(products, args)
      },
    })

    t.field('product', {
      type: 'CatalogProduct',
      args: {
        id: nonNull(idArg()),
      },
      resolve: async (_, { id }, ctx) => {
        const product = await ctx.prisma.catalogProduct.findFirst({
          where: {
            id,
          },
        })

        return product ? makeCatalogProduct(product) : null
      },
    })
  },
})
