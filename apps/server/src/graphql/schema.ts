import { connectionPlugin, makeSchema } from 'nexus'
import * as queries from './queries'
import * as mutations from './mutations'
import * as types from './types'

import path from 'path'

export const schema = makeSchema({
  types: [types, queries, mutations],
  outputs: {
    schema: path.join(__dirname, '../../schema.graphql'),
    typegen: path.join(__dirname, 'generated/nexus.ts'),
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
    connectionPlugin({
      includeNodesField: true,
    }),
  ],
})
