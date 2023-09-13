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
import { cursorPaginationFromList } from '../../utils'

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

    t.field('membershipId', {
      type: 'StringFilterInput',
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
    t.nonNull.boolean('hasDesignRequests', {
      resolve: async (parent, _, { design }) => {
        const designRequests = await design.listDesignRequests({
          where: { membershipId: parent.id },
          take: 1,
        })

        return designRequests.length > 0
      },
    })
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
        const isArtist = parent.role === 'STITCHI_DESIGNER'

        const resourceOwnerFilter: Prisma.Enumerable<Prisma.DesignRequestWhereInput> =
          []

        const { membershipId } = filter?.where || {}

        if (!Object.keys(membershipId || {}).length) {
          if (isArtist) {
            // Artists can see all design requests, skip
            resourceOwnerFilter.push({
              id: {
                not: undefined,
              },
            })
          } else {
            resourceOwnerFilter.push({
              organizationId: parent.organizationId,
            })
          }
        } else {
          if (isArtist) {
            resourceOwnerFilter.push({
              designRequestArtists: {
                some: {
                  artistMembershipId: {
                    equals: membershipId?.equals || undefined,
                    in: membershipId?.in || undefined,
                    notIn: membershipId?.notIn || undefined,
                  },
                },
              },
            })
          } else {
            resourceOwnerFilter.push({
              organizationId: parent.organizationId,
              membershipId: {
                equals: membershipId?.equals || undefined,
                in: membershipId?.in || undefined,
                notIn: membershipId?.notIn || undefined,
              },
            })
          }
        }

        const where = {
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
        }

        const result = await cursorPaginationFromList(
          async ({ cursor, skip, take }) => {
            const designRequests = await design.listDesignRequests({
              where,
              cursor,
              skip,
              take,
              orderBy: {
                createdAt: 'desc',
              },
            })

            return designRequests.map(designRequestFactoryToGrahpql)
          },
          async () => {
            return design.listDesignRequestsCount({
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

export const ExtendDesignRequests = extendType({
  type: 'DesignRequest',
  definition(t) {
    t.nonNull.list.nonNull.field('history', {
      type: 'DesignRequestHistoryItem',
      resolve: async (parent, _, ctx) => {
        let designRequest

        try {
          const response = await ctx.design.getDesignRequest({
            designRequestId: parent.id,
          })

          designRequest = designRequestFactoryToGrahpql(response)
        } catch (error) {
          ctx.logger.error(error)
          throw new GraphQLError('Failed to get design request')
        }

        const desingRequestEvents: NexusGenObjects['DesignRequestHistoryItemDesignRequestEvent'][] =
          [
            {
              id: uuid.v4(),
              method: 'CREATE',
              timestamp: designRequest.createdAt,
              membershipId: designRequest.membershipId,
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
          ctx.logger.error(error)
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
              viewerId: ctx.membershipId,
            })
          } catch (error) {
            ctx.logger.error(error)
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
