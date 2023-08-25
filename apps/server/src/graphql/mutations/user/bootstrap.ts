import { ApolloError } from 'apollo-server-core'
import { mutationField } from 'nexus'
import { SendgridMarketingEmailList } from '../../../sendgrid'
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
      throw new ApolloError('Failed to create organization')
    }

    let membership

    try {
      membership = await ctx.membership.createMembership({
        membership: {
          userId: ctx.userId,
          role: 'OWNER',
          organizationId: organization.id,
          invitedEmail: null,
          invitedName: null,
        },
      })
    } catch (error) {
      throw new ApolloError('Failed to create membership')
    }

    if (user.email) {
      try {
        await ctx.sendgrid.addMarketingContacts({
          lists: [SendgridMarketingEmailList.NEW_USER],
          contacts: [
            {
              email: user.email,
              firstName: user.given_name,
              lastName: user.family_name,
              customFields: {
                userId: user.user_id,
                membershipId: membership.id,
                organizationId: organization.id,
                organizationName: organization.name,
              },
            },
          ],
        })
      } catch (error) {
        throw new ApolloError('Failed to add marketing contact')
      }
    }

    console.info(`Successfully bootstrapped user ${ctx.userId}`)

    return { ...user, id: user.user_id }
  },
})
