import { inputObjectType, mutationField, nonNull } from 'nexus'

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
    try {
      await ctx.sendgrid.addMarketingContacts({
        contacts: [{ email: input.email }],
      })

      return {
        subscriber: {
          id: input.email,
          email: input.email,
        },
      }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create subscriber')
    }
  },
})
