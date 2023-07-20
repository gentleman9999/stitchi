import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'

export * from './bootstrap'

export const UserSetOrganizationInput = inputObjectType({
  name: 'UserSetOrganizationInput',
  definition(t) {
    t.nonNull.id('membershipId')
    t.nonNull.id('organizationId')
  },
})

export const UserSetOrganizationPayload = objectType({
  name: 'UserSetOrganizationPayload',
  definition(t) {
    t.nullable.string('membershipId')
    t.nullable.string('organizationId')
  },
})

export const userSetOrganization = mutationField('userSetOrganization', {
  type: 'UserSetOrganizationPayload',
  args: {
    input: nonNull('UserSetOrganizationInput'),
  },
  resolve: async (_, { input }, ctx) => {
    if (!ctx.userId) {
      throw new GraphQLError('Forbidden')
    }

    let membership

    try {
      membership = await ctx.membership.setUserActiveMembership({
        membershipId: input.membershipId,
        organizationId: input.organizationId,
        userId: ctx.userId,
      })
    } catch (error) {
      console.error('Failed to set active membership', {
        context: { error, input, userId: ctx.userId },
      })
      throw new GraphQLError('Failed to set active membership')
    }

    return {
      membershipId: membership.id,
      organizationId: membership.organizationId,
    }
  },
})
