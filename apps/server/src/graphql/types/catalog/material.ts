import {
  idArg,
  nonNull,
  objectType,
  extendType,
  arg,
  list,
  inputObjectType,
} from 'nexus'
import { connectionFromArray } from 'graphql-relay'
import { makeMaterial } from '../../serializers/catalog'
import { notEmpty } from '../../../utils'

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
        const material = await ctx.prisma.material.findFirst({
          where: {
            id: cp.materialId,
          },
        })

        return material ? makeMaterial(material) : null
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
    t.field('eq', {
      type: 'String',
    })
  },
})

export const MaterialFilterArgInput = inputObjectType({
  name: 'MaterialFilterArg',
  definition(t) {
    t.field('categoryId', {
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
          type: MaterialFilterArgInput,
        }),
      },
      async resolve(catalog, args, ctx) {
        const { categoryId } = args.filter || {}

        const categories =
          categoryId && Object.keys(categoryId).length
            ? await ctx.prisma.category.findMany({
                where: {
                  id: {
                    in: categoryId.in?.filter(notEmpty) || undefined,
                    equals: categoryId.eq || undefined,
                  },
                },
                include: {
                  childCategories: {
                    include: {
                      childCategories: true,
                    },
                  },
                },
              })
            : null

        const categoryIds = categories?.length
          ? categories.flatMap(c => [
              c.id,
              ...c.childCategories.flatMap(cc => [
                cc.id,
                ...cc.childCategories.flatMap(ccc => ccc.id),
              ]),
            ])
          : undefined

        const products = (
          await ctx.prisma.material.findMany({
            where: {
              catalogId: catalog.id,
              materialCategories: {
                some: {
                  category: {
                    id: {
                      in: categoryIds,
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
      type: Material,
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
