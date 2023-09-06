import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { membershipFactoryToGraphql } from '../../serializers/membership'
import { auth0UserToGraphl } from '../../serializers/user'

export const userMemberships = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.nonNull.field('userMemberships', {
      type: 'Membership',
      resolve: async (_, __, ctx) => {
        const { userId } = ctx

        if (!userId) {
          throw new GraphQLError('Not authenticated')
        }

        let memberships

        try {
          memberships = await ctx.membership.listMemberships({
            where: { userId },
          })
        } catch (error) {
          ctx.logger
            .child({
              context: {
                error,
              },
            })
            .error(`Error listing memberships`)
          throw error
        }

        return memberships.map(membershipFactoryToGraphql)
      },
    })
  },
})

export const UserExtendsMembership = extendType({
  type: 'Membership',
  definition(t) {
    t.field('user', {
      type: 'User',
      resolve: async (membership, _, ctx) => {
        let user

        try {
          user = await ctx.user.getUser({ id: membership.userId })
        } catch (error) {
          ctx.logger.error(error)
          throw new GraphQLError('Unable to fetch user')
        }

        return auth0UserToGraphl(user)
      },
    })
  },
})
