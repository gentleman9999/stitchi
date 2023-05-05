import 'dotenv/config'
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

process
  .on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at Promise', reason, p)
  })
  .on('uncaughtException', err => {
    console.error('Uncaught Exception thrown', err)
  })

const PORT = getOrThrow(process.env.PORT, 'PORT')

const makeGatewaySchema = async () =>
  stitchSchemas({
    subschemas: [
      { schema: makeExecutableSchema({ typeDefs: await makeDatoCmsSchema() }) },
      {
        schema: mainGraphSchema,
        batch: true,
        merge: {
          Product: {
            selectionSet: '{ id }',
            fieldName: '_products',
            fields: {
              priceCents: {
                selectionSet: '{ prices { price { value } } }',
                computed: true,
              },
            },
            key: ({ id, prices }) => ({ id, prices }),
            argsFromKeys: keys => ({
              products: keys,
            }),
          },
        },
      },
      {
        schema: makeExecutableSchema({
          typeDefs: await makeBigCommerceSchema(),
        }),
        batch: true,
      },
    ],
  })

async function startApolloServer() {
  const server = new ApolloServer({
    schema: await makeGatewaySchema(),
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
