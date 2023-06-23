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
import { addDays } from 'date-fns'
import { Prisma } from '@prisma/client'

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
          conversationMessageFactoryToGraphQl({
            index: i,
            viewerId: ctx.userId,
          }),
        )

        const designRequestRevision: NexusGenObjects['DesignRequestRevision'][] =
          [
            {
              id: uuid.v4(),
              userId: parent.userId || '',
              fileIds: [],
              createdAt: addDays(new Date(), 1),
              description:
                'Please update the design to include all of the amazing things that will make this design go viral to the republic of social media.',
            },
          ]

        const makeProof = (
          i: number,
        ): NexusGenObjects['DesignRequestProof'] => ({
          id: uuid.v4(),
          artistUserId: parent.userId || '',
          designRequestId: parent.id,
          fileIds: [],
          artistNote: 'This is a note from the artist',
          createdAt: addDays(new Date(), i),
        })

        const proofs = Array.from({ length: 2 }).map((_, i) => makeProof(i))

        const historyItems = [
          ...desingRequestEvents,
          ...messages,
          ...proofs,
          ...designRequestRevision,
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
