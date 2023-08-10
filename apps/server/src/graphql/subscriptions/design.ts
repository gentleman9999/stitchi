import { withFilter } from 'graphql-subscriptions'
import { nonNull, objectType, subscriptionField } from 'nexus'

export const DesignRequestHistoryItemAddedPayload = objectType({
  name: 'DesignRequestHistoryItemAddedPayload',
  definition(t) {
    t.nonNull.boolean('historyItemAdded')
  },
})

export const DesignRequestHistoryItemAdded = subscriptionField(
  'designRequestHistoryItemAdded',
  {
    type: 'DesignRequestHistoryItemAddedPayload',
    args: {
      designRequestId: nonNull('ID'),
    },
    subscribe: withFilter(
      (_, __, context) =>
        context.subscriptions.asyncIterator(
          'DESIGN_REQUEST_HISTORY_ITEM_ADDED',
        ),
      (payload, args) => payload.designRequestId === args.designRequestId,
    ),

    resolve: async () => {
      return {
        historyItemAdded: true,
      }
    },
  },
)
