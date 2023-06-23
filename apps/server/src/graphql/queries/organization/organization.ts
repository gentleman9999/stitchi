import { GraphQLError } from 'graphql'
import { extendType } from 'nexus'

export const OrganizationExtendsUser = extendType({
  type: 'User',
  definition(t) {
    t.nonNull.list.nonNull.field('organizations', {
      type: 'Organization',
      resolve: async (user, _, ctx) => {
        if (!user.id) throw new GraphQLError('Unauthorized')

        const memberships = await ctx.prisma.membership.findMany({
          where: { userId: user.id },
        })

        const organizationIds = memberships.map(
          membership => membership.organizationId,
        )

        return await ctx.prisma.organization.findMany({
          where: { id: { in: organizationIds } },
        })
      },
    })
  },
})
