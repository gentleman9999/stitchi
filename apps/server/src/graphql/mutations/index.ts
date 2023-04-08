import { mutationType } from 'nexus'

export { userBootstrap } from './user'
export { subscriberCreate, SubscriberCreateInput } from './newsletter'

export const Mutation = mutationType({
  definition: () => {},
})
