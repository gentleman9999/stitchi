import { extendType, idArg, nonNull } from 'nexus'

export const MembershipInviteExtendsQuery = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.field('membershipInvite', {
      type: 'MembershipInvite',
      args: {
        id: nonNull(idArg()),
      },
      resolve: async (_, args, ctx) => {
        let membership

        try {
          membership = await ctx.membership.getMembership({
            membershipId: args.id,
          })
        } catch (e) {
          throw new Error('Unable to retrieve membership invite')
        }

        let organization

        try {
          organization = await ctx.organization.getOrganization({
            organizationId: membership.organizationId,
          })
        } catch (e) {
          throw new Error('Unable to retrieve organization')
        }

        return {
          id: membership.id,
          membershipId: membership.id,
          organizationId: membership.organizationId,
          invitedEmail: membership.invitedEmail,
          organizationName: organization.name,
        }
      },
    })
  },
})
