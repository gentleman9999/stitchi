import { extendType, objectType } from 'nexus'

export const Image = objectType({
  name: 'Image',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('url')
    t.nonNull.int('width')
    t.nonNull.int('height')
  },
})

export const ImageExtendsMaterial = extendType({
  type: 'Material',
  definition(t) {
    t.field('image', {
      type: 'Image',
      resolve: async (cp, _, ctx) => {
        if (!cp.imageId) {
          return null
        }

        return ctx.prisma.image.findFirst({
          where: {
            id: cp.imageId,
          },
        })
      },
    })
  },
})

export const ImageExtendsMaterialVariant = extendType({
  type: 'MaterialVariant',
  definition(t) {
    t.field('images', {
      type: 'Image',
      resolve: async (mv, _, ctx) => {
        const imageConnections = await ctx.prisma.materialVariantImage.findMany(
          { where: { materialVariantId: mv.id } },
        )

        return ctx.prisma.image.findMany({
          where: { id: { in: imageConnections.map(ic => ic.imageId) } },
        })
      },
    })
  },
})
