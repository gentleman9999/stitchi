import { mutationType } from 'nexus'

export * from './user'
export * from './newsletter'
export * from './design'
export * from './file'
export * from './order'
export * from './fulfillment'
export * from './payment'
export * from './organization'
export * from './membership'
export * from './notification'

export const Mutation = mutationType({
  definition: () => {},
})
