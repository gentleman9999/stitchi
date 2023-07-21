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

    let hasExistingMembership

    try {
      const res = await ctx.membership.listMemberships({
        where: { userId: ctx.userId },
        take: 1,
      })

      hasExistingMembership = res.length > 0
    } catch (error) {
      console.error('Failed to list memberships', {
        context: { error, userId: ctx.userId },
      })
      throw new ApolloError('Failed to list memberships')
    }

    if (hasExistingMembership) {
      console.info(`User ${ctx.userId} already has memberships`)
      return { id: ctx.userId }
    }

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

    await ctx.membership.createMembership({
      membership: {
        userId: ctx.userId,
        role: 'OWNER',
        organizationId: organization.id,
        invitedEmail: null,
        invitedName: null,
      },
    })

    console.info(`Successfully bootstrapped user ${ctx.userId}`)

    return { ...user, id: user.user_id }
  },
})
