import { inputObjectType, mutationField, nonNull } from 'nexus'

export const SubscriberCreateInput = inputObjectType({
  name: 'SubscriberCreateInput',
  definition(t) {
    t.nonNull.string('email')
  },
})

export const subscriberCreate = mutationField('subscriberCreate', {
  description: 'Creates a new subscriber',
  type: 'SubscriberCreatePayload',
  args: {
    input: nonNull('SubscriberCreateInput'),
  },
  resolve: async (_, { input }, ctx) => {
    try {
      const subscriber = await ctx.newsletter.createSubscriber({
        email: input.email,
      })

      return {
        subscriber: {
          id: subscriber.id,
          email: subscriber.email,
        },
      }
    } catch (error) {
      console.error(error)
      throw new Error('Failed to create subscriber')
    }
  },
})
