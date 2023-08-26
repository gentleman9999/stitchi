import { GraphQLError } from 'graphql'
import { inputObjectType, mutationField, nonNull, objectType } from 'nexus'
import { organizationFactoryToGrahpql } from '../../serializers/organization'

export const OrganizationUpdateInput = inputObjectType({
  name: 'OrganizationUpdateInput',
  definition(t) {
    t.nonNull.id('organizationId')
    t.nullable.string('name')
  },
})

export const OrganizationUpdatePayload = objectType({
  name: 'OrganizationUpdatePayload',
  definition(t) {
    t.nullable.field('organization', {
      type: 'Organization',
    })
  },
})

export const organizationUpdate = mutationField('organizationUpdate', {
  type: 'OrganizationUpdatePayload',
  args: {
    input: nonNull('OrganizationUpdateInput'),
  },
  resolve: async (_, { input }, ctx) => {
    if (!ctx.userId || ctx.organizationId !== input.organizationId) {
      throw new GraphQLError('Unauthorized')
    }

    let existingOrganization

    try {
      existingOrganization = await ctx.organization.getOrganization({
        organizationId: input.organizationId,
      })
    } catch (error) {
      throw new GraphQLError('Unable to update organization')
    }

    let organization

    try {
      organization = await ctx.organization.updateOrganization({
        organization: {
          id: input.organizationId,
          name: input.name ?? existingOrganization.name,
          role: existingOrganization.role,
        },
      })
    } catch (error) {
      throw new GraphQLError('Unable to update organization')
    }

    return {
      organization: organizationFactoryToGrahpql(organization),
    }
  },
})
