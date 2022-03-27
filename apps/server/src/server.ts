import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express'
import { getOrThrow } from './utils'
import makeSchema from './graphql/schema'
import context from './graphql/context'
import express from 'express'
import http from 'http'

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

  const app = express()
  const httpServer = http.createServer(app)

  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
}

startApolloServer()
