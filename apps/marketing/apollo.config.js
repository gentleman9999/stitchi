module.exports = {
  client: {
    service: {
      name: 'Stitchi',
      url: `http://localhost:5001/graphql`,
      headers: {
        'Content-Type': 'application/json',
      },
    },
    tagName: 'gql',
    includes: ['src/**/*.ts', 'src/**/*.tsx'],
  },
}
