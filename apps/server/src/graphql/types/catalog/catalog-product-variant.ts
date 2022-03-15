import { objectType } from 'nexus'

export const CatalogProductVariant = objectType({
  name: 'CatalogProductVariant',
  definition(t) {
    t.nonNull.id('id')

    t.nonNull.boolean('isActive')
    t.nonNull.string('vendorPartNumber')
    t.nonNull.string('vendorId')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })

    t.field('vendor', {
      type: 'Vendor',
      resolve: async (cpv, _, ctx) => {
        return ctx.prisma.vendor.findFirst({
          where: {
            id: cpv.vendorId,
          },
        })
      },
    })
  },
})
