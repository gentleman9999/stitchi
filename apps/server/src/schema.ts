import { connectionPlugin, makeSchema } from 'nexus'
import * as queries from './queries'
import * as mutations from './mutations'
import * as types from './types'

export const schema = makeSchema({
  types: [types, queries, mutations],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  contextType: {
    module: require.resolve('./context'),
    export: 'Context',
  },
  sourceTypes: {
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
