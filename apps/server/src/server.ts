import 'dotenv/config'
import { ApolloServer } from 'apollo-server'
import { getOrThrow } from './utils'
import makeSchema from './graphql/schema'
import context from './graphql/context'

process
  .on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at Promise', reason, p)
  })
  .on('uncaughtException', err => {
    console.error('Uncaught Exception thrown', err)
  })

const PORT = getOrThrow(process.env.PORT, 'PORT')

async function startApolloServer() {
  const server = new ApolloServer({
    schema: await makeSchema(),
    context: context.makeDefaultContext(),
    introspection:
      getOrThrow(
        process.env.GRAPHQL_INTROSPECTION_ENABLED,
        'GRAPHQL_INTROSPECTION_ENABLED',
      ) === 'true',
  })

  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}graphql`)
  })
}

startApolloServer()
