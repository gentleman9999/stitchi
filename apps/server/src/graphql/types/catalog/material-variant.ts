import { extendType, objectType } from 'nexus'
import { makeMaterialVariant } from '../../serializers/catalog'

export const MaterialVariant = objectType({
  name: 'MaterialVariant',
  definition(t) {
    t.nonNull.id('id')

    t.nonNull.boolean('isActive')
    t.nonNull.string('vendorPartNumber')
    t.nonNull.string('gtin')
    t.nonNull.string('vendorId')
    t.nonNull.string('materialId')

    t.string('colorId')
    t.string('sizeId')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const MaterialVariantExtendsMaterial = extendType({
  type: 'Material',
  definition(t) {
    t.list.nonNull.field('variants', {
      type: 'MaterialVariant',
      resolve: async (cp, _, ctx) => {
        return (
          await ctx.prisma.materialVariant.findMany({
            where: {
              materialId: cp.id,
            },
          })
        ).map(makeMaterialVariant)
      },
    })
  },
})
