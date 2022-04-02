import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express'
import { getOrThrow } from './utils'
import { schema as mainGraphSchema } from './graphql/schema'
import context from './graphql/context'
import express from 'express'
import http from 'http'
import { AsyncExecutor } from '@graphql-tools/utils'
import { print } from 'graphql'
import fetch from 'node-fetch'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { stitchSchemas } from '@graphql-tools/stitch'
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap'

process
  .on('unhandledRejection', (reason, p) => {
    console.error('Unhandled Rejection at Promise', reason, p)
  })
  .on('uncaughtException', err => {
    console.error('Uncaught Exception thrown', err)
  })

const PORT = getOrThrow(process.env.PORT, 'PORT')
const CMS_API_KEY = getOrThrow(process.env.DATO_CMS_API_KEY, 'DATO_CMS_API_KEY')
const CMS_ENVIRONMENT = getOrThrow(process.env.DATO_CMS_ENV, 'DATO_CMS_ENV')
const CMS_URI = getOrThrow(
  process.env.DATO_CMS_GRAPHQL_URI,
  'DATO_CMS_GRAPHQL_URI',
)

const executor: AsyncExecutor = async ({ document, variables }) => {
  const query = print(document)
  const fetchResult = await fetch(
    `${CMS_URI}/environments/${CMS_ENVIRONMENT}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CMS_API_KEY}`,
      },
      body: JSON.stringify({ query, variables }),
    },
  )
  return fetchResult.json()
}

const datoCmsSchema = async () => {
  const schema = wrapSchema({
    schema: await introspectSchema(executor),
    executor,
  })
  return schema
}

const makeGatewaySchema = async () =>
  stitchSchemas({
    subschemas: [
      { schema: mainGraphSchema },
      { schema: makeExecutableSchema({ typeDefs: await datoCmsSchema() }) },
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
