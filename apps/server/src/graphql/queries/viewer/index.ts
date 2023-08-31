import { GraphQLError } from 'graphql'
import { queryField } from 'nexus'
import { membershipFactoryToGrahpql } from '../../serializers/membership'

export const viewer = queryField('viewer', {
  type: 'Membership',
  resolve: async (_, __, ctx) => {
    if (!ctx.membershipId || !ctx.userId) return null

    let membership

    try {
      membership = await ctx.membership.getMembership({
        membershipId: ctx.membershipId,
      })
    } catch (error) {
      ctx.logger
        .child({
          context: { error, userId: ctx.userId },
        })
        .error("Failed to get user's membership")
      throw new GraphQLError('Failed to get user membership')
    }

    return membershipFactoryToGrahpql(membership)
  },
})
