import { extendType, objectType } from 'nexus'

export const Catalog = objectType({
  name: 'Catalog',
  definition: t => {
    t.nonNull.id('id')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const CatalogExtendsColor = extendType({
  type: 'Color',
  definition: t => {
    t.nonNull.field('catalog', {
      type: 'Catalog',
      resolve: async (color, _, ctx) => {
        const catalog = await ctx.prisma.catalog.findFirst({
          where: {
            id: color.catalogId,
          },
        })

        if (!catalog) {
          throw new Error('Catalog not found')
        }

        return catalog
      },
    })
  },
})
