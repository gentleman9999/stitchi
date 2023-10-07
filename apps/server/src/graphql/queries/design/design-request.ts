import {
  arg,
  extendType,
  idArg,
  inputObjectType,
  nonNull,
  queryField,
} from 'nexus'
import { NexusGenObjects } from '../../generated/nexus'
import { conversationFactoryToGraphQl } from '../../serializers/conversation'
import {
  designProofFactoryToGraphql,
  designRequestFactoryToGrahpql,
  designRequestStatusToDesignFactory,
} from '../../serializers/design'
import * as uuid from 'uuid'
import { Prisma } from '@prisma/client'
import { GraphQLError } from 'graphql'
import { cursorPaginationFromList } from '../../utils'
import { DesignRequestStatus } from '../../../services/design/db/design-request-table'
import { onlyOwn } from '../../authorization'

export const designRequest = queryField('designRequest', {
  type: 'DesignRequest',
  args: {
    id: nonNull(idArg()),
  },
  resolve: async (_, { id }, { logger, design, organizationId, authorize }) => {
    const scope = authorize('READ', 'DesignRequest')

    if (!scope) {
      return null
    }

    const designRequest = await design.getDesignRequest({ designRequestId: id })

    if (onlyOwn(scope) && designRequest.organizationId !== organizationId) {
      return null
    }

    return designRequestFactoryToGrahpql(designRequest)
  },
})

export const MembershipDesignRequestsWhereFilterStatusInput = inputObjectType({
  name: 'MembershipDesignRequestsWhereFilterStatusInput',
  definition(t) {
    t.field('equals', {
      type: 'DesignRequestStatus',
    })

    t.list.nonNull.field('in', {
      type: 'DesignRequestStatus',
    })

    t.list.nonNull.field('notIn', {
      type: 'DesignRequestStatus',
    })
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

    t.field('status', {
      type: 'MembershipDesignRequestsWhereFilterStatusInput',
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
        if (
          parent.role &&
          ['STITCHI_DESIGNER', 'STITCHI_ADMIN'].includes(parent.role)
        ) {
          return true
        }

        const designRequests = await design.listDesignRequests({
          where: { membershipId: parent.id },
          take: 1,
        })

        return designRequests.length > 0
      },
    })

    t.nonNull.connectionField('unassignedDesignRequests', {
      type: 'DesignRequest',
      resolve: async (parent, { first, last, after, before }, ctx) => {
        if (
          !parent.role ||
          !['STITCHI_ADMIN', 'STITCHI_DESIGNER'].includes(parent.role)
        ) {
          throw new GraphQLError('Unauthorized')
        }

        const where = {
          status: {
            notIn: [DesignRequestStatus.DRAFT],
          },
          designRequestArtists: {
            none: {},
          },
        }

        const result = await cursorPaginationFromList(
          async ({ cursor, skip, take }) => {
            const designRequests = await ctx.design.listDesignRequests({
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
            return ctx.design.listDesignRequestsCount({
              where,
            })
          },
          { first, last, after, before },
        )

        return result
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
        { design, authorize },
      ) => {
        const scope = authorize('READ', 'DesignRequest')

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

        const isArtist = parent.role === 'STITCHI_DESIGNER'
        const isAdmin = parent.role === 'STITCHI_ADMIN'

        const resourceOwnerFilter: Prisma.Enumerable<Prisma.DesignRequestWhereInput> =
          []

        const { membershipId } = filter?.where || {}

        if (!Object.keys(membershipId || {}).length) {
          if (isArtist || isAdmin) {
            // Artists and admins can see all design requests, skip
            resourceOwnerFilter.push({
              id: {
                not: undefined,
              },
            })
          } else {
            resourceOwnerFilter.push({
              organizationId: parent.organizationId,
              membershipId: onlyOwn(scope) ? parent.id : undefined,
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

            {
              status: filter?.where?.status
                ? {
                    equals: filter?.where?.status?.equals
                      ? designRequestStatusToDesignFactory(
                          filter.where.status.equals,
                        )
                      : undefined,

                    in:
                      filter?.where?.status?.in?.map(
                        designRequestStatusToDesignFactory,
                      ) || undefined,
                    notIn:
                      filter?.where?.status?.notIn?.map(
                        designRequestStatusToDesignFactory,
                      ) || undefined,
                  }
                : undefined,
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

    t.nullable.string('previewImageUrl', {
      resolve: async (designRequest, _, ctx) => {
        let previewImageUrl

        if (designRequest.designProofIds.length) {
          // We pull the preview image from the approved proof or the latest proof
          if (designRequest.approvedDesignProofId) {
            let proof

            try {
              proof = await ctx.design.getDesignProof({
                designProofId: designRequest.approvedDesignProofId,
              })

              if (!proof) {
                throw new Error(
                  'Unable to find approved design proof for design request',
                )
              }

              previewImageUrl = (
                await ctx.file.getFile({
                  fileId: proof.primaryImageFileId,
                })
              ).url
            } catch (error) {
              ctx.logger.error(error)

              throw new GraphQLError(
                'Unable to fetch approved design proof for design request',
              )
            }
          } else {
            let proofs

            try {
              proofs = await ctx.design.listDesignProofs({
                orderBy: { createdAt: 'desc' },
                take: 1,
                where: {
                  id: { in: designRequest.designProofIds },
                },
              })

              if (!proofs.length) {
                throw new Error(
                  'Unable to find latest design proof for design request',
                )
              }

              previewImageUrl = (
                await ctx.file.getFile({
                  fileId: proofs[0].primaryImageFileId,
                })
              ).url
            } catch (error) {
              ctx.logger.error(error)

              throw new GraphQLError(
                'Unable to fetch latest design proof for design request',
              )
            }
          }
        } else {
          try {
            const catalogProduct = await ctx.catalog.getCatalogProduct({
              productEntityId:
                designRequest.designRequestProduct.catalogProductId,
            })

            previewImageUrl = catalogProduct.primaryImage?.url
          } catch (error) {
            ctx.logger.error(error)

            throw new GraphQLError(
              'Unable to fetch preview image for design request',
            )
          }
        }

        return previewImageUrl || null
      },
    })
  },
})
