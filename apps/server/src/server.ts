import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, Config } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import { getOrThrow } from './utils'
import { schema } from './graphql/schema'
import context from './graphql/context'

const PORT = getOrThrow(process.env.PORT, 'PORT')

async function startApolloServer(schema: Config['schema']) {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema: schema,
    context: context.makeDefaultContext(),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    introspection:
      getOrThrow(
        process.env.GRAPHQL_INTROSPECTION_ENABLED,
        'GRAPHQL_INTROSPECTION_ENABLED',
      ) === 'true',
  })
  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
  )
}

startApolloServer(schema)
