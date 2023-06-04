import { GraphQLError } from 'graphql'
import { extendType, idArg, list, nonNull, queryField } from 'nexus'
import * as uuid from 'uuid'
import { orderFactoryOrderToGraphQL } from '../../serializers/order'

export * from './mailing-address'

import { NexusGenObjects } from '../../generated/nexus'

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
          console.error(error)
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
          let optionsMap = new Map()

          let product

          try {
            product = await context.catalog.getBigCommerceProduct({
              productEntityId: parseInt(productId),
            })
          } catch (error) {
            console.error(`Failed to get product: ${productId}`, {
              context: { error },
            })
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
