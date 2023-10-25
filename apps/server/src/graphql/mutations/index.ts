import { mutationType } from 'nexus'

export * from './user'
export * from './marketing'
export * from './design'
export * from './file'
export * from './order'
export * from './fulfillment'
export * from './payment'
export * from './organization'
export * from './membership'
export * from './notification'
export * from './catalog'

export const Mutation = mutationType({
  definition: () => {},
})
