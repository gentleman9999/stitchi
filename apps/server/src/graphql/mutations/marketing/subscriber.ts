import { enumType, inputObjectType, mutationField, nonNull } from 'nexus'
import { SendgridMarketingEmailList } from '../../../sendgrid'

export const SubscriberListEnum = enumType({
  name: 'SubscriberListEnum',
  members: Object.values(SendgridMarketingEmailList),
})

export const SubscriberCreateInput = inputObjectType({
  name: 'SubscriberCreateInput',
  definition(t) {
    t.nonNull.string('email')
    t.nonNull.list.nonNull.field('lists', {
      type: 'SubscriberListEnum',
    })
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
        lists: input.lists.map(list => SendgridMarketingEmailList[list]),
        contacts: [
          {
            customFields,
            email: input.email,
            firstName: user?.givenName,
            lastName: user?.familyName,
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
