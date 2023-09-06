import { inputObjectType, mutationField, nonNull } from 'nexus'
import { SendgridMarketingEmailList } from '../../../sendgrid'

export const SubscriberCreateInput = inputObjectType({
  name: 'SubscriberCreateInput',
  definition(t) {
    t.nonNull.string('email')
  },
})

export const subscriberCreate = mutationField('subscriberCreate', {
  description: 'Creates a new email subscriber',
  type: 'SubscriberCreatePayload',
  args: {
    input: nonNull('SubscriberCreateInput'),
  },
  resolve: async (_, { input }, ctx) => {
    let customFields = {}

    let organization

    if (ctx.organizationId) {
      try {
        organization = await ctx.organization.getOrganization({
          organizationId: ctx.organizationId,
        })
      } catch {
        throw new Error('Failed to get organization')
      }
    }

    let user

    if (ctx.userId) {
      try {
        user = await ctx.user.getUser({ id: ctx.userId })
      } catch {
        throw new Error('Failed to get user')
      }
    }

    customFields = {
      userId: ctx.userId,
      membershipId: ctx.membershipId,
      organizationId: ctx.organizationId,
      organizationName: organization?.name,
    }

    try {
      await ctx.sendgrid.addMarketingContacts({
        lists: [SendgridMarketingEmailList.NEWSLETTER_SUBSCRIBER],
        contacts: [
          {
            customFields,
            email: input.email,
            firstName: user?.given_name,
            lastName: user?.family_name,
          },
        ],
      })

      return {
        subscriber: {
          id: input.email,
          email: input.email,
        },
      }
    } catch (error) {
      ctx.logger.error(error)
      throw new Error('Failed to create subscriber')
    }
  },
})
