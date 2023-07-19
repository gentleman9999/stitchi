import { ApolloError } from 'apollo-server-core'
import { mutationField } from 'nexus'
import { OrganizationRecordGlobalRole } from '../../../services/organization/db/organization-table'

export const userBootstrap = mutationField('userBoostrap', {
  description: 'Bootstraps a new user with necessary resources',
  type: 'User',
  resolve: async (_, __, ctx) => {
    if (!ctx.userId) {
      throw new Error('User not authenticated')
    }

    console.info('Starting to bootstrap user')

    const user = await ctx.user.getUser({ id: ctx.userId }).catch(error => {
      console.error(error)
      throw new ApolloError('Failed to get user from Auth0')
    })

    if (!user.user_id) {
      throw new Error('Failed to return userID')
    }

    let organization

    try {
      organization = await ctx.organization.createOrganization({
        organization: {
          name: `Default Organization`,
          role: OrganizationRecordGlobalRole.CUSTOMER,
        },
      })
    } catch (error) {
      console.error(error)
      throw new ApolloError('Failed to create organization')
    }

    if (
      await ctx.prisma.membership.findFirst({ where: { userId: ctx.userId } })
    ) {
      // do nothing
    } else {
      await ctx.prisma.membership.create({
        data: {
          userId: ctx.userId,
          role: 'OWNER',
          organizationId: organization.id,
        },
      })
    }

    console.info(`Successfully bootstrapped user ${ctx.userId}`)

    return { ...user, id: user.user_id }
  },
})
