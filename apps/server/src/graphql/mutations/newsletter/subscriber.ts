import { mutationField, nonNull } from 'nexus'

export const subscriberCreate = mutationField('subscriberCreate', {
  description: 'Creates a new subscriber',
  type: 'SubscriberCreatePayload',
  args: {
    email: nonNull('String'),
  },
  resolve: async (_, { email }, ctx) => {
    try {
      const subscriber = await ctx.newsletter.createSubscriber({ email })

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
