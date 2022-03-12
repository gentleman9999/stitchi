import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer, Config } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import { getOrThrow } from '../dist/utils'
import { schema } from './schema'
import context from './context'

const PORT = getOrThrow(process.env.PORT, 'PORT')

async function startApolloServer(schema: Config['schema']) {
  const app = express()
  const httpServer = http.createServer(app)
  const server = new ApolloServer({
    schema: schema,
    context: context.makeDefaultContext(),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  })
  await server.start()
  server.applyMiddleware({ app })
  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`,
  )
}

startApolloServer(schema)
