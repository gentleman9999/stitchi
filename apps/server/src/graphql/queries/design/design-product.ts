import { GraphQLError } from 'graphql'
import {
  arg,
  extendType,
  idArg,
  inputObjectType,
  nonNull,
  queryField,
} from 'nexus'
import { designFactoryDesignToGraphql } from '../../serializers/design'
import { Prisma } from '@prisma/client'
import { cursorPaginationFromList } from '../../utils'
import { onlyOwn } from '../../authorization'

export const designProduct = queryField('designProduct', {
  type: 'DesignProduct',
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_root, { id }, ctx) => {
    let design

    try {
      design = await ctx.design.getDesign({ designId: id })
    } catch (error) {
      ctx.logger.error(error)
      throw new GraphQLError('Failed to get design')
    }

    return designFactoryDesignToGraphql(design)
  },
})

export const DesignProductExtendsDesignProduct = extendType({
  type: 'DesignProduct',
  definition(t) {
    t.nonNull.list.nonNull.field('sizes', {
      type: 'DesignProductSize',
      resolve: async (parent, _, ctx) => {
        let catalogProductVariants

        try {
          catalogProductVariants = await ctx.catalog.listCatalogProductVariants(
            {
              productEntityId: parent.catalogProductId,
            },
          )
        } catch (error) {
          ctx.logger
            .child({
              context: { error, designProduct: parent },
            })
            .error('Error getting catalog product variants')

          return []
        }

        let sizeSet = new Set<string>()

        for (const variant of catalogProductVariants) {
          const sizeOption = variant.option_values?.find(
            option => option.option_display_name === 'Size',
          )

          if (sizeOption?.label) {
            sizeSet.add(sizeOption.label)
          }
        }

        return Array.from(sizeSet).map(size => ({
          id: size,
          name: size,
        }))
      },
    })
  },
})

export const DesignProductExtendsDesignRequest = extendType({
  type: 'DesignRequest',
  definition(t) {
    t.nonNull.list.nonNull.field('designProducts', {
      type: 'DesignProduct',
      resolve: async (parent, _, ctx) => {
        let designProducts

        try {
          designProducts = await ctx.design.listDesigns({
            where: {
              designRequestId: parent.id,
            },
          })
        } catch (error) {
          ctx.logger
            .child({
              context: { error, designRequest: parent },
            })
            .error('Error getting design products')

          throw new GraphQLError('Error getting design products')
        }

        return designProducts.map(designFactoryDesignToGraphql)
      },
    })
  },
})

export const MembershipDesignProductsWhereFilterInput = inputObjectType({
  name: 'MembershipDesignProductsWhereFilterInput',
  definition(t) {
    t.field('createdAt', {
      type: 'DateFilterInput',
    })

    t.field('membershipId', {
      type: 'StringFilterInput',
    })
  },
})

export const MembershipDesignProductsFilterInput = inputObjectType({
  name: 'MembershipDesignProductsFilterInput',
  definition(t) {
    t.field('where', {
      type: 'MembershipDesignProductsWhereFilterInput',
    })
  },
})

export const DesignProductExtendsMembership = extendType({
  type: 'Membership',
  definition(t) {
    t.nonNull.boolean('hasDesignProducts', {
      resolve: async (parent, _, ctx) => {
        const scope = ctx.authorize('READ', 'DesignProduct')

        if (!scope) {
          return false
        }

        const resourceOwnerFilter: Prisma.Enumerable<Prisma.DesignWhereInput> =
          []

        if (onlyOwn(scope)) {
          resourceOwnerFilter.push({
            membershipId: parent.id,
          })
        }

        if (!parent.role || !['STITCHI_ADMIN'].includes(parent.role)) {
          resourceOwnerFilter.push({
            organizationId: parent.organizationId,
          })
        }

        const designProducts = await ctx.design.listDesigns({
          where: {
            AND: resourceOwnerFilter,
          },
          take: 1,
        })

        return designProducts.length > 0
      },
    })
    t.nonNull.connectionField('designProducts', {
      type: 'DesignProduct',
      additionalArgs: {
        filter: arg({ type: 'MembershipDesignProductsFilterInput' }),
      },
      resolve: async (parent, { first, last, after, before, filter }, ctx) => {
        const scope = ctx.authorize('READ', 'DesignProduct')

        if (!scope) {
          return {
            edges: [],
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: null,
              endCursor: null,
            },
            totalCount: 0,
          }
        }

        const resourceOwnerFilter: Prisma.Enumerable<Prisma.DesignWhereInput> =
          []

        const { membershipId } = filter?.where || {}

        if (onlyOwn(scope)) {
          resourceOwnerFilter.push({
            membershipId: parent.id,
          })
        } else if (Object.keys(membershipId || {}).length) {
          resourceOwnerFilter.push({
            membershipId: {
              equals: membershipId?.equals || undefined,
              in: membershipId?.in || undefined,
              notIn: membershipId?.notIn || undefined,
            },
          })
        }

        if (!parent.role || !['STITCHI_ADMIN'].includes(parent.role)) {
          resourceOwnerFilter.push({
            organizationId: parent.organizationId,
          })
        }

        const where: Prisma.DesignWhereInput = {
          AND: [
            {
              AND: resourceOwnerFilter,
            },
            {
              createdAt: filter?.where?.createdAt
                ? {
                    gte: filter.where.createdAt.gte || undefined,
                    lte: filter.where.createdAt.lte || undefined,
                  }
                : undefined,
            },
          ],
        }

        const totalDesignProductsCount = await ctx.design.listDesignsCount({
          where,
        })

        const result = await cursorPaginationFromList(
          async ({ cursor, skip, take }) => {
            let designProducts

            try {
              designProducts = await ctx.design.listDesigns({
                take,
                skip,
                cursor,
                where,
                orderBy: {
                  createdAt: 'desc',
                },
              })
            } catch (error) {
              ctx.logger
                .child({
                  context: { error, membership: parent },
                })
                .error('Error getting design products')
              throw new GraphQLError('Error getting design products')
            }

            return designProducts.map(designFactoryDesignToGraphql)
          },
          async () => totalDesignProductsCount,
          { first, last, after, before },
        )

        return result
      },
    })
  },
})

export const DesignProductExtendsOrderItem = extendType({
  type: 'OrderItem',
  definition(t) {
    t.field('designProduct', {
      type: 'DesignProduct',
      resolve: async (parent, _, ctx) => {
        if (!parent.designId) {
          return null
        }

        let design

        try {
          design = await ctx.design.getDesign({ designId: parent.designId })
        } catch (error) {
          ctx.logger
            .child({
              context: { error, orderItem: parent },
            })
            .error('Error getting design product')

          throw new GraphQLError('Error getting design product')
        }

        return designFactoryDesignToGraphql(design)
      },
    })
  },
})
