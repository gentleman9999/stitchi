module.exports = {
  client: {
    service: {
      name: 'Yottled',
      url: `https://graphql.datocms.com/environments/main`,
      headers: {
        Authorization: `Bearer f33b3120440ccb347f19517c7d7496`,
        'Content-Type': 'application/json',
      },
    },
    tagName: 'gql',
    includes: ['src/**/*.ts', 'src/**/*.tsx'],
  },
}
