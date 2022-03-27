module.exports = {
  client: {
    service: {
      name: 'Yottled',
      url: `http://localhost:5000/graphql`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    tagName: 'gql',
    includes: ['src/**/*.ts', 'src/**/*.tsx'],
  },
}
