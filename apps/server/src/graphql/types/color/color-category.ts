import { extendType, objectType } from 'nexus'

export const ColorCategory = objectType({
  name: 'ColorCategory',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.string('hex')

    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const ColorCategoryExtendsColor = extendType({
  type: 'Color',
  definition(t) {
    t.field('category', {
      type: ColorCategory,
      resolve: async (cp, _, ctx) => {
        return ctx.prisma.colorCategory.findFirst({
          where: {
            id: cp.colorCategoryId,
          },
        })
      },
    })
  },
})
