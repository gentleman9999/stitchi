import { objectType } from 'nexus'

export const Subscriber = objectType({
  name: 'Subscriber',
  definition(t) {
    t.nonNull.string('id')
    t.nonNull.string('email')
  },
})

export const SubscriberCreatePayload = objectType({
  name: 'SubscriberCreatePayload',
  definition(t) {
    t.field('subscriber', { type: 'Subscriber' })
  },
})
