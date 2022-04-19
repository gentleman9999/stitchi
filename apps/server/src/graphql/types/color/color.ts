import { extendType, objectType } from 'nexus'

export const Color = objectType({
  name: 'Color',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('catalogId')

    t.string('hex')
    t.string('name')
    t.string('colorCategoryId')

    t.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })
  },
})

export const ColorExtendsMatieralVariant = extendType({
  type: 'MaterialVariant',
  definition(t) {
    t.field('color', {
      type: Color,
      resolve: async (cpv, _, ctx) => {
        if (!cpv.colorId) {
          return null
        }

        return ctx.prisma.color.findFirst({
          where: {
            id: cpv.colorId,
          },
        })
      },
    })
  },
})

export const ColorExtendsMaterial = extendType({
  type: 'Material',
  definition(t) {
    t.list.nonNull.field('colors', {
      type: Color,
      resolve: async (cp, _, ctx) => {
        const colors = await ctx.prisma.color.findMany({
          where: {
            materialVariants: {
              some: {
                materialId: cp.id,
              },
            },
          },
        })
        const filteredColors = colors.reduce<typeof colors[number][]>(
          (prev, color) => {
            if (!prev.find(c => c.hex === color.hex)) {
              prev.push(color)
            }
            return prev
          },
          [],
        )
        return filteredColors
      },
    })
  },
})
