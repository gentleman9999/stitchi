import { extendType, objectType } from 'nexus'

export const Category = objectType({
  name: 'Category',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('name')
    t.nonNull.string('slug')
    t.nonNull.string('catalogId')

    t.string('parentCategoryId')

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })

    t.list.nonNull.field('breadcrumbs', {
      type: 'Category',
      resolve: async (cat, _, ctx) => {
        const breadcrumbs: typeof cat[] = []
        const makeBreadcrumbs = async (category: typeof cat): Promise<void> => {
          if (category.parentCategoryId) {
            const parent = await ctx.prisma.category.findFirst({
              where: {
                id: category.parentCategoryId,
              },
            })

            if (parent) {
              await makeBreadcrumbs(parent)
            }
          }

          breadcrumbs.push(category)
        }

        await makeBreadcrumbs(cat)

        return breadcrumbs
      },
    })
  },
})

export const CategoryExtendsMaterial = extendType({
  type: 'Material',
  definition(t) {
    t.list.nonNull.field('categories', {
      type: 'Category',
      resolve: async (cp, _, ctx) => {
        const materialCategories = await ctx.prisma.materialCategory.findMany({
          where: { materialId: cp.id },
          select: {
            categoryId: true,
          },
        })

        return ctx.prisma.category.findMany({
          where: { id: { in: materialCategories.map(c => c.categoryId) } },
        })
      },
    })
  },
})
