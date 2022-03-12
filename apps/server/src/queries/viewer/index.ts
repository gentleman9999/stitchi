import { queryField } from 'nexus'

export const viewer = queryField('viewer', {
  type: 'Membership',
  resolve(_, __, ctx) {
    if (!ctx.membershipId || !ctx.userId) return null

    return ctx.prisma.membership.findFirst({
      where: { id: ctx.membershipId },
    })
  },
})
