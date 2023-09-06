import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { membershipFactoryToGraphql } from '../../serializers/membership'

export const MembershipExtendsOrganization = extendType({
  type: 'Organization',
  definition(t) {
    t.nonNull.list.nonNull.field('memberships', {
      type: 'Membership',
      resolve: async (organization, _, ctx) => {
        if (ctx.organizationId !== organization.id) {
          throw new Error('Unauthorized')
        }

        let memberships

        try {
          memberships = await ctx.membership.listMemberships({
            where: { organizationId: organization.id },
          })
        } catch (error) {
          ctx.logger
            .child({
              context: { error, organization },
            })
            .error('Unable to fetch memberships')
          throw new Error('Unable to fetch memberships')
        }

        return memberships.map(membershipFactoryToGraphql)
      },
    })
  },
})

export const MembershipExtendsOrder = extendType({
  type: 'Order',
  definition(t) {
    t.field('owner', {
      type: 'Membership',
      resolve: async (order, _, ctx) => {
        if (!order.membershipId) return null

        let membership

        try {
          membership = await ctx.membership.getMembership({
            membershipId: order.membershipId,
          })
        } catch (error) {
          ctx.logger.error(error)
          throw new GraphQLError('Unable to fetch membership')
        }

        return membershipFactoryToGraphql(membership)
      },
    })
  },
})

export const MembershipExtendsDesignRequest = extendType({
  type: 'DesignRequest',
  definition(t) {
    t.field('membership', {
      type: 'Membership',
      resolve: async (designRequest, _, ctx) => {
        if (!designRequest.membershipId) return null

        let membership

        try {
          membership = await ctx.membership.getMembership({
            membershipId: designRequest.membershipId,
          })
        } catch (error) {
          ctx.logger.error(error)
          throw new GraphQLError('Unable to fetch membership')
        }

        return membershipFactoryToGraphql(membership)
      },
    })
  },
})

export const MembershipExtendsDesignProof = extendType({
  type: 'DesignProof',
  definition(t) {
    t.field('artist', {
      type: 'Membership',
      resolve: async (designRequestProof, _, ctx) => {
        let membership

        try {
          membership = await ctx.membership.getMembership({
            membershipId: designRequestProof.artistMembershipId,
          })
        } catch (error) {
          ctx.logger.error(error)
          throw new GraphQLError('Unable to fetch membership')
        }

        return membershipFactoryToGraphql(membership)
      },
    })
  },
})

export const MembershipExtendsDesignRequestRevisionRequest = extendType({
  type: 'DesignRequestRevisionRequest',
  definition(t) {
    t.field('membership', {
      type: 'Membership',
      resolve: async (designRequestRevision, _, ctx) => {
        let membership

        try {
          membership = await ctx.membership.getMembership({
            membershipId: designRequestRevision.membershipId,
          })
        } catch (error) {
          ctx.logger.error(error)
          throw new GraphQLError('Unable to fetch membership')
        }

        return membershipFactoryToGraphql(membership)
      },
    })
  },
})

export const MembershipExtendsDesingProof = extendType({
  type: 'DesignProof',
  definition(t) {
    t.field('membership', {
      type: 'Membership',
      resolve: async (designProof, _, ctx) => {
        let membership

        try {
          membership = await ctx.membership.getMembership({
            membershipId: designProof.artistMembershipId,
          })
        } catch (error) {
          ctx.logger.error(error)
          throw new GraphQLError('Unable to fetch membership')
        }

        return membershipFactoryToGraphql(membership)
      },
    })
  },
})

export const MembershipExtendsDesignRequestHistoryItemDesignRequestEvent =
  extendType({
    type: 'DesignRequestHistoryItemDesignRequestEvent',
    definition(t) {
      t.nullable.field('actor', {
        type: 'Membership',
        resolve: async (designRequestHistoryItemDesignRequestEvent, _, ctx) => {
          if (!designRequestHistoryItemDesignRequestEvent.membershipId)
            return null

          let user

          try {
            user = await ctx.membership.getMembership({
              membershipId:
                designRequestHistoryItemDesignRequestEvent.membershipId,
            })
          } catch (error) {
            ctx.logger.error(error)
            throw new GraphQLError('Unable to fetch user')
          }

          return membershipFactoryToGraphql(user)
        },
      })
    },
  })

export const MembershipExtendsConversationMessage = extendType({
  type: 'ConversationMessage',
  definition(t) {
    t.nullable.field('sender', {
      type: 'Membership',
      resolve: async (coversationMessage, _, ctx) => {
        if (!coversationMessage.senderMembershipId) return null

        let membership

        try {
          membership = await ctx.membership.getMembership({
            membershipId: coversationMessage.senderMembershipId,
          })
        } catch (error) {
          ctx.logger.error(error)
          throw new GraphQLError('Unable to fetch user')
        }

        return membershipFactoryToGraphql(membership)
      },
    })
  },
})
