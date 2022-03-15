import { objectType } from 'nexus'

export const CatalogProduct = objectType({
  name: 'CatalogProduct',
  definition(t) {
    t.nonNull.id('id')

    t.nonNull.string('name')
    t.nonNull.boolean('isActive')

    t.nonNull.string('catalogId')
    t.nonNull.string('manufacturerId')
    t.string('vendorId')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })

    t.field('catalog', {
      type: 'Catalog',
      resolve: async (cp, _, ctx) => {
        return ctx.prisma.catalog.findFirst({
          where: {
            id: cp.catalogId,
          },
        })
      },
    })

    t.field('manufacturer', {
      type: 'Manufacturer',
      resolve: async (cp, _, ctx) => {
        return ctx.prisma.manufacturer.findFirst({
          where: {
            id: cp.manufacturerId,
          },
        })
      },
    })

    t.field('vendor', {
      type: 'Vendor',
      resolve: async (cp, _, ctx) => {
        if (!cp.vendorId) return null
        return ctx.prisma.vendor.findFirst({
          where: {
            id: cp.vendorId,
          },
        })
      },
    })
  },
})
