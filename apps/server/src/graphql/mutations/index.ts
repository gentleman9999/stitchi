import { mutationType } from 'nexus'

export { userBootstrap } from './user'
export { subscriberCreate, SubscriberCreateInput } from './newsletter'

export * from './design'
export * from './file'
export * from './order'
export * from './fulfillment'
export * from './payment'

export const Mutation = mutationType({
  definition: () => {},
})
