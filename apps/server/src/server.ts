import 'dotenv/config'
import './telemetry/tracing'
import { ApolloServer } from 'apollo-server-express'
import { getOrThrow } from './utils'
import { schema as mainGraphSchema } from './graphql/schema'
import context from './graphql/context'
import express from 'express'
import http from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchSchemas } from '@graphql-tools/stitch'
import { makeSchema as makeDatoCmsSchema } from './dato-cms-schema'
import { makeSchema as makeBigCommerceSchema } from './bigcommerce-schema'
import createRestApi from './rest'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'

process
  .on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at Promise', reason, p)
  })
  .on('uncaughtException', err => {
    console.error('Uncaught Exception thrown', err)
  })

const PORT = getOrThrow(process.env.PORT, 'PORT')

const makeGatewaySchema = async () => {
  const bigCommerceSchema = await makeBigCommerceSchema()

  return stitchSchemas({
    subschemas: [
      { schema: makeExecutableSchema({ typeDefs: await makeDatoCmsSchema() }) },
      {
        schema: mainGraphSchema,
        batch: true,
        merge: {
          Product: {
            selectionSet: '{ id prices { price { value } } }',
            fieldName: '_products',
            key: ({ id, prices }) => ({ id, prices }),
            argsFromKeys: keys => ({
              products: keys,
            }),
          },
        },
      },
      {
        schema: makeExecutableSchema({
          typeDefs: bigCommerceSchema,
        }),
        batch: true,
      },
    ],
  })
}

const app = express()
const httpServer = http.createServer(app)

async function start() {
  createRestApi(app)

  const schema = await makeGatewaySchema()
  const ctx = context.makeDefaultContext()

  // Creating the WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const serverCleanup = useServer({ schema, context: ctx }, wsServer)

  const gqlServer = new ApolloServer({
    schema,
    context: ctx,
    introspection:
      getOrThrow(
        process.env.GRAPHQL_INTROSPECTION_ENABLED,
        'GRAPHQL_INTROSPECTION_ENABLED',
      ) === 'true',
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await gqlServer.start()
  gqlServer.applyMiddleware({ app })

  await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))

  console.log(
    `🚀 Server ready at http://localhost:5000${gqlServer.graphqlPath}`,
  )
  console.log(
    `🚀 Web Socket ready at ws://localhost:5000${gqlServer.graphqlPath}`,
  )
}

start()
