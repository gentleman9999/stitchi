import { objectType } from 'nexus'

export const Membership = objectType({
  name: 'Membership',
  definition: t => {
    t.nonNull.id('id')
    t.nonNull.string('organizationId')
    t.nonNull.string('userId')
    t.field('role', { type: 'MembershipRole' })

    t.nonNull.field('createdAt', { type: 'DateTime' })
    t.field('updatedAt', { type: 'DateTime' })

    t.field('organization', {
      type: 'Organization',
      resolve: async (membership, _, ctx) => {
        return ctx.prisma.organization.findFirst({
          where: {
            id: membership.organizationId,
          },
        })
      },
    })

    t.field('user', {
      type: 'User',
      resolve: async (membership, _, ctx) => {
        const user = await ctx.auth0.getUser({ id: membership.userId })
        console.log('HEREEEEE', user)
        return { ...user, id: user.user_id }
      },
    })
  },
})
