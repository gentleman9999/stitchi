import { objectType } from 'nexus'

export const Catalog = objectType({
  name: 'Catalog',
  definition: t => {
    t.nonNull.id('id')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })

    t.list.field('products', {
      type: 'CatalogProduct',
      resolve: async (catalog, _, ctx) => {
        return (
          await ctx.prisma.catalogProduct.findMany({
            where: {
              catalogId: catalog.id,
            },
          })
        ).map(cp => ({ ...cp, isActive: cp.active }))
      },
    })
  },
})
