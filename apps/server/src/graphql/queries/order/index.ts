import { GraphQLError } from 'graphql'
import {
  arg,
  extendType,
  idArg,
  inputObjectType,
  list,
  nonNull,
  queryField,
} from 'nexus'
import * as uuid from 'uuid'
import { orderFactoryOrderToGraphQL } from '../../serializers/order'
export * from './mailing-address'
import { NexusGenObjects } from '../../generated/nexus'
import { cursorPaginationFromList } from '../../utils'
import { Prisma } from '@prisma/client'
import { onlyOwn } from '../../authorization'

export const order = queryField('order', {
  type: 'Order',
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, { id }, { order }) => {
    return orderFactoryOrderToGraphQL(await order.getOrder({ orderId: id }))
  },
})

export const ProductExtendsQuote = extendType({
  type: 'Product',
  definition(t) {
    t.nonNull.field('quote', {
      type: 'Quote',
      args: {
        quantity: nonNull('Int'),
        printLocations: nonNull(
          list(nonNull('QuoteGeneratePrintLocationInput')),
        ),
        includeFulfillment: 'Boolean',
      },
      resolve: async (
        parent,
        { includeFulfillment, printLocations, quantity },
        context,
      ) => {
        try {
          const data = await context.quote.generateQuote({
            includeFulfillment: Boolean(includeFulfillment),
            printLocations,
            quantity,
            productPriceCents: (parent as any).prices.price.value * 100,
          })

          return {
            id: uuid.v4(),
            ...data,
          }
        } catch (error) {
          context.logger.error(error)
          throw new GraphQLError(
            `Unable to get quote for product: ${parent.id}`,
          )
        }
      },
    })
  },
})

export const OrderItemSummaries = extendType({
  type: 'Order',
  definition(t) {
    t.nonNull.list.nonNull.field('itemSummaries', {
      type: 'OrderItemSummary',
      resolve: async (parent, _, context) => {
        const itemGroupMap = new Map<string, NexusGenObjects['OrderItem'][]>()
        const unGroupedItems: NexusGenObjects['OrderItem'][] = []

        parent.items.forEach(item => {
          if (item.productId) {
            // Group by product id
            const existingItems = itemGroupMap.get(item.productId)

            if (existingItems) {
              itemGroupMap.set(item.productId, [...existingItems, item])
            } else {
              itemGroupMap.set(item.productId, [item])
            }
          } else {
            unGroupedItems.push(item)
          }
        })

        const itemSummaries: NexusGenObjects['OrderItemSummary'][] = []

        for (const productId of itemGroupMap.keys()) {
          const group = itemGroupMap.get(productId)

          if (!group) {
            continue
          }

          let quantity = 0
          let totalPriceCents = 0

          let product

          try {
            product = await context.catalog.getCatalogProduct({
              productEntityId: productId,
            })
          } catch (error) {
            context.logger
              .child({
                context: { error },
              })
              .error(`Failed to get product: ${productId}`)
            throw new GraphQLError(`Unable to get product: ${productId}`)
          }

          for (const item of group) {
            quantity = quantity + item.quantity
            totalPriceCents = totalPriceCents + item.totalPriceCents
          }

          itemSummaries.push({
            quantity,
            totalPriceCents,
            id: product.id.toString(),
            title: product.name,
          })
        }

        for (const item of unGroupedItems) {
          itemSummaries.push(item)
        }

        return itemSummaries
      },
    })
  },
})

export const MembershipOrdersWhereFilterInput = inputObjectType({
  name: 'MembershipOrdersWhereFilterInput',
  definition(t) {
    t.field('createdAt', {
      type: 'DateFilterInput',
    })
  },
})

export const MembershipOrdersFilterInput = inputObjectType({
  name: 'MembershipOrdersFilterInput',
  definition(t) {
    t.field('where', {
      type: 'MembershipOrdersWhereFilterInput',
    })
  },
})

export const OrdersExtendsMember = extendType({
  type: 'Membership',
  definition(t) {
    t.nonNull.field('hasOrders', {
      type: 'Boolean',
      resolve: async (parent, _, { order, authorize }) => {
        const scope = authorize('READ', 'Order')

        if (!scope) {
          return false
        }

        const resourceOwnerFilter: Prisma.Enumerable<Prisma.OrderWhereInput> =
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

        const orders = await order.listOrders({
          where: {
            AND: resourceOwnerFilter,
          },
          take: 1,
        })

        return orders.length > 0
      },
    })
    t.connectionField('orders', {
      type: 'Order',
      additionalArgs: {
        filter: arg({ type: 'MembershipOrdersFilterInput' }),
      },
      resolve: async (
        parent,
        { first, last, after, before, filter },
        { order, authorize },
      ) => {
        const scope = authorize('READ', 'Order')

        if (!scope) {
          return {
            edges: [],
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: null,
              endCursor: null,
            },
          }
        }

        const resourceOwnerFilter: Prisma.Enumerable<Prisma.OrderWhereInput> =
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

        const { createdAt } = filter?.where || {}

        const where: Prisma.OrderWhereInput = {
          AND: [
            {
              createdAt: createdAt
                ? {
                    gte: createdAt.gte || undefined,
                    lte: createdAt.lte || undefined,
                  }
                : undefined,
            },
            {
              AND: resourceOwnerFilter,
            },
          ],
        }

        const result = await cursorPaginationFromList(
          async ({ cursor, skip, take }) => {
            const orders = await order.listOrders({
              where,
              cursor,
              skip,
              take,
              // skip the cursor
            })

            return orders.map(orderFactoryOrderToGraphQL)
          },
          async () => {
            return order.listOrdersCount({
              where,
            })
          },
          { first, last, after, before },
        )

        return result
      },
    })
  },
})

export const OrderExtendsDesignRequest = extendType({
  type: 'DesignRequest',
  definition(t) {
    t.nonNull.list.nonNull.field('orders', {
      type: 'Order',
      resolve: async (parent, _, { order }) => {
        const orders = await order.listOrders({
          where: {
            designRequestId: parent.id,
          },
        })

        return orders.map(orderFactoryOrderToGraphQL)
      },
    })
  },
})
