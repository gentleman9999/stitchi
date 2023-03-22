import { queryField } from 'nexus'

export const newsletter = queryField('newsletter', {
  type: 'Newsletter',
  resolve() {
    return {
      allNewsletterIssues: {
        nodes: [],
        totalCount: 0,
      },
    }
  },
})
