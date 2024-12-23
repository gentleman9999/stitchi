import { queryType } from 'nexus'

export * from './viewer'
export * from './product'
export * from './design'
export * from './file'
export * from './order'
export * from './fulfillment'
export * from './payment'
export * from './scope'
export * from './user'
export * from './organization'
export * from './catalog'
export * from './membership'
export * from './notification'
export * from './color'

export const Query = queryType({
  definition: () => {},
})
