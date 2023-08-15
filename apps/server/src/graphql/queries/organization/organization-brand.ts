import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'

export const OrganizationBrandExtendsOrganization = extendType({
  type: 'Organization',
  definition(t) {
    t.field('brand', {
      type: 'OrganizationBrand',
      resolve: async (parent, _, ctx) => {
        let organization

        try {
          organization = await ctx.organization.getOrganization({
            organizationId: parent.id,
          })
        } catch (error) {
          console.error('Unable to fetch organization', {
            context: { error, organization: parent },
          })
          throw new GraphQLError('Unable to fetch organization')
        }

        return {
          id: organization.id,
          organizationId: organization.id,
        }
      },
    })
  },
})