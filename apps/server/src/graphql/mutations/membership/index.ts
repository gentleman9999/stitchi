import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'

export const MembershipInviteInput = inputObjectType({
  name: 'MembershipInviteInput',
  definition(t) {
    t.nonNull.list.nonNull.string('emails')
  },
})

export const MembershipInvitePayload = objectType({
  name: 'MembershipInvitePayload',
  definition(t) {
    t.nonNull.list.nonNull.field('memberships', { type: 'Membership' })
  },
})

export const membershipInvite = mutationField('membershipInvite', {
  type: 'MembershipInvitePayload',
  args: {
    input: nonNull('MembershipInviteInput'),
  },
  resolve: async (_, { input }, ctx) => {
    if (!ctx.organizationId || !ctx.userId) {
      throw new GraphQLError('Forbidden')
    }

    for (const email of input.emails) {
      let existingUser

      try {
        existingUser = await ctx.user.getUsersByEmail(email)
      } catch (error) {
        throw new GraphQLError('Failed to get user by email')
      }
    }
  },
})
