import { connectionFromArray } from 'graphql-relay'
import {
  arg,
  extendType,
  idArg,
  inputObjectType,
  nonNull,
  queryField,
} from 'nexus'
import { notEmpty } from '../../../utils'
import { NexusGenObjects } from '../../generated/nexus'
import { conversationMessageFactoryToGraphQl } from '../../serializers/conversation'
import { designRequestFactoryToGrahpql } from '../../serializers/design'
import * as uuid from 'uuid'

export const designRequest = queryField('designRequest', {
  type: 'DesignRequest',
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, { id }, { design, organizationId }) => {
    const designRequest = await design.getDesignRequest({ designRequestId: id })

    if (
      notEmpty(designRequest.organizationId) &&
      designRequest.organizationId !== organizationId
    ) {
      return null
    }

    return designRequestFactoryToGrahpql(designRequest)
  },
})

export const MembershipDesignRequestsWhereFilterInput = inputObjectType({
  name: 'MembershipDesignRequestsWhereFilterInput',
  definition(t) {
    t.field('createdAt', {
      type: 'DateFilterInput',
    })
  },
})

export const MembershipDesignRequestsFilterInput = inputObjectType({
  name: 'MembershipDesignRequestsFilterInput',
  definition(t) {
    t.field('where', {
      type: 'MembershipDesignRequestsWhereFilterInput',
    })
  },
})

export const DesignRequestsExtendsMembership = extendType({
  type: 'Membership',
  definition(t) {
    t.nonNull.connectionField('designRequests', {
      type: 'DesignRequest',
      additionalArgs: {
        filter: arg({ type: 'MembershipDesignRequestsFilterInput' }),
      },
      resolve: async (
        parent,
        { first, last, after, before, filter },
        { design },
      ) => {
        const limit = first || last || 50

        // Add one to see if there's a next page
        const limitPlusOne = limit + 1

        const designRequests = await design.listDesignRequests({
          where: {
            organizationId: parent.organizationId,
            userId: parent.userId,
            createdAt: filter?.where?.createdAt
              ? {
                  gte: filter.where.createdAt.gte || undefined,
                  lte: filter.where.createdAt.lte || undefined,
                }
              : undefined,
          },
          // skip the cursor
          skip: 1,
          take: after ? limitPlusOne : -limitPlusOne,
          ...(after ? { cursor: { id: after } } : {}),
          ...(before ? { cursor: { id: before } } : {}),
        })

        const connection = connectionFromArray(
          designRequests.map(designRequestFactoryToGrahpql),
          {
            first,
            last,
            after,
            before,
          },
        )

        return connection
      },
    })
  },
})

export const ExtendDesignRequests = extendType({
  type: 'DesignRequest',
  definition(t) {
    t.nonNull.list.nonNull.field('history', {
      type: 'DesignRequestHistoryItem',
      resolve: async (parent, _, ctx) => {
        const desingRequestEvents: NexusGenObjects['DesignRequestHistoryItemDesignRequestEvent'][] =
          [
            {
              id: uuid.v4(),
              method: 'CREATE',
              timestamp: parent.createdAt,
              userId: parent.userId,
            },
          ]

        const messages = Array.from({ length: 2 }).map((_, i) =>
          conversationMessageFactoryToGraphQl(i),
        )

        const historyItems = [...desingRequestEvents, ...messages].sort(
          (a, b) => {
            const aTimestamp = 'timestamp' in a ? a.timestamp : a.createdAt
            const bTimestamp = 'timestamp' in b ? b.timestamp : b.createdAt

            return bTimestamp - aTimestamp
          },
        )

        return historyItems
      },
    })
  },
})
