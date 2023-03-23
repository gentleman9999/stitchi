import { queryType } from 'nexus'

export { viewer } from './viewer'
export { newsletter, allNewsletterIssues } from './newsletter'

export const Query = queryType({
  definition: () => {},
})
