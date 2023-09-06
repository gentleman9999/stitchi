import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { membershipFactoryToGraphql } from '../../serializers/membership'
import { organizationFactoryToGrahpql } from '../../serializers/organization'

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
      ctx.logger
        .child({
          context: { error, input, userId: ctx.userId },
        })
        .error('Failed to set active membership')
      throw new GraphQLError('Failed to set active membership')
    }

    return {
      membershipId: membership.id,
      organizationId: membership.organizationId,
    }
  },
})

export const UserOrganizationCreateInput = inputObjectType({
  name: 'UserOrganizationCreateInput',
  definition(t) {
    t.nonNull.string('name')
  },
})

export const UserOrganizationCreatePayload = objectType({
  name: 'UserOrganizationCreatePayload',
  definition(t) {
    t.nullable.field('organization', { type: 'Organization' })
    t.nullable.field('membership', { type: 'Membership' })
  },
})

export const userOrganizationCreate = mutationField('userOrganizationCreate', {
  type: 'UserOrganizationCreatePayload',
  args: {
    input: nonNull('UserOrganizationCreateInput'),
  },
  resolve: async (_, { input }, ctx) => {
    if (!ctx.userId) {
      throw new GraphQLError('Forbidden')
    }

    let organization

    try {
      organization = await ctx.organization.createOrganization({
        organization: {
          name: input.name,
          role: 'CUSTOMER',
        },
      })
    } catch (error) {
      ctx.logger
        .child({
          context: { error, input, userId: ctx.userId },
        })
        .error('Failed to create organization')
      throw new GraphQLError('Failed to create organization')
    }

    let membership

    try {
      membership = await ctx.membership.createMembership({
        membership: {
          userId: ctx.userId,
          role: 'OWNER',
          organizationId: organization.id,
          invitedEmail: null,
          invitedName: null,
        },
      })
    } catch (error) {
      ctx.logger
        .child({
          context: { error, input, userId: ctx.userId },
        })
        .error('Failed to create membership')
      throw new GraphQLError('Failed to create membership')
    }

    return {
      organization: organizationFactoryToGrahpql(organization),
      membership: membershipFactoryToGraphql(membership),
    }
  },
})
