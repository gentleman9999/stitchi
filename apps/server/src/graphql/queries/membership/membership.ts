import { extendType } from 'nexus'
import { membershipFactoryToGrahpql } from '../../serializers/membership'

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

        return memberships.map(membershipFactoryToGrahpql)
      },
    })
  },
})
