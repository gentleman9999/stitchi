import { mutationType } from 'nexus'

export { userBootstrap } from './user'
export { subscriberCreate, SubscriberCreateInput } from './newsletter'

export * from './order'
export * from './fulfillment'

export const Mutation = mutationType({
  definition: () => {},
})
