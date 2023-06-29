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
import { conversationFactoryToGraphQl } from '../../serializers/conversation'
import {
  designProofFactoryToGraphql,
  designRequestFactoryToGrahpql,
} from '../../serializers/design'
import * as uuid from 'uuid'
import { Prisma } from '@prisma/client'
import { GraphQLError } from 'graphql'

export const designRequest = queryField('designRequest', {
  type: 'DesignRequest',
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, { id }, { design, organizationId, role }) => {
    const designRequest = await design.getDesignRequest({ designRequestId: id })

    if (
      role === 'OWNER' &&
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

        const take = notEmpty(after)
          ? limitPlusOne
          : notEmpty(before)
          ? -limitPlusOne
          : limitPlusOne

        const isArtist = parent.role === 'STITCHI_DESIGNER'

        const resourceOwnerFilter: Prisma.Enumerable<Prisma.DesignRequestWhereInput> =
          [
            {
              organizationId: parent.organizationId,
              userId: parent.userId,
            },
          ]

        if (isArtist) {
          resourceOwnerFilter.push({
            designRequestArtists: {
              some: {
                artistUserId: parent.userId,
              },
            },
          })
        }

        const designRequests = await design.listDesignRequests({
          orderBy: {
            createdAt: 'desc',
          },
          where: {
            AND: [
              {
                createdAt: filter?.where?.createdAt
                  ? {
                      gte: filter.where.createdAt.gte || undefined,
                      lte: filter.where.createdAt.lte || undefined,
                    }
                  : undefined,
              },

              {
                OR: resourceOwnerFilter,
              },
            ],
          },
          take,
          // skip the cursor unless no cursor
          skip: notEmpty(after) || notEmpty(before) ? 1 : 0,
          ...(notEmpty(after) ? { cursor: { id: after } } : {}),
          ...(notEmpty(before) ? { cursor: { id: before } } : {}),
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
    t.nonNull.list.nonNull.field('designRequestHistory', {
      type: 'DesignRequestHistoryItem',
      args: {
        designRequestId: nonNull(idArg()),
      },
      resolve: async (parent, { designRequestId }, ctx) => {
        let designRequest

        try {
          const response = await ctx.design.getDesignRequest({
            designRequestId,
          })

          designRequest = designRequestFactoryToGrahpql(response)
        } catch (error) {
          console.log(error)
          throw new GraphQLError('Failed to get design request')
        }

        const desingRequestEvents: NexusGenObjects['DesignRequestHistoryItemDesignRequestEvent'][] =
          [
            {
              id: uuid.v4(),
              method: 'CREATE',
              timestamp: designRequest.createdAt,
              userId: designRequest.userId,
            },
          ]

        let proofs

        try {
          const response = await ctx.design.listDesignProofs({
            where: {
              designRequestDesignProofs: {
                some: {
                  designRequestId: parent.id,
                },
              },
            },
          })

          proofs = response.map(designProofFactoryToGraphql)
        } catch (error) {
          console.log(error)
          throw new GraphQLError('Failed to get proofs')
        }

        let conversation

        if (parent.conversationId) {
          try {
            const response = await ctx.conversation.getConversation({
              conversationId: parent.conversationId,
            })

            conversation = conversationFactoryToGraphQl({
              conversation: response,
              viewerId: ctx.userId,
            })
          } catch (error) {
            console.log(error)
            throw new GraphQLError('Failed to get conversation')
          }
        }

        const historyItems = [
          ...desingRequestEvents,
          ...proofs,
          ...designRequest.designRevisionRequests,
          ...(conversation?.messages || []),
        ].sort((a, b) => {
          const aTimestamp = 'timestamp' in a ? a.timestamp : a.createdAt
          const bTimestamp = 'timestamp' in b ? b.timestamp : b.createdAt

          return bTimestamp - aTimestamp
        })

        return historyItems
      },
    })
  },
})
