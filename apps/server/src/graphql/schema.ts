import { connectionPlugin, makeSchema } from 'nexus'
import * as queries from './queries'
import * as mutations from './mutations'
import * as types from './types'
import { stitchSchemas } from '@graphql-tools/stitch'
import { introspectSchema, wrapSchema } from '@graphql-tools/wrap'
import { getOrThrow } from '../utils'
import { AsyncExecutor } from '@graphql-tools/utils'
import { print } from 'graphql'
import fetch from 'node-fetch'

const CMS_URI = getOrThrow(
  process.env.DATO_CMS_GRAPHQL_URI,
  'DATO_CMS_GRAPHQL_URI',
)

const makeGraphqlSchema = () =>
  makeSchema({
    types: [types, queries, mutations],
    outputs: {
      schema: __dirname + '/../../schema.graphql',
      typegen: __dirname + '/generated/nexus.ts',
    },
    contextType: {
      module: require.resolve('./context'),
      export: 'Context',
    },
    sourceTypes: {
      debug: false,
      modules: [
        {
          module: '@prisma/client',
          alias: 'prisma',
        },
      ],
    },
    plugins: [
      // Relay pagination
      connectionPlugin({ includeNodesField: true }),
    ],
  })

const executor: AsyncExecutor = async ({ document, variables }) => {
  const query = print(document)
  const fetchResult = await fetch(CMS_URI, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer f33b3120440ccb347f19517c7d7496`,
    },
    body: JSON.stringify({ query, variables }),
  })
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
      { schema: await datoCmsSchema() },
      { schema: makeGraphqlSchema() },
    ],
  })

export default makeGatewaySchema
