import { extendType, objectType } from 'nexus'

export const Size = objectType({
  name: 'Size',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('value')
    t.nonNull.string('catalogId')

    t.string('name')

    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const SizeExtendsMaterial = extendType({
  type: 'Material',
  definition(t) {
    t.list.nonNull.field('sizes', {
      type: 'Size',
      resolve: async (cp, _, ctx) => {
        return ctx.prisma.size.findMany({
          where: {
            materialVariants: {
              some: {
                materialId: cp.id,
              },
            },
          },
        })
      },
    })
  },
})
