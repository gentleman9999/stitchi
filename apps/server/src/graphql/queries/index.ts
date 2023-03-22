import { queryType } from 'nexus'

export { viewer } from './viewer'
export { newsletter } from './newsletter'

export const Query = queryType({
  definition: () => {},
})
