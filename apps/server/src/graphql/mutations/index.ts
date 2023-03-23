import { mutationType } from 'nexus'

export { userBootstrap } from './user'
export { subscriberCreate } from './newsletter'

export const Mutation = mutationType({
  definition: () => {},
})
