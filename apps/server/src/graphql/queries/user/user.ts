import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { KeyValueRecordKey } from '../../../services/key-value-store'
import { membershipFactoryToGraphql } from '../../serializers/membership'
import { userToGraphql } from '../../serializers/user'

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
        if (!membership.userId) {
          return null
        }

        let user

        try {
          user = await ctx.user.getUser({ id: membership.userId })
        } catch (error) {
          ctx.logger.error(error)
          throw new GraphQLError('Unable to fetch user')
        }

        return userToGraphql(user)
      },
    })
  },
})

export const UserOnboardingExtendsUser = extendType({
  type: 'User',
  definition(t) {
    t.field('onboarding', {
      type: 'UserOnboarding',
      resolve: async (user, _, ctx) => {
        const value = await ctx.keyValueStore.getValue(
          KeyValueRecordKey.USER_ONBOARDING,
          user.id,
        )

        return {
          id: user.id,

          seenDesignRequestDraftOnboarding: Boolean(
            value?.seenDesignRequestDraftOnboarding,
          ),

          seenDesignIndexPageOnboardingBanner: Boolean(
            value?.seenDesignIndexPageOnboardingBanner,
          ),

          seenInventoryIndexPageOnboardingBanner: Boolean(
            value?.seenInventoryIndexPageOnboardingBanner,
          ),
        }
      },
    })
  },
})
