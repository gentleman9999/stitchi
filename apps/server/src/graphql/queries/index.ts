import { queryType } from 'nexus'

export * from './viewer'
export * from './catalog'

export const Query = queryType({
  definition: () => {},
})
