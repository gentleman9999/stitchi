module.exports = {
  client: {
    service: {
      name: 'Stitchi Server',
      url: 'http://localhost:5000/graphql',
    },
    tagName: 'gql',
    includes: ['src/**/*.ts', 'src/**/*.tsx'],
  },
}
