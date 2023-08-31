import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'
import { organizationFactoryToGrahpql } from '../../serializers/organization'

export const OrganizationExtendsUser = extendType({
  type: 'User',
  definition(t) {
    t.nonNull.list.nonNull.field('organizations', {
      type: 'Organization',
      resolve: async (user, _, ctx) => {
        if (!user.id) throw new GraphQLError('Unauthorized')

        let organizations

        try {
          organizations = await ctx.organization.listOrganizations({
            where: {
              memberships: {
                some: {
                  userId: user.id,
                },
              },
            },
          })
        } catch (error) {
          ctx.logger
            .child({
              context: { error, user },
            })
            .error('Unable to fetch organizations')
          throw new GraphQLError('Unable to fetch organizations')
        }

        return organizations.map(organizationFactoryToGrahpql)
      },
    })
  },
})

export const OrganizationExtendsMembership = extendType({
  type: 'Membership',
  definition(t) {
    t.nonNull.field('organization', {
      type: 'Organization',
      resolve: async (membership, _, ctx) => {
        let organization

        try {
          organization = await ctx.organization.getOrganization({
            organizationId: membership.organizationId,
          })
        } catch (error) {
          ctx.logger
            .child({
              context: { error, membership },
            })
            .error('Unable to fetch organization')
          throw new GraphQLError('Unable to fetch organization')
        }

        return organizationFactoryToGrahpql(organization)
      },
    })
  },
})
