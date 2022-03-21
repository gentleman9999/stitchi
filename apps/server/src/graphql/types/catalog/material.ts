import {
  idArg,
  nonNull,
  objectType,
  extendType,
  arg,
  list,
  stringArg,
  inputObjectType,
} from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { makeMaterial } from '../../serializers/catalog'

export const Material = objectType({
  name: 'Material',
  definition(t) {
    t.nonNull.id('id')

    t.nonNull.string('name')
    t.nonNull.boolean('isActive')
    t.nonNull.string('style')

    t.nonNull.string('catalogId')
    t.nonNull.string('manufacturerId')
    t.string('primaryVendorId')

    t.string('imageId')

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
  },
})

export const MaterialExtendsMaterialVariant = extendType({
  type: 'MaterialVariant',
  definition(t) {
    t.field('material', {
      type: 'Material',
      resolve: async (cp, _, ctx) => {
        return ctx.prisma.material.findFirst({
          where: {
            id: cp.materialId,
          },
        })
      },
    })
  },
})

export const FilterArgInput = inputObjectType({
  name: 'Filter',
  definition(t) {
    t.field('in', {
      type: list('String'),
    })
  },
})

export const CategoryFilterArgInput = inputObjectType({
  name: 'CategoryFilterArg',
  definition(t) {
    t.field('categoryId', {
      type: FilterArgInput,
    })
    t.field('colorCategoryId', {
      type: FilterArgInput,
    })
  },
})

export const MaterialExtendsCatalog = extendType({
  type: 'Catalog',
  definition(t) {
    t.connectionField('products', {
      type: 'Material',

      additionalArgs: {
        filter: arg({
          default: {},
          type: CategoryFilterArgInput,
        }),
      },
      resolve: async (catalog, args, ctx) => {
        const products = (
          await ctx.prisma.material.findMany({
            where: {
              catalogId: catalog.id,
              materialCategories: {
                some: {
                  categoryId: {
                    in: args.filter?.categoryId?.in,
                  },
                },
              },
              materialVariants: {
                some: {
                  color: {
                    colorCategoryId: {
                      in: args.filter?.colorCategoryId?.in,
                    },
                  },
                },
              },
            },
          })
        ).map(makeMaterial)

        return connectionFromArray(products, args)
      },
    })

    t.field('product', {
      type: 'Material',
      args: {
        id: nonNull(idArg()),
      },
      resolve: async (_, { id }, ctx) => {
        const product = await ctx.prisma.material.findFirst({
          where: {
            id,
          },
        })

        return product ? makeMaterial(product) : null
      },
    })
  },
})
